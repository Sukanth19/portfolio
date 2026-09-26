'use client'

import { useEffect, useRef } from 'react'

interface Drop {
  x: number
  y: number
  speed: number
  length: number
}

export function MatrixRain({ enabled = false }: { enabled?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dropsRef = useRef<Drop[]>([])
  const frameRef = useRef<number>()

  useEffect(() => {
    if (!enabled) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)

    // Initialize drops
    dropsRef.current = Array.from({ length: columns }, (_, i) => ({
      x: i * fontSize,
      y: Math.random() * -canvas.height,
      speed: Math.random() * 3 + 2,
      length: Math.floor(Math.random() * 20 + 10),
    }))

    const animate = () => {
      if (!ctx || !canvas) return

      // Fade effect
      ctx.fillStyle = 'rgba(10, 10, 13, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      dropsRef.current.forEach(drop => {
        // Draw characters in the drop
        for (let i = 0; i < drop.length; i++) {
          const char = chars[Math.floor(Math.random() * chars.length)]
          const y = drop.y + (i * fontSize)
          
          if (y > 0 && y < canvas.height) {
            const opacity = 1 - (i / drop.length)
            ctx.fillStyle = `rgba(184, 174, 216, ${opacity})`
            ctx.font = `${fontSize}px monospace`
            ctx.fillText(char, drop.x, y)
          }
        }

        // Update position
        drop.y += drop.speed

        // Reset when off screen
        if (drop.y - (drop.length * fontSize) > canvas.height) {
          drop.y = Math.random() * -200
          drop.speed = Math.random() * 3 + 2
        }
      })

      frameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.3 }}
    />
  )
}
