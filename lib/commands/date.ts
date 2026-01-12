import { Command } from '../types';

export const dateCommand: Command = {
    name: 'date',
    description: 'Display current date and time',
    execute: () => {
        return new Date().toString();
    },
};
