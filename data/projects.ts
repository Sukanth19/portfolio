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
    github: 'https://github.com/Sukanth19/jamr',
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
    tagline: 'Archive of the unexplained',
    description: 'Knowledge archive and community platform for creepypastas, SCP lore, cryptids, unexplained phenomena, and real-life mysteries.',
    technology: [
      'Next.js',
      'TypeScript',
      'PostgreSQL',
      'Markdown',
      'Full-text Search'
    ],
    features: [
      'Classified document-style interface',
      'Full-text search across archives',
      'Community contribution system',
      'Case file categorization',
      'Investigation status tracking',
      'Related content discovery'
    ],
    challenges: [
      'Designing unique archival aesthetic',
      'Building efficient full-text search',
      'Content organization and taxonomy',
      'Community moderation system',
      'Maintaining thematic consistency'
    ],
    learned: [
      'Content management system architecture',
      'Full-text search implementation',
      'UI/UX for thematic experiences',
      'Community platform design',
      'Markdown processing and rendering'
    ],
    status: 'ACTIVE',
    visual: 'archive'
  },
  {
    id: 'typing-tester',
    title: 'Typing Tester',
    tagline: 'Canvas-based typing game',
    description: 'Interactive typing game built with vanilla JavaScript and Canvas API, featuring real-time WPM, accuracy tracking, and combo system.',
    technology: [
      'JavaScript',
      'Canvas API',
      'HTML5',
      'CSS3'
    ],
    features: [
      'Real-time WPM calculation',
      'Accuracy percentage tracking',
      'Combo multiplier system',
      'Reaction time measurement',
      'Custom word lists',
      'Visual feedback animations'
    ],
    challenges: [
      'Smooth Canvas rendering at 60fps',
      'Accurate timing and performance metrics',
      'Responsive keyboard event handling',
      'Building engaging visual feedback',
      'Optimizing Canvas draw calls'
    ],
    learned: [
      'Canvas API rendering techniques',
      'Game loop architecture',
      'Performance optimization strategies',
      'Event-driven programming patterns',
      'Real-time metrics calculation'
    ],
    status: 'LIVE',
    github: 'https://github.com/Sukanth19/typing-tester',
    demo: 'https://sukanth19.github.io/typing-tester',
    visual: 'canvas'
  },
  {
    id: 'image-ascii',
    title: 'Image to ASCII',
    tagline: 'Image conversion utility',
    description: 'CLI and web utility for converting images to ASCII art with adjustable character density, contrast, and output width.',
    technology: [
      'Python',
      'Pillow',
      'JavaScript',
      'Canvas API'
    ],
    features: [
      'Multiple character density levels',
      'Adjustable contrast and brightness',
      'Custom output width',
      'Color to grayscale conversion',
      'Export to text file',
      'Browser-based live preview'
    ],
    challenges: [
      'Optimizing image processing performance',
      'Character mapping for best visual results',
      'Handling various image formats',
      'Building intuitive CLI interface',
      'Browser-side image processing'
    ],
    learned: [
      'Image processing fundamentals',
      'CLI tool design patterns',
      'Python Pillow library usage',
      'Grayscale conversion algorithms',
      'Browser File API and Canvas manipulation'
    ],
    status: 'LIVE',
    github: 'https://github.com/Sukanth19/image-to-ascii',
    visual: 'terminal'
  }
]
