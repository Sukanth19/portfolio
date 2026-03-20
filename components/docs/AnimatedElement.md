# AnimatedElement Component

## Overview

The `AnimatedElement` component is a reusable wrapper that provides Framer Motion animations with built-in accessibility support. It automatically detects and respects the user's `prefers-reduced-motion` system setting.

## Features

- **Three animation types**: fade, slide, and scale
- **Four slide directions**: up, down, left, right
- **Accessibility-first**: Automatically detects and respects `prefers-reduced-motion`
- **Performance-optimized**: Maximum 600ms animation duration
- **Viewport-aware**: Animations trigger when elements enter viewport

## Usage

### Basic Fade Animation

```tsx
import { AnimatedElement } from '@/components/AnimatedElement';

<AnimatedElement animation="fade">
  <div>This content will fade in</div>
</AnimatedElement>
```

### Slide Animation with Direction

```tsx
<AnimatedElement animation="slide" direction="up">
  <div>This content will slide up</div>
</AnimatedElement>
```

### Scale Animation with Delay

```tsx
<AnimatedElement animation="scale" delay={0.2}>
  <div>This content will scale in after 200ms</div>
</AnimatedElement>
```

### Custom Duration

```tsx
<AnimatedElement animation="fade" duration={0.5}>
  <div>This content will fade in over 500ms</div>
</AnimatedElement>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | Required | Content to animate |
| `animation` | `'fade' \| 'slide' \| 'scale'` | Required | Animation type |
| `direction` | `'up' \| 'down' \| 'left' \| 'right'` | `'up'` | Slide direction (only for slide animation) |
| `delay` | `number` | `0` | Delay before animation starts (in seconds) |
| `duration` | `number` | `0.4` | Animation duration (in seconds, max 0.6) |

## Animation Types

### Fade
Simple opacity transition from 0 to 1.

### Slide
Combines opacity with directional movement:
- **up**: Slides from bottom to position
- **down**: Slides from top to position
- **left**: Slides from right to position
- **right**: Slides from left to position

### Scale
Combines opacity with scale transformation (0.9 to 1.0).

## Accessibility

The component automatically detects the `prefers-reduced-motion` system setting:

- **When enabled**: Animations are minimized to a subtle opacity change only
- **When disabled**: Full animations are applied as specified

This ensures users who prefer reduced motion have a comfortable experience while others enjoy the full visual effects.

## Requirements Validation

**Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5**

- ✅ 7.1: Uses Framer Motion library
- ✅ 7.2: Limits animation types to fade, slide, and scale only
- ✅ 7.3: Enforces maximum 600ms animation duration
- ✅ 7.4: Detects user's prefers-reduced-motion system setting
- ✅ 7.5: Disables/minimizes animations when prefers-reduced-motion is enabled

## Examples

### Staggered List Items

```tsx
{items.map((item, index) => (
  <AnimatedElement
    key={item.id}
    animation="slide"
    direction="up"
    delay={index * 0.1}
  >
    <ListItem {...item} />
  </AnimatedElement>
))}
```

### Hero Section

```tsx
<AnimatedElement animation="fade" duration={0.6}>
  <h1>Welcome to My Portfolio</h1>
</AnimatedElement>

<AnimatedElement animation="slide" direction="up" delay={0.2}>
  <p>Full-stack developer specializing in React and TypeScript</p>
</AnimatedElement>
```

### Project Cards

```tsx
<AnimatedElement animation="scale" delay={0.3}>
  <ProjectCard {...project} />
</AnimatedElement>
```
