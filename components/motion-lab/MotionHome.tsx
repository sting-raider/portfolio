"use client";

import Link from "next/link";
import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionStyle, type MotionValue } from "motion/react";
import { ArrowDown, ArrowUpRight, ChevronRight, Download } from "lucide-react";
import { projects, skillGroups, type Project } from "@/data/portfolio";
import { assetUrl, resumeDownloadUrl } from "@/lib/site";
import { GameDialogue } from "../GameDialogue";
import { SansDialogue } from "../SansDialogue";
import { Soul } from "../Soul";

const spring = { type: "spring" as const, stiffness: 280, damping: 29 };
const commands = [
  { title: "FIGHT", label: "Projects", href: "/projects", color: "red" as const },
  { title: "ACT", label: "About Ali", href: "/about", color: "green" as const },
  { title: "ITEM", label: "Skills", href: "/skills", color: "orange" as const },
  { title: "MERCY", label: "Contact", href: "/contact", color: "yellow" as const },
];

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .7, ease: [.22, 1, .36, 1], delay }}>{children}</motion.div>;
}

function LetterTitle({ text, className = "" }: { text: string; className?: string }) {
  const reduced = useReducedMotion();
  return <span className={`ml-letters ${className}`} aria-label={text}>{text.split("").map((letter, index) => <motion.span aria-hidden="true" key={index} initial={reduced ? false : { y: "110%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .65, ease: [.16, 1, .3, 1], delay: .12 + index * .045 }}>{letter === " " ? "\u00a0" : letter}</motion.span>)}</span>;
}

function CommandMenu({ compact = false }: { compact?: boolean }) {
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  return <nav className={`ml-commands ${compact ? "ml-commands--compact" : ""}`} aria-label="Portfolio commands">{commands.map((command, index) => <motion.div key={command.title} whileHover={reduced ? undefined : { y: -6 }} whileTap={reduced ? undefined : { scale: .97 }} transition={spring}>
    <Link href={command.href} onPointerEnter={() => setSelected(index)} onFocus={() => setSelected(index)} className={selected === index ? "is-selected" : ""}>
      {selected === index && <motion.span layoutId="command-soul" className="ml-command-soul" transition={reduced ? { duration: 0 } : spring}><Soul color={command.color} size="small" /></motion.span>}
      <strong>{command.title}</strong><small>{command.label}</small>
    </Link>
  </motion.div>)}</nav>;
}

function SavePoint() {
  const [saved, setSaved] = useState(false);
  return <Reveal className="ml-save-point"><button className={`ml-save-star ${saved ? "is-saved" : ""}`} onClick={() => setSaved(!saved)} aria-label="Activate the save point">✦</button><div><p>* {saved ? "Your progress has been saved. The future remains unwritten." : "Eight ambitious projects fill you with determination."}</p><span>ALI SUFIYAN KHAN / LV 20 / SOFTWARE ENGINEER</span></div><a href={resumeDownloadUrl} download className="ml-button" data-umami-event="resume-download"><Download size={18} />SAVE / RÉSUMÉ</a></Reveal>;
}

function ProjectRecord({ project }: { project: Project }) {
  return <>
    <p className="ml-kicker">{project.world}</p><h3>{project.shortName}</h3><p className="ml-project-summary">{project.summary}</p>
    <div className="ml-proof"><strong>{project.metric}</strong><span>{project.metricLabel}</span></div>
    <div className="ml-stack">{project.stack.slice(0, 5).map((item) => <span key={item}>{item}</span>)}</div>
    <Link href={`/projects/${project.slug}`} className="ml-button"><Soul color="yellow" size="small" />CHECK THE BUILD<ArrowUpRight size={20} /></Link>
  </>;
}

function SystemFlow({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);
  const reduced = useReducedMotion();
  return <div className="ml-system-flow"><button onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>[ {expanded ? "CLOSE" : "TRACE"} SYSTEM FLOW ]<motion.span animate={{ rotate: expanded ? 90 : 0 }} transition={spring}><ChevronRight size={17} /></motion.span></button>
    <AnimatePresence initial={false}>{expanded && <motion.ol initial={reduced ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .3, ease: [.22,1,.36,1] }}>{project.architecture.map((step, index) => <motion.li key={step.name} initial={reduced ? false : { opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ ...spring, delay: .09 * index }}><span>0{index + 1}</span><div><strong>{step.name}</strong><small>{step.tech} · {step.role}</small></div></motion.li>)}</motion.ol>}</AnimatePresence>
  </div>;
}

function ProjectSelector({ inventory = false }: { inventory?: boolean }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const project = projects[active];
  return <section className={`ml-project-selector ${inventory ? "ml-project-selector--inventory" : ""}`} id="encounters">
    <Reveal className="ml-section-head"><p className="ml-kicker">{inventory ? "CREATION / SELECT A SAVE SLOT" : "ENCOUNTER 02 / THE PROJECT ARCHIVE"}</p><h2>{inventory ? "EVERY FILE\nHAS A STORY." : "PICK YOUR\nENCOUNTER."}</h2><p>Eight systems. Real builds, results, and limits.</p></Reveal>
    <div className="ml-select-layout">
      <div className="ml-project-menu" role="tablist" aria-label="Inspect projects" onKeyDown={(event) => { if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return; event.preventDefault(); const next = event.key === "Home" ? 0 : event.key === "End" ? projects.length - 1 : (active + (event.key === "ArrowDown" ? 1 : -1) + projects.length) % projects.length; setActive(next); (event.currentTarget.children[next] as HTMLButtonElement).focus(); }}>
        {projects.map((item, index) => <button key={item.slug} id={`slot-${index}`} role="tab" aria-selected={active === index} aria-controls="selected-project" tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} className={active === index ? "is-active" : ""}>
          {active === index && <motion.span className="ml-slot-highlight" layoutId="project-highlight" transition={reduced ? { duration: 0 } : spring} />}
          <span className="ml-slot-soul">{active === index ? <motion.span layoutId="project-soul" transition={spring}><Soul color={inventory ? "orange" : "red"} size="small" /></motion.span> : <span className="ml-slot-dash">—</span>}</span><span className="ml-slot-number">0{index + 1}</span><span className="ml-slot-name">{item.shortName}<small>{item.kind}</small></span><ChevronRight size={18} />
        </button>)}
      </div>
      <div className="ml-selected-project" role="tabpanel" id="selected-project" aria-labelledby={`slot-${active}`} style={{ "--project-accent": project.accent } as CSSProperties}>
        <div className="ml-record-top"><span>FILE 0{active + 1} / 08</span><span>{project.status}</span></div>
        <AnimatePresence mode="wait" initial={false}><motion.div key={active} initial={reduced ? false : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={reduced ? undefined : { opacity: 0, x: -15 }} transition={{ duration: .22 }} className="ml-record-body"><ProjectRecord project={project} /><SystemFlow project={project} /></motion.div></AnimatePresence>
      </div>
    </div>
  </section>;
}

function Ending() {
  return <section className="ml-ending"><Reveal><p className="ml-kicker">YOU MADE IT TO THE SAVE POINT.</p><h2>THE NEXT CHAPTER<br /><span>ISN&apos;T WRITTEN.</span></h2><p>* Maybe we should build something together.</p><div><Link href="/contact" className="ml-button"><Soul color="green" size="small" />LET&apos;S TALK<ArrowUpRight size={20} /></Link><Link href="/quick" className="ml-text-link">JUST THE FACTS / 60-SECOND VIEW →</Link></div></Reveal></section>;
}

function BattleHome() {
  const stage = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 120, damping: 20 });
  const y = useSpring(pointerY, { stiffness: 120, damping: 20 });
  const soulX = useTransform(x, (value) => value * 8);
  return <div className="ml-home ml-home--battle">
    <section className="ml-battle-hero" ref={stage} onPointerMove={(event) => { if (reduced || event.pointerType === "touch") return; const bounds = event.currentTarget.getBoundingClientRect(); pointerX.set((event.clientX - bounds.left - bounds.width / 2) * .035); pointerY.set((event.clientY - bounds.top - bounds.height / 2) * .035); }} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
      <div className="ml-battle-hud"><span>ALI / LV 20</span><span>HP <i /> 20 / 20</span><span>ENCOUNTER 01</span></div>
      <div className="ml-battle-title"><p className="ml-kicker">A NEW DEVELOPER APPEARED.</p><h1><LetterTitle text="ALI'S" /><LetterTitle text="DARK WORLD" className="ml-purple-title" /></h1><p>SOFTWARE ENGINEER · AI BUILDER · HUMAN</p></div>
      <motion.div className="ml-battle-fountain" style={{ x, y }} aria-hidden="true"><img src={assetUrl("/assets/game/dark-fountain.webp")} alt="" /></motion.div>
      <motion.div className="ml-battle-soul" style={{ x: reduced ? 0 : soulX }} animate={reduced ? undefined : { y: [0, -9, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}><Soul color="red" size="large" interactive /></motion.div>
      <div className="ml-battle-caption"><span>YOUR TURN.</span><p>* Your SOUL follows your pointer. Choose a command below.</p><a href="#encounters" aria-label="Scroll to project encounters"><ArrowDown size={20} /></a></div>
    </section>
    <div className="ml-battle-interface"><GameDialogue initialDelay={250} /><CommandMenu /></div>
    <SavePoint />
    <ProjectSelector />
    <Reveal className="ml-sans-interlude"><img src={assetUrl("/assets/sprites/sans-overworld.png")} alt="Sans" /><SansDialogue /><Link href="/projects" className="ml-text-link">VIEW ALL PROJECT RECORDS →</Link></Reveal>
    <Ending />
  </div>;
}

function CinematicProject({ project, index, progress }: { project: Project; index: number; progress: MotionValue<number> }) {
  const reduced = useReducedMotion();
  const start = .13 + index * .2;
  const y = useTransform(progress, [start, start + .24], [520 + index * 60, 20]);
  const rotate = useTransform(progress, [start, start + .24], [index % 2 ? 10 : -10, 0]);
  const opacity = useTransform(progress, [start, start + .15], [0, 1]);
  return <motion.article className="ml-cinema-card" style={{ y: reduced ? 0 : y, rotate: reduced ? 0 : rotate, opacity: reduced ? 1 : opacity, "--project-accent": project.accent } as MotionStyle}>
    <div className="ml-record-top"><span>0{index + 1} / ENGINEERING RECORD</span></div><ProjectRecord project={project} />
  </motion.article>;
}

function FountainDescent() {
  const hero = useRef<HTMLElement>(null);
  const chamber = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress: heroProgress } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const { scrollYProgress: chamberProgress } = useScroll({ target: chamber, offset: ["start end", "end end"] });
  const smooth = useSpring(heroProgress, { stiffness: 150, damping: 32 });
  const depth = useSpring(chamberProgress, { stiffness: 170, damping: 34 });
  const fountainScale = useTransform(smooth, [0, 1], [1, 1.6]);
  const titleY = useTransform(smooth, [0, 1], [0, -180]);
  const titleOpacity = useTransform(smooth, [0, .7], [1, 0]);
  const leftX = useTransform(depth, [0, .6], [0, -220]);
  const rightX = useTransform(depth, [0, .6], [0, 220]);
  const chamberTitleOpacity = useTransform(depth, [.2, .42], [1, 0]);
  return <div className="ml-home ml-home--cinema">
    <section className="ml-cinema-hero" ref={hero}>
      <motion.div className="ml-cinema-fountain" style={{ scale: reduced ? 1 : fountainScale }} aria-hidden="true"><img src={assetUrl("/assets/game/dark-fountain.webp")} alt="" /></motion.div>
      <motion.div className="ml-cinema-title" style={{ y: reduced ? 0 : titleY, opacity: reduced ? 1 : titleOpacity }}><p className="ml-kicker">WELCOME TO THE OTHER SIDE.</p><h1><LetterTitle text="ALI'S" /><LetterTitle text="DARK WORLD" className="ml-purple-title" /></h1><p>SOFTWARE ENGINEER · AI BUILDER · HUMAN</p></motion.div>
      <div className="ml-descent-cue"><Soul color="green" size="small" /><a href="#descent">DESCEND INTO THE WORK<motion.span animate={reduced ? undefined : { y: [0, 9, 0] }} transition={{ duration: 2, repeat: Infinity }}><ArrowDown size={22} /></motion.span></a></div>
    </section>
    <Reveal className="ml-cinema-interface"><GameDialogue initialDelay={250} /><CommandMenu compact /></Reveal>
    <section className="ml-descent-chamber" ref={chamber} id="descent">
      <div className="ml-descent-stage">
        <p className="ml-kicker">BEYOND THE FOUNTAIN / SELECTED BUILDS</p>
        <motion.h2 className="ml-split-title" style={{ opacity: reduced ? 1 : chamberTitleOpacity }}><motion.span style={{ x: reduced ? 0 : leftX }}>IDEAS BECOME</motion.span><motion.span style={{ x: reduced ? 0 : rightX }}>REAL SYSTEMS.</motion.span></motion.h2>
        <div className="ml-cinema-deck">{projects.slice(0, 3).map((project, index) => <CinematicProject key={project.slug} project={project} index={index} progress={depth} />)}</div>
        <div className="ml-depth-meter"><span>DESCENT</span><span className="ml-depth-track"><motion.i style={{ scaleX: depth }} /></span><span>03 RECORDS</span></div>
      </div>
    </section>
    <Reveal className="ml-sans-interlude"><img src={assetUrl("/assets/sprites/sans-overworld.png")} alt="Sans" /><SansDialogue /><Link href="/projects" className="ml-text-link">THERE ARE FIVE MORE. CHECK THE ARCHIVE →</Link></Reveal>
    <div className="ml-world-list">{projects.slice(3).map((project, index) => <Reveal key={project.slug}><Link href={`/projects/${project.slug}`}><span>0{index + 4}</span><h3>{project.shortName}</h3><span>{project.kind}</span><ArrowUpRight /></Link></Reveal>)}</div>
    <SavePoint /><Ending />
  </div>;
}

function SkillsLoadout() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const group = skillGroups[active];
  return <section className="ml-loadout"><Reveal><p className="ml-kicker">KNOWLEDGE / EQUIPMENT MENU</p><h2>TOOLS, EQUIPPED.</h2></Reveal><div className="ml-loadout-layout"><div className="ml-loadout-tabs" role="tablist" aria-label="Skill loadouts">{skillGroups.map((item, index) => <button key={item.title} role="tab" aria-selected={index === active} onClick={() => setActive(index)} className={active === index ? "is-active" : ""}>{index === active && <motion.span className="ml-equipped-soul" layoutId="equipped-soul" transition={spring}><Soul color="orange" size="small" /></motion.span>}{item.title}</button>)}</div><div className="ml-loadout-panel"><AnimatePresence mode="wait" initial={false}><motion.div key={active} initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .18 }}><p className="ml-kicker">{group.level} LOADOUT</p><div className="ml-equipped-items">{group.skills.map((item, index) => <motion.span key={item} initial={reduced ? false : { opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...spring, delay: index * .045 }}>{item}</motion.span>)}</div><p>{group.evidence}</p></motion.div></AnimatePresence></div></div></section>;
}

function InventoryHome() {
  const [tab, setTab] = useState(0);
  const tabs = ["IDENTITY", "CREATION", "KNOWLEDGE"];
  const reduced = useReducedMotion();
  return <div className="ml-home ml-home--inventory">
    <section className="ml-file-hero">
      <div className="ml-file-sidebar"><span className="ml-kicker">PLAYER RECORD</span><Soul color="green" size="large" interactive /><h2>ALI</h2><p>LV 20</p><div className="ml-player-stat"><span>CLASS</span><strong>ENGINEER</strong></div><div className="ml-player-stat"><span>SPECIALTY</span><strong>AI + SYSTEMS</strong></div><div className="ml-player-stat"><span>LOCATION</span><strong>INDIA</strong></div><Link href="/quick" className="ml-text-link">60-SECOND VIEW ↗</Link></div>
      <div className="ml-file-main"><div className="ml-file-toolbar"><span>ALI_SUFIYAN_KHAN.save</span><span>FILE 01 / ACTIVE</span></div>
        <nav className="ml-file-tabs" aria-label="Save file sections">{tabs.map((item, index) => <button key={item} className={tab === index ? "is-active" : ""} onClick={() => { setTab(index); if (index > 0) document.getElementById(index === 1 ? "encounters" : "loadout-start")?.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" }); }}>{tab === index && <motion.span layoutId="file-tab" transition={spring} />}{item}</button>)}</nav>
        <div className="ml-file-title"><p className="ml-kicker">THIS SAVE FILE BELONGS TO</p><h1><LetterTitle text="ALI SUFIYAN" /><LetterTitle text="KHAN." className="ml-purple-title" /></h1><p>Software engineer. AI builder. Habitual system thinker.</p><div className="ml-file-chips"><span>08 PROJECTS</span><span>VIT VELLORE</span><span>B.TECH CSE · 2027</span></div></div>
        <div className="ml-file-dialogue"><GameDialogue initialDelay={250} /></div>
        <CommandMenu compact />
      </div>
    </section>
    <SavePoint /><ProjectSelector inventory /><div id="loadout-start"><SkillsLoadout /></div><Ending />
  </div>;
}

export function MotionHome({ variant }: { variant: string }) {
  if (variant === "cinema") return <FountainDescent />;
  if (variant === "inventory") return <InventoryHome />;
  return <BattleHome />;
}
