'use client'

import { motion } from 'framer-motion'

export function SystemSection() {
  const systemInfo = [
    { 
      label: 'OS', 
      value: 'ARCH LINUX',
      link: 'https://archlinux.org/',
      description: 'Lightweight, flexible Linux distribution'
    },
    { 
      label: 'EDITOR', 
      value: 'NEOVIM',
      link: 'https://neovim.io/',
      description: 'Hyperextensible Vim-based text editor'
    },
    { 
      label: 'WM', 
      value: 'HYPRLAND',
      link: 'https://hyprland.org/',
      description: 'Dynamic tiling Wayland compositor'
    },
    { 
      label: 'STATUS', 
      value: 'ONLINE', 
      highlight: true,
      description: 'All systems operational'
    }
  ]

  return (
    <section id="system" className="py-24 px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-3xl font-bold text-text-light font-mono">SYSTEM</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-crimson/40 to-transparent" />
          </div>
          <p className="text-sm font-mono text-gray-muted">
            Development environment • tools • configuration
          </p>
        </motion.div>

        {/* System Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemInfo.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {item.link ? (
                <motion.a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-gray-muted/20 bg-void-light/30 p-6 h-full group cursor-pointer"
                  whileHover={{ 
                    borderColor: 'rgba(184, 174, 216, 0.4)',
                    y: -4
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-xs font-mono text-gray-muted mb-2 group-hover:text-crimson transition-colors">
                    {item.label}
                  </div>
                  <div className="text-lg font-mono text-text-light mb-3 group-hover:text-lavender transition-colors">
                    {item.value}
                  </div>
                  <div className="text-xs font-mono text-gray-muted/60 group-hover:text-gray-muted transition-colors">
                    {item.description}
                  </div>
                  <motion.div
                    className="mt-3 text-xs font-mono text-lavender/40 flex items-center gap-1 group-hover:text-lavender transition-colors"
                    whileHover={{ x: 2 }}
                  >
                    <span>VIEW</span>
                    <span>↗</span>
                  </motion.div>
                </motion.a>
              ) : (
                <div className="border border-gray-muted/20 bg-void-light/30 p-6 h-full group">
                  <div className="text-xs font-mono text-gray-muted mb-2">
                    {item.label}
                  </div>
                  <div className={`text-lg font-mono mb-3 ${item.highlight ? 'text-lavender' : 'text-text-light'}`}>
                    {item.value}
                  </div>
                  <div className="text-xs font-mono text-gray-muted/60">
                    {item.description}
                  </div>
                  {item.highlight && (
                    <div className="mt-3 flex items-center gap-2">
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-lavender"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-xs font-mono text-gray-muted/60">ACTIVE</span>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 border border-gray-muted/20 bg-void-light/20 p-6"
        >
          <div className="text-xs font-mono text-crimson mb-3">ENVIRONMENT DETAILS</div>
          <div className="grid md:grid-cols-3 gap-6 text-xs font-mono">
            <div>
              <div className="text-gray-muted mb-1">SHELL</div>
              <div className="text-text-light">ZSH</div>
            </div>
            <div>
              <div className="text-gray-muted mb-1">TERMINAL</div>
              <div className="text-text-light">KITTY</div>
            </div>
            <div>
              <div className="text-gray-muted mb-1">WORKFLOW</div>
              <div className="text-text-light">CLI-FIRST</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
