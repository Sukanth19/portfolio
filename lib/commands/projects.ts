import { Command } from '../types';

// Project data structure
const projects = [
    {
        id: 1,
        name: 'Terminal Portfolio',
        description: 'Interactive terminal-style portfolio website',
        tech: ['Next.js', 'TypeScript', 'Tailwind'],
        github: 'https://github.com/Sukanth19/portfolio',
        live: 'https://sukanth. vercel.app',
    },
{
    id:  2,
    name: 'Project Alpha',
    description: 'A cool project that does amazing things',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    github: 'https://github.com/Sukanth19/project-alpha',
},
{
    id:  3,
    name: 'Project Beta',
    description: 'Another awesome project',
    tech: ['Python', 'Flask', 'MongoDB'],
    github: 'https://github.com/Sukanth19/project-beta',
},
];

export const projectsCommand: Command = {
    name: 'projects',
    description: 'List my projects',
    usage: 'projects',
    execute: () => {
        const projectList = projects
        .map(p => `  [${p.id}] ${p.name}\n      ${p.description}`)
        .join('\n\n');

        return `
        ┌─────────────────────────────────────────────────────────────┐
        │                       PROJECTS                              │
        └─────────────────────────────────────────────────────────────┘

        ${projectList}

        Type 'project <id>' to view details about a specific project.
        `.trim();
    },
};

export const projectCommand: Command = {
    name:  'project',
    description:  'View details about a specific project',
    usage: 'project <id>',
    execute: (args) => {
        if (args.length === 0) {
            return "Usage: project <id>\nExample: project 1";
        }

        const id = parseInt(args[0]);
        const project = projects.find(p => p.id === id);

        if (!project) {
            return `Project with id '${id}' not found.  Type 'projects' to see all projects.`;
        }

        return `
        ┌─────────────────────────────────────────────────────────────┐
        │  ${project.name. toUpperCase().padEnd(59)}│
        └─────────────────────────────────────────────────────────────┘

        ${project.description}

        Tech Stack:
        ${project.tech.join(', ')}

        Links:
        GitHub: ${project.github}
        ${project.live ? `Live: ${project.live}` : ''}

        Type 'projects' to see all projects.
        `.trim();
    },
};
