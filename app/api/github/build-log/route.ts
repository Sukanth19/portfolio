import { NextResponse } from 'next/server'
import {
  fetchRecentCommits,
  fetchGitHubTotalStats,
  fetchRecentCommitsPublic,
  fetchGitHubTotalStatsPublic
} from '@/lib/github'

// Token stays on the server; responses are cached for 10 minutes
export const revalidate = 600

export async function GET() {
  const token = process.env.GITHUB_TOKEN
  const username = process.env.GITHUB_USERNAME || 'Sukanth19'

  if (token) {
    const [commits, totalStats] = await Promise.all([
      fetchRecentCommits(username, token, 10),
      fetchGitHubTotalStats(username, token)
    ])
    if (commits.length > 0) {
      return NextResponse.json({ commits, totalStats })
    }
  }

  // No token (or it failed): fall back to the public REST API
  const [commits, totalStats] = await Promise.all([
    fetchRecentCommitsPublic(username, 10),
    fetchGitHubTotalStatsPublic(username)
  ])

  return NextResponse.json({ commits, totalStats })
}
