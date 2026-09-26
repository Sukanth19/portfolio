export interface Technology {
  name: string
  category: 'Languages' | 'Web' | 'Data/ML' | 'Databases' | 'Infrastructure' | 'GameDev' | 'Tools'
  usedIn: string[]
  experience?: string[]
}

export const technologies: Technology[] = [
  // Languages
  { name: 'C', category: 'Languages', usedIn: ['Graphics Engine', 'Systems Programming'] },
  { name: 'C++', category: 'Languages', usedIn: ['Graphics Engine', 'Game Engine'] },
  { name: 'Python', category: 'Languages', usedIn: ['SneakerNet', 'jamr.io', 'RAG/AI', 'Image to ASCII'], experience: ['Internship'] },
  { name: 'JavaScript', category: 'Languages', usedIn: ['Typing Tester', 'Image to ASCII'] },
  { name: 'TypeScript', category: 'Languages', usedIn: ['jamr.io', 'SneakerNet', 'Eidothea'] },
  { name: 'Java', category: 'Languages', usedIn: [] },
  { name: 'C#', category: 'Languages', usedIn: ['Unity Projects'] },
  { name: 'Haskell', category: 'Languages', usedIn: [] },

  // Web
  { name: 'React', category: 'Web', usedIn: ['jamr.io', 'SneakerNet', 'Eidothea'] },
  { name: 'Next.js', category: 'Web', usedIn: ['jamr.io', 'SneakerNet', 'Eidothea'] },
  { name: 'FastAPI', category: 'Web', usedIn: ['jamr.io', 'SneakerNet'] },
  { name: 'Flask', category: 'Web', usedIn: [] },
  { name: 'Laravel', category: 'Web', usedIn: [], experience: ['Internship'] },
  { name: 'PHP', category: 'Web', usedIn: [], experience: ['Internship'] },
  { name: 'Nginx', category: 'Web', usedIn: [], experience: ['Internship'] },
  { name: 'HTML/CSS', category: 'Web', usedIn: ['All Web Projects'] },

  // Data/ML
  { name: 'NumPy', category: 'Data/ML', usedIn: ['jamr.io', 'ML Projects'] },
  { name: 'Pandas', category: 'Data/ML', usedIn: ['SneakerNet', 'Data Analysis'] },
  { name: 'Matplotlib', category: 'Data/ML', usedIn: ['Data Visualization'] },
  { name: 'Seaborn', category: 'Data/ML', usedIn: ['Data Visualization'] },
  { name: 'scikit-learn', category: 'Data/ML', usedIn: ['jamr.io'] },

  // Databases
  { name: 'PostgreSQL', category: 'Databases', usedIn: ['jamr.io', 'SneakerNet', 'Eidothea'] },
  { name: 'MongoDB', category: 'Databases', usedIn: [] },
  { name: 'Supabase', category: 'Databases', usedIn: [] },
  { name: 'Firebase', category: 'Databases', usedIn: [] },
  { name: 'Redis', category: 'Databases', usedIn: ['jamr.io'] },

  // Infrastructure
  { name: 'Linux', category: 'Infrastructure', usedIn: ['Home Lab', 'All Projects'], experience: ['Internship'] },
  { name: 'Ubuntu', category: 'Infrastructure', usedIn: [], experience: ['Internship'] },
  { name: 'AWS', category: 'Infrastructure', usedIn: [], experience: ['Internship'] },
  { name: 'EC2', category: 'Infrastructure', usedIn: [], experience: ['Internship'] },
  { name: 'Docker', category: 'Infrastructure', usedIn: ['Home Lab', 'Deployment'] },
  { name: 'Kubernetes', category: 'Infrastructure', usedIn: [] },
  { name: 'Bash', category: 'Infrastructure', usedIn: ['Scripts', 'Automation'] },
  { name: 'Git', category: 'Infrastructure', usedIn: ['All Projects'] },
  { name: 'GitHub', category: 'Infrastructure', usedIn: ['All Projects'] },

  // Game Dev
  { name: 'Unity', category: 'GameDev', usedIn: [] },
  { name: 'Godot', category: 'GameDev', usedIn: [] },
  { name: 'Blender', category: 'GameDev', usedIn: [] },

  // Tools
  { name: 'Neovim', category: 'Tools', usedIn: ['Daily Driver'] },
  { name: 'Postman', category: 'Tools', usedIn: ['API Development'] },
]
