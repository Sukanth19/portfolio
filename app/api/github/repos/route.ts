import { NextResponse } from 'next/server'
import { fetchTopRepositories, fetchGitHubRepoStats, fetchTopRepositoriesPublic } from '@/lib/github'

// Token stays on the server; responses are cached for an hour
export const revalidate = 3600

export async function GET() {
  const token = process.env.GITHUB_TOKEN
  const username = process.env.GITHUB_USERNAME || 'Sukanth19'

  if (token) {
    const [repos, stats] = await Promise.all([
      fetchTopRepositories(username, token, 6),
      fetchGitHubRepoStats(username, token)
    ])
    if (repos.length > 0) {
      return NextResponse.json({ repos, stats })
    }
  }

  // No token (or it failed): fall back to the public REST API
  return NextResponse.json(await fetchTopRepositoriesPublic(username, 6))
}
