export type Status = 'operational' | 'in-progress' | 'early-stage'

export const STATUS_LABEL: Record<Status, string> = {
  operational: 'OPERATIONAL',
  'in-progress': 'IN PROGRESS',
  'early-stage': 'EARLY STAGE',
}

export const STATUS_TONE: Record<Status, 'ok' | 'warn' | 'info'> = {
  operational: 'ok',
  'in-progress': 'warn',
  'early-stage': 'info',
}

export interface Metric {
  label: string
  value: string
  unit?: string
}

export interface Phase {
  name: string
  detail: string
  state: 'done' | 'active' | 'blocked'
}

export interface Project {
  id: string
  index: string
  name: string
  tagline: string
  status: Status
  repo: string
  points: string[]
  metrics: Metric[]
  stack: string[]
  flow?: { nodes: string[]; accented?: number[]; loop?: string }
  constraints?: { title: string; items: string[] }
  phases?: Phase[]
  note?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'roleatlas',
    index: 'SYS.01',
    name: 'RoleAtlas',
    tagline: 'Qualification-first global job discovery & application workspace',
    status: 'in-progress',
    repo: 'https://github.com/sting-raider/RoleAtlas',
    featured: true,
    points: [
      'Searches a persisted <b>PostgreSQL</b> job index first, then expands verified sources through a <b>Rust crawler</b> on NATS JetStream durable queues.',
      'Resume-based suitability scoring and AI-assisted application dossiers with <b>traceable evidence, constraint checks, and truthful tailoring</b>.',
      'Global eligibility model built on ISO 3166 countries, IANA timezones, and listing-level evidence — unresolved types stay <b>Unknown</b> rather than guessing.',
      'Crawler does retries, per-host pacing, robots.txt handling, URL canonicalization, and dedup across <b>Greenhouse / Lever / Ashby</b> adapters.',
    ],
    metrics: [
      { label: 'Verified employer boards', value: '16' },
      { label: 'ATS adapters', value: '3' },
      { label: 'Public feeds supplementing', value: '5' },
      { label: 'BYO AI providers', value: '9' },
    ],
    stack: ['Next.js', 'TypeScript', 'Rust', 'NATS JetStream', 'PostgreSQL', 'Drizzle', 'Docker'],
    flow: {
      nodes: [
        'RESUME',
        'PROFILE',
        'SEARCH PLAN',
        'PG INDEX',
        'SOURCE SELECT ≤12/16',
        'NATS QUEUE',
        'RUST WORKERS',
        'RECONCILE',
        'RERANKED SESSION',
      ],
      accented: [5, 6],
    },
    constraints: {
      title: 'AI — BY DESIGN — CANNOT',
      items: [
        'decide geographic eligibility',
        'trust a source on your behalf',
        'submit an application',
        'persist your API keys server-side',
      ],
    },
    note: '<b>HONEST SCOPE:</b> 16 verified employer-controlled boards — not 16 countries, not whole-market coverage. Public feeds do not yet participate in crawler reconciliation.',
  },
  {
    id: '6dof-arm-rl',
    index: 'SYS.02',
    name: '6DOF-ARM-RL',
    tagline: 'Deep RL pick-and-place control for a UR10e arm in NVIDIA Isaac Lab',
    status: 'in-progress',
    repo: 'https://github.com/sting-raider/6DOF-arm-RL',
    points: [
      'Hybrid controller: <b>PPO</b> drives the wrist to a target-conditioned pre-grasp pose, then a <b>deterministic 6-DOF servo</b> handles descent, gripper close, lift, and one corrective retry.',
      'Vectorized environments with custom observations, reward shaping, collision handling, and curriculum progression.',
      'Target tracker rejects stale, low-confidence, non-finite, and implausibly jumping detections — built for a future physical camera.',
      'Hardware-independent pytest smoke suite; experiments and conclusions logged per-spike.',
    ],
    metrics: [
      { label: 'Phase 0 reach success', value: '256/256' },
      { label: 'Median closest distance', value: '7', unit: 'mm' },
      { label: 'Phase 1 strict lifts', value: '59.4', unit: '%' },
      { label: 'Observation space', value: '34', unit: '-dim' },
    ],
    stack: ['Python', 'PyTorch', 'NVIDIA Isaac Lab', 'Isaac Sim', 'PPO', 'RSL-RL'],
    flow: {
      nodes: [
        'PPO WRIST CONTROL',
        'PRE-GRASP POSE',
        'DETERMINISTIC SERVO',
        'DESCEND·CLOSE·LIFT',
        'RETRY ×1',
      ],
      accented: [0, 2],
    },
    phases: [
      { name: 'PHASE 0 — REACH', detail: '256/256 within 5 cm · complete', state: 'done' },
      {
        name: 'PHASE 1 — HYBRID GRASP',
        detail: '76/128 strict lifts · target ≥80%',
        state: 'active',
      },
      { name: 'PHASE 2 — PLACE', detail: 'blocked on reliable grasping', state: 'blocked' },
    ],
    note: '<b>KNOWN FAILURE MODE:</b> wrist-2 wrap during corrective-retry recovery (12 arm resets). Contact-safe preset cut gripper-integrity resets from 19 to 1.',
  },
  {
    id: 'f1-rl-agent',
    index: 'SYS.03',
    name: 'F1-RL-AGENT',
    tagline: 'PPO agent that drives F1 22 on live UDP telemetry',
    status: 'early-stage',
    repo: 'https://github.com/sting-raider/f1-rl-agent',
    points: [
      'Custom <b>Gymnasium</b> environment wrapping the game’s <b>60 Hz</b> UDP telemetry stream.',
      'Frame stacking — 4 × 18-dim frames → <b>72-dim</b> observation with virtual-LiDAR track-deviation features.',
      'Continuous steering, throttle, and brake actuated through a virtual Xbox controller via <b>vgamepad</b>.',
      'Composable reward weights, input smoothing, and an auto-reset state machine that recovers from crashes.',
    ],
    metrics: [
      { label: 'Telemetry rate', value: '60', unit: 'Hz' },
      { label: 'Observation', value: '72', unit: '-dim' },
      { label: 'Lap completion bonus', value: '+50' },
      { label: 'Off-track penalty', value: '−10' },
    ],
    stack: ['Python', 'Stable Baselines3', 'Gymnasium', 'UDP Telemetry', 'vgamepad', 'TensorBoard'],
    flow: {
      nodes: ['F1 22', 'UDP :20777', 'PARSER', '4-FRAME STACK', 'PPO [256,256]', 'VGAMEPAD'],
      accented: [4],
      loop: '↻ 60 Hz CONTROL LOOP',
    },
    note: '<b>HONEST STATUS:</b> pipeline and tooling are built and documented — no trained lap times claimed yet.',
  },
  {
    id: 'hybrid-cloud-k8s',
    index: 'SYS.04',
    name: 'HYBRID-CLOUD-K8S',
    tagline: 'Multi-cloud Kubernetes orchestration across edge, AWS, and GCP',
    status: 'operational',
    repo: 'https://github.com/sting-raider/hybrid-cloud-k8s-platform',
    points: [
      'Hybrid cluster integrating on-premise edge, <b>AWS</b>, and <b>GCP</b> nodes using <b>K3s</b> over a Tailscale mesh.',
      'Cloud bursting with public services exposed securely through <b>Cloudflare Tunnels</b>.',
      'Load-tested with distributed <b>Locust</b> runs.',
    ],
    metrics: [
      { label: 'Concurrent users sustained', value: '1,000+' },
      { label: 'Failure rate under load', value: '0', unit: '%' },
      { label: 'Environments meshed', value: '3' },
    ],
    stack: ['K3s', 'Docker', 'AWS', 'GCP', 'Tailscale', 'Cloudflare Tunnels', 'Locust'],
  },
  {
    id: 'discarchive',
    index: 'SYS.05',
    name: 'DiscArchive',
    tagline: 'Local-first search engine for Discord exports — no servers',
    status: 'early-stage',
    repo: 'https://github.com/sting-raider/DiscArchive',
    points: [
      'Instant full-text search with typo tolerance across <b>2M+ messages</b> via Meilisearch.',
      'Streaming JSON parsing — <b>400 MB</b> exports import in ~<b>50 MB</b> of RAM.',
      'Optional CLIP reverse image search; embeddings stored in SQLite.',
      'Fully local: browser-based import, no CLI, nothing leaves the machine.',
    ],
    metrics: [
      { label: 'Messages indexed', value: '2M+' },
      { label: 'Query latency', value: '<20', unit: 'ms' },
      { label: 'RAM for 400 MB import', value: '~50', unit: 'MB' },
      { label: 'Servers required', value: '0' },
    ],
    stack: ['React', 'TypeScript', 'FastAPI', 'Meilisearch', 'SQLite', 'CLIP'],
  },
  {
    id: 'dockerscope',
    index: 'SYS.06',
    name: 'DockerScope',
    tagline: 'Detects over-provisioned containers so you can right-size them',
    status: 'early-stage',
    repo: 'https://github.com/sting-raider/dockerscope',
    points: [
      'Compares actual usage vs. allocated limits per container across <b>memory, CPU, and network I/O</b>.',
      'Computes potential savings and per-container right-sizing recommendations.',
      'Exports are <b>secret-sanitized</b> — sensitive env vars stripped automatically.',
      'Live dark-terminal dashboard with container stop / restart / remove actions.',
    ],
    metrics: [
      { label: 'Efficiency floor', value: '20', unit: '%' },
      { label: 'Poll interval', value: '2', unit: 's' },
      { label: 'Idle → WASTED timer', value: '30', unit: 's' },
    ],
    stack: ['Python', 'FastAPI', 'Docker SDK', 'Chart.js', 'pytest'],
    flow: {
      nodes: ['UNKNOWN', 'HEALTHY', 'SUSPICIOUS', 'WASTED'],
      accented: [3],
    },
  },
]

export const tickerItems: string[] = [
  'ROLEATLAS ▲ 16 VERIFIED EMPLOYER BOARDS · RUST CRAWLER ON NATS JETSTREAM',
  '6DOF-ARM ▲ PHASE 0 COMPLETE — 256/256 REACH · 7 MM MEDIAN',
  'F1-RL ▲ 60 HZ UDP TELEMETRY · 72-DIM OBS · VIRTUAL GAMEPAD',
  'K8S ▲ 1,000+ CONCURRENT USERS · 0% FAILURE UNDER LOCUST',
  'DISCARCHIVE ▲ 2M+ MESSAGES · <20 MS QUERIES · FULLY LOCAL',
  'DOCKERSCOPE ▲ 4-STATE WASTE DETECTION · SECRET-SANITIZED EXPORTS',
  'STATUS ▲ OPEN TO INTERNSHIPS — SWE / AI ENGINEERING',
]
