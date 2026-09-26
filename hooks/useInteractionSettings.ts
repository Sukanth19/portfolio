'use client'

import { useEffect, useState } from 'react'

export type CursorSensitivity = 'precise' | 'balanced' | 'fast'

export interface InteractionSettings {
  cursorSensitivity: CursorSensitivity
  motionEffects: boolean
  cursorTrail: boolean
  parallax: boolean
}

const DEFAULT_SETTINGS: InteractionSettings = {
  cursorSensitivity: 'balanced',
  motionEffects: true,
  cursorTrail: true,
  parallax: true,
}

const SENSITIVITY_CONFIG = {
  precise: { stiffness: 150, damping: 25 },
  balanced: { stiffness: 300, damping: 22 },
  fast: { stiffness: 500, damping: 20 },
}

export function useInteractionSettings() {
  const [settings, setSettings] = useState<InteractionSettings>(DEFAULT_SETTINGS)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Load saved settings
    const saved = localStorage.getItem('interactionSettings')
    if (saved) {
      try {
        setSettings(JSON.parse(saved))
      } catch (e) {
        console.warn('Failed to parse saved settings')
      }
    }

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const updateSettings = (newSettings: Partial<InteractionSettings>) => {
    const updated = { ...settings, ...newSettings }
    setSettings(updated)
    localStorage.setItem('interactionSettings', JSON.stringify(updated))
  }

  const getCursorConfig = () => {
    return SENSITIVITY_CONFIG[settings.cursorSensitivity]
  }

  const effectiveSettings = prefersReducedMotion
    ? {
        ...settings,
        motionEffects: false,
        cursorTrail: false,
        parallax: false,
      }
    : settings

  return {
    settings: effectiveSettings,
    updateSettings,
    getCursorConfig,
    prefersReducedMotion,
  }
}
