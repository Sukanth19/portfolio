// Represents a single line in the terminal history
export type HistoryEntry = {
    type: 'input' | 'output' | 'error' | 'system';
    text: string;
    timestamp?:  number;
};

// Command function signature
export type CommandFunction = (args: string[]) => string | Promise<string>;

// Command definition
export type Command = {
    name: string;
    description: string;
    usage?: string;
    execute: CommandFunction;
    hidden?: boolean; // For easter eggs
};

// Command registry type
export type CommandRegistry = Record<string, Command>;

// Boot sequence state
export type BootState = 'booting' | 'ready';
