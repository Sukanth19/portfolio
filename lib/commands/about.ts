import { Command } from '../types';

export const aboutCommand:   Command = {
    name:   'about',
    description:   'Learn about me',
    execute: () => {
        let output = '╔═══════════════════════════════════════════════════════════════════\n';
        output += '║ ABOUT ME\n';
        output += '╠═══════════════════════════════════════════════════════════════════\n';
        output += '║\n';
        output += "║  I'm Sukanth.\n";
        output += '║\n';
        output += '║  I build software, break abstractions, and care about how things\n';
        output += '║  work under the hood.\n';
        output += '║\n';
        output += '║  Interested in full-stack systems, applied ML and real-world\n';
        output += '║  products. Linux user (Arch + Hyprland).\n';
        output += '║\n';
        output += '╠═══════════════════════════════════════════════════════════════════\n';
        output += '║ Run:\n';
        output += '║   skills    - tech i use\n';
        output += '║   projects  - work that matters\n';
        output += '║   links     - GitHub & contact\n';
        output += '╚═══════════════════════════════════════════════════════════════════';

        return output;
    },
};
