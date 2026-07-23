import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Code2, Download, Mail } from "lucide-react";
import { projects, skillGroups } from "@/data/portfolio";
import { assetUrl } from "@/lib/site";

export const metadata = { title: "60-Second View" };

export default function QuickPage() {
  return (
    <div className="quick-page page-shell">
      <section className="quick-hero"><p className="pixel-label">RECRUITER% SPEEDRUN</p><div><h1>Ali Sufiyan Khan</h1><span className="quick-timer mono">00:60</span></div><p>Computer Science undergraduate building applied AI, robotics, and distributed infrastructure. Graduating from VIT Vellore in May 2027.</p><div className="hero__actions"><a className="button button--primary" href={assetUrl("/Ali_Sufiyan_Khan_Resume.pdf")} download>Download résumé <Download size={17} /></a><a className="button button--ghost" href="mailto:alizaydsab@gmail.com">Email Ali <Mail size={17} /></a></div></section>
      <section className="quick-section"><div className="quick-section__label">TOP WORK</div><div className="quick-projects">{projects.slice(0, 3).map((project) => <Link href={`/projects/${project.slug}`} key={project.slug}><span className="status"><i />{project.status}</span><h2>{project.shortName}</h2><p>{project.summary}</p><strong>{project.metric} <small>{project.metricLabel}</small></strong><ArrowRight className="quick-project__arrow" /></Link>)}</div></section>
      <section className="quick-section quick-skills"><div className="quick-section__label">CORE SKILLS</div><div>{skillGroups.slice(0, 3).map((group) => <article key={group.title}><h3>{group.title}</h3><p>{group.skills.slice(0, 6).join(" · ")}</p></article>)}</div></section>
      <section className="quick-section quick-education"><div className="quick-section__label">EDUCATION</div><div><h2>VIT Vellore</h2><p>B.Tech, Computer Science and Engineering · Aug 2023 — May 2027</p><p>Oracle Cloud Infrastructure 2025 Certified Generative AI Professional</p></div></section>
      <section className="quick-footer"><p>That was the short version. The world has more detail if you do.</p><Link href="/projects" className="button button--primary">Explore case studies <ArrowRight size={17} /></Link><div className="quick-socials"><a href="https://github.com/sting-raider" target="_blank" rel="noreferrer"><Code2 /> GitHub</a><a href="https://www.linkedin.com/in/ali-khan-4197b1217" target="_blank" rel="noreferrer"><BriefcaseBusiness /> LinkedIn</a></div></section>
    </div>
  );
}
