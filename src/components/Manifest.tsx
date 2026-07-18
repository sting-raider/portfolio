import { skillGroups } from '../data/profile'
import { Reveal } from './Reveal'

export function Manifest() {
  return (
    <section className="section" id="manifest" aria-label="Capability manifest">
      <Reveal>
        <div className="section-head">
          <span className="section-index">02 //</span>
          <h2 className="section-title">Manifest</h2>
          <span className="section-line" aria-hidden="true" />
          <span className="section-note">CAPABILITIES DECLARED BY THE OPERATOR</span>
        </div>
      </Reveal>
      <div className="manifest-grid">
        {skillGroups.map((group, i) => (
          <Reveal key={group.file} delay={Math.min(i * 60, 180)}>
            <div className="manifest-file panel">
              <div className="manifest-file-head">~/manifest/{group.file}</div>
              <div className="manifest-file-body">
                {group.items.map((item) => (
                  <span className="chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
