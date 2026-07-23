import Link from "next/link";
import { Download } from "lucide-react";
import { GameDialogue } from "@/components/GameDialogue";
import { Soul } from "@/components/Soul";
import { projects } from "@/data/portfolio";
import { assetUrl } from "@/lib/site";

export default function Home() {
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
          <h1>ALI&apos;S<br /><span>DARK WORLD</span></h1>
          <p className="dt-subtitle">SOFTWARE ENGINEER · AI BUILDER · HUMAN</p>
        </div>
        <div className="dt-hero__interface">
          <GameDialogue />
          <nav className="battle-menu" aria-label="Portfolio command menu">
            <Link href="/projects" className="command command--fight"><Soul size="small" /> FIGHT <small>PROJECTS</small></Link>
            <Link href="/about" className="command command--act"><Soul size="small" /> ACT <small>ABOUT</small></Link>
            <Link href="/skills" className="command command--item"><Soul size="small" /> ITEM <small>SKILLS</small></Link>
            <Link href="/contact" className="command command--mercy"><Soul size="small" /> MERCY <small>CONTACT</small></Link>
          </nav>
        </div>
      </section>

      <section className="save-panel">
        <div className="save-star" aria-hidden="true">✦</div>
        <div>
          <p>* The sight of four ambitious projects fills you with determination.</p>
          <div className="save-stats"><span>ALI</span><span>LV 20</span><span>72:18</span></div>
        </div>
        <a href={assetUrl("/Ali_Sufiyan_Khan_Resume.pdf")} download className="save-button"><Download size={18} /> SAVE / RÉSUMÉ</a>
      </section>

      <section className="snowdin-archive">
        <div className="snowdin-archive__copy">
          <div>
            <p className="character-kicker">UNDERTALE PROJECT SELECT</p>
            <h2>THE PROJECT<br />ARCHIVE</h2>
          </div>
          <div className="snowdin-archive__action">
            <div className="sans-dialogue"><strong>SANS</strong><p>* these files are pretty cool.<br />* and by cool, i mean some of them use kubernetes.</p></div>
            <Link href="/projects" className="undertale-button"><Soul size="small" /> INSPECT PROJECTS</Link>
          </div>
        </div>
      </section>

      <section className="encounter-list">
        <div className="encounter-list__head"><p>* FOUR ENCOUNTERS APPEARED.</p><span>Choose one to inspect.</span></div>
        <div className="encounter-grid">
          {projects.map((project, index) => (
            <Link href={`/projects/${project.slug}`} className="encounter" key={project.slug}>
              <span className="encounter__soul"><Soul size="small" /></span>
              <span className="encounter__number">0{index + 1}</span>
              <div><p>{project.status}</p><h3>{project.shortName}</h3><span>{project.summary}</span></div>
              <strong>{project.metric}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="final-choice">
        <p>* You reached the end of the current room.</p>
        <h2>WHAT WILL<br /><span>ALI</span> DO?</h2>
        <div><Link href="/quick" className="undertale-button"><Soul size="small" /> QUICK VIEW</Link><Link href="/contact" className="undertale-button undertale-button--yellow">CONTACT</Link></div>
      </section>
    </div>
  );
}
