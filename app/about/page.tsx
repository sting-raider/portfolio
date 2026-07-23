import Link from "next/link";
import { ArrowRight, BookOpen, Cpu, GraduationCap, Search } from "lucide-react";
import { Byte } from "@/components/Byte";
import { Reveal } from "@/components/Reveal";

export const metadata = { title: "About" };

export default function AboutPage() {
  const traits = [
    { icon: Search, name: "Curious", text: "Pulls systems apart until the interesting questions become visible." },
    { icon: Cpu, name: "System builder", text: "Likes the whole path: model, product, infrastructure, and the awkward joins between them." },
    { icon: BookOpen, name: "Experiment-led", text: "Turns uncertain ideas into measurable prototypes before overcommitting." },
  ];
  return (
    <div className="page-shell about-character-page">
      <section className="page-hero about-hero">
        <div><p className="eyebrow">Character file / Ali Sufiyan Khan</p><h1>Engineer by training.<br /><em>Explorer</em> by habit.</h1><p className="page-lede">I’m a Computer Science undergraduate at VIT Vellore, interested in software that crosses boundaries: code and physics, AI and evidence, cloud and edge.</p></div>
        <div className="profile-terminal">
          <Byte mood="proud" />
          <div className="profile-terminal__data mono"><span>CLASS</span><strong>Software Engineer / AI Builder</strong><span>LEVEL</span><strong>B.Tech CSE · 2027</strong><span>STATUS</span><strong className="cyan">Building</strong></div>
        </div>
      </section>
      <section className="content-section two-column">
        <Reveal><p className="eyebrow">Origin story</p><h2>I like difficult interfaces between disciplines.</h2></Reveal>
        <Reveal><div className="prose"><p>That has led me from a reinforcement learning agent reading live Formula 1 telemetry, to a robot learning staged manipulation in simulation, to infrastructure spanning an edge node and two public clouds.</p><p>My current product, RoleAtlas, brings those instincts together: distributed systems, responsible data collection, and AI outputs that show their evidence instead of asking for blind trust.</p><p>I care about clean abstractions, reproducible environments, and knowing what fails when the happy path stops being happy.</p></div></Reveal>
      </section>
      <section className="content-section">
        <div className="section-heading"><div><p className="eyebrow">Traits equipped</p><h2>How I approach the work</h2></div></div>
        <div className="trait-grid">{traits.map(({ icon: Icon, name, text }) => <Reveal className="trait-card" key={name}><Icon /><h3>{name}</h3><p>{text}</p></Reveal>)}</div>
      </section>
      <section className="content-section education-card">
        <GraduationCap />
        <div><p className="pixel-label">CURRENT QUEST</p><h2>Vellore Institute of Technology</h2><p>B.Tech in Computer Science and Engineering · August 2023 — May 2027</p><p className="muted">Coursework: Data Structures & Algorithms, Operating Systems, Database Management Systems, and Artificial Intelligence.</p></div>
        <Link href="/journey" className="text-link">See the full path <ArrowRight size={17} /></Link>
      </section>
    </div>
  );
}
