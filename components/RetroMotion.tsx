"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Keep native scrolling. Motion happens at game-like beats, not on a spring
// chasing every scroll event; sprites and glyphs stay on whole pixel coordinates.
export function RetroMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.getElementById("main-content");
    if (!root) return;
    const scenes = Array.from(root.querySelectorAll<HTMLElement>(
      ".save-panel, .archive-stage, .final-choice, .section-heading, .project-stat, .project-overview > div, .education-card, .timeline-item, .project-boundary",
    ));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        target.classList.add("retro-entered");
        observer.unobserve(target);
      });
    }, { threshold: .15 });
    const setup = () => {
      observer.disconnect();
      scenes.forEach((element) => {
        element.classList.remove("retro-entered", "retro-ready");
        if (!preference.matches && pathname.replace(/\/$/, "") !== "/quick") {
          element.classList.add("retro-ready");
          observer.observe(element);
        }
      });
    };
    setup();
    preference.addEventListener("change", setup);
    const revealFocused = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const scene = event.target.closest(".retro-ready");
      scene?.classList.add("retro-entered");
    };
    root.addEventListener("focusin", revealFocused);

    const menus = Array.from(root.querySelectorAll<HTMLElement>("[data-encounter-menu], .battle-menu, .inventory-tabs"));
    const cleanups = menus.map((menu) => {
      const options = Array.from(menu.querySelectorAll<HTMLElement>(":scope > a, :scope > button"));
      const cursor = menu.querySelector<HTMLElement>(".encounter-cursor");
      let selected = -1;
      const select = (index: number) => {
        if (!options[index]) return;
        options[selected]?.classList.remove("retro-selected");
        options[index].classList.add("retro-selected");
        selected = index;
        if (cursor) {
          const marker = options[index].querySelector(".encounter__soul, .project-card__soul");
          if (!marker) return;
          const origin = menu.getBoundingClientRect();
          const anchor = marker.getBoundingClientRect();
          cursor.style.transform = `translate(${Math.round(anchor.left - origin.left)}px, ${Math.round(anchor.top - origin.top)}px)`;
        }
      };
      const onIntent = (event: Event) => {
        if (!(event.target instanceof Element)) return;
        const option = event.target.closest<HTMLElement>("a, button");
        const index = option ? options.indexOf(option) : -1;
        if (index >= 0) select(index);
      };
      const onKey = (event: KeyboardEvent) => {
        if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const backwards = event.key === "ArrowUp" || event.key === "ArrowLeft";
        const index = event.key === "Home" ? 0 : event.key === "End" ? options.length - 1 : (selected + (backwards ? -1 : 1) + options.length) % options.length;
        select(index);
        options[index]?.focus();
      };
      const resize = new ResizeObserver(() => { if (selected >= 0) select(selected); });
      const rowObserver = new IntersectionObserver((entries) => {
        if (menu.contains(document.activeElement)) return;
        const entered = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (entered) select(options.indexOf(entered.target as HTMLElement));
      }, { threshold: .65 });
      if (cursor) options.forEach((option) => rowObserver.observe(option));
      resize.observe(menu);
      menu.classList.add("retro-menu");
      menu.addEventListener("pointerover", onIntent);
      menu.addEventListener("focusin", onIntent);
      menu.addEventListener("keydown", onKey);
      select(0);
      return () => {
        resize.disconnect();
        rowObserver.disconnect();
        menu.classList.remove("retro-menu");
        options.forEach((option) => option.classList.remove("retro-selected"));
        menu.removeEventListener("pointerover", onIntent);
        menu.removeEventListener("focusin", onIntent);
        menu.removeEventListener("keydown", onKey);
      };
    });
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", setup);
      root.removeEventListener("focusin", revealFocused);
      scenes.forEach((element) => element.classList.remove("retro-ready", "retro-entered"));
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [pathname]);

  return <div key={pathname} className="retro-room-cut" aria-hidden="true"><span /><span /><span /><span /></div>;
}
