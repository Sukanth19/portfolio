'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { experiences } from '@/data/experience'

interface TerminalLine {
  type: 'input' | 'output' | 'error'
  content: string
}

type WindowState = 'open' | 'minimized' | 'maximized' | 'closed'

export function Terminal() {
  const [windowState, setWindowState] = useState<WindowState>('open')
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'output', content: 'Welcome to Sukanth Portfolio Terminal v1.0.0' },
    { type: 'output', content: 'Type "help" for available commands' },
  ])
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  const commands: Record<string, () => string | string[]> = {
    help: () => [
      'Available commands:',
      '  about       - Learn about me',
      '  experience  - View experience',
      '  projects    - List all projects',
      '  stack       - View tech stack',
      '  lab         - See experiments',
      '  github      - Open GitHub profile',
      '  contact     - Get contact info',
      '  neofetch    - System information',
      '  whoami      - Who am I?',
      '  clear       - Clear terminal',
    ],
    about: () => [
      'Computer Science student who learns by building.',
      'Interests: AI/ML, Cybersecurity, Game Dev, Graphics, Systems',
      'Philosophy: Build it. Break it. Understand it. Rebuild it better.',
    ],
    experience: () => {
      const output = ['EXPERIENCE', '']
      experiences.forEach(exp => {
        output.push('2026')
        output.push(`├── ${exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}`)
        output.push(`│   ├── ${exp.startDate} → ${exp.endDate}`)
        exp.technologies.forEach((tech, i) => {
          const isLast = i === exp.technologies.length - 1
          output.push(`│   ${isLast ? '└──' : '├──'} ${tech}`)
        })
        output.push('')
      })
      return output
    },
    projects: () => [
      'Projects:',
      '  jamr.io        - Real-time music matchmaking',
      '  SneakerNet     - Sneaker intelligence platform',
      '  Eidothea       - Archive of the unexplained',
      '  Typing Tester  - Canvas-based typing game',
      '  Image to ASCII - Image conversion utility',
    ],
    stack: () => [
      'Languages: C, C++, Python, JavaScript, TypeScript, Java',
      'Web: React, Next.js, FastAPI, Flask, Laravel, PHP',
      'Infrastructure: Linux, AWS, EC2, Ubuntu, Nginx, Docker',
      'Databases: PostgreSQL, MongoDB, Redis',
      'Tools: Linux, Docker, Git, Neovim',
    ],
    lab: () => [
      'Active Experiments:',
      '  [BUILDING]    Graphics Engine',
      '  [EXPERIMENT]  Game Engine',
      '  [ACTIVE]      RAG / Local AI',
      '  [ACTIVE]      Cybersecurity Lab',
      '  [ACTIVE]      Home Lab',
    ],
    github: () => {
      window.open('https://github.com/Sukanth19', '_blank')
      return 'Opening GitHub profile...'
    },
    contact: () => [
      'Connect with me:',
      '  GitHub:  https://github.com/Sukanth19',
      '  Email:   sukan3066@gmail.com',
      '  Discord: zynk__19',
    ],
    neofetch: () => [
      '         _____           ',
      '        /     \\          SUKANTH',
      '       | O   O |         ────────────────',
      '       |   ^   |         OS:       Linux',
      '       |  \\_/  |         EDITOR:   Neovim',
      '        \\_____/          SHELL:    zsh',
      '                         FOCUS:    Building',
      '                         STATUS:   ONLINE',
    ],
    whoami: () => 'Sukanth - Developer / Builder / Experimenter',
    clear: () => {
      setLines([])
      return ''
    },
    sudo: () => 'Nice try. 😎',
    'rm -rf /': () => 'Permission denied. (Thankfully.)',
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedInput = input.trim()

    if (!trimmedInput) return

    setLines((prev) => [...prev, { type: 'input', content: trimmedInput }])

    const command = trimmedInput.toLowerCase()
    const commandFn = commands[command]

    if (commandFn) {
      const result = commandFn()
      if (result) {
        const outputs = Array.isArray(result) ? result : [result]
        setLines((prev) => [
          ...prev,
          ...outputs.map((content) => ({ type: 'output' as const, content })),
        ])
      }
    } else {
      setLines((prev) => [
        ...prev,
        { type: 'error', content: `Command not found: ${trimmedInput}` },
      ])
    }

    setInput('')
  }

  const handleClose = () => {
    setWindowState('closed')
  }

  const handleMinimize = () => {
    setWindowState('minimized')
  }

  const handleMaximize = () => {
    setWindowState(windowState === 'maximized' ? 'open' : 'maximized')
  }

  const handleRestore = () => {
    setWindowState('open')
  }

  if (windowState === 'closed') {
    return (
      <motion.button
        onClick={handleRestore}
        className="fixed bottom-8 left-8 z-40 bg-void-light/80 backdrop-blur-md border border-gray-muted/20 rounded-lg px-4 py-3 interactive group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05, borderColor: 'rgba(184, 174, 216, 0.4)' }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-lavender">{'>'}</span>
          <span className="text-xs font-mono text-gray-muted group-hover:text-text-light transition-colors">
            TERMINAL
          </span>
        </div>
      </motion.button>
    )
  }

  if (windowState === 'minimized') {
    return (
      <motion.button
        onClick={handleRestore}
        className="fixed bottom-8 left-8 z-40 bg-void-light/80 backdrop-blur-md border border-lavender/30 rounded-lg px-4 py-3 interactive group shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05, borderColor: 'rgba(184, 174, 216, 0.5)' }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-lavender">{'>'}</span>
          <span className="text-xs font-mono text-text-light">
            sukanth@portfolio:~
          </span>
          <span className="w-2 h-2 rounded-full bg-lavender animate-pulse" />
        </div>
      </motion.button>
    )
  }

  return (
    <section id="terminal" className={windowState === 'maximized' ? 'fixed inset-0 z-50 p-8 flex items-center justify-center bg-black/80 backdrop-blur-sm' : 'py-24 px-8'}>
      <motion.div
        className="w-full max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        layout
      >
        {windowState === 'open' && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-text-light mb-4">
              TERMINAL
            </h2>
            <p className="text-gray-muted font-mono text-sm">
              Try typing some commands
            </p>
          </div>
        )}

        <motion.div
          className="bg-void-light border border-gray-muted/30 rounded overflow-hidden shadow-2xl"
          layout
          animate={{
            scale: windowState === 'maximized' ? 1 : 1,
            height: windowState === 'maximized' ? 'calc(100vh - 4rem)' : 'auto',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Terminal header with functional controls */}
          <div className="bg-void border-b border-gray-muted/30 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={handleClose}
                className="w-3 h-3 rounded-full bg-crimson/60 hover:bg-crimson transition-colors interactive group relative"
                title="Close terminal"
              >
                <span className="absolute inset-0 flex items-center justify-center text-[8px] text-void opacity-0 group-hover:opacity-100">
                  ×
                </span>
              </button>
              <button
                onClick={handleMinimize}
                className="w-3 h-3 rounded-full bg-purple-deep/60 hover:bg-purple-deep transition-colors interactive group relative"
                title="Minimize terminal"
              >
                <span className="absolute inset-0 flex items-center justify-center text-[8px] text-void opacity-0 group-hover:opacity-100">
                  −
                </span>
              </button>
              <button
                onClick={handleMaximize}
                className="w-3 h-3 rounded-full bg-lavender/60 hover:bg-lavender transition-colors interactive group relative"
                title={windowState === 'maximized' ? 'Restore' : 'Maximize'}
              >
                <span className="absolute inset-0 flex items-center justify-center text-[8px] text-void opacity-0 group-hover:opacity-100">
                  {windowState === 'maximized' ? '↙' : '↗'}
                </span>
              </button>
              <span className="ml-4 text-xs font-mono text-gray-muted">
                sukanth@portfolio:~
              </span>
            </div>
          </div>

          {/* Terminal content */}
          <div
            ref={terminalRef}
            className={`p-4 font-mono text-sm overflow-y-auto ${
              windowState === 'maximized' ? 'h-[calc(100%-3rem)]' : 'h-[400px]'
            }`}
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line, i) => (
              <div key={i} className="mb-1">
                {line.type === 'input' && (
                  <div className="flex items-start gap-2">
                    <span className="text-lavender">$</span>
                    <span className="text-text-light">{line.content}</span>
                  </div>
                )}
                {line.type === 'output' && (
                  <div className="text-gray-muted whitespace-pre-wrap">
                    {line.content}
                  </div>
                )}
                {line.type === 'error' && (
                  <div className="text-crimson">{line.content}</div>
                )}
              </div>
            ))}

            {/* Input line */}
            <form onSubmit={handleSubmit} className="flex items-start gap-2">
              <span className="text-lavender">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-text-light outline-none"
                autoComplete="off"
                autoFocus
              />
              <span className="w-2 h-4 bg-lavender animate-blink" />
            </form>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
