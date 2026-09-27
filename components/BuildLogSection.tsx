'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { buildLog, type BuildLogEntry } from '@/data/buildLog'
import { fetchRecentCommits, fetchGitHubTotalStats, type GitHubCommit } from '@/lib/github'

function formatGitHubDate(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

function commitToLogEntry(commit: GitHubCommit): BuildLogEntry {
  // Truncate commit message to first line
  const title = commit.message.split('\n')[0].slice(0, 80)
  const description = commit.message.split('\n').slice(1).join('\n').trim()
  
  return {
    id: commit.sha,
    date: formatGitHubDate(commit.date),
    title: title,
    project: commit.repoName.toUpperCase(),
    description: description || `${commit.additions || 0}++ ${commit.deletions || 0}--`,
    status: 'BUILT',
    technologies: []
  }
}

export function BuildLogSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [commits, setCommits] = useState<GitHubCommit[]>([])
  const [totalStats, setTotalStats] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [useGitHub, setUseGitHub] = useState(true)

  useEffect(() => {
    const loadGitHubData = async () => {
      const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN
      const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'Sukanth19'
      
      if (!token) {
        console.warn('No GitHub token found, using static build log')
        setIsLoading(false)
        setUseGitHub(false)
        return
      }

      try {
        const [recentCommits, stats] = await Promise.all([
          fetchRecentCommits(username, token, 10),
          fetchGitHubTotalStats(username, token)
        ])

        if (recentCommits.length > 0) {
          setCommits(recentCommits)
        } else {
          setUseGitHub(false)
        }
        
        setTotalStats(stats)
      } catch (error) {
        console.error('Failed to load GitHub data:', error)
        setUseGitHub(false)
      } finally {
        setIsLoading(false)
      }
    }

    loadGitHubData()
  }, [])

  // Use GitHub commits if available, otherwise fall back to static log
  const displayLog: BuildLogEntry[] = useGitHub && commits.length > 0
    ? commits.map(commitToLogEntry)
    : buildLog

  const statusColors = {
    'BUILT': 'text-lavender',
    'EXPERIMENT': 'text-purple-deep',
    'IN PROGRESS': 'text-crimson',
    'COMPLETED': 'text-lavender',
    'ARCHIVED': 'text-gray-muted'
  }

  return (
    <section id="build-log" className="py-24 px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-3xl font-bold text-text-light font-mono">BUILD LOG</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-lavender/40 to-transparent" />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-mono text-gray-muted">
              {useGitHub ? 'Live GitHub activity' : 'Engineering activity'} • experiments • builds
            </p>
            {totalStats && (
              <div className="flex gap-4 text-xs font-mono text-gray-muted">
                <span className="text-lavender">{totalStats.totalCommits}+ commits</span>
                <span className="text-purple-deep">{totalStats.totalRepos} repos</span>
              </div>
            )}
          </div>
          {isLoading && (
            <p className="text-xs font-mono text-lavender/60 mt-2">
              Loading GitHub activity...
            </p>
          )}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-lavender/40 via-purple-deep/40 to-transparent" />

          {/* Entries */}
          <div className="space-y-6">
            {displayLog.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8"
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-lavender border-2 border-void"
                  whileHover={{ scale: 1.5 }}
                />

                {/* Entry content */}
                <motion.div
                  className="border border-gray-muted/20 bg-void-light/30 p-4 cursor-pointer group hover:border-lavender/30 transition-colors"
                  whileHover={{ x: 4 }}
                  onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                >
                  {/* Date and Status */}
                  <div className="flex items-center justify-between mb-2 text-xs font-mono">
                    <span className="text-gray-muted">[{entry.date}]</span>
                    <span className={`${statusColors[entry.status]} uppercase`}>
                      {entry.status}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="text-sm font-mono text-text-light mb-1 group-hover:text-lavender transition-colors">
                    {entry.title}
                  </div>

                  {/* Project */}
                  {entry.project && (
                    <div className="text-xs font-mono text-crimson mb-2">
                      {entry.project}
                    </div>
                  )}

                  {/* Description (expandable) */}
                  {entry.description && (
                    <motion.div
                      initial={false}
                      animate={{
                        height: expandedId === entry.id ? 'auto' : 0,
                        opacity: expandedId === entry.id ? 1 : 0
                      }}
                      className="overflow-hidden"
                    >
                      <div className="text-xs font-mono text-gray-muted pt-2 border-t border-gray-muted/10 mt-2">
                        {entry.description}
                      </div>
                      {entry.technologies && entry.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
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

                  {/* Expand indicator */}
                  {entry.description && (
                    <div className="text-xs font-mono text-gray-muted/40 mt-2 flex items-center gap-1">
                      <span>{expandedId === entry.id ? '▼' : '▶'}</span>
                      <span>{expandedId === entry.id ? 'COLLAPSE' : 'EXPAND'}</span>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-xs font-mono text-gray-muted/60 text-center"
        >
          <span>──────────</span>
          <span className="mx-2">ONGOING</span>
          <span>──────────</span>
        </motion.div>
      </div>
    </section>
  )
}
