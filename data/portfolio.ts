export type Project = {
  slug: string;
  shortName: string;
  title: string;
  world: string;
  kind: string;
  summary: string;
  status: string;
  accent: string;
  metric: string;
  metricLabel: string;
  stack: string[];
  features: string[];
  challenges: { title: string; body: string }[];
  architecture: { name: string; tech: string; role: string }[];
  learned: string;
};

export const projects: Project[] = [
  {
    slug: "roleatlas",
    shortName: "RoleAtlas",
    title: "AI-assisted global job discovery",
    world: "The Signal Atlas",
    kind: "Distributed product system",
    summary:
      "A qualification-first workspace for discovering, ranking, saving, and tracking global internships and entry-level roles.",
    status: "Building now",
    accent: "var(--pink)",
    metric: "Traceable",
    metricLabel: "AI recommendations",
    stack: ["Next.js", "TypeScript", "Rust", "NATS JetStream", "PostgreSQL", "Docker"],
    features: [
      "Resume-based suitability scoring backed by visible evidence",
      "Constraint checks and truthful application tailoring",
      "Structured ATS ingestion with responsible crawling controls",
      "Durable queues, retries, deduplication, and saved search plans",
    ],
    challenges: [
      {
        title: "Duplicate listings",
        body: "The same role can arrive through several providers. Normalization and durable identifiers merge copies without hiding legitimate variants.",
      },
      {
        title: "Crawler reliability",
        body: "External sources fail and change. Durable queues, retries, and source-aware controls keep partial failures from becoming lost work.",
      },
      {
        title: "Truthful AI",
        body: "Suitability output must be useful without inventing credentials. Evidence links and explicit constraint checks keep recommendations inspectable.",
      },
    ],
    architecture: [
      { name: "Workspace", tech: "Next.js", role: "Search, ranking, dossiers" },
      { name: "API core", tech: "TypeScript", role: "Plans, users, saved roles" },
      { name: "Event river", tech: "NATS JetStream", role: "Durable crawl jobs" },
      { name: "Crawler fleet", tech: "Rust", role: "Responsible ATS ingestion" },
      { name: "Evidence vault", tech: "PostgreSQL", role: "Normalized roles and proof" },
    ],
    learned: "Good AI product design is mostly about making uncertainty and evidence visible to the person making the decision.",
  },
  {
    slug: "robotic-arm",
    shortName: "6DOF Robot",
    title: "Reinforcement learning for robotic pick-and-place",
    world: "The Motion Forge",
    kind: "Robotics + deep RL",
    summary:
      "A UR10e and Robotiq 2F-85 simulation learning staged reaching, grasping, lifting, and placement in NVIDIA Isaac Lab.",
    status: "Phase 0 complete",
    accent: "var(--cyan)",
    metric: "6 DOF",
    metricLabel: "controlled arm motion",
    stack: ["Python", "PyTorch", "NVIDIA Isaac Lab", "Isaac Sim", "PPO"],
    features: [
      "Vectorized training environments",
      "Custom task observations and reward shaping",
      "Collision handling and curriculum progression",
      "Staged reach, grasp, lift, and placement objectives",
    ],
    challenges: [
      {
        title: "Sparse success",
        body: "A full pick-and-place reward arrives too late for early learning. Staged objectives provide useful intermediate signals.",
      },
      {
        title: "Simulation stability",
        body: "Contact-heavy manipulation is sensitive to setup. Collision handling and controlled curriculum changes keep training interpretable.",
      },
    ],
    architecture: [
      { name: "Policy", tech: "PPO / PyTorch", role: "Produces joint actions" },
      { name: "Task", tech: "Isaac Lab", role: "Observations, rewards, resets" },
      { name: "World", tech: "Isaac Sim", role: "Parallel physics simulation" },
      { name: "Robot", tech: "UR10e + 2F-85", role: "Reach and manipulate" },
    ],
    learned: "Reward design is an interface between an engineering goal and what an agent can actually discover.",
  },
  {
    slug: "hybrid-kubernetes",
    shortName: "Hybrid K3s",
    title: "Hybrid multi-cloud Kubernetes platform",
    world: "The Cloud Relay",
    kind: "Cloud infrastructure",
    summary:
      "A K3s cluster spanning an on-premise edge node, AWS, and GCP with secure networking and cloudbursting.",
    status: "Load-tested",
    accent: "var(--gold)",
    metric: "1,000+",
    metricLabel: "concurrent users, 0% failures",
    stack: ["K3s", "Docker", "AWS", "GCP", "Tailscale", "Cloudflare Tunnels", "Locust"],
    features: [
      "Cross-cloud overlay networking through Tailscale",
      "Secure public exposure with Cloudflare Tunnels",
      "Cloudbursting across heterogeneous nodes",
      "Distributed Locust performance testing",
    ],
    challenges: [
      {
        title: "Network boundaries",
        body: "Nodes live behind different networks and providers. An encrypted overlay creates stable private connectivity without opening broad inbound access.",
      },
      {
        title: "Uneven capacity",
        body: "Edge and cloud nodes have different resources. Placement and load tests expose where cloudbursting helps rather than merely moving the bottleneck.",
      },
    ],
    architecture: [
      { name: "Edge control", tech: "K3s", role: "Cluster coordination" },
      { name: "Private mesh", tech: "Tailscale", role: "Cross-provider network" },
      { name: "Burst nodes", tech: "AWS + GCP", role: "Elastic workload capacity" },
      { name: "Public gate", tech: "Cloudflare", role: "Secured service exposure" },
      { name: "Load station", tech: "Locust", role: "Distributed validation" },
    ],
    learned: "Cloud portability is less about identical providers and more about explicit networking, scheduling, and failure assumptions.",
  },
  {
    slug: "f1-agent",
    shortName: "F1 Agent",
    title: "PPO racing agent driven by live telemetry",
    world: "The Telemetry Circuit",
    kind: "Applied reinforcement learning",
    summary:
      "An autonomous F1 22 racing agent that reads live UDP telemetry and drives through a virtual Xbox controller.",
    status: "Working prototype",
    accent: "var(--violet)",
    metric: "60 Hz",
    metricLabel: "telemetry processing",
    stack: ["Python", "Stable Baselines3", "Gymnasium", "UDP Telemetry", "vgamepad"],
    features: [
      "60 Hz game telemetry parser",
      "Custom Gymnasium environment",
      "Virtual-LiDAR track-deviation features",
      "Continuous steering, throttle, and braking",
    ],
    challenges: [
      {
        title: "Seeing the track",
        body: "Raw game packets are not a useful driving representation. Virtual-LiDAR features turn track deviation into an observation the policy can learn from.",
      },
      {
        title: "Real-time control",
        body: "Telemetry and controller output must remain synchronized. A steady loop prevents stale observations from producing unstable actions.",
      },
    ],
    architecture: [
      { name: "F1 22", tech: "UDP", role: "Streams live telemetry" },
      { name: "Parser", tech: "Python", role: "Builds 60 Hz state" },
      { name: "Track model", tech: "Virtual LiDAR", role: "Represents boundaries" },
      { name: "Policy", tech: "PPO", role: "Chooses continuous controls" },
      { name: "Driver", tech: "vgamepad", role: "Sends controller input" },
    ],
    learned: "A strong observation space can matter more than a more complicated learning algorithm.",
  },
];

export const skillGroups = [
  {
    title: "AI + Robotics",
    level: "Core",
    skills: ["PyTorch", "TensorFlow", "Isaac Lab", "Isaac Sim", "Stable Baselines3", "Gymnasium", "LangChain", "OpenCV"],
    evidence: "Robotic manipulation, live-game agents, and evidence-grounded AI workflows.",
  },
  {
    title: "Cloud + DevOps",
    level: "Core",
    skills: ["Kubernetes", "Docker", "AWS", "GCP", "Linux", "Tailscale", "Cloudflare Tunnels", "Portainer"],
    evidence: "Built and load-tested a hybrid cluster across edge, AWS, and GCP.",
  },
  {
    title: "Languages",
    level: "Working",
    skills: ["Python", "TypeScript", "Rust", "C", "Java", "SQL"],
    evidence: "Used across distributed products, RL environments, systems work, and coursework.",
  },
  {
    title: "Builder tools",
    level: "Daily",
    skills: ["Git", "GitHub", "NATS JetStream", "PostgreSQL", "JetBrains IDEs", "OpenAI Codex"],
    evidence: "Tools used to ship, inspect, and operate real project systems.",
  },
];

export const navItems = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/journey", label: "Journey" },
  { href: "/contact", label: "Contact" },
];
