# CommandPaletteWrapper Component

## Overview

Wraps the application and provides global keyboard shortcuts for the Command Palette. Defines navigation and theme switching commands.

## Requirements

- **15.1**: Ctrl+K or Cmd+K to open command palette
- **15.4**: Execute corresponding action on command selection
- **15.5**: Escape key to close command palette

## Features

- **Global Keyboard Shortcuts**: Ctrl+K / Cmd+K to open
- **Navigation Commands**: Quick access to all sections
- **Theme Commands**: Switch themes via command palette
- **Scroll Commands**: Jump to top or bottom of page
- **Command Registry**: Centralized command definitions

## Available Commands

### Navigation
- Go to Home
- Go to About
- Go to Projects
- Go to Skills
- Go to Contact
- Scroll to Top
- Scroll to Bottom

### Theme
- Switch to Light Theme
- Switch to Dark Theme
- Switch to Vesper Theme
- Switch to Miami Nights Theme

## Props

```typescript
interface CommandPaletteWrapperProps {
  children: React.ReactNode;  // Application content to wrap
}
```

## Usage

```tsx
import { CommandPaletteWrapper } from '@/components/CommandPaletteWrapper';

<CommandPaletteWrapper>
  <App />
</CommandPaletteWrapper>
```

## Keyboard Shortcuts

- **Ctrl+K** (Windows/Linux) or **Cmd+K** (Mac): Open command palette
- **Escape**: Close command palette

## Implementation Notes

- Integrates with ThemeProvider for theme switching
- Uses smooth scroll for navigation
- Accounts for fixed navbar height when scrolling
- Cleans up event listeners on unmount
- Commands are defined in a centralized array for easy extension
