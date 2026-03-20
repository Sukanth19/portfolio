# Portfolio Website Components

This directory contains all React components for the portfolio website.

## Component Categories

### Core Components

- **ThemeProvider** - Global theme state management and context provider
- **ThemeSwitcher** - UI control for switching between theme modes
- **TerminalWrapper** - Global keyboard shortcut handler for Hidden Terminal

### Layout Components

- **Navbar** - Sticky navigation bar with theme switcher
- **Section** - Reusable section wrapper with consistent spacing

### Content Components

- **HeroSection** - Landing section with introduction
- **AboutSection** - About section with personal information
- **ProjectsSection** - Projects display with card layout
- **ProjectCard** - Individual project card with hover effects
- **ProjectModal** - Modal for expanded project details
- **SkillsSection** - Technical skills display
- **ContactSection** - Contact information and methods

### Visual Components

- **NeuralBackground** - Animated AI-inspired background
- **GradientBorder** - Theme-aware decorative border
- **AnimatedElement** - Framer Motion animation wrapper

### Easter Egg Components

- **HiddenTerminal** - Retro terminal interface (Ctrl+~ to activate)

## Component Documentation

Each component has a corresponding `.md` file with detailed documentation:

- Component overview and features
- Props interface and types
- Usage examples
- Styling approach
- Requirements satisfied
- Implementation notes

## Test Components

Test components are prefixed with `__test__` and provide manual testing interfaces:

- `__test__HiddenTerminal.tsx` - Terminal functionality tests
- `__test__AnimatedElement.tsx` - Animation tests
- `__test__GradientBorder.tsx` - Gradient border tests
- `__test__Navbar.tsx` - Navigation tests
- `__test__NeuralBackground.tsx` - Background animation tests
- `__test__Section.tsx` - Section layout tests
- `__test__ThemeSwitcher.tsx` - Theme switching tests

## Example Components

Example components are prefixed with `__example__` and demonstrate component usage:

- `__example__AnimatedElement.tsx` - Animation examples
- `__example__GradientBorder.tsx` - Border examples
- `__example__Navbar.tsx` - Navigation examples
- `__example__Section.tsx` - Section examples
- `__example__ThemeSwitcher.tsx` - Theme switcher examples
- `__example__ThemeUsage.tsx` - Theme context usage

## Theme Integration

Most components are theme-aware and use the `useTheme` hook to access theme configuration:

```typescript
import { useTheme } from './ThemeProvider';

function MyComponent() {
  const { theme, themeConfig } = useTheme();
  
  return (
    <div style={{ 
      backgroundColor: themeConfig.colors.background.primary,
      color: themeConfig.colors.text.primary 
    }}>
      Content
    </div>
  );
}
```

## Component Guidelines

### Naming Conventions

- PascalCase for component names
- Descriptive names that indicate purpose
- Suffix with "Section" for page sections
- Prefix with "__test__" for test components
- Prefix with "__example__" for example components

### File Structure

Each component should have:
- `.tsx` file with component implementation
- `.md` file with documentation
- Optional test component for manual testing

### Props Interface

Always define explicit TypeScript interfaces for props:

```typescript
interface MyComponentProps {
  title: string;
  description?: string;
  onClick?: () => void;
}

export function MyComponent({ title, description, onClick }: MyComponentProps) {
  // Component implementation
}
```

### Theme-Aware Styling

Use inline styles with theme configuration for dynamic theming:

```typescript
<div style={{
  backgroundColor: themeConfig.colors.background.primary,
  color: themeConfig.colors.text.primary,
  borderColor: themeConfig.colors.border.accent,
}}>
```

Or use CSS custom properties set by ThemeProvider:

```css
.my-component {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  border-color: var(--color-border-accent);
}
```

### Accessibility

All components should:
- Use semantic HTML elements
- Include ARIA labels where appropriate
- Support keyboard navigation
- Maintain focus indicators
- Respect prefers-reduced-motion

## Component Dependencies

### External Dependencies

- `react` - Core React library
- `next` - Next.js framework
- `framer-motion` - Animation library

### Internal Dependencies

- `@/types/theme` - Theme type definitions
- `@/config/themes` - Theme configurations
- `@/lib/data` - Application data

## Adding New Components

1. Create component file: `ComponentName.tsx`
2. Define props interface with TypeScript
3. Implement component with theme awareness
4. Create documentation file: `ComponentName.md`
5. Add test component if needed: `__test__ComponentName.tsx`
6. Update this README if adding a new category

## Component Testing

### Manual Testing

Use test components to manually verify functionality:

```bash
# Start development server
npm run dev

# Navigate to test pages
# /navbar-demo - Navbar test
# /terminal-test - Terminal test
```

### Build Testing

Verify components compile correctly:

```bash
npm run build
```

## Easter Eggs

The portfolio includes several easter egg features:

1. **Hidden Terminal** (Ctrl+~)
   - Retro terminal interface
   - Commands: help, about, projects
   - Theme-aware styling

2. **Neural Background** (Optional)
   - Animated AI-inspired background
   - Adapts to active theme

3. **Scan Mode** (Optional)
   - Cybersecurity-themed overlay
   - Scanline and glitch effects

## Future Components

Potential components to add:

- CommandPalette - VS Code-style command interface
- ScanModeOverlay - Cybersecurity visual effects
- Footer - Site footer with links
- ScrollProgress - Scroll position indicator
- BackToTop - Scroll to top button
