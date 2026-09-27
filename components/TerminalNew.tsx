'use client'

import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { experiences } from '@/data/experience'
import { socials } from '@/data/socials'
import { terminalCommands, terminalConfig } from '@/data/terminal'
import { projects } from '@/data/projects'
import { buildLog } from '@/data/buildLog'
import { archivedProjects } from '@/data/archive'
import { SnakeGame } from './games/SnakeGame'
import { TerminalFullscreen } from './TerminalFullscreen'

interface TerminalLine {
  type: 'input' | 'output' | 'error'
  content: string
}

type WindowState = 'open' | 'minimized' | 'maximized' | 'closed'

interface TerminalProps {
  initialState?: WindowState
}

export function TerminalNew({ initialState = 'minimized' }: TerminalProps) {
  const [windowState, setWindowState] = useState<WindowState>(initialState)
  const [lines, setLines] = useState<TerminalLine[]>(
    terminalConfig.welcomeMessage.map(content => ({ type: 'output', content }))
  )
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [suggestion, setSuggestion] = useState('')
  const [showPopup, setShowPopup] = useState(true)
  const inputRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [showSnake, setShowSnake] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(v => !v)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  // Listen for toggle terminal events (Ctrl + `)
  useEffect(() => {
    const handleToggle = () => {
      setWindowState(prev => {
        if (prev === 'minimized' || prev === 'closed') {
          setShowPopup(false)
          setTimeout(() => inputRef.current?.focus(), 100)
          return 'open'
        } else {
          setShowPopup(false)
          return 'minimized'
        }
      })
    }

    window.addEventListener('toggleTerminal', handleToggle)
    return () => window.removeEventListener('toggleTerminal', handleToggle)
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  useEffect(() => {
    // Auto-suggest based on input
    if (input.trim()) {
      const matches = terminalCommands.filter(cmd => 
        cmd.startsWith(input.trim().toLowerCase())
      )
      if (matches.length > 0 && matches[0] !== input.trim()) {
        setSuggestion(matches[0])
      } else {
        setSuggestion('')
      }
    } else {
      setSuggestion('')
    }
  }, [input])

  const commands: Record<string, () => string | string[]> = {
    help: () => [
      'Available commands:',
      '  about       - Learn about me',
      '  experience  - View experience',
      '  projects    - List all projects',
      '  stack       - View tech stack',
      '  buildlog    - View build log',
      '  lab         - See experiments',
      '  archive     - View archived projects',
      '  github      - Open GitHub profile',
      '  contact     - Get contact info',
      '  neofetch    - System information',
      '  whoami      - Who am I?',
      '  history     - Command history',
      '  clear       - Clear terminal',
      '  echo <text> - Echo text',
      '  snake       - Play Snake game',
      '  glitch      - Toggle glitch mode',
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
        output.push(`├── ${exp.type.charAt(0).toUpperCase() + exp.type.slice(1)} - ${exp.role}`)
        output.push(`│   ├── ${exp.startDate} → ${exp.endDate}`)
        exp.technologies.forEach((tech, i) => {
          const isLast = i === exp.technologies.length - 1
          output.push(`│   ${isLast ? '└──' : '├──'} ${tech}`)
        })
        output.push('')
      })
      return output
    },
    projects: () => {
      const output = ['Projects:', '']
      projects.forEach(p => {
        output.push(`  ${p.title.padEnd(20)} - ${p.tagline}`)
      })
      return output
    },
    stack: () => [
      'Languages: C, C++, Python, JavaScript, TypeScript, Java',
      'Web: React, Next.js, FastAPI, Flask, Laravel, PHP',
      'Infrastructure: Linux, AWS, EC2, Ubuntu, Nginx, Docker',
      'Databases: PostgreSQL, MongoDB, Redis',
      'Tools: Neovim, Git, Postman',
    ],
    lab: () => [
      'Active Experiments:',
      '  [BUILDING]    Graphics Engine',
      '  [EXPERIMENT]  Game Engine',
      '  [ACTIVE]      RAG / Local AI',
      '  [ACTIVE]      Cybersecurity Lab',
      '  [ACTIVE]      Home Lab',
    ],
    buildlog: () => {
      const output = ['BUILD LOG', '']
      buildLog.forEach(entry => {
        output.push(`[${entry.date}]`)
        output.push(`├── ${entry.title}`)
        if (entry.project) {
          output.push(`│   └── ${entry.project}`)
        }
        output.push(`└── ${entry.status}`)
        output.push('')
      })
      return output
    },
    archive: () => {
      const output = ['ARCHIVE', '']
      archivedProjects.forEach(project => {
        output.push(`${project.title}`)
        output.push(`├── ${project.status} (${project.year})`)
        output.push(`└── ${project.description}`)
        output.push('')
      })
      return output
    },
    github: () => {
      const githubLink = socials.find(s => s.id === 'github')
      if (githubLink) {
        window.open(githubLink.url, '_blank')
        return `Opening ${githubLink.url}...`
      }
      return 'GitHub link not configured'
    },
    contact: () => {
      const output = ['Connect with me:', '']
      socials.filter(s => s.showInTerminal).forEach(social => {
        if (social.url !== '[To Be Updated]') {
          output.push(`  ${social.label}: ${social.username || social.url}`)
        }
      })
      return output
    },
    neofetch: () => [
      '         _____           ',
      '        /     \\          SUKANTH',
      '       | O   O |         ────────────────',
      '       |   ^   |         OS:       ARCH LINUX',
      '       |  \\_/  |         EDITOR:   NEOVIM',
      '        \\_____/          WM:       HYPRLAND',
      '                         SHELL:    ZSH',
      '                         ROLE:     SDE',
      '                         FOCUS:    BUILDING',
      '                         STATUS:   ONLINE',
    ],
    whoami: () => 'Sukanth - Developer / Builder / Experimenter',
    history: () => history.length > 0 ? history : ['No command history'],
    clear: () => {
      setLines([])
      return ''
    },
    sudo: () => 'Nice try. 😎',
    'rm -rf /': () => 'Permission denied. (Thankfully.)',
    echo: () => input.split(' ').slice(1).join(' ') || '',
    snake: () => {
      setShowSnake(true)
      return 'Loading Snake game...'
    },
    glitch: () => {
      window.dispatchEvent(new CustomEvent('toggleGlitch'))
      return 'Glitch mode toggled. Reality.exe has stopped responding...'
    },
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    // Ctrl+L - Clear
    if (e.ctrlKey && e.key === 'l') {
      e.preventDefault()
      commands.clear()
      return
    }

    // Ctrl+C - Cancel
    if (e.ctrlKey && e.key === 'c') {
      e.preventDefault()
      setInput('')
      setSuggestion('')
      return
    }

    // Tab - Autocomplete
    if (e.key === 'Tab') {
      e.preventDefault()
      if (suggestion) {
        setInput(suggestion)
        setSuggestion('')
      }
      return
    }

    // Arrow Up - Previous command
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length > 0 && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(history[history.length - 1 - newIndex])
      }
      return
    }

    // Arrow Down - Next command
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(history[history.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput('')
      }
      return
    }

    // Enter - Execute
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
      return
    }

    // Backspace
    if (e.key === 'Backspace') {
      e.preventDefault()
      setInput(prev => prev.slice(0, -1))
      return
    }

    // Regular character input
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault()
      setInput(prev => prev + e.key)
    }
  }

  const handleSubmit = () => {
    const trimmedInput = input.trim()
    if (!trimmedInput) return

    setLines(prev => [...prev, { type: 'input', content: trimmedInput }])
    setHistory(prev => [...prev, trimmedInput])
    setHistoryIndex(-1)

    const [cmd, ...args] = trimmedInput.toLowerCase().split(' ')
    const commandFn = commands[cmd] || commands[trimmedInput.toLowerCase()]

    if (commandFn) {
      const result = commandFn()
      if (result) {
        const outputs = Array.isArray(result) ? result : [result]
        setLines(prev => [
          ...prev,
          ...outputs.map(content => ({ type: 'output' as const, content })),
        ])
      }
    } else {
      setLines(prev => [
        ...prev,
        { type: 'error', content: `Command not found: ${trimmedInput}` },
      ])
    }

    setInput('')
    setSuggestion('')
  }

  const handleMinimize = () => {
    setWindowState('minimized')
    setShowPopup(false)
  }

  const handleMaximize = () => {
    setWindowState(windowState === 'maximized' ? 'open' : 'maximized')
  }

  const handleClose = () => {
    setWindowState('closed')
  }

  const handleRestore = () => {
    setWindowState('open')
    setShowPopup(false)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  // Minimized widget
  if (windowState === 'minimized' || windowState === 'closed') {
    return (
      <div className="fixed bottom-8 left-8 z-50">
        {showPopup && windowState === 'minimized' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-full left-0 mb-2 bg-void-light border border-lavender/40 rounded px-3 py-2 text-xs font-mono text-lavender whitespace-nowrap shadow-lg"
          >
            CHECK ME OUT →
            <div className="absolute bottom-[-6px] left-4 w-3 h-3 bg-void-light border-r border-b border-lavender/40 transform rotate-45" />
          </motion.div>
        )}
        
        <motion.button
          onClick={handleRestore}
          className="relative bg-void-light/90 backdrop-blur-md border-2 border-lavender/30 rounded-lg p-3 interactive group hover:border-lavender/60 transition-colors shadow-xl"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {/* Pixel avatar */}
          <div className="w-10 h-10 relative">
            <div className="absolute inset-0 flex items-center justify-center text-2xl">
              <motion.span
                animate={{ 
                  opacity: [1, 0.7, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                &gt;_
              </motion.span>
            </div>
          </div>
          
          {/* Status indicator */}
          <div className="absolute top-1 right-1 w-2 h-2 bg-lavender rounded-full animate-pulse" />
        </motion.button>
      </div>
    )
  }

  const isMaximized = windowState === 'maximized'

  // Render terminal content
  const terminalContent = (
    <div
      ref={terminalRef}
      className="flex-1 p-4 font-mono text-sm overflow-y-auto"
      onClick={() => inputRef.current?.focus()}
      style={{ minHeight: isMaximized ? 0 : '300px' }}
    >
      {lines.map((line, i) => (
        <div key={i} className="mb-1">
          {line.type === 'input' && (
            <div className="flex items-start gap-2">
              <span className="text-lavender">{terminalConfig.prompt}</span>
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
      <div className="flex items-start gap-2">
        <span className="text-lavender">{terminalConfig.prompt}</span>
        <div className="flex-1 relative">
          <div
            ref={inputRef}
            contentEditable
            suppressContentEditableWarning
            onKeyDown={handleKeyDown}
            className="outline-none text-text-light inline-block min-w-[1ch]"
            style={{ caretColor: 'transparent' }}
          >
            {input}
          </div>
          {cursorVisible && (
            <span className="inline-block w-2 h-4 bg-lavender ml-[1px] align-middle">
              {' '}
            </span>
          )}
          {suggestion && input && (
            <span className="text-gray-muted/40 absolute left-[${input.length}ch]">
              {suggestion.slice(input.length)}
            </span>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Snake Game Modal */}
      <AnimatePresence>
        {showSnake && <SnakeGame onClose={() => setShowSnake(false)} />}
      </AnimatePresence>

      {isMaximized ? (
        <TerminalFullscreen currentContext="SYSTEM">
          <div className="h-full flex flex-col">
            {/* Terminal header */}
            <div className="bg-void border-b border-gray-muted/30 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClose}
                  className="w-3 h-3 rounded-full bg-crimson/60 hover:bg-crimson transition-colors interactive relative group"
                >
                  <span className="absolute inset-0 flex items-center justify-center text-[8px] text-void opacity-0 group-hover:opacity-100">
                    ×
                  </span>
                </button>
                <button
                  onClick={handleMinimize}
                  className="w-3 h-3 rounded-full bg-purple-deep/60 hover:bg-purple-deep transition-colors interactive relative group"
                >
                  <span className="absolute inset-0 flex items-center justify-center text-[8px] text-void opacity-0 group-hover:opacity-100">
                    −
                  </span>
                </button>
                <button
                  onClick={handleMaximize}
                  className="w-3 h-3 rounded-full bg-lavender/60 hover:bg-lavender transition-colors interactive relative group"
                >
                  <span className="absolute inset-0 flex items-center justify-center text-[8px] text-void opacity-0 group-hover:opacity-100">
                    ↙
                  </span>
                </button>
                <span className="ml-4 text-xs font-mono text-gray-muted">
                  {terminalConfig.prompt}
                </span>
              </div>
            </div>
            {terminalContent}
          </div>
        </TerminalFullscreen>
      ) : (
        <motion.div
          className={`fixed z-50 ${
            isMaximized 
              ? 'inset-0 p-8 bg-black/90 backdrop-blur-md flex items-center justify-center'
              : 'bottom-24 left-8 right-8 md:left-auto md:right-auto md:w-[600px]'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          layout
        >
          <div className={`${isMaximized ? 'w-full max-w-5xl h-[80vh]' : 'w-full'} bg-void-light border border-gray-muted/30 rounded-lg shadow-2xl overflow-hidden flex flex-col`}>
            {/* Terminal header */}
            <div className="bg-void border-b border-gray-muted/30 px-4 py-2 flex items-center justify-between cursor-move">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClose}
                  className="w-3 h-3 rounded-full bg-crimson/60 hover:bg-crimson transition-colors interactive relative group"
                >
                  <span className="absolute inset-0 flex items-center justify-center text-[8px] text-void opacity-0 group-hover:opacity-100">
                    ×
                  </span>
                </button>
                <button
                  onClick={handleMinimize}
                  className="w-3 h-3 rounded-full bg-purple-deep/60 hover:bg-purple-deep transition-colors interactive relative group"
                >
                  <span className="absolute inset-0 flex items-center justify-center text-[8px] text-void opacity-0 group-hover:opacity-100">
                    −
                  </span>
                </button>
                <button
                  onClick={handleMaximize}
                  className="w-3 h-3 rounded-full bg-lavender/60 hover:bg-lavender transition-colors interactive relative group"
                >
                  <span className="absolute inset-0 flex items-center justify-center text-[8px] text-void opacity-0 group-hover:opacity-100">
                    ↗
                  </span>
                </button>
                <span className="ml-4 text-xs font-mono text-gray-muted">
                  {terminalConfig.prompt}
                </span>
              </div>
            </div>

            {terminalContent}
          </div>
        </motion.div>
      )}
    </>
  )
}
