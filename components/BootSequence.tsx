'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface BootSequenceProps {
  onComplete: () => void
}

const bootMessages = [
  'INITIALIZING SYSTEM...',
  'LOADING CORE MODULES...',
  'MOUNTING FILE SYSTEMS...',
  'STARTING SERVICES...',
  'ESTABLISHING CONNECTIONS...',
  'SYSTEM READY',
]

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [messageIndex, setMessageIndex] = useState(0)
  const [skipped, setSkipped] = useState(false)

  useEffect(() => {
    if (skipped) return

    const timer = setTimeout(() => {
      if (messageIndex < bootMessages.length - 1) {
        setMessageIndex(messageIndex + 1)
      } else {
        setTimeout(onComplete, 800)
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [messageIndex, onComplete, skipped])

  const handleSkip = () => {
    setSkipped(true)
    onComplete()
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-void flex flex-col items-center justify-center font-mono"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-2xl w-full px-8">
          <div className="space-y-4">
            {bootMessages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: index <= messageIndex ? 1 : 0 }}
                className={`text-sm ${
                  index === messageIndex
                    ? 'text-lavender'
                    : index < messageIndex
                    ? 'text-gray-muted'
                    : 'text-transparent'
                }`}
              >
                <span className="text-crimson mr-2">{'>'}</span>
                {message}
                {index === messageIndex && (
                  <span className="inline-block w-2 h-4 bg-lavender ml-1 animate-blink" />
                )}
              </motion.div>
            ))}
          </div>

          <motion.button
            onClick={handleSkip}
            className="mt-12 text-xs text-gray-muted hover:text-text-light transition-colors border border-gray-muted/20 px-4 py-2 rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            SKIP BOOT [ESC]
          </motion.button>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-8 right-8 text-xs font-mono text-gray-muted/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          SYSTEM v1.0.0
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-8 text-xs font-mono text-gray-muted/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          KERNEL 6.x | ARCH x86_64
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
