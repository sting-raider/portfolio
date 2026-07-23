import { Soul } from "@/components/Soul";

export const metadata = { title: "Journey" };

const events = [
  { date: "AUG 2023", title: "Started B.Tech CSE at VIT Vellore", text: "Built the academic base: algorithms, operating systems, databases, and artificial intelligence." },
  { date: "2024 — 2025", title: "Moved from models to environments", text: "Built a live-telemetry F1 agent, then a vectorized robotic manipulation task in Isaac Lab." },
  { date: "AUG 2025", title: "Oracle Generative AI Professional", text: "Earned the OCI 2025 certification, valid through August 2027." },
  { date: "2025 — 2026", title: "Scaled across cloud boundaries", text: "Designed a hybrid K3s cluster spanning edge, AWS, and GCP; validated 1,000+ concurrent users with zero failures." },
  { date: "NOW", title: "Building RoleAtlas", text: "Combining distributed crawling, qualification-aware search, and evidence-grounded AI for early-career candidates." },
  { date: "MAY 2027", title: "Graduation horizon", text: "Seeking software engineering, applied AI, robotics, and infrastructure opportunities where hard systems meet real users." },
];

export default function JourneyPage() {
  return (
    <div className="page-shell journey-page">
      <section className="page-hero compact-hero journey-hero">
        <div>
          <p className="eyebrow">SAVE FILE / 2023 — 2027</p>
          <h1>The route so far.<br /><em>Six save points.</em></h1>
          <p className="page-lede">A record of the moments where the build changed direction, gained a skill, or reached a new world.</p>
        </div>
        <div className="journey-save-preview" aria-label="Current save file">
          <span className="journey-save-star" aria-hidden="true">✦</span>
          <div><strong>ALI</strong><span>LV 20</span></div>
          <div><span>VIT VELLORE</span><span>72:18</span></div>
          <p>* The determination to keep building fills you.</p>
        </div>
      </section>

      <section className="content-section save-slots" aria-label="Journey save points">
        <header className="save-slots__header"><span>FILE</span><span>LOCATION / EVENT</span><span>STATUS</span></header>
        {events.map(({ date, title, text }, index) => (
          <article className="save-slot" key={title}>
            <span className="save-slot__cursor" aria-hidden="true"><Soul size="small" /></span>
            <span className="save-slot__star" aria-hidden="true">✦</span>
            <div className="save-slot__copy">
              <p>{String(index + 1).padStart(2, "0")} / {date}</p>
              <h2>{title}</h2>
              <span>* {text}</span>
            </div>
            <strong>{index === events.length - 1 ? "[ NEXT ]" : "[ SAVED ]"}</strong>
          </article>
        ))}
      </section>
    </div>
  );
}
