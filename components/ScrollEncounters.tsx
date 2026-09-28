"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealTargets = [
  ".save-panel", ".final-choice > *", ".project-stat", ".project-overview > div",
  ".section-heading", ".learning-note", ".project-next", ".project-boundary",
  ".education-card", "[data-scroll-reveal]",
].join(", ");
const clamp = (value: number) => Math.max(0, Math.min(1, value));

export function ScrollEncounters() {
  const pathname = usePathname().replace(/\/$/, "");

  useEffect(() => {
    if (pathname === "/quick") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = Array.from(document.querySelectorAll<HTMLElement>(revealTargets));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return;
        target.classList.remove("scroll-waiting");
        target.classList.add("scroll-arrived");
        observer.unobserve(target);
      });
    }, { rootMargin: "0px 0px -24px 0px" });
    if (!preference.matches) elements.forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight) return;
      element.classList.add("scroll-waiting");
      observer.observe(element);
    });
    const showAll = () => {
      observer.disconnect();
      elements.forEach((element) => element.classList.remove("scroll-waiting", "scroll-arrived"));
    };
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      let element = event.target.closest<HTMLElement>(".scroll-waiting");
      while (element) {
        element.classList.remove("scroll-waiting");
        observer.unobserve(element);
        element = element.parentElement?.closest<HTMLElement>(".scroll-waiting") ?? null;
      }
    };
    preference.addEventListener("change", showAll);
    document.addEventListener("focusin", onFocus);
    return () => {
      showAll();
      preference.removeEventListener("change", showAll);
      document.removeEventListener("focusin", onFocus);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/quick") return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hero = document.querySelector<HTMLElement>(".dt-hero");
    const archive = document.querySelector<HTMLElement>(".snowdin-archive");
    const menu = document.querySelector<HTMLElement>("[data-encounter-menu]");
    const cursor = menu?.querySelector<HTMLElement>(".encounter-cursor");
    const cards = Array.from(menu?.querySelectorAll<HTMLElement>(".encounter, .project-card") ?? []);
    if (!hero && !archive && !menu) return;
    let frame = 0;
    let stopped = false;
    let smoothY = window.scrollY;
    let lastTime = 0;
    let active = -1;
    let viewport = window.innerHeight;
    let heroTop = 0, heroHeight = 1, archiveTop = 0, archiveHeight = 1;
    let menuTop = 0;
    let centers: number[] = [];
    let positions: { x: number; y: number }[] = [];

    const choose = (index: number) => {
      if (!cursor || !positions[index]) return;
      if (index !== active) {
        cards[active]?.classList.remove("is-current-encounter");
        cards[index].classList.add("is-current-encounter");
        active = index;
      }
      cursor.style.transform = `translate3d(${positions[index].x}px, ${positions[index].y}px, 0)`;
    };
    const onMenuIntent = (event: Event) => {
      if (preference.matches || !(event.target instanceof Element)) return;
      const card = event.target.closest<HTMLElement>(".encounter, .project-card");
      if (card) choose(cards.indexOf(card));
    };

    const render = (now: number) => {
      frame = 0;
      if (stopped || preference.matches) return;
      // Damping moves artwork only; native wheel, touch and keyboard scrolling stay untouched.
      const delta = Math.min(64, lastTime ? now - lastTime : 16);
      lastTime = now;
      smoothY += (window.scrollY - smoothY) * (1 - Math.exp(-delta / 80));
      if (Math.abs(window.scrollY - smoothY) < .1) smoothY = window.scrollY;
      if (hero && smoothY < heroTop + heroHeight + viewport) {
        hero.style.setProperty("--hero-scroll", String(clamp((smoothY - heroTop) / heroHeight)));
      }
      if (archive) {
        const progress = clamp((smoothY + viewport * .75 - archiveTop) / (archiveHeight - viewport * .25));
        archive.style.setProperty("--archive-progress", String(progress));
      }
      if (menu && cursor && centers.length) {
        const focusLine = window.scrollY + viewport * .53 - menuTop;
        const next = centers.reduce((best, center, index) => Math.abs(center - focusLine) < Math.abs(centers[best] - focusLine) ? index : best, 0);
        const focused = cards.findIndex((card) => card.contains(document.activeElement));
        choose(focused >= 0 ? focused : next);
      }
      if (Math.abs(window.scrollY - smoothY) > .1) frame = requestAnimationFrame(render);
    };
    const schedule = () => { if (!frame && !stopped && !preference.matches) frame = requestAnimationFrame(render); };
    const measure = () => {
      if (stopped) return;
      viewport = window.innerHeight;
      // Cache geometry on layout changes instead of forcing layout in every scroll frame.
      const y = window.scrollY;
      const heroRect = hero?.getBoundingClientRect();
      const archiveRect = archive?.getBoundingClientRect();
      const menuRect = menu?.getBoundingClientRect();
      heroTop = (heroRect?.top ?? 0) + y;
      heroHeight = heroRect?.height ?? 1;
      archiveTop = (archiveRect?.top ?? 0) + y;
      archiveHeight = archiveRect?.height ?? 1;
      menuTop = (menuRect?.top ?? 0) + y;
      centers = cards.map((card) => { const rect = card.getBoundingClientRect(); return rect.top + rect.height / 2 - (menuRect?.top ?? 0); });
      positions = cards.map((card) => {
        const anchor = card.querySelector(".encounter__soul, .project-card__soul")?.getBoundingClientRect();
        return { x: (anchor?.left ?? 0) - (menuRect?.left ?? 0), y: (anchor?.top ?? 0) - (menuRect?.top ?? 0) };
      });
      schedule();
    };
    const syncPreference = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      smoothY = window.scrollY;
      lastTime = 0;
      hero?.classList.toggle("scroll-scene-enabled", !preference.matches);
      archive?.classList.toggle("scroll-scene-enabled", !preference.matches);
      menu?.classList.toggle("scroll-menu-enabled", !preference.matches);
      if (preference.matches) {
        hero?.style.removeProperty("--hero-scroll");
        archive?.style.removeProperty("--archive-progress");
        cards.forEach((card) => card.classList.remove("is-current-encounter"));
        active = -1;
      } else measure();
    };
    const resize = new ResizeObserver(measure);
    resize.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    preference.addEventListener("change", syncPreference);
    menu?.addEventListener("pointermove", onMenuIntent);
    menu?.addEventListener("focusin", onMenuIntent);
    document.fonts.ready.then(() => { if (!stopped) measure(); });
    syncPreference();
    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      preference.removeEventListener("change", syncPreference);
      menu?.removeEventListener("pointermove", onMenuIntent);
      menu?.removeEventListener("focusin", onMenuIntent);
      hero?.classList.remove("scroll-scene-enabled");
      archive?.classList.remove("scroll-scene-enabled");
      menu?.classList.remove("scroll-menu-enabled");
      hero?.style.removeProperty("--hero-scroll");
      archive?.style.removeProperty("--archive-progress");
      cards.forEach((card) => card.classList.remove("is-current-encounter"));
    };
  }, [pathname]);

  return null;
}
