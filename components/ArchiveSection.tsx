'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { archivedProjects } from '@/data/archive'

export function ArchiveSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const statusStyles = {
    'COMPLETED': 'text-lavender border-lavender/30',
    'ARCHIVED': 'text-gray-muted border-gray-muted/30',
    'ABANDONED': 'text-purple-deep/60 border-purple-deep/30'
  }

  return (
    <section id="archive" className="py-24 px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-3xl font-bold text-text-light/60 font-mono">ARCHIVE</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-muted/40 to-transparent" />
          </div>
          <p className="text-sm font-mono text-gray-muted/80">
            Older experiments • completed work • learning projects
          </p>
        </motion.div>

        {/* Archive Grid */}
        <div className="grid gap-4">
          {archivedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-muted/20 bg-void-light/20 p-6 cursor-pointer group"
              whileHover={{ borderColor: 'rgba(184, 174, 216, 0.3)', x: 2 }}
              onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-mono text-text-light/80 group-hover:text-lavender/80 transition-colors mb-1">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="text-gray-muted">{project.year}</span>
                    <span className={`border px-2 py-0.5 ${statusStyles[project.status]}`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm font-mono text-gray-muted mb-3">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-3">
                {project.technologies.map(tech => (
                  <span
                    key={tech}
                    className="text-xs font-mono text-lavender/50 border border-lavender/20 px-2 py-0.5"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Expanded Details */}
              <motion.div
                initial={false}
                animate={{
                  height: expandedId === project.id ? 'auto' : 0,
                  opacity: expandedId === project.id ? 1 : 0
                }}
                className="overflow-hidden"
              >
                <div className="border-t border-gray-muted/10 pt-4 mt-4 space-y-3">
                  {/* Why */}
                  <div>
                    <div className="text-xs font-mono text-crimson/60 mb-1">WHY IT WAS BUILT</div>
                    <div className="text-xs font-mono text-gray-muted">
                      {project.why}
                    </div>
                  </div>

                  {/* What I Learned */}
                  <div>
                    <div className="text-xs font-mono text-crimson/60 mb-2">WHAT I LEARNED</div>
                    <div className="space-y-1">
                      {project.learned.map((item, i) => (
                        <div key={i} className="text-xs font-mono text-gray-muted flex items-start gap-2">
                          <span className="text-lavender/40">→</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Expand indicator */}
              <div className="text-xs font-mono text-gray-muted/40 mt-3 flex items-center gap-1">
                <span>{expandedId === project.id ? '▼' : '▶'}</span>
                <span>{expandedId === project.id ? 'COLLAPSE' : 'EXPAND DETAILS'}</span>
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  )
}
