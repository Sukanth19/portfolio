import { Command } from '../types';

// This command is handled specially in the Terminal component
// It signals to clear the history
export const clearCommand: Command = {
    name: 'clear',
    description: 'Clear the terminal screen',
    execute:  () => '__CLEAR__', // Special marker
};
