'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { buildLog } from '@/data/buildLog'

export function BuildLogSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const statusColors = {
    'BUILT': 'text-lavender',
    'EXPERIMENT': 'text-purple-deep',
    'IN PROGRESS': 'text-crimson',
    'COMPLETED': 'text-lavender',
    'ARCHIVED': 'text-gray-muted'
  }

  return (
    <section id="build-log" className="py-24 px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-3xl font-bold text-text-light font-mono">BUILD LOG</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-lavender/40 to-transparent" />
          </div>
          <p className="text-sm font-mono text-gray-muted">
            Engineering activity • experiments • builds
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-lavender/40 via-purple-deep/40 to-transparent" />

          {/* Entries */}
          <div className="space-y-6">
            {buildLog.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8"
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-lavender border-2 border-void"
                  whileHover={{ scale: 1.5 }}
                />

                {/* Entry content */}
                <motion.div
                  className="border border-gray-muted/20 bg-void-light/30 p-4 cursor-pointer group hover:border-lavender/30 transition-colors"
                  whileHover={{ x: 4 }}
                  onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                >
                  {/* Date and Status */}
                  <div className="flex items-center justify-between mb-2 text-xs font-mono">
                    <span className="text-gray-muted">[{entry.date}]</span>
                    <span className={`${statusColors[entry.status]} uppercase`}>
                      {entry.status}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="text-sm font-mono text-text-light mb-1 group-hover:text-lavender transition-colors">
                    {entry.title}
                  </div>

                  {/* Project */}
                  {entry.project && (
                    <div className="text-xs font-mono text-crimson mb-2">
                      {entry.project}
                    </div>
                  )}

                  {/* Description (expandable) */}
                  {entry.description && (
                    <motion.div
                      initial={false}
                      animate={{
                        height: expandedId === entry.id ? 'auto' : 0,
                        opacity: expandedId === entry.id ? 1 : 0
                      }}
                      className="overflow-hidden"
                    >
                      <div className="text-xs font-mono text-gray-muted pt-2 border-t border-gray-muted/10 mt-2">
                        {entry.description}
                      </div>
                      {entry.technologies && entry.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {entry.technologies.map(tech => (
                            <span
                              key={tech}
                              className="text-[10px] font-mono text-lavender/60 border border-lavender/20 px-2 py-0.5"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Expand indicator */}
                  {entry.description && (
                    <div className="text-xs font-mono text-gray-muted/40 mt-2 flex items-center gap-1">
                      <span>{expandedId === entry.id ? '▼' : '▶'}</span>
                      <span>{expandedId === entry.id ? 'COLLAPSE' : 'EXPAND'}</span>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-xs font-mono text-gray-muted/60 text-center"
        >
          <span>──────────</span>
          <span className="mx-2">ONGOING</span>
          <span>──────────</span>
        </motion.div>
      </div>
    </section>
  )
}
