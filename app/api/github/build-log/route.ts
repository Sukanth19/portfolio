import { NextResponse } from 'next/server'
import { fetchRecentCommits, fetchGitHubTotalStats } from '@/lib/github'

// Token stays on the server; responses are cached for an hour
export const revalidate = 3600

export async function GET() {
  const token = process.env.GITHUB_TOKEN
  const username = process.env.GITHUB_USERNAME || 'Sukanth19'

  if (!token) {
    return NextResponse.json({ commits: [], totalStats: null })
  }

  const [commits, totalStats] = await Promise.all([
    fetchRecentCommits(username, token, 10),
    fetchGitHubTotalStats(username, token)
  ])

  return NextResponse.json({ commits, totalStats })
}
