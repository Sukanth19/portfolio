import { Command } from '../types';

export const aboutCommand: Command = {
    name: 'about',
    description: 'Learn about me',
    execute: () => {
        return `
        ┌─────────────────────────────────────────────────────────────┐
        │                        ABOUT ME                             │
        └─────────────────────────────────────────────────────────────┘

        Hey!  I'm Sukanth, a passionate developer and Linux enthusiast.

        🚀 I love building things that live at the intersection of
        creativity and engineering.

        💻 Currently exploring full-stack development, open-source
        contributions, and system design.

        🐧 Proud Linux user (Endeavor OS + Hyprland).

        📚 Always learning, always building.

        Type 'skills' to see my technical expertise.
        Type 'projects' to see what I've built.
        Type 'links' to connect with me.
        `.trim();
    },
};
