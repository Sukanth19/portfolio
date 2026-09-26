'use client'

import { motion } from 'framer-motion'
import { useCursor } from '@/hooks/useCursor'
import { useInteractionSettings } from '@/hooks/useInteractionSettings'
import { useState, useEffect, useRef } from 'react'

interface TrailPoint {
  x: number
  y: number
  timestamp: number
}

export function CursorSystem() {
  const cursor = useCursor()
  const { settings } = useInteractionSettings()
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const lastPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!settings.cursorTrail) {
      setTrail([])
      return
    }

    const now = Date.now()
    const moved = cursor.x !== lastPos.current.x || cursor.y !== lastPos.current.y

    if (moved) {
      lastPos.current = { x: cursor.x, y: cursor.y }
      
      setTrail(prev => {
        const newTrail = [
          { x: cursor.x, y: cursor.y, timestamp: now },
          ...prev.slice(0, 10)
        ]
        return newTrail
      })
    }

    const clearOld = () => {
      setTrail(prev => prev.filter(p => now - p.timestamp < 180))
    }
    const timeout = setTimeout(clearOld, 50)

    return () => clearTimeout(timeout)
  }, [cursor.x, cursor.y, settings.cursorTrail])

  useEffect(() => {
    const idleTimer = setTimeout(() => {
      setTrail([])
    }, 120)
    return () => clearTimeout(idleTimer)
  }, [trail])

  return (
    <>
      {/* Shooting star trail - tapered streak */}
      {settings.cursorTrail && trail.length > 1 && (
        <svg
          className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9998]"
        >
          <defs>
            {/* Gradient that fades out */}
            <linearGradient id="fadeGradient" gradientUnits="userSpaceOnUse"
              x1={trail[0].x} y1={trail[0].y}
              x2={trail[trail.length - 1].x} y2={trail[trail.length - 1].y}>
              <stop offset="0%" stopColor="rgba(184, 174, 216, 0.9)" />
              <stop offset="50%" stopColor="rgba(184, 174, 216, 0.4)" />
              <stop offset="100%" stopColor="rgba(184, 174, 216, 0)" />
            </linearGradient>
          </defs>
          
          {/* Draw tapered line that gets thinner */}
          {trail.slice(0, -1).map((point, i) => {
            const nextPoint = trail[i + 1]
            const progress = i / (trail.length - 1)
            const width = 4 * (1 - progress) // Gets thinner towards the tail
            const opacity = 1 - progress // Fades out
            
            return (
              <motion.line
                key={`${point.timestamp}-${i}`}
                x1={point.x}
                y1={point.y}
                x2={nextPoint.x}
                y2={nextPoint.y}
                stroke={`rgba(184, 174, 216, ${opacity * 0.8})`}
                strokeWidth={width}
                strokeLinecap="round"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              />
            )
          })}
          
          {/* Glow layer */}
          {trail.slice(0, -1).map((point, i) => {
            const nextPoint = trail[i + 1]
            const progress = i / (trail.length - 1)
            const width = 6 * (1 - progress)
            const opacity = (1 - progress) * 0.4
            
            return (
              <motion.line
                key={`glow-${point.timestamp}-${i}`}
                x1={point.x}
                y1={point.y}
                x2={nextPoint.x}
                y2={nextPoint.y}
                stroke={`rgba(184, 174, 216, ${opacity})`}
                strokeWidth={width}
                strokeLinecap="round"
                style={{ filter: 'blur(2px)' }}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
              />
            )
          })}
        </svg>
      )}

      {/* Main cursor dot - the "head" of the shooting star */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          x: cursor.x - 6,
          y: cursor.y - 6,
        }}
      >
        <motion.div
          animate={{
            scale: cursor.isHovering ? 1.4 : 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 2000,
            damping: 40,
            mass: 0.1,
          }}
        >
          {/* Bright core */}
          <div className="w-3 h-3 bg-lavender rounded-full shadow-[0_0_12px_rgba(184,174,216,1)]" />
          {/* Outer glow */}
          <div className="absolute inset-0 w-3 h-3 bg-lavender/40 rounded-full blur-sm" />
        </motion.div>
      </motion.div>
    </>
  )
}
