"use client";

import { useEffect, useRef, useState } from "react";
import { Soul } from "./Soul";

type Split = { id: string; label: string };

const format = (ms: number) => {
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const cs = Math.floor((ms % 1000) / 10);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
};

// LiveSplit-style panel: the run timer starts on load, and each section records a split when it scrolls into view.
export function QuickSplits({ splits }: { splits: Split[] }) {
  const timerRef = useRef<HTMLSpanElement>(null);
  const [times, setTimes] = useState<(number | null)[]>(() => splits.map(() => null));
  const [current, setCurrent] = useState(0);
  const finished = times[times.length - 1] !== null;

  useEffect(() => {
    const start = performance.now();
    const recorded = splits.map(() => null as number | null);
    let frame = 0;
    let done = false;

    const tick = () => {
      if (timerRef.current) timerRef.current.textContent = format(performance.now() - start);
      if (!done) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const index = splits.findIndex((split) => split.id === entry.target.id);
        if (index < 0) continue;
        setCurrent(index);
        // Reaching a later split also completes every earlier one, as in a real run.
        let changed = false;
        for (let i = 0; i <= index; i++) {
          if (recorded[i] === null) { recorded[i] = performance.now() - start; changed = true; }
        }
        if (changed) setTimes([...recorded]);
        if (index === splits.length - 1 && !done) {
          done = true;
          if (timerRef.current) timerRef.current.textContent = format(recorded[index] ?? 0);
        }
      }
    }, { rootMargin: "0px 0px -45% 0px" });

    splits.forEach((split) => {
      const element = document.getElementById(split.id);
      if (element) observer.observe(element);
    });
    return () => {
      done = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [splits]);

  return (
    <aside className={`qv-splits ${finished ? "is-finished" : ""}`} aria-label="Page sections">
      <p className="qv-splits__title">RECRUITER% <small>ANY% · NO SKIPS</small></p>
      <ol>
        {splits.map((split, index) => (
          <li key={split.id} className={`${index === current ? "is-current" : ""} ${times[index] !== null ? "is-done" : ""}`}>
            <a href={`#${split.id}`}>
              <span className="qv-splits__soul" aria-hidden="true"><Soul size="small" /></span>
              {split.label}
              <time aria-hidden="true">{times[index] === null ? "-" : format(times[index] as number)}</time>
            </a>
          </li>
        ))}
      </ol>
      <p className="qv-splits__timer" aria-hidden="true"><span ref={timerRef}>00:00.00</span></p>
      <p className="qv-splits__status" aria-live="polite">{finished ? "* RUN COMPLETE. NEW PERSONAL BEST!" : "* SCROLL TO SPLIT"}</p>
    </aside>
  );
}
