'use client'

import { motion } from 'framer-motion'

interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'busy' | 'away'
  label?: string
  size?: 'sm' | 'md' | 'lg'
}

export function StatusIndicator({ status, label, size = 'md' }: StatusIndicatorProps) {
  const colors = {
    online: '#B8AED8',
    offline: '#8B8B9A',
    busy: '#9B1B30',
    away: '#5C4A66',
  }

  const sizes = {
    sm: 6,
    md: 8,
    lg: 12,
  }

  return (
    <div className="flex items-center gap-2">
      <motion.div
        className="rounded-full"
        style={{
          width: sizes[size],
          height: sizes[size],
          backgroundColor: colors[status],
        }}
        animate={{
          opacity: status === 'online' ? [1, 0.5, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: status === 'online' ? Infinity : 0,
        }}
      />
      {label && (
        <span className="text-xs font-mono text-gray-muted uppercase">
          {label}
        </span>
      )}
    </div>
  )
}
