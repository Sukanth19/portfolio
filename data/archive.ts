export interface ArchivedProject {
  id: string
  title: string
  status: 'COMPLETED' | 'ARCHIVED' | 'ABANDONED'
  year: string
  technologies: string[]
  description: string
  why: string
  learned: string[]
}

export const archivedProjects: ArchivedProject[] = [
  {
    id: 'image-ascii',
    title: 'Image → ASCII',
    status: 'COMPLETED',
    year: '2024',
    technologies: ['Python', 'Pillow', 'JavaScript', 'Canvas API'],
    description: 'CLI and web utility for converting images to ASCII art with adjustable character density and contrast.',
    why: 'Wanted to understand image processing fundamentals and build something fun.',
    learned: [
      'Image processing and grayscale conversion algorithms',
      'CLI tool design patterns in Python',
      'Canvas API for browser-side image manipulation',
      'Character mapping optimization for visual quality'
    ]
  },
  {
    id: 'typing-tester',
    title: 'Typing Tester',
    status: 'COMPLETED',
    year: '2024',
    technologies: ['JavaScript', 'Canvas API', 'HTML5'],
    description: 'Interactive typing game with real-time WPM tracking, accuracy metrics, and combo system built with vanilla JavaScript.',
    why: 'Explore Canvas API and game loop architecture while building something practical.',
    learned: [
      'Canvas rendering optimization for smooth 60fps',
      'Game loop patterns and timing mechanisms',
      'Event-driven architecture for keyboard handling',
      'Real-time performance metrics calculation'
    ]
  }
]
