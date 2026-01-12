'use client';

import React, { useRef, useEffect } from 'react';

type InputProps = {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    onKeyDown: (e: React. KeyboardEvent) => void;
};

export default function Input({ value, onChange, onSubmit, onKeyDown }: InputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-focus input on mount and keep it focused
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Keep input focused when clicking anywhere in the terminal
    useEffect(() => {
        const handleClick = () => {
            inputRef.current?.focus();
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSubmit();
        } else {
            onKeyDown(e);
        }
    };

    return (
        <div className="p-4 border-t border-green-900 flex gap-2 items-center">
        <span className="text-green-400 font-mono text-sm">guest@portfolio:~$</span>
        <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target. value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent border-none outline-none text-green-300 font-mono text-sm caret-green-400"
        spellCheck={false}
        autoComplete="off"
        autoFocus
        />
        <span className="text-green-400 cursor">█</span>
        </div>
    );
}
