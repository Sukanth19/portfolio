import { NextResponse } from 'next/server'
import { fetchTopRepositories, fetchGitHubRepoStats } from '@/lib/github'

// Token stays on the server; responses are cached for an hour
export const revalidate = 3600

export async function GET() {
  const token = process.env.GITHUB_TOKEN
  const username = process.env.GITHUB_USERNAME || 'Sukanth19'

  if (!token) {
    return NextResponse.json({ repos: [], stats: null })
  }

  const [repos, stats] = await Promise.all([
    fetchTopRepositories(username, token, 6),
    fetchGitHubRepoStats(username, token)
  ])

  return NextResponse.json({ repos, stats })
}
