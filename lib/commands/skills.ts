import { Command } from '../types';

export const skillsCommand: Command = {
    name:  'skills',
    description:  'View my technical skills',
    execute:  () => {
        return `
        ┌─────────────────────────────────────────────────────────────┐
        │                       SKILLS                                │
        └─────────────────────────────────────────────────────────────┘

        Languages:
        • JavaScript / TypeScript
        • Python
        • Java
        • C/C++
        • SQL

        Frontend:
        • React / Next. js
        • HTML5 / CSS3
        • Tailwind CSS
        • Redux

        Backend:
        • Node.js / Express
        • RESTful APIs
        • PostgreSQL / MongoDB
        • Redis

        Tools & Platforms:
        • Git / GitHub
        • Linux (Endeavor OS)
        • Docker
        • Vercel / AWS
        • VS Code / Neovim

        Currently Learning:
        • System Design
        • DevOps / CI-CD
        • Rust
        `.trim();
    },
};
