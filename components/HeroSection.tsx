/**
 * HeroSection Component
 * 
 * Landing section with introduction content and animated entrance.
 * Features theme-aware styling with gradients and responsive design.
 * 
 * @see Requirements 5.1, 5.5, 7.1
 */

'use client';

import React from 'react';
import { Section } from './Section';
import { AnimatedElement } from './AnimatedElement';

/**
 * HeroSection component props
 */
export interface HeroSectionProps {
  /**
   * Main heading text
   */
  title?: string;
  /**
   * Subtitle or tagline
   */
  subtitle?: string;
  /**
   * Call-to-action text
   */
  ctaText?: string;
  /**
   * Call-to-action link
   */
  ctaLink?: string;
}

/**
 * HeroSection component
 * 
 * Displays the hero section with animated entrance and theme-aware styling.
 */
export function HeroSection({
  title = "Welcome to My Portfolio",
  subtitle = "Building exceptional digital experiences with modern web technologies",
  ctaText = "View My Work",
  ctaLink = "#projects",
}: HeroSectionProps) {

  return (
    <Section id="hero" background="default">
      <div className="hero-container">
        <AnimatedElement animation="fade" delay={0.2} duration={0.6}>
          <h1 className="hero-title">{title}</h1>
        </AnimatedElement>

        <AnimatedElement animation="slide" direction="up" delay={0.4} duration={0.6}>
          <p className="hero-subtitle">{subtitle}</p>
        </AnimatedElement>

        <AnimatedElement animation="scale" delay={0.6} duration={0.5}>
          <a href={ctaLink} className="hero-cta" aria-label={`${ctaText} - Navigate to projects section`}>
            {ctaText}
          </a>
        </AnimatedElement>
      </div>

      <style jsx>{`
        .hero-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          min-height: calc(100vh - 80px);
          padding: 2rem 1rem;
          gap: 2rem;
        }

        .hero-title {
          font-size: 3rem;
          font-weight: 700;
          color: var(--color-text-primary);
          margin: 0;
          line-height: 1.2;
          transition: color var(--transition-duration-normal) var(--transition-easing);
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--color-text-secondary);
          max-width: 600px;
          margin: 0;
          line-height: 1.6;
          transition: color var(--transition-duration-normal) var(--transition-easing);
        }

        .hero-cta {
          display: inline-block;
          padding: 1rem 2rem;
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--color-text-primary);
          background: var(--gradient-primary);
          border-radius: 8px;
          text-decoration: none;
          transition: transform var(--transition-duration-fast) var(--transition-easing),
                      box-shadow var(--transition-duration-fast) var(--transition-easing);
          box-shadow: var(--effect-shadow-md);
        }

        .hero-cta:hover {
          transform: translateY(-2px);
          box-shadow: var(--effect-shadow-lg);
        }

        .hero-cta:active {
          transform: translateY(0);
        }

        /* Responsive Design - Mobile First */
        
        /* Small devices (320px to 480px) */
        @media (max-width: 480px) {
          .hero-container {
            min-height: calc(100vh - 60px);
            padding: 1.5rem 1rem;
            gap: 1.5rem;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .hero-cta {
            padding: 0.875rem 1.75rem;
            font-size: 1rem;
          }
        }

        /* Medium devices (481px to 768px) */
        @media (min-width: 481px) and (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.125rem;
          }
        }

        /* Large devices (769px to 1024px) */
        @media (min-width: 769px) and (max-width: 1024px) {
          .hero-title {
            font-size: 3rem;
          }

          .hero-subtitle {
            font-size: 1.25rem;
          }
        }

        /* Extra large devices (1025px to 1440px) */
        @media (min-width: 1025px) and (max-width: 1440px) {
          .hero-title {
            font-size: 3.5rem;
          }

          .hero-subtitle {
            font-size: 1.375rem;
          }
        }

        /* Ultra-wide devices (1441px to 2560px) */
        @media (min-width: 1441px) {
          .hero-container {
            gap: 2.5rem;
          }

          .hero-title {
            font-size: 4rem;
          }

          .hero-subtitle {
            font-size: 1.5rem;
            max-width: 700px;
          }

          .hero-cta {
            padding: 1.125rem 2.25rem;
            font-size: 1.25rem;
          }
        }

        /* Theme-specific enhancements for Miami Nights */
        :global([data-theme="miami-nights"]) .hero-title {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Theme-specific enhancements for Vesper */
        :global([data-theme="vesper"]) .hero-title {
          color: var(--color-text-accent);
        }

        /* Accessibility: Focus visible */
        .hero-cta:focus-visible {
          outline: 2px solid var(--color-interactive-primary);
          outline-offset: 4px;
        }
      `}</style>
    </Section>
  );
}
