"use client";

import { useEffect, useState } from "react";
import { assetUrl } from "@/lib/site";

const lines = [
  {
    speaker: "RALSEI",
    src: assetUrl("/assets/portraits/ralsei.webp"),
    text: "* This is Ali's portfolio. It has more distributed systems than I expected.",
  },
  {
    speaker: "SUSIE",
    src: assetUrl("/assets/portraits/susie.webp"),
    text: "* Pick PROJECTS. That's where he keeps the actually dangerous stuff.",
  },
  {
    speaker: "KRIS",
    src: assetUrl("/assets/portraits/kris.webp"),
    text: "* ...",
  },
  {
    speaker: "RALSEI",
    src: assetUrl("/assets/portraits/ralsei.webp"),
    text: "* Use the command menu below, or press Space to keep talking.",
  },
  {
    speaker: "KRIS",
    src: assetUrl("/assets/portraits/kris.webp"),
    text: "* (Despite everything, it's still Ali's portfolio.)",
  },
];

export function GameDialogue() {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((value) => (value + 1) % lines.length);
  };

  useEffect(() => {
    const portraits = [...new Set(lines.map((line) => line.src))];

    portraits.forEach((src) => {
      const image = new Image();
      image.src = src;
    });

    const handleKey = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        setIndex((value) => (value + 1) % lines.length);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  const line = lines[index];

  return (
    <button
      className="game-dialogue"
      onClick={next}
      aria-label="Advance character dialogue"
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
        <span>{line.text}</span>
      </span>

      <i>▼</i>
    </button>
  );
}
