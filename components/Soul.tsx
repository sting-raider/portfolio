"use client";

import { useEffect, useRef, useState } from "react";
import { assetUrl } from "@/lib/site";

export type SoulColor = "red" | "yellow" | "orange" | "purple" | "green" | "blue" | "cyan";

type SoulPhase = "intact" | "split" | "shattering";

type SoulProps = {
  color?: SoulColor;
  interactive?: boolean;
  label?: string;
  size?: "small" | "medium" | "large";
};

export function Soul({ color = "red", interactive = false, label = "Interact with the SOUL", size = "medium" }: SoulProps) {
  const [phase, setPhase] = useState<SoulPhase>("intact");
  const timers = useRef<number[]>([]);
  const crackAudio = useRef<HTMLAudioElement | null>(null);
  const shatterAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    crackAudio.current = new Audio(assetUrl("/assets/sfx/snd_break1.wav"));
    shatterAudio.current = new Audio(assetUrl("/assets/sfx/snd_break2.wav"));
    crackAudio.current.preload = "auto";
    shatterAudio.current.preload = "auto";

    return () => {
      timers.current.forEach(window.clearTimeout);
      timers.current = [];
      crackAudio.current?.pause();
      shatterAudio.current?.pause();
      crackAudio.current = null;
      shatterAudio.current = null;
    };
  }, []);

  const playEffect = (audio: HTMLAudioElement | null) => {
    if (!audio) return;
    audio.currentTime = 0;
    void audio.play().catch(() => {
      // The click is a user gesture, but browsers may still block audio in strict modes.
    });
  };

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
      {interactive ? (
        <span className="pixel-soul__shards" aria-hidden="true">
          {Array.from({ length: 8 }, (_, index) => (
            <span className="pixel-soul__shard" key={index} />
          ))}
        </span>
      ) : null}
    </>
  );

  if (!interactive) {
    return <span className={`pixel-soul pixel-soul--${color} pixel-soul--${size}`} aria-hidden="true">{pieces}</span>;
  }

  const shatter = () => {
    if (phase !== "intact") return;

    setPhase("split");
    playEffect(crackAudio.current);

    timers.current.push(
      window.setTimeout(() => {
        setPhase("shattering");
        playEffect(shatterAudio.current);
      }, 820),
      window.setTimeout(() => {
        setPhase("intact");
        timers.current = [];
      }, 1680),
    );
  };

  const activeColor = phase === "intact" ? color : "red";

  return (
    <button
      className={`pixel-soul pixel-soul--${activeColor} pixel-soul--${size} is-${phase}`}
      onClick={shatter}
      aria-label={phase === "intact" ? label : "The SOUL shattered"}
      aria-disabled={phase !== "intact"}
      title="Try clicking the SOUL"
    >
      {pieces}
    </button>
  );
}
