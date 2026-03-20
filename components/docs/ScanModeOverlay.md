# ScanModeOverlay Component

## Overview

The `ScanModeOverlay` component provides a cybersecurity-themed visual overlay with scanlines and glitch effects. It's an optional easter egg feature that enhances the portfolio with a retro-futuristic aesthetic when activated.

## Features

- **Scanline Effect**: Animated horizontal scanlines that move across the screen
- **Glitch Effects**: Subtle periodic glitch animations for a cyberpunk feel
- **Corner Indicators**: Pulsing corner brackets that frame the viewport
- **Status Indicator**: "SCAN MODE ACTIVE" text at the top center
- **Theme-Aware**: All colors adapt to the active theme
- **Non-Intrusive**: Low opacity and careful positioning ensure content readability
- **Accessibility**: Respects `prefers-reduced-motion` user preference

## Usage

```tsx
import { ScanModeOverlay } from '@/components/ScanModeOverlay';

function MyComponent() {
  const [isScanActive, setIsScanActive] = useState(false);

  return (
    <>
      <button onClick={() => setIsScanActive(!isScanActive)}>
        Toggle Scan Mode
      </button>
      <ScanModeOverlay isActive={isScanActive} />
    </>
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isActive` | `boolean` | Yes | Controls whether the overlay is visible |

## Visual Effects

### Scanline Overlay
- Repeating horizontal lines with theme-aware color
- Animates from top to bottom over 8 seconds
- Very low opacity (8%) to maintain readability

### Glitch Effect
- Periodic displacement and opacity changes
- Triggers at 92%, 94%, and 96% of animation cycle
- Extremely subtle (3-8% opacity)

### Corner Indicators
- Four corner brackets with pulsing animation
- Staggered animation timing for visual interest
- 40% opacity theme-colored borders

### Status Indicator
- Monospace text displaying "SCAN MODE ACTIVE"
- Blinking animation for attention
- Centered at top of viewport

## Theme Integration

The component uses the following theme properties:
- `themeConfig.colors.interactive.primary` - Primary color for effects
- Automatically adapts to all four theme modes (Light, Dark, Vesper, Miami Nights)

## Accessibility

- All overlays use `pointer-events: none` to avoid blocking interactions
- Respects `prefers-reduced-motion` media query
- When reduced motion is preferred, all animations are disabled
- Does not interfere with keyboard navigation or screen readers

## Performance

- Uses CSS animations for optimal performance
- Fixed positioning with high z-index (9997-10000)
- Minimal DOM elements (5 divs total)
- No JavaScript animation loops

## Requirements Satisfied

- **Requirement 10.2**: Apply scanline visual overlay when activated
- **Requirement 10.3**: Apply subtle glitch effects when activated
- **Requirement 10.4**: Remain non-intrusive to content readability

## Related Components

- `ScanModeWrapper` - Manages scan mode state and toggle control
- `ThemeProvider` - Provides theme configuration
