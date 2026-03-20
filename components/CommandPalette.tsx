/**
 * CommandPalette Component
 * 
 * VS Code-style command palette for quick navigation and actions.
 * Provides fuzzy search functionality with keyboard navigation.
 * 
 * @see Requirements 15.2, 15.3
 */

'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useTheme } from './ThemeProvider';

/**
 * Command interface
 */
export interface Command {
  id: string;
  label: string;
  description?: string;
  shortcut?: string;
  action: () => void;
  category?: string;
}

/**
 * CommandPalette props interface
 */
interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  commands: Command[];
}

/**
 * Simple fuzzy match function
 * Returns true if all characters in query appear in target in order
 */
function fuzzyMatch(query: string, target: string): boolean {
  const lowerQuery = query.toLowerCase();
  const lowerTarget = target.toLowerCase();
  
  let queryIndex = 0;
  
  for (let i = 0; i < lowerTarget.length && queryIndex < lowerQuery.length; i++) {
    if (lowerTarget[i] === lowerQuery[queryIndex]) {
      queryIndex++;
    }
  }
  
  return queryIndex === lowerQuery.length;
}

/**
 * CommandPalette component
 * 
 * Displays a searchable command palette with fuzzy matching.
 */
export function CommandPalette({ isOpen, onClose, commands }: CommandPaletteProps) {
  const { themeConfig } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Filter commands based on search query
  const filteredCommands = useMemo(() => {
    if (!searchQuery.trim()) {
      return commands;
    }
    
    return commands.filter(cmd => 
      fuzzyMatch(searchQuery, cmd.label) || 
      (cmd.description && fuzzyMatch(searchQuery, cmd.description))
    );
  }, [commands, searchQuery]);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setSelectedIndex(0);
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Reset selected index when filtered commands change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands]);

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex]);

  /**
   * Handle keyboard navigation
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < filteredCommands.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      executeSelectedCommand();
    }
  };

  /**
   * Execute the selected command
   */
  const executeSelectedCommand = () => {
    const command = filteredCommands[selectedIndex];
    if (command) {
      command.action();
      onClose();
    }
  };

  /**
   * Execute command by index
   */
  const executeCommand = (index: number) => {
    const command = filteredCommands[index];
    if (command) {
      command.action();
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl flex flex-col rounded-lg overflow-hidden shadow-2xl"
        role="presentation"
        style={{
          backgroundColor: themeConfig.colors.background.secondary,
          border: `1px solid ${themeConfig.colors.border.default}`,
          boxShadow: themeConfig.effects.shadow.lg,
          maxHeight: '60vh',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div
          className="flex items-center gap-3 px-4 py-3 border-b"
          style={{
            borderBottomColor: themeConfig.colors.border.default,
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: themeConfig.colors.text.secondary }}
            aria-hidden="true"
          >
            <path
              d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-base"
            style={{ color: themeConfig.colors.text.primary }}
            placeholder="Type a command or search..."
            autoComplete="off"
            spellCheck={false}
            aria-label="Search commands"
          />
          <span
            className="text-xs font-mono px-2 py-1 rounded"
            style={{
              color: themeConfig.colors.text.secondary,
              backgroundColor: themeConfig.colors.background.tertiary,
            }}
            aria-label="Press Escape to close"
          >
            ESC
          </span>
        </div>

        {/* Command List */}
        <div
          ref={listRef}
          className="overflow-y-auto"
          role="listbox"
          aria-label="Available commands"
          style={{
            maxHeight: 'calc(60vh - 60px)',
          }}
        >
          {filteredCommands.length === 0 ? (
            <div
              className="px-4 py-8 text-center text-sm"
              style={{ color: themeConfig.colors.text.secondary }}
            >
              No commands found
            </div>
          ) : (
            filteredCommands.map((command, index) => (
              <button
                key={command.id}
                type="button"
                role="option"
                aria-selected={index === selectedIndex ? 'true' : 'false'}
                onClick={() => executeCommand(index)}
                className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors"
                style={{
                  backgroundColor: index === selectedIndex 
                    ? themeConfig.colors.background.tertiary 
                    : 'transparent',
                  color: themeConfig.colors.text.primary,
                  borderLeft: index === selectedIndex 
                    ? `3px solid ${themeConfig.colors.interactive.primary}` 
                    : '3px solid transparent',
                }}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm mb-1">
                    {command.label}
                  </div>
                  {command.description && (
                    <div
                      className="text-xs truncate"
                      style={{ color: themeConfig.colors.text.secondary }}
                    >
                      {command.description}
                    </div>
                  )}
                </div>
                {command.shortcut && (
                  <span
                    className="text-xs font-mono px-2 py-1 rounded ml-3 flex-shrink-0"
                    style={{
                      color: themeConfig.colors.text.secondary,
                      backgroundColor: themeConfig.colors.background.primary,
                    }}
                    aria-label={`Keyboard shortcut: ${command.shortcut}`}
                  >
                    {command.shortcut}
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
