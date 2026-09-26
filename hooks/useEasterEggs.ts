'use client'

import { useEffect, useState } from 'react'

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a'
]

export function useEasterEggs() {
  const [konamiUnlocked, setKonamiUnlocked] = useState(false)
  const [sudoAttempts, setSudoAttempts] = useState(0)
  const [secretUnlocked, setSecretUnlocked] = useState(false)

  useEffect(() => {
    let konamiIndex = 0

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === KONAMI_CODE[konamiIndex]) {
        konamiIndex++
        if (konamiIndex === KONAMI_CODE.length) {
          setKonamiUnlocked(true)
          konamiIndex = 0
        }
      } else {
        konamiIndex = 0
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const triggerSudo = () => {
    setSudoAttempts(prev => prev + 1)
  }

  const triggerSecret = () => {
    setSecretUnlocked(true)
  }

  return {
    konamiUnlocked,
    sudoAttempts,
    secretUnlocked,
    triggerSudo,
    triggerSecret,
  }
}
