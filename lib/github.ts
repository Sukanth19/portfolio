interface GitHubContribution {
  date: string
  contributionCount: number
  contributionLevel: 'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE'
}

interface GitHubStats {
  totalContributions: number
  currentStreak: number
  longestStreak: number
  contributions: GitHubContribution[]
}

interface GitHubRepoStats {
  totalRepos: number
  totalStars: number
  totalForks: number
  languages: { [key: string]: number }
}

const GITHUB_API = 'https://api.github.com/graphql'

export async function fetchGitHubContributions(username: string, token?: string): Promise<GitHubStats | null> {
  if (!token) {
    console.warn('No GitHub token provided, using mock data')
    return null
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `

  try {
    const response = await fetch(GITHUB_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username }
      }),
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.errors) {
      console.error('GitHub API errors:', data.errors)
      return null
    }

    const calendar = data.data.user.contributionsCollection.contributionCalendar
    const contributions: GitHubContribution[] = []
    
    calendar.weeks.forEach((week: any) => {
      week.contributionDays.forEach((day: any) => {
        contributions.push({
          date: day.date,
          contributionCount: day.contributionCount,
          contributionLevel: day.contributionLevel
        })
      })
    })

    // Calculate streaks
    let currentStreak = 0
    let longestStreak = 0
    let tempStreak = 0
    const today = new Date().toISOString().split('T')[0]
    
    contributions.reverse().forEach((day, index) => {
      if (day.contributionCount > 0) {
        tempStreak++
        if (index === 0 || index === 1) { // Today or yesterday
          currentStreak = tempStreak
        }
      } else {
        longestStreak = Math.max(longestStreak, tempStreak)
        if (day.date !== today) { // Don't break streak if today has no commits yet
          tempStreak = 0
        }
      }
    })
    longestStreak = Math.max(longestStreak, tempStreak)

    return {
      totalContributions: calendar.totalContributions,
      currentStreak,
      longestStreak,
      contributions: contributions.reverse()
    }
  } catch (error) {
    console.error('Failed to fetch GitHub contributions:', error)
    return null
  }
}

export async function fetchGitHubRepoStats(username: string, token?: string): Promise<GitHubRepoStats | null> {
  if (!token) {
    return null
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        repositories(first: 100, ownerAffiliations: OWNER, privacy: PUBLIC) {
          totalCount
          nodes {
            stargazerCount
            forkCount
            languages(first: 10) {
              edges {
                size
                node {
                  name
                  color
                }
              }
            }
          }
        }
      }
    }
  `

  try {
    const response = await fetch(GITHUB_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username }
      }),
      next: { revalidate: 3600 }
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.errors) {
      console.error('GitHub API errors:', data.errors)
      return null
    }

    const repos = data.data.user.repositories
    let totalStars = 0
    let totalForks = 0
    const languageBytes: { [key: string]: number } = {}

    repos.nodes.forEach((repo: any) => {
      totalStars += repo.stargazerCount
      totalForks += repo.forkCount

      repo.languages.edges.forEach((edge: any) => {
        const lang = edge.node.name
        const size = edge.size
        languageBytes[lang] = (languageBytes[lang] || 0) + size
      })
    })

    return {
      totalRepos: repos.totalCount,
      totalStars,
      totalForks,
      languages: languageBytes
    }
  } catch (error) {
    console.error('Failed to fetch GitHub repo stats:', error)
    return null
  }
}

export async function fetchGitHubUserInfo(username: string, token?: string) {
  if (!token) {
    return null
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        name
        bio
        avatarUrl
        createdAt
        followers {
          totalCount
        }
        following {
          totalCount
        }
      }
    }
  `

  try {
    const response = await fetch(GITHUB_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username }
      }),
      next: { revalidate: 86400 } // Cache for 24 hours
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.errors) {
      console.error('GitHub API errors:', data.errors)
      return null
    }

    return data.data.user
  } catch (error) {
    console.error('Failed to fetch GitHub user info:', error)
    return null
  }
}

export interface GitHubCommit {
  sha: string
  message: string
  date: string
  repoName: string
  repoUrl: string
  commitUrl: string
  additions?: number
  deletions?: number
}

export interface GitHubRepoInfo {
  name: string
  fullName: string
  description: string
  stars: number
  forks: number
  language: string
  url: string
  updatedAt: string
}

// Newest first, with at most `perRepo` commits from any one repo so the log shows
// activity across projects instead of a single busy repo
function pickRecentCommits(commits: GitHubCommit[], limit: number, perRepo: number = 3) {
  const sorted = [...commits].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const counts: Record<string, number> = {}
  const picked = sorted.filter(commit => {
    counts[commit.repoName] = (counts[commit.repoName] || 0) + 1
    return counts[commit.repoName] <= perRepo
  })
  return picked.slice(0, limit)
}

export async function fetchRecentCommits(
  username: string, 
  token?: string, 
  limit: number = 10
): Promise<GitHubCommit[]> {
  if (!token) {
    console.warn('No GitHub token provided for commits')
    return []
  }

  // Query to get recent repositories with commits
  const query = `
    query($username: String!) {
      user(login: $username) {
        repositories(
          first: 10, 
          orderBy: {field: PUSHED_AT, direction: DESC}, 
          ownerAffiliations: OWNER,
          privacy: PUBLIC,
          isFork: false
        ) {
          nodes {
            name
            url
            defaultBranchRef {
              target {
                ... on Commit {
                  history(first: 10) {
                    edges {
                      node {
                        oid
                        message
                        committedDate
                        additions
                        deletions
                        url
                        author {
                          user {
                            login
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  try {
    const response = await fetch(GITHUB_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username }
      }),
      next: { revalidate: 300 } // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.errors) {
      console.error('GitHub API errors:', data.errors)
      return []
    }

    const commits: GitHubCommit[] = []
    const repos = data.data.user.repositories.nodes

    repos.forEach((repo: any) => {
      if (repo.defaultBranchRef?.target?.history?.edges) {
        repo.defaultBranchRef.target.history.edges.forEach((edge: any) => {
          const commit = edge.node
          // Skip commits by other people (e.g. collaborators, template history)
          const login = commit.author?.user?.login
          if (login && login.toLowerCase() !== username.toLowerCase()) return
          commits.push({
            sha: commit.oid,
            message: commit.message,
            date: commit.committedDate,
            repoName: repo.name,
            repoUrl: repo.url,
            commitUrl: commit.url,
            additions: commit.additions,
            deletions: commit.deletions
          })
        })
      }
    })

    return pickRecentCommits(commits, limit)
  } catch (error) {
    console.error('Failed to fetch recent commits:', error)
    return []
  }
}

export async function fetchTopRepositories(
  username: string, 
  token?: string, 
  limit: number = 10
): Promise<GitHubRepoInfo[]> {
  if (!token) {
    console.warn('No GitHub token provided for repositories')
    return []
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        repositories(
          first: 50, 
          orderBy: {field: STARGAZERS, direction: DESC},
          ownerAffiliations: OWNER,
          privacy: PUBLIC,
          isFork: false
        ) {
          nodes {
            name
            nameWithOwner
            description
            stargazerCount
            forkCount
            primaryLanguage {
              name
            }
            url
            updatedAt
          }
        }
      }
    }
  `

  try {
    const response = await fetch(GITHUB_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username }
      }),
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.errors) {
      console.error('GitHub API errors:', data.errors)
      return []
    }

    const repos: GitHubRepoInfo[] = data.data.user.repositories.nodes
      .map((repo: any) => ({
        name: repo.name,
        fullName: repo.nameWithOwner,
        description: repo.description || '',
        stars: repo.stargazerCount,
        forks: repo.forkCount,
        language: repo.primaryLanguage?.name || 'Unknown',
        url: repo.url,
        updatedAt: repo.updatedAt
      }))
      .slice(0, limit)

    return repos
  } catch (error) {
    console.error('Failed to fetch top repositories:', error)
    return []
  }
}

export async function fetchGitHubTotalStats(username: string, token?: string) {
  if (!token) {
    return null
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        repositories(ownerAffiliations: OWNER, privacy: PUBLIC) {
          totalCount
        }
        contributionsCollection {
          totalCommitContributions
          totalPullRequestContributions
          totalIssueContributions
          totalRepositoryContributions
        }
      }
    }
  `

  try {
    const response = await fetch(GITHUB_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { username }
      }),
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.errors) {
      console.error('GitHub API errors:', data.errors)
      return null
    }

    return {
      totalRepos: data.data.user.repositories.totalCount,
      totalCommits: data.data.user.contributionsCollection.totalCommitContributions,
      totalPRs: data.data.user.contributionsCollection.totalPullRequestContributions,
      totalIssues: data.data.user.contributionsCollection.totalIssueContributions,
      totalReposCreated: data.data.user.contributionsCollection.totalRepositoryContributions
    }
  } catch (error) {
    console.error('Failed to fetch GitHub total stats:', error)
    return null
  }
}

// Token-less fallbacks using the public REST API (60 req/hour per IP, so results are cached)
const GITHUB_REST = 'https://api.github.com'
const REST_HEADERS = {
  'Accept': 'application/vnd.github+json',
  'User-Agent': 'sukanth-portfolio',
}

export async function fetchRecentCommitsPublic(
  username: string,
  limit: number = 10
): Promise<GitHubCommit[]> {
  try {
    const reposRes = await fetch(
      `${GITHUB_REST}/users/${username}/repos?type=owner&sort=pushed&per_page=15`,
      { headers: REST_HEADERS, next: { revalidate: 600 } }
    )
    if (!reposRes.ok) throw new Error(`GitHub API error: ${reposRes.status}`)

    const repos = (await reposRes.json())
      .filter((repo: any) => !repo.fork && repo.size > 0)
      .slice(0, 6)

    const perRepo = await Promise.all(
      repos.map(async (repo: any): Promise<GitHubCommit[]> => {
        const res = await fetch(
          `${GITHUB_REST}/repos/${repo.full_name}/commits?author=${username}&per_page=5`,
          { headers: REST_HEADERS, next: { revalidate: 600 } }
        )
        if (!res.ok) return []

        return (await res.json()).map((item: any) => ({
          sha: item.sha,
          message: item.commit.message,
          date: item.commit.author?.date || item.commit.committer?.date,
          repoName: repo.name,
          repoUrl: repo.html_url,
          commitUrl: item.html_url,
        }))
      })
    )

    return pickRecentCommits(perRepo.flat(), limit)
  } catch (error) {
    console.error('Failed to fetch public commits:', error)
    return []
  }
}

export async function fetchGitHubTotalStatsPublic(username: string) {
  try {
    const res = await fetch(`${GITHUB_REST}/users/${username}`, {
      headers: REST_HEADERS,
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)

    const user = await res.json()
    return { totalRepos: user.public_repos as number, totalCommits: null }
  } catch (error) {
    console.error('Failed to fetch public GitHub stats:', error)
    return null
  }
}

export async function fetchTopRepositoriesPublic(username: string, limit: number = 6) {
  try {
    const res = await fetch(
      `${GITHUB_REST}/users/${username}/repos?type=owner&per_page=100`,
      { headers: REST_HEADERS, next: { revalidate: 3600 } }
    )
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)

    const all = (await res.json()).filter((repo: any) => !repo.fork)

    const repos: GitHubRepoInfo[] = all
      .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
      .slice(0, limit)
      .map((repo: any) => ({
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description || '',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language || 'Unknown',
        url: repo.html_url,
        updatedAt: repo.updated_at
      }))

    const stats = {
      totalRepos: all.length,
      totalStars: all.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0),
      totalForks: all.reduce((sum: number, repo: any) => sum + repo.forks_count, 0),
    }

    return { repos, stats }
  } catch (error) {
    console.error('Failed to fetch public repositories:', error)
    return { repos: [], stats: null }
  }
}
