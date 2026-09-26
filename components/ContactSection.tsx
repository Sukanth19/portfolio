'use client'

import { motion } from 'framer-motion'
import { socials, resumePath } from '@/data/socials'
import { GitHubActivity } from './GitHubActivity'
import { SystemTimestamp } from './ui/SystemTimestamp'
import { SystemCoordinates } from './ui/SystemCoordinates'

export function ContactSection() {
  const contactSocials = socials.filter(s => s.showInConnect && s.url !== '[To Be Updated]')

  return (
    <section id="contact" className="min-h-screen py-24 px-8 flex items-center">
      <div className="max-w-5xl mx-auto w-full">
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
                07
              </motion.h2>
            </div>
            <div className="flex items-center gap-4">
              <SystemCoordinates x={701} y={117} />
              <SystemTimestamp />
            </div>
          </div>
          <h2 className="text-5xl font-bold text-text-light mb-4">
            CONNECT
          </h2>
          <p className="text-gray-muted font-mono text-sm max-w-2xl">
            Establishing connection to external systems...
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="border border-gray-muted/30 bg-void-light/30 p-8 md:p-12"
        >
          {/* Header */}
          <div className="mb-8 pb-6 border-b border-gray-muted/20">
            <div className="font-mono text-sm text-lavender mb-2">
              CONNECTION TERMINAL
            </div>
            <div className="text-xs font-mono text-gray-muted flex items-center gap-4">
              <span>SYSTEM STATUS</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-lavender rounded-full animate-pulse" />
                ONLINE
              </span>
            </div>
          </div>

          {/* Connections */}
          <div className="space-y-6">
            {contactSocials.map((social, i) => (
              <motion.div
                key={social.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="group"
              >
                {social.url.startsWith('http') || social.url.startsWith('mailto:') ? (
                  <motion.a
                    href={social.url}
                    target={social.url.startsWith('http') ? '_blank' : undefined}
                    rel={social.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center justify-between p-4 border border-gray-muted/20 hover:border-lavender/40 transition-all interactive"
                    whileHover={{ x: 4, backgroundColor: 'rgba(184, 174, 216, 0.05)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div>
                      <div className="text-sm font-mono text-crimson mb-1">
                        {social.label}
                      </div>
                      <div className="text-lg text-text-light group-hover:text-lavender transition-colors">
                        {social.username || social.url}
                      </div>
                    </div>
                    <motion.span
                      className="text-lavender text-xl"
                      whileHover={{ x: 4 }}
                    >
                      {social.url.startsWith('http') ? '↗' : '→'}
                    </motion.span>
                  </motion.a>
                ) : (
                  <div className="flex items-center justify-between p-4 border border-gray-muted/20">
                    <div>
                      <div className="text-sm font-mono text-crimson mb-1">
                        {social.label}
                      </div>
                      <div className="text-lg text-text-light">
                        {social.username}
                      </div>
                    </div>
                    <span className="text-lavender text-xl">#</span>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Resume link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + contactSocials.length * 0.1 }}
            >
              <motion.a
                href={resumePath}
                download
                className="flex items-center justify-between p-4 border border-gray-muted/20 hover:border-lavender/40 transition-all interactive group"
                whileHover={{ x: 4, backgroundColor: 'rgba(184, 174, 216, 0.05)' }}
                whileTap={{ scale: 0.98 }}
              >
                <div>
                  <div className="text-sm font-mono text-crimson mb-1">
                    Resume
                  </div>
                  <div className="text-lg text-text-light group-hover:text-lavender transition-colors">
                    Download PDF
                  </div>
                </div>
                <motion.span
                  className="text-lavender text-xl"
                  whileHover={{ x: 4 }}
                >
                  ↓
                </motion.span>
              </motion.a>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-gray-muted/20">
            <p className="text-sm text-gray-muted mb-8">
              Open to interesting projects, collaboration, and conversations about technology.
            </p>

            {/* GitHub Activity */}
            <GitHubActivity />
          </div>
        </motion.div>

        {/* Footer credits */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center font-mono text-xs text-gray-muted"
        >
          <div className="mb-2">Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion</div>
          <div>
            <span className="text-crimson">&lt;</span>
            <span> Designed and developed by Sukanth </span>
            <span className="text-crimson">/&gt;</span>
          </div>
          <div className="mt-4 text-gray-muted/60">
            © 2026 • Build it. Break it. Understand it. Rebuild it better.
          </div>
        </motion.div>
      </div>
    </section>
  )
}
