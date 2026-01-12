import { Command } from '../types';

export const clearCommand: Command = {
    name: 'clear',
    description: 'Clear the terminal screen',
    execute: () => {
        // This will be handled specially in the Terminal component
        return '__CLEAR__';
    },
};
