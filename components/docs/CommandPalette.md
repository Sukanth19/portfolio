# CommandPalette Component

## Overview

VS Code-style command palette for quick navigation and actions. Provides fuzzy search functionality with keyboard navigation.

## Requirements

- **15.2**: Command Palette provides search functionality for navigation
- **15.3**: Command Palette displays available commands and shortcuts

## Features

- **Fuzzy Search**: Matches commands based on partial text input
- **Keyboard Navigation**: Arrow keys to navigate, Enter to execute
- **Theme-Aware**: Adapts styling to active theme
- **Visual Feedback**: Highlights selected command
- **Shortcut Display**: Shows keyboard shortcuts for commands

## Props

```typescript
interface CommandPaletteProps {
  isOpen: boolean;           // Whether the palette is visible
  onClose: () => void;       // Callback when palette should close
  commands: Command[];       // Array of available commands
}

interface Command {
  id: string;                // Unique command identifier
  label: string;             // Display name
  description?: string;      // Optional description
  shortcut?: string;         // Optional keyboard shortcut display
  action: () => void;        // Function to execute
  category?: string;         // Optional category for grouping
}
```

## Usage

```tsx
import { CommandPalette, Command } from '@/components/CommandPalette';

const commands: Command[] = [
  {
    id: 'nav-home',
    label: 'Go to Home',
    description: 'Navigate to the hero section',
    action: () => scrollToSection('hero'),
  },
];

<CommandPalette 
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  commands={commands}
/>
```

## Keyboard Shortcuts

- **Arrow Up/Down**: Navigate through commands
- **Enter**: Execute selected command
- **Escape**: Close palette (handled by wrapper)
- **Type**: Filter commands with fuzzy search

## Accessibility

- Keyboard-only navigation supported
- Focus management on open/close
- ARIA labels for screen readers
- Visual focus indicators

## Implementation Notes

- Uses simple fuzzy matching algorithm
- Auto-scrolls selected item into view
- Resets search and selection on open
- Prevents event propagation to avoid closing on internal clicks
