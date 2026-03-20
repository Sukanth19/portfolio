/**
 * AboutSection Component
 * 
 * About section with personal information and subtle animations.
 * Features theme-aware styling and responsive design.
 * 
 * @see Requirements 5.1, 5.5
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { Section } from './Section';
import { AnimatedElement } from './AnimatedElement';

/**
 * AboutSection component props
 */
export interface AboutSectionProps {
  /**
   * About content paragraphs
   */
  content?: string[];
  /**
   * Optional profile image URL
   */
  imageUrl?: string;
}

/**
 * AboutSection component
 * 
 * Displays personal information with animated content reveal.
 */
export function AboutSection({
  content = [
    "I'm a passionate developer focused on creating beautiful, functional web experiences.",
    "With expertise in modern web technologies, I build scalable applications that solve real problems.",
    "I believe in clean code, thoughtful design, and continuous learning.",
  ],
  imageUrl,
}: AboutSectionProps) {

  return (
    <Section id="about" title="About" background="alternate">
      <article className="about-container">
        {imageUrl && (
          <AnimatedElement animation="scale" delay={0.2} duration={0.5}>
            <div className="about-image-wrapper">
              <Image 
                src={imageUrl} 
                alt="Profile photo" 
                className="about-image"
                width={400}
                height={400}
                priority
              />
            </div>
          </AnimatedElement>
        )}

        <div className="about-content">
          {content.map((paragraph, index) => (
            <AnimatedElement
              key={index}
              animation="slide"
              direction="up"
              delay={0.2 + index * 0.15}
              duration={0.5}
            >
              <p className="about-paragraph">{paragraph}</p>
            </AnimatedElement>
          ))}
        </div>
      </article>

      <style jsx>{`
        .about-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .about-image-wrapper {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid var(--color-border-accent);
          transition: border-color var(--transition-duration-normal) var(--transition-easing);
        }

        .about-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .about-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
        }

        .about-paragraph {
          font-size: 1.125rem;
          color: var(--color-text-secondary);
          line-height: 1.8;
          margin: 0;
          text-align: center;
          transition: color var(--transition-duration-normal) var(--transition-easing);
        }

        /* Responsive Design - Mobile First */
        
        /* Small devices (320px to 480px) */
        @media (max-width: 480px) {
          .about-container {
            gap: 2rem;
          }

          .about-image-wrapper {
            width: 150px;
            height: 150px;
          }

          .about-content {
            gap: 1.25rem;
          }

          .about-paragraph {
            font-size: 1rem;
          }
        }

        /* Medium devices (481px to 768px) */
        @media (min-width: 481px) and (max-width: 768px) {
          .about-image-wrapper {
            width: 180px;
            height: 180px;
          }
        }

        /* Large devices (769px and up) */
        @media (min-width: 769px) {
          .about-container {
            flex-direction: row;
            align-items: flex-start;
            gap: 4rem;
          }

          .about-image-wrapper {
            flex-shrink: 0;
          }

          .about-content {
            flex: 1;
          }

          .about-paragraph {
            text-align: left;
          }
        }

        /* Extra large devices (1441px to 2560px) */
        @media (min-width: 1441px) {
          .about-container {
            gap: 5rem;
          }

          .about-image-wrapper {
            width: 250px;
            height: 250px;
          }

          .about-paragraph {
            font-size: 1.25rem;
          }
        }

        /* Theme-specific enhancements */
        :global([data-theme="miami-nights"]) .about-image-wrapper {
          box-shadow: 0 0 30px rgba(255, 0, 110, 0.3);
        }

        :global([data-theme="vesper"]) .about-image-wrapper {
          box-shadow: 0 0 20px rgba(168, 230, 207, 0.2);
        }
      `}</style>
    </Section>
  );
}
