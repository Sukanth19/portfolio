'use client';

import React from 'react';
import { HistoryEntry } from '@/lib/types';

type OutputProps = {
    history:  HistoryEntry[];
};

export default function Output({ history }: OutputProps) {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {history.map((entry, index) => (
            <div key={index} className="font-mono text-sm">
            {entry.type === 'input' && (
                <div className="flex gap-2">
                <span className="text-green-400">guest@portfolio: ~$</span>
                <span className="text-green-300">{entry.text}</span>
                </div>
            )}

            {entry.type === 'output' && (
                <pre className="text-green-400 whitespace-pre-wrap font-mono">
                {entry. text}
                </pre>
            )}

            {entry.type === 'error' && (
                <div className="text-red-400">
                {entry.text}
                </div>
            )}

            {entry.type === 'system' && (
                <div className="text-green-500">
                {entry.text}
                </div>
            )}
            </div>
        ))}
        </div>
    );
}
