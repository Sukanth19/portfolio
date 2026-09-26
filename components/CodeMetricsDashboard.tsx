'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface LanguageStats {
  name: string
  percentage: number
  color: string
  linesOfCode: number
}

interface DeveloperMetrics {
  totalProjects: number
  totalCommits: number
  linesOfCode: number
  languagesUsed: number
  experienceYears: number
  languages: LanguageStats[]
  codingHours: {
    day: string
    hours: number
  }[]
  productivityScore: number
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3776ab',
  'C++': '#00599c',
  C: '#555555',
  Java: '#007396',
  PHP: '#777bb4',
  CSS: '#1572b6',
  HTML: '#e34f26',
  Shell: '#89e051',
}

export function CodeMetricsDashboard() {
  const [metrics, setMetrics] = useState<DeveloperMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [animateValues, setAnimateValues] = useState(false)

  useEffect(() => {
    // Simulate loading metrics
    setTimeout(() => {
      const mockMetrics = generateMetrics()
      setMetrics(mockMetrics)
      setLoading(false)
      setTimeout(() => setAnimateValues(true), 100)
    }, 500)
  }, [])

  const generateMetrics = (): DeveloperMetrics => {
    const languages: LanguageStats[] = [
      { name: 'TypeScript', percentage: 35, color: LANGUAGE_COLORS.TypeScript, linesOfCode: 42000 },
      { name: 'JavaScript', percentage: 20, color: LANGUAGE_COLORS.JavaScript, linesOfCode: 24000 },
      { name: 'Python', percentage: 18, color: LANGUAGE_COLORS.Python, linesOfCode: 21600 },
      { name: 'C++', percentage: 12, color: LANGUAGE_COLORS['C++'], linesOfCode: 14400 },
      { name: 'C', percentage: 8, color: LANGUAGE_COLORS.C, linesOfCode: 9600 },
      { name: 'Java', percentage: 4, color: LANGUAGE_COLORS.Java, linesOfCode: 4800 },
      { name: 'Other', percentage: 3, color: '#8b8b9a', linesOfCode: 3600 },
    ]

    const codingHours = [
      { day: 'Mon', hours: 6 },
      { day: 'Tue', hours: 5 },
      { day: 'Wed', hours: 7 },
      { day: 'Thu', hours: 6 },
      { day: 'Fri', hours: 8 },
      { day: 'Sat', hours: 9 },
      { day: 'Sun', hours: 4 },
    ]

    return {
      totalProjects: 47,
      totalCommits: 1847,
      linesOfCode: 120000,
      languagesUsed: 10,
      experienceYears: 3,
      languages,
      codingHours,
      productivityScore: 87,
    }
  }

  const CounterAnimation = ({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (!animateValues) return

      let start = 0
      const end = value
      const increment = end / (duration * 60)
      
      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 1000 / 60)

      return () => clearInterval(timer)
    }, [value, duration, animateValues])

    return <span>{count.toLocaleString()}{suffix}</span>
  }

  if (loading || !metrics) {
    return (
      <div className="w-full border border-gray-muted/20 bg-void/50 p-6 flex items-center justify-center h-96">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-2 border-lavender/30 border-t-lavender rounded-full mx-auto mb-4"
          />
          <div className="text-gray-muted font-mono text-sm">Analyzing codebase...</div>
        </div>
      </div>
    )
  }

  const maxHours = Math.max(...metrics.codingHours.map(d => d.hours))

  return (
    <div className="w-full border border-gray-muted/20 bg-void/50 p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-gray-muted/20 pb-4">
        <h3 className="text-xl font-bold text-lavender font-mono mb-1">
          DEVELOPER METRICS
        </h3>
        <p className="text-xs text-gray-muted font-mono">
          Real-time statistics from my development journey
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'PROJECTS', value: metrics.totalProjects, color: 'lavender' },
          { label: 'COMMITS', value: metrics.totalCommits, color: 'crimson' },
          { label: 'LINES OF CODE', value: metrics.linesOfCode, color: 'text-light', suffix: '+' },
          { label: 'LANGUAGES', value: metrics.languagesUsed, color: 'lavender' },
          { label: 'PRODUCTIVITY', value: metrics.productivityScore, color: 'crimson', suffix: '%' },
        ].map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="border border-gray-muted/20 p-4 bg-void-light/50 hover:border-lavender/30 transition-colors group"
            whileHover={{ y: -4 }}
          >
            <div className="text-[10px] text-gray-muted font-mono mb-2 group-hover:text-crimson transition-colors">
              {metric.label}
            </div>
            <div className={`text-2xl md:text-3xl font-bold text-${metric.color} font-mono`}>
              <CounterAnimation value={metric.value} suffix={metric.suffix} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Language Distribution */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-mono text-crimson">LANGUAGE DISTRIBUTION</h4>
          <div className="text-xs text-gray-muted font-mono">
            {metrics.languagesUsed} languages
          </div>
        </div>

        {/* Language Bars */}
        <div className="space-y-3">
          {metrics.languages.map((lang, index) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-1 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: lang.color }}
                  />
                  <span className="text-text-light">{lang.name}</span>
                </div>
                <div className="text-gray-muted">
                  {lang.percentage}% · {lang.linesOfCode.toLocaleString()} lines
                </div>
              </div>
              <div className="h-2 bg-gray-muted/10 overflow-hidden relative group">
                <motion.div
                  className="h-full relative"
                  style={{ backgroundColor: lang.color }}
                  initial={{ width: 0 }}
                  animate={{ width: animateValues ? `${lang.percentage}%` : 0 }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                  whileHover={{ opacity: 0.8 }}
                >
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Coding Activity */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-mono text-crimson">WEEKLY ACTIVITY</h4>
          <div className="text-xs text-gray-muted font-mono">
            Average hours per day
          </div>
        </div>

        <div className="flex items-end justify-between gap-2 h-32">
          {metrics.codingHours.map((day, index) => {
            const heightPercent = (day.hours / maxHours) * 100
            return (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  className="w-full bg-lavender/20 hover:bg-lavender/40 transition-colors relative group cursor-pointer"
                  initial={{ height: 0 }}
                  animate={{ height: animateValues ? `${heightPercent}%` : 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Hover tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-void-light border border-lavender/40 rounded px-2 py-1 text-xs font-mono text-lavender whitespace-nowrap">
                      {day.hours}h
                    </div>
                  </div>
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-lavender/40 to-transparent" />
                </motion.div>
                <div className="text-xs text-gray-muted font-mono">{day.day}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Fun Stats */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-muted/20">
        <motion.div
          className="border border-gray-muted/20 p-4 bg-void-light/30"
          whileHover={{ borderColor: 'rgba(184, 174, 216, 0.3)' }}
        >
          <div className="text-xs text-gray-muted font-mono mb-2">PREFERRED EDITOR</div>
          <div className="text-lg font-bold text-text-light font-mono">Neovim</div>
          <div className="text-xs text-gray-muted mt-1">because VSCode is too mainstream</div>
        </motion.div>

        <motion.div
          className="border border-gray-muted/20 p-4 bg-void-light/30"
          whileHover={{ borderColor: 'rgba(184, 174, 216, 0.3)' }}
        >
          <div className="text-xs text-gray-muted font-mono mb-2">PREFERRED OS</div>
          <div className="text-lg font-bold text-text-light font-mono">Linux</div>
          <div className="text-xs text-gray-muted mt-1">Ubuntu / Arch / wherever the terminal is</div>
        </motion.div>
      </div>

      {/* Command to access */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-xs text-gray-muted/60 font-mono pt-4"
      >
        Terminal command: <span className="text-lavender/60">metrics</span>
      </motion.div>
    </div>
  )
}
