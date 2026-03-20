# Terminal Command System

Command registry and execution system for the Hidden Terminal easter egg.

## Overview

The terminal command system provides a simple, extensible framework for defining and executing commands in the Hidden Terminal. Commands are registered in a central registry and executed through a command parser.

## Architecture

### TerminalCommand Interface

Defines the structure of a terminal command:

```typescript
interface TerminalCommand {
  command: string;        // Command name (e.g., "help")
  handler: (args: string[]) => string;  // Function that executes the command
  description: string;    // Human-readable description
}
```

### Command Registry

Commands are stored in a registry object for easy lookup:

```typescript
const terminalCommands: Record<string, TerminalCommand> = {
  help: { /* ... */ },
  about: { /* ... */ },
  projects: { /* ... */ },
};
```

## Built-in Commands

### help

Displays all available commands with their descriptions.

**Usage:** `help`

**Output:**
```
Available commands:

  help         - Display available commands
  about        - Display portfolio owner information
  projects     - Display project list

Type a command and press Enter to execute.
```

### about

Displays portfolio owner information including name, focus, location, and interests.

**Usage:** `about`

**Output:** Formatted ASCII box with portfolio information

### projects

Lists all portfolio projects with titles, descriptions, technologies, and links.

**Usage:** `projects`

**Output:** Formatted list of all projects from the data layer

## Command Execution

### executeCommand Function

Parses and executes terminal commands:

```typescript
function executeCommand(input: string): string
```

**Process:**
1. Trim and validate input
2. Split input into command and arguments
3. Look up command in registry
4. Execute command handler with arguments
5. Return output or error message

**Error Handling:**
- Empty input returns empty string
- Unknown commands return "Command not found" message
- Handler exceptions are caught and returned as error messages

## Adding New Commands

To add a new command:

1. Define the command in the `terminalCommands` registry:

```typescript
export const terminalCommands: Record<string, TerminalCommand> = {
  // ... existing commands
  
  skills: {
    command: 'skills',
    description: 'Display technical skills',
    handler: (args: string[]) => {
      return [
        '╔════════════════════════════════════════╗',
        '║          Technical Skills              ║',
        '╚════════════════════════════════════════╝',
        '',
        'Languages:   TypeScript, JavaScript, Python',
        'Frontend:    React, Next.js, Tailwind CSS',
        'Backend:     Node.js, Express, PostgreSQL',
        '',
      ].join('\n');
    },
  },
};
```

2. The command will automatically appear in the `help` output
3. Users can execute it by typing the command name

## Command Handler Guidelines

### Best Practices

1. **Return formatted strings**: Use newlines and spacing for readability
2. **Use ASCII art sparingly**: Box characters add visual interest but should be simple
3. **Handle arguments**: Even if not used, accept the args parameter
4. **Keep output concise**: Terminal space is limited
5. **Use consistent formatting**: Match the style of existing commands

### Example Handler

```typescript
handler: (args: string[]) => {
  // Build output as array of lines
  const output = [
    '╔════════════════════════════════════════╗',
    '║            Command Output              ║',
    '╚════════════════════════════════════════╝',
    '',
  ];
  
  // Add dynamic content
  if (args.length > 0) {
    output.push(`Arguments: ${args.join(', ')}`);
  }
  
  output.push('');
  
  // Return joined string
  return output.join('\n');
}
```

## Integration with Data Layer

Commands can access data from the application's data layer:

```typescript
import { projects } from './data';

// In command handler
handler: () => {
  const output = ['Projects:'];
  projects.forEach(project => {
    output.push(`- ${project.title}`);
  });
  return output.join('\n');
}
```

## Error Handling

### Command Not Found

When a user enters an unknown command:

```
Command not found: unknowncommand
Type "help" for available commands.
```

### Handler Exceptions

If a command handler throws an error:

```
Error executing command: [error message]
```

## Testing

Test commands using the `executeCommand` function:

```typescript
import { executeCommand } from '@/lib/terminal';

// Test help command
const helpOutput = executeCommand('help');
console.log(helpOutput);

// Test with arguments
const output = executeCommand('mycommand arg1 arg2');
console.log(output);

// Test invalid command
const errorOutput = executeCommand('invalid');
console.log(errorOutput);
```

## Requirements Satisfied

- **8.3**: Responds to "help", "about", and "projects" commands
- **8.4**: "help" displays available commands
- **8.5**: "about" displays portfolio owner information
- **8.6**: "projects" displays project list

## Future Enhancements

Potential additions to the command system:

1. **Command aliases**: Allow multiple names for the same command
2. **Command arguments**: Parse and validate command arguments
3. **Command history**: Persist command history across sessions
4. **Tab completion**: Auto-complete command names
5. **Help for specific commands**: `help <command>` shows detailed help
6. **Command categories**: Group related commands together
7. **Interactive commands**: Commands that prompt for additional input
8. **Command output formatting**: Support for colors, bold, etc.
