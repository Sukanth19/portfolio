'use client'

import { useState, useEffect } from 'react'

interface ScrambleTextProps {
  text: string
  speed?: number
  scrambleSpeed?: number
  className?: string
  trigger?: boolean
}

export function ScrambleText({ 
  text, 
  speed = 50,
  scrambleSpeed = 20,
  className = '',
  trigger = false
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'

  useEffect(() => {
    if (!trigger) return

    let iteration = 0
    const maxIterations = text.length

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )

      iteration += 1 / 3

      if (iteration >= maxIterations) {
        clearInterval(interval)
        setDisplayText(text)
      }
    }, scrambleSpeed)

    return () => clearInterval(interval)
  }, [trigger, text, scrambleSpeed])

  return <span className={className}>{displayText}</span>
}
