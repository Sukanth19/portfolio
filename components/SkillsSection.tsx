/**
 * SkillsSection Component
 * 
 * Skills section displaying technology list in organized grid layout.
 * Features hover effects and theme-aware styling.
 * 
 * @see Requirements 5.1, 5.5
 */

'use client';

import React from 'react';
import { Section } from './Section';
import { AnimatedElement } from './AnimatedElement';

/**
 * Skill category interface
 */
export interface SkillCategory {
  /**
   * Category name
   */
  name: string;
  /**
   * Skills in this category
   */
  skills: string[];
}

/**
 * SkillsSection component props
 */
export interface SkillsSectionProps {
  /**
   * Skill categories to display
   */
  categories?: SkillCategory[];
}

/**
 * Default skill categories
 */
const DEFAULT_CATEGORIES: SkillCategory[] = [
  {
    name: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    name: "Backend",
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"],
  },
  {
    name: "Tools & Platforms",
    skills: ["Git", "Docker", "Vercel", "AWS", "VS Code"],
  },
];

/**
 * SkillsSection component
 * 
 * Displays skills in organized grid layout with hover effects.
 */
export function SkillsSection({
  categories = DEFAULT_CATEGORIES,
}: SkillsSectionProps) {

  return (
    <Section id="skills" title="Skills" background="alternate">
      <div className="skills-container">
        {categories.map((category, categoryIndex) => (
          <AnimatedElement
            key={category.name}
            animation="slide"
            direction="up"
            delay={0.1 + categoryIndex * 0.15}
            duration={0.5}
          >
            <article className="skill-category">
              <h3 className="category-title">{category.name}</h3>
              <div className="skills-grid" role="list" aria-label={`${category.name} skills`}>
                {category.skills.map((skill) => (
                  <div key={skill} className="skill-item" role="listitem">
                    {skill}
                  </div>
                ))}
              </div>
            </article>
          </AnimatedElement>
        ))}
      </div>

      <style jsx>{`
        .skills-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 3rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .skill-category {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .category-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--color-text-primary);
          margin: 0;
          text-align: center;
          transition: color var(--transition-duration-normal) var(--transition-easing);
        }

        .skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
        }

        .skill-item {
          padding: 0.625rem 1.25rem;
          font-size: 0.9375rem;
          font-weight: 500;
          color: var(--color-text-primary);
          background-color: var(--color-bg-tertiary);
          border: 1px solid var(--color-border-default);
          border-radius: 6px;
          transition: all var(--transition-duration-fast) var(--transition-easing);
          cursor: default;
        }

        .skill-item:hover {
          background: var(--gradient-primary);
          border-color: var(--color-border-accent);
          transform: translateY(-2px);
          box-shadow: var(--effect-shadow-md);
        }

        /* Responsive Design - Mobile First */
        
        /* Small devices (320px to 480px) */
        @media (max-width: 480px) {
          .skills-container {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .category-title {
            font-size: 1.25rem;
          }

          .skills-grid {
            gap: 0.625rem;
          }

          .skill-item {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
          }
        }

        /* Medium devices (481px to 768px) */
        @media (min-width: 481px) and (max-width: 768px) {
          .skills-container {
            grid-template-columns: 1fr;
            gap: 2.75rem;
          }

          .category-title {
            font-size: 1.375rem;
          }
        }

        /* Large devices (769px to 1024px) */
        @media (min-width: 769px) and (max-width: 1024px) {
          .skills-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Extra large devices (1441px to 2560px) */
        @media (min-width: 1441px) {
          .skills-container {
            gap: 4rem;
          }

          .category-title {
            font-size: 1.75rem;
          }

          .skill-item {
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
          }
        }

        /* Theme-specific enhancements for Miami Nights */
        :global([data-theme="miami-nights"]) .category-title {
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        :global([data-theme="miami-nights"]) .skill-item:hover {
          box-shadow: 0 4px 16px rgba(255, 0, 110, 0.4);
        }

        /* Theme-specific enhancements for Vesper */
        :global([data-theme="vesper"]) .category-title {
          color: var(--color-text-accent);
        }

        :global([data-theme="vesper"]) .skill-item:hover {
          box-shadow: 0 4px 16px rgba(168, 230, 207, 0.3);
        }

        /* Accessibility: Focus visible */
        .skill-item:focus-visible {
          outline: 2px solid var(--color-interactive-primary);
          outline-offset: 2px;
        }
      `}</style>
    </Section>
  );
}
