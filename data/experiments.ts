export interface Experiment {
  id: string
  title: string
  description: string
  focus: string[]
  status: 'ACTIVE' | 'EXPERIMENT' | 'BUILDING' | 'ARCHIVED' | 'IDEA'
  technologies: string[]
  learning: string[]
}

export const experiments: Experiment[] = [
  {
    id: 'graphics-engine',
    title: 'Graphics Engine',
    description: 'Building a small graphics engine from scratch to understand rendering pipelines, transformations, and GPU concepts.',
    focus: [
      'Rendering pipeline architecture',
      'Transformation matrices',
      'Shader programming',
      'Mesh and geometry handling',
      'Camera systems',
      'GPU programming concepts'
    ],
    status: 'BUILDING',
    technologies: ['C++', 'OpenGL', 'GLSL', 'Linear Algebra'],
    learning: [
      'Low-level graphics programming',
      'Mathematics for 3D graphics',
      'GPU pipeline understanding',
      'Memory management in graphics contexts'
    ]
  },
  {
    id: 'game-engine',
    title: 'Game Engine',
    description: 'Experimental game engine exploring ECS architecture, scene systems, and core engine patterns.',
    focus: [
      'Entity Component System (ECS)',
      'Scene management',
      'Input handling systems',
      'Physics integration',
      'Rendering abstraction',
      'Asset management pipeline'
    ],
    status: 'EXPERIMENT',
    technologies: ['C++', 'Entity Component System', 'Game Architecture'],
    learning: [
      'Engine architecture patterns',
      'Data-oriented design',
      'Systems programming',
      'Performance optimization'
    ]
  },
  {
    id: 'rag-local-ai',
    title: 'RAG / Local AI',
    description: 'Experimenting with local LLMs, embeddings, vector databases, and retrieval systems for document understanding.',
    focus: [
      'Local LLM deployment (Ollama)',
      'Text embeddings generation',
      'Vector database operations',
      'Retrieval strategies',
      'Document processing pipelines',
      'Context window optimization'
    ],
    status: 'ACTIVE',
    technologies: ['Python', 'Ollama', 'ChromaDB', 'LangChain', 'Transformers'],
    learning: [
      'Vector similarity search',
      'Prompt engineering',
      'LLM integration patterns',
      'Semantic search implementation'
    ]
  },
  {
    id: 'cybersec-lab',
    title: 'Cybersecurity Lab',
    description: 'Hands-on exploration of networking, packet analysis, authentication systems, and security tooling.',
    focus: [
      'Network protocol analysis',
      'Linux security fundamentals',
      'Packet capture and inspection',
      'Authentication mechanisms',
      'Security tool development',
      'CTF-style challenges'
    ],
    status: 'ACTIVE',
    technologies: ['Linux', 'Python', 'Wireshark', 'Networking', 'Bash'],
    learning: [
      'Network security concepts',
      'Penetration testing basics',
      'System hardening',
      'Security tool usage'
    ]
  },
  {
    id: 'homelab',
    title: 'Home Lab',
    description: 'Self-hosted infrastructure running Linux servers, containerized services, media servers, and network monitoring.',
    focus: [
      'Linux server administration',
      'Docker containerization',
      'Jellyfin media server',
      'NAS configuration',
      'Network setup and monitoring',
      'Service orchestration'
    ],
    status: 'ACTIVE',
    technologies: ['Linux', 'Docker', 'Jellyfin', 'Networking', 'Bash'],
    learning: [
      'Infrastructure management',
      'Self-hosting practices',
      'Network administration',
      'Container orchestration'
    ]
  },
  {
    id: 'dev-tooling',
    title: 'Developer Tooling',
    description: 'Building CLI tools, code analyzers, and automation scripts to improve developer productivity.',
    focus: [
      'CLI tool development',
      'Code analysis utilities',
      'GitHub API integration',
      'Developer workflow automation',
      'Productivity tooling',
      'Script development'
    ],
    status: 'EXPERIMENT',
    technologies: ['Python', 'Bash', 'Node.js', 'GitHub API'],
    learning: [
      'Tool design principles',
      'API integration',
      'Automation patterns',
      'CLI UX design'
    ]
  }
]
