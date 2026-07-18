import type { Project } from '../data/projects'
import { STATUS_LABEL, STATUS_TONE } from '../data/projects'

function Flow({ flow }: { flow: NonNullable<Project['flow']> }) {
  return (
    <div className="flow" aria-label="Pipeline">
      {flow.nodes.map((node, i) => (
        <span key={i} style={{ display: 'contents' }}>
          {i > 0 && (
            <span className="flow-arrow" aria-hidden="true">
              →
            </span>
          )}
          <span className={`flow-node${flow.accented?.includes(i) ? ' flow-node--accent' : ''}`}>
            {node}
          </span>
        </span>
      ))}
      {flow.loop && <span className="flow-loop">{flow.loop}</span>}
    </div>
  )
}

export function ProjectModule({ project }: { project: Project }) {
  const tone = STATUS_TONE[project.status]

  return (
    <article
      className={`module panel${project.featured ? ' module--featured' : ''}`}
      id={project.id}
      aria-label={`${project.name} — ${STATUS_LABEL[project.status]}`}
    >
      <header className="module-head">
        <span className="module-index">{project.index}</span>
        <h3 className="module-name">{project.name}</h3>
        <span className={`badge badge--${tone}`}>
          <i className="dot" aria-hidden="true" />
          {STATUS_LABEL[project.status]}
        </span>
        <a
          className="module-repo"
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} on GitHub`}
        >
          repo ↗
        </a>
      </header>
      <p className="module-tag">{project.tagline}</p>

      <div className="module-body">
        <ul className="module-points">
          {project.points.map((point, i) => (
            // static, author-controlled content
            <li key={i} dangerouslySetInnerHTML={{ __html: point }} />
          ))}
        </ul>
        <div className="module-metrics">
          {project.metrics.map((m) => (
            <div className="metric" key={m.label}>
              <span className="metric-value">
                {m.value}
                {m.unit && <span className="unit">{m.unit}</span>}
              </span>
              <span className="metric-label">{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      {project.flow && <Flow flow={project.flow} />}

      {project.phases && (
        <div className="phases" aria-label="Phase status">
          {project.phases.map((phase) => (
            <div className={`phase phase--${phase.state}`} key={phase.name}>
              <i className="dot" aria-hidden="true" />
              <span className="phase-name">{phase.name}</span>
              <span className="phase-detail">{phase.detail}</span>
            </div>
          ))}
        </div>
      )}

      {project.constraints && (
        <div className="constraints">
          <p className="constraints-title">{project.constraints.title}</p>
          <ul>
            {project.constraints.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {project.note && (
        // static, author-controlled content
        <p className="module-note" dangerouslySetInnerHTML={{ __html: project.note }} />
      )}

      <div className="module-stack" aria-label="Stack">
        {project.stack.map((tech) => (
          <span className="chip" key={tech}>
            {tech}
          </span>
        ))}
      </div>
    </article>
  )
}
