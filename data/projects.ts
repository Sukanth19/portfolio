export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  technology: string[]
  features: string[]
  challenges: string[]
  learned: string[]
  status: 'ACTIVE' | 'BUILDING' | 'LIVE' | 'ARCHIVED'
  github?: string
  demo?: string
  visual: 'audio' | 'market' | 'archive' | 'canvas' | 'terminal'
}

export const projects: Project[] = [
  {
    id: 'jamr',
    title: 'jamr.io',
    tagline: 'Real-time music matchmaking',
    description: 'Platform that matches users based on shared listening taste and connects them in live Spotify Jam rooms.',
    technology: [
      'Next.js',
      'TypeScript',
      'FastAPI',
      'PostgreSQL',
      'Redis',
      'WebSockets',
      'Socket.IO',
      'Spotify API',
      'scikit-learn'
    ],
    features: [
      'Real-time taste-based matching algorithm',
      'Live Spotify Jam room integration',
      'WebSocket-powered connections',
      'Music preference analysis using ML',
      'Redis-backed session management',
      'Scalable matching queue system'
    ],
    challenges: [
      'Real-time WebSocket state synchronization across users',
      'Designing efficient matching algorithm with taste similarity scoring',
      'Handling Spotify API rate limits and token refresh',
      'Building responsive queue system for concurrent matches',
      'Implementing graceful fallback for connection failures'
    ],
    learned: [
      'Real-time system architecture patterns',
      'ML-based recommendation systems',
      'WebSocket protocol and state management',
      'API integration and rate limiting strategies',
      'Redis data structures for real-time applications'
    ],
    status: 'ACTIVE',
    github: 'https://github.com/Sukanth19/jamr.io',
    visual: 'audio'
  },
  {
    id: 'sneakernet',
    title: 'SneakerNet',
    tagline: 'Sneaker intelligence platform',
    description: 'Aggregates marketplace data to provide price tracking, resale trends, fair-value estimation, and market analysis for sneaker resale.',
    technology: [
      'Next.js',
      'FastAPI',
      'PostgreSQL',
      'Web Scraping',
      'Machine Learning',
      'TypeScript',
      'Python'
    ],
    features: [
      'Multi-marketplace data aggregation',
      'Historical price tracking and visualization',
      'Fair-value estimation algorithms',
      'Market trend analysis',
      'Future ML-based personalization system',
      'Demand prediction models'
    ],
    challenges: [
      'Reliable web scraping across different marketplace structures',
      'Data normalization from inconsistent sources',
      'Building accurate pricing models',
      'Handling marketplace anti-scraping measures',
      'Designing scalable data pipeline architecture'
    ],
    learned: [
      'Web scraping techniques and ethical considerations',
      'Data pipeline design and ETL processes',
      'Market analysis and price prediction modeling',
      'Database schema design for time-series data',
      'Building resilient scrapers with retry logic'
    ],
    status: 'BUILDING',
    visual: 'market'
  },
  {
    id: 'eidothea',
    title: 'Eidothea',
    tagline: 'It knows you\'re reading',
    description: 'Horror fiction archive and community platform. Seeded with ~3,500 creepypastas, searchable by rating and ~30 fear categories, with accounts so readers can sign up and publish their own stories. Self-hosted on an Azure VM.',
    technology: [
      'Next.js',
      'React',
      'TypeScript',
      'Motion',
      'Python',
      'FastAPI',
      'SQLite',
      'pandas',
      'Caddy',
      'Azure'
    ],
    features: [
      'Archive of ~3,500 stories imported from the DavidGetter1/creepypastas dataset',
      'Browse by rating or across ~30 fear categories',
      'Random story mode for quick reads',
      'User registration, login and session-based auth',
      'Members can write and publish their own stories',
      'Role hierarchy (owner / admin / user) for moderation',
      'Toggleable "transmission" visual effects layer'
    ],
    challenges: [
      'Cleaning and importing a large text dataset with a pandas pipeline',
      'Auto-tagging thousands of stories into consistent categories',
      'Designing an unsettling, terminal-style reading experience that stays readable',
      'Splitting the app into a FastAPI backend and a Next.js frontend',
      'Deploying both services on a single Azure VM with systemd and Caddy (auto HTTPS)'
    ],
    learned: [
      'Data ingestion and normalization with pandas',
      'Building REST APIs and session auth with FastAPI',
      'Next.js App Router with React 19 and Motion',
      'Linux server deployment: systemd units, reverse proxy, TLS, backups',
      'Designing themed UI without sacrificing long-form readability'
    ],
    status: 'LIVE',
    github: 'https://github.com/Sukanth19/eidothea',
    demo: 'https://eidothea.indiasouthcentral.cloudapp.azure.com',
    visual: 'archive'
  },

  {
    id: 'github-analyzer',
    title: 'GitHub Code Analyzer',
    tagline: 'Repository intelligence tool',
    description: 'Experimental tool that retrieves and analyzes GitHub repositories to generate engineering insights about codebases.',
    technology: [
      'Next.js',
      'TypeScript',
      'GitHub API',
      'Python'
    ],
    features: [
      'GitHub repository retrieval',
      'Codebase structure analysis',
      'Engineering insight generation',
      'Repository metadata extraction'
    ],
    challenges: [
      'Efficient repository data retrieval',
      'Parsing diverse codebase structures',
      'Generating meaningful insights from raw code',
      'Handling rate limits and authentication',
      'Building scalable analysis pipeline'
    ],
    learned: [
      'GitHub API integration patterns',
      'Repository analysis techniques',
      'Data processing pipelines',
      'Insight extraction strategies'
    ],
    status: 'BUILDING',
    visual: 'terminal'
  }
]
