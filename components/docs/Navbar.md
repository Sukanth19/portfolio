# Navbar Component

## Overview

The Navbar component provides sticky navigation with smooth scrolling, integrated theme switcher, and responsive mobile menu. It adapts to all four theme modes and provides an accessible navigation experience.

## Features

- **Sticky Positioning**: Remains visible during scrolling with enhanced styling when scrolled
- **Smooth Scroll Navigation**: Animated scrolling to section anchors
- **Theme Integration**: Includes ThemeSwitcher component with theme-aware styling
- **Responsive Design**: Desktop navigation bar transforms into mobile menu on small viewports
- **Accessibility**: Full keyboard navigation, ARIA labels, and focus indicators

## Usage

### Basic Usage

```tsx
import { Navbar } from '@/components/Navbar';

export default function Layout() {
  return (
    <>
      <Navbar />
      {/* Page content */}
    </>
  );
}
```

### Custom Links

```tsx
import { Navbar } from '@/components/Navbar';

const customLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Work', href: '#projects' },
  { label: 'Contact', href: '#contact' },
  { label: 'Blog', href: '/blog', external: true },
];

export default function Layout() {
  return <Navbar links={customLinks} />;
}
```

### Without Theme Switcher

```tsx
import { Navbar } from '@/components/Navbar';

export default function Layout() {
  return <Navbar showThemeSwitcher={false} />;
}
```

## Props

### NavbarProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `links` | `NavLink[]` | Default portfolio links | Navigation links to display |
| `showThemeSwitcher` | `boolean` | `true` | Whether to show the theme switcher |
| `className` | `string` | `''` | Additional CSS classes |

### NavLink Interface

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | `string` | Yes | Display text for the link |
| `href` | `string` | Yes | Link destination (use `#id` for smooth scroll) |
| `external` | `boolean` | No | Whether link opens in new tab |

## Default Links

The component includes default links for portfolio sections:

- Home (`#hero`)
- About (`#about`)
- Projects (`#projects`)
- Skills (`#skills`)
- Contact (`#contact`)

## Behavior

### Smooth Scrolling

Internal links (starting with `#`) trigger smooth scroll navigation to the target section, accounting for navbar height.

### Scroll State

The navbar changes appearance when scrolled:
- Adds background color
- Adds border and shadow
- Enhances visual separation from content

### Mobile Menu

On viewports ≤768px:
- Desktop links hidden
- Hamburger menu button appears
- Full-screen mobile menu slides in from right
- Body scroll locked when menu open
- Menu closes on link click or outside click

## Accessibility

- Semantic `<nav>` element with `role="navigation"`
- ARIA labels for navigation and menu controls
- `aria-expanded` state for mobile menu button
- `aria-hidden` for mobile menu visibility
- Full keyboard navigation support
- Visible focus indicators on all interactive elements

## Theme Integration

The Navbar responds to all four theme modes:

### Light & Dark
- Standard color transitions
- Subtle hover effects

### Miami Nights
- Gradient text for brand logo
- Enhanced glow effects on scroll
- Neon accent colors

### Vesper
- Mint-green accent on hover
- Elegant minimal styling

## Responsive Breakpoints

- **Desktop** (>768px): Horizontal navigation with inline theme switcher
- **Tablet/Mobile** (≤768px): Hamburger menu with full-screen overlay
- **Small Mobile** (≤480px): Compact theme switcher in mobile menu

## Performance

- Efficient scroll event handling with cleanup
- Minimal re-renders using state management
- CSS transitions for smooth animations
- No external dependencies beyond theme system

## Requirements Satisfied

- **5.2**: Sticky navbar that remains visible during scrolling
- **5.3**: Responsive layout adapting to all viewport sizes
- **5.4**: Mobile-first responsive design with mobile menu
- **13.3**: Reusable component with theme-aware styling
