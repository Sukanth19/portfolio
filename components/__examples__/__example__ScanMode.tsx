/**
 * ScanMode Example Usage
 * 
 * Demonstrates how to use the ScanModeWrapper and ScanModeOverlay components.
 * This is an example file showing the integration pattern.
 */

'use client';

import React, { useState } from 'react';
import { ScanModeOverlay } from './ScanModeOverlay';
import { ScanModeWrapper } from './ScanModeWrapper';

/**
 * Example 1: Using ScanModeWrapper (Recommended)
 * 
 * The ScanModeWrapper provides both keyboard shortcut (Ctrl+Shift+S)
 * and a floating toggle button. This is the recommended approach.
 */
export function ScanModeWrapperExample() {
  return (
    <ScanModeWrapper>
      <div style={{ padding: '40px' }}>
        <h1>Portfolio Content</h1>
        <p>Press Ctrl+Shift+S or click the button in the bottom-right to toggle scan mode.</p>
        <p>The scan mode overlay will appear with scanlines and glitch effects.</p>
      </div>
    </ScanModeWrapper>
  );
}

/**
 * Example 2: Using ScanModeOverlay Directly
 * 
 * For custom implementations where you want to control the scan mode
 * state yourself without the wrapper's keyboard shortcuts or button.
 */
export function ScanModeOverlayExample() {
  const [isScanActive, setIsScanActive] = useState(false);

  return (
    <div style={{ padding: '40px' }}>
      <h1>Custom Scan Mode Control</h1>
      
      <button 
        onClick={() => setIsScanActive(!isScanActive)}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        {isScanActive ? 'Deactivate' : 'Activate'} Scan Mode
      </button>

      <p>Current state: {isScanActive ? 'ACTIVE' : 'INACTIVE'}</p>

      <ScanModeOverlay isActive={isScanActive} />
    </div>
  );
}

/**
 * Example 3: Integration in Layout (Production Pattern)
 * 
 * This shows how ScanModeWrapper is integrated in the app layout
 * alongside other global wrappers like ThemeProvider and TerminalWrapper.
 */
export function LayoutIntegrationExample() {
  return (
    <div>
      <h2>Layout Integration Pattern</h2>
      <pre style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '8px',
        overflow: 'auto',
      }}>
        {`// app/layout.tsx
import { ThemeProvider } from "@/components/ThemeProvider";
import { TerminalWrapper } from "@/components/TerminalWrapper";
import { ScanModeWrapper } from "@/components/ScanModeWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <TerminalWrapper>
            <ScanModeWrapper>
              {children}
            </ScanModeWrapper>
          </TerminalWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}`}
      </pre>
    </div>
  );
}

/**
 * Example 4: Keyboard Shortcuts Reference
 */
export function KeyboardShortcutsReference() {
  return (
    <div style={{ padding: '40px' }}>
      <h2>Scan Mode Keyboard Shortcuts</h2>
      <table style={{ 
        borderCollapse: 'collapse', 
        width: '100%',
        marginTop: '20px',
      }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #333' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>Shortcut</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{ padding: '10px' }}>
              <code>Ctrl+Shift+S</code>
            </td>
            <td style={{ padding: '10px' }}>Toggle scan mode on/off</td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ marginTop: '30px' }}>Visual Effects</h3>
      <ul>
        <li><strong>Scanlines</strong>: Animated horizontal lines moving across the screen</li>
        <li><strong>Glitch Effects</strong>: Subtle periodic displacement and opacity changes</li>
        <li><strong>Corner Indicators</strong>: Pulsing corner brackets framing the viewport</li>
        <li><strong>Status Indicator</strong>: "SCAN MODE ACTIVE" text at the top center</li>
      </ul>

      <h3 style={{ marginTop: '30px' }}>Accessibility</h3>
      <ul>
        <li>All overlays use <code>pointer-events: none</code> to avoid blocking interactions</li>
        <li>Respects <code>prefers-reduced-motion</code> user preference</li>
        <li>Does not interfere with keyboard navigation or screen readers</li>
        <li>Toggle button has proper ARIA labels and focus indicators</li>
      </ul>
    </div>
  );
}
