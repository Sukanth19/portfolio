import { Command } from '../types';

export const educationCommand: Command = {
    name:  'education',
    description:  'View my educational background',
    execute: () => {
        return `
        ┌─────────────────────────────────────────────────────────────┐
        │                      EDUCATION                              │
        └─────────────────────────────────────────────────────────────┘

        🎓 Bachelor of Technology in Computer Science
        Your University Name
        2020 - 2024
        CGPA: X.XX/10.00

        Relevant Coursework:
        • Data Structures & Algorithms
        • Operating Systems
        • Database Management Systems
        • Computer Networks
        • Software Engineering

        Certifications:
        • [Add your certifications here]
        • [AWS, Azure, etc.]

        Type 'skills' to see my technical expertise.
        `.trim();
    },
};
