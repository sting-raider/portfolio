import { profile } from '../data/profile'
import { Reveal } from './Reveal'

export function Operator() {
  return (
    <section className="section" id="operator" aria-label="About the operator">
      <Reveal>
        <div className="section-head">
          <span className="section-index">03 //</span>
          <h2 className="section-title">Operator</h2>
          <span className="section-line" aria-hidden="true" />
          <span className="section-note">THE HUMAN BEHIND THE CONSOLE</span>
        </div>
      </Reveal>
      <div className="operator-grid">
        <Reveal>
          <div className="operator-bio panel">
            <p>
              I’m a computer science student at <b>VIT Vellore</b> (B.Tech CSE, 2023–2027) who
              builds systems that have to survive contact with reality — robots that miss grasps,
              crawlers that hit bad data, clusters that get load-tested.
            </p>
            <p>
              <b>Currently:</b> {profile.currently}
            </p>
            <p>
              <b>Working values:</b> {profile.values.join(' · ')}. If a system can’t show its
              evidence, it doesn’t ship.
            </p>
            {profile.creeds.map((creed) => (
              <blockquote className="creed" key={creed.text}>
                “{creed.text}”<cite>— {creed.source}</cite>
              </blockquote>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="operator-facts panel">
            <div className="fact-block">
              <p className="fact-label">EDUCATION</p>
              <p className="fact-value">
                {profile.education.degree}
                <span className="sub">{profile.education.school}</span>
                <span className="sub">{profile.education.period}</span>
              </p>
            </div>
            <div className="fact-block">
              <p className="fact-label">RELEVANT COURSEWORK</p>
              <p className="fact-value">
                {profile.education.coursework.map((c) => (
                  <span className="sub" key={c}>
                    ▸ {c}
                  </span>
                ))}
              </p>
            </div>
            <div className="fact-block">
              <p className="fact-label">CERTIFICATION</p>
              <p className="fact-value">
                {profile.certification.name}
                <span className="sub">
                  {profile.certification.issuer} · issued {profile.certification.issued} · valid{' '}
                  {profile.certification.valid}
                </span>
              </p>
            </div>
            <div className="fact-block">
              <p className="fact-label">AVAILABILITY</p>
              <p className="fact-value">{profile.availability}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
