'use client';

import React, { useState, useEffect, useRef } from 'react';
import Output from './Output';
import Input from './Input';
import { HistoryEntry } from '@/lib/types';
import { commands, commandNames } from '@/lib/commands';
import { parseCommand, getASCIIBanner, getBootSequence, hasBooted, markBooted, autocomplete } from '@/lib/utils';

export default function Terminal() {
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [input, setInput] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isBooting, setIsBooting] = useState(true);
    const outputEndRef = useRef<HTMLDivElement>(null);

    // Boot sequence on first load
    useEffect(() => {
        if (hasBooted()) {
            // Already booted in this session, skip boot
            setIsBooting(false);
            initializeTerminal();
            return;
        }

        // Run boot sequence
        const bootMessages = getBootSequence();
        let index = 0;

        const bootInterval = setInterval(() => {
            if (index < bootMessages.length) {
                setHistory(prev => [...prev, {
                    type: 'system',
                    text: bootMessages[index],
                    timestamp: Date.now(),
                }]);
                index++;
            } else {
                clearInterval(bootInterval);
                markBooted();
                setIsBooting(false);
                initializeTerminal();
            }
        }, 150);

        return () => clearInterval(bootInterval);
    }, []);

    // Initialize terminal with welcome message
    const initializeTerminal = () => {
        const welcomeMessage = `${getASCIIBanner()}

        Welcome to my portfolio!

        Type 'help' to see available commands.
        Type 'about' to learn more about me.
        `;

        setHistory(prev => [...prev, {
            type: 'output',
            text: welcomeMessage,
            timestamp: Date.now(),
        }]);
    };

    // Auto-scroll to bottom when history changes
    useEffect(() => {
        outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    // Handle command submission
    const handleSubmit = () => {
        if (! input.trim()) return;

        // Add input to history display
        const newHistory:  HistoryEntry[] = [
            ... history,
            { type: 'input', text:  input, timestamp: Date.now() },
        ];

        // Parse command
        const { command:  cmd, args } = parseCommand(input);

        // Add to command history for up/down arrows
        setCommandHistory(prev => [...prev, input]);
        setHistoryIndex(-1);

        // Execute command
        if (cmd === '') {
            setHistory(newHistory);
            setInput('');
            return;
        }

        // Check if clear command
        if (cmd === 'clear') {
            setHistory([]);
            setInput('');
            return;
        }

        // Find and execute command
        const commandObj = commands[cmd];

        if (!commandObj) {
            newHistory.push({
                type: 'error',
                text:  `Command not found: ${cmd}.  Type 'help' for available commands.`,
                timestamp: Date.now(),
            });
        } else {
            try {
                const output = commandObj.execute(args);
                newHistory.push({
                    type: 'output',
                    text:  output,
                    timestamp: Date. now(),
                });
            } catch (error) {
                newHistory.push({
                    type: 'error',
                    text:  `Error executing command: ${error}`,
                    timestamp: Date.now(),
                });
            }
        }

        setHistory(newHistory);
        setInput('');
    };

    // Handle special keys (up/down arrows, tab)
    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Up arrow - previous command
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length === 0) return;

            const newIndex = historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);

            setHistoryIndex(newIndex);
            setInput(commandHistory[newIndex]);
        }

        // Down arrow - next command
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
        }

        // Tab - autocomplete
        if (e.key === 'Tab') {
            e.preventDefault();
            const { command } = parseCommand(input);

            if (command && input === command) {
                const completed = autocomplete(command, commandNames);
                if (completed) {
                    setInput(completed);
                }
            }
        }
    };

    if (isBooting) {
        return (
            <div className="h-screen w-screen bg-black text-green-400 font-mono p-8 overflow-hidden">
            <Output history={history} />
            </div>
        );
    }

    return (
        <div className="h-screen w-screen bg-black text-green-400 font-mono flex flex-col overflow-hidden crt">
        <Output history={history} />
        <div ref={outputEndRef} />
        <Input
        value={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        onKeyDown={handleKeyDown}
        />
        </div>
    );
}
