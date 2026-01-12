import { Command } from '../types';
import { helpCommand } from './help';
import { aboutCommand } from './about';
import { skillsCommand } from './skills';
import { projectsCommand, projectCommand } from './projects';
import { educationCommand } from './education';
import { linksCommand, contactCommand, githubCommand, linkedinCommand, leetcodeCommand, emailCommand, resumeCommand } from './links';
import { clearCommand } from './clear';
import { bannerCommand } from './banner';
import { neofetchCommand } from './neofetch';
import { whoamiCommand } from './whoami';
import { dateCommand } from './date';
import { echoCommand } from './echo';
import { exitCommand } from './exit';

export const commands: Record<string, Command> = {
    help: helpCommand,
    about: aboutCommand,
    skills:  skillsCommand,
    projects:  projectsCommand,
    project:  projectCommand,
    education:  educationCommand,
    links:   linksCommand,
    contact:  contactCommand,
    github: githubCommand,
    linkedin: linkedinCommand,
    leetcode:  leetcodeCommand,
    email: emailCommand,
    resume:  resumeCommand,
    clear:  clearCommand,
    banner:  bannerCommand,
    neofetch: neofetchCommand,
    whoami: whoamiCommand,
    date: dateCommand,
    echo: echoCommand,
    exit: exitCommand,
};

// Export command names for autocomplete
export const commandNames = Object.keys(commands);

export {
    helpCommand,
    aboutCommand,
    skillsCommand,
    projectsCommand,
    projectCommand,
    educationCommand,
    linksCommand,
    contactCommand,
    githubCommand,
    linkedinCommand,
    leetcodeCommand,
    emailCommand,
    resumeCommand,
    clearCommand,
    bannerCommand,
    neofetchCommand,
    whoamiCommand,
    dateCommand,
    echoCommand,
    exitCommand,
};
