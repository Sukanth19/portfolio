# ThemeProvider Documentation

## Overview

The `ThemeProvider` component is the core of the portfolio website's theme engine. It manages global theme state, provides theme context to all child components, and handles theme persistence via localStorage.

## Features

- **Four Theme Modes**: Supports `light`, `dark`, `vesper`, and `miami-nights` themes
- **localStorage Persistence**: Automatically saves and restores theme selection
- **Fast Theme Switching**: Applies themes within 300ms (Requirement 1.2)
- **Smooth Transitions**: All color changes transition smoothly over 200-400ms (Requirement 1.3)
- **CSS Custom Properties**: Applies theme colors as CSS variables for easy styling
- **Type Safety**: Full TypeScript support with strict typing

## Usage

### Basic Setup

Wrap your application with `ThemeProvider` in your root layout:

```tsx
import { ThemeProvider } from '@/components/ThemeProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Using the useTheme Hook

Access theme state and controls in any component:

```tsx
'use client';

import { useTheme } from '@/components/ThemeProvider';

export function MyComponent() {
  const { theme, setTheme, themeConfig } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme('miami-nights')}>
        Switch to Miami Nights
      </button>
    </div>
  );
}
```

### Using CSS Custom Properties

The ThemeProvider sets CSS custom properties that you can use in your styles:

```tsx
export function StyledComponent() {
  return (
    <div style={{
      backgroundColor: 'var(--color-bg-secondary)',
      color: 'var(--color-text-primary)',
      border: '2px solid var(--color-border-accent)',
      boxShadow: 'var(--effect-shadow-md)',
    }}>
      Content styled with CSS variables
    </div>
  );
}
```

### Using Theme Config Directly

Access theme configuration values programmatically:

```tsx
'use client';

import { useTheme } from '@/components/ThemeProvider';

export function DynamicComponent() {
  const { themeConfig } = useTheme();

  return (
    <div style={{
      backgroundColor: themeConfig.colors.background.primary,
      color: themeConfig.colors.text.primary,
    }}>
      Dynamically styled content
    </div>
  );
}
```

## API Reference

### ThemeProvider Props

```typescript
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode; // Default: 'dark'
}
```

### useTheme Hook Return Value

```typescript
interface ThemeContextValue {
  theme: ThemeMode;                    // Current active theme
  setTheme: (theme: ThemeMode) => void; // Function to change theme
  themeConfig: ThemeConfig;            // Current theme configuration
}
```

### Theme Modes

```typescript
type ThemeMode = 'light' | 'dark' | 'vesper' | 'miami-nights';
```

## CSS Custom Properties

The following CSS custom properties are set by ThemeProvider:

### Colors

- `--color-bg-primary`: Primary background color
- `--color-bg-secondary`: Secondary background color
- `--color-bg-tertiary`: Tertiary background color
- `--color-text-primary`: Primary text color
- `--color-text-secondary`: Secondary text color
- `--color-text-accent`: Accent text color
- `--color-interactive-primary`: Primary interactive element color
- `--color-interactive-secondary`: Secondary interactive element color
- `--color-interactive-hover`: Hover state color
- `--color-interactive-active`: Active state color
- `--color-border-default`: Default border color
- `--color-border-accent`: Accent border color

### Gradients

- `--gradient-primary`: Primary gradient
- `--gradient-secondary`: Secondary gradient
- `--gradient-accent`: Accent gradient

### Effects

- `--effect-glow-color`: Glow effect color (Miami Nights only)
- `--effect-glow-blur`: Glow effect blur radius (Miami Nights only)
- `--effect-shadow-sm`: Small shadow
- `--effect-shadow-md`: Medium shadow
- `--effect-shadow-lg`: Large shadow

### Transitions

- `--transition-duration-fast`: Fast transition duration (150ms)
- `--transition-duration-normal`: Normal transition duration (300ms)
- `--transition-duration-slow`: Slow transition duration (600ms)
- `--transition-easing`: Transition easing function

## Theme Persistence

The ThemeProvider automatically:

1. Saves theme selection to localStorage when changed
2. Restores theme from localStorage on page load
3. Falls back to default theme if no saved theme exists
4. Validates saved theme to ensure it's a valid theme mode

**localStorage Key**: `portfolio-theme`

## Implementation Details

### Preventing Flash of Unstyled Content

The ThemeProvider delays rendering until after the theme is restored from localStorage. This prevents a flash of the default theme before the saved theme is applied.

### Theme Application

When a theme is set:

1. Theme state is updated
2. Theme is saved to localStorage
3. CSS custom properties are applied to `document.documentElement`
4. `data-theme` attribute is set on the root element
5. Body background and text colors are updated with smooth transitions

### Performance

- Theme changes apply within 300ms (Requirement 1.2)
- Color transitions complete in 300ms (Requirement 1.3)
- No layout shifts or reflows during theme changes
- Minimal re-renders using React Context

## Requirements Satisfied

- **1.2**: Theme applies within 300ms
- **1.5**: Theme persisted in browser storage
- **1.6**: Theme restored on page load
- **13.4**: Theme-aware components respond to Theme_Engine state

## Related Files

- `types/theme.ts`: Theme type definitions
- `config/themes.ts`: Theme configuration objects
- `app/globals.css`: Global CSS with theme variables and transitions

## Examples

See `components/__example__ThemeUsage.tsx` for complete usage examples.
