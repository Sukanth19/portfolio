'use client'

import { useEffect, useRef, useState } from 'react'

export function GridOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
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

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const gridSize = 50
      const offsetY = scrollY % gridSize

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.strokeStyle = 'rgba(92, 74, 102, 0.1)'
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Horizontal lines with scroll effect
      for (let y = -offsetY; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.strokeStyle = 'rgba(92, 74, 102, 0.1)'
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Scanning line
      const scanY = (scrollY * 0.5) % canvas.height
      const gradient = ctx.createLinearGradient(0, scanY - 50, 0, scanY + 50)
      gradient.addColorStop(0, 'rgba(184, 174, 216, 0)')
      gradient.addColorStop(0.5, 'rgba(184, 174, 216, 0.2)')
      gradient.addColorStop(1, 'rgba(184, 174, 216, 0)')

      ctx.fillStyle = gradient
      ctx.fillRect(0, scanY - 50, canvas.width, 100)

      // Corner brackets
      const cornerSize = 30
      const corners = [
        { x: 20, y: 20 },
        { x: canvas.width - 20, y: 20 },
        { x: 20, y: canvas.height - 20 },
        { x: canvas.width - 20, y: canvas.height - 20 },
      ]

      ctx.strokeStyle = 'rgba(155, 27, 48, 0.6)'
      ctx.lineWidth = 2

      corners.forEach((corner, i) => {
        const isLeft = i % 2 === 0
        const isTop = i < 2

        ctx.beginPath()
        if (isLeft) {
          ctx.moveTo(corner.x + cornerSize, corner.y)
          ctx.lineTo(corner.x, corner.y)
          ctx.lineTo(corner.x, corner.y + (isTop ? cornerSize : -cornerSize))
        } else {
          ctx.moveTo(corner.x - cornerSize, corner.y)
          ctx.lineTo(corner.x, corner.y)
          ctx.lineTo(corner.x, corner.y + (isTop ? cornerSize : -cornerSize))
        }
        ctx.stroke()
      })
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [scrollY])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
    />
  )
}
