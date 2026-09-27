export const terminalCommands = [
  'help',
  'about',
  'experience',
  'projects',
  'stack',
  'buildlog',
  'lab',
  'archive',
  'github',
  'contact',
  'neofetch',
  'whoami',
  'history',
  'clear',
  'sudo',
  'echo',
  'snake',
  'glitch',
] as const

export type TerminalCommand = typeof terminalCommands[number]

export const terminalConfig = {
  prompt: 'sukanth@portfolio:~$',
  welcomeMessage: [
    'Welcome to Sukanth Portfolio Terminal v1.0.0',
    'Type "help" for available commands',
  ],
  shortcuts: {
    clear: ['Ctrl+L'],
    cancel: ['Ctrl+C'],
    autocomplete: ['Tab'],
    historyUp: ['↑'],
    historyDown: ['↓'],
  },
}
