export interface Experiment {
  id: string
  title: string
  description: string
  focus: string[]
  status: 'ACTIVE' | 'EXPERIMENT' | 'BUILDING' | 'ARCHIVED' | 'IDEA'
  technologies: string[]
  learning: string[]
  /** Clicking the card opens a diagram of how it works */
  diagram?: 'homelab' | 'cyberlab'
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
    description: 'A sealed-off hacking playground on my laptop. A Kali VM attacks deliberately vulnerable machines on an isolated virtual network, while Wazuh plays blue team and tries to catch it.',
    focus: [
      'Recon and enumeration with nmap',
      'Exploiting services with Metasploit',
      'Web vulns: SQL injection, XSS, broken auth',
      'Reading logs and alerts in Wazuh',
      'Packet capture and inspection with Wireshark',
      'Snapshot, break, roll back, repeat'
    ],
    status: 'ACTIVE',
    technologies: ['Kali Linux', 'QEMU/KVM', 'Metasploit', 'Burp Suite', 'Wazuh', 'Wireshark'],
    diagram: 'cyberlab',
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
    description: 'An old laptop brought back as a home server. Jellyfin streams my movies and shows to every screen in the house, and a NAS share keeps all the files in one place.',
    focus: [
      'Turning old hardware into an always-on Linux server',
      'Jellyfin media server in Docker',
      'NAS file share over Samba',
      'Home network setup',
      'Keeping it running headless over SSH'
    ],
    status: 'ACTIVE',
    technologies: ['Linux', 'Docker', 'Jellyfin', 'Samba', 'SSH'],
    diagram: 'homelab',
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
