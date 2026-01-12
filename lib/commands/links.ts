import { Command } from '../types';

export const linksCommand: Command = {
    name:    'links',
    description:    'View my social links and resume',
    execute:     () => {
        return `CONNECT

        Type these commands to open links:
        ┌────────────────────────────────────────────────────────
        │  github      →  Open GitHub profile
        │  linkedin    →  Open LinkedIn profile
        │  leetcode    →  Open LeetCode profile
        │  resume      →  Download resume
        │  email       →  Open email client
        └────────────────────────────────────────────────────────`;
    },
};

export const contactCommand: Command = {
    name:   'contact',
    description:  'Get in touch with me',
    execute:     () => {
        return `GET IN TOUCH

        Email Command
        └─ Type 'email' to open mail client

        Open To
        ├─ Open source collaborations
        ├─ Coffee chats about tech
        └─ Full-time opportunities

        Response Time
        └─ Usually within 24 hours`;
    },
};

export const githubCommand: Command = {
    name:  'github',
    description:  'Open GitHub profile',
    execute:    () => {
        window.open('https://github.com/Sukanth19', '_blank');
        return '✓ Opening GitHub profile in new tab...';
    },
};

export const linkedinCommand:  Command = {
    name:  'linkedin',
    description:  'Open LinkedIn profile',
    execute:  () => {
        window.open('https://linkedin.com/in/aniruddha-sukanth-a21892332', '_blank');
        return '✓ Opening LinkedIn profile in new tab...';
    },
};

export const leetcodeCommand:  Command = {
    name:    'leetcode',
    description:    'Open LeetCode profile',
    execute:  () => {
        window.open('https://leetcode.com/u/Aniurddha/', '_blank');
        return '✓ Opening LeetCode profile in new tab...';
    },
};

export const emailCommand:  Command = {
    name:   'email',
    description:   'Open email client',
    execute:  () => {
        window.location.href = 'mailto:sukan3066@gmail. com';
        return '✓ Opening email client... ';
    },
};

export const resumeCommand: Command = {
    name:  'resume',
    description:  'Download resume',
    execute:    () => {
        const link = document. createElement('a');
        link.href = '/resume.pdf';
        link.download = 'Sukanth_Resume.pdf';
        link.style.display = 'none';
        document. body.appendChild(link);
        link.click();

        setTimeout(() => {
            document.body. removeChild(link);
        }, 100);

        return '✓ Downloading resume...';
    },
};
