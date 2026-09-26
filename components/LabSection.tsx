'use client'

import { motion } from 'framer-motion'
import { experiments } from '@/data/experiments'
import { SystemTimestamp } from './ui/SystemTimestamp'
import { SystemCoordinates } from './ui/SystemCoordinates'

export function LabSection() {
  return (
    <section id="lab" className="min-h-screen py-24 px-8 bg-void-light/30">
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
                06
              </motion.h2>
            </div>
            <div className="flex items-center gap-4">
              <SystemCoordinates x={619} y={124} />
              <SystemTimestamp />
            </div>
          </div>
          <h2 className="text-5xl font-bold text-text-light mb-4">
            THE LAB
          </h2>
          <p className="text-gray-muted font-mono text-sm max-w-2xl">
            Unconventional experiments • Learning through building • Understanding from first principles
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiments.map((experiment, index) => (
            <motion.article
              key={experiment.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-muted/20 bg-void/50 p-6 group hover:border-lavender/30 transition-colors cursor-pointer relative overflow-hidden"
              whileHover={{ 
                y: -4,
                borderColor: 'rgba(184, 174, 216, 0.4)',
                backgroundColor: 'rgba(18, 18, 22, 0.7)'
              }}
            >
              {/* Hover gradient effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: 'linear-gradient(135deg, rgba(98, 87, 122, 0.1) 0%, transparent 50%)'
                }}
              />

              {/* Status */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <motion.span 
                  className={`text-xs font-mono px-2 py-1 border ${
                    experiment.status === 'ACTIVE' ? 'border-lavender/40 text-lavender' :
                    experiment.status === 'BUILDING' ? 'border-crimson/40 text-crimson' :
                    experiment.status === 'EXPERIMENT' ? 'border-purple-deep/40 text-purple-deep' :
                    experiment.status === 'IDEA' ? 'border-gray-muted/40 text-gray-muted' :
                    'border-gray-muted/30 text-gray-muted'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  [{experiment.status}]
                </motion.span>
                <SystemCoordinates />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-text-light mb-3 group-hover:text-lavender transition-colors relative z-10">
                {experiment.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-muted mb-4 leading-relaxed relative z-10">
                {experiment.description}
              </p>

              {/* Focus areas */}
              <div className="mb-4 relative z-10">
                <h4 className="text-xs font-mono text-crimson mb-2">EXPLORING</h4>
                <ul className="space-y-1">
                  {experiment.focus.slice(0, 3).map((item, i) => (
                    <motion.li 
                      key={i} 
                      className="text-xs text-gray-muted flex items-start gap-2"
                      whileHover={{ x: 2, color: '#E8E0EC' }}
                    >
                      <span className="text-lavender">→</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                  {experiment.focus.length > 3 && (
                    <li className="text-xs text-gray-muted/60">
                      +{experiment.focus.length - 3} more areas
                    </li>
                  )}
                </ul>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 relative z-10">
                {experiment.technologies.map((tech) => (
                  <motion.span
                    key={tech}
                    className="text-xs font-mono text-gray-muted border border-gray-muted/20 px-2 py-0.5"
                    whileHover={{ 
                      borderColor: 'rgba(184, 174, 216, 0.4)',
                      color: '#E8E0EC',
                      y: -1
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
