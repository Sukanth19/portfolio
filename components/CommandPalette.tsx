'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (section: string) => void
}

const commands = [
  { id: 'system', label: 'Navigate to System', icon: '→' },
  { id: 'about', label: 'About Me', icon: '→' },
  { id: 'experience', label: 'View Experience', icon: '→' },
  { id: 'projects', label: 'View Projects', icon: '→' },
  { id: 'stack', label: 'Explore Tech Stack', icon: '→' },
  { id: 'build-log', label: 'View Build Log', icon: '→' },
  { id: 'lab', label: 'Enter The Lab', icon: '→' },
  { id: 'archive', label: 'Browse Archive', icon: '→' },
  { id: 'contact', label: 'Connect', icon: '→' },
  { id: 'github', label: 'Open GitHub', icon: '↗' },
  { id: 'terminal', label: 'Open Terminal', icon: '>' },
  { id: 'glitch', label: 'Toggle Glitch Mode', icon: '⚡' },
]

export function CommandPalette({ isOpen, onClose, onNavigate }: CommandPaletteProps) {
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : 0
        )
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredCommands.length - 1
        )
      } else if (e.key === 'Enter') {
        e.preventDefault()
        handleSelect(filteredCommands[selectedIndex].id)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, selectedIndex, filteredCommands])

  const handleSelect = (commandId: string) => {
    if (commandId === 'github') {
      window.open('https://github.com/Sukanth19', '_blank')
    } else if (commandId === 'terminal') {
      onNavigate('terminal')
    } else if (commandId === 'glitch') {
      window.dispatchEvent(new CustomEvent('toggleGlitch'))
    } else {
      onNavigate(commandId)
    }
    onClose()
    setSearch('')
    setSelectedIndex(0)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-void-light border border-gray-muted/30 rounded-lg shadow-2xl overflow-hidden">
              <div className="p-4 border-b border-gray-muted/20">
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search the system..."
                  className="w-full bg-transparent text-text-light font-mono text-sm outline-none placeholder:text-gray-muted"
                />
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {filteredCommands.map((command, index) => (
                  <motion.button
                    key={command.id}
                    onClick={() => handleSelect(command.id)}
                    className={`w-full text-left px-4 py-3 font-mono text-sm transition-colors flex items-center justify-between ${
                      index === selectedIndex
                        ? 'bg-purple-deep/30 text-text-light'
                        : 'text-gray-muted hover:bg-purple-deep/20 hover:text-text-light'
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <span>{command.label}</span>
                    <span className="text-lavender">{command.icon}</span>
                  </motion.button>
                ))}
                {filteredCommands.length === 0 && (
                  <div className="px-4 py-8 text-center text-gray-muted font-mono text-sm">
                    No commands found
                  </div>
                )}
              </div>
              <div className="p-3 border-t border-gray-muted/20 bg-void/50">
                <div className="flex items-center justify-between text-xs font-mono text-gray-muted">
                  <div className="flex gap-4">
                    <span>↑↓ Navigate</span>
                    <span>↵ Select</span>
                    <span>ESC Close</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
