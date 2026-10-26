'use client'

import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef } from 'react'
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
  const glowRefs = useRef<(HTMLDivElement | null)[]>([])

  // Memoize elements generation
  const elements = useMemo(() => {
    return settings.motionEffects ? generateElements(20) : []
  }, [settings.motionEffects])

  // Brighten elements near the cursor by writing styles directly, so the
  // floating animations below never restart or re-render on mouse move
  useEffect(() => {
    if (elements.length === 0) return

    let rafId = 0
    let mouseX = -1000
    let mouseY = -1000

    const update = () => {
      rafId = 0
      elements.forEach((el, i) => {
        const node = glowRefs.current[i]
        if (!node) return
        const dx = mouseX - (window.innerWidth * el.x) / 100
        const dy = mouseY - (window.innerHeight * el.y) / 100
        const proximity = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 300)
        node.style.opacity = String(0.5 + proximity * 0.5)
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!rafId) rafId = requestAnimationFrame(update)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [elements])

  if (!settings.motionEffects || elements.length === 0) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[5]">
      {elements.map((el, index) => (
        <div
          key={el.id}
          ref={node => { glowRefs.current[index] = node }}
          className="absolute transition-opacity duration-500 ease-out"
          style={{ left: `${el.x}%`, top: `${el.y}%`, opacity: 0.5 }}
        >
          <motion.div
            className={`font-mono will-change-transform ${
              el.size === 'sm' ? 'text-[8px]' : 'text-[10px]'
            } ${
              el.type === 'creature' ? 'text-lavender/20' : 'text-gray-muted/10'
            }`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
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
        </div>
      ))}

      {/* Additional scanlines */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-lavender/5 to-transparent" />
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-crimson/5 to-transparent" />
      <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-lavender/5 to-transparent" />
    </div>
  )
}
