'use client'

import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import { buildLog } from '@/data/buildLog'

interface TerminalFullscreenProps {
  children: React.ReactNode
  currentContext?: string
}

export function TerminalFullscreen({ children, currentContext = 'SYSTEM' }: TerminalFullscreenProps) {
  const projectsList = projects.map((p, i) => ({
    num: String(i + 1).padStart(2, '0'),
    name: p.title.toUpperCase()
  }))

  return (
    <div className="fixed inset-0 bg-void z-50 flex">
      {/* Left Panel - System Info */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:block w-64 border-r border-gray-muted/20 bg-void-light/30 p-6 overflow-y-auto"
      >
        {/* System Section */}
        <div className="mb-8">
          <div className="text-xs font-mono text-crimson mb-3 flex items-center gap-2">
            <span>SYSTEM</span>
            <div className="flex-1 h-px bg-crimson/20" />
          </div>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-gray-muted">OS</span>
              <span className="text-text-light">ARCH LINUX</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-muted">EDITOR</span>
              <span className="text-text-light">NEOVIM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-muted">WM</span>
              <span className="text-text-light">HYPRLAND</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-muted">STATUS</span>
              <span className="text-lavender">ONLINE</span>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div>
          <div className="text-xs font-mono text-crimson mb-3 flex items-center gap-2">
            <span>PROJECTS</span>
            <div className="flex-1 h-px bg-crimson/20" />
          </div>
          <div className="space-y-1 text-xs font-mono">
            {projectsList.map(project => (
              <div key={project.num} className="text-gray-muted hover:text-lavender transition-colors cursor-pointer">
                <span className="text-crimson">{project.num}</span>
                <span className="ml-2">{project.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scanline effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, rgba(184, 174, 216, 0.03) 0px, transparent 1px, transparent 2px, rgba(184, 174, 216, 0.03) 3px)'
          }}
        />
      </motion.div>

      {/* Center Panel - Terminal Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex-1 relative"
      >
        {children}
      </motion.div>

      {/* Right Panel - Session Info */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:block w-64 border-l border-gray-muted/20 bg-void-light/30 p-6 overflow-y-auto"
      >
        {/* Session Section */}
        <div className="mb-8">
          <div className="text-xs font-mono text-crimson mb-3 flex items-center gap-2">
            <span>SESSION</span>
            <div className="flex-1 h-px bg-crimson/20" />
          </div>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-gray-muted">USER</span>
              <span className="text-text-light">SUKANTH</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-muted">SHELL</span>
              <span className="text-text-light">PORTFOLIO</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-muted">EDITOR</span>
              <span className="text-text-light">NEOVIM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-muted">OS</span>
              <span className="text-text-light">ARCH LINUX</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-muted">WM</span>
              <span className="text-text-light">HYPRLAND</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-muted">STATUS</span>
              <span className="text-lavender">ONLINE</span>
            </div>
          </div>
        </div>

        {/* Current Context */}
        <div>
          <div className="text-xs font-mono text-crimson mb-3 flex items-center gap-2">
            <span>CURRENT CONTEXT</span>
            <div className="flex-1 h-px bg-crimson/20" />
          </div>
          <div className="text-xs font-mono">
            <div className="text-gray-muted mb-1">MODE</div>
            <div className="text-lavender">{currentContext}</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <div className="text-xs font-mono text-crimson mb-3 flex items-center gap-2">
            <span>RECENT</span>
            <div className="flex-1 h-px bg-crimson/20" />
          </div>
          <div className="space-y-2 text-xs font-mono text-gray-muted">
            {buildLog.slice(0, 3).map(entry => (
              <div key={entry.id} className="border-l-2 border-lavender/20 pl-2 py-1">
                <div className="text-[10px] text-gray-muted/60">{entry.date}</div>
                <div className="text-xs">{entry.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scanline effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, rgba(184, 174, 216, 0.03) 0px, transparent 1px, transparent 2px, rgba(184, 174, 216, 0.03) 3px)'
          }}
        />
      </motion.div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(184, 174, 216, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(184, 174, 216, 0.3) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />
    </div>
  )
}
