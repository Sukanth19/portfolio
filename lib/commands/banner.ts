import { Command } from '../types';
import { getASCIIBanner } from '@/lib/utils';

export const bannerCommand: Command = {
    name:  'banner',
    description:  'Display ASCII banner',
    execute: () => {
        const banner = getASCIIBanner();
        const message = `
        Welcome to my portfolio!

        Type 'help' to see available commands.
        Type 'about' to learn more about me.`;

        return banner;
    },
};
