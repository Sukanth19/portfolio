'use client'

import { useEffect, useState } from 'react'

export function SystemTimestamp() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-[10px] font-mono text-gray-muted/40">
      {time.toLocaleTimeString('en-US', { hour12: false })}
    </div>
  )
}
