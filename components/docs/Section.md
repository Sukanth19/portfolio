# Section Component

Reusable section wrapper with consistent spacing and theme-aware styling.

## Purpose

The Section component provides a standardized layout structure for major portfolio sections (Hero, About, Projects, Skills, Contact). It ensures consistent spacing, padding, and responsive behavior across all sections while adapting to the active theme.

## Features

- **Consistent Spacing**: Standardized padding and margins across all sections
- **Theme-Aware Styling**: Automatically adapts background colors and text colors to the active theme
- **Background Variants**: Supports 'default' and 'alternate' backgrounds for visual variety
- **Responsive Design**: Adapts spacing and typography for all viewport sizes (320px to 2560px)
- **Optional Titles**: Supports optional section titles with theme-specific styling
- **Navigation Anchors**: Uses id prop for smooth scrolling navigation

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | Required | Unique identifier for the section (used for navigation anchors) |
| `title` | `string` | `undefined` | Optional section title displayed at the top |
| `children` | `React.ReactNode` | Required | Section content |
| `className` | `string` | `''` | Additional CSS classes for custom styling |
| `background` | `'default' \| 'alternate'` | `'default'` | Background variant for visual variety |

## Usage

### Basic Section

```tsx
import { Section } from '@/components/Section';

export function AboutSection() {
  return (
    <Section id="about" title="About Me">
      <p>Your content here...</p>
    </Section>
  );
}
```

### Section with Alternate Background

```tsx
import { Section } from '@/components/Section';

export function ProjectsSection() {
  return (
    <Section id="projects" title="Projects" background="alternate">
      <div className="projects-grid">
        {/* Project cards */}
      </div>
    </Section>
  );
}
```

### Section without Title

```tsx
import { Section } from '@/components/Section';

export function HeroSection() {
  return (
    <Section id="hero">
      <div className="hero-content">
        <h1>Welcome</h1>
        <p>Introduction text...</p>
      </div>
    </Section>
  );
}
```

### Section with Custom Classes

```tsx
import { Section } from '@/components/Section';

export function ContactSection() {
  return (
    <Section 
      id="contact" 
      title="Get In Touch" 
      className="contact-section"
      background="alternate"
    >
      <form>{/* Contact form */}</form>
    </Section>
  );
}
```

## Styling

The Section component uses CSS-in-JS (styled-jsx) for scoped styling and applies theme-aware colors through CSS custom properties set by the ThemeProvider.

### CSS Custom Properties Used

- `--color-bg-primary`: Primary background color
- `--color-bg-secondary`: Secondary background color (for alternate variant)
- `--color-text-primary`: Primary text color
- `--color-text-accent`: Accent text color (Vesper theme)
- `--gradient-primary`: Primary gradient (Miami Nights theme)
- `--transition-duration-normal`: Transition duration
- `--transition-easing`: Transition easing function

### Responsive Breakpoints

- **Mobile**: 480px and below - Reduced padding and smaller titles
- **Tablet**: 768px and below - Medium padding and title sizes
- **Desktop**: 769px to 1439px - Standard padding and title sizes
- **Large Desktop**: 1440px and above - Increased padding and larger titles

## Theme-Specific Enhancements

### Miami Nights Theme
- Section titles use gradient text effect with the primary gradient
- Creates a vibrant, neon aesthetic

### Vesper Theme
- Section titles use the mint-green accent color
- Maintains elegant, minimal aesthetic

## Accessibility

- Uses semantic `<section>` HTML element
- Provides unique `id` for navigation and anchor links
- Uses proper heading hierarchy with `<h2>` for section titles
- Maintains WCAG AA contrast ratios across all themes

## Requirements

**Validates: Requirements 5.5, 13.2**

- 5.5: Consistent spacing and typography hierarchy across all sections
- 13.2: Reusable components for repeated UI patterns
