# GradientBorder Component

Theme-aware gradient border wrapper that adapts to the active theme configuration.

## Overview

The `GradientBorder` component wraps children with a gradient border that dynamically uses the active theme's gradient configuration. It supports customizable border width and radius, making it perfect for creating visually striking UI elements that maintain consistency with the theme system.

## Features

- **Theme-Aware**: Automatically uses gradients from the active theme
- **Customizable**: Configurable border width and radius
- **Multiple Gradients**: Choose from primary, secondary, or accent gradients
- **Smooth Transitions**: Gradients transition smoothly when theme changes
- **Accessible**: Properly structured with ARIA attributes

## Usage

```tsx
import { GradientBorder } from '@/components/GradientBorder';

// Basic usage with default settings
<GradientBorder>
  <div className="p-4">
    Your content here
  </div>
</GradientBorder>

// Custom border width and radius
<GradientBorder borderWidth={4} borderRadius={16}>
  <div className="p-4">
    Your content here
  </div>
</GradientBorder>

// Using different gradient types
<GradientBorder gradient="secondary">
  <div className="p-4">
    Your content here
  </div>
</GradientBorder>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | Required | Content to wrap with gradient border |
| `borderWidth` | `number` | `2` | Border width in pixels |
| `borderRadius` | `number` | `8` | Border radius in pixels |
| `className` | `string` | `''` | Additional CSS classes for the wrapper |
| `gradient` | `'primary' \| 'secondary' \| 'accent'` | `'primary'` | Which gradient to use from theme |

## Examples

### Project Card Border

```tsx
<GradientBorder borderWidth={2} borderRadius={12} gradient="primary">
  <div className="p-6 bg-secondary">
    <h3>Project Title</h3>
    <p>Project description...</p>
  </div>
</GradientBorder>
```

### Section Divider

```tsx
<GradientBorder borderWidth={1} borderRadius={0} gradient="accent">
  <div className="h-px" />
</GradientBorder>
```

### Button with Gradient Border

```tsx
<GradientBorder borderWidth={2} borderRadius={8} gradient="secondary">
  <button className="px-6 py-3 bg-transparent">
    Click Me
  </button>
</GradientBorder>
```

## Theme Integration

The component automatically uses gradients from the active theme configuration:

- **Miami Nights**: Pink → Purple → Cyan gradients with neon glow
- **Vesper**: Warm beige → Grey → Off-white gradients
- **Dark**: Blue → Indigo gradients
- **Light**: Blue → Indigo gradients

## Implementation Details

The component uses CSS mask technique to create the gradient border effect:

1. An absolute positioned div with the gradient background
2. CSS mask to cut out the center, leaving only the border
3. Content rendered on top with appropriate border radius

This approach ensures:
- Smooth gradient transitions
- No layout shifts
- Proper layering with pointer events
- Accessibility compliance

## Requirements

- Must be used within a `ThemeProvider` context
- Requires theme configuration with gradients defined
- Client-side component (uses React hooks)

## Related Components

- `ThemeProvider`: Provides theme context
- `ProjectCard`: Uses GradientBorder for visual enhancement
- `ThemeSwitcher`: Controls which theme gradients are active

## Accessibility

- Uses `aria-hidden="true"` on decorative gradient layer
- Maintains proper content structure
- Does not interfere with keyboard navigation
- Preserves semantic HTML structure
