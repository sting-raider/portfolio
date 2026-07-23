import { ProjectCard } from "@/components/ProjectCard";
import { CharacterEncounter } from "@/components/CharacterEncounter";
import { projects } from "@/data/portfolio";
import { assetUrl } from "@/lib/site";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <div className="page-shell project-archive-page">
      <section className="page-hero compact-hero project-select-hero">
        <div>
          <p className="eyebrow">PROJECT SELECT / 4 ENCOUNTERS</p>
          <h1>Choose a world.<br /><em>Inspect the build.</em></h1>
          <p className="page-lede">* Four systems appeared. Each carries a problem, constraints, trade-offs, and something measurable to prove.</p>
        </div>
        <CharacterEncounter
          character="sans"
          name="SANS"
          line="* heya. four projects, zero shortcuts. pick one and see what ali's been up to."
          src={assetUrl("/assets/sprites/sans-overworld.png")}
        />
      </section>
      <section className="content-section">
        <div className="project-grid project-grid--all">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
      </section>
      <aside className="dialogue-box archive-note"><span>*</span><p>Move the SOUL to choose a project.<br />Select CHECK to open its full record.</p></aside>
    </div>
  );
}
