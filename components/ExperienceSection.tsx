'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { experiences } from '@/data/experience'
import { ExperienceDetail } from './ExperienceDetail'
import { SystemTimestamp } from './ui/SystemTimestamp'
import { SystemCoordinates } from './ui/SystemCoordinates'

export function ExperienceSection() {
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null)

  const exp = selectedExperience
    ? experiences.find((e) => e.id === selectedExperience)
    : null

  return (
    <section id="experience" className="min-h-screen py-24 px-8">
      <div className="max-w-5xl mx-auto">
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
                03
              </motion.h2>
            </div>
            <div className="flex items-center gap-4">
              <SystemCoordinates x={387} y={512} />
              <SystemTimestamp />
            </div>
          </div>
          <h2 className="text-5xl font-bold text-text-light mb-4">
            EXPERIENCE
          </h2>
          <p className="text-gray-muted font-mono text-sm max-w-2xl">
            Engineering timeline • Real-world development • Systems work
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.article
              key={experience.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedExperience(experience.id)}
              className="border-l-2 border-purple-deep pl-8 relative cursor-pointer group interactive"
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-purple-deep bg-void"
                whileHover={{ scale: 1.3, borderColor: '#B8AED8' }}
              />

              {/* Year marker */}
              <div className="text-xs font-mono text-crimson mb-2">
                2026
              </div>

              {/* Date range */}
              <div className="flex items-center gap-4 mb-3">
                <span className="text-lg font-bold text-text-light group-hover:text-lavender transition-colors">
                  {experience.startDate} → {experience.endDate}
                </span>
                <span className="text-xs font-mono text-gray-muted px-2 py-1 border border-gray-muted/20">
                  {experience.duration}
                </span>
              </div>

              {/* Role */}
              <div className="text-sm font-mono text-lavender mb-4">
                {experience.type.toUpperCase()} • {experience.role}
              </div>

              {/* Technologies */}
              <div className="mb-4">
                <div className="text-xs font-mono text-crimson mb-2">
                  ENVIRONMENT
                </div>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      className="text-xs font-mono text-gray-muted border border-gray-muted/20 px-2 py-1"
                      whileHover={{ 
                        borderColor: 'rgba(184, 174, 216, 0.4)',
                        color: '#E8E0EC'
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Work preview */}
              <div className="space-y-1 mb-4">
                {experience.work.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-muted">
                    <span className="text-lavender">├──</span>
                    <span>{item}</span>
                  </div>
                ))}
                {experience.work.length > 3 && (
                  <div className="flex items-start gap-2 text-sm text-gray-muted/60">
                    <span className="text-lavender">└──</span>
                    <span>+{experience.work.length - 3} more areas</span>
                  </div>
                )}
              </div>

              {/* AI Section Preview */}
              {experience.ai && (
                <div className="mt-4 pt-4 border-t border-gray-muted/20">
                  <div className="text-xs font-mono text-crimson mb-2">
                    AI DEVELOPMENT
                  </div>
                  <div className="text-sm text-gray-muted">
                    {experience.ai.description}
                  </div>
                </div>
              )}

              {/* Expand indicator */}
              <motion.div
                className="mt-4 text-xs font-mono text-gray-muted flex items-center gap-2"
                whileHover={{ x: 4 }}
              >
                <span>Click to expand</span>
                <span className="text-lavender">→</span>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>

      {exp && (
        <ExperienceDetail
          experience={exp}
          onClose={() => setSelectedExperience(null)}
        />
      )}
    </section>
  )
}
