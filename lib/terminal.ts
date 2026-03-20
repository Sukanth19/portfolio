/**
 * Terminal Command System
 * 
 * Defines terminal command interface, command registry, and command handlers
 * for the Hidden Terminal easter egg feature.
 * 
 * @see Requirements 8.3, 8.4, 8.5, 8.6
 */

import { projects } from './data';

/**
 * Terminal command interface
 */
export interface TerminalCommand {
  command: string;
  handler: (args: string[]) => string;
  description: string;
}

/**
 * Terminal command registry
 */
export const terminalCommands: Record<string, TerminalCommand> = {
  help: {
    command: 'help',
    description: 'Display available commands',
    handler: () => {
      const commands = Object.values(terminalCommands);
      const output = [
        'Available commands:',
        '',
        ...commands.map(cmd => `  ${cmd.command.padEnd(12)} - ${cmd.description}`),
        '',
        'Type a command and press Enter to execute.',
      ];
      return output.join('\n');
    },
  },
  about: {
    command: 'about',
    description: 'Display portfolio owner information',
    handler: () => {
      const output = [
        '╔════════════════════════════════════════╗',
        '║         Portfolio Information          ║',
        '╚════════════════════════════════════════╝',
        '',
        'Name:        Full Stack Developer',
        'Focus:       Web Development & AI/ML',
        'Location:    Remote',
        '',
        'Interests:   TypeScript, React, Next.js',
        '             AI/ML, Cybersecurity',
        '             Linux, Terminal Tools',
        '',
        'This portfolio showcases projects built',
        'with modern web technologies and features',
        'a dynamic theme engine with four unique',
        'visual modes.',
        '',
        'Try "projects" to see my work!',
      ];
      return output.join('\n');
    },
  },
  projects: {
    command: 'projects',
    description: 'Display project list',
    handler: () => {
      const output = [
        '╔════════════════════════════════════════╗',
        '║            Project List                ║',
        '╚════════════════════════════════════════╝',
        '',
      ];
      
      projects.forEach((project, index) => {
        output.push(`${index + 1}. ${project.title}`);
        output.push(`   ${project.description}`);
        output.push(`   Tech: ${project.technologies.join(', ')}`);
        if (project.githubUrl) {
          output.push(`   GitHub: ${project.githubUrl}`);
        }
        if (project.liveUrl) {
          output.push(`   Live: ${project.liveUrl}`);
        }
        output.push('');
      });
      
      return output.join('\n');
    },
  },
};

/**
 * Execute a terminal command
 * 
 * @param input - The command input string
 * @returns The command output or error message
 */
export function executeCommand(input: string): string {
  const trimmed = input.trim();
  
  if (!trimmed) {
    return '';
  }
  
  const parts = trimmed.split(/\s+/);
  const commandName = parts[0].toLowerCase();
  const args = parts.slice(1);
  
  const command = terminalCommands[commandName];
  
  if (!command) {
    return `Command not found: ${commandName}\nType "help" for available commands.`;
  }
  
  try {
    return command.handler(args);
  } catch (error) {
    return `Error executing command: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}
