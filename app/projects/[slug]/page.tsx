import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Code2 } from "lucide-react";
import { Soul } from "@/components/Soul";
import { projects } from "@/data/portfolio";

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return { title: project?.shortName ?? "Project", description: project?.summary };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <div className={`project-page project-theme--${project.slug}`} style={{ "--project-accent": project.accent } as React.CSSProperties}>
      <div className="page-shell">
        <Link href="/projects" className="back-link"><ArrowLeft size={16} /> Back to the archive</Link>
        <section className="project-hero">
          <div className="project-hero__copy"><p className="eyebrow">{project.world} / {project.status}</p><h1>{project.title}</h1><p className="page-lede">{project.summary}</p><div className="tag-row">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div>
          <div className="project-hero__visual project-check-panel">
            <div className="project-check-panel__title"><Soul size="small" /><span>* CHECK</span></div>
            <dl>
              <div><dt>SUBJECT</dt><dd>{project.shortName}</dd></div>
              <div><dt>TYPE</dt><dd>{project.kind}</dd></div>
              <div><dt>STATUS</dt><dd>{project.status}</dd></div>
            </dl>
            <p>* {project.metric} {project.metricLabel}.</p>
          </div>
        </section>
        <section className="project-stat"><p className="pixel-label">PROOF SIGNAL</p><strong>{project.metric}</strong><span>{project.metricLabel}</span></section>
        <section className="content-section two-column project-overview">
          <div><p className="eyebrow">The mission</p><h2>What the system does</h2></div>
          <div><p className="prose-lead">{project.summary}</p><ul className="check-list">{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>
        </section>
        <section className="content-section">
          <div className="section-heading"><div><p className="eyebrow">Bosses defeated</p><h2>Hard parts, made explicit</h2></div><p>Because the interesting work is rarely the final screenshot.</p></div>
          <div className="challenge-grid">{project.challenges.map((challenge, index) => <article key={challenge.title} className="challenge-card"><span className="mono">BOSS 0{index + 1}</span><h3>{challenge.title}</h3><p>{challenge.body}</p></article>)}</div>
        </section>
        <section className="content-section architecture-section">
          <div className="section-heading"><div><p className="eyebrow">System map</p><h2>How signals move</h2></div><p>A plain technical view. The map still works without hovering.</p></div>
          <div className="architecture-map">{project.architecture.map((node, index) => <div className="architecture-node" key={node.name}><span className="architecture-node__index">{String(index + 1).padStart(2, "0")}</span><div><strong>{node.name}</strong><small>{node.tech}</small></div><p>{node.role}</p>{index < project.architecture.length - 1 && <ArrowRight className="architecture-arrow" />}</div>)}</div>
        </section>
        <section className="learning-note"><p className="pixel-label">LOG ENTRY / WHAT I LEARNED</p><blockquote>“{project.learned}”</blockquote></section>
        <section className="project-next"><div><p className="eyebrow">Source signal</p><h2>See the builder behind the system.</h2></div><a className="button button--ghost" href="https://github.com/sting-raider" target="_blank" rel="noreferrer"><Code2 size={18} /> GitHub profile</a><Link className="button button--primary" href={`/projects/${nextProject.slug}`}>Next: {nextProject.shortName} <ArrowRight size={17} /></Link></section>
      </div>
    </div>
  );
}
