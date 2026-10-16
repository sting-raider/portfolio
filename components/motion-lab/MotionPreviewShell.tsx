"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { animate, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Soul } from "../Soul";

export const studies = [
  { id: "battle", name: "Battle Theatre", port: 3001 },
  { id: "cinema", name: "Fountain Descent", port: 3002 },
  { id: "inventory", name: "Save File OS", port: 3003 },
];

export function MotionPreviewShell({ children, variant }: { children: ReactNode; variant: string }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30 });
  const study = studies.find((item) => item.id === variant) || studies[0];

  useEffect(() => {
    if (!root.current || reduced || pathname === "/") return;
    // One observer per route; animate transforms, never scroll-driven React state.
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        void animate(element, { opacity: [0, 1], y: [variant === "cinema" ? 42 : 20, 0] }, {
          duration: .55, ease: [.22, 1, .36, 1], delay: Number(element.dataset.motionOrder || 0) * .035,
        });
        observer.unobserve(element);
      });
    }, { threshold: .08 });
    const elements = root.current.querySelectorAll<HTMLElement>(".project-card, .project-stat, .inventory-tabs button, .timeline-item, .education-card, .project-overview > div");
    elements.forEach((element, index) => {
      element.dataset.motionOrder = String(index % 4);
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, [pathname, reduced, variant]);

  return (
    <>
      <motion.div className="ml-reading-line" style={{ scaleX: reduced ? scrollYProgress : progress }} />
      <div className="ml-study-strip">
        <span>LOCAL MOTION STUDY / {String(studies.indexOf(study) + 1).padStart(2, "0")} <strong>{study.name}</strong></span>
        <nav aria-label="Compare motion studies">{studies.map((item, index) => <a key={item.id} href={`http://localhost:${item.port}/`} aria-current={variant === item.id ? "page" : undefined}>0{index + 1}</a>)}</nav>
      </div>
      <main id="main-content" className="ml-main" ref={root}>
        <motion.div key={pathname} initial={reduced ? false : { opacity: 0, y: variant === "inventory" ? 12 : 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, ease: [.22, 1, .36, 1] }}>
          {children}
        </motion.div>
      </main>
      {!reduced && <motion.div key={`wipe-${pathname}`} className={`ml-route-wipe ml-route-wipe--${variant}`} aria-hidden="true" initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: .5, ease: [.76, 0, .24, 1] }}><Soul color={variant === "inventory" ? "orange" : variant === "cinema" ? "green" : "red"} /></motion.div>}
    </>
  );
}
