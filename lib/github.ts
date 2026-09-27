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
          privacy: PUBLIC
        ) {
          nodes {
            name
            url
            defaultBranchRef {
              target {
                ... on Commit {
                  history(first: 5) {
                    edges {
                      node {
                        oid
                        message
                        committedDate
                        additions
                        deletions
                        url
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

    // Sort by date and limit
    commits.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    return commits.slice(0, limit)
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
          privacy: PUBLIC
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
