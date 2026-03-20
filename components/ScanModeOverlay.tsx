/**
 * ScanModeOverlay Component
 * 
 * Cybersecurity-themed visual overlay with scanlines and glitch effects.
 * Provides a non-intrusive visual enhancement when scan mode is activated.
 * 
 * @see Requirements 10.2, 10.3, 10.4
 */

'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';

/**
 * ScanModeOverlay props interface
 */
interface ScanModeOverlayProps {
  isActive: boolean;
}

/**
 * ScanModeOverlay component
 * 
 * Renders scanline overlay and glitch effects when scan mode is active.
 * Effects are theme-aware and adapt to the active theme colors.
 */
export function ScanModeOverlay({ isActive }: ScanModeOverlayProps) {
  const { themeConfig } = useTheme();

  if (!isActive) {
    return null;
  }

  return (
    <>
      {/* Scanline Overlay */}
      <div
        className="scan-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            ${themeConfig.colors.interactive.primary}08 2px,
            ${themeConfig.colors.interactive.primary}08 4px
          )`,
          animation: 'scanline 8s linear infinite',
        }}
      />

      {/* Glitch Effect Overlay */}
      <div
        className="glitch-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: 0.03,
          mixBlendMode: 'screen',
          animation: 'glitch 3s infinite',
        }}
      />

      {/* Corner Indicators */}
      <div
        className="scan-corners"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 9997,
        }}
      >
        {/* Top Left */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            width: '40px',
            height: '40px',
            borderTop: `2px solid ${themeConfig.colors.interactive.primary}40`,
            borderLeft: `2px solid ${themeConfig.colors.interactive.primary}40`,
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
        
        {/* Top Right */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
            borderTop: `2px solid ${themeConfig.colors.interactive.primary}40`,
            borderRight: `2px solid ${themeConfig.colors.interactive.primary}40`,
            animation: 'pulse 2s ease-in-out infinite 0.5s',
          }}
        />
        
        {/* Bottom Left */}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            width: '40px',
            height: '40px',
            borderBottom: `2px solid ${themeConfig.colors.interactive.primary}40`,
            borderLeft: `2px solid ${themeConfig.colors.interactive.primary}40`,
            animation: 'pulse 2s ease-in-out infinite 1s',
          }}
        />
        
        {/* Bottom Right */}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
            borderBottom: `2px solid ${themeConfig.colors.interactive.primary}40`,
            borderRight: `2px solid ${themeConfig.colors.interactive.primary}40`,
            animation: 'pulse 2s ease-in-out infinite 1.5s',
          }}
        />
      </div>

      {/* Scan Status Indicator */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          zIndex: 10000,
          fontFamily: 'monospace',
          fontSize: '12px',
          color: themeConfig.colors.interactive.primary,
          opacity: 0.6,
          letterSpacing: '2px',
          animation: 'blink 1.5s infinite',
        }}
      >
        [ SCAN MODE ACTIVE ]
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        @keyframes glitch {
          0%, 90%, 100% {
            opacity: 0.03;
            transform: translate(0);
          }
          92% {
            opacity: 0.08;
            transform: translate(-2px, 2px);
          }
          94% {
            opacity: 0.08;
            transform: translate(2px, -2px);
          }
          96% {
            opacity: 0.08;
            transform: translate(-2px, -2px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes blink {
          0%, 49%, 100% {
            opacity: 0.6;
          }
          50%, 99% {
            opacity: 0.2;
          }
        }

        /* Respect reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .scan-overlay,
          .glitch-overlay,
          .scan-corners > div,
          div[style*="SCAN MODE"] {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}
