"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type CharacterTypewriterOptions = {
  text: string;
  voiceUrl?: string;
  speed?: number;
  volume?: number;
  enabled?: boolean;
  initialDelay?: number;
};

// Voice blips go through Web Audio: each file is decoded once and every character plays a cheap
// buffer source. Rewinding and replaying an <audio> element per character lags badly on phones.
let audioContext: AudioContext | null = null;
const voiceBuffers = new Map<string, Promise<AudioBuffer | null>>();

function getAudioContext() {
  if (audioContext) return audioContext;
  const Context = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Context) return null;
  audioContext = new Context();
  // Browsers keep the context suspended until a user gesture; resume on the first one.
  const unlock = () => void audioContext?.resume();
  window.addEventListener("pointerdown", unlock, { once: true, capture: true });
  window.addEventListener("keydown", unlock, { once: true, capture: true });
  return audioContext;
}

function loadVoice(url: string) {
  let buffer = voiceBuffers.get(url);
  if (!buffer) {
    const context = getAudioContext();
    buffer = context
      ? fetch(url).then((response) => response.arrayBuffer()).then((data) => context.decodeAudioData(data)).catch(() => null)
      : Promise.resolve(null);
    voiceBuffers.set(url, buffer);
  }
  return buffer;
}

function playVoice(buffer: AudioBuffer | null, volume: number) {
  const context = audioContext;
  if (!buffer || !context || context.state !== "running") return;
  const source = context.createBufferSource();
  const gain = context.createGain();
  source.buffer = buffer;
  gain.gain.value = volume;
  source.connect(gain).connect(context.destination);
  source.start();
}

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
  const voice = useRef<AudioBuffer | null>(null);
  const complete = visibleCharacters >= text.length;

  useEffect(() => {
    voice.current = null;
    if (!voiceUrl) return;
    let current = true;
    void loadVoice(voiceUrl).then((buffer) => { if (current) voice.current = buffer; });
    return () => { current = false; };
  }, [voiceUrl]);

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

    // Each character's reveal time is fixed from the start of the line, so a slow frame
    // catches up on the next one instead of pushing every later character back.
    const due: number[] = [];
    let elapsed = 0;
    for (const character of text) due.push((elapsed += characterDelay(character, speed)));
    const begin = performance.now();
    let shown = 0;
    let frame = 0;

    const tick = (now: number) => {
      let next = shown;
      while (next < text.length && due[next] <= now - begin) next += 1;
      if (next > shown) {
        // At most one blip per frame, even when several characters appear at once.
        if (/[A-Za-z0-9]/.test(text.slice(shown, next))) playVoice(voice.current, volume);
        shown = next;
        setVisibleCharacters(next);
      }
      if (shown < text.length) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [complete, speed, started, text, volume]);

  const finish = useCallback(() => {
    setStarted(true);
    setVisibleCharacters(text.length);
  }, [text.length]);

  return { visibleCharacters, complete, started, finish };
}
