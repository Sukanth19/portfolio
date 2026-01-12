import { Command } from '../types';

export const echoCommand: Command = {
    name:  'echo',
    description:  'Display a line of text',
    usage: 'echo <text>',
    execute: (args) => {
        return args.join(' ') || '';
    },
};
