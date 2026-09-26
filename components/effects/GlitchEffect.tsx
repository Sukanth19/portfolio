'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GlitchEffectProps {
  isActive: boolean
}

export function GlitchEffect({ isActive }: GlitchEffectProps) {
  const [glitchIntensity, setGlitchIntensity] = useState(0)

  useEffect(() => {
    if (!isActive) {
      setGlitchIntensity(0)
      return
    }

    const interval = setInterval(() => {
      setGlitchIntensity(Math.random())
    }, 100)

    return () => clearInterval(interval)
  }, [isActive])

  if (!isActive) return null

  return (
    <>
      {/* Scanlines */}
      <div 
        className="fixed inset-0 pointer-events-none z-[9997]"
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15) 1px, transparent 1px, transparent 2px)',
          animation: 'scanline 8s linear infinite',
        }}
      />

      {/* RGB Split Effect */}
      <AnimatePresence>
        {glitchIntensity > 0.7 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-[9996]"
            style={{
              mixBlendMode: 'screen',
              background: `
                radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, 
                rgba(255, 0, 0, 0.1) 0%, transparent 50%),
                radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, 
                rgba(0, 255, 0, 0.1) 0%, transparent 50%),
                radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, 
                rgba(0, 0, 255, 0.1) 0%, transparent 50%)
              `,
            }}
          />
        )}
      </AnimatePresence>

      {/* Random glitch bars */}
      <AnimatePresence>
        {glitchIntensity > 0.8 && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: Math.random() * window.innerHeight,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed left-0 right-0 pointer-events-none z-[9996] bg-lavender/20"
                style={{
                  height: Math.random() * 100 + 20,
                  top: Math.random() * window.innerHeight,
                  mixBlendMode: 'overlay',
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* VHS Tracking lines */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[9996]"
        animate={{
          backgroundPosition: ['0% 0%', '0% 100%'],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          background: 'linear-gradient(0deg, transparent 90%, rgba(184, 174, 216, 0.05) 100%)',
          backgroundSize: '100% 3px',
        }}
      />

      {/* Chromatic Aberration Filter */}
      <style jsx global>{`
        @keyframes scanline {
          0% { transform: translateY(0); }
          100% { transform: translateY(100vh); }
        }

        ${isActive ? `
          body {
            animation: glitch-shake 0.3s infinite;
          }

          @keyframes glitch-shake {
            0%, 100% { transform: translate(0, 0); }
            10% { transform: translate(-2px, -1px); }
            20% { transform: translate(2px, 1px); }
            30% { transform: translate(-1px, 2px); }
            40% { transform: translate(1px, -2px); }
            50% { transform: translate(-2px, 1px); }
            60% { transform: translate(2px, -1px); }
            70% { transform: translate(-1px, -2px); }
            80% { transform: translate(1px, 2px); }
            90% { transform: translate(-2px, -1px); }
          }

          * {
            text-shadow: 
              2px 0 rgba(255, 0, 0, 0.5),
              -2px 0 rgba(0, 255, 255, 0.5);
          }
        ` : ''}
      `}</style>
    </>
  )
}
