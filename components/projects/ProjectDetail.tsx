'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Project } from '@/data/projects'

interface ProjectDetailProps {
  project: Project
  onClose: () => void
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="min-h-screen py-24 px-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ delay: 0.1 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="max-w-4xl mx-auto">
            <button
              onClick={onClose}
              className="mb-8 text-sm font-mono text-gray-muted hover:text-text-light transition-colors flex items-center gap-2 interactive"
            >
              <span>←</span>
              <span>BACK TO PROJECTS</span>
            </button>

            <div className="bg-void-light border border-gray-muted/30 p-8 md:p-12">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className={`text-xs font-mono px-2 py-1 border ${
                    project.status === 'LIVE' ? 'border-lavender/40 text-lavender' :
                    project.status === 'ACTIVE' ? 'border-crimson/40 text-crimson' :
                    'border-gray-muted/40 text-gray-muted'
                  }`}>
                    [{project.status}]
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-text-light mb-3">
                  {project.title}
                </h1>
                <p className="text-lg font-mono text-lavender">
                  {project.tagline}
                </p>
              </div>

              {/* Description */}
              <section className="mb-12">
                <h2 className="text-sm font-mono text-crimson mb-4">OVERVIEW</h2>
                <p className="text-gray-muted leading-relaxed">
                  {project.description}
                </p>
              </section>

              {/* Technology */}
              <section className="mb-12">
                <h2 className="text-sm font-mono text-crimson mb-4">TECHNOLOGY</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technology.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm font-mono text-text-light border border-lavender/20 px-3 py-1 bg-purple-deep/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>

              {/* Features */}
              <section className="mb-12">
                <h2 className="text-sm font-mono text-crimson mb-4">FEATURES</h2>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-muted">
                      <span className="text-lavender mt-1">→</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Challenges */}
              <section className="mb-12">
                <h2 className="text-sm font-mono text-crimson mb-4">CHALLENGES</h2>
                <ul className="space-y-2">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-muted">
                      <span className="text-lavender mt-1">•</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* What I Learned */}
              <section className="mb-12">
                <h2 className="text-sm font-mono text-crimson mb-4">WHAT I LEARNED</h2>
                <ul className="space-y-2">
                  {project.learned.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-muted">
                      <span className="text-lavender mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Links */}
              {(project.github || project.demo) && (
                <section className="flex gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm border border-lavender/40 text-lavender px-6 py-3 hover:bg-lavender/10 transition-colors interactive"
                    >
                      VIEW CODE →
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm border border-crimson/40 text-crimson px-6 py-3 hover:bg-crimson/10 transition-colors interactive"
                    >
                      LIVE DEMO ↗
                    </a>
                  )}
                </section>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
