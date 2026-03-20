# Portfolio Setup Guide

## Running the Project

### Development Mode
```bash
npm install
npm run dev
```
Visit `http://localhost:3000` to see your portfolio

### Production Build
```bash
npm run build
npm start
```

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## Git Setup & Push to GitHub

Your repo is now initialized and connected to: `https://github.com/Sukanth19/portfolio.git`

### First Commit & Push
```bash
# Stage all files (Kiro files are automatically excluded)
git add .

# Create your first commit
git commit -m "Initial commit: Portfolio website"

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Subsequent Updates
```bash
git add .
git commit -m "Your commit message"
git push
```

## What's Excluded from Git

The `.gitignore` file automatically excludes:
- `.kiro/` - All Kiro-related files
- `node_modules/` - Dependencies
- `.next/` - Next.js build files
- `.env` files - Environment variables
- `*.tsbuildinfo` - TypeScript build info

## Project Structure

```
portfolio/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── docs/             # Component documentation
│   ├── __examples__/     # Example components
│   └── __tests__/        # Test components
├── config/               # Configuration files
├── lib/                  # Utility functions
├── public/               # Static assets
└── types/                # TypeScript types
```

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Next.js and deploy

### Manual Deployment
```bash
npm run build
# Upload the .next folder and other necessary files to your hosting
```

## Environment Variables

If you need environment variables, create a `.env.local` file:
```
NEXT_PUBLIC_YOUR_VAR=value
```

This file is automatically excluded from git.
