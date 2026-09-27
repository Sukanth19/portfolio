'use client'

import { motion } from 'framer-motion'

export function SystemTelemetry() {
  const systemInfo = [
    { label: 'OS', value: 'ARCH LINUX' },
    { label: 'EDITOR', value: 'NEOVIM' },
    { label: 'WM', value: 'HYPRLAND' },
    { label: 'STATUS', value: 'ONLINE', highlight: true }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="border border-gray-muted/20 bg-void-light/20 p-4 font-mono"
    >
      <div className="text-xs text-crimson mb-3 flex items-center gap-2">
        <span>SYSTEM</span>
        <div className="flex-1 h-px bg-gradient-to-r from-crimson/40 to-transparent" />
      </div>
      
      <div className="space-y-2">
        {systemInfo.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
            className="flex items-center justify-between text-xs"
          >
            <span className="text-gray-muted">{item.label}</span>
            <span className={`${item.highlight ? 'text-lavender' : 'text-text-light'}`}>
              {item.value}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Subtle status indicator */}
      <motion.div
        className="mt-3 pt-3 border-t border-gray-muted/10 flex items-center gap-2 text-xs text-gray-muted/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-lavender"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span>ALL SYSTEMS OPERATIONAL</span>
      </motion.div>
    </motion.div>
  )
}
