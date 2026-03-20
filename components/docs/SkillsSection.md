# SkillsSection Component

## Overview

The `SkillsSection` component displays technical skills organized by categories in a responsive grid layout with hover effects.

## Features

- **Category Organization**: Skills grouped by categories (Frontend, Backend, Tools, etc.)
- **Interactive Hover Effects**: Skill items transform and highlight on hover
- **Theme-Aware Styling**: Gradient effects and colors adapt to active theme
- **Responsive Grid**: Auto-adjusts columns based on viewport size
- **Staggered Animations**: Categories animate in sequence

## Props

```typescript
interface SkillsSectionProps {
  categories?: SkillCategory[];
}

interface SkillCategory {
  name: string;      // Category name
  skills: string[];  // Array of skill names
}
```

## Default Categories

1. **Frontend**: React, Next.js, TypeScript, Tailwind CSS, Framer Motion
2. **Backend**: Node.js, Express, PostgreSQL, MongoDB, REST APIs
3. **Tools & Platforms**: Git, Docker, Vercel, AWS, VS Code

## Usage

```tsx
import { SkillsSection } from '@/components/SkillsSection';

// With default categories
<SkillsSection />

// With custom categories
<SkillsSection
  categories={[
    {
      name: "Languages",
      skills: ["JavaScript", "TypeScript", "Python", "Go"]
    },
    {
      name: "Frameworks",
      skills: ["React", "Next.js", "Express", "Django"]
    }
  ]}
/>
```

## Animation Sequence

Each category animates with a staggered delay:
- **Category 1** (0.1s delay): Slide up
- **Category 2** (0.25s delay): Slide up
- **Category 3** (0.4s delay): Slide up

## Hover Effects

- Transform: Translates up by 2px
- Background: Applies theme gradient
- Border: Changes to accent color
- Shadow: Adds elevation shadow

## Responsive Grid

- **Mobile (< 481px)**: 1 column
- **Tablet (481px - 768px)**: 1 column
- **Desktop (769px - 1024px)**: 2 columns
- **Large (≥ 1025px)**: Auto-fit with minimum 280px per column

## Theme Behavior

- **Miami Nights**: Category titles with gradient text, pink glow on hover
- **Vesper**: Accent color titles, mint green glow on hover
- **All Themes**: Skill items use theme gradients on hover

## Requirements

Validates: Requirements 5.1, 5.5
