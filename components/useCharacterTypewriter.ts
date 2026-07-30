"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type CharacterTypewriterOptions = {
  text: string;
  voiceUrl: string;
  speed?: number;
  volume?: number;
  enabled?: boolean;
  initialDelay?: number;
};

function characterDelay(character: string, baseDelay: number) {
  if (/[.!?]/.test(character)) return baseDelay + 155;
  if (/[,;:]/.test(character)) return baseDelay + 75;
  if (character === " " || character === "\n") return Math.max(12, baseDelay - 13);
  return baseDelay;
}

export function useCharacterTypewriter({
  text,
  voiceUrl,
  speed = 34,
  volume = 0.15,
  enabled = true,
  initialDelay = 260,
}: CharacterTypewriterOptions) {
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const [started, setStarted] = useState(false);
  const audioPool = useRef<HTMLAudioElement[]>([]);
  const audioCursor = useRef(0);
  const complete = visibleCharacters >= text.length;

  useEffect(() => {
    audioPool.current = Array.from({ length: 4 }, () => {
      const audio = new Audio(voiceUrl);
      audio.preload = "auto";
      audio.volume = volume;
      return audio;
    });

    return () => {
      audioPool.current.forEach((audio) => {
        audio.pause();
        audio.removeAttribute("src");
      });
      audioPool.current = [];
    };
  }, [voiceUrl, volume]);

  useEffect(() => {
    setVisibleCharacters(0);
    setStarted(false);
  }, [text]);

  useEffect(() => {
    if (!enabled || started) return;
    const timer = window.setTimeout(() => setStarted(true), initialDelay);
    return () => window.clearTimeout(timer);
  }, [enabled, initialDelay, started]);

  useEffect(() => {
    if (!started || complete) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisibleCharacters(text.length);
      return;
    }

    const character = text[visibleCharacters];
    const timer = window.setTimeout(() => {
      setVisibleCharacters((value) => Math.min(value + 1, text.length));

      if (/[A-Za-z0-9]/.test(character) && audioPool.current.length) {
        const audio = audioPool.current[audioCursor.current % audioPool.current.length];
        audioCursor.current += 1;
        audio.currentTime = 0;
        void audio.play().catch(() => {
          // Direct visits can be silent until a browser accepts the first gesture.
        });
      }
    }, characterDelay(character, speed));

    return () => window.clearTimeout(timer);
  }, [complete, speed, started, text, visibleCharacters]);

  const finish = useCallback(() => {
    setStarted(true);
    setVisibleCharacters(text.length);
  }, [text.length]);

  return { visibleCharacters, complete, started, finish };
}
