/**
 * HiddenTerminal Test Component
 * 
 * Manual test component for the Hidden Terminal easter egg.
 * Tests terminal UI, command execution, and keyboard shortcuts.
 */

'use client';

import React, { useState } from 'react';
import { HiddenTerminal } from './HiddenTerminal';
import { executeCommand } from '@/lib/terminal';

export default function TestHiddenTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);

  const runTests = () => {
    const results: string[] = [];

    // Test 1: Help command
    const helpOutput = executeCommand('help');
    results.push(`✓ Help command: ${helpOutput.includes('Available commands') ? 'PASS' : 'FAIL'}`);

    // Test 2: About command
    const aboutOutput = executeCommand('about');
    results.push(`✓ About command: ${aboutOutput.includes('Portfolio Information') ? 'PASS' : 'FAIL'}`);

    // Test 3: Projects command
    const projectsOutput = executeCommand('projects');
    results.push(`✓ Projects command: ${projectsOutput.includes('Project List') ? 'PASS' : 'FAIL'}`);

    // Test 4: Invalid command
    const invalidOutput = executeCommand('invalid');
    results.push(`✓ Invalid command: ${invalidOutput.includes('Command not found') ? 'PASS' : 'FAIL'}`);

    // Test 5: Empty command
    const emptyOutput = executeCommand('');
    results.push(`✓ Empty command: ${emptyOutput === '' ? 'PASS' : 'FAIL'}`);

    setTestResults(results);
  };

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>
      <h1 className="text-3xl font-bold mb-6">Hidden Terminal Test</h1>
      
      <div className="space-y-4 mb-8">
        <div className="p-4 bg-gray-800 rounded">
          <h2 className="text-xl font-semibold mb-2">Keyboard Shortcuts</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Press <kbd className="px-2 py-1 bg-gray-700 rounded">Ctrl</kbd> + <kbd className="px-2 py-1 bg-gray-700 rounded">~</kbd> to open terminal</li>
            <li>Press <kbd className="px-2 py-1 bg-gray-700 rounded">Escape</kbd> to close terminal</li>
            <li>Click outside terminal to close</li>
          </ul>
        </div>

        <div className="p-4 bg-gray-800 rounded">
          <h2 className="text-xl font-semibold mb-2">Available Commands</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><code className="px-2 py-1 bg-gray-700 rounded">help</code> - Display available commands</li>
            <li><code className="px-2 py-1 bg-gray-700 rounded">about</code> - Display portfolio owner information</li>
            <li><code className="px-2 py-1 bg-gray-700 rounded">projects</code> - Display project list</li>
          </ul>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
          >
            Open Terminal (Manual)
          </button>
          <button
            onClick={runTests}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors"
          >
            Run Command Tests
          </button>
        </div>

        {testResults.length > 0 && (
          <div className="p-4 bg-gray-800 rounded">
            <h2 className="text-xl font-semibold mb-2">Test Results</h2>
            <ul className="space-y-1 font-mono text-sm">
              {testResults.map((result, index) => (
                <li key={index} className={result.includes('PASS') ? 'text-green-400' : 'text-red-400'}>
                  {result}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <HiddenTerminal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
