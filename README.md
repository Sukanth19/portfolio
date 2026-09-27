# Sukanth - JS Developer

Personal portfolio website with live GitHub integration.

## ✨ Features

- 🎨 Cyberpunk-themed design with interactive elements
- 🚀 Boot sequence animation
- 💻 Interactive terminal emulator
- 🎮 Easter eggs and hidden games
- 📊 **Live GitHub integration**:
  - Real-time commit activity in Build Log
  - Top repositories showcase
  - Repository statistics (stars, forks, commits)
  - Automatic updates with smart caching

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **API**: GitHub GraphQL API

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd cope
npm install
```

### 2. Setup GitHub Integration (Optional but Recommended)

Create a `.env.local` file:

```bash
copy .env.example .env.local
```

Add your GitHub credentials:

```env
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here
NEXT_PUBLIC_GITHUB_USERNAME=Sukanth19
```

**Get your token**: https://github.com/settings/tokens
- Select scopes: `public_repo`, `read:user`

### 3. Test & Run

```bash
# Test GitHub connection (optional)
npm run test:github

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Get GitHub integration working in 3 minutes
- **[GITHUB_INTEGRATION.md](GITHUB_INTEGRATION.md)** - Complete setup guide
- **[GITHUB_FEATURES_SUMMARY.md](GITHUB_FEATURES_SUMMARY.md)** - Technical details

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test:github  # Test GitHub API connection
```

## 📁 Project Structure

```
├── app/                    # Next.js app directory
├── components/             # React components
│   ├── effects/           # Visual effects
│   ├── games/             # Easter egg games
│   ├── interactive/       # Interactive systems
│   ├── projects/          # Project showcase
│   └── ui/                # UI components
├── data/                   # Static data
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions & APIs
│   └── github.ts          # GitHub API integration
└── public/                 # Static assets
```

## 🎨 Key Features Explained

### Live Build Log
Automatically fetches your latest commits from GitHub and displays them in a timeline format. Falls back to static data if GitHub token is not configured.

### Top Repositories
Showcases your most starred repositories with descriptions, stats, and direct links. Updates automatically with smart caching.

### Interactive Elements
- Custom cursor system
- Dynamic background effects
- Command palette (Ctrl+K)
- Terminal emulator
- Easter eggs (try the Konami code!)

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_GITHUB_TOKEN` | GitHub Personal Access Token | Optional* |
| `NEXT_PUBLIC_GITHUB_USERNAME` | Your GitHub username | Optional* |
| `NEXT_PUBLIC_SITE_URL` | Your deployed site URL | No |

\* *Required for live GitHub integration. Site works without it using static data.*

## 🚢 Deployment

Deploy to Vercel (recommended):

```bash
# Push to GitHub, then:
vercel --prod
```

**Important**: Add your environment variables in Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add `NEXT_PUBLIC_GITHUB_TOKEN` and `NEXT_PUBLIC_GITHUB_USERNAME`
3. Redeploy

## 🤝 Contributing

This is a personal portfolio, but feel free to fork and customize for your own use!

## 📄 License

MIT License - feel free to use this as a template for your own portfolio.

## 📧 Contact

- GitHub: [Sukanth19](https://github.com/Sukanth19)
- Email: sukan3066@gmail.com

---

Built with ❤️ using Next.js • TypeScript • Tailwind CSS
