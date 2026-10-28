'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { buildLog, type BuildLogEntry } from '@/data/buildLog'
import type { GitHubCommit } from '@/lib/github'

const EASE = [0.22, 1, 0.36, 1] as const
const INITIAL_COUNT = 4

interface LogItem extends BuildLogEntry {
  url?: string
  sha?: string
  additions?: number
  deletions?: number
  relative?: string
}

interface TotalStats {
  totalCommits: number | null
  totalRepos: number
}

function formatGitHubDate(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

function timeAgo(dateString: string): string {
  const seconds = Math.max(0, (Date.now() - new Date(dateString).getTime()) / 1000)
  const units: [number, string][] = [[31536000, 'y'], [2592000, 'mo'], [604800, 'w'], [86400, 'd'], [3600, 'h'], [60, 'm']]
  for (const [size, label] of units) {
    if (seconds >= size) return `${Math.floor(seconds / size)}${label} ago`
  }
  return 'just now'
}

function commitToLogItem(commit: GitHubCommit): LogItem {
  const [title, ...rest] = commit.message.split('\n')
  return {
    id: commit.sha,
    date: formatGitHubDate(commit.date),
    title: title.slice(0, 90),
    project: commit.repoName,
    description: rest.join('\n').trim() || undefined,
    status: 'BUILT',
    url: commit.commitUrl,
    sha: commit.sha.slice(0, 7),
    additions: commit.additions,
    deletions: commit.deletions,
    relative: timeAgo(commit.date)
  }
}

const statusColors: Record<BuildLogEntry['status'], string> = {
  'BUILT': 'text-lavender',
  'EXPERIMENT': 'text-purple-deep',
  'IN PROGRESS': 'text-crimson',
  'COMPLETED': 'text-lavender',
  'ARCHIVED': 'text-gray-muted'
}

export function BuildLogSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [commits, setCommits] = useState<GitHubCommit[]>([])
  const [totalStats, setTotalStats] = useState<TotalStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const loadGitHubData = async () => {
      try {
        const res = await fetch('/api/github/build-log')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setCommits(data.commits ?? [])
        setTotalStats(data.totalStats)
      } catch (error) {
        console.error('Failed to load GitHub data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadGitHubData()
  }, [])

  const isLive = commits.length > 0
  // Use GitHub commits if available, otherwise fall back to the static log
  const displayLog: LogItem[] = isLive ? commits.map(commitToLogItem) : buildLog
  const visibleLog = showAll ? displayLog : displayLog.slice(0, INITIAL_COUNT)
  const itemLabel = isLive ? 'COMMITS' : 'ENTRIES'

  return (
    <section id="build-log" className="py-24 px-8 bg-void-light/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-crimson" />
              <h2 className="text-sm font-mono text-crimson">07</h2>
            </div>
          </div>
          <h2 className="text-5xl font-bold text-text-light mb-4">
            BUILD LOG
          </h2>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-sm">
            <span className="flex items-center gap-2 text-gray-muted">
              <span className="relative flex h-2 w-2">
                {isLive && (
                  <span className="absolute inline-flex h-full w-full rounded-full bg-lavender opacity-60 animate-ping" />
                )}
                <span className={`relative inline-flex h-2 w-2 rounded-full ${isLive ? 'bg-lavender' : 'bg-gray-muted/50'}`} />
              </span>
              {isLoading ? 'connecting to github…' : isLive ? 'live github activity' : 'engineering activity • experiments • builds'}
            </span>
            {totalStats && (
              <span className="text-xs text-gray-muted">
                {totalStats.totalCommits != null && (
                  <span className="text-lavender mr-4">{totalStats.totalCommits}+ commits this year</span>
                )}
                <span className="text-purple-deep">{totalStats.totalRepos} public repos</span>
              </span>
            )}
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <motion.div
            className="absolute left-[3px] top-0 bottom-0 w-px origin-top bg-gradient-to-b from-lavender/40 via-purple-deep/40 to-transparent"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE }}
          />

          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: INITIAL_COUNT }).map((_, i) => (
                <div key={i} className="relative pl-8">
                  <div className="absolute left-0 top-5 w-[7px] h-[7px] rounded-full bg-gray-muted/30" />
                  <div className="border border-gray-muted/10 bg-void-light/30 p-4 space-y-3 animate-pulse">
                    <div className="h-3 w-32 bg-gray-muted/10" />
                    <div className="h-4 w-2/3 bg-gray-muted/10" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.ul layout className="space-y-4">
              <AnimatePresence initial={false}>
                {visibleLog.map((entry, index) => {
                  const expanded = expandedId === entry.id
                  const canExpand = Boolean(entry.description || entry.technologies?.length)

                  return (
                    <motion.li
                      key={entry.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.6, ease: EASE, delay: (index % INITIAL_COUNT) * 0.06 }}
                      className="relative pl-8"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-0 top-5 w-[7px] h-[7px] rounded-full bg-lavender ring-4 ring-void" />

                      <div
                        className={`group border bg-void-light/30 p-4 transition-[border-color,transform,background-color] duration-300 ease-out hover:translate-x-1 hover:bg-void-light/50 ${
                          expanded ? 'border-lavender/40' : 'border-gray-muted/20 hover:border-lavender/30'
                        } ${canExpand ? 'cursor-pointer interactive' : ''}`}
                        onClick={() => canExpand && setExpandedId(expanded ? null : entry.id)}
                      >
                        {/* Meta row */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs font-mono">
                          <div className="flex items-center gap-3 text-gray-muted">
                            <span>[{entry.date}]</span>
                            {entry.relative && <span className="text-gray-muted/60">{entry.relative}</span>}
                          </div>
                          {entry.sha ? (
                            <a
                              href={entry.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="interactive text-lavender/70 hover:text-lavender transition-colors"
                            >
                              {entry.sha} ↗
                            </a>
                          ) : (
                            <span className={`${statusColors[entry.status]} uppercase`}>{entry.status}</span>
                          )}
                        </div>

                        {/* Title */}
                        <div className="text-sm font-mono text-text-light group-hover:text-lavender transition-colors duration-300">
                          {entry.title}
                        </div>

                        {/* Project + diff stats */}
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs font-mono">
                          {entry.project && <span className="text-crimson">{entry.project}</span>}
                          {(entry.additions != null || entry.deletions != null) && (
                            <span className="text-gray-muted/70">
                              <span className="text-lavender/80">+{entry.additions ?? 0}</span>{' '}
                              <span className="text-crimson/80">−{entry.deletions ?? 0}</span>
                            </span>
                          )}
                          {canExpand && (
                            <span className="ml-auto text-gray-muted/40 flex items-center gap-1">
                              <motion.span
                                animate={{ rotate: expanded ? 90 : 0 }}
                                transition={{ duration: 0.3, ease: EASE }}
                                className="inline-block"
                              >
                                ▶
                              </motion.span>
                              {expanded ? 'COLLAPSE' : 'DETAILS'}
                            </span>
                          )}
                        </div>

                        {/* Details (expandable) */}
                        <AnimatePresence initial={false}>
                          {expanded && (
                            <motion.div
                              key="details"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: EASE }}
                              className="overflow-hidden"
                            >
                              {entry.description && (
                                <div className="whitespace-pre-line text-xs font-mono text-gray-muted pt-3 mt-3 border-t border-gray-muted/10">
                                  {entry.description}
                                </div>
                              )}
                              {entry.technologies && entry.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {entry.technologies.map(tech => (
                                    <span
                                      key={tech}
                                      className="text-[10px] font-mono text-lavender/60 border border-lavender/20 px-2 py-0.5"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.li>
                  )
                })}
              </AnimatePresence>
            </motion.ul>
          )}
        </div>

        {/* Footer */}
        <motion.div layout className="mt-8 text-center">
          {displayLog.length > INITIAL_COUNT && !isLoading && (
            <button
              onClick={() => setShowAll(prev => !prev)}
              className="interactive px-6 py-2 border border-lavender/30 bg-void-light/30 text-lavender font-mono text-xs transition-all duration-300 ease-out hover:bg-lavender/10 hover:border-lavender active:scale-95 mb-4"
            >
              {showAll ? 'SHOW LESS ▲' : `SHOW ALL ${displayLog.length} ${itemLabel} ▼`}
            </button>
          )}
          <div className="text-xs font-mono text-gray-muted/60">
            <span>──────────</span>
            {isLive ? (
              <a
                href="https://github.com/Sukanth19"
                target="_blank"
                rel="noopener noreferrer"
                className="interactive mx-2 hover:text-lavender transition-colors"
              >
                VIEW ALL ON GITHUB ↗
              </a>
            ) : (
              <span className="mx-2">ONGOING</span>
            )}
            <span>──────────</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
