"use client";

import { useCallback, useEffect, useState } from "react";
import { assetUrl } from "@/lib/site";
import { useCharacterTypewriter } from "./useCharacterTypewriter";

type Speaker = "RALSEI" | "SUSIE" | "KRIS";

type DialogueLine = {
  speaker: Speaker;
  src: string;
  text: string;
  voice?: string;
  speed: number;
};

const lines: DialogueLine[] = [
  {
    speaker: "RALSEI",
    src: assetUrl("/assets/portraits/ralsei.webp"),
    text: "* This is Ali's portfolio. It has more distributed systems than I expected.",
    voice: assetUrl("/assets/sfx/ralsei-talk.wav"),
    speed: 33,
  },
  {
    speaker: "SUSIE",
    src: assetUrl("/assets/portraits/susie.webp"),
    text: "* Pick PROJECTS. That's where he keeps the actually dangerous stuff.",
    voice: assetUrl("/assets/sfx/susie-talk.wav"),
    speed: 31,
  },
  {
    speaker: "KRIS",
    src: assetUrl("/assets/portraits/kris.webp"),
    text: "* ...",
    speed: 58,
  },
  {
    speaker: "RALSEI",
    src: assetUrl("/assets/portraits/ralsei.webp"),
    text: "* Use the command menu below, or press Space to keep talking.",
    voice: assetUrl("/assets/sfx/ralsei-talk.wav"),
    speed: 33,
  },
  {
    speaker: "KRIS",
    src: assetUrl("/assets/portraits/kris.webp"),
    text: "* (Despite everything, it's still Ali's portfolio.)",
    speed: 48,
  },
];

export function GameDialogue({ initialDelay }: { initialDelay?: number } = {}) {
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const line = lines[index];
  const { visibleCharacters, complete: lineComplete, finish } = useCharacterTypewriter({
    text: line.text,
    voiceUrl: line.voice,
    speed: line.speed,
    volume: line.speaker === "SUSIE" ? 0.65 : 0.95,
    enabled: ready,
    initialDelay: 0,
  });

  const advance = useCallback(() => {
    if (!ready) setReady(true);
    else if (!lineComplete) finish();
    else setIndex((value) => (value + 1) % lines.length);
  }, [finish, lineComplete, ready]);

  useEffect(() => {
    [...new Set(lines.map((line) => line.src))].forEach((src) => {
      const image = new Image();
      image.src = src;
    });

    const introAlreadySeen = window.sessionStorage.getItem("ali-intro-seen") === "yes";
    const startTimer = window.setTimeout(() => setReady(true), initialDelay ?? (introAlreadySeen ? 180 : 2920));
    return () => window.clearTimeout(startTimer);
  }, [initialDelay]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        advance();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [advance]);

  return (
    <button
      type="button"
      className="game-dialogue"
      data-speaker={line.speaker}
      onClick={advance}
      aria-label={`${line.speaker} says: ${line.text} ${lineComplete ? "Advance dialogue." : "Finish this line."}`}
    >
      <span
        className={`game-dialogue__portrait portrait--${line.speaker.toLowerCase()}`}
      >
        <img
          className="portrait-sprite portrait-sprite--face"
          src={line.src}
          alt=""
        />
      </span>

      <span className="game-dialogue__copy">
        <strong>{line.speaker}</strong>
        <span className="game-dialogue__text" aria-hidden="true">
          {line.text.slice(0, visibleCharacters)}
          {!lineComplete && ready && <span className="game-dialogue__cursor">▮</span>}
        </span>
      </span>

      <i aria-hidden="true">{lineComplete ? "▼" : ""}</i>
    </button>
  );
}
