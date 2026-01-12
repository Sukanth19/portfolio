import { Command } from '../types';

const projects = [
    {
        id:  1,
        name: 'SneakerNet',
        description: 'A sneaker deal and resale locator that aggregates listings and highlights profitable flips.',
        tech: ['Next.js', 'TypeScript', 'Node.js', 'Python'],
        github: 'https://github.com/Sukanth19/sneakernet',
        live: '',
    },
{
    id:   2,
    name: 'Movie Recommender',
    description: 'A content-based movie recommendation system using similarity scoring and user preferences.',
    tech: ['Python', 'Pandas', 'NumPy', 'FastAPI'],
    github: 'https://github.com/Sukanth19/movie-recommender',
    live: '',
},
{
    id:   3,
    name: 'Spotifree',
    description: 'A lightweight, ad-free media player that mimics core Spotify functionality without tracking.',
    tech: ['Flutter', 'Dart'],
    github: 'https://github.com/Sukanth19/spotifree',
    live: '',
},
{
    id:  4,
    name: 'Typing Tester',
    description: 'A typing speed and accuracy tester built as a browser game with real-time stats.',
    tech: ['TypeScript', 'React', 'Vite'],
    github: 'https://github.com/Sukanth19/typing-tester',
    live: '',
},
{
    id: 5,
    name: 'Image to ASCII Generator',
    description: 'A C-based CLI tool that converts images into ASCII art using grayscale mapping.',
    tech: ['C'],
    github: 'https://github.com/Sukanth19/image-to-ascii',
    live: '',
},
{
    id: 6,
    name: 'The Hollow Archive',
    description: 'A creepypasta and horror fiction website with structured archives and dark-themed UI.',
    tech: ['TypeScript', 'Node.js', 'Next.js'],
    github: 'https://github.com/Sukanth19/the-hollow-archive',
    live: '',
},
];

export const projectsCommand: Command = {
    name: 'projects',
    description: 'List my projects',
    usage: 'projects',
    execute: () => {
        let output = '';

        projects.forEach((project, index) => {
            output += `┌─ [${project.id}] ${project.name}\n`;
            output += `│  ${project.description}\n`;
            output += `│  Stack: ${project.tech.join(' · ')}\n`;
            output += `└─────────────────────────────────────────────────────────────────\n`;
            if (index < projects.length - 1) output += '\n';
        });

            output += '\nType \'project <id>\' for details. ';

            return output;
    },
};

export const projectCommand: Command = {
    name:  'project',
    description:  'View details about a specific project',
    usage: 'project <id>',
    execute:   (args) => {
        if (args.length === 0) {
            return "Usage: project <id>\nExample: project 1";
        }

        const id = parseInt(args[0]);
        const project = projects.find(p => p.id === id);

        if (!project) {
            return `Project '${id}' not found.  Type 'projects' to see all.  `;
        }

        let output = '╔═══════════════════════════════════════════════════════════════════\n';
        output += `║ ${project.name. toUpperCase()}\n`;
        output += '╠═══════════════════════════════════════════════════════════════════\n';
        output += '║\n';
        output += '║ Description\n';
        output += `║ ${project.description. replace(/\n/g, '\n║ ')}\n`;
        output += '║\n';
        output += '╠───────────────────────────────────────────────────────────────────\n';
        output += '║ Tech Stack\n';

        project.tech.forEach((tech, i, arr) => {
            const prefix = i === arr.length - 1 ? '  └─' :   '  ├─';
            output += `${prefix} ${tech}\n`;
        });

        output += '║\n';
        output += '╠───────────────────────────────────────────────────────────────────\n';
        output += '║ Links\n';
        output += `║   → GitHub: ${project.github}\n`;
        output += `║   → Live: ${project.live || 'Not deployed yet'}\n`;
        output += '╚═══════════════════════════════════════════════════════════════════';

        return output;
    },
};
