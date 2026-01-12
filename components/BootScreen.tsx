'use client';

import React, { useEffect, useState } from 'react';

type BootScreenProps = {
    onComplete: () => void;
};

export default function BootScreen({ onComplete }: BootScreenProps) {
    const [messages, setMessages] = useState<string[]>([]);
    const [fadeOut, setFadeOut] = useState(false);

    const bootMessages = [
        '✓ Initializing portfolio.sys...',
        '✓ Loading kernel modules.. .',
        '✓ Mounting filesystems...',
        '✓ Starting network services...',
        '✓ Loading user profile: Sukanth19',
        '✓ System ready.',
    ];

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < bootMessages.length) {
                setMessages(prev => [...prev, bootMessages[index]]);
                index++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    setFadeOut(true);
                    setTimeout(onComplete, 500);
                }, 300);
            }
        }, 200);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`boot-screen ${fadeOut ? 'fade-out' : ''}`}>
        <div className="text-left space-y-3">
        {messages.map((msg, i) => (
            <div key={i} className="font-mono text-sm flex items-center gap-3" style={{ color: 'var(--mint)' }}>
            {msg}
            </div>
        ))}
        </div>
        </div>
    );
}
