'use client'

import { motion, useMotionValue } from 'framer-motion'
import { useInteractionSettings } from '@/hooks/useInteractionSettings'
import { useState, useEffect, useRef } from 'react'

interface TrailPoint {
  x: number
  y: number
  time: number
}

const TRAIL_LIFETIME = 160 // ms a trail point stays visible
const TRAIL_WIDTH = 4

function isInteractive(target: HTMLElement) {
  return Boolean(
    target.closest('a, button, [role="button"], .interactive')
  )
}

export function CursorSystem() {
  const { settings } = useInteractionSettings()
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  // Position lives in motion values so moving the mouse never re-renders React
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trail = useRef<TrailPoint[]>([])
  const frame = useRef<number>()
  const trailEnabled = useRef(settings.cursorTrail)
  trailEnabled.current = settings.cursorTrail

  // Only take over the cursor on devices with a precise pointer (not touch screens)
  useEffect(() => {
    setEnabled(window.matchMedia('(pointer: fine)').matches)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    const resize = () => {
      if (!canvas || !ctx) return
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      frame.current = undefined
      if (!canvas || !ctx) return

      const now = performance.now()
      trail.current = trail.current.filter(p => now - p.time < TRAIL_LIFETIME)
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      const points = trail.current
      if (points.length > 1) {
        ctx.lineCap = 'round'
        ctx.shadowColor = 'rgba(184, 174, 216, 0.8)'
        ctx.shadowBlur = 8
        // Newest point first: segments taper and fade towards the tail
        for (let i = 0; i < points.length - 1; i++) {
          const life = 1 - (now - points[i].time) / TRAIL_LIFETIME
          const progress = i / (points.length - 1)
          ctx.strokeStyle = `rgba(184, 174, 216, ${0.8 * life * (1 - progress)})`
          ctx.lineWidth = TRAIL_WIDTH * life * (1 - progress) + 0.5
          ctx.beginPath()
          ctx.moveTo(points[i].x, points[i].y)
          ctx.lineTo(points[i + 1].x, points[i + 1].y)
          ctx.stroke()
        }
      }

      // Keep animating only while there is a trail to fade out
      if (points.length > 0) frame.current = requestAnimationFrame(draw)
    }

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)

      if (trailEnabled.current) {
        trail.current.unshift({ x: e.clientX, y: e.clientY, time: performance.now() })
        if (!frame.current) frame.current = requestAnimationFrame(draw)
      }
    }

    const handleOver = (e: MouseEvent) => {
      setIsHovering(isInteractive(e.target as HTMLElement))
    }

    const handleLeave = () => setVisible(false)

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMove, { passive: true })
    document.addEventListener('mouseover', handleOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', handleLeave)

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseover', handleOver)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <>
      {/* Shooting star trail */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[9998]"
      />

      {/* Main cursor dot - the "head" of the shooting star */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="relative"
          animate={{ scale: isHovering ? 1.8 : 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
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
