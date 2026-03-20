/**
 * GradientBorder Component
 * 
 * Theme-aware gradient border wrapper that adapts to the active theme.
 * Wraps children with a gradient border using the theme's gradient configuration.
 * 
 * @see Requirements 6.5
 */

'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';

/**
 * GradientBorder component props
 */
interface GradientBorderProps {
  children: React.ReactNode;
  borderWidth?: number;
  borderRadius?: number;
  className?: string;
  gradient?: 'primary' | 'secondary' | 'accent';
}

/**
 * GradientBorder component
 * 
 * Wraps children with a gradient border that adapts to the active theme.
 * Uses CSS mask technique to create the gradient border effect.
 * 
 * @param children - Content to wrap with gradient border
 * @param borderWidth - Border width in pixels (default: 2)
 * @param borderRadius - Border radius in pixels (default: 8)
 * @param className - Additional CSS classes
 * @param gradient - Which gradient to use from theme (default: 'primary')
 */
export function GradientBorder({
  children,
  borderWidth = 2,
  borderRadius = 8,
  className = '',
  gradient = 'primary',
}: GradientBorderProps) {
  const { themeConfig } = useTheme();

  // Get the gradient from the active theme
  const gradientValue = themeConfig.gradients[gradient];

  return (
    <div
      className={`relative ${className}`}
      style={{
        borderRadius: `${borderRadius}px`,
      }}
    >
      {/* Gradient border layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: gradientValue,
          borderRadius: `${borderRadius}px`,
          padding: `${borderWidth}px`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
        }}
        aria-hidden="true"
      />
      
      {/* Content */}
      <div
        style={{
          borderRadius: `${borderRadius - borderWidth}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
