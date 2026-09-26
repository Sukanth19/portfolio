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
