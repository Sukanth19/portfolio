'use client'

import { useEffect, useState } from 'react'
import type { GitHubCommit, GitHubRepoInfo } from '@/lib/github'

function timeAgo(dateString: string): string {
  const seconds = Math.max(0, (Date.now() - new Date(dateString).getTime()) / 1000)
  const units: [number, string][] = [[31536000, 'y'], [2592000, 'mo'], [604800, 'w'], [86400, 'd'], [3600, 'h'], [60, 'm']]
  for (const [size, label] of units) {
    if (seconds >= size) return `${Math.floor(seconds / size)}${label} ago`
  }
  return 'just now'
}

export function GitHubActivity() {
  const [commits, setCommits] = useState<GitHubCommit[] | null>(null)
  const [repos, setRepos] = useState<GitHubRepoInfo[] | null>(null)

  useEffect(() => {
    fetch('/api/github/build-log')
      .then(r => (r.ok ? r.json() : { commits: [] }))
      .then(d => setCommits(d.commits ?? []))
      .catch(() => setCommits([]))
    fetch('/api/github/repos')
      .then(r => (r.ok ? r.json() : { repos: [] }))
      .then(d => setRepos(d.repos ?? []))
      .catch(() => setRepos([]))
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-5">
      {/* Commit log */}
      <div className="rounded-3xl border-2 border-[#F5F5F0]/15 p-6 md:col-span-3">
        <div className="mb-6 flex items-center justify-between text-xs uppercase">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#D7FF3A] animate-[pulse-dot_1.6s_ease-in-out_infinite]" />
            live from github
          </span>
          <span className="opacity-60">latest commits</span>
        </div>
        {commits === null ? (
          <p className="text-sm opacity-60">fetching commits…</p>
        ) : commits.length === 0 ? (
          <p className="text-sm opacity-60">github is being shy right now. try again later.</p>
        ) : (
          <ul>
            {commits.slice(0, 7).map(c => (
              <li key={c.sha}>
                <a
                  href={c.commitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-12 gap-3 border-t border-[#F5F5F0]/10 py-3 text-sm transition-colors hover:text-[#D7FF3A]"
                >
                  <span className="col-span-3 truncate opacity-60 group-hover:opacity-100 md:col-span-2">{c.sha.slice(0, 7)}</span>
                  <span className="col-span-9 truncate md:col-span-6">{c.message.split('\n')[0]}</span>
                  <span className="col-span-8 truncate opacity-60 md:col-span-3">{c.repoName}</span>
                  <span className="col-span-4 text-right opacity-60 md:col-span-1">{timeAgo(c.date)}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Top repos */}
      <div className="flex flex-col gap-4 md:col-span-2">
        {(repos ?? []).slice(0, 4).map(r => (
          <a
            key={r.name}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-1 flex-col justify-between rounded-3xl border-2 border-[#F5F5F0]/15 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#D7FF3A] hover:bg-[#D7FF3A] hover:text-black"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="truncate font-[family-name:var(--display)] text-xl uppercase">{r.name}</span>
              <span className="transition-transform duration-300 group-hover:rotate-45">↗</span>
            </div>
            {r.description && <p className="mt-2 line-clamp-2 text-xs opacity-70 group-hover:opacity-100">{r.description}</p>}
            <div className="mt-3 flex gap-4 text-xs">
              {r.language && <span>{r.language}</span>}
              <span>★ {r.stars}</span>
              <span>⑂ {r.forks}</span>
            </div>
          </a>
        ))}
        {repos === null && <p className="p-5 text-sm opacity-60">fetching repos…</p>}
      </div>
    </div>
  )
}
