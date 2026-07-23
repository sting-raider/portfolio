"use client";

import { useEffect, useRef, useState } from "react";

export type SoulColor = "red" | "yellow" | "orange" | "purple" | "green" | "blue" | "cyan";

const colors: SoulColor[] = ["red", "yellow", "orange", "purple", "green", "blue", "cyan"];

type SoulProps = {
  color?: SoulColor;
  interactive?: boolean;
  label?: string;
  size?: "small" | "medium" | "large";
};

export function Soul({ color = "red", interactive = false, label = "Interact with the SOUL", size = "medium" }: SoulProps) {
  const [current, setCurrent] = useState(color);
  const [broken, setBroken] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => setCurrent(color), [color]);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  const pieces = (
    <>
      <span className="pixel-soul__piece pixel-soul__piece--left">
        <svg viewBox="0 0 16 16" aria-hidden="true" shapeRendering="crispEdges">
          <path d="M2 0h4v2h4V0h4v2h2v6h-2v2h-2v2h-2v2H6v-2H4v-2H2V8H0V2h2z" />
        </svg>
      </span>
      <span className="pixel-soul__piece pixel-soul__piece--right">
        <svg viewBox="0 0 16 16" aria-hidden="true" shapeRendering="crispEdges">
          <path d="M2 0h4v2h4V0h4v2h2v6h-2v2h-2v2h-2v2H6v-2H4v-2H2V8H0V2h2z" />
        </svg>
      </span>
    </>
  );

  if (!interactive) {
    return <span className={`pixel-soul pixel-soul--${current} pixel-soul--${size}`} aria-hidden="true">{pieces}</span>;
  }

  const shatter = () => {
    if (broken) return;
    setBroken(true);
    timer.current = window.setTimeout(() => {
      setBroken(false);
      setCurrent((value) => colors[(colors.indexOf(value) + 1) % colors.length]);
    }, 720);
  };

  return (
    <button className={`pixel-soul pixel-soul--${current} pixel-soul--${size} ${broken ? "is-broken" : ""}`} onClick={shatter} aria-label={label} title="Try clicking the SOUL">
      {pieces}
    </button>
  );
}
