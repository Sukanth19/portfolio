'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { socials, emailUrl, resumePath } from '@/data/socials'

const EASE = [0.22, 1, 0.36, 1] as const

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } },
}

export function Hero() {
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    setTime(new Date())
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const quickLinks = socials.filter(s => s.showInQuickLinks && s.url !== '[To Be Updated]' && s.url !== '#')

  return (
    <section className="min-h-screen flex items-center justify-center relative px-8">
      <div className="max-w-5xl w-full">
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="space-y-8"
        >
          {/* Terminal header */}
          <motion.div variants={item} className="font-mono text-sm text-gray-muted border-b border-gray-muted/20 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lavender">sukanth@system</span>
                <span className="text-gray-muted">:</span>
                <span className="text-crimson">~</span>
                <span className="text-gray-muted">$</span>
              </div>
              <div className="text-xs">
                {time ? time.toLocaleTimeString('en-US', { hour12: false }) : '--:--:--'}
              </div>
            </div>
          </motion.div>

          {/* Main content */}
          <div className="space-y-6">
            <motion.div variants={item}>
              <h1 className="text-6xl md:text-7xl font-bold text-text-light mb-2">
                SUKANTH
              </h1>
              <div className="font-mono text-sm text-lavender space-y-1">
                <div className="flex items-center">
                  <span className="text-crimson mr-2">{'>'}</span>
                  <span>Computer Science Student</span>
                </div>
                <div className="flex items-center">
                  <span className="text-crimson mr-2">{'>'}</span>
                  <span>Developer / Builder / Experimenter</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={item} className="font-mono text-sm text-gray-muted max-w-2xl space-y-2 border-l-2 border-purple-deep pl-4">
              <p className="text-text-light/80">
                i build things that are slightly too hard for me, then figure them out along the way
              </p>
            </motion.div>

            {/* Action buttons */}
            <motion.div variants={item} className="flex flex-wrap gap-4 pt-4">
              <motion.a
                href={resumePath}
                download
                className="px-6 py-3 border border-lavender/40 text-lavender font-mono text-sm hover:bg-lavender/10 transition-colors interactive flex items-center gap-2"
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>↓</span>
                <span>DOWNLOAD RESUME</span>
              </motion.a>
              <motion.a
                href={emailUrl}
                className="px-6 py-3 border border-crimson/40 text-crimson font-mono text-sm hover:bg-crimson/10 transition-colors interactive flex items-center gap-2"
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>✉</span>
                <span>MAIL ME</span>
              </motion.a>
            </motion.div>

            {/* Quick Links */}
            {quickLinks.length > 0 && (
              <motion.div variants={item} className="pt-4">
                <div className="text-xs font-mono text-crimson mb-3">QUICK LINKS</div>
                <div className="border-t border-gray-muted/20 pt-3">
                  <div className="flex flex-wrap gap-3">
                    {quickLinks.map((link) => (
                      <motion.a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-mono text-gray-muted hover:text-lavender transition-colors interactive flex items-center gap-2 border border-gray-muted/20 px-3 py-2 hover:border-lavender/40"
                        whileHover={{ x: 2, borderColor: 'rgba(184, 174, 216, 0.4)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>{link.label}</span>
                        <motion.span
                          className="text-xs"
                          whileHover={{ x: 2, y: -2 }}
                        >
                          ↗
                        </motion.span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* System status */}
            <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              {[
                { label: 'STATUS', value: 'ONLINE', color: 'text-lavender' },
                { label: 'FOCUS', value: 'BUILDING', color: 'text-text-light' },
                { label: 'OPEN TO', value: 'INTERNSHIPS', color: 'text-lavender' },
                { label: 'EDITOR', value: 'NEOVIM (can\'t exit)', color: 'text-text-light' },
              ].map((status) => (
                <div
                  key={status.label}
                  className="border border-gray-muted/20 p-3 bg-void-light/30 group transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-lavender/30 hover:bg-void-light/50"
                >
                  <div className="text-xs font-mono text-gray-muted mb-1 group-hover:text-crimson transition-colors">
                    {status.label}
                  </div>
                  <div className={`text-sm font-mono ${status.color} group-hover:text-lavender transition-colors`}>
                    {status.value}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Environment info - compact */}
            <motion.div variants={item} className="pt-6">
              <div className="border border-gray-muted/20 bg-void-light/20 p-4">
                <div className="text-xs font-mono text-crimson mb-3 flex items-center gap-2">
                  <span>ENVIRONMENT</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-crimson/40 to-transparent" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-gray-muted">OS</span>
                    <span className="text-text-light">ARCH LINUX <span className="text-gray-muted">(btw)</span></span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-muted">WM</span>
                    <span className="text-text-light">HYPRLAND</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-muted">SHELL</span>
                    <span className="text-text-light">ZSH</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{
              opacity: { delay: 1.2, duration: 0.8 },
              y: { repeat: Infinity, duration: 2.4, ease: 'easeInOut' },
            }}
          >
            <div className="text-xs font-mono text-gray-muted">
              SCROLL TO EXPLORE
              <div className="w-px h-12 bg-gradient-to-b from-gray-muted to-transparent mx-auto mt-2" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
