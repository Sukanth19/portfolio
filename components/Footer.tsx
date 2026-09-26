'use client'

import { motion } from 'framer-motion'
import { socials } from '@/data/socials'

export function Footer() {
  const footerLinks = socials.filter(s => s.showInQuickLinks && s.url !== '[To Be Updated]' && s.url !== '#')

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-12 px-8 border-t border-gray-muted/20"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Header */}
          <div className="font-mono text-sm">
            <span className="text-text-light font-bold">SUKANTH19</span>
            <span className="text-gray-muted mx-3">•</span>
            <span className="text-lavender text-xs">SYSTEM ONLINE</span>
          </div>

          {/* Links */}
          {footerLinks.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-4">
              {footerLinks.map((link, index) => (
                <span key={link.id} className="flex items-center gap-4">
                  <motion.a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-gray-muted hover:text-lavender transition-colors"
                    whileHover={{ y: -2 }}
                  >
                    {link.label}
                  </motion.a>
                  {index < footerLinks.length - 1 && (
                    <span className="text-gray-muted/40">•</span>
                  )}
                </span>
              ))}
            </div>
          )}

          {/* Copyright */}
          <div className="text-xs font-mono text-gray-muted/60 pt-2">
            © 2026 Sukanth
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
