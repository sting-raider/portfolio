import { profile } from '../data/profile'
import { CrabMark } from './Crab'
import { Reveal } from './Reveal'

export function Comms() {
  return (
    <>
      <section className="section" id="comms" aria-label="Contact">
        <Reveal>
          <div className="section-head">
            <span className="section-index">04 //</span>
            <h2 className="section-title">Comms</h2>
            <span className="section-line" aria-hidden="true" />
            <span className="section-note">OPEN CHANNEL</span>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="comms-panel panel">
            <p className="comms-kicker">TRANSMISSION ADDRESS</p>
            <a className="comms-email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <p className="comms-note">
              {profile.availability}. Fastest response over email; the GitHub issues tab works too.
            </p>
            <div className="comms-links">
              <a
                className="comms-link"
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GITHUB ↗
              </a>
              <a
                className="comms-link"
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LINKEDIN ↗
              </a>
              <a
                className="comms-link"
                href={profile.resumeRepo}
                target="_blank"
                rel="noopener noreferrer"
              >
                RÉSUMÉ ↗
              </a>
              <a className="comms-link" href={`tel:${profile.phone.replace(/\s/g, '')}`}>
                {profile.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <CrabMark />
          <span>MISSION CONTROL — DESIGNED &amp; BUILT BY {profile.name.toUpperCase()}</span>
          <span className="footer-hint">
            press <b>`</b> for the console · no trackers · self-hosted fonts
          </span>
          <span className="footer-konami" title="you didn’t see this">
            ↑↑↓↓←→←→BA
          </span>
        </div>
      </footer>
    </>
  )
}
