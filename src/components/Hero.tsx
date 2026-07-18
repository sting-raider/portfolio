import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { TelemetryCanvas } from './TelemetryCanvas'
import { Ticker } from './Ticker'

export function Hero() {
  return (
    <section className="hero" id="top" aria-label="Introduction">
      <TelemetryCanvas />
      <div className="hero-inner">
        <div>
          <p className="hero-kicker">MISSION CONTROL // OPERATOR FILE ASK-2027</p>
          <h1 className="hero-name">
            Ali Sufiyan <span className="outline">Khan</span>
          </h1>
          <p className="hero-role">
            Computer Science @ <strong>VIT Vellore</strong> — builds AI systems, robots, and the
            tooling around them.
          </p>
          <p className="hero-creed">
            <em>“A working system beats a beautiful mock-up.”</em> Every system on this deck reports
            its own status — including the failures.
          </p>
          <div className="hero-ctas">
            <a className="btn" href="#systems">
              VIEW SYSTEMS ↓
            </a>
            <a
              className="btn btn--ghost"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GITHUB ↗
            </a>
          </div>
        </div>

        <aside className="status-board panel" aria-label="Operator status board">
          <div className="status-board-head">
            <span>STATUS BOARD</span>
            <span className="lights" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </div>
          <div className="status-row">
            <span className="k">OPERATOR</span>
            <span className="v">{profile.name.toUpperCase()}</span>
          </div>
          <div className="status-row">
            <span className="k">BASE</span>
            <span className="v">VIT VELLORE · CSE ’27</span>
          </div>
          <div className="status-row">
            <span className="k">CURRENT FOCUS</span>
            <span className="v accent">ROLEATLAS</span>
          </div>
          <div className="status-row">
            <span className="k">SYSTEMS TRACKED</span>
            <span className="v">{projects.length}</span>
          </div>
          <div className="status-row">
            <span className="k">AVAILABILITY</span>
            <span className="v ok">● OPEN TO INTERNSHIPS</span>
          </div>
        </aside>
      </div>
      <Ticker />
    </section>
  )
}
