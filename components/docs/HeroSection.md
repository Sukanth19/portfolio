# HeroSection Component

## Overview

The `HeroSection` component is the landing section of the portfolio website, featuring an animated entrance with theme-aware styling and responsive design.

## Features

- **Animated Entrance**: Uses `AnimatedElement` for fade, slide, and scale animations
- **Theme-Aware Styling**: Adapts to all four theme modes with gradient effects
- **Responsive Design**: Optimized for viewports from 320px to 2560px
- **Call-to-Action**: Includes a prominent CTA button with hover effects
- **Accessibility**: Full keyboard navigation and focus indicators

## Props

```typescript
interface HeroSectionProps {
  title?: string;        // Main heading text
  subtitle?: string;     // Subtitle or tagline
  ctaText?: string;      // Call-to-action button text
  ctaLink?: string;      // Call-to-action link URL
}
```

## Default Values

- **title**: "Welcome to My Portfolio"
- **subtitle**: "Building exceptional digital experiences with modern web technologies"
- **ctaText**: "View My Work"
- **ctaLink**: "#projects"

## Usage

```tsx
import { HeroSection } from '@/components/HeroSection';

// With default values
<HeroSection />

// With custom values
<HeroSection
  title="Hi, I'm John Doe"
  subtitle="Full-stack developer specializing in React and Node.js"
  ctaText="See My Projects"
  ctaLink="#projects"
/>
```

## Animation Sequence

1. **Title** (0.2s delay): Fade in
2. **Subtitle** (0.4s delay): Slide up
3. **CTA Button** (0.6s delay): Scale in

All animations respect `prefers-reduced-motion` settings.

## Theme Behavior

- **Miami Nights**: Title displays with neon gradient effect
- **Vesper**: Title uses accent color (mint green)
- **Light/Dark**: Standard text colors with smooth transitions

## Requirements

Validates: Requirements 5.1, 5.5, 7.1
