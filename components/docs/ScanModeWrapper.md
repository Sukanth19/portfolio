# ScanModeWrapper Component

## Overview

The `ScanModeWrapper` component manages the scan mode state and provides both a visual toggle button and keyboard shortcut for activating the scan mode overlay. It wraps the application to provide global scan mode functionality.

## Features

- **Keyboard Shortcut**: `Ctrl+Shift+S` to toggle scan mode
- **Toggle Button**: Floating action button in bottom-right corner
- **State Management**: Manages scan mode active/inactive state
- **Visual Feedback**: Button appearance changes based on active state
- **Theme-Aware**: Button styling adapts to active theme
- **Accessibility**: Full keyboard support and ARIA labels

## Usage

```tsx
import { ScanModeWrapper } from '@/components/ScanModeWrapper';

export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
      <ScanModeWrapper>
        {children}
      </ScanModeWrapper>
    </ThemeProvider>
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `React.ReactNode` | Yes | Child components to wrap |

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+S` | Toggle scan mode on/off |

## Toggle Button

### Position
- Fixed position at bottom-right corner
- Desktop: 20px from bottom and right
- Mobile: 80px from bottom, 16px from right (to avoid conflicts with other UI)

### Visual States

**Inactive State:**
- Hollow circle (○) icon
- Secondary background color
- Primary text color
- Subtle shadow

**Active State:**
- Filled circle (◉) icon
- Primary interactive color background
- Inverted text color
- Enhanced shadow

### Interactions
- **Hover**: Scales to 110% with enhanced shadow
- **Active**: Scales to 95% for press feedback
- **Focus**: Visible outline for keyboard navigation

## Theme Integration

The component uses the following theme properties:
- `themeConfig.colors.border.accent` - Button border
- `themeConfig.colors.background.secondary` - Inactive background
- `themeConfig.colors.interactive.primary` - Active background
- `themeConfig.colors.text.primary` - Text color
- `themeConfig.effects.shadow.*` - Shadow effects
- `themeConfig.transitions.*` - Animation timing

## Accessibility

- **ARIA Label**: Descriptive label changes based on state
- **Title Attribute**: Shows current state and keyboard shortcut
- **Keyboard Support**: Full keyboard navigation support
- **Focus Indicators**: Visible focus outline
- **Button Type**: Properly typed as button element

## Implementation Details

### State Management
```typescript
const [isScanModeActive, setIsScanModeActive] = useState(false);
```

### Event Handling
- Global keyboard event listener for `Ctrl+Shift+S`
- Click handler for toggle button
- Proper cleanup on component unmount

### Responsive Design
- Button size adjusts for mobile viewports
- Position adjusts to avoid UI conflicts
- Touch-friendly size on mobile (44x44px minimum)

## Requirements Satisfied

- **Requirement 10.1**: Provide a toggle control for Scan_Mode
- **Requirement 10.5**: Remove all scan-related visual effects when deactivated

## Related Components

- `ScanModeOverlay` - The visual overlay component
- `ThemeProvider` - Provides theme configuration
- `TerminalWrapper` - Similar pattern for terminal easter egg

## Example Integration

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
