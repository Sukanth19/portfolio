import { Command } from '../types';

export const educationCommand: Command = {
    name: 'education',
    description: 'View my educational background',
    execute: () => {
        let output = 'EDUCATION\n\n';
        output += 'Degree\n';
        output += '  ├─Bachelor of Technology in Computer Science\n';
        output += '  ├─Amrita Vishwa Vidyapeetham  •  2024 - 2028\n';
        output += 'Coursework\n';
        output += '  ├─ Data Structures & Algorithms\n';
        output += '  ├─ Operating Systems\n';
        output += '  ├─ Database Management Systems\n';
        output += '  ├─ Computer Networks\n';
        output += '  └─ Software Engineering\n\n';

        return output;
    },
};
