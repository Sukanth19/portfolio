'use client'

import { motion } from 'framer-motion'
import { SystemTimestamp } from './ui/SystemTimestamp'
import { SystemCoordinates } from './ui/SystemCoordinates'

export function AboutSection() {
  const interests = [
    'Software Engineering',
    'AI / Machine Learning',
    'Cybersecurity',
    'Game Development',
    'Graphics Programming',
    'Systems Programming',
    'DevOps & Self-hosting',
    'Developer Tooling',
  ]

  const philosophy = [
    { label: 'APPROACH', value: 'Learning through building' },
    { label: 'PRIORITY', value: 'Understanding over memorization' },
    { label: 'METHOD', value: 'Build. Break. Understand. Rebuild.' },
    { label: 'MINDSET', value: 'Execution over planning' },
  ]

  return (
    <section id="about" className="min-h-screen py-24 px-8 bg-void-light/30">
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
                02
              </motion.h2>
            </div>
            <div className="flex items-center gap-4">
              <SystemCoordinates x={214} y={892} />
              <SystemTimestamp />
            </div>
          </div>
          <h2 className="text-5xl font-bold text-text-light mb-4">
            ABOUT
          </h2>
        </motion.div>

        <div className="space-y-16">
          {/* Identity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-3 font-mono text-sm">
              <div className="flex border-b border-gray-muted/20 pb-2">
                <span className="text-crimson w-32">Name</span>
                <span className="text-text-light">Sukanth</span>
              </div>
              <div className="flex border-b border-gray-muted/20 pb-2">
                <span className="text-crimson w-32">Role</span>
                <span className="text-text-light">Developer / Builder</span>
              </div>
              <div className="flex border-b border-gray-muted/20 pb-2">
                <span className="text-crimson w-32">Location</span>
                <span className="text-text-light">India</span>
              </div>
              <div className="flex border-b border-gray-muted/20 pb-2">
                <span className="text-crimson w-32">Education</span>
                <span className="text-text-light">Computer Science</span>
              </div>
              <div className="flex border-b border-gray-muted/20 pb-2">
                <span className="text-crimson w-32">Institution</span>
                <span className="text-text-light">Amrita Vishwa Vidyapeetham</span>
              </div>
              <div className="flex border-b border-gray-muted/20 pb-2">
                <span className="text-crimson w-32">Status</span>
                <span className="text-lavender">Building things</span>
              </div>
            </div>

            <div className="space-y-4 text-gray-muted leading-relaxed">
              <p>
                Computer Science undergraduate who learns primarily by building.
              </p>
              <p>
                I prefer unconventional projects that force me to understand how systems
                actually work. Rather than following tutorials, I build things that are
                slightly too difficult and figure them out along the way.
              </p>
              <p>
                My interests span the full spectrum of computing—from low-level systems
                and graphics to AI/ML and game development.
              </p>
            </div>
          </motion.div>

          {/* Interests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-mono text-lavender">INTERESTS</h3>
              <SystemCoordinates />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {interests.map((interest, i) => (
                <motion.div
                  key={i}
                  className="border border-gray-muted/20 p-3 text-sm text-gray-muted hover:border-lavender/30 hover:text-text-light transition-colors cursor-pointer"
                  whileHover={{ x: 4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {interest}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-mono text-lavender">PHILOSOPHY</h3>
              <SystemCoordinates />
            </div>
            <div className="space-y-4">
              {philosophy.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-6 border-l-2 border-purple-deep pl-4 py-2"
                >
                  <span className="text-xs font-mono text-crimson w-32">
                    {item.label}
                  </span>
                  <span className="text-text-light">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Environment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-mono text-lavender">ENVIRONMENT</h3>
              <SystemCoordinates />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <motion.div 
                className="border border-gray-muted/20 p-4 cursor-pointer"
                whileHover={{ borderColor: 'rgba(184, 174, 216, 0.3)', y: -2 }}
              >
                <div className="text-xs font-mono text-crimson mb-1">OS</div>
                <div className="text-text-light">Linux</div>
              </motion.div>
              <motion.div 
                className="border border-gray-muted/20 p-4 cursor-pointer"
                whileHover={{ borderColor: 'rgba(184, 174, 216, 0.3)', y: -2 }}
              >
                <div className="text-xs font-mono text-crimson mb-1">EDITOR</div>
                <div className="text-text-light">Neovim</div>
              </motion.div>
              <motion.div 
                className="border border-gray-muted/20 p-4 cursor-pointer"
                whileHover={{ borderColor: 'rgba(184, 174, 216, 0.3)', y: -2 }}
              >
                <div className="text-xs font-mono text-crimson mb-1">SHELL</div>
                <div className="text-text-light">zsh</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
