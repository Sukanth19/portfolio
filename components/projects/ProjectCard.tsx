'use client'

import { motion } from 'framer-motion'
import { Project } from '@/data/projects'
import { SystemCoordinates } from '../ui/SystemCoordinates'

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.article
      className="border border-gray-muted/20 bg-void-light/30 p-6 cursor-pointer group relative overflow-hidden interactive"
      whileHover={{ 
        borderColor: 'rgba(184, 174, 216, 0.4)',
        backgroundColor: 'rgba(18, 18, 22, 0.5)',
        y: -4,
        scale: 1.01
      }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
    >
      {/* Status indicator */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <motion.span 
          className={`text-xs font-mono px-2 py-1 border ${
            project.status === 'LIVE' ? 'border-lavender/40 text-lavender' :
            project.status === 'ACTIVE' ? 'border-crimson/40 text-crimson' :
            project.status === 'BUILDING' ? 'border-purple-deep/40 text-purple-deep' :
            'border-gray-muted/40 text-gray-muted'
          }`}
          whileHover={{ scale: 1.05 }}
        >
          [{project.status}]
        </motion.span>
        <div className="flex items-center gap-3">
          <SystemCoordinates />
          <motion.span
            className="text-gray-muted group-hover:text-lavender transition-colors"
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            →
          </motion.span>
        </div>
      </div>

      {/* Title */}
      <motion.h3 
        className="text-2xl font-bold text-text-light mb-2 group-hover:text-lavender transition-colors relative z-10"
        whileHover={{ x: 2 }}
      >
        {project.title}
      </motion.h3>

      {/* Tagline */}
      <p className="text-sm font-mono text-lavender/80 mb-4 relative z-10">
        {project.tagline}
      </p>

      {/* Description */}
      <p className="text-sm text-gray-muted mb-6 leading-relaxed relative z-10">
        {project.description}
      </p>

      {/* Technology tags */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {project.technology.slice(0, 5).map((tech) => (
          <motion.span
            key={tech}
            className="text-xs font-mono text-gray-muted border border-gray-muted/20 px-2 py-1"
            whileHover={{ 
              borderColor: 'rgba(184, 174, 216, 0.4)',
              color: '#E8E0EC',
              y: -2,
              scale: 1.05
            }}
          >
            {tech}
          </motion.span>
        ))}
        {project.technology.length > 5 && (
          <span className="text-xs font-mono text-gray-muted">
            +{project.technology.length - 5} more
          </span>
        )}
      </div>

      {/* Hover gradient effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0, x: '-100%' }}
        whileHover={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-deep/10 via-transparent to-transparent" />
      </motion.div>

      {/* Corner accent */}
      <motion.div
        className="absolute top-0 right-0 w-20 h-20 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-lavender/10 to-transparent" />
      </motion.div>
    </motion.article>
  )
}
