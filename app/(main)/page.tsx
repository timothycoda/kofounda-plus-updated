/* eslint-disable @next/next/no-img-element */
"use client";

import Fieldset from "@/components/fieldset";
import ArrowRightIcon from "@/components/icons/arrow-right";
import LightningBoltIcon from "@/components/icons/lightning-bolt";
import LoadingButton from "@/components/loading-button";
import Spinner from "@/components/spinner";
import * as Select from "@radix-ui/react-select";
import assert from "assert";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useState, useRef, useTransition } from "react";
import { createChat } from "./actions";
import { Context } from "./providers";
import Header from "@/components/header";
import { useS3Upload } from "next-s3-upload";
import UploadIcon from "@/components/icons/upload-icon";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { MODELS, SUGGESTED_PROMPTS } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { setStreamPromise } = use(Context);
  const router = useRouter();

  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState(MODELS[0].value);
  const [quality, setQuality] = useState("high");
  const [screenshotUrl, setScreenshotUrl] = useState<string | undefined>(
    undefined,
  );
  const [screenshotLoading, setScreenshotLoading] = useState(false);
  const selectedModel = MODELS.find((m) => m.value === model);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isPending, startTransition] = useTransition();

  const { uploadToS3 } = useS3Upload();
  const handleScreenshotUpload = async (event: any) => {
    if (prompt.length === 0) setPrompt("Build this");
    setQuality("low");
    setScreenshotLoading(true);
    let file = event.target.files[0];
    const { url } = await uploadToS3(file);
    setScreenshotUrl(url);
    setScreenshotLoading(false);
  };

  const textareaResizePrompt = prompt
    .split("\n")
    .map((text) => (text === "" ? "a" : text))
    .join("\n");

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-violet-900 via-purple-900 to-blue-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-violet-600 rounded-full opacity-20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full opacity-20 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full opacity-15 blur-3xl"
          animate={{
            x: [0, 120, 0],
            y: [0, -80, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Glass Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 flex grow flex-col">
        <Header />

        <div className="mt-8 flex grow flex-col items-center px-4 lg:mt-12">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-8"
          >
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6 inline-flex items-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full blur opacity-20"></div>
                <div className="relative px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-sm font-medium">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    Powered by Azure OpenAI
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent leading-tight"
            >
              Build Apps with
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                AI Magic
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            >
              Transform your ideas into production-ready applications with Kofounda's AI-powered 
              development platform. No setup required.
            </motion.p>
          </motion.div>

          {/* Main Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="relative w-full max-w-4xl"
          >
            {/* Glassmorphism Container */}
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 via-pink-600 to-blue-600 rounded-3xl blur opacity-20"></div>
              
              {/* Main Glass Panel */}
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                <form
                  action={async (formData) => {
                    startTransition(async () => {
                      const formPrompt = formData.get("prompt") as string;
                      
                      // Use state values instead of form data for select components
                      assert.ok(typeof formPrompt === "string");
                      assert.ok(typeof model === "string");
                      assert.ok(quality === "high" || quality === "low");

                      const { chatId, lastMessageId } = await createChat(
                        formPrompt,
                        model,
                        quality,
                        screenshotUrl,
                      );

                      const streamPromise = fetch(
                        "/api/get-next-completion-stream-promise",
                        {
                          method: "POST",
                          body: JSON.stringify({ messageId: lastMessageId, model }),
                        },
                      ).then((res) => {
                        if (!res.body) {
                          throw new Error("No body on response");
                        }
                        return res.body;
                      });

                      startTransition(() => {
                        setStreamPromise(streamPromise);
                        router.push(`/chats/${chatId}`);
                      });
                    });
                  }}
                >
                  <Fieldset>
                    {/* Screenshot Upload Section */}
                    <AnimatePresence>
                      {(screenshotLoading || screenshotUrl) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mb-6"
                        >
                          <div className="relative p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                            {screenshotLoading && (
                              <div className="flex items-center justify-center h-20">
                                <Spinner />
                                <span className="ml-3 text-white/60">Processing image...</span>
                              </div>
                            )}
                            {screenshotUrl && !screenshotLoading && (
                              <div className="relative">
                                <img
                                  alt="uploaded screenshot"
                                  src={screenshotUrl}
                                  className="w-20 h-20 rounded-xl object-cover border border-white/20"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setScreenshotUrl(undefined);
                                    if (fileInputRef.current) {
                                      fileInputRef.current.value = "";
                                    }
                                  }}
                                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                                >
                                  <XCircleIcon className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Main Input Area */}
                    <div className="relative">
                      {/* Auto-resize phantom text */}
                      <div className="invisible p-6 text-lg whitespace-pre-wrap min-h-[120px]">
                        {textareaResizePrompt || "What would you like to build today?"}
                      </div>
                      
                      {/* Actual textarea */}
                      <textarea
                        placeholder="Describe your app idea... (e.g., Build a todo app with dark mode and animations)"
                        required
                        name="prompt"
                        rows={1}
                        className="absolute inset-0 w-full h-full resize-none bg-transparent p-6 text-lg text-white placeholder-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 rounded-2xl border border-white/10 backdrop-blur-sm"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" && !event.shiftKey) {
                            event.preventDefault();
                            const target = event.target;
                            if (!(target instanceof HTMLTextAreaElement)) return;
                            target.closest("form")?.requestSubmit();
                          }
                        }}
                      />
                    </div>

                    {/* Controls Row */}
                    <div className="flex items-center justify-between mt-6 gap-4">
                      <div className="flex items-center gap-4">
                        {/* Model Select */}
                        <Select.Root name="model" value={model} onValueChange={setModel}>
                          <Select.Trigger className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white/90 hover:bg-white/15 transition-colors">
                            <Select.Value>
                              <span className="text-sm">{selectedModel?.label}</span>
                            </Select.Value>
                            <ChevronDownIcon className="w-4 h-4 text-white/60" />
                          </Select.Trigger>
                          <Select.Content className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-xl p-2 shadow-2xl">
                            {MODELS.map((modelOption) => (
                              <Select.Item
                                key={modelOption.value}
                                value={modelOption.value}
                                className="px-3 py-2 text-white/90 hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
                              >
                                <div className="flex items-center gap-2">
                                  <CheckIcon className="w-4 h-4 text-violet-400" />
                                  <span>{modelOption.label}</span>
                                </div>
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Root>

                        {/* Quality Toggle */}
                        <Select.Root name="quality" value={quality} onValueChange={setQuality}>
                          <Select.Trigger className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white/90 hover:bg-white/15 transition-colors">
                            <Select.Value>
                              <span className="text-sm">{quality === "high" ? "⚡ High Quality" : "🚀 Fast"}</span>
                            </Select.Value>
                            <ChevronDownIcon className="w-4 h-4 text-white/60" />
                          </Select.Trigger>
                          <Select.Content className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-xl p-2 shadow-2xl">
                            <Select.Item value="high" className="px-3 py-2 text-white/90 hover:bg-white/10 rounded-lg cursor-pointer transition-colors">
                              <div className="flex items-center gap-2">
                                <span>⚡</span>
                                <span>High Quality</span>
                              </div>
                            </Select.Item>
                            <Select.Item value="low" className="px-3 py-2 text-white/90 hover:bg-white/10 rounded-lg cursor-pointer transition-colors">
                              <div className="flex items-center gap-2">
                                <span>🚀</span>
                                <span>Fast</span>
                              </div>
                            </Select.Item>
                          </Select.Content>
                        </Select.Root>

                        {/* File Upload */}
                        <label className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white/90 hover:bg-white/15 transition-colors cursor-pointer">
                          <UploadIcon className="w-4 h-4" />
                          <span className="text-sm">Upload</span>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleScreenshotUpload}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* Submit Button */}
                      <LoadingButton
                        isLoading={isPending}
                        className="px-8 py-3 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                      >
                        {isPending ? (
                          <>
                            <Spinner className="w-4 h-4" />
                            Creating...
                          </>
                        ) : (
                          <>
                            Build App
                            <ArrowRightIcon className="w-4 h-4" />
                          </>
                        )}
                      </LoadingButton>
                    </div>
                  </Fieldset>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Suggested Prompts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-8 w-full max-w-4xl"
          >
            <p className="text-center text-white/60 mb-4 text-sm">Try these examples:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {SUGGESTED_PROMPTS.slice(0, 6).map((suggestion, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.3 }}
                  onClick={() => setPrompt(suggestion)}
                  className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 text-sm hover:scale-105"
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isPending && (
          <LoadingMessage
            isHighQuality={quality === "high"}
            screenshotUrl={screenshotUrl}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function LoadingMessage({
  isHighQuality,
  screenshotUrl,
}: {
  isHighQuality: boolean;
  screenshotUrl: string | undefined;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 mx-4 max-w-md w-full text-center"
      >
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full flex items-center justify-center">
          <Spinner className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Creating Your App</h3>
        <p className="text-white/70 text-sm leading-relaxed">
          {isHighQuality
            ? "Using advanced AI to architect and build your application..."
            : "Rapidly generating your app structure and components..."}
          {screenshotUrl && (
            <span className="block mt-2">
              Including design elements from your uploaded image.
            </span>
          )}
        </p>
        <div className="mt-4 flex justify-center">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-violet-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export const runtime = "edge";
export const maxDuration = 45;
