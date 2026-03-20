/**
 * HiddenTerminal Component
 * 
 * Easter egg terminal interface accessible via Ctrl+~ keyboard shortcut.
 * Implements retro terminal UI with command input, output display, and command history.
 * 
 * @see Requirements 8.2, 8.3
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { executeCommand } from '@/lib/terminal';

/**
 * Terminal entry interface
 */
interface TerminalEntry {
  type: 'input' | 'output' | 'error';
  content: string;
  timestamp: Date;
}

/**
 * HiddenTerminal props interface
 */
interface HiddenTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * HiddenTerminal component
 * 
 * Displays a retro-styled terminal interface with command execution.
 */
export function HiddenTerminal({ isOpen, onClose }: HiddenTerminalProps) {
  const { themeConfig } = useTheme();
  const [history, setHistory] = useState<TerminalEntry[]>([
    {
      type: 'output',
      content: 'Welcome to Portfolio Terminal v1.0\nType "help" for available commands.',
      timestamp: new Date(),
    },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Auto-scroll to bottom when history updates
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  /**
   * Handle command submission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentInput.trim()) {
      return;
    }

    // Add input to history
    const inputEntry: TerminalEntry = {
      type: 'input',
      content: currentInput,
      timestamp: new Date(),
    };

    // Execute command
    const output = executeCommand(currentInput);
    const outputEntry: TerminalEntry = {
      type: 'output',
      content: output,
      timestamp: new Date(),
    };

    // Update history
    setHistory(prev => [...prev, inputEntry, outputEntry]);
    setCommandHistory(prev => [...prev, currentInput]);
    setCurrentInput('');
    setHistoryIndex(-1);
  };

  /**
   * Handle keyboard navigation through command history
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Hidden terminal"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl h-[600px] flex flex-col rounded-lg overflow-hidden shadow-2xl"
        role="presentation"
        style={{
          backgroundColor: themeConfig.colors.background.secondary,
          border: `2px solid ${themeConfig.colors.border.accent}`,
          boxShadow: themeConfig.effects.shadow.lg,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b"
          style={{
            backgroundColor: themeConfig.colors.background.tertiary,
            borderBottomColor: themeConfig.colors.border.accent,
          }}
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-2" aria-hidden="true">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: '#ff5f56' }}
              />
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: '#ffbd2e' }}
              />
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: '#27c93f' }}
              />
            </div>
            <span
              className="ml-4 font-mono text-sm"
              style={{ color: themeConfig.colors.text.secondary }}
            >
              portfolio@terminal:~
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-mono hover:opacity-70 transition-opacity"
            style={{ color: themeConfig.colors.text.secondary }}
            aria-label="Close terminal"
          >
            [ESC]
          </button>
        </div>

        {/* Terminal Output */}
        <div
          ref={outputRef}
          className="flex-1 overflow-y-auto p-4 font-mono text-sm"
          role="log"
          aria-live="polite"
          aria-label="Terminal output"
          style={{
            backgroundColor: themeConfig.colors.background.primary,
            color: themeConfig.colors.text.primary,
          }}
        >
          {history.map((entry, index) => (
            <div key={index} className="mb-2">
              {entry.type === 'input' ? (
                <div style={{ color: themeConfig.colors.interactive.primary }}>
                  <span style={{ color: themeConfig.colors.text.accent }}>$ </span>
                  {entry.content}
                </div>
              ) : (
                <div
                  className="whitespace-pre-wrap"
                  style={{
                    color: entry.type === 'error' 
                      ? '#ff5f56' 
                      : themeConfig.colors.text.secondary,
                  }}
                >
                  {entry.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Terminal Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 px-4 py-3 border-t font-mono text-sm"
          style={{
            backgroundColor: themeConfig.colors.background.secondary,
            borderTopColor: themeConfig.colors.border.default,
          }}
        >
          <span style={{ color: themeConfig.colors.text.accent }} aria-hidden="true">$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none"
            style={{ color: themeConfig.colors.text.primary }}
            placeholder="Type a command..."
            autoComplete="off"
            spellCheck={false}
            aria-label="Terminal command input"
          />
        </form>
      </div>
    </div>
  );
}
