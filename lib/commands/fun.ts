import { Command } from '../types';
import { getASCIIBanner } from '../utils';

export const bannerCommand: Command = {
    name: 'banner',
    description: 'Display ASCII banner',
    execute: () => getASCIIBanner(),
};

export const whoamiCommand: Command = {
    name: 'whoami',
    description: 'Display username',
    execute: () => 'sukanth19',
};

export const neofetchCommand: Command = {
    name: 'neofetch',
    description: 'Display system information',
    execute: () => {
        return `
        ${getASCIIBanner()}

        sukanth19@portfolio
        ───────────────────
        OS:            Portfolio OS v1.0
        Host:         Vercel Edge Network
        Kernel:       Next.js 14
        Uptime:       ${Math.floor(performance.now() / 1000)} seconds
        Shell:        termsh 1.0.0
        Resolution:   ${typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'N/A'}
        Terminal:     WebTerminal
        CPU:          JavaScript V8 Engine
        Memory:       Infinite (for now)
        `.trim();
    },
};

export const sudoCommand: Command = {
    name: 'sudo',
    description: 'Execute command as superuser',
    execute: (args) => {
        if (args.length === 0) {
            return 'usage: sudo <command>';
        }

        const command = args. join(' ');

        if (command.includes('rm -rf')) {
            return 'Nice try!  This portfolio is read-only.';
        }

        return `[sudo] password for sukanth19:
        Sorry, you don't have permission to use sudo.
        This incident will be reported.`;
    },
    hidden: true,
};

export const exitCommand: Command = {
    name: 'exit',
    description: 'Exit the terminal',
    execute: () => {
        return 'To exit, close this tab.  Or just keep exploring!  😊';
    },
};

export const dateCommand: Command = {
    name: 'date',
    description: 'Display current date and time',
    execute: () => new Date().toString(),
};

export const echoCommand: Command = {
    name: 'echo',
    description: 'Display a line of text',
    usage: 'echo <text>',
    execute: (args) => args.join(' '),
};
