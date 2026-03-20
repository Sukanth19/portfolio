/**
 * ContactSection Component
 * 
 * Contact section with contact methods and social links.
 * Features theme-aware styling with interactive hover states.
 * 
 * @see Requirements 5.1, 5.5
 */

'use client';

import React from 'react';
import { Section } from './Section';
import { AnimatedElement } from './AnimatedElement';

/**
 * Contact link interface
 */
export interface ContactLink {
  /**
   * Link label
   */
  label: string;
  /**
   * Link URL
   */
  url: string;
  /**
   * Link type (for styling)
   */
  type: 'email' | 'github' | 'linkedin' | 'twitter' | 'other';
}

/**
 * ContactSection component props
 */
export interface ContactSectionProps {
  /**
   * Contact links to display
   */
  links?: ContactLink[];
  /**
   * Optional contact description
   */
  description?: string;
}

/**
 * Default contact links
 */
const DEFAULT_LINKS: ContactLink[] = [
  {
    label: "Email",
    url: "mailto:hello@example.com",
    type: "email",
  },
  {
    label: "GitHub",
    url: "https://github.com",
    type: "github",
  },
  {
    label: "LinkedIn",
    url: "https://linkedin.com",
    type: "linkedin",
  },
  {
    label: "Twitter",
    url: "https://twitter.com",
    type: "twitter",
  },
];

/**
 * ContactSection component
 * 
 * Displays contact methods with interactive hover states.
 */
export function ContactSection({
  links = DEFAULT_LINKS,
  description = "Let's connect! Feel free to reach out through any of these channels.",
}: ContactSectionProps) {

  return (
    <Section id="contact" title="Contact" background="default">
      <div className="contact-container">
        <AnimatedElement animation="fade" delay={0.2} duration={0.5}>
          <p className="contact-description">{description}</p>
        </AnimatedElement>

        <nav className="contact-links" aria-label="Contact methods">
          {links.map((link, index) => (
            <AnimatedElement
              key={link.label}
              animation="scale"
              delay={0.3 + index * 0.1}
              duration={0.4}
            >
              <a
                href={link.url}
                target={link.type !== 'email' ? '_blank' : undefined}
                rel={link.type !== 'email' ? 'noopener noreferrer' : undefined}
                className={`contact-link contact-link-${link.type}`}
                aria-label={`Contact via ${link.label}`}
              >
                <span className="contact-link-label">{link.label}</span>
                <span className="contact-link-arrow" aria-hidden="true">→</span>
              </a>
            </AnimatedElement>
          ))}
        </nav>
      </div>

      <style jsx>{`
        .contact-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .contact-description {
          font-size: 1.125rem;
          color: var(--color-text-secondary);
          text-align: center;
          line-height: 1.6;
          margin: 0;
          transition: color var(--transition-duration-normal) var(--transition-easing);
        }

        .contact-links {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          width: 100%;
        }

        .contact-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.75rem;
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--color-text-primary);
          background-color: var(--color-bg-tertiary);
          border: 2px solid var(--color-border-default);
          border-radius: 8px;
          text-decoration: none;
          transition: all var(--transition-duration-fast) var(--transition-easing);
        }

        .contact-link:hover {
          background: var(--gradient-primary);
          border-color: var(--color-border-accent);
          transform: translateY(-4px);
          box-shadow: var(--effect-shadow-lg);
        }

        .contact-link:active {
          transform: translateY(-2px);
        }

        .contact-link-label {
          transition: transform var(--transition-duration-fast) var(--transition-easing);
        }

        .contact-link-arrow {
          font-size: 1.5rem;
          transition: transform var(--transition-duration-fast) var(--transition-easing);
        }

        .contact-link:hover .contact-link-arrow {
          transform: translateX(4px);
        }

        /* Responsive Design - Mobile First */
        
        /* Small devices (320px to 480px) */
        @media (max-width: 480px) {
          .contact-container {
            gap: 2rem;
          }

          .contact-description {
            font-size: 1rem;
          }

          .contact-links {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .contact-link {
            padding: 1rem 1.5rem;
            font-size: 1rem;
          }

          .contact-link-arrow {
            font-size: 1.25rem;
          }
        }

        /* Medium devices (481px to 768px) */
        @media (min-width: 481px) and (max-width: 768px) {
          .contact-links {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Large devices (769px to 1024px) */
        @media (min-width: 769px) and (max-width: 1024px) {
          .contact-links {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Extra large devices (1441px to 2560px) */
        @media (min-width: 1441px) {
          .contact-container {
            gap: 4rem;
          }

          .contact-description {
            font-size: 1.25rem;
          }

          .contact-links {
            gap: 2rem;
          }

          .contact-link {
            padding: 1.5rem 2rem;
            font-size: 1.25rem;
          }
        }

        /* Theme-specific enhancements for Miami Nights */
        :global([data-theme="miami-nights"]) .contact-link:hover {
          box-shadow: 0 8px 32px rgba(255, 0, 110, 0.5);
        }

        /* Theme-specific enhancements for Vesper */
        :global([data-theme="vesper"]) .contact-link:hover {
          box-shadow: 0 8px 32px rgba(168, 230, 207, 0.3);
        }

        /* Accessibility: Focus visible */
        .contact-link:focus-visible {
          outline: 2px solid var(--color-interactive-primary);
          outline-offset: 4px;
        }
      `}</style>
    </Section>
  );
}
