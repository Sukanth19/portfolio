# Scan Mode Easter Egg Feature

## Overview

The Scan Mode feature is an optional cybersecurity-themed visual overlay that adds scanlines, glitch effects, and corner indicators to the portfolio website. It's designed as a subtle easter egg that enhances the visual experience without compromising content readability.

## Components

### 1. ScanModeOverlay
The visual overlay component that renders all scan mode effects.

**File**: `components/ScanModeOverlay.tsx`

**Features**:
- Animated scanline effect (horizontal lines moving across screen)
- Subtle glitch effects (periodic displacement and opacity changes)
- Corner indicators (pulsing brackets in all four corners)
- Status indicator ("SCAN MODE ACTIVE" text at top center)
- Theme-aware colors that adapt to active theme
- Respects `prefers-reduced-motion` accessibility preference

**Props**:
- `isActive: boolean` - Controls whether the overlay is visible

### 2. ScanModeWrapper
The state management and control component.

**File**: `components/ScanModeWrapper.tsx`

**Features**:
- Global keyboard shortcut (`Ctrl+Shift+S`) to toggle scan mode
- Floating action button in bottom-right corner
- State management for scan mode active/inactive
- Theme-aware button styling
- Full accessibility support (ARIA labels, keyboard navigation)

**Props**:
- `children: React.ReactNode` - Child components to wrap

## Installation

The scan mode feature is already integrated into the application layout:

```tsx
// app/layout.tsx
import { ThemeProvider } from "@/components/ThemeProvider";
import { TerminalWrapper } from "@/components/TerminalWrapper";
import { ScanModeWrapper } from "@/components/ScanModeWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <TerminalWrapper>
            <ScanModeWrapper>
              {children}
            </ScanModeWrapper>
          </TerminalWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## Usage

### For Users

**Activate Scan Mode**:
1. Press `Ctrl+Shift+S` on your keyboard, OR
2. Click the circular button in the bottom-right corner

**Deactivate Scan Mode**:
1. Press `Ctrl+Shift+S` again, OR
2. Click the button again

### For Developers

**Using the Wrapper (Recommended)**:
```tsx
import { ScanModeWrapper } from '@/components/ScanModeWrapper';

function App() {
  return (
    <ScanModeWrapper>
      <YourContent />
    </ScanModeWrapper>
  );
}
```

**Using the Overlay Directly**:
```tsx
import { ScanModeOverlay } from '@/components/ScanModeOverlay';
import { useState } from 'react';

function CustomImplementation() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <button onClick={() => setIsActive(!isActive)}>
        Toggle Scan Mode
      </button>
      <ScanModeOverlay isActive={isActive} />
    </>
  );
}
```

## Visual Effects

### Scanline Overlay
- **Animation**: Moves from top to bottom over 8 seconds
- **Appearance**: Repeating horizontal lines with 2px spacing
- **Opacity**: 8% (very subtle)
- **Color**: Uses theme's primary interactive color

### Glitch Effect
- **Animation**: Periodic displacement at 92%, 94%, 96% of cycle
- **Displacement**: ±2px horizontal and vertical
- **Opacity**: 3-8%
- **Duration**: 3 seconds per cycle

### Corner Indicators
- **Position**: 20px from edges, 40x40px size
- **Animation**: Pulsing opacity (40-80%)
- **Timing**: Staggered (0s, 0.5s, 1s, 1.5s delays)
- **Color**: Theme's primary interactive color at 40% opacity

### Status Indicator
- **Position**: Top center of viewport
- **Text**: "[ SCAN MODE ACTIVE ]"
- **Font**: Monospace, 12px, 2px letter spacing
- **Animation**: Blinking (1.5s cycle)
- **Opacity**: 20-60%

## Theme Integration

All visual effects automatically adapt to the active theme:
- **Light Theme**: Subtle dark effects
- **Dark Theme**: Subtle light effects
- **Vesper Theme**: Mint-green accents
- **Miami Nights Theme**: Pink/cyan neon effects

The component uses `themeConfig.colors.interactive.primary` for all colored elements.

## Accessibility

### Keyboard Support
- `Ctrl+Shift+S`: Toggle scan mode
- `Tab`: Navigate to toggle button
- `Enter/Space`: Activate toggle button when focused

### Screen Readers
- Toggle button has descriptive ARIA labels
- Button state changes are announced
- Overlays use `pointer-events: none` to avoid blocking interactions

### Reduced Motion
When `prefers-reduced-motion` is enabled:
- All animations are disabled
- Static visual effects remain
- Functionality is preserved

### Focus Indicators
- Toggle button has visible focus outline
- Focus outline uses theme's primary interactive color
- 2px outline with 2px offset for visibility

## Performance

### Optimization Techniques
- CSS animations (GPU-accelerated)
- Fixed positioning (no layout recalculation)
- Minimal DOM elements (5 divs total)
- No JavaScript animation loops
- Conditional rendering (only when active)

### Z-Index Layers
- 9997: Corner indicators
- 9998: Glitch overlay
- 9999: Scanline overlay
- 10000: Status indicator
- 1000: Toggle button

## Browser Compatibility

- **Modern Browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **CSS Features**: Uses standard CSS animations and transforms
- **Fallback**: Gracefully degrades if CSS features unsupported

## Requirements Satisfied

- ✅ **Requirement 10.1**: Provide a toggle control for Scan_Mode
- ✅ **Requirement 10.2**: Apply scanline visual overlay when activated
- ✅ **Requirement 10.3**: Apply subtle glitch effects when activated
- ✅ **Requirement 10.4**: Remain non-intrusive to content readability
- ✅ **Requirement 10.5**: Remove all scan-related visual effects when deactivated

## Testing

### Manual Testing Checklist
- [ ] Press `Ctrl+Shift+S` to activate scan mode
- [ ] Verify scanlines appear and animate
- [ ] Verify glitch effects are subtle and periodic
- [ ] Verify corner indicators pulse
- [ ] Verify status indicator blinks
- [ ] Click toggle button to deactivate
- [ ] Verify all effects disappear
- [ ] Test in all four theme modes
- [ ] Test with `prefers-reduced-motion` enabled
- [ ] Test keyboard navigation to toggle button
- [ ] Test on mobile devices (responsive button position)

### Visual Regression Testing
- Compare screenshots in all theme modes
- Verify effects don't block content
- Verify button position on different viewport sizes

## Troubleshooting

### Effects Not Visible
- Check if scan mode is actually active (button should be filled)
- Verify theme is loaded (effects use theme colors)
- Check browser console for errors

### Performance Issues
- Reduce animation complexity if needed
- Check for conflicting CSS animations
- Verify GPU acceleration is working

### Button Not Visible
- Check z-index conflicts
- Verify button isn't hidden behind other elements
- Check responsive styles on mobile

## Future Enhancements

Potential improvements for future versions:
- Customizable keyboard shortcut
- Adjustable effect intensity
- Additional glitch patterns
- Sound effects (optional)
- Persistence across page reloads
- Integration with command palette

## Related Documentation

- [ScanModeOverlay.md](./ScanModeOverlay.md) - Component API documentation
- [ScanModeWrapper.md](./ScanModeWrapper.md) - Wrapper component documentation
- [__example__ScanMode.tsx](./__example__ScanMode.tsx) - Usage examples
- [Requirements Document](../.kiro/specs/portfolio-website/requirements.md) - Requirement 10
- [Design Document](../.kiro/specs/portfolio-website/design.md) - Architecture details
