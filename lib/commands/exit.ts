import { Command } from '../types';

export const exitCommand: Command = {
    name: 'exit',
    description: 'Exit the terminal',
    execute: () => {
        return 'To exit, close this tab or browser window.';
    },
};
