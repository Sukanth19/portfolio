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
    id: 'shoplifting-detection',
    title: 'Shoplifting Detection',
    tagline: 'Catches sticky fingers on CCTV',
    description: 'Flags suspicious moments in retail CCTV footage using a Transformer over Video Swin features. Upload a video and it shows when something looks off. 87.6% AUC on shoplifting.',
    technology: [
      'PyTorch',
      'Video Swin',
      'Transformers',
      'OpenCV',
      'Flask',
      'Python'
    ],
    features: [
      'Weakly supervised video anomaly detection (Multi-Sequence Learning, AAAI 2022)',
      'Video Swin-B features per 16-frame snippet, scored by a Transformer encoder',
      'Upload footage and get an annotated video, score chart and list of suspicious intervals',
      'Dataset explorer comparing predictions with ground truth on UCF-Crime and ShanghaiTech',
      'Alarm threshold set from held-out normal footage (~1% false alarms), not hand-picked',
      '87.6% AUC on shoplifting, 80.4% frame AUC on UCF-Crime, 92.6% on ShanghaiTech'
    ],
    challenges: [
      'The original web app was never connected to the model (it returned random scores)',
      'Previous training scripts trained on the test set; rebuilt training on the real train split',
      'NaN scores in 40% of videos from fully padded attention windows',
      'Matching new-video features to the authors\' feature statistics so the model generalizes',
      'Picking checkpoints with only video-level labels (+4.7 AUC from selecting within the last stage)'
    ],
    learned: [
      'Weakly supervised learning and self-training',
      'Video feature extraction with Video Swin',
      'Proper evaluation protocols and avoiding data leakage',
      'Debugging attention masks and padding in Transformers',
      'Being honest about limits: detection is stronger than localization'
    ],
    status: 'ACTIVE',
    github: 'https://github.com/Sukanth19/intelligent-shoplifitng-detection',
    visual: 'canvas'
  },
  {
    id: 'adhd',
    title: 'A.D.H.D',
    tagline: 'Where do students actually go?',
    description: 'A student-built map of everything worth doing around campus, with trust scores and verified reviews.',
    technology: [
      'Next.js',
      'TypeScript',
      'FastAPI',
      'PostgreSQL',
      'PostGIS',
      'Redis',
      'Mapbox',
      'Docker'
    ],
    features: [
      'Map of places around campus, organized by college community',
      'Structured student experiences instead of plain star ratings',
      'Trust scores, verification history and provenance for every piece of info',
      'Reputation-based contribution quality',
      'Geospatial search with PostGIS',
      'Privacy-respecting: no continuous tracking, aggregated analytics only'
    ],
    challenges: [
      'Designing a trust and verification system people can actually rely on',
      'Modelling structured experiences (cost, timing, vibe) rather than free text',
      'Geospatial queries and indexing with PostGIS',
      'Caching and rate limiting with Redis'
    ],
    learned: [
      'Geospatial data modelling',
      'Designing for trust and data provenance',
      'FastAPI service and repository layering',
      'Running a multi-service stack with Docker Compose'
    ],
    status: 'BUILDING',
    github: 'https://github.com/Sukanth19/A.D.H.D',
    visual: 'market'
  },
  {
    id: 'jamr',
    title: 'jamr.io',
    tagline: 'Real-time music matchmaking',
    description: 'Matches people by Spotify listening taste and drops them into live rooms that link to Spotify Jams.',
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
    id: 'velto',
    title: 'Velto',
    tagline: 'The to-do app that decides for you',
    description: 'An Android to-do app that picks your next task for you, then starts a focus timer in one tap.',
    technology: [
      'Kotlin',
      'Jetpack Compose',
      'Material 3',
      'Room',
      'Hilt',
      'WorkManager',
      'Kotest'
    ],
    features: [
      'Decision engine that scores tasks by urgency, importance, effort and energy',
      '"Just Start" mode: picks the best task, starts a Pomodoro timer and enters focus mode in one tap',
      'Distraction-free focus screen',
      'Home screen widgets built with Glance',
      'Offline-first storage with Room and DataStore'
    ],
    challenges: [
      'Turning fuzzy task attributes into a single, sensible recommendation',
      'Keeping the flow down to one tap with zero decisions',
      'Structuring the app with MVVM and Clean Architecture',
      'Property-based testing for the recommendation logic'
    ],
    learned: [
      'Native Android development with Jetpack Compose',
      'Dependency injection with Hilt',
      'Kotlin Coroutines and Flow',
      'Property-based testing with Kotest'
    ],
    status: 'BUILDING',
    github: 'https://github.com/Sukanth19/velto',
    visual: 'terminal'
  },
  {
    id: 'eidothea',
    title: 'Eidothea',
    tagline: 'It knows you\'re reading',
    description: 'A dark archive of creepypastas, SCP entries, cryptids and game lore. Canon pages stay clean, and theories go in discussion threads. Self-hosted on an Azure VM.',
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
      'Discussion threads under each entry, so theories never touch the canon page',
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
  }
]
