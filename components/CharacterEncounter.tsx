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
  textLines?: string[];
};

export function CharacterEncounter({ character, name, line, src, lineImages, textLines }: CharacterEncounterProps) {
  const fixedTextLines = textLines ?? [line];
  const spokenText = lineImages?.map((item) => item.text).join("\n") ?? fixedTextLines.join("\n");
  const { visibleCharacters, complete, started, finish } = useCharacterTypewriter({
    text: spokenText,
    voiceUrl: assetUrl(character === "sans" ? "/assets/sfx/sans-talk.wav" : "/assets/sfx/papyrus-talk.wav"),
    speed: character === "sans" ? 36 : 31,
    volume: character === "sans" ? 0.85 : 0.9,
    initialDelay: 360,
  });
  let textOffset = 0;

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
          <p className="character-encounter__typed-lines" aria-hidden="true">
            {fixedTextLines.map((textLine, index) => {
              const lineCharacters = Math.max(
                0,
                Math.min(textLine.length, visibleCharacters - textOffset),
              );
              textOffset += textLine.length + (index < fixedTextLines.length - 1 ? 1 : 0);

              return <span key={textLine}>{textLine.slice(0, lineCharacters)}</span>;
            })}
          </p>
        )}
        {!complete && started && <span className="game-dialogue__cursor character-encounter__cursor" aria-hidden="true">▮</span>}
        <span className="character-encounter__arrow" aria-hidden="true">{complete ? "▼" : ""}</span>
      </button>
    </aside>
  );
}
