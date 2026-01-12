import { Command } from '../types';

export const linksCommand: Command = {
    name: 'links',
    description: 'View my social links and resume',
    execute: () => {
        return `
        ┌─────────────────────────────────────────────────────────────┐
        │                       LINKS                                 │
        └─────────────────────────────────────────────────────────────┘

        🔗 Connect with me:

        GitHub:     https://github.com/Sukanth19
        LinkedIn:  https://linkedin.com/in/your-profile
        LeetCode:  https://leetcode.com/Sukanth19
        Email:     your.email@example.com

        📄 Resume:   /resume.pdf (right-click to download)

        Type 'contact' for more ways to reach me.
        `.trim();
    },
};

export const contactCommand: Command = {
    name: 'contact',
    description: 'Get in touch with me',
    execute: () => {
        return `
        ┌─────────────────────────────────────────────────────────────┐
        │                      CONTACT                                │
        └─────────────────────────────────────────────────────────────┘

        📧 Email:      your.email@example.com

        💬 Open to:
        • Freelance opportunities
        • Open source collaborations
        • Coffee chats about tech
        • Full-time opportunities

        Response time: Usually within 24 hours

        Type 'links' to see all my social profiles.
        `.trim();
    },
};
