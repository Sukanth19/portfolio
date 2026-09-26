export interface Experience {
  id: string
  type: 'internship' | 'work' | 'project'
  role: string
  organization?: string
  startDate: string
  endDate: string
  duration: string
  technologies: string[]
  work: string[]
  systems: string[]
  ai?: {
    description: string
    language: string
    purpose?: string
    architecture?: string
    components?: string[]
    deployment?: string
    contribution?: string
  }
  learning: string[]
}

export const experiences: Experience[] = [
  {
    id: 'internship-2026',
    type: 'internship',
    role: 'SDE',
    startDate: 'April 2026',
    endDate: 'May 2026',
    duration: '~2 months',
    technologies: [
      'Laravel',
      'PHP',
      'AWS',
      'EC2',
      'Ubuntu',
      'Linux',
      'Nginx',
      'Python'
    ],
    work: [
      'Laravel-based web application development',
      'Backend development with PHP',
      'AWS infrastructure management',
      'EC2 server environment configuration',
      'Ubuntu/Linux system administration',
      'Nginx web server setup and configuration',
      'Deployment and configuration workflows',
      'System debugging and troubleshooting'
    ],
    systems: [
      'AWS cloud infrastructure',
      'Linux server environments',
      'Web application deployment pipelines',
      'Backend API development'
    ],
    ai: {
      description: 'Python-based AI chatbot development',
      language: 'Python',
      purpose: '[To Be Updated]',
      architecture: '[To Be Updated]',
      components: ['[To Be Updated]'],
      deployment: '[To Be Updated]',
      contribution: '[To Be Updated]'
    },
    learning: [
      'Real-world backend development practices',
      'Cloud infrastructure management with AWS',
      'Linux server administration and configuration',
      'Web server optimization and deployment',
      'AI chatbot development workflows',
      'Production environment troubleshooting'
    ]
  }
]
