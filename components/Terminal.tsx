'use client';

import React, { useState, useEffect, useRef } from 'react';
import BootScreen from './BootScreen';
import { HistoryEntry } from '@/lib/types';
import { commands, commandNames } from '@/lib/commands';
import { parseCommand, getASCIIBanner, hasBooted, markBooted } from '@/lib/utils';

export default function Terminal() {
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [input, setInput] = useState('');
    const [suggestion, setSuggestion] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [showBoot, setShowBoot] = useState(true);
    const [terminalReady, setTerminalReady] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (hasBooted()) {
            setShowBoot(false);
            setTerminalReady(true);
            initializeTerminal();
        }
    }, []);

    const handleBootComplete = () => {
        markBooted();
        setShowBoot(false);
        setTimeout(() => {
            setTerminalReady(true);
            initializeTerminal();
        }, 100);
    };

    const initializeTerminal = () => {
        const welcomeMessage = `${getASCIIBanner()}

        Welcome to my portfolio!

        Type 'help' to see available commands.
        Type 'about' to learn more about me.
        `;

        setHistory([{
            type: 'output',
            text: welcomeMessage,
            timestamp: Date.now(),
        }]);
    };

    useEffect(() => {
        inputRef.current?.focus();
        containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
    }, [history]);

    useEffect(() => {
        const handleClick = () => inputRef.current?.focus();
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    // Update autocomplete suggestion
    useEffect(() => {
        if (! input.trim()) {
            setSuggestion('');
            return;
        }

        const { command } = parseCommand(input);
        if (command && input === command) {
            const matches = commandNames.filter(cmd => cmd.startsWith(command. toLowerCase()));
            if (matches.length === 1 && matches[0] !== command) {
                setSuggestion(matches[0]. substring(command.length));
            } else {
                setSuggestion('');
            }
        } else {
            setSuggestion('');
        }
    }, [input]);

    const handleSubmit = () => {
        if (! input.trim()) return;

        const newHistory:  HistoryEntry[] = [
            ... history,
            { type: 'input', text:  input, timestamp: Date.now() },
        ];

        const { command:  cmd, args } = parseCommand(input);

        setCommandHistory(prev => [...prev, input]);
        setHistoryIndex(-1);

        if (cmd === '') {
            setHistory(newHistory);
            setInput('');
            setSuggestion('');
            return;
        }

        // Special handling for clear - reset to welcome screen
        if (cmd === 'clear') {
            initializeTerminal();
            setInput('');
            setSuggestion('');
            return;
        }

        const commandObj = commands[cmd];

        if (! commandObj) {
            newHistory.push({
                type: 'error',
                text: `Command not found: ${cmd}.  Type 'help' for available commands.`,
                timestamp: Date.now(),
            });
        } else {
            try {
                const output = commandObj.execute(args);
                newHistory.push({
                    type: 'output',
                    text: output,
                    timestamp: Date.now(),
                });
            } catch (error) {
                newHistory.push({
                    type: 'error',
                    text: `Error executing command: ${error}`,
                    timestamp: Date.now(),
                });
            }
        }

        setHistory(newHistory);
        setInput('');
        setSuggestion('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e. key === 'Enter') {
            e.preventDefault();
            handleSubmit();
            return;
        }

        // Tab or Right Arrow to accept suggestion
        if ((e.key === 'Tab' || e.key === 'ArrowRight') && suggestion) {
            e.preventDefault();
            setInput(input + suggestion);
            setSuggestion('');
            return;
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length === 0) return;

            const newIndex = historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);

            setHistoryIndex(newIndex);
            setInput(commandHistory[newIndex]);
            setSuggestion('');
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex === -1) return;

            const newIndex = historyIndex + 1;

            if (newIndex >= commandHistory.length) {
                setHistoryIndex(-1);
                setInput('');
            } else {
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
            setSuggestion('');
        }
    };

    // Format output - color ASCII art orange and make URLs clickable
    const formatOutput = (text: string) => {
        const lines = text. split('\n');

        return lines. map((line, i) => {
            // Check for ASCII art
            const isASCII = /[─│┌┐└┘├┤┬┴┼═║╔╗╚╝╠╣╦╩╬_\/\\|]/.test(line) ||
            line.includes('___') ||
            line.includes('___/');

            if (isASCII) {
                return (
                    <div key={i} style={{ color: '#ff8c42' }}>
                    {line || '\u00A0'}
                    </div>
                );
            }

            // Split by spaces and check each word
            const words = line.split(' ');
            const elements = words.map((word, j) => {
                // Check if it's a URL
                if (word.startsWith('http://') || word.startsWith('https://')) {
                    return (
                        <React.Fragment key={j}>
                        <a
                        href={word}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: '#61afef',
                            textDecoration: 'underline',
                            cursor: 'pointer'
                        }}
                        >
                        {word}
                        </a>
                        {j < words.length - 1 && ' '}
                        </React.Fragment>
                    );
                }

                // Check if it's an email
                if (word.includes('@') && word.includes('.')) {
                    return (
                        <React.Fragment key={j}>
                        <a
                        href={`mailto:${word}`}
                        style={{
                            color: '#61afef',
                            textDecoration: 'underline',
                            cursor: 'pointer'
                        }}
                        >
                        {word}
                        </a>
                        {j < words.length - 1 && ' '}
                        </React.Fragment>
                    );
                }

                // Check if it's the resume link
                if (word. includes('resume.pdf')) {
                    return (
                        <React.Fragment key={j}>
                        <a
                        href="/resume. pdf"
                        download="Sukanth_Resume.pdf"
                        style={{
                            color: '#61afef',
                            textDecoration:  'underline',
                            cursor: 'pointer'
                        }}
                        >
                        {word}
                        </a>
                        {j < words.length - 1 && ' '}
                        </React.Fragment>
                    );
                }

                // Regular text
                return (
                    <React.Fragment key={j}>
                    {word}
                    {j < words.length - 1 && ' '}
                    </React.Fragment>
                );
            });

            return <div key={i}>{elements. length > 0 ? elements :  '\u00A0'}</div>;
        });
    };

    if (showBoot) {
        return <BootScreen onComplete={handleBootComplete} />;
    }

    if (!terminalReady) {
        return null;
    }

    return (
        <div
        ref={containerRef}
        className="h-screen w-screen overflow-y-auto p-8 font-mono"
        style={{ background: 'var(--bg)', color: 'var(--fg)', fontSize: '0.95rem' }}
        >
        <div className="space-y-4 max-w-5xl">
        {history.map((entry, index) => (
            <div key={index}>
            {entry.type === 'input' && (
                <div className="flex gap-3 mt-6">
                <span style={{ color: 'var(--mint)' }}>guest@portfolio: ~$</span>
                <span style={{ color: 'var(--fg)' }}>{entry.text}</span>
                </div>
            )}

            {entry.type === 'output' && (
                <div className="whitespace-pre-wrap font-mono mt-2" style={{ color:  'var(--fg)', lineHeight: '1.8' }}>
                {formatOutput(entry.text)}
                </div>
            )}

            {entry.type === 'error' && (
                <div className="mt-2" style={{ color: 'var(--error)' }}>
                {entry.text}
                </div>
            )}

            {entry.type === 'system' && (
                <div className="mt-2" style={{ color: 'var(--mint)' }}>
                {entry.text}
                </div>
            )}
            </div>
        ))}

        {/* Inline input with autocomplete */}
        <div className="flex gap-3 items-center mt-6">
        <span style={{ color: 'var(--mint)' }}>guest@portfolio:~$</span>
        <div className="relative flex-1 flex">
        <span style={{ color: 'var(--fg)' }}>{input}</span>
        {suggestion && (
            <span className="autocomplete-hint">
            {suggestion}
            </span>
        )}
        <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="absolute inset-0 w-full bg-transparent border-none outline-none font-mono opacity-0"
        style={{ caretColor: 'var(--mint)' }}
        spellCheck={false}
        autoComplete="off"
        autoFocus
        />
        </div>
        </div>
        </div>
        </div>
    );
}
