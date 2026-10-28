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
    role: 'SDE Intern',
    organization: 'IMIK Technologies',
    startDate: 'April 2026',
    endDate: 'May 2026',
    duration: '~2 months',
    technologies: [
      'Laravel',
      'PHP',
      'Livewire',
      'Tailwind CSS',
      'MySQL',
      'AWS',
      'EC2',
      'Ubuntu',
      'Nginx',
      'Python'
    ],
    work: [
      'Revamped the entire UI of Coir Power, IMIK\'s IoT platform for monitoring power, production and water usage in coir manufacturing units',
      'Built an AI chatbot for the platform in Python',
      'Hosted the Laravel 12 app on AWS EC2 (Ubuntu, Nginx, MySQL)',
      'Configured server environments and deployment workflows',
      'Debugged and troubleshot issues in production'
    ],
    systems: [
      'Coir Power IoT monitoring platform',
      'AWS cloud infrastructure',
      'Linux server environments',
      'Web application deployment pipelines'
    ],
    ai: {
      description: 'AI chatbot built for the Coir Power platform',
      language: 'Python'
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
