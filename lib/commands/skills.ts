import { Command } from '../types';

export const skillsCommand: Command = {
    name:  'skills',
    description:  'View my skills',
    execute:   () => {
        let output = 'Languages\n';
        output += '  ├─ JavaScript\n';
        output += '  ├─ TypeScript\n';
        output += '  ├─ Python\n';
        output += '  │    ├─ Pandas\n';
        output += '  │    └─ NumPy\n';
        output += '  ├─ Java\n';
        output += '  ├─ C/C++\n';
        output += '  |─ SQL\n\n';

        output += 'Frontend\n';
        output += '  ├─ React / Next.js\n';
        output += '  ├─ HTML5 / CSS3\n';
        output += '  ├─ Tailwind CSS\n';
        output += '  └─ Redux\n\n';

        output += 'Backend\n';
        output += '  ├─ Node.js / Express\n';
        output += '  └─ RESTful APIs\n\n';

        output += 'Tools & Platforms\n';
        output += '  ├─ Git / GitHub\n';
        output += '  ├─ Linux (Arch)\n';
        output += '  ├─ Docker\n';
        output += '  ├─ Vercel / AWS / Google Cloud\n';
        output += '  └─ VS Code / Neovim\n\n';

        output += 'Currently Learning\n';
        output += '  ├─ ML (Deep Learning)\n';
        output += '  └─ Rust';

        return output;
    },
};
