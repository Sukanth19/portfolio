'use client'

import { motion } from 'framer-motion'

interface SystemCoordinatesProps {
  x?: number
  y?: number
}

export function SystemCoordinates({ x, y }: SystemCoordinatesProps) {
  const displayX = x ?? Math.floor(Math.random() * 999)
  const displayY = y ?? Math.floor(Math.random() * 999)

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
