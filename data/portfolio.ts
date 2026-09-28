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
  repository?: string;
  demo?: string;
  demoLabel?: string;
  note?: string;
};

export const projects: Project[] = [
  {
    slug: "dante",
    shortName: "DANTE",
    title: "Commerce that remembers the promise",
    world: "The Promise Ledger",
    kind: "Agentic commerce",
    summary: "A buyer-side runtime that turns purchase intent into verifiable promises, follows fulfillment, and resolves breaches through policy-gated payments and refunds.",
    status: "End-to-end verified",
    accent: "var(--pink)",
    metric: "197 / 197",
    metricLabel: "deterministic evaluation cases passed",
    repository: "https://github.com/sting-raider/project-dante",
    stack: ["Python", "FastAPI", "Next.js", "TypeScript", "PostgreSQL", "Razorpay"],
    features: [
      "Compiles buyer intent into typed constraints and evaluates offers deterministically",
      "Freezes evidence-backed merchant promises into a hashed purchase contract",
      "Builds a purchase-rights graph connecting promises, evidence, breaches, and remedies",
      "Verifies signed webhooks and executes idempotent, policy-approved test-mode refunds",
    ],
    challenges: [
      { title: "Who controls the money?", body: "AI can propose an action, but deterministic services validate the contract, amount, authorization, and policy before any payment or refund executes." },
      { title: "Events arrive twice", body: "Duplicate and out-of-order webhooks reconcile into the same purchase state. Raw-body HMAC verification and idempotency keys protect the execution boundary." },
      { title: "Promises need proof", body: "Material promises retain typed values, source evidence, and a contract hash so a later remedy can be traced back to the buyer's original intent." },
    ],
    architecture: [
      { name: "Buyer brief", tech: "Next.js", role: "Intent, offers, and consent" },
      { name: "Promise ledger", tech: "FastAPI", role: "Typed, hashed contracts" },
      { name: "Payment gate", tech: "Razorpay", role: "Signed test-mode events" },
      { name: "Rights graph", tech: "Domain engine", role: "Evidence and remedies" },
      { name: "Audit record", tech: "PostgreSQL", role: "Durable event history" },
    ],
    note: "Payments and refunds use Razorpay Test Mode or an explicit sandbox. The merchant catalog and fulfillment are simulated; no real-money or legal-rights claim is made.",
    learned: "An agent can suggest what should happen. Financial authority needs a smaller, deterministic system that can explain exactly why it allowed it.",
  },
  {
    slug: "superjoin",
    shortName: "Project SuperJoin",
    title: "Financial facts with an evidence trail",
    world: "The Evidence Library",
    kind: "Document intelligence",
    summary: "A temporal knowledge layer that turns financial PDFs into inspectable claims, reconciles conflicting interpretations, and gates which facts downstream software may use.",
    status: "Working system",
    accent: "var(--gold)",
    metric: "4 outcomes",
    metricLabel: "allow, block, needs context, needs review",
    repository: "https://github.com/sting-raider/project-superjoin",
    stack: ["Python", "TypeScript", "SQLite", "FTS5", "LiteParse", "Docker"],
    features: [
      "Exact PDF evidence anchors attached to immutable source claims",
      "Versioned fact families that preserve conflicts, alternatives, and review history",
      "Bounded extraction with checkpoints, caching, rate-limit handling, and cost telemetry",
      "Hybrid lexical/vector retrieval with independently configurable model providers",
    ],
    challenges: [
      { title: "A number without context", body: "Normalization retains entity, period, unit, and modality. Similar-looking values are not merged when their meanings are incompatible." },
      { title: "Conflicting sources", body: "Source claims remain immutable while interpretations evolve. Review history and committed revisions let a downstream consumer inspect the decision." },
      { title: "Safe consumption", body: "The Trust Gate returns explicit decisions and reasons. Provisional, contested, or stale-reviewed values cannot silently become executable facts." },
    ],
    architecture: [
      { name: "Documents", tech: "LiteParse / OCR", role: "Text and page geometry" },
      { name: "Claims", tech: "Extraction roles", role: "Grounded source statements" },
      { name: "Fact families", tech: "SQLite WAL", role: "Versions and relationships" },
      { name: "Retrieval", tech: "FTS5 + vectors", role: "Relevant evidence" },
      { name: "Trust Gate", tech: "Policy engine", role: "Committed facts only" },
    ],
    note: "Complex scans and ambiguous tables can require review. Source agreement is evidence of agreement, not independent proof of truth; the SQLite deployment targets single-team workloads.",
    learned: "The useful output is not just a value. It is a value, its context, its history, and a clear answer about whether another system should trust it.",
  },
  {
    slug: "aegisflow",
    shortName: "AegisFlow",
    title: "Network signals, explained in real time",
    world: "The Signal Watchtower",
    kind: "Security + machine learning",
    summary: "An adaptive network intrusion detection platform combining hybrid ML, Suricata signatures, incident grouping, and a live network-intelligence dashboard.",
    status: "Demoable · research ongoing",
    accent: "var(--cyan)",
    metric: "238 tests",
    metricLabel: "latest documented local validation",
    repository: "https://github.com/sting-raider/AegisFlow",
    stack: ["Python", "FastAPI", "React", "Redis", "PostgreSQL", "Suricata", "Docker"],
    features: [
      "Deterministic PCAP replay and explicitly enabled, payload-free live capture",
      "Calibrated classification, Isolation Forest, autoencoder, and explainable risk fusion",
      "Redis streams, idempotent persistence, and restart recovery across services",
      "REST/WebSocket dashboard with role-based access and audited model promotion",
    ],
    challenges: [
      { title: "Unknown is not benign", body: "Anomaly signals and known signatures remain distinguishable. Invalid or incompatible input creates an error rather than a reassuring benign label." },
      { title: "A durable detection path", body: "Consumer groups, bounded retries, stale-entry recovery, and deterministic event IDs keep replay and service restarts from duplicating incidents." },
      { title: "Evidence before promotion", body: "Evaluation gates can reject a model automatically, while promotion requires review and an authorized operator. Failed research results remain visible." },
    ],
    architecture: [
      { name: "Sensor", tech: "PCAP / NFStream", role: "Payload-free flow records" },
      { name: "Stream", tech: "Redis", role: "Bounded durable queues" },
      { name: "Detector", tech: "Hybrid ML", role: "Calibrated risk fusion" },
      { name: "Incidents", tech: "FastAPI / Postgres", role: "Grouped, auditable evidence" },
      { name: "Operations", tech: "React / WebSocket", role: "Live investigation views" },
    ],
    note: "The engineering platform is demoable, but evaluated models are not approved for production. Current research does not establish reliable zero-day detection, and the system does not block traffic.",
    learned: "A reliable security platform must report what it cannot establish as clearly as the threats it can explain.",
  },
  {
    slug: "roleatlas",
    shortName: "RoleAtlas",
    title: "AI-assisted global job discovery",
    world: "The Signal Atlas",
    kind: "Distributed product system",
    summary:
      "A qualification-first workspace for discovering, ranking, saving, and tracking global internships and entry-level roles.",
    status: "Working product",
    accent: "var(--pink)",
    metric: "16 boards",
    metricLabel: "verified employer-controlled sources",
    repository: "https://github.com/sting-raider/RoleAtlas",
    demo: "https://sting-raider.github.io/RoleAtlas/",
    demoLabel: "Product tour",
    note: "The product tour uses illustrative data. The complete application runs with PostgreSQL, NATS, and Rust workers; source coverage is limited to the configured registry, not the entire job market.",
    stack: ["Next.js", "TypeScript", "Rust", "NATS JetStream", "PostgreSQL", "Docker"],
    features: [
      "Reviewed résumé profiles and persistent strategies, saved roles, and application dossiers",
      "Listing-level geographic, sponsorship, timezone, and employment eligibility evidence",
      "Immediate index search followed by verified-source expansion and session reranking",
      "Optional bring-your-own-model support; deterministic search works with AI disabled",
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
      "A hybrid UR10e controller combining a learned PPO approach with deterministic grasping, Lula transport, and verified basket placement in Isaac Lab.",
    status: "Hybrid controller · study ongoing",
    accent: "var(--cyan)",
    metric: "144 / 256",
    metricLabel: "stable holds in the frozen baseline",
    stack: ["Python", "PyTorch", "NVIDIA Isaac Lab", "Isaac Sim", "PPO", "Lula"],
    note: "Simulation only. The frozen hold baseline is 56.25%, below the 80% exit gate. Twelve domain-randomization training runs are complete; the full evaluation and real-world transfer remain unverified.",
    features: [
      "34-dimensional structured observations and target-conditioned PPO approach",
      "Deterministic contact, recovery, release, and two-second success verification",
      "Lula transport reached 20/48 verified placements versus 5/48 for the legacy route",
      "Four randomization profiles, three training seeds, and reproducible artifact validation",
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
      { name: "Approach", tech: "PPO / PyTorch", role: "Target-conditioned positioning" },
      { name: "Contact", tech: "State machine", role: "Grasp, lift, hold, and retry" },
      { name: "Transport", tech: "Lula", role: "Clearance and basket alignment" },
      { name: "Verification", tech: "Isaac Lab", role: "Release and stable placement" },
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
    repository: "https://github.com/sting-raider/hybrid-cloud-k8s-platform",
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
    repository: "https://github.com/sting-raider/f1-rl-agent",
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
  {
    slug: "the-abstract",
    shortName: "The Abstract",
    title: "From source document to readable brief",
    world: "The Reading Room",
    kind: "Browser-first document AI",
    summary: "A document reading desk that extracts PDF and image text in the browser, then produces structured summaries and key takeaways at the reader's chosen depth.",
    status: "Deployed",
    accent: "var(--violet)",
    metric: "3 depths",
    metricLabel: "brief, standard, or extended summaries",
    repository: "https://github.com/sting-raider/unthinkable-summarizeee",
    demo: "https://unthinkable-summarizeee.vercel.app/",
    demoLabel: "Open app",
    stack: ["Next.js", "React", "TypeScript", "PDF.js", "Tesseract.js", "DeepSeek"],
    features: [
      "Local PDF parsing and image OCR without uploading the original file",
      "Source-text preview alongside structured briefs and key points",
      "Map-reduce summarization for documents that exceed a single prompt",
      "Copy, regenerate, or download the completed brief as Markdown",
    ],
    challenges: [
      { title: "Keep the source visible", body: "Extraction and summarization are separate steps. Readers can inspect the recovered text before requesting a brief." },
      { title: "Long documents", body: "Chunked summaries are synthesized into a final brief, keeping a bounded request flow instead of truncating the source silently." },
    ],
    architecture: [
      { name: "Source", tech: "PDF / image", role: "Local file selection" },
      { name: "Extraction", tech: "PDF.js / OCR", role: "Browser text recovery" },
      { name: "Summary", tech: "Next.js / DeepSeek", role: "Chunking and synthesis" },
      { name: "Brief", tech: "React", role: "Review and Markdown export" },
    ],
    note: "Original files stay in the browser. Extracted text is sent through the server to DeepSeek when a summary is requested; OCR and generated summaries can need correction.",
    learned: "A useful summary tool gives readers control over detail and keeps the source close enough to check.",
  },
];

export const skillGroups = [
  {
    title: "AI + Robotics",
    level: "Core",
    skills: ["PyTorch", "TensorFlow", "Isaac Lab", "Isaac Sim", "Stable Baselines3", "Gymnasium", "LangChain", "OpenCV"],
    evidence: "Hybrid PPO/Lula robot control, telemetry-driven racing, and AegisFlow's calibrated classification and anomaly detection.",
  },
  {
    title: "Cloud + DevOps",
    level: "Core",
    skills: ["Kubernetes", "Docker", "AWS", "GCP", "Linux", "Tailscale", "Cloudflare Tunnels", "Portainer"],
    evidence: "Built and load-tested a hybrid cluster across edge, AWS, and GCP.",
  },
  {
    title: "AI Products + Data",
    level: "Core",
    skills: ["FastAPI", "Next.js", "React", "PostgreSQL", "SQLite / FTS5", "Redis", "Document extraction", "Evidence grounding"],
    evidence: "DANTE's promise ledger, SuperJoin's temporal facts and Trust Gate, RoleAtlas's persistent search, and The Abstract's document briefs.",
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
    skills: ["Git", "GitHub Actions", "Pytest", "Playwright", "NATS JetStream", "Suricata", "OpenAI Codex"],
    evidence: "Reproducible robot evaluations, payment/webhook safety tests, network replay, and browser-verified product workflows.",
  },
];

export const navItems = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/journey", label: "Journey" },
  { href: "/contact", label: "Contact" },
];
