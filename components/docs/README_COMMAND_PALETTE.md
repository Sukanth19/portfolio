# Command Palette Feature

## Overview

The Command Palette is an optional VS Code-style quick navigation and action interface for the portfolio website. It provides keyboard-driven access to all major sections and theme switching functionality.

## Requirements Implemented

- **15.1**: Ctrl+K or Cmd+K to open command palette
- **15.2**: Provides search functionality for navigation
- **15.3**: Displays available commands and shortcuts
- **15.4**: Executes corresponding action on command selection
- **15.5**: Escape key to close command palette

## Components

### CommandPalette (`components/CommandPalette.tsx`)

The main UI component that displays the command palette interface.

**Features:**
- Fuzzy search matching for commands
- Keyboard navigation (Arrow Up/Down, Enter)
- Visual feedback for selected command
- Theme-aware styling
- Responsive design

**Props:**
```typescript
interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  commands: Command[];
}
```

### CommandPaletteWrapper (`components/CommandPaletteWrapper.tsx`)

Wrapper component that manages global keyboard shortcuts and command registry.

**Features:**
- Global keyboard listener for Ctrl+K / Cmd+K
- Command registry with navigation and theme commands
- Integration with ThemeProvider
- Smooth scroll navigation

**Available Commands:**
- Navigation: Home, About, Projects, Skills, Contact, Scroll to Top/Bottom
- Theme: Switch to Light, Dark, Vesper, Miami Nights

## Usage

### Opening the Command Palette

Press **Ctrl+K** (Windows/Linux) or **Cmd+K** (Mac) from anywhere on the page.

### Searching for Commands

1. Type to filter commands using fuzzy search
2. Use Arrow Up/Down to navigate through results
3. Press Enter to execute the selected command
4. Press Escape to close without executing

### Example Searches

- Type "home" → "Go to Home"
- Type "proj" → "Go to Projects"
- Type "dark" → "Switch to Dark Theme"
- Type "miami" → "Switch to Miami Nights Theme"

## Integration

The CommandPaletteWrapper is integrated in `app/layout.tsx`:

```tsx
<ThemeProvider>
  <CommandPaletteWrapper>
    <TerminalWrapper>
      <ScanModeWrapper>
        {children}
      </ScanModeWrapper>
    </TerminalWrapper>
  </CommandPaletteWrapper>
</ThemeProvider>
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+K / Cmd+K | Open command palette |
| Escape | Close command palette |
| Arrow Up | Navigate to previous command |
| Arrow Down | Navigate to next command |
| Enter | Execute selected command |
| Type | Filter commands with fuzzy search |

## Accessibility

- Full keyboard navigation support
- Focus management on open/close
- Visual focus indicators
- Screen reader compatible
- No mouse required for operation

## Extending Commands

To add new commands, edit the `commands` array in `CommandPaletteWrapper.tsx`:

```typescript
const commands: Command[] = [
  // ... existing commands
  {
    id: 'my-command',
    label: 'My Custom Command',
    description: 'Description of what it does',
    category: 'Custom',
    action: () => {
      // Your action here
    },
  },
];
```

## Theme Integration

The command palette automatically adapts to the active theme:
- Background colors from theme configuration
- Border colors and accents
- Text colors for readability
- Shadow effects for depth

## Performance

- Lazy loaded via dynamic import (code splitting)
- Only rendered when open
- Minimal bundle size impact
- Smooth animations with CSS transitions

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Keyboard shortcuts work on all platforms
- Cmd key detection for Mac users

## Testing

To test the command palette:

1. Start the dev server: `npm run dev`
2. Open http://localhost:3000
3. Press Ctrl+K (or Cmd+K on Mac)
4. Try searching for commands
5. Test keyboard navigation
6. Verify theme switching works
7. Test section navigation

## Known Limitations

- Fuzzy search is simple (not weighted)
- No command history or favorites
- No command categories in UI (only in code)
- No custom keyboard shortcuts per command

## Future Enhancements

Potential improvements for future versions:
- Command history tracking
- Favorite/pinned commands
- Category grouping in UI
- Custom keyboard shortcuts
- Command aliases
- Recent commands section
- Command usage analytics
