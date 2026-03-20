# Portfolio Website

A visually striking personal portfolio website built with Next.js, TypeScript, and Tailwind CSS featuring a dynamic theme engine with four distinct visual modes, smooth animations, and interactive easter eggs.

## Features

### Core Features
- **Dynamic Theme Engine**: Four distinct visual modes with smooth transitions
  - **Light**: Clean, bright theme for daytime viewing
  - **Dark**: Classic dark mode with high contrast
  - **Vesper**: Elegant dark theme with warm beige-grey gradients and mint-green accents
  - **Miami Nights**: Cyberpunk-inspired neon theme with pink-purple-cyan gradients and glowing effects
- **Responsive Design**: Mobile-first approach supporting viewports from 320px to 2560px
- **Smooth Animations**: Framer Motion-powered transitions with reduced-motion support
- **Accessibility**: WCAG AA compliant with full keyboard navigation and screen reader support

### Interactive Easter Eggs
- **Hidden Terminal** (Ctrl + ~): Linux-style terminal interface with custom commands
- **Neural Background**: Subtle AI-inspired animated background
- **Command Palette** (Ctrl/Cmd + K): VS Code-style quick navigation
- **Scan Mode**: Cybersecurity-themed visual overlay with scanlines

### Performance
- Optimized for Vercel edge network
- First Contentful Paint (FCP) < 1.5s on 3G
- Largest Contentful Paint (LCP) < 2.5s on 3G
- Lighthouse performance score 90+

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript 5+ (strict mode)
- **Styling**: Tailwind CSS 3.4+
- **Animation**: Framer Motion 11+
- **Icons**: Lucide React
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- **Node.js**: 18.17 or higher
- **Package Manager**: npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd portfolio-website
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Local Development

1. Start the development server:

```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

3. The page auto-updates as you edit files

### Available Scripts

- **`npm run dev`**: Start development server on http://localhost:3000
- **`npm run build`**: Create optimized production build
- **`npm run start`**: Start production server (requires build first)
- **`npm run lint`**: Run ESLint to check code quality
- **`npm run type-check`**: Run TypeScript compiler to check types

### Building for Production

1. Create an optimized production build:

```bash
npm run build
```

2. Test the production build locally:

```bash
npm run start
```

3. Open [http://localhost:3000](http://localhost:3000) to verify

## Deployment

### Vercel (Recommended)

This project is optimized for zero-config Vercel deployment:

#### Option 1: Deploy via Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Visit [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Vercel auto-detects Next.js and configures build settings
5. Click "Deploy"

#### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:

```bash
npm install -g vercel
```

2. Deploy from your project directory:

```bash
vercel
```

3. Follow the prompts to link your project

#### Deployment Configuration

The project includes a `vercel.json` file with:
- Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- Optimized caching for static assets and images
- Edge network optimization

No additional configuration is required for deployment.

### Other Platforms

The project can be deployed to any platform supporting Next.js:

- **Netlify**: Use the Next.js build plugin
- **AWS Amplify**: Configure build settings for Next.js
- **Self-hosted**: Use `npm run build` and `npm run start`

## Project Structure

```text
portfolio-website/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navbar.tsx        # Navigation bar
│   ├── HeroSection.tsx   # Landing section
│   ├── AboutSection.tsx  # About section
│   ├── ProjectsSection.tsx # Projects display
│   ├── ProjectCard.tsx   # Individual project card
│   ├── SkillsSection.tsx # Skills display
│   ├── ContactSection.tsx # Contact information
│   ├── ThemeProvider.tsx # Theme context provider
│   ├── ThemeSwitcher.tsx # Theme selection UI
│   ├── HiddenTerminal.tsx # Terminal easter egg
│   ├── NeuralBackground.tsx # Animated background
│   ├── CommandPalette.tsx # Quick navigation
│   └── ...               # Other components
├── lib/                   # Utilities and helpers
│   ├── data.ts           # Portfolio data
│   └── terminal.ts       # Terminal command logic
├── types/                 # TypeScript definitions
│   └── theme.ts          # Theme type definitions
├── config/                # Configuration
│   ├── themes.ts         # Theme definitions
│   ├── site.ts           # Site metadata
│   └── features.ts       # Feature flags
├── public/                # Static assets
│   └── projects/         # Project images
├── .kiro/                 # Kiro spec files
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
├── vercel.json           # Vercel deployment config
└── package.json          # Dependencies and scripts
```

## Environment Variables

No environment variables are required for basic functionality. The portfolio works out of the box with default configuration.

### Optional Configuration

If you want to customize site metadata or enable/disable features, edit:
- `config/site.ts` - Site name, description, author info
- `config/features.ts` - Feature flags for easter eggs

## Theme System

The portfolio features four distinct themes:

- **Light**: Clean bright theme with high contrast
- **Dark**: Classic dark mode with comfortable reading
- **Vesper**: Elegant dark theme with warm gradients and mint accents
- **Miami Nights**: Neon cyberpunk theme with vibrant pink-purple-cyan colors

Themes persist across sessions using localStorage and transition smoothly with 300ms animations.

## Easter Eggs

- **Hidden Terminal**: Press `Ctrl + ~` to open a fake terminal with commands like `help`, `about`, `projects`
- **Command Palette**: Press `Ctrl/Cmd + K` for quick navigation
- **Neural Background**: Subtle animated AI-inspired background
- **Scan Mode**: Toggle cybersecurity-themed visual effects

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

- Next.js automatic code splitting
- Optimized images with Next.js Image component
- Minimal JavaScript bundle size
- Edge-optimized deployment on Vercel
- Efficient CSS with Tailwind's JIT compiler

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Full keyboard navigation support
- Focus indicators on all interactive elements
- Respects `prefers-reduced-motion` setting
- WCAG AA contrast ratios across all themes

## Contributing

This is a personal portfolio project. Feel free to fork and customize for your own use.

## License

MIT
