"use client";

import { useEffect, useRef, useState } from "react";
import { assetUrl } from "@/lib/site";
import {
  RasterizedTypewriterLines,
  type RasterizedDialogueLine,
} from "./RasterizedTypewriterLines";
import { useCharacterTypewriter } from "./useCharacterTypewriter";

const lines: RasterizedDialogueLine[] = [
  {
    src: assetUrl("/assets/dialogue/sans-home-1.png"),
    text: "* these files are pretty cool.",
  },
  {
    src: assetUrl("/assets/dialogue/sans-home-2.png"),
    text: "* and by cool, i mean some of them use kubernetes.",
  },
];

const fullLine = lines.map((line) => line.text).join("\n");

export function SansDialogue() {
  const dialogueRef = useRef<HTMLButtonElement | null>(null);
  const [inView, setInView] = useState(false);
  const { visibleCharacters, complete, started, finish } = useCharacterTypewriter({
    text: fullLine,
    voiceUrl: assetUrl("/assets/sfx/sans-talk.wav"),
    speed: 36,
    volume: 0.14,
    enabled: inView,
    initialDelay: 180,
  });

  useEffect(() => {
    const dialogue = dialogueRef.current;
    if (!dialogue) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(dialogue);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      ref={dialogueRef}
      type="button"
      className="sans-dialogue"
      onClick={finish}
      aria-label={`Sans says: ${fullLine} ${complete ? "" : "Finish this line."}`}
    >
      <strong>SANS</strong>
      <RasterizedTypewriterLines lines={lines} visibleCharacters={visibleCharacters} />
      {!complete && started && <span className="game-dialogue__cursor" aria-hidden="true">▮</span>}
      <span className="sr-only">{fullLine}</span>
      <i aria-hidden="true">{complete ? "▼" : ""}</i>
    </button>
  );
}
