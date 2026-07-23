import Link from "next/link";
import type { Project } from "@/data/portfolio";
import { Soul } from "./Soul";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link href={`/projects/${project.slug}`} className={`project-card project-card--${project.slug}`} style={{ "--project-accent": project.accent } as React.CSSProperties}>
      <span className="project-card__soul" aria-hidden="true"><Soul size="small" /></span>
      <span className="project-card__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      <div className="project-card__main">
        <div className="project-card__top">
          <span>* {project.world}</span>
          <span className="status"><i />{project.status}</span>
        </div>
        <h3>{project.shortName}</h3>
        <p>{project.summary}</p>
        <div className="project-card__stack">{project.stack.slice(0, 4).join(" · ")}</div>
      </div>
      <div className="project-card__check">
        <strong>{project.metric}</strong>
        <span>{project.metricLabel}</span>
        <b>[ CHECK ]</b>
      </div>
    </Link>
  );
}
