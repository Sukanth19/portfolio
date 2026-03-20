/**
 * ProjectsSection Component
 * 
 * Displays portfolio projects in a responsive grid layout with staggered animations.
 * 
 * @see Requirements 6.1, 5.5, 7.1
 */

'use client';

import React from 'react';
import { Section } from './Section';
import { ProjectCard } from './ProjectCard';
import { AnimatedElement } from './AnimatedElement';
import { getProjects, Project } from '@/lib/data';

/**
 * ProjectsSection component props
 */
export interface ProjectsSectionProps {
  onProjectClick?: (project: Project) => void;
  showFeaturedOnly?: boolean;
}

/**
 * ProjectsSection component
 * 
 * Renders the projects section with:
 * - Responsive grid layout (1 column mobile, 2-3 columns desktop)
 * - Staggered card animations
 * - Theme-aware styling
 * - Optional project modal integration
 */
export function ProjectsSection({
  onProjectClick,
  showFeaturedOnly = false,
}: ProjectsSectionProps) {
  const projects = getProjects();
  const displayProjects = showFeaturedOnly
    ? projects.filter(p => p.featured)
    : projects;

  return (
    <Section id="projects" title="Projects" background="alternate">
      <div className="projects-grid" role="list" aria-label="Portfolio projects">
        {displayProjects.map((project, index) => (
          <AnimatedElement
            key={project.id}
            animation="slide"
            direction="up"
            delay={index * 0.1}
            duration={0.5}
          >
            <div role="listitem">
              <ProjectCard
                project={project}
                onClick={onProjectClick ? () => onProjectClick(project) : undefined}
              />
            </div>
          </AnimatedElement>
        ))}
      </div>

      <style jsx>{`
        .projects-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          width: 100%;
        }

        /* Tablet: 2 columns */
        @media (min-width: 768px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
          }
        }

        /* Desktop: 3 columns */
        @media (min-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 2.5rem;
          }
        }

        /* Large desktop: maintain 3 columns with larger gap */
        @media (min-width: 1440px) {
          .projects-grid {
            gap: 3rem;
          }
        }
      `}</style>
    </Section>
  );
}
