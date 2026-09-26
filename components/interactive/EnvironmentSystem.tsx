'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useMemo, useCallback } from 'react'
import { useInteractionSettings } from '@/hooks/useInteractionSettings'

interface EnvElement {
  id: string
  type: 'pixel' | 'label' | 'coordinate' | 'graph' | 'glyph' | 'creature' | 'line' | 'timestamp'
  x: number
  y: number
  content: string
  size: 'sm' | 'md'
}

const glyphs = ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', '◆', '◇', '□', '■', '▲', '△', '▼', '▽']
const labels = ['SYS', 'NET', 'CPU', 'MEM', 'I/O', 'API', 'LOG', 'DB', 'GPU', 'PROC', 'LOAD', 'STAT']
const creatures = ['>^.^<', '=^_^=', '(・_・)', '(^_^)', '(o_o)', '(>_<)']

function generateElements(count: number): EnvElement[] {
  const types: EnvElement['type'][] = ['pixel', 'label', 'coordinate', 'glyph', 'creature', 'line', 'timestamp']
  
  return Array.from({ length: count }, (_, i) => {
    const type = types[Math.floor(Math.random() * types.length)]
    let content = ''
    
    switch (type) {
      case 'glyph':
        content = glyphs[Math.floor(Math.random() * glyphs.length)]
        break
      case 'label':
        content = labels[Math.floor(Math.random() * labels.length)]
        break
      case 'creature':
        content = creatures[Math.floor(Math.random() * creatures.length)]
        break
      case 'coordinate':
        content = `[${Math.floor(Math.random() * 999)},${Math.floor(Math.random() * 999)}]`
        break
      case 'line':
        content = '─'.repeat(Math.floor(Math.random() * 5) + 3)
        break
      case 'timestamp':
        content = new Date().toLocaleTimeString('en-US', { hour12: false }).slice(0, 5)
        break
      default:
        content = '█'
    }
    
    return {
      id: `env-${i}`,
      type,
      x: Math.random() * 100,
      y: Math.random() * 100,
      content,
      size: Math.random() > 0.7 ? 'md' : 'sm',
    }
  })
}

export function EnvironmentSystem() {
  const { settings } = useInteractionSettings()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  
  // Memoize elements generation
  const elements = useMemo(() => {
    return settings.motionEffects ? generateElements(20) : []
  }, [settings.motionEffects])

  // Throttle mouse movement tracking for better performance
  useEffect(() => {
    if (!settings.motionEffects) return

    let rafId: number
    let lastUpdate = 0
    const throttleMs = 50 // Update every 50ms max

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastUpdate < throttleMs) return
      
      lastUpdate = now
      
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY })
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [settings.motionEffects])

  if (!settings.motionEffects || elements.length === 0) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[5]">
      {elements.map((el, index) => {
        const distanceToMouse = Math.sqrt(
          Math.pow(mousePos.x - (window.innerWidth * el.x / 100), 2) +
          Math.pow(mousePos.y - (window.innerHeight * el.y / 100), 2)
        )
        const proximity = Math.max(0, 1 - distanceToMouse / 300)

        return (
          <motion.div
            key={el.id}
            className={`absolute font-mono ${
              el.size === 'sm' ? 'text-[8px]' : 'text-[10px]'
            } ${
              el.type === 'creature' ? 'text-lavender/20' : 'text-gray-muted/10'
            }`}
            initial={{ 
              left: `${el.x}%`, 
              top: `${el.y}%`,
              opacity: 0 
            }}
            animate={{ 
              opacity: [0.05 + proximity * 0.1, 0.15 + proximity * 0.15, 0.05 + proximity * 0.1],
              y: el.type === 'creature' ? [0, -30, 0] : [0, -20, 0],
              x: el.type === 'creature' ? [0, 10, 0] : 0,
            }}
            transition={{
              duration: el.type === 'creature' ? 10 + index * 0.5 : 8 + index * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.3,
            }}
          >
            {el.content}
          </motion.div>
        )
      })}

      {/* Additional scanlines */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-lavender/5 to-transparent" />
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-crimson/5 to-transparent" />
      <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-lavender/5 to-transparent" />
    </div>
  )
}
