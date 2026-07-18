export const profile = {
  name: 'Ali Sufiyan Khan',
  handle: 'sting-raider',
  email: 'alizaydsab@gmail.com',
  phone: '+91 91755 69485',
  github: 'https://github.com/sting-raider',
  linkedin: 'https://www.linkedin.com/in/ali-khan-4197b1217',
  resumeRepo: 'https://github.com/sting-raider/Resume',
  education: {
    school: 'Vellore Institute of Technology (VIT Vellore)',
    degree: 'B.Tech, Computer Science and Engineering',
    period: 'Aug 2023 — May 2027',
    coursework: [
      'Data Structures & Algorithms',
      'Design & Analysis of Algorithms',
      'Operating Systems',
      'Database Management Systems',
      'Artificial Intelligence',
    ],
  },
  certification: {
    name: 'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional',
    issuer: 'Oracle University',
    issued: 'Aug 2025',
    valid: 'through Aug 2027',
  },
  availability: 'Open to internships & early-career SWE / AI engineering roles',
  currently:
    'Building RoleAtlas. Exploring AI agents, reinforcement learning, robotics, and distributed systems.',
  values: ['measurable evaluation', 'honest AI outputs', 'privacy-friendly defaults'],
  creeds: [
    {
      text: 'A working system beats a beautiful mock-up.',
      source: 'OPERATOR MANIFESTO — GITHUB README',
    },
    {
      text: 'AI recommendations should be traceable instead of pretending to be magic.',
      source: 'OPERATOR MANIFESTO — GITHUB README',
    },
  ],
} as const

export const skillGroups = [
  {
    file: 'cloud-devops.manifest',
    items: [
      'Kubernetes',
      'Docker',
      'AWS (EC2)',
      'GCP',
      'Linux / Bash',
      'Tailscale',
      'Cloudflare Tunnels',
      'Portainer',
      'Netdata',
    ],
  },
  {
    file: 'languages.manifest',
    items: ['Python', 'C', 'Java', 'SQL'],
  },
  {
    file: 'ai-ml.manifest',
    items: [
      'PyTorch',
      'TensorFlow',
      'NVIDIA Isaac Lab',
      'NVIDIA Isaac Sim',
      'Stable Baselines3',
      'Gymnasium',
      'LangChain',
      'scikit-learn',
      'OpenCV',
    ],
  },
  {
    file: 'dev-tools.manifest',
    items: [
      'Git',
      'GitHub',
      'Cursor',
      'Antigravity',
      'OpenAI Codex',
      'Claude Code',
      'Hermes Agent',
      'JetBrains IDEs',
    ],
  },
] as const
