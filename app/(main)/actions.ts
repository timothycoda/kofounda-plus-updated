"use server";

import { getPrisma } from "@/lib/prisma";
import {
  getMainCodingPrompt,
  screenshotToCodePrompt,
  softwareArchitectPrompt,
} from "@/lib/prompts";
import { notFound } from "next/navigation";
import { OpenAI } from "openai";

// Initialize Azure OpenAI client
const openai = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_NAME}`,
  defaultQuery: { 'api-version': process.env.AZURE_OPENAI_API_VERSION },
  defaultHeaders: {
    'api-key': process.env.AZURE_OPENAI_API_KEY,
  },
});

export async function createChat(
  prompt: string,
  model: string,
  quality: "high" | "low",
  screenshotUrl: string | undefined,
  userId?: string,
  projectId?: string,
) {
  const prisma = getPrisma();
  
  // Create chat with optional user and project association
  const chat = await prisma.chat.create({
    data: {
      model,
      quality,
      prompt,
      title: "",
      shadcn: true,
      userId,
      projectId,
    },
  });

  async function fetchTitle() {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4", // Use your Azure deployment name
        messages: [
          {
            role: "system",
            content:
              "You are a chatbot helping the user create a simple app or script, and your current job is to create a succinct title, maximum 3-5 words, for the chat given their initial prompt. Please return only the title.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 50,
        temperature: 0.5,
      });
      
      return response.choices[0]?.message?.content || prompt;
    } catch (error) {
      console.error("Error generating title:", error);
      return prompt.slice(0, 50) + "...";
    }
  }

  async function fetchTopExample() {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a helpful bot. Given a request for building an app, you match it to the most similar example provided. If the request is NOT similar to any of the provided examples, return "none". Here is the list of examples, ONLY reply with one of them OR "none":

            - landing page
            - blog app
            - quiz app
            - pomodoro timer
            - dashboard
            - e-commerce store
            - social media app
            - portfolio website
            `,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 20,
        temperature: 0.2,
      });

      return response.choices[0]?.message?.content || "none";
    } catch (error) {
      console.error("Error finding similar example:", error);
      return "none";
    }
  }

  const [title, mostSimilarExample] = await Promise.all([
    fetchTitle(),
    fetchTopExample(),
  ]);

  let fullScreenshotDescription;
  if (screenshotUrl) {
    try {
      const screenshotResponse = await openai.chat.completions.create({
        model: "gpt-4-vision-preview", // Use vision model for screenshots
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: screenshotToCodePrompt },
              {
                type: "image_url",
                image_url: {
                  url: screenshotUrl,
                },
              },
            ],
          },
        ],
        temperature: 0.2,
        max_tokens: 1000,
      });

      fullScreenshotDescription = screenshotResponse.choices[0]?.message?.content;
    } catch (error) {
      console.error("Error processing screenshot:", error);
      fullScreenshotDescription = "Unable to process screenshot.";
    }
  }

  let userMessage: string;
  if (quality === "high") {
    try {
      const initialRes = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: softwareArchitectPrompt,
          },
          {
            role: "user",
            content: fullScreenshotDescription
              ? fullScreenshotDescription + " " + prompt
              : prompt,
          },
        ],
        temperature: 0.2,
        max_tokens: 3000,
      });

      userMessage = initialRes.choices[0]?.message?.content ?? prompt;
    } catch (error) {
      console.error("Error in high quality processing:", error);
      userMessage = prompt;
    }
  } else if (fullScreenshotDescription) {
    userMessage =
      prompt +
      " RECREATE THIS APP AS CLOSELY AS POSSIBLE: " +
      fullScreenshotDescription;
  } else {
    userMessage = prompt;
  }

  const updatedChat = await prisma.chat.update({
    where: {
      id: chat.id,
    },
    data: {
      title,
      messages: {
        createMany: {
          data: [
            {
              role: "system",
              content: getMainCodingPrompt(mostSimilarExample),
              position: 0,
            },
            { role: "user", content: userMessage, position: 1 },
          ],
        },
      },
    },
    include: {
      messages: true,
    },
  });

  const lastMessage = updatedChat.messages
    .sort((a, b) => a.position - b.position)
    .at(-1);
  if (!lastMessage) throw new Error("No new message");

  return {
    chatId: chat.id,
    lastMessageId: lastMessage.id,
  };
}

export async function createMessage(
  chatId: string,
  text: string,
  role: "assistant" | "user",
  metadata?: any,
) {
  const prisma = getPrisma();
  const chat = await prisma.chat.findUnique({
    where: { id: chatId },
    include: { messages: true },
  });
  if (!chat) notFound();

  const maxPosition = Math.max(...chat.messages.map((m) => m.position));

  const newMessage = await prisma.message.create({
    data: {
      role,
      content: text,
      position: maxPosition + 1,
      chatId,
      metadata,
    },
  });

  return newMessage;
}

export async function forkChat(chatId: string, userId?: string) {
  const prisma = getPrisma();
  
  const originalChat = await prisma.chat.findUnique({
    where: { id: chatId },
    include: { messages: true },
  });
  
  if (!originalChat) notFound();

  // Create forked chat
  const forkedChat = await prisma.chat.create({
    data: {
      model: originalChat.model,
      quality: originalChat.quality,
      prompt: originalChat.prompt,
      title: `Fork of ${originalChat.title}`,
      shadcn: originalChat.shadcn,
      isForked: true,
      parentChatId: originalChat.id,
      userId,
      projectId: originalChat.projectId,
    },
  });

  // Copy all messages to forked chat
  const messagesToCopy = originalChat.messages.map((msg) => ({
    role: msg.role,
    content: msg.content,
    position: msg.position,
    chatId: forkedChat.id,
    metadata: msg.metadata,
  }));

  await prisma.message.createMany({
    data: messagesToCopy,
  });

  return forkedChat;
}

export async function getChat(chatId: string) {
  const prisma = getPrisma();
  
  const chat = await prisma.chat.findUnique({
    where: { id: chatId },
    include: {
      messages: {
        orderBy: { position: 'asc' },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      project: {
        select: {
          id: true,
          name: true,
          description: true,
        },
      },
    },
  });

  return chat;
}

export async function getChatHistory(userId: string, limit = 20) {
  const prisma = getPrisma();
  
  const chats = await prisma.chat.findMany({
    where: { userId },
    include: {
      messages: {
        take: 1,
        orderBy: { position: 'asc' },
      },
      project: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });

  return chats;
}
