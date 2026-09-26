'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { technologies } from '@/data/technologies'
import { SystemTimestamp } from './ui/SystemTimestamp'
import { SystemCoordinates } from './ui/SystemCoordinates'

export function TechStackSection() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)

  const categories = Array.from(new Set(technologies.map(t => t.category)))

  const hoveredData = hoveredTech
    ? technologies.find(t => t.name === hoveredTech)
    : null

  return (
    <section id="stack" className="min-h-screen py-24 px-8">
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
                05
              </motion.h2>
            </div>
            <div className="flex items-center gap-4">
              <SystemCoordinates x={507} y={340} />
              <SystemTimestamp />
            </div>
          </div>
          <h2 className="text-5xl font-bold text-text-light mb-4">
            TECH STACK
          </h2>
          <p className="text-gray-muted font-mono text-sm max-w-2xl">
            Tools and technologies I use to build systems
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Technology constellation */}
          <div className="lg:col-span-2 space-y-8">
            {categories.map((category, catIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
              >
                <h3 className="text-sm font-mono text-lavender mb-4 border-b border-gray-muted/20 pb-2">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {technologies
                    .filter(t => t.category === category)
                    .map((tech) => (
                      <motion.button
                        key={tech.name}
                        onHoverStart={() => setHoveredTech(tech.name)}
                        onHoverEnd={() => setHoveredTech(null)}
                        className={`px-4 py-2 border font-mono text-sm transition-all interactive relative overflow-hidden ${
                          hoveredTech === tech.name
                            ? 'border-lavender text-lavender bg-purple-deep/20'
                            : 'border-gray-muted/30 text-gray-muted hover:border-lavender/50 hover:text-text-light'
                        }`}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tech.name}
                        {/* Subtle glitch effect on hover */}
                        {hoveredTech === tech.name && (
                          <motion.div
                            className="absolute inset-0 border border-lavender/40"
                            initial={{ x: 0, y: 0 }}
                            animate={{ 
                              x: [0, 2, -2, 0],
                              y: [0, -2, 2, 0],
                            }}
                            transition={{ duration: 0.3, repeat: 2 }}
                          />
                        )}
                      </motion.button>
                    ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Info panel */}
          <div className="lg:border-l lg:border-gray-muted/20 lg:pl-8">
            <div className="sticky top-24">
              {hoveredData ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-text-light mb-2">
                      {hoveredData.name}
                    </h3>
                    <p className="text-xs font-mono text-crimson">
                      {hoveredData.category}
                    </p>
                  </div>
                  {hoveredData.usedIn.length > 0 && (
                    <div>
                      <h4 className="text-sm font-mono text-lavender mb-2">
                        USED IN
                      </h4>
                      <ul className="space-y-1">
                        {hoveredData.usedIn.map((project, i) => (
                          <li
                            key={i}
                            className="text-sm text-gray-muted flex items-start gap-2"
                          >
                            <span className="text-lavender">→</span>
                            <span>{project}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {hoveredData.experience && hoveredData.experience.length > 0 && (
                    <div>
                      <h4 className="text-sm font-mono text-crimson mb-2">
                        EXPERIENCE
                      </h4>
                      <ul className="space-y-1">
                        {hoveredData.experience.map((exp, i) => (
                          <li
                            key={i}
                            className="text-sm text-gray-muted flex items-start gap-2"
                          >
                            <span className="text-crimson">•</span>
                            <span>{exp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ) : (
                <div className="text-sm font-mono text-gray-muted">
                  Hover over a technology to see details
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
