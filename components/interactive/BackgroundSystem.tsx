'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'
import { useInteractionSettings } from '@/hooks/useInteractionSettings'

export function BackgroundSystem() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const { getCursorConfig, settings } = useInteractionSettings()
  const config = getCursorConfig()

  const springX = useSpring(mouseX, { 
    stiffness: config.stiffness * 0.3, 
    damping: config.damping * 0.6 
  })
  const springY = useSpring(mouseY, { 
    stiffness: config.stiffness * 0.3, 
    damping: config.damping * 0.6 
  })

  useEffect(() => {
    let rafId: number

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId)
      
      rafId = requestAnimationFrame(() => {
        mouseX.set(e.clientX)
        mouseY.set(e.clientY)
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [mouseX, mouseY])

  if (!settings.motionEffects && !settings.parallax) {
    return <div className="fixed inset-0 pointer-events-none overflow-hidden" />
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Technical grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #B8AED8 1px, transparent 1px),
            linear-gradient(to bottom, #B8AED8 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Radial light following cursor */}
      {settings.parallax && (
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, #B8AED8 0%, transparent 70%)',
            x: springX,
            y: springY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      )}

      {/* Scanline effect */}
      {settings.motionEffects && (
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-lavender/10 to-transparent animate-scan"
          />
        </div>
      )}

      {/* Noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
