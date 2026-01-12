export interface Command {
    name: string;
    description: string;
    execute:  (args?:  string[]) => string;  // ONLY string, no Promise
}

export interface HistoryEntry {
    type: 'input' | 'output' | 'error' | 'system';
    text:  string;
    timestamp: number;
}
