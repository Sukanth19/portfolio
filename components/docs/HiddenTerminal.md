# HiddenTerminal Component

Easter egg terminal interface accessible via keyboard shortcut.

## Overview

The HiddenTerminal component provides a retro-styled command-line interface as an interactive easter egg. Users can discover it by pressing `Ctrl+~` and interact with various commands to learn more about the portfolio.

## Features

- **Keyboard Activation**: Press `Ctrl+~` to open the terminal
- **Command Execution**: Type commands and press Enter to execute
- **Command History**: Use arrow keys (↑/↓) to navigate through previous commands
- **Theme-Aware Styling**: Adapts colors and effects to the active theme
- **Retro Terminal UI**: Monospace font, command prompt, and classic terminal aesthetics
- **Multiple Commands**: Supports `help`, `about`, and `projects` commands

## Usage

### Basic Usage

The terminal is automatically integrated into the application via the `TerminalWrapper` component in the root layout. No additional setup is required.

```tsx
// Already integrated in app/layout.tsx
<ThemeProvider>
  <TerminalWrapper>
    {children}
  </TerminalWrapper>
</ThemeProvider>
```

### Keyboard Shortcuts

- **Open Terminal**: `Ctrl+~` (Control + Tilde)
- **Close Terminal**: `Escape` or click outside the terminal
- **Navigate History**: `↑` (Up Arrow) and `↓` (Down Arrow)
- **Submit Command**: `Enter`

### Available Commands

1. **help** - Display all available commands with descriptions
2. **about** - Show portfolio owner information and interests
3. **projects** - List all portfolio projects with details

## Component Structure

### HiddenTerminal

Main terminal component that renders the UI and handles command execution.

**Props:**
- `isOpen: boolean` - Controls terminal visibility
- `onClose: () => void` - Callback when terminal should close

### TerminalWrapper

Wrapper component that provides global keyboard shortcuts and manages terminal state.

**Props:**
- `children: React.ReactNode` - Application content to wrap

## Terminal Command System

Commands are defined in `lib/terminal.ts` using the `TerminalCommand` interface:

```typescript
interface TerminalCommand {
  command: string;
  handler: (args: string[]) => string;
  description: string;
}
```

### Adding New Commands

To add a new command, update the `terminalCommands` registry in `lib/terminal.ts`:

```typescript
export const terminalCommands: Record<string, TerminalCommand> = {
  // ... existing commands
  mycommand: {
    command: 'mycommand',
    description: 'Description of my command',
    handler: (args: string[]) => {
      // Command logic here
      return 'Command output';
    },
  },
};
```

## Styling

The terminal uses theme-aware inline styles to adapt to the active theme:

- **Background**: Uses theme's primary and secondary background colors
- **Text**: Uses theme's primary and secondary text colors
- **Accents**: Uses theme's accent colors for prompts and borders
- **Effects**: Applies theme's shadow effects for depth

## Accessibility

- **Keyboard Navigation**: Full keyboard support for all interactions
- **Focus Management**: Auto-focuses input when terminal opens
- **Screen Readers**: Includes ARIA labels for interactive elements
- **Escape Hatch**: Multiple ways to close (Escape, click outside, close button)

## Requirements Satisfied

- **8.1**: Ctrl+~ keyboard shortcut to display terminal
- **8.2**: Text input simulating command-line interface
- **8.3**: Responds to "help", "about", and "projects" commands
- **8.4**: "help" displays available commands
- **8.5**: "about" displays portfolio owner information
- **8.6**: "projects" displays project list
- **8.7**: Escape key and click-outside close terminal

## Testing

A test page is available at `/terminal-test` that provides:

- Manual terminal opening button
- Command execution tests
- Keyboard shortcut instructions
- Visual test results

## Example Output

### help command
```
Available commands:

  help         - Display available commands
  about        - Display portfolio owner information
  projects     - Display project list

Type a command and press Enter to execute.
```

### about command
```
╔════════════════════════════════════════╗
║         Portfolio Information          ║
╚════════════════════════════════════════╝

Name:        Full Stack Developer
Focus:       Web Development & AI/ML
Location:    Remote

Interests:   TypeScript, React, Next.js
             AI/ML, Cybersecurity
             Linux, Terminal Tools
...
```

### projects command
```
╔════════════════════════════════════════╗
║            Project List                ║
╚════════════════════════════════════════╝

1. E-Commerce Platform
   A full-stack e-commerce platform...
   Tech: Next.js, TypeScript, PostgreSQL...
...
```

## Implementation Notes

- Terminal history is stored in component state (not persisted)
- Command history allows navigation with arrow keys
- Auto-scrolls to bottom when new output is added
- Input is auto-focused when terminal opens
- Prevents flash by stopping event propagation on terminal clicks
