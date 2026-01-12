import { Command } from '../types';
import { commands } from './index';

export const helpCommand: Command = {
    name: 'help',
    description: 'Display available commands',
    usage: 'help [command]',
    execute:   (args) => {
        if (args.length > 0) {
            const cmdName = args[0].toLowerCase();
            const cmd = commands[cmdName];

            if (!cmd || cmd.hidden) {
                return `Command '${cmdName}' not found. Type 'help' for available commands.`;
            }

            return `
            ${cmd.name.toUpperCase()}

            Description
            ${cmd.description}

            Usage
            ${cmd. usage || cmd.name}
            `.trim();
        }

        // Group commands by category
        const info = ['about', 'skills', 'projects', 'project', 'education', 'links', 'contact'];
        const system = ['help', 'clear', 'banner', 'neofetch', 'whoami', 'date', 'echo', 'exit'];

        let output = 'Available Commands\n\nPortfolio\n';

        info.forEach((name, i, arr) => {
            const cmd = commands[name];
            if (cmd && ! cmd.hidden) {
                const prefix = i === arr.length - 1 ? '  └─' : '  ├─';
                output += `${prefix} ${name.padEnd(12)} ${cmd.description}\n`;
            }
        });

        output += '\nSystem\n';

        system.forEach((name, i, arr) => {
            const cmd = commands[name];
            if (cmd && !cmd.hidden) {
                const prefix = i === arr.length - 1 ?  '  └─' : '  ├─';
                output += `${prefix} ${name.padEnd(12)} ${cmd.description}\n`;
            }
        });

        output += '\nType \'help <command>\' for details about a specific command. ';

        return output;
    },
};
