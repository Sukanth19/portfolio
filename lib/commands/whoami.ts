import { Command } from '../types';

export const whoamiCommand: Command = {
    name: 'whoami',
    description: 'Display username',
    execute: () => {
        return 'guest';
    },
};
