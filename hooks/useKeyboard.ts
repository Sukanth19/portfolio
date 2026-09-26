'use client'

import { useEffect, useState } from 'react'

export function useKeyboard() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const isInputField = ['INPUT', 'TEXTAREA'].includes(target.tagName) || 
                          target.isContentEditable

      // Don't trigger shortcuts in input fields
      if (isInputField) return

      // Escape to close command palette
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false)
        return
      }

      // All shortcuts now require Ctrl key
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'k':
            e.preventDefault()
            setCommandPaletteOpen(true)
            break
          case 'h':
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
            break
          case 'a':
            e.preventDefault()
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
            break
          case 'e':
            e.preventDefault()
            document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
            break
          case 'p':
            e.preventDefault()
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            break
          case 's':
            e.preventDefault()
            document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' })
            break
          case 'l':
            e.preventDefault()
            document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth' })
            break
          case '`':
          case "'":
            // Ctrl + ` or Ctrl + ' for terminal (~ requires shift)
            e.preventDefault()
            window.dispatchEvent(new CustomEvent('toggleTerminal'))
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return {
    commandPaletteOpen,
    setCommandPaletteOpen,
  }
}
