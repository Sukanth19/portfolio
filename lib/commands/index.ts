import { CommandRegistry } from '../types';
import { helpCommand } from './help';
import { aboutCommand } from './about';
import { skillsCommand } from './skills';
import { projectsCommand, projectCommand } from './projects';
import { educationCommand } from './education';
import { linksCommand, contactCommand } from './links';
import { clearCommand } from './clear';
import {
    whoamiCommand,
    neofetchCommand,
    sudoCommand,
    exitCommand,
    dateCommand,
    echoCommand,
} from './fun';

// Central command registry
export const commands: CommandRegistry = {
    help: helpCommand,
    about: aboutCommand,
    skills: skillsCommand,
    projects: projectsCommand,
    project: projectCommand,
    education:  educationCommand,
    links:  linksCommand,
    contact:  contactCommand,
    clear: clearCommand,

    // Fun commands
    whoami: whoamiCommand,
    neofetch: neofetchCommand,
    sudo: sudoCommand,
    exit: exitCommand,
    date: dateCommand,
    echo: echoCommand,
};

// Get all command names (for autocomplete)
export const commandNames = Object.keys(commands).filter(
    name => ! commands[name].hidden
);
