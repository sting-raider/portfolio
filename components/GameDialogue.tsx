"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { assetUrl } from "@/lib/site";

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

function characterDelay(character: string, baseDelay: number) {
  if (/[.!?]/.test(character)) return baseDelay + 170;
  if (/[,;:]/.test(character)) return baseDelay + 85;
  if (character === " ") return Math.max(12, baseDelay - 14);
  return baseDelay;
}

export function GameDialogue() {
  const [index, setIndex] = useState(0);
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const [ready, setReady] = useState(false);
  const voicePools = useRef<Record<Speaker, HTMLAudioElement[]>>({
    RALSEI: [],
    SUSIE: [],
    KRIS: [],
  });
  const voiceCursor = useRef<Record<Speaker, number>>({
    RALSEI: 0,
    SUSIE: 0,
    KRIS: 0,
  });
  const line = lines[index];
  const lineComplete = visibleCharacters >= line.text.length;

  const playVoice = useCallback((speaker: Speaker, character: string) => {
    if (!/[A-Za-z0-9]/.test(character)) return;

    const pool = voicePools.current[speaker];
    if (!pool.length) return;

    const cursor = voiceCursor.current[speaker] % pool.length;
    const audio = pool[cursor];
    voiceCursor.current[speaker] = cursor + 1;
    audio.currentTime = 0;
    void audio.play().catch(() => {
      // Browsers can block sound until the first user gesture; typing still continues.
    });
  }, []);

  const advance = useCallback(() => {
    if (!ready) {
      setReady(true);
      return;
    }

    if (visibleCharacters < line.text.length) {
      setVisibleCharacters(line.text.length);
      return;
    }

    setIndex((value) => (value + 1) % lines.length);
    setVisibleCharacters(0);
  }, [line.text.length, ready, visibleCharacters]);

  useEffect(() => {
    const portraits = [...new Set(lines.map((line) => line.src))];

    portraits.forEach((src) => {
      const image = new Image();
      image.src = src;
    });

    for (const dialogueLine of lines) {
      if (!dialogueLine.voice || voicePools.current[dialogueLine.speaker].length) continue;

      voicePools.current[dialogueLine.speaker] = Array.from({ length: 4 }, () => {
        const audio = new Audio(dialogueLine.voice);
        audio.preload = "auto";
        audio.volume = dialogueLine.speaker === "SUSIE" ? 0.16 : 0.13;
        return audio;
      });
    }

    const introAlreadySeen = window.sessionStorage.getItem("ali-intro-seen") === "yes";
    const startTimer = window.setTimeout(() => setReady(true), introAlreadySeen ? 180 : 2920);

    return () => {
      window.clearTimeout(startTimer);
      Object.values(voicePools.current).flat().forEach((audio) => {
        audio.pause();
        audio.removeAttribute("src");
      });
    };
  }, []);

  useEffect(() => {
    if (!ready || lineComplete) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setVisibleCharacters(line.text.length);
      return;
    }

    const character = line.text[visibleCharacters];
    const timer = window.setTimeout(() => {
      setVisibleCharacters((value) => Math.min(value + 1, line.text.length));
      if (line.voice) playVoice(line.speaker, character);
    }, characterDelay(character, line.speed));

    return () => window.clearTimeout(timer);
  }, [line, lineComplete, playVoice, ready, visibleCharacters]);

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
