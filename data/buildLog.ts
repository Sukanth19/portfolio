export interface BuildLogEntry {
  id: string
  date: string // YYYY.MM.DD format
  title: string
  project?: string
  description?: string
  status: 'BUILT' | 'EXPERIMENT' | 'IN PROGRESS' | 'COMPLETED' | 'ARCHIVED'
  technologies?: string[]
}

export const buildLog: BuildLogEntry[] = [
  {
    id: 'websocket-sync',
    date: '2026.08.24',
    title: 'WebSocket room synchronization',
    project: 'JAMR.IO',
    description: 'Built real-time state synchronization for Spotify Jam rooms using WebSocket protocol',
    status: 'BUILT',
    technologies: ['WebSockets', 'Socket.IO', 'Redis']
  },
  {
    id: 'spotify-similarity',
    date: '2026.08.19',
    title: 'Spotify similarity experiments',
    project: 'JAMR.IO',
    description: 'Experimented with ML-based music taste similarity algorithms using scikit-learn',
    status: 'EXPERIMENT',
    technologies: ['Python', 'scikit-learn', 'Spotify API']
  },
  {
    id: 'repo-analysis-prototype',
    date: '2026.08.11',
    title: 'Repository analysis prototype',
    project: 'GITHUB CODE ANALYZER',
    description: 'Initial prototype for GitHub repository retrieval and analysis system',
    status: 'IN PROGRESS',
    technologies: ['Next.js', 'GitHub API']
  },
  {
    id: 'terminal-renderer',
    date: '2026.07.30',
    title: 'Terminal renderer experiments',
    description: 'Experimented with custom terminal emulation and rendering techniques',
    status: 'EXPERIMENT',
    technologies: ['JavaScript', 'Canvas API']
  },
  {
    id: 'graphics-experiments',
    date: '2026.07.18',
    title: 'Graphics programming experiments',
    description: 'Exploring graphics programming fundamentals and rendering techniques',
    status: 'IN PROGRESS',
    technologies: ['C++', 'OpenGL']
  }
]
