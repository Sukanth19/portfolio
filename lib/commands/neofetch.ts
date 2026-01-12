import { Command } from '../types';

export const neofetchCommand: Command = {
    name:  'neofetch',
    description: 'Display system information',
    execute: () => {
        const archArt = [
            '                   -`',
            '                  . o+`',
            '                 `ooo/',
            '                `+oooo:',
            '               `+oooooo: ',
            '               -+oooooo+: ',
            '             `/:-: ++oooo+:',
            '            `/++++/+++++++: ',
            '           `/++++++++++++++:',
            '          `/+++ooooooooooooo/`',
            '         ./ooosssso++osssssso+`',
            '        .oossssso-````/ossssss+`',
            '       -osssssso.       : ssssssso.',
            '      : osssssss/        osssso+++.',
            '     /ossssssss/        +ssssooo/-',
            '   `/ossssso+/:-        -:/+osssso+-',
            '  `+sso+:-`                 `.-/+oso: ',
            ' `++:.                            `-/+/',
            ' . `                                 `/',
        ];

        const info = [
            '┌─DISTRO ─→ Arch Linux x86_64',
            '│ ├─→ Linux 6.12.04-1-lts',
            '│ ├─→ fish 4.3.3',
            '│ └─→ 1929 (pacman), ? (flatpak)',
            '├─DE/WM ─→ Hyprland 0.53.1 (Wayland)',
            '│ ├─→ breeze-plus-dark [GTK2/3/4]',
            '│ ├─→ macOS (24px)',
            '│ ├─→ JetBrainsMonoNF-Regular (11pt)',
            '│ └─→ kitty 0.45.0',
            '├─SYSTEM ─→ OMEN by HP Gaming Laptop 16-xd0xxx',
            '│ ├─→ AMD Ryzen 7 7840HS (16) @ 3.14 GHz',
            '│ ├─→ GeForce RTX 4060 Max-Q / Mobile',
            '│ ├─→ AMD Radeon 780M Graphics',
            '│ ├─→ 1920x1080 @ 165Hz',
            '│ ├─→ Disabled',
            '│ └─→ 1920x1080 in 16", 165 Hz [Built-in]',
            '',
            '⬤ ⬤ ⬤ ⬤ ⬤ ⬤ ⬤ ⬤ ⬤ ⬤ ⬤ ⬤ ⬤ ⬤ ⬤ ⬤',
        ];

        // Combine ASCII art and info side by side
        const maxLines = Math.max(archArt.length, info.length);
        const output:  string[] = [];

        for (let i = 0; i < maxLines; i++) {
            const artLine = archArt[i] || '';
            const infoLine = info[i] || '';
            // Pad art to 40 chars for alignment
            const paddedArt = artLine.padEnd(40, ' ');
            output.push(paddedArt + infoLine);
        }

        return output. join('\n');
    },
};
