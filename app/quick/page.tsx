import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Code2, Download, Mail } from "lucide-react";
import { projects, skillGroups } from "@/data/portfolio";
import { resumeDownloadUrl } from "@/lib/site";
import { QuickSplits } from "@/components/QuickSplits";

export const metadata = { title: "60-Second View" };

const splits = [
  { id: "qv-who", label: "WHO" },
  { id: "qv-work", label: "TOP WORK" },
  { id: "qv-skills", label: "SKILLS" },
  { id: "qv-education", label: "EDUCATION" },
  { id: "qv-contact", label: "CONTACT" },
];

const facts = [
  ["CLASS", "B.Tech CSE · VIT Vellore"],
  ["GRADUATES", "May 2027"],
  ["CERTIFIED", "OCI 2025 Generative AI Professional"],
  ["SEEKING", "2027 SWE roles · applied AI, robotics, infrastructure"],
];

const topWork = ["dante", "plaid", "superjoin"].map((slug) => projects.find((project) => project.slug === slug)!);

function Actions({ caseStudies = false }: { caseStudies?: boolean }) {
  return (
    <div className="qv-actions">
      {caseStudies && <Link className="qv-btn qv-btn--primary" href="/projects">CASE STUDIES <ArrowRight size={18} /></Link>}
      <a className={`qv-btn ${caseStudies ? "" : "qv-btn--primary"}`} href={resumeDownloadUrl} download data-umami-event="resume-download" data-umami-event-location="quick-view"><Download size={18} /> RÉSUMÉ</a>
      <a className="qv-btn" href="mailto:alizaydsab@gmail.com"><Mail size={18} /> EMAIL</a>
      <a className="qv-btn" href="https://github.com/sting-raider" target="_blank" rel="noreferrer"><Code2 size={18} /> GITHUB</a>
      <a className="qv-btn" href="https://www.linkedin.com/in/ali-khan-4197b1217" target="_blank" rel="noreferrer"><BriefcaseBusiness size={18} /> LINKEDIN</a>
    </div>
  );
}

export default function QuickPage() {
  return (
    <div className="qv page-shell quick-page">
      <div className="qv__run">
        <section id="qv-who" className="qv-hero">
          <p className="pixel-label">RECRUITER% SPEEDRUN</p>
          <h1>Ali Sufiyan <em>Khan</em></h1>
          <p className="qv-hero__pitch">Software engineer building evidence-grounded AI, agentic commerce, network security, robotics, and a Nintendo 64 static recompiler.</p>
          <dl className="qv-facts">
            {facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          </dl>
          <Actions />
        </section>

        <section id="qv-work" className="qv-section">
          <h2 className="qv-heading"><span>01</span> TOP WORK</h2>
          <ol className="qv-work">
            {topWork.map((project, index) => (
              <li key={project.slug} style={{ "--accent": project.accent } as React.CSSProperties}>
                <Link href={`/projects/${project.slug}`}>
                  <span className="qv-work__index">0{index + 1}</span>
                  <div className="qv-work__body">
                    <p className="qv-work__status">{project.status}</p>
                    <h3>{project.shortName}</h3>
                    <p>{project.summary}</p>
                  </div>
                  <strong className="qv-work__metric">{project.metric}<small>{project.metricLabel}</small></strong>
                  <ArrowRight className="qv-work__arrow" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section id="qv-skills" className="qv-section">
          <h2 className="qv-heading"><span>02</span> SKILLS</h2>
          <div className="qv-skills">
            {skillGroups.slice(0, 4).map((group) => (
              <article key={group.title}>
                <h3>{group.title} <small>{group.level}</small></h3>
                <ul>{group.skills.slice(0, 6).map((skill) => <li key={skill}>{skill}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section id="qv-education" className="qv-section">
          <h2 className="qv-heading"><span>03</span> EDUCATION</h2>
          <div className="qv-edu">
            <div><h3>Vellore Institute of Technology</h3><p>B.Tech, Computer Science and Engineering</p></div>
            <p className="qv-edu__dates">AUG 2023 → MAY 2027</p>
            <p className="qv-edu__cert">✦ Oracle Cloud Infrastructure 2025 Certified Generative AI Professional</p>
          </div>
        </section>

        <section id="qv-contact" className="qv-section qv-end">
          <p className="qv-end__kicker">* RUN COMPLETE</p>
          <h2>That was the short version.<br /><em>The full world has more.</em></h2>
          <Actions caseStudies />
        </section>
      </div>
      <QuickSplits splits={splits} />
    </div>
  );
}
