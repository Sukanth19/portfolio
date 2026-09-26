'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchGitHubContributions } from '@/lib/github'

interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface GitHubStats {
  totalContributions: number
  longestStreak: number
  currentStreak: number
  weekData: ContributionDay[][]
}

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'Sukanth19'
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN

export function GitHubActivityGraph() {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDay, setSelectedDay] = useState<ContributionDay | null>(null)
  const [hoverWeek, setHoverWeek] = useState<number | null>(null)
  const [usingMockData, setUsingMockData] = useState(false)

  useEffect(() => {
    fetchGitHubData()
  }, [])

  const fetchGitHubData = async () => {
    try {
      const data = await fetchGitHubContributions(GITHUB_USERNAME, GITHUB_TOKEN)
      
      if (data) {
        // Convert API data to our format
        const weeks: ContributionDay[][] = []
        let currentWeek: ContributionDay[] = []
        
        data.contributions.forEach((contribution, index) => {
          const level = 
            contribution.contributionLevel === 'NONE' ? 0 :
            contribution.contributionLevel === 'FIRST_QUARTILE' ? 1 :
            contribution.contributionLevel === 'SECOND_QUARTILE' ? 2 :
            contribution.contributionLevel === 'THIRD_QUARTILE' ? 3 : 4

          currentWeek.push({
            date: contribution.date,
            count: contribution.contributionCount,
            level: level as 0 | 1 | 2 | 3 | 4
          })

          // GitHub API gives us days, we need to group into weeks
          if (currentWeek.length === 7 || index === data.contributions.length - 1) {
            weeks.push([...currentWeek])
            currentWeek = []
          }
        })

        setStats({
          totalContributions: data.totalContributions,
          currentStreak: data.currentStreak,
          longestStreak: data.longestStreak,
          weekData: weeks
        })
        setUsingMockData(false)
      } else {
        // Fallback to mock data
        console.warn('Using mock data - add NEXT_PUBLIC_GITHUB_TOKEN to .env.local for real data')
        setStats(generateMockData())
        setUsingMockData(true)
      }
      
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch GitHub data:', error)
      setStats(generateMockData())
      setUsingMockData(true)
      setLoading(false)
    }
  }

  const generateMockData = (): GitHubStats => {
    const weeks: ContributionDay[][] = []
    const today = new Date()
    const startDate = new Date(today)
    startDate.setDate(today.getDate() - 364) // Last year

    let currentStreak = 0
    let longestStreak = 0
    let tempStreak = 0
    let totalContributions = 0

    // Generate 52 weeks
    for (let week = 0; week < 52; week++) {
      const weekData: ContributionDay[] = []
      
      for (let day = 0; day < 7; day++) {
        const date = new Date(startDate)
        date.setDate(startDate.getDate() + week * 7 + day)
        
        if (date > today) break

        // Generate random contribution count with some logic
        const dayOfWeek = date.getDay()
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
        const baseChance = isWeekend ? 0.4 : 0.7
        
        let count = 0
        if (Math.random() < baseChance) {
          count = Math.floor(Math.random() * 20) + 1
        }

        totalContributions += count

        // Calculate streak
        if (count > 0) {
          tempStreak++
          if (date.toDateString() === today.toDateString() || 
              date.toDateString() === new Date(today.getTime() - 86400000).toDateString()) {
            currentStreak = tempStreak
          }
        } else {
          longestStreak = Math.max(longestStreak, tempStreak)
          tempStreak = 0
        }

        const level = count === 0 ? 0 :
                     count <= 3 ? 1 :
                     count <= 6 ? 2 :
                     count <= 10 ? 3 : 4

        weekData.push({
          date: date.toISOString().split('T')[0],
          count,
          level: level as 0 | 1 | 2 | 3 | 4,
        })
      }
      
      if (weekData.length > 0) {
        weeks.push(weekData)
      }
    }

    longestStreak = Math.max(longestStreak, tempStreak)

    return {
      totalContributions,
      longestStreak,
      currentStreak,
      weekData: weeks,
    }
  }

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-gray-muted/10'
      case 1: return 'bg-lavender/30'
      case 2: return 'bg-lavender/50'
      case 3: return 'bg-lavender/70'
      case 4: return 'bg-lavender'
      default: return 'bg-gray-muted/10'
    }
  }

  const getDayName = (index: number) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return days[index]
  }

  const getMonthLabels = () => {
    if (!stats) return []
    const months: { label: string; offset: number }[] = []
    let currentMonth = -1

    stats.weekData.forEach((week, weekIndex) => {
      const firstDay = new Date(week[0].date)
      const month = firstDay.getMonth()
      
      if (month !== currentMonth && weekIndex % 4 === 0) {
        months.push({
          label: firstDay.toLocaleDateString('en-US', { month: 'short' }),
          offset: weekIndex,
        })
        currentMonth = month
      }
    })

    return months
  }

  if (loading) {
    return (
      <div className="w-full h-48 border border-gray-muted/20 bg-void/50 flex items-center justify-center">
        <div className="text-gray-muted font-mono text-sm">Loading GitHub activity...</div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="w-full h-48 border border-gray-muted/20 bg-void/50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-crimson font-mono text-sm mb-2">Failed to load GitHub data</div>
          <div className="text-xs text-gray-muted">Add NEXT_PUBLIC_GITHUB_TOKEN to .env.local</div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full border border-gray-muted/20 bg-void/50 p-6">
      {/* Mock Data Warning */}
      {usingMockData && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 border border-crimson/30 bg-crimson/5 p-3 rounded text-xs font-mono text-crimson"
        >
          ⚠️ Using mock data - Add your GitHub token to .env.local for real stats
        </motion.div>
      )}
      {/* Stats Header */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <motion.div
          className="border border-lavender/20 p-3 bg-void-light/50"
          whileHover={{ borderColor: 'rgba(184, 174, 216, 0.4)', y: -2 }}
        >
          <div className="text-xs text-gray-muted font-mono mb-1">TOTAL</div>
          <div className="text-2xl font-bold text-lavender font-mono">
            {stats.totalContributions}
          </div>
          <div className="text-xs text-gray-muted mt-1">contributions</div>
        </motion.div>

        <motion.div
          className="border border-lavender/20 p-3 bg-void-light/50"
          whileHover={{ borderColor: 'rgba(184, 174, 216, 0.4)', y: -2 }}
        >
          <div className="text-xs text-gray-muted font-mono mb-1">CURRENT STREAK</div>
          <div className="text-2xl font-bold text-crimson font-mono">
            {stats.currentStreak}
          </div>
          <div className="text-xs text-gray-muted mt-1">days</div>
        </motion.div>

        <motion.div
          className="border border-lavender/20 p-3 bg-void-light/50"
          whileHover={{ borderColor: 'rgba(184, 174, 216, 0.4)', y: -2 }}
        >
          <div className="text-xs text-gray-muted font-mono mb-1">LONGEST STREAK</div>
          <div className="text-2xl font-bold text-text-light font-mono">
            {stats.longestStreak}
          </div>
          <div className="text-xs text-gray-muted mt-1">days</div>
        </motion.div>
      </div>

      {/* Contribution Graph */}
      <div className="relative">
        <div className="flex gap-1 mb-2 text-[10px] text-gray-muted font-mono pl-8">
          {getMonthLabels().map((month, i) => (
            <div
              key={i}
              className="absolute"
              style={{ left: `${month.offset * 12 + 32}px` }}
            >
              {month.label}
            </div>
          ))}
        </div>

        <div className="flex gap-1">
          {/* Day labels */}
          <div className="flex flex-col gap-1 text-[10px] text-gray-muted font-mono justify-around pr-2">
            <div>Mon</div>
            <div>Wed</div>
            <div>Fri</div>
          </div>

          {/* Weeks */}
          <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-lavender/30 scrollbar-track-transparent">
            {stats.weekData.map((week, weekIndex) => (
              <div
                key={weekIndex}
                className="flex flex-col gap-1"
                onMouseEnter={() => setHoverWeek(weekIndex)}
                onMouseLeave={() => setHoverWeek(null)}
              >
                {week.map((day, dayIndex) => (
                  <motion.div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-3 h-3 ${getLevelColor(day.level)} cursor-pointer relative group`}
                    whileHover={{ 
                      scale: 1.5,
                      zIndex: 10,
                      boxShadow: day.level > 0 ? '0 0 8px rgba(184, 174, 216, 0.6)' : 'none'
                    }}
                    onHoverStart={() => setSelectedDay(day)}
                    onHoverEnd={() => setSelectedDay(null)}
                    animate={{
                      opacity: hoverWeek !== null && hoverWeek !== weekIndex ? 0.3 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Tooltip */}
                    {selectedDay === day && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-void-light border border-lavender/40 rounded px-2 py-1 text-[10px] font-mono whitespace-nowrap z-50 pointer-events-none"
                      >
                        <div className="text-lavender">
                          {day.count} contribution{day.count !== 1 ? 's' : ''}
                        </div>
                        <div className="text-gray-muted">
                          {new Date(day.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-lavender/40" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-4 text-[10px] text-gray-muted font-mono">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <motion.div
              key={level}
              className={`w-3 h-3 ${getLevelColor(level)}`}
              whileHover={{ scale: 1.3 }}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* GitHub Link */}
      <motion.a
        href={`https://github.com/${GITHUB_USERNAME}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 text-xs font-mono text-gray-muted hover:text-lavender transition-colors border border-gray-muted/20 px-3 py-2 hover:border-lavender/40"
        whileHover={{ x: 2 }}
      >
        <span>VIEW ON GITHUB</span>
        <span>↗</span>
      </motion.a>
    </div>
  )
}
