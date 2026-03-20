# AboutSection Component

## Overview

The `AboutSection` component displays personal information with subtle animations and theme-aware styling.

## Features

- **Content Reveal Animations**: Staggered slide-up animations for paragraphs
- **Optional Profile Image**: Circular profile image with theme-aware border
- **Theme-Aware Styling**: Adapts to all four theme modes
- **Responsive Layout**: Switches from vertical to horizontal layout on larger screens
- **Accessibility**: Semantic HTML and proper image alt text

## Props

```typescript
interface AboutSectionProps {
  content?: string[];    // Array of content paragraphs
  imageUrl?: string;     // Optional profile image URL
}
```

## Default Values

- **content**: Three default paragraphs about development passion and expertise
- **imageUrl**: undefined (image is optional)

## Usage

```tsx
import { AboutSection } from '@/components/AboutSection';

// With default content
<AboutSection />

// With custom content
<AboutSection
  content={[
    "I'm a software engineer with 5 years of experience.",
    "I specialize in building scalable web applications.",
    "I'm passionate about clean code and user experience."
  ]}
/>

// With profile image
<AboutSection
  imageUrl="/profile.jpg"
  content={["Custom about text..."]}
/>
```

## Animation Sequence

- **Profile Image** (0.2s delay): Scale in
- **Paragraph 1** (0.2s delay): Slide up
- **Paragraph 2** (0.35s delay): Slide up
- **Paragraph 3** (0.5s delay): Slide up

## Responsive Behavior

- **Mobile (< 769px)**: Vertical layout with centered content
- **Desktop (≥ 769px)**: Horizontal layout with image on left, content on right

## Theme Behavior

- **Miami Nights**: Profile image has pink glow shadow
- **Vesper**: Profile image has mint green glow shadow
- **All Themes**: Border color adapts to theme accent color

## Requirements

Validates: Requirements 5.1, 5.5
