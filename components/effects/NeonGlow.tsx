'use client'

import { ReactNode } from 'react'

interface NeonGlowProps {
  children: ReactNode
  color?: 'lavender' | 'crimson' | 'purple'
  intensity?: 'low' | 'medium' | 'high'
  className?: string
}

export function NeonGlow({ 
  children, 
  color = 'lavender', 
  intensity = 'medium',
  className = '' 
}: NeonGlowProps) {
  const colorMap = {
    lavender: 'rgba(184, 174, 216, ',
    crimson: 'rgba(155, 27, 48, ',
    purple: 'rgba(92, 74, 102, ',
  }

  const intensityMap = {
    low: '0.3',
    medium: '0.6',
    high: '0.9',
  }

  const glowColor = colorMap[color]
  const glowIntensity = intensityMap[intensity]

  return (
    <div 
      className={`relative ${className}`}
      style={{
        filter: `drop-shadow(0 0 8px ${glowColor}${glowIntensity})) drop-shadow(0 0 16px ${glowColor}${parseFloat(glowIntensity) * 0.5}))`,
      }}
    >
      {children}
    </div>
  )
}
