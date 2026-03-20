/**
 * Project Data
 * 
 * Sample project data for the portfolio website.
 * 
 * @see Requirements 6.2, 12.2
 */

/**
 * Project interface defining the structure of a portfolio project
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  order: number;
}

/**
 * Sample project data
 */
export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with real-time inventory management and payment processing.',
    longDescription: 'Built a comprehensive e-commerce solution featuring user authentication, product catalog, shopping cart, order management, and integrated payment processing. Implemented real-time inventory updates using WebSockets and optimized database queries for high performance.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    githubUrl: 'https://github.com/example/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.vercel.app',
    imageUrl: '/projects/ecommerce.jpg',
    featured: true,
    order: 1,
  },
  {
    id: 'project-2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team features.',
    longDescription: 'Developed a modern task management system with drag-and-drop functionality, real-time collaboration, team workspaces, and advanced filtering. Integrated with third-party APIs for calendar sync and notifications.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Material-UI'],
    githubUrl: 'https://github.com/example/task-manager',
    liveUrl: 'https://taskmanager-demo.vercel.app',
    imageUrl: '/projects/taskmanager.jpg',
    featured: true,
    order: 2,
  },
  {
    id: 'project-3',
    title: 'Weather Dashboard',
    description: 'A responsive weather dashboard with location-based forecasts and interactive maps.',
    longDescription: 'Created a weather visualization dashboard that displays current conditions, 7-day forecasts, and interactive weather maps. Features location search, geolocation support, and data visualization using charts.',
    technologies: ['Vue.js', 'TypeScript', 'OpenWeather API', 'Chart.js', 'Leaflet'],
    githubUrl: 'https://github.com/example/weather-dashboard',
    liveUrl: 'https://weather-demo.vercel.app',
    imageUrl: '/projects/weather.jpg',
    featured: false,
    order: 3,
  },
  {
    id: 'project-4',
    title: 'Portfolio CMS',
    description: 'A headless CMS for managing portfolio content with a modern admin interface.',
    longDescription: 'Built a custom content management system specifically designed for portfolio websites. Features include markdown support, image optimization, SEO management, and a user-friendly admin dashboard.',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'TipTap', 'Tailwind CSS'],
    githubUrl: 'https://github.com/example/portfolio-cms',
    imageUrl: '/projects/cms.jpg',
    featured: false,
    order: 4,
  },
  {
    id: 'project-5',
    title: 'AI Chat Interface',
    description: 'An intelligent chat interface powered by AI with context-aware responses.',
    longDescription: 'Developed a conversational AI interface with streaming responses, conversation history, and context management. Integrated with multiple AI providers and implemented rate limiting and error handling.',
    technologies: ['React', 'TypeScript', 'OpenAI API', 'Vercel AI SDK', 'Tailwind CSS'],
    githubUrl: 'https://github.com/example/ai-chat',
    liveUrl: 'https://ai-chat-demo.vercel.app',
    imageUrl: '/projects/ai-chat.jpg',
    featured: true,
    order: 5,
  },
  {
    id: 'project-6',
    title: 'Fitness Tracker',
    description: 'A mobile-responsive fitness tracking app with workout logging and progress analytics.',
    longDescription: 'Created a comprehensive fitness tracking application with workout planning, exercise logging, progress tracking, and data visualization. Features include custom workout creation, exercise library, and goal setting.',
    technologies: ['React Native', 'TypeScript', 'Firebase', 'Chart.js', 'Expo'],
    githubUrl: 'https://github.com/example/fitness-tracker',
    imageUrl: '/projects/fitness.jpg',
    featured: false,
    order: 6,
  },
];

/**
 * Get all projects sorted by order
 */
export function getProjects(): Project[] {
  return [...projects].sort((a, b) => a.order - b.order);
}

/**
 * Get featured projects only
 */
export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured).sort((a, b) => a.order - b.order);
}

/**
 * Get project by ID
 */
export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}
