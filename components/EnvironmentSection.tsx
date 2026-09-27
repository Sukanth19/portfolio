'use client'

import { motion } from 'framer-motion'
import { SystemTimestamp } from './ui/SystemTimestamp'
import { SystemCoordinates } from './ui/SystemCoordinates'

export function EnvironmentSection() {
  const systemInfo = [
    { label: 'OS', value: 'ARCH LINUX', description: 'Rolling release distribution' },
    { label: 'EDITOR', value: 'NEOVIM', description: 'Hyperextensible Vim-based text editor' },
    { label: 'WM', value: 'HYPRLAND', description: 'Dynamic tiling Wayland compositor' },
    { label: 'SHELL', value: 'ZSH', description: 'Z shell with custom configuration' },
    { label: 'TERMINAL', value: 'KITTY', description: 'GPU-based terminal emulator' },
    { label: 'STATUS', value: 'ONLINE', description: 'All systems operational', highlight: true },
  ]

  return (
    <section id="environment" className="py-24 px-8 bg-void-light/20">
      <div className="max-w-5xl mx-auto">
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
                08
              </motion.h2>
            </div>
            <div className="flex items-center gap-4">
              <SystemCoordinates x={892} y={421} />
              <SystemTimestamp />
            </div>
          </div>
          <h2 className="text-5xl font-bold text-text-light mb-4">
            ENVIRONMENT
          </h2>
          <p className="text-sm font-mono text-gray-muted">
            Development setup • system configuration
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {systemInfo.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-muted/20 bg-void-light/30 p-6 group cursor-pointer"
              whileHover={{ 
                borderColor: 'rgba(184, 174, 216, 0.3)',
                y: -4,
                backgroundColor: 'rgba(18, 18, 22, 0.5)'
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="text-xs font-mono text-crimson group-hover:text-lavender transition-colors">
                  {item.label}
                </div>
                {item.highlight && (
                  <motion.div
                    className="w-2 h-2 rounded-full bg-lavender"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </div>
              <div className="text-lg font-mono text-text-light mb-2 group-hover:text-lavender transition-colors">
                {item.value}
              </div>
              <div className="text-xs font-mono text-gray-muted/60">
                {item.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* System Status Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 border border-gray-muted/20 bg-void-light/20 p-4 font-mono text-xs"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                className="w-2 h-2 rounded-full bg-lavender"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-gray-muted">ALL SYSTEMS OPERATIONAL</span>
            </div>
            <div className="text-gray-muted/60">
              LAST UPDATED: {new Date().toISOString().split('T')[0]}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
