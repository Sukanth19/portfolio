/**
 * ProjectCard Component
 * 
 * Displays individual project information with theme-aware styling.
 * Features hover elevation effect and gradient borders.
 * 
 * @see Requirements 6.1, 6.2, 6.3, 6.4, 6.5, 11.3
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';
import { GradientBorder } from './GradientBorder';
import { Project } from '@/lib/data';

/**
 * ProjectCard component props
 */
export interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

/**
 * ProjectCard component
 * 
 * Displays project information in a card layout with:
 * - Project image (optimized with Next.js Image)
 * - Title and description
 * - Technology stack badges
 * - Links to GitHub and live deployment
 * - Hover elevation effect
 * - Theme-aware gradient borders
 */
export function ProjectCard({
  project,
  onClick,
}: ProjectCardProps) {
  const { themeConfig } = useTheme();

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <GradientBorder borderWidth={2} borderRadius={12} className="h-full">
      <article
        className={`project-card ${onClick ? 'cursor-pointer' : ''}`}
        onClick={handleCardClick}
        {...(onClick && {
          role: 'button',
          tabIndex: 0,
          'aria-label': `View details for ${project.title} project`,
        })}
        onKeyDown={(e) => {
          if (onClick && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick();
          }
        }}
        style={{
          backgroundColor: themeConfig.colors.background.secondary,
          transition: `all ${themeConfig.transitions.duration.normal} ${themeConfig.transitions.easing}`,
        }}
      >
        {/* Project Image */}
        {project.imageUrl && (
          <div className="project-image-container">
            <Image
              src={project.imageUrl}
              alt={`Screenshot of ${project.title} project`}
              width={600}
              height={400}
              className="project-image"
              style={{ objectFit: 'cover' }}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        {/* Project Content */}
        <div className="project-content">
          <h3
            className="project-title"
            style={{
              color: themeConfig.colors.text.primary,
              transition: `color ${themeConfig.transitions.duration.normal} ${themeConfig.transitions.easing}`,
            }}
          >
            {project.title}
          </h3>

          <p
            className="project-description"
            style={{
              color: themeConfig.colors.text.secondary,
              transition: `color ${themeConfig.transitions.duration.normal} ${themeConfig.transitions.easing}`,
            }}
          >
            {project.description}
          </p>

          {/* Technology Stack */}
          <div className="project-technologies" role="list" aria-label="Technologies used">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                role="listitem"
                className="tech-badge"
                style={{
                  backgroundColor: themeConfig.colors.background.tertiary,
                  color: themeConfig.colors.text.accent,
                  borderColor: themeConfig.colors.border.default,
                  transition: `all ${themeConfig.transitions.duration.normal} ${themeConfig.transitions.easing}`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Project Links */}
          <div className="project-links">
            {project.githubUrl && (
              <button
                type="button"
                onClick={(e) => handleLinkClick(e, project.githubUrl!)}
                className="project-link"
                style={{
                  color: themeConfig.colors.interactive.primary,
                  transition: `color ${themeConfig.transitions.duration.fast} ${themeConfig.transitions.easing}`,
                }}
                aria-label={`View ${project.title} source code on GitHub`}
              >
                <svg
                  className="link-icon"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>GitHub</span>
              </button>
            )}

            {project.liveUrl && (
              <button
                type="button"
                onClick={(e) => handleLinkClick(e, project.liveUrl!)}
                className="project-link"
                style={{
                  color: themeConfig.colors.interactive.primary,
                  transition: `color ${themeConfig.transitions.duration.fast} ${themeConfig.transitions.easing}`,
                }}
                aria-label={`View ${project.title} live demo`}
              >
                <svg
                  className="link-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                <span>Live Demo</span>
              </button>
            )}
          </div>
        </div>

        <style jsx>{`
          .project-card {
            border-radius: 10px;
            overflow: hidden;
            height: 100%;
            display: flex;
            flex-direction: column;
          }

          .project-card:hover {
            transform: translateY(-4px);
            box-shadow: ${themeConfig.effects.shadow.lg};
          }

          .project-image-container {
            width: 100%;
            height: 200px;
            position: relative;
            overflow: hidden;
            background-color: ${themeConfig.colors.background.tertiary};
          }

          .project-image {
            width: 100%;
            height: 100%;
            transition: transform ${themeConfig.transitions.duration.normal} ${themeConfig.transitions.easing};
          }

          .project-card:hover .project-image {
            transform: scale(1.05);
          }

          .project-content {
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            flex: 1;
          }

          .project-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin: 0;
            line-height: 1.3;
          }

          .project-description {
            font-size: 0.95rem;
            line-height: 1.6;
            margin: 0;
            flex: 1;
          }

          .project-technologies {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .tech-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.8rem;
            font-weight: 500;
            border: 1px solid;
          }

          .project-links {
            display: flex;
            gap: 1rem;
            margin-top: 0.5rem;
          }

          .project-link {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
            font-weight: 600;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
          }

          .project-link:hover {
            color: ${themeConfig.colors.interactive.hover};
          }

          .project-link:focus {
            outline: 2px solid ${themeConfig.colors.interactive.primary};
            outline-offset: 2px;
            border-radius: 4px;
          }

          .link-icon {
            width: 1.25rem;
            height: 1.25rem;
          }

          /* Responsive adjustments */
          @media (max-width: 768px) {
            .project-content {
              padding: 1.25rem;
            }

            .project-title {
              font-size: 1.25rem;
            }

            .project-description {
              font-size: 0.9rem;
            }
          }
        `}</style>
      </article>
    </GradientBorder>
  );
}
