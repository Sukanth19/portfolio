'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

// Generate mock data - in production, fetch from GitHub API
function generateContributionData(): ContributionDay[] {
  const data: ContributionDay[] = []
  const today = new Date()
  
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    // Generate realistic pattern
    const isWeekend = date.getDay() === 0 || date.getDay() === 6
    const baseChance = isWeekend ? 0.3 : 0.7
    const random = Math.random()
    
    let count = 0
    let level: 0 | 1 | 2 | 3 | 4 = 0
    
    if (random < baseChance) {
      count = Math.floor(Math.random() * 15) + 1
      if (count >= 12) level = 4
      else if (count >= 8) level = 3
      else if (count >= 4) level = 2
      else level = 1
    }
    
    data.push({
      date: date.toISOString().split('T')[0],
      count,
      level,
    })
  }
  
  return data
}

export function GitHubActivity() {
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null)
  const contributions = generateContributionData()
  
  // Group by weeks
  const weeks: ContributionDay[][] = []
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7))
  }

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-gray-muted/10'
      case 1: return 'bg-lavender/20'
      case 2: return 'bg-lavender/40'
      case 3: return 'bg-lavender/60'
      case 4: return 'bg-lavender/80'
      default: return 'bg-gray-muted/10'
    }
  }

  const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0)

  return (
    <div className="relative">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-mono text-lavender mb-1">GITHUB ACTIVITY</h3>
          <p className="text-xs text-gray-muted font-mono">
            {totalContributions} contributions in the last year
          </p>
        </div>
        <a
          href="https://github.com/Sukanth19"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-gray-muted hover:text-lavender transition-colors interactive"
        >
          @Sukanth19 →
        </a>
      </div>

      <div className="relative">
        {/* Contribution grid */}
        <div className="flex gap-[2px] overflow-x-auto pb-2">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[2px]">
              {week.map((day, dayIndex) => (
                <motion.div
                  key={day.date}
                  className={`w-[10px] h-[10px] ${getLevelColor(day.level)} border border-gray-muted/10 interactive`}
                  onHoverStart={() => setHoveredDay(day)}
                  onHoverEnd={() => setHoveredDay(null)}
                  whileHover={{ scale: 1.3, zIndex: 10 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001 }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Hover tooltip */}
        {hoveredDay && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-void-light border border-lavender/40 rounded px-3 py-2 text-xs font-mono whitespace-nowrap z-20 pointer-events-none"
          >
            <div className="text-text-light">
              {hoveredDay.count} contribution{hoveredDay.count !== 1 ? 's' : ''}
            </div>
            <div className="text-gray-muted text-[10px]">
              {new Date(hoveredDay.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center gap-2 text-[10px] font-mono text-gray-muted">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`w-[10px] h-[10px] ${getLevelColor(level)} border border-gray-muted/10`}
          />
        ))}
        <span>More</span>
      </div>

      <div className="mt-2 text-[10px] font-mono text-gray-muted/60">
        Note: Contribution data is representative
      </div>
    </div>
  )
}
