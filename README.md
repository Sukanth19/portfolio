# Sukanth - Developer Portfolio

An experimental, highly interactive developer portfolio that functions as a personal digital environment rather than a conventional portfolio website.

## Philosophy

**Build it. Break it. Understand it. Rebuild it better.**

This portfolio embodies my approach to development—learning through building unconventional projects that force deep understanding of systems and technologies.

## Features

- **Interactive Boot Sequence** - System initialization animation (skippable)
- **Custom Cursor System** - Responsive cursor with inertia and interaction states
- **Command Palette** - Keyboard-driven navigation (`/` or `Cmd/Ctrl+K`)
- **Project Explorer** - Interactive project cards with detailed case studies
- **The Lab** - Experimental projects and technical explorations
- **Tech Constellation** - Interactive technology stack visualization
- **Live Terminal** - Functional terminal with custom commands
- **Easter Eggs** - Hidden interactions and features to discover
- **Keyboard Navigation** - Full keyboard shortcut support
- **Responsive Design** - Optimized for desktop and mobile

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Fonts**: JetBrains Mono, Inter

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Keyboard Shortcuts

- `/` or `Cmd/Ctrl + K` - Open command palette
- `H` - Navigate to home
- `P` - Navigate to projects
- `S` - Navigate to tech stack
- `L` - Navigate to lab
- `A` - Navigate to about
- `C` - Navigate to contact
- `ESC` - Close modals / Skip boot sequence

## Terminal Commands

Type these commands in the interactive terminal:

- `help` - List available commands
- `about` - Learn about me
- `projects` - View all projects
- `stack` - Show tech stack
- `lab` - See experiments
- `github` - Open GitHub profile
- `contact` - Get contact info
- `neofetch` - System information
- `whoami` - Who am I?
- `clear` - Clear terminal

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── interactive/       # Interactive systems (cursor, background)
│   ├── projects/          # Project-related components
│   ├── Hero.tsx          # Hero section
│   ├── Navigation.tsx    # Navigation HUD
│   ├── CommandPalette.tsx
│   ├── Terminal.tsx
│   ├── LabSection.tsx
│   ├── TechStackSection.tsx
│   ├── AboutSection.tsx
│   └── ContactSection.tsx
├── data/                  # Data layer
│   ├── projects.ts       # Project data
│   ├── experiments.ts    # Lab experiments
│   └── technologies.ts   # Tech stack
├── hooks/                # Custom React hooks
│   ├── useCursor.ts
│   ├── useKeyboard.ts
│   └── useEasterEggs.ts
└── public/               # Static assets
```

## Design Principles

1. **Interactive Over Static** - The environment reacts to user input
2. **Technical Aesthetic** - Dark, cinematic, developer-focused design
3. **Performance First** - Smooth animations without sacrificing performance
4. **Accessibility** - Keyboard navigation, reduced motion support, semantic HTML
5. **Extensible Architecture** - Easy to add new projects and experiments

## Color Palette

- **Background**: `#0a0a0d` (Void)
- **Purple**: `#5C4A66` (Deep Purple)
- **Lavender**: `#B8AED8`
- **Crimson**: `#9B1B30`
- **Gray**: `#8B8B9A` (Muted Gray)
- **Text**: `#E8E0EC` (Light)

## Performance

- Code splitting for optimal loading
- Lazy loading for heavy components
- GPU-friendly CSS transforms
- Optimized animations
- Responsive image handling

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Contact

- **GitHub**: [Sukanth19](https://github.com/Sukanth19)
- **Email**: sukan3066@gmail.com
- **Discord**: zynk__19

## License

This project is open source and available for personal use and learning.

---

**Built with curiosity, experimentation, and an obsession with understanding how things work.**
