/**
 * TerminalWrapper Component
 * 
 * Wraps the application and provides global keyboard shortcuts for the Hidden Terminal.
 * Handles Ctrl+~ to open terminal, Escape to close, and click-outside to close.
 * 
 * @see Requirements 8.1, 8.7
 */

'use client';

import React, { useState, useEffect } from 'react';
import { HiddenTerminal } from './HiddenTerminal';

/**
 * TerminalWrapper props interface
 */
interface TerminalWrapperProps {
  children: React.ReactNode;
}

/**
 * TerminalWrapper component
 * 
 * Provides global keyboard listener for terminal activation and manages terminal state.
 */
export function TerminalWrapper({ children }: TerminalWrapperProps) {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    /**
     * Handle global keyboard events
     */
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+~ (Ctrl+tilde) to open terminal
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        setIsTerminalOpen(true);
      }
      
      // Escape to close terminal
      if (e.key === 'Escape' && isTerminalOpen) {
        e.preventDefault();
        setIsTerminalOpen(false);
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isTerminalOpen]);

  return (
    <>
      {children}
      <HiddenTerminal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />
    </>
  );
}
