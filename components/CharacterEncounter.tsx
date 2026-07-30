"use client";

import { assetUrl } from "@/lib/site";
import {
  RasterizedTypewriterLines,
  type RasterizedDialogueLine,
} from "./RasterizedTypewriterLines";
import { useCharacterTypewriter } from "./useCharacterTypewriter";

type CharacterEncounterProps = {
  character: "sans" | "papyrus";
  name: string;
  line: string;
  src: string;
  lineImages?: RasterizedDialogueLine[];
};

export function CharacterEncounter({ character, name, line, src, lineImages }: CharacterEncounterProps) {
  const spokenText = lineImages?.map((item) => item.text).join("\n") ?? line;
  const { visibleCharacters, complete, started, finish } = useCharacterTypewriter({
    text: spokenText,
    voiceUrl: assetUrl(character === "sans" ? "/assets/sfx/sans-talk.wav" : "/assets/sfx/papyrus-talk.wav"),
    speed: character === "sans" ? 36 : 31,
    volume: character === "sans" ? 0.14 : 0.16,
    initialDelay: 360,
  });

  return (
    <aside className={`character-encounter character-encounter--${character}`} aria-label={`${name} says: ${line}`}>
      <div className="character-encounter__stage" aria-hidden="true">
        <img src={src} alt="" />
      </div>
      <button
        type="button"
        className="character-encounter__dialogue"
        onClick={finish}
        aria-label={`${name} says: ${line} ${complete ? "" : "Finish this line."}`}
      >
        <strong>{name}</strong>
        {lineImages ? (
          <>
            <RasterizedTypewriterLines lines={lineImages} visibleCharacters={visibleCharacters} />
            <p className="sr-only">{spokenText}</p>
          </>
        ) : (
          <p aria-hidden="true">
            {line.slice(0, visibleCharacters)}
            {!complete && started && <span className="game-dialogue__cursor">▮</span>}
          </p>
        )}
        {lineImages && !complete && started && <span className="game-dialogue__cursor character-encounter__cursor" aria-hidden="true">▮</span>}
        <span aria-hidden="true">{complete ? "▼" : ""}</span>
      </button>
    </aside>
  );
}
