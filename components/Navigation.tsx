'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface NavigationProps {
  onNavigate: (section: string) => void
}

export function Navigation({ onNavigate }: NavigationProps) {
  const [logoClicks, setLogoClicks] = useState(0)

  const sections = [
    { id: 'system', label: 'SYSTEM', shortcut: 'Ctrl+H' },
    { id: 'about', label: 'ABOUT', shortcut: 'Ctrl+A' },
    { id: 'experience', label: 'EXPERIENCE', shortcut: 'Ctrl+E' },
    { id: 'projects', label: 'PROJECTS', shortcut: 'Ctrl+P' },
    { id: 'stack', label: 'STACK', shortcut: 'Ctrl+S' },
    { id: 'build-log', label: 'BUILD LOG', shortcut: 'Ctrl+B' },
    { id: 'lab', label: 'LAB', shortcut: 'Ctrl+L' },
    { id: 'archive', label: 'ARCHIVE', shortcut: 'Ctrl+R' },
  ]

  const handleLogoClick = () => {
    const newCount = logoClicks + 1
    setLogoClicks(newCount)
    
    if (newCount === 7) {
      // Easter egg trigger
      console.log('🎉 Secret unlocked!')
      setLogoClicks(0)
    }
  }

  return (
    <motion.nav
      className="fixed top-8 left-1/2 -translate-x-1/2 z-40"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <div className="bg-void-light/80 backdrop-blur-md border border-gray-muted/20 rounded-full px-6 py-3 shadow-2xl">
        <div className="flex items-center gap-6">
          <motion.button
            onClick={handleLogoClick}
            className="text-lavender font-mono font-bold text-sm tracking-wider interactive"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            [ S ]
          </motion.button>

          <div className="hidden md:flex items-center gap-4">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => onNavigate(section.id)}
                className="text-xs font-mono text-gray-muted hover:text-text-light transition-colors relative group interactive"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-lavender group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
          </div>

          <button
            onClick={() => onNavigate('command')}
            className="text-xs font-mono text-gray-muted hover:text-text-light transition-colors interactive"
            title="Command Palette [/]"
          >
            <span className="hidden md:inline">/</span>
            <span className="md:hidden">☰</span>
          </button>
        </div>
      </div>
    </motion.nav>
  )
}
