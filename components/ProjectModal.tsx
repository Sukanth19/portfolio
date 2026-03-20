/**
 * ProjectModal Component
 * 
 * Modal component for displaying detailed project information.
 * Features keyboard navigation and accessibility support.
 * 
 * @see Requirements 6.6
 */

'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';
import { Project } from '@/lib/data';

/**
 * ProjectModal component props
 */
export interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * ProjectModal component
 * 
 * Displays expanded project details in a modal overlay:
 * - Full project description
 * - Large project image
 * - Technology stack
 * - Links to GitHub and live demo
 * - Keyboard navigation (Escape to close)
 * - Click outside to close
 */
export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { themeConfig } = useTheme();

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Don't render if not open or no project
  if (!isOpen || !project) {
    return null;
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
      }}
    >
      <div
        className="modal-content"
        style={{
          backgroundColor: themeConfig.colors.background.primary,
          boxShadow: themeConfig.effects.shadow.lg,
        }}
      >
        {/* Close button */}
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
          style={{
            color: themeConfig.colors.text.secondary,
            transition: `color ${themeConfig.transitions.duration.fast} ${themeConfig.transitions.easing}`,
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Modal body */}
        <div className="modal-body">
          {/* Project Image */}
          {project.imageUrl && (
            <div className="modal-image-container">
              <Image
                src={project.imageUrl}
                alt={`Detailed screenshot of ${project.title} project`}
                width={800}
                height={500}
                className="modal-image"
                style={{ objectFit: 'cover' }}
                priority={false}
                sizes="(max-width: 768px) 100vw, 900px"
              />
            </div>
          )}

          {/* Project Details */}
          <div className="modal-details">
            <h2
              id="modal-title"
              className="modal-title"
              style={{
                color: themeConfig.colors.text.primary,
              }}
            >
              {project.title}
            </h2>

            <p
              className="modal-description"
              style={{
                color: themeConfig.colors.text.secondary,
              }}
            >
              {project.longDescription || project.description}
            </p>

            {/* Technology Stack */}
            <div className="modal-section">
              <h3
                className="modal-section-title"
                style={{
                  color: themeConfig.colors.text.primary,
                }}
              >
                Technologies
              </h3>
              <div className="modal-technologies" role="list" aria-label="Technologies used in this project">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    role="listitem"
                    className="modal-tech-badge"
                    style={{
                      backgroundColor: themeConfig.colors.background.tertiary,
                      color: themeConfig.colors.text.accent,
                      borderColor: themeConfig.colors.border.default,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Links */}
            {(project.githubUrl || project.liveUrl) && (
              <div className="modal-section">
                <h3
                  className="modal-section-title"
                  style={{
                    color: themeConfig.colors.text.primary,
                  }}
                >
                  Links
                </h3>
                <div className="modal-links">
                  {project.githubUrl && (
                    <button
                      type="button"
                      onClick={() => handleLinkClick(project.githubUrl!)}
                      className="modal-link-button"
                      style={{
                        backgroundColor: themeConfig.colors.interactive.primary,
                        color: themeConfig.colors.background.primary,
                        transition: `all ${themeConfig.transitions.duration.fast} ${themeConfig.transitions.easing}`,
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
                      View on GitHub
                    </button>
                  )}

                  {project.liveUrl && (
                    <button
                      type="button"
                      onClick={() => handleLinkClick(project.liveUrl!)}
                      className="modal-link-button"
                      style={{
                        backgroundColor: themeConfig.colors.interactive.secondary,
                        color: themeConfig.colors.background.primary,
                        transition: `all ${themeConfig.transitions.duration.fast} ${themeConfig.transitions.easing}`,
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
                      View Live Demo
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .modal-content {
          position: relative;
          width: 100%;
          max-width: 900px;
          max-height: 90vh;
          border-radius: 12px;
          overflow: hidden;
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 10;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-close:hover {
          color: ${themeConfig.colors.text.primary};
          background-color: ${themeConfig.colors.background.tertiary};
        }

        .modal-close:focus {
          outline: 2px solid ${themeConfig.colors.interactive.primary};
          outline-offset: 2px;
        }

        .modal-body {
          overflow-y: auto;
          max-height: 90vh;
        }

        .modal-image-container {
          width: 100%;
          height: 400px;
          position: relative;
          overflow: hidden;
          background-color: ${themeConfig.colors.background.tertiary};
        }

        .modal-image {
          width: 100%;
          height: 100%;
        }

        .modal-details {
          padding: 2rem;
        }

        .modal-title {
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
          line-height: 1.3;
        }

        .modal-description {
          font-size: 1.1rem;
          line-height: 1.7;
          margin: 0 0 2rem 0;
        }

        .modal-section {
          margin-bottom: 2rem;
        }

        .modal-section-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
        }

        .modal-technologies {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .modal-tech-badge {
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.9rem;
          font-weight: 500;
          border: 1px solid;
        }

        .modal-links {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .modal-link-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
        }

        .modal-link-button:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }

        .modal-link-button:focus {
          outline: 2px solid ${themeConfig.colors.interactive.primary};
          outline-offset: 2px;
        }

        .link-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .modal-content {
            max-height: 95vh;
          }

          .modal-image-container {
            height: 250px;
          }

          .modal-details {
            padding: 1.5rem;
          }

          .modal-title {
            font-size: 1.5rem;
          }

          .modal-description {
            font-size: 1rem;
          }

          .modal-section-title {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
}
