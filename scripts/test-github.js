// Test script to verify GitHub API connection
// Run with: node scripts/test-github.js

require('dotenv').config({ path: '.env.local' })

const GITHUB_API = 'https://api.github.com/graphql'
const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN
const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'Sukanth19'

async function testGitHubConnection() {
  console.log('\n🔍 Testing GitHub Integration...\n')
  
  if (!token) {
    console.error('❌ No GitHub token found!')
    console.log('📝 Create a .env.local file with:')
    console.log('   NEXT_PUBLIC_GITHUB_TOKEN=your_token_here')
    console.log('   NEXT_PUBLIC_GITHUB_USERNAME=your_username')
    process.exit(1)
  }

  console.log('✅ Token found:', token.substring(0, 10) + '...')
  console.log('✅ Username:', username)
  console.log('\n📡 Fetching data from GitHub...\n')

  const query = `
    query($username: String!) {
      user(login: $username) {
        name
        repositories(first: 10, orderBy: {field: PUSHED_AT, direction: DESC}, ownerAffiliations: OWNER, privacy: PUBLIC) {
          totalCount
          nodes {
            name
            stargazerCount
            defaultBranchRef {
              target {
                ... on Commit {
                  history(first: 3) {
                    totalCount
                    edges {
                      node {
                        oid
                        message
                        committedDate
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
      })
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.errors) {
      console.error('❌ GitHub API errors:', JSON.stringify(data.errors, null, 2))
      return
    }

    const user = data.data.user
    const repos = user.repositories

    console.log('✅ Successfully connected to GitHub!\n')
    console.log('👤 User:', user.name || username)
    console.log('📦 Total Public Repos:', repos.totalCount)
    console.log('\n📝 Recent Commits:\n')

    let commitCount = 0
    repos.nodes.forEach(repo => {
      if (repo.defaultBranchRef?.target?.history?.edges) {
        const commits = repo.defaultBranchRef.target.history.edges
        commits.forEach(({ node: commit }) => {
          commitCount++
          const date = new Date(commit.committedDate).toLocaleDateString()
          const message = commit.message.split('\n')[0].substring(0, 60)
          console.log(`  ${commitCount}. [${repo.name}] ${message}`)
          console.log(`     ${date} • ${commit.oid.substring(0, 7)}\n`)
        })
      }
    })

    console.log('🌟 Top Starred Repos:\n')
    const sortedRepos = [...repos.nodes]
      .filter(r => r.stargazerCount > 0)
      .sort((a, b) => b.stargazerCount - a.stargazerCount)
      .slice(0, 5)

    sortedRepos.forEach((repo, i) => {
      console.log(`  ${i + 1}. ${repo.name} - ⭐ ${repo.stargazerCount}`)
    })

    console.log('\n✅ GitHub integration is working perfectly!')
    console.log('🚀 Run "npm run dev" to see it live on your portfolio\n')

  } catch (error) {
    console.error('❌ Failed to fetch from GitHub:', error.message)
    
    if (error.message.includes('401')) {
      console.log('\n💡 Your token is invalid or expired.')
      console.log('   Generate a new token at: https://github.com/settings/tokens')
    } else if (error.message.includes('403')) {
      console.log('\n💡 Rate limit exceeded or token lacks permissions.')
      console.log('   Make sure your token has "public_repo" and "read:user" scopes.')
    }
  }
}

testGitHubConnection()
