# 🚀 CODA AI Builder

<div align="center">
  <img alt="CODA AI Builder" src="./public/og-image.png" />
  <h3>AI-Powered Full-Stack Development Platform</h3>
  <p>Transform your ideas into production-ready applications with advanced AI assistance, GitHub integration, and liquid glass UI</p>
</div>

## ✨ Features

### 🎨 **Liquid Glass UI**
- Stunning glassmorphism design with animated backgrounds
- Responsive and modern interface
- Smooth animations and transitions

### 🤖 **AI-Powered Development**
- **Azure OpenAI Integration** for superior code generation
- High-quality and fast generation modes
- Screenshot-to-code conversion
- Intelligent project scaffolding

### 🔗 **Advanced Integrations**
- **GitHub Integration** - Push code directly to repositories
- **Session Forking** - Branch and merge development sessions
- **Diff Viewer** - Compare code changes visually
- **Project Templates** - Pre-built scaffolding for common patterns
- **Real-time Collaboration** - Multi-user editing capabilities

### 🛠 **Developer Experience**
- **Live Code Sandbox** powered by Sandpack
- **Monaco Editor** integration for advanced code editing
- **Export Options** - Download projects or deploy to various platforms
- **Docker Support** for easy deployment
- **TypeScript** support throughout

### 🗄️ **Enhanced Database**
- **Neon Database** integration for scalable PostgreSQL
- Advanced schema with user management, projects, and sessions
- File management and version control

## 🏗️ Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript
- **UI/UX:** Tailwind CSS, Framer Motion, Radix UI
- **AI:** Azure OpenAI (GPT-4, GPT-4 Vision)
- **Database:** Neon PostgreSQL with Prisma ORM
- **Code Sandbox:** Sandpack, Monaco Editor
- **Authentication:** NextAuth.js
- **Deployment:** Docker, Vercel-ready

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Git
- Neon Database account (for cloud DB)
- Azure OpenAI API access

### 1. Clone and Install
```bash
git clone <your-repository-url>
cd coda-ai-builder
npm install
```

### 2. Environment Setup
Create a `.env.local` file with your configuration:

```env
# Database (Neon)
DATABASE_URL="postgresql://username:password@ep-your-endpoint.neon.tech/neon?sslmode=require"

# Azure OpenAI Configuration
AZURE_OPENAI_API_KEY="your-azure-openai-key"
AZURE_OPENAI_ENDPOINT="https://your-resource.openai.azure.com"
AZURE_OPENAI_DEPLOYMENT_NAME="your-gpt4-deployment"
AZURE_OPENAI_API_VERSION="2024-02-15-preview"

# GitHub Integration (Optional)
GITHUB_CLIENT_ID="your-github-oauth-client-id"
GITHUB_CLIENT_SECRET="your-github-oauth-secret"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# App Configuration
APP_NAME="CODA AI Builder"
APP_DESCRIPTION="AI-Powered Full-Stack Development Platform"
```

### 3. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) View your database
npx prisma studio
```

### 4. Development
```bash
npm run dev
```

Visit `http://localhost:3000` to see your AI builder in action!

## 🐳 Docker Deployment

### Build and Run
```bash
# Build the Docker image
npm run docker:build

# Run the container
npm run docker:run
```

### Docker Compose (with Database)
```bash
# Start the full stack
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🔧 Configuration

### Azure OpenAI Setup
1. Create an Azure OpenAI resource
2. Deploy GPT-4 and GPT-4 Vision models
3. Get your API key and endpoint
4. Configure in environment variables

### Neon Database Setup
1. Create a Neon project at [neon.tech](https://neon.tech)
2. Get your connection string
3. Add to `DATABASE_URL` in your environment

### GitHub Integration
1. Create a GitHub OAuth app
2. Set authorization callback URL to `{your-domain}/api/auth/callback/github`
3. Add client ID and secret to environment

## 📁 Project Structure

```
coda-ai-builder/
├── app/                    # Next.js app directory
│   ├── (main)/            # Main application pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # UI components
│   └── icons/            # Icon components
├── lib/                  # Utility libraries
├── prisma/              # Database schema and migrations
├── public/              # Static assets
├── types/               # TypeScript type definitions
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose setup
└── README.md          # This file
```

## 🎯 Advanced Features

### Session Forking
Create branches of your development sessions to explore different approaches:

```typescript
// Fork a chat session
const forkedChat = await forkChat(originalChatId, userId);
```

### GitHub Integration
Push generated code directly to GitHub repositories:

```typescript
// Push to GitHub (coming soon)
await pushToGitHub(projectId, repositoryName, branch);
```

### Real-time Collaboration
Multiple users can work on the same project simultaneously with live updates.

### Diff Viewer
Compare different versions of your generated code with a beautiful diff interface.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📖 **Documentation:** Check our comprehensive docs
- 💬 **Discord:** Join our community for support
- 🐛 **Issues:** Report bugs via GitHub Issues
- 📧 **Email:** Contact us for enterprise support

## 🌟 Roadmap

- [ ] **Enhanced Templates** - More project templates and frameworks
- [ ] **Plugin System** - Extensible architecture for custom integrations
- [ ] **AI Agents** - Specialized AI agents for different development tasks
- [ ] **Advanced Deployment** - One-click deployment to multiple platforms
- [ ] **Team Management** - Enhanced collaboration features
- [ ] **API Access** - RESTful API for external integrations

---

<div align="center">
  <p>Built with ❤️ for the developer community</p>
  <p>
    <a href="#top">↑ Back to Top</a>
  </p>
</div>
