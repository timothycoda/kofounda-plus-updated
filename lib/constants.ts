export const MODELS = [
  {
    value: "gpt-4",
    label: "GPT-4 (Recommended)",
    description: "Most capable model for complex coding tasks",
  },
  {
    value: "gpt-4-turbo",
    label: "GPT-4 Turbo",
    description: "Faster variant of GPT-4 with good performance",
  },
  {
    value: "gpt-3.5-turbo",
    label: "GPT-3.5 Turbo",
    description: "Fast and efficient for simpler tasks",
  },
];

export const SUGGESTED_PROMPTS = [
  "Build a todo app with dark mode and animations",
  "Create a landing page for a SaaS product",
  "Make a dashboard with charts and analytics",
  "Build a blog with search and categories",
  "Create an e-commerce product page",
  "Make a portfolio website with projects gallery",
  "Build a calculator with advanced functions",
  "Create a weather app with location search",
  "Make a quiz app with scoring system",
  "Build a chat interface with real-time messaging",
  "Create a timer app with pomodoro technique",
  "Make a expense tracker with categories",
];

export const PROJECT_TEMPLATES = [
  {
    id: "react-dashboard",
    name: "React Dashboard",
    description: "Modern dashboard with charts and analytics",
    framework: "react",
    category: "dashboard",
    tags: ["react", "tailwind", "charts", "dashboard"],
    thumbnail: "/templates/dashboard.png",
  },
  {
    id: "nextjs-landing",
    name: "Next.js Landing Page",
    description: "Beautiful landing page with modern design",
    framework: "nextjs",
    category: "landing-page",
    tags: ["nextjs", "tailwind", "landing", "marketing"],
    thumbnail: "/templates/landing.png",
  },
  {
    id: "react-blog",
    name: "React Blog",
    description: "Full-featured blog with search and categories",
    framework: "react",
    category: "blog",
    tags: ["react", "blog", "markdown", "search"],
    thumbnail: "/templates/blog.png",
  },
  {
    id: "vue-ecommerce",
    name: "Vue E-commerce",
    description: "Complete e-commerce solution with cart and checkout",
    framework: "vue",
    category: "e-commerce",
    tags: ["vue", "ecommerce", "cart", "payments"],
    thumbnail: "/templates/ecommerce.png",
  },
  {
    id: "react-portfolio",
    name: "React Portfolio",
    description: "Developer portfolio with project showcase",
    framework: "react",
    category: "portfolio",
    tags: ["react", "portfolio", "projects", "gallery"],
    thumbnail: "/templates/portfolio.png",
  },
];

export const FRAMEWORKS = [
  {
    id: "react",
    name: "React",
    description: "Popular library for building user interfaces",
    icon: "⚛️",
  },
  {
    id: "nextjs",
    name: "Next.js",
    description: "Full-stack React framework with SSR",
    icon: "▲",
  },
  {
    id: "vue",
    name: "Vue.js",
    description: "Progressive framework for building UIs",
    icon: "🟢",
  },
  {
    id: "svelte",
    name: "Svelte",
    description: "Compile-time optimized framework",
    icon: "🧡",
  },
  {
    id: "angular",
    name: "Angular",
    description: "Platform for building mobile and desktop apps",
    icon: "🔴",
  },
];

export const DEPLOYMENT_PROVIDERS = [
  {
    id: "vercel",
    name: "Vercel",
    description: "Deploy with zero configuration",
    icon: "▲",
    url: "https://vercel.com",
  },
  {
    id: "netlify",
    name: "Netlify",
    description: "Build, deploy, and scale modern web apps",
    icon: "🌟",
    url: "https://netlify.com",
  },
  {
    id: "render",
    name: "Render",
    description: "Cloud platform for developers",
    icon: "🎨",
    url: "https://render.com",
  },
  {
    id: "railway",
    name: "Railway",
    description: "Deploy your code, instantly",
    icon: "🚂",
    url: "https://railway.app",
  },
];

export const QUALITY_MODES = [
  {
    value: "high",
    label: "High Quality",
    description: "Advanced AI reasoning for complex applications",
    icon: "⚡",
    estimatedTime: "15-30 seconds",
  },
  {
    value: "low",
    label: "Fast",
    description: "Quick generation for simple prototypes",
    icon: "🚀",
    estimatedTime: "5-10 seconds",
  },
];

export const INTEGRATION_CATEGORIES = [
  {
    id: "database",
    name: "Database",
    description: "Data storage and management solutions",
    icon: "🗄️",
  },
  {
    id: "auth",
    name: "Authentication",
    description: "User authentication and authorization",
    icon: "🔐",
  },
  {
    id: "payment",
    name: "Payments",
    description: "Payment processing and billing",
    icon: "💳",
  },
  {
    id: "communication",
    name: "Communication",
    description: "Email, SMS, and messaging services",
    icon: "📧",
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "User behavior and performance tracking",
    icon: "📊",
  },
  {
    id: "storage",
    name: "Storage",
    description: "File storage and CDN services",
    icon: "☁️",
  },
];

export const APP_CONFIG = {
  name: process.env.APP_NAME || "CODA AI Builder",
  description: process.env.APP_DESCRIPTION || "AI-Powered Full-Stack Development Platform",
  version: "1.0.0",
  author: "CODA Team",
  repository: "https://github.com/your-username/coda-ai-builder",
  website: "https://coda-ai-builder.com",
  support: {
    email: "support@coda-ai-builder.com",
    discord: "https://discord.gg/coda-ai-builder",
    github: "https://github.com/your-username/coda-ai-builder/issues",
  },
  social: {
    twitter: "https://twitter.com/coda_ai_builder",
    linkedin: "https://linkedin.com/company/coda-ai-builder",
  },
  features: {
    githubIntegration: true,
    sessionForking: true,
    diffViewer: true,
    realTimeCollaboration: true,
    projectTemplates: true,
    multipleDeployment: true,
  },
};

export const AI_CAPABILITIES = [
  "Full-stack application generation",
  "Component-based development", 
  "Screenshot to code conversion",
  "Natural language to code",
  "Code refactoring and optimization",
  "Bug detection and fixing",
  "Performance optimization",
  "Security best practices",
  "Responsive design implementation",
  "SEO optimization",
  "Accessibility compliance",
  "Testing strategy implementation",
];
