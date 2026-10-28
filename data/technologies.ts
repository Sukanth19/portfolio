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
  { name: 'Python', category: 'Languages', usedIn: ['Shoplifting Detection', 'jamr.io', 'Eidothea', 'A.D.H.D', 'RAG/AI'], experience: ['Internship'] },
  { name: 'JavaScript', category: 'Languages', usedIn: ['Typing Tester', 'Image to ASCII'] },
  { name: 'TypeScript', category: 'Languages', usedIn: ['jamr.io', 'A.D.H.D', 'Eidothea'] },
  { name: 'Kotlin', category: 'Languages', usedIn: ['Velto'] },
  { name: 'Java', category: 'Languages', usedIn: [] },
  { name: 'C#', category: 'Languages', usedIn: ['Unity Projects'] },
  { name: 'Haskell', category: 'Languages', usedIn: [] },

  // Web
  { name: 'React', category: 'Web', usedIn: ['jamr.io', 'A.D.H.D', 'Eidothea'] },
  { name: 'Next.js', category: 'Web', usedIn: ['jamr.io', 'A.D.H.D', 'Eidothea'] },
  { name: 'FastAPI', category: 'Web', usedIn: ['jamr.io', 'A.D.H.D', 'Eidothea'] },
  { name: 'Flask', category: 'Web', usedIn: ['Shoplifting Detection'] },
  { name: 'Laravel', category: 'Web', usedIn: [], experience: ['Internship'] },
  { name: 'PHP', category: 'Web', usedIn: [], experience: ['Internship'] },
  { name: 'Nginx', category: 'Web', usedIn: [], experience: ['Internship'] },
  { name: 'HTML/CSS', category: 'Web', usedIn: ['All Web Projects'] },

  // Data/ML
  { name: 'NumPy', category: 'Data/ML', usedIn: ['jamr.io', 'ML Projects'] },
  { name: 'Pandas', category: 'Data/ML', usedIn: ['Eidothea', 'Data Analysis'] },
  { name: 'Matplotlib', category: 'Data/ML', usedIn: ['Data Visualization'] },
  { name: 'Seaborn', category: 'Data/ML', usedIn: ['Data Visualization'] },
  { name: 'scikit-learn', category: 'Data/ML', usedIn: ['jamr.io'] },
  { name: 'PyTorch', category: 'Data/ML', usedIn: ['Shoplifting Detection'] },
  { name: 'OpenCV', category: 'Data/ML', usedIn: ['Shoplifting Detection'] },

  // Databases
  { name: 'PostgreSQL', category: 'Databases', usedIn: ['jamr.io', 'A.D.H.D'] },
  { name: 'SQLite', category: 'Databases', usedIn: ['Eidothea'] },
  { name: 'MongoDB', category: 'Databases', usedIn: [] },
  { name: 'Supabase', category: 'Databases', usedIn: [] },
  { name: 'Firebase', category: 'Databases', usedIn: [] },
  { name: 'Redis', category: 'Databases', usedIn: ['jamr.io', 'A.D.H.D'] },

  // Infrastructure
  { name: 'Linux', category: 'Infrastructure', usedIn: ['Home Lab', 'All Projects'], experience: ['Internship'] },
  { name: 'Azure', category: 'Infrastructure', usedIn: ['Eidothea'] },
  { name: 'Ubuntu', category: 'Infrastructure', usedIn: [], experience: ['Internship'] },
  { name: 'AWS', category: 'Infrastructure', usedIn: [], experience: ['Internship'] },
  { name: 'EC2', category: 'Infrastructure', usedIn: [], experience: ['Internship'] },
  { name: 'Docker', category: 'Infrastructure', usedIn: ['Home Lab', 'A.D.H.D'] },
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
