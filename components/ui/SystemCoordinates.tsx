'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface SystemCoordinatesProps {
  x?: number
  y?: number
}

export function SystemCoordinates({ x, y }: SystemCoordinatesProps) {
  // Random values are picked after mount to keep server and client markup identical
  const [random, setRandom] = useState<[number, number] | null>(null)

  useEffect(() => {
    setRandom([Math.floor(Math.random() * 999), Math.floor(Math.random() * 999)])
  }, [])

  const displayX = x ?? random?.[0] ?? '---'
  const displayY = y ?? random?.[1] ?? '---'

  return (
    <motion.div
      className="text-[10px] font-mono text-gray-muted/30 select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      [{displayX},{displayY}]
    </motion.div>
  )
}
