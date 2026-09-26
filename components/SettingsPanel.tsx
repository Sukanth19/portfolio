'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useInteractionSettings, CursorSensitivity } from '@/hooks/useInteractionSettings'

export function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const { settings, updateSettings, prefersReducedMotion } = useInteractionSettings()

  return (
    <>
      {/* Settings trigger button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-40 bg-void-light/80 backdrop-blur-md border border-gray-muted/20 rounded-full p-3 interactive"
        whileHover={{ scale: 1.05, borderColor: 'rgba(184, 174, 216, 0.4)' }}
        whileTap={{ scale: 0.95 }}
        title="Interaction Settings"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="text-lavender"
        >
          <path
            d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M10 2.5v2M10 15.5v2M17.5 10h-2M4.5 10h-2M15.303 4.697l-1.414 1.414M6.111 13.89l-1.414 1.414M15.303 15.303l-1.414-1.414M6.111 6.111L4.697 4.697"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </motion.button>

      {/* Settings panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed bottom-24 right-8 z-40 bg-void-light border border-gray-muted/30 rounded-lg shadow-2xl p-6 w-80"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-sm font-mono text-lavender mb-4">
                INTERACTION SETTINGS
              </h3>

              {prefersReducedMotion && (
                <div className="mb-4 p-2 border border-crimson/30 bg-crimson/10 text-xs font-mono text-crimson">
                  Reduced motion detected
                </div>
              )}

              {/* Cursor Sensitivity */}
              <div className="mb-6">
                <label className="text-xs font-mono text-gray-muted mb-2 block">
                  CURSOR SENSITIVITY
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['precise', 'balanced', 'fast'] as CursorSensitivity[]).map((level) => (
                    <button
                      key={level}
                      onClick={() => updateSettings({ cursorSensitivity: level })}
                      className={`px-3 py-2 text-xs font-mono border transition-all interactive ${
                        settings.cursorSensitivity === level
                          ? 'border-lavender text-lavender bg-purple-deep/20'
                          : 'border-gray-muted/30 text-gray-muted hover:border-lavender/50'
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggle Options */}
              <div className="space-y-3">
                <label className="flex items-center justify-between interactive">
                  <span className="text-xs font-mono text-gray-muted">
                    Motion Effects
                  </span>
                  <button
                    onClick={() =>
                      updateSettings({ motionEffects: !settings.motionEffects })
                    }
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.motionEffects && !prefersReducedMotion
                        ? 'bg-lavender'
                        : 'bg-gray-muted/30'
                    }`}
                    disabled={prefersReducedMotion}
                  >
                    <motion.div
                      className="absolute top-1 w-4 h-4 bg-void rounded-full"
                      animate={{
                        left: settings.motionEffects && !prefersReducedMotion ? 28 : 4,
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </button>
                </label>

                <label className="flex items-center justify-between interactive">
                  <span className="text-xs font-mono text-gray-muted">
                    Cursor Trail
                  </span>
                  <button
                    onClick={() =>
                      updateSettings({ cursorTrail: !settings.cursorTrail })
                    }
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.cursorTrail && !prefersReducedMotion
                        ? 'bg-lavender'
                        : 'bg-gray-muted/30'
                    }`}
                    disabled={prefersReducedMotion}
                  >
                    <motion.div
                      className="absolute top-1 w-4 h-4 bg-void rounded-full"
                      animate={{
                        left: settings.cursorTrail && !prefersReducedMotion ? 28 : 4,
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </button>
                </label>

                <label className="flex items-center justify-between interactive">
                  <span className="text-xs font-mono text-gray-muted">
                    Parallax
                  </span>
                  <button
                    onClick={() => updateSettings({ parallax: !settings.parallax })}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      settings.parallax && !prefersReducedMotion
                        ? 'bg-lavender'
                        : 'bg-gray-muted/30'
                    }`}
                    disabled={prefersReducedMotion}
                  >
                    <motion.div
                      className="absolute top-1 w-4 h-4 bg-void rounded-full"
                      animate={{
                        left: settings.parallax && !prefersReducedMotion ? 28 : 4,
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </button>
                </label>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
