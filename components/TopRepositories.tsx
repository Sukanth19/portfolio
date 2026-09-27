'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { fetchTopRepositories, fetchGitHubRepoStats, type GitHubRepoInfo } from '@/lib/github'

export function TopRepositories() {
  const [repos, setRepos] = useState<GitHubRepoInfo[]>([])
  const [stats, setStats] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadRepos = async () => {
      const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN
      const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'Sukanth19'

      if (!token) {
        console.warn('No GitHub token found')
        setIsLoading(false)
        return
      }

      try {
        const [topRepos, repoStats] = await Promise.all([
          fetchTopRepositories(username, token, 6),
          fetchGitHubRepoStats(username, token)
        ])

        setRepos(topRepos)
        setStats(repoStats)
      } catch (error) {
        console.error('Failed to load repositories:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadRepos()
  }, [])

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-sm font-mono text-lavender/60">Loading repositories...</p>
      </div>
    )
  }

  if (repos.length === 0) {
    return null
  }

  return (
    <section className="py-12 px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-2">
            <h3 className="text-2xl font-bold text-text-light font-mono">TOP REPOSITORIES</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-crimson/40 to-transparent" />
          </div>
          {stats && (
            <div className="flex gap-6 text-xs font-mono text-gray-muted">
              <span>
                <span className="text-crimson">{stats.totalStars}</span> total stars
              </span>
              <span>
                <span className="text-lavender">{stats.totalForks}</span> total forks
              </span>
              <span>
                <span className="text-purple-deep">{stats.totalRepos}</span> public repos
              </span>
            </div>
          )}
        </motion.div>

        {/* Repository Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo, index) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="border border-gray-muted/20 bg-void-light/30 p-4 group hover:border-crimson/40 transition-all"
            >
              {/* Repo Name */}
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-mono font-bold text-text-light group-hover:text-crimson transition-colors truncate">
                  {repo.name}
                </h4>
                {repo.language && (
                  <span className="text-[10px] font-mono text-lavender/60 border border-lavender/20 px-1.5 py-0.5 ml-2 flex-shrink-0">
                    {repo.language}
                  </span>
                )}
              </div>

              {/* Description */}
              {repo.description && (
                <p className="text-xs font-mono text-gray-muted mb-3 line-clamp-2">
                  {repo.description}
                </p>
              )}

              {/* Stats */}
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1">
                  <span className="text-crimson">★</span>
                  <span className="text-gray-muted">{repo.stars}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-lavender">⑂</span>
                  <span className="text-gray-muted">{repo.forks}</span>
                </div>
              </div>

              {/* Hover indicator */}
              <div className="mt-3 text-[10px] font-mono text-crimson/0 group-hover:text-crimson/60 transition-colors">
                VIEW REPO →
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
