/**
 * ScanModeWrapper Component
 * 
 * Wraps the application and provides scan mode toggle functionality.
 * Handles keyboard shortcuts and state management for scan mode overlay.
 * 
 * @see Requirements 10.1, 10.5
 */

'use client';

import React, { useState, useEffect } from 'react';
import { ScanModeOverlay } from './ScanModeOverlay';
import { useTheme } from './ThemeProvider';

/**
 * ScanModeWrapper props interface
 */
interface ScanModeWrapperProps {
  children: React.ReactNode;
}

/**
 * ScanModeWrapper component
 * 
 * Provides global keyboard listener for scan mode activation and toggle button.
 * Manages scan mode state and renders the overlay when active.
 */
export function ScanModeWrapper({ children }: ScanModeWrapperProps) {
  const [isScanModeActive, setIsScanModeActive] = useState(false);
  const { themeConfig } = useTheme();

  useEffect(() => {
    /**
     * Handle global keyboard events
     * Ctrl+Shift+S to toggle scan mode
     */
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        e.preventDefault();
        setIsScanModeActive(prev => !prev);
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  /**
   * Toggle scan mode
   */
  const toggleScanMode = () => {
    setIsScanModeActive(prev => !prev);
  };

  return (
    <>
      {children}
      
      {/* Scan Mode Toggle Button */}
      <button
        onClick={toggleScanMode}
        className="scan-mode-toggle"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: `2px solid ${themeConfig.colors.border.accent}`,
          backgroundColor: isScanModeActive 
            ? themeConfig.colors.interactive.primary 
            : themeConfig.colors.background.secondary,
          color: isScanModeActive 
            ? themeConfig.colors.background.primary 
            : themeConfig.colors.text.primary,
          cursor: 'pointer',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          transition: `all ${themeConfig.transitions.duration.normal} ${themeConfig.transitions.easing}`,
          boxShadow: isScanModeActive 
            ? themeConfig.effects.shadow.md 
            : themeConfig.effects.shadow.sm,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = themeConfig.effects.shadow.lg;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = isScanModeActive 
            ? themeConfig.effects.shadow.md 
            : themeConfig.effects.shadow.sm;
        }}
        aria-label={isScanModeActive ? 'Deactivate scan mode' : 'Activate scan mode'}
        title={`Scan Mode ${isScanModeActive ? 'ON' : 'OFF'} (Ctrl+Shift+S)`}
        type="button"
      >
        {isScanModeActive ? '◉' : '○'}
      </button>

      {/* Scan Mode Overlay */}
      <ScanModeOverlay isActive={isScanModeActive} />

      {/* Additional Styles */}
      <style jsx>{`
        .scan-mode-toggle:active {
          transform: scale(0.95) !important;
        }

        .scan-mode-toggle:focus-visible {
          outline: 2px solid ${themeConfig.colors.interactive.primary};
          outline-offset: 2px;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .scan-mode-toggle {
            bottom: 80px;
            right: 16px;
            width: 44px;
            height: 44px;
            font-size: 18px;
          }
        }
      `}</style>
    </>
  );
}
