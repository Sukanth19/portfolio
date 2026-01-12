import { HistoryEntry } from './types';

export function parseCommand(input: string): { command: string; args: string[] } {
    const trimmed = input.trim();
    const parts = trimmed.split(/\s+/);
    const command = parts[0]?.toLowerCase() || '';
    const args = parts.slice(1);

    return { command, args };
}

export function getTimestamp(): number {
    return Date.now();
}

export function formatOutput(text: string): string {
    return text. trim();
}

export function getASCIIBanner(): string {
    return `
    ███████╗██╗   ██╗██╗  ██╗ █████╗ ███╗   ██╗████████╗██╗  ██╗
    ██╔════╝██║   ██║██║ ██╔╝██╔══██╗████╗  ██║╚══██╔══╝██║  ██║
    ███████╗██║   ██║█████╔╝ ███████║██╔██╗ ██║   ██║   ███████║
    ╚════██║██║   ██║██╔═██╗ ██╔══██║██║╚██╗██║   ██║   ██╔══██║
    ███████║╚██████╔╝██║  ██╗██║  ██║██║ ╚████║   ██║   ██║  ██║
    ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝
    `;
}

export function getBootSequence(): string[] {
    return [
        'Initializing portfolio. sys.. .',
        'Loading kernel modules...  OK',
        'Mounting filesystems... OK',
        'Starting network services... OK',
        'Loading user profile:  Sukanth19',
        'System ready.',
        '',
    ];
}

export function hasBooted(): boolean {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('booted') === 'true';
}

export function markBooted(): void {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem('booted', 'true');
}

export function autocomplete(partial: string, commands: string[]): string | null {
    if (! partial) return null;

    const matches = commands.filter(cmd => cmd.startsWith(partial. toLowerCase()));

    if (matches.length === 1) {
        return matches[0];
    }

    return null;
}
