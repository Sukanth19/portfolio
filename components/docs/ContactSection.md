# ContactSection Component

## Overview

The `ContactSection` component displays contact methods and social links with interactive hover states and theme-aware styling.

## Features

- **Multiple Contact Methods**: Email, GitHub, LinkedIn, Twitter, and custom links
- **Interactive Hover States**: Elevation effects and gradient backgrounds
- **Animated Arrows**: Arrow indicators that slide on hover
- **Theme-Aware Styling**: Adapts to all four theme modes
- **Responsive Grid**: Auto-adjusts layout based on viewport size
- **Accessibility**: Proper link attributes and focus indicators

## Props

```typescript
interface ContactSectionProps {
  links?: ContactLink[];
  description?: string;
}

interface ContactLink {
  label: string;                                    // Link label
  url: string;                                      // Link URL
  type: 'email' | 'github' | 'linkedin' | 'twitter' | 'other';
}
```

## Default Links

1. **Email**: mailto:hello@example.com
2. **GitHub**: https://github.com
3. **LinkedIn**: https://linkedin.com
4. **Twitter**: https://twitter.com

## Usage

```tsx
import { ContactSection } from '@/components/ContactSection';

// With default links
<ContactSection />

// With custom links and description
<ContactSection
  description="I'd love to hear from you!"
  links={[
    { label: "Email", url: "mailto:john@example.com", type: "email" },
    { label: "GitHub", url: "https://github.com/johndoe", type: "github" },
    { label: "Portfolio", url: "https://johndoe.com", type: "other" }
  ]}
/>
```

## Animation Sequence

- **Description** (0.2s delay): Fade in
- **Link 1** (0.3s delay): Scale in
- **Link 2** (0.4s delay): Scale in
- **Link 3** (0.5s delay): Scale in
- **Link 4** (0.6s delay): Scale in

## Hover Effects

- Transform: Translates up by 4px
- Background: Applies theme gradient
- Border: Changes to accent color
- Shadow: Adds large elevation shadow
- Arrow: Slides right by 4px

## Responsive Grid

- **Mobile (< 481px)**: 1 column
- **Tablet (481px - 768px)**: 2 columns
- **Desktop (769px - 1024px)**: 2 columns
- **Large (≥ 1025px)**: Auto-fit with minimum 200px per column

## Link Behavior

- **Email links**: Open in same tab (no target="_blank")
- **External links**: Open in new tab with `rel="noopener noreferrer"`

## Theme Behavior

- **Miami Nights**: Pink glow shadow on hover
- **Vesper**: Mint green glow shadow on hover
- **All Themes**: Gradient backgrounds and accent borders on hover

## Requirements

Validates: Requirements 5.1, 5.5
