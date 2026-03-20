/**
 * Section Layout Component
 * 
 * Reusable section wrapper with consistent spacing and theme-aware styling.
 * Provides structure for major portfolio sections (Hero, About, Projects, Skills, Contact).
 * 
 * @see Requirements 5.5, 13.2
 */

'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';

/**
 * Section component props
 */
export interface SectionProps {
  /**
   * Unique identifier for the section (used for navigation anchors)
   */
  id: string;
  /**
   * Optional section title
   */
  title?: string;
  /**
   * Section content
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Background variant for visual variety
   */
  background?: 'default' | 'alternate';
}

/**
 * Section component
 * 
 * Wraps content with consistent spacing, padding, and theme-aware styling.
 * Supports different background variants for visual variety between sections.
 */
export function Section({
  id,
  title,
  children,
  className = '',
  background = 'default',
}: SectionProps) {
  const { themeConfig } = useTheme();

  // Determine background color based on variant
  const backgroundColor = background === 'alternate' 
    ? themeConfig.colors.background.secondary 
    : themeConfig.colors.background.primary;

  return (
    <section
      id={id}
      className={`portfolio-section ${background} ${className}`}
      style={{
        backgroundColor,
        transition: `background-color ${themeConfig.transitions.duration.normal} ${themeConfig.transitions.easing}`,
      }}
    >
      <div className="section-container">
        {title && (
          <h2 className="section-title">
            {title}
          </h2>
        )}
        <div className="section-content">
          {children}
        </div>
      </div>

      <style jsx>{`
        .portfolio-section {
          width: 100%;
          padding: 4rem 1rem;
          position: relative;
        }

        .section-container {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--color-text-primary);
          margin-bottom: 3rem;
          text-align: center;
          transition: color var(--transition-duration-normal) var(--transition-easing);
        }

        .section-content {
          width: 100%;
        }

        /* Responsive typography */
        @media (max-width: 768px) {
          .portfolio-section {
            padding: 3rem 1rem;
          }

          .section-title {
            font-size: 2rem;
            margin-bottom: 2rem;
          }
        }

        @media (max-width: 480px) {
          .portfolio-section {
            padding: 2.5rem 1rem;
          }

          .section-title {
            font-size: 1.75rem;
            margin-bottom: 1.5rem;
          }
        }

        /* Larger screens */
        @media (min-width: 1440px) {
          .portfolio-section {
            padding: 5rem 2rem;
          }

          .section-title {
            font-size: 3rem;
            margin-bottom: 4rem;
          }
        }

        /* Theme-specific enhancements for Miami Nights */
        :global([data-theme="miami-nights"]) .section-title {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Theme-specific enhancements for Vesper */
        :global([data-theme="vesper"]) .section-title {
          color: var(--color-text-accent);
        }
      `}</style>
    </section>
  );
}
