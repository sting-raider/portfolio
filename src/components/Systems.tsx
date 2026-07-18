import { projects } from '../data/projects'
import { ProjectModule } from './ProjectModule'
import { Reveal } from './Reveal'

export function Systems() {
  return (
    <section className="section" id="systems" aria-label="Tracked systems">
      <Reveal>
        <div className="section-head">
          <span className="section-index">01 //</span>
          <h2 className="section-title">Systems</h2>
          <span className="section-line" aria-hidden="true" />
          <span className="section-note">{projects.length} TRACKED · TELEMETRY SELF-REPORTED</span>
        </div>
      </Reveal>
      <div className="systems-grid">
        {projects.map((project, i) => (
          <Reveal
            key={project.id}
            delay={Math.min(i * 60, 180)}
            className={project.featured ? 'cell-featured' : ''}
          >
            <ProjectModule project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
