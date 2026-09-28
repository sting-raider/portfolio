"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Soul } from "./Soul";

// Observe the existing layout instead of adding wrappers that change its grid.
const targets = [
  ".save-panel", ".snowdin-archive__copy > div", ".encounter-list__head",
  ".encounter", ".final-choice", ".project-card", ".archive-note",
  ".project-stat", ".project-overview > div", ".section-heading",
  ".challenge-card", ".architecture-node", ".learning-note", ".project-next",
  ".project-boundary", ".save-slot", ".inventory-tabs", ".inventory-panel",
  ".education-card", "[data-scroll-reveal]",
].join(", ");

export function ScrollEncounters() {
  const pathname = usePathname().replace(/\/$/, "");
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Quick View stays an immediate, still summary.
    if (pathname === "/quick") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = Array.from(document.querySelectorAll<HTMLElement>(targets));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        element.classList.remove("scroll-waiting");
        element.classList.add("scroll-arrived");
        observer.unobserve(element);
      }
    }, { threshold: 0, rootMargin: "0px 0px -32px 0px" });

    const showAll = () => {
      if (!preference.matches) return;
      observer.disconnect();
      elements.forEach((element) => element.classList.remove("scroll-waiting", "scroll-arrived"));
    };

    if (!preference.matches) {
      elements.forEach((element) => {
        // Server-rendered content and anything already on screen stay visible.
        if (element.getBoundingClientRect().top < window.innerHeight) return;
        element.classList.add("scroll-waiting");
        observer.observe(element);
      });
    }
    preference.addEventListener("change", showAll);

    // Focus must never land on a visually hidden link while tabbing through a page.
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>(".scroll-waiting");
      if (!element) return;
      element.classList.remove("scroll-waiting");
      observer.unobserve(element);
    };
    document.addEventListener("focusin", onFocus);

    return () => {
      observer.disconnect();
      preference.removeEventListener("change", showAll);
      document.removeEventListener("focusin", onFocus);
      elements.forEach((element) => element.classList.remove("scroll-waiting", "scroll-arrived"));
    };
  }, [pathname]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const range = document.documentElement.scrollHeight - window.innerHeight;
      const value = range > 0 ? Math.max(0, Math.min(1, window.scrollY / range)) : 0;
      progressRef.current?.style.setProperty("--room-progress", String(value));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const resize = new ResizeObserver(schedule);
    resize.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  if (pathname === "/quick") return null;
  return (
    <div className="room-progress" ref={progressRef} aria-hidden="true">
      <span className="room-progress__label">ROOM</span>
      <div className="room-progress__track">
        <span className="room-progress__fill" />
        <span className="room-progress__soul"><Soul size="small" color="red" /></span>
      </div>
      <span className="room-progress__save">✦</span>
    </div>
  );
}
