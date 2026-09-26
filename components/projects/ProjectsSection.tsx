'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { projects } from '@/data/projects'
import { ProjectCard } from './ProjectCard'
import { ProjectDetail } from './ProjectDetail'
import { SystemTimestamp } from '../ui/SystemTimestamp'
import { SystemCoordinates } from '../ui/SystemCoordinates'

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const project = selectedProject
    ? projects.find((p) => p.id === selectedProject)
    : null

  return (
    <section id="projects" className="min-h-screen py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <motion.div 
                className="w-12 h-px bg-crimson"
                whileHover={{ width: 60 }}
                transition={{ duration: 0.2 }}
              />
              <motion.h2 
                className="text-sm font-mono text-crimson"
                whileHover={{ scale: 1.1, x: 4 }}
                transition={{ duration: 0.2 }}
              >
                04
              </motion.h2>
            </div>
            <div className="flex items-center gap-4">
              <SystemCoordinates x={410} y={777} />
              <SystemTimestamp />
            </div>
          </div>
          <h2 className="text-5xl font-bold text-text-light mb-4">
            PROJECTS
          </h2>
          <p className="text-gray-muted font-mono text-sm max-w-2xl">
            Building systems that force me to understand how things actually work
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard
                project={project}
                onClick={() => setSelectedProject(project.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {project && (
        <ProjectDetail
          project={project}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}
