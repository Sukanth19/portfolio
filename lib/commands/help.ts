import { Command } from '../types';
import { commands } from './index';

export const helpCommand: Command = {
    name: 'help',
    description: 'Display available commands',
    usage: 'help [command]',
    execute: (args) => {
        if (args.length > 0) {
            const cmdName = args[0].toLowerCase();
            const cmd = commands[cmdName];

            if (! cmd || cmd.hidden) {
                return `Command '${cmdName}' not found.  Type 'help' to see available commands.`;
            }

            return `
            ${cmd.name. toUpperCase()}
            ${cmd.description}
            ${cmd.usage ? `Usage: ${cmd.usage}` : ''}
            `.trim();
        }

        // List all non-hidden commands
        const commandList = Object.values(commands)
        .filter(cmd => ! cmd.hidden)
        .map(cmd => `  ${cmd.name.padEnd(15)} ${cmd.description}`)
        .join('\n');

        return `
        Available commands:

        ${commandList}

        Type 'help <command>' for more information about a specific command.
        `.trim();
    },
};
