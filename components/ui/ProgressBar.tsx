'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface ProgressBarProps {
  label: string
  value: number
  maxValue?: number
  color?: 'lavender' | 'crimson' | 'purple'
  showValue?: boolean
  animate?: boolean
}

export function ProgressBar({ 
  label, 
  value, 
  maxValue = 100,
  color = 'lavender',
  showValue = true,
  animate = true
}: ProgressBarProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const percentage = (value / maxValue) * 100

  const colorMap = {
    lavender: '#B8AED8',
    crimson: '#9B1B30',
    purple: '#5C4A66',
  }

  useEffect(() => {
    if (!animate) {
      setDisplayValue(value)
      return
    }

    let current = 0
    const increment = value / 50
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, 20)

    return () => clearInterval(timer)
  }, [value, animate])

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm font-mono">
        <span className="text-gray-muted">{label}</span>
        {showValue && (
          <span className="text-text-light">
            {displayValue}{maxValue !== 100 && `/${maxValue}`}
          </span>
        )}
      </div>
      <div className="h-2 bg-void-light border border-gray-muted/20 relative overflow-hidden">
        <motion.div
          className="h-full relative"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ backgroundColor: colorMap[color] }}
        >
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}
