# ThemeSwitcher Component

UI control for selecting between theme modes in the portfolio website.

## Features

- **All Theme Modes**: Displays all four available themes (light, dark, vesper, miami-nights)
- **Active Indicator**: Visual highlight for the currently active theme
- **Click Handling**: Switches theme on button click
- **Responsive Design**: Adapts to all viewport sizes (desktop, tablet, mobile)
- **Theme-Aware Styling**: Applies colors and effects based on active theme
- **Accessibility**: Full ARIA support with radio group semantics

## Usage

```tsx
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export default function Header() {
  return (
    <header>
      <nav>
        {/* Default button variant */}
        <ThemeSwitcher />
      </nav>
    </header>
  );
}
```

## Props

### `variant`
- Type: `'buttons' | 'compact'`
- Default: `'buttons'`
- Description: Display variant for the theme switcher

### `className`
- Type: `string`
- Default: `''`
- Description: Additional CSS classes to apply

## Variants

### Buttons (Default)
Full-width buttons with icons and labels. Wraps on small screens.

```tsx
<ThemeSwitcher variant="buttons" />
```

### Compact
Horizontal layout optimized for navigation bars. Shows icons only on very small screens.

```tsx
<ThemeSwitcher variant="compact" />
```

## Responsive Behavior

- **Desktop (>640px)**: Full buttons with icons and labels
- **Tablet/Mobile (≤640px)**: Compact buttons with smaller text
- **Small Mobile (≤480px)**: Icon-only mode in compact variant

## Theme Integration

The component uses the `useTheme` hook from `ThemeProvider` to:
- Access the current theme mode
- Switch between themes
- Apply theme-specific styling

All colors and effects are automatically applied via CSS custom properties:
- `--color-bg-secondary`: Background color
- `--color-interactive-primary`: Active button color
- `--color-text-primary`: Text color
- Theme-specific shadows and glows

## Accessibility

- Uses `role="radiogroup"` for the container
- Each button has `role="radio"` with `aria-checked` state
- Descriptive `aria-label` for each theme option
- Keyboard navigation support
- Focus visible indicators

## Requirements

Implements the following requirements:
- **4.1**: Display all four available Theme_Modes
- **4.2**: Indicate currently active Theme_Mode
- **4.3**: Activate Theme_Mode on click
- **4.4**: Visual integration with design aesthetic
- **4.5**: Accessible on all viewport sizes
