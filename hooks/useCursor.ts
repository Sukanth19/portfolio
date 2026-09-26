'use client'

import { useEffect, useRef, useState } from 'react'

export interface CursorState {
  x: number
  y: number
  isHovering: boolean
  cursorType: 'default' | 'pointer' | 'text'
}

export function useCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    cursorType: 'default'
  })
  
  const rafRef = useRef<number>()

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      // Use RAF for smooth updates
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      
      rafRef.current = requestAnimationFrame(() => {
        setCursor(prev => ({
          ...prev,
          x: e.clientX,
          y: e.clientY
        }))
      })
    }

    // Use event delegation for better performance
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('interactive') ||
        target.closest('.interactive')
      
      const isTextInput = 
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true'

      if (isInteractive) {
        setCursor(prev => prev.isHovering ? prev : { ...prev, isHovering: true, cursorType: 'pointer' })
      } else if (isTextInput) {
        setCursor(prev => prev.cursorType === 'text' ? prev : { ...prev, cursorType: 'text', isHovering: false })
      } else {
        setCursor(prev => prev.isHovering || prev.cursorType !== 'default' ? { ...prev, isHovering: false, cursorType: 'default' } : prev)
      }
    }

    window.addEventListener('mousemove', updateCursor, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      window.removeEventListener('mousemove', updateCursor)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return cursor
}
