import Link from "next/link";
import { Download } from "lucide-react";
import { GameDialogue } from "@/components/GameDialogue";
import { SansDialogue } from "@/components/SansDialogue";
import { Soul } from "@/components/Soul";
import { projects } from "@/data/portfolio";
import { assetUrl, resumeDownloadUrl } from "@/lib/site";
import { MotionHome } from "@/components/motion-lab/MotionHome";
import { MarqueeTapes, PartyStatus, WavyText } from "@/components/DarkWorld";
import { BulletBoard } from "@/components/BulletBoard";

export default function Home() {
  const retro = process.env.NEXT_PUBLIC_MOTION_VARIANT === "retro";
  if (process.env.NEXT_PUBLIC_MOTION_VARIANT && !retro) return <MotionHome variant={process.env.NEXT_PUBLIC_MOTION_VARIANT} />;
  return (
    <div className="fan-home">
      <section className="dt-hero">
        <div
          className="dt-hero__backdrop"
          aria-hidden="true"
          style={{ "--fountain-image": `url("${assetUrl("/assets/game/dark-fountain.webp")}")` } as React.CSSProperties}
        />
        <div className="dt-hero__title">
          <p>WELCOME TO</p>
          <h1 aria-label="Ali's Dark World"><WavyText text="ALI'S" /><br /><span><WavyText text="DARK WORLD" offset={5} /></span></h1>
          <p className="dt-subtitle">SOFTWARE ENGINEER · AI BUILDER · HUMAN</p>
        </div>
        <div className="dt-hero__interface">
          <PartyStatus />
          <GameDialogue initialDelay={retro ? 350 : undefined} />
          <nav className="battle-menu" aria-label="Portfolio command menu">
            <Link href="/projects" className="command command--fight"><Soul size="small" /> FIGHT <small>PROJECTS</small></Link>
            <Link href="/about" className="command command--act"><Soul size="small" /> ACT <small>ABOUT</small></Link>
            <Link href="/skills" className="command command--item"><Soul size="small" /> ITEM <small>SKILLS</small></Link>
            <Link href="/contact" className="command command--mercy"><Soul size="small" /> MERCY <small>CONTACT</small></Link>
          </nav>
        </div>
      </section>

      <MarqueeTapes />

      <section className="save-panel">
        <div className="save-star" aria-hidden="true">✦</div>
        <div className="save-file">
          <div className="save-stats"><span>ALI</span><span>LV 20</span><span>SEP 2026</span></div>
          <p className="save-room">DARK WORLD · PROJECT ARCHIVE</p>
          <p className="save-line">* {projects.length} projects fill you with determination.</p>
        </div>
        <a href={resumeDownloadUrl} download className="save-button" aria-label="Save résumé (download PDF)" data-umami-event="resume-download" data-umami-event-location="home"><Soul size="small" /> SAVE <small><Download size={14} /> RÉSUMÉ.PDF</small></a>
      </section>

      <section className="snowdin-archive">
        <div className="archive-stage">
          <div className="archive-frame" aria-hidden="true"><span /><span /></div>
          <div className="snowdin-archive__copy">
            <div>
              <p className="character-kicker">NEW ENCOUNTERS / SEPTEMBER 2026</p>
              <h2><span>THE PROJECT</span><span>ARCHIVE</span></h2>
              <p className="archive-scroll-cue"><Soul size="small" /> SCROLL TO ENCOUNTER <span aria-hidden="true">↓</span></p>
            </div>
            <div className="snowdin-archive__action">
              <img className="retro-sans" src={assetUrl("/assets/sprites/sans-overworld.png")} alt="" />
              <SansDialogue />
              <Link href="/projects" className="undertale-button"><Soul size="small" /> INSPECT PROJECTS</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="encounter-list">
        <div className="encounter-list__head"><p>* {projects.length} ENCOUNTERS APPEARED.</p><span>Commerce. Knowledge. Security. Robotics.</span></div>
        <div className="encounter-grid" data-encounter-menu>
          <span className="encounter-cursor" aria-hidden="true"><Soul size="small" /></span>
          {projects.map((project, index) => (
            <Link href={`/projects/${project.slug}`} className="encounter" key={project.slug}>
              <span className="encounter__soul"><Soul size="small" /></span>
              <span className="encounter__number">0{index + 1}</span>
              <div><p>{project.status}</p><h3>{project.shortName}</h3><span>{project.summary}</span></div>
              <strong>{project.metric}<small>{project.metricLabel}</small></strong>
            </Link>
          ))}
        </div>
      </section>

      <BulletBoard />

      <section className="final-choice">
        <p>* You reached the end of the current room.</p>
        <h2>WHAT WILL<br /><span>ALI</span> DO?</h2>
        <div><Link href="/quick" className="undertale-button"><Soul size="small" /> QUICK VIEW</Link><Link href="/contact" className="undertale-button undertale-button--yellow">CONTACT</Link></div>
      </section>
    </div>
  );
}
