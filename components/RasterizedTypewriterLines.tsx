import type { CSSProperties } from "react";

export type RasterizedDialogueLine = {
  src: string;
  text: string;
};

type RasterizedTypewriterLinesProps = {
  lines: RasterizedDialogueLine[];
  visibleCharacters: number;
};

export function RasterizedTypewriterLines({
  lines,
  visibleCharacters,
}: RasterizedTypewriterLinesProps) {
  let offset = 0;

  return (
    <span className="raster-typewriter" aria-hidden="true">
      {lines.map((line, index) => {
        const lineCharacters = Math.max(
          0,
          Math.min(line.text.length, visibleCharacters - offset),
        );
        const revealed = (lineCharacters / line.text.length) * 100;
        offset += line.text.length + (index < lines.length - 1 ? 1 : 0);

        return (
          <span className="raster-typewriter__line" key={line.src}>
            <img
              src={line.src}
              alt=""
              style={{ "--reveal": `${revealed}%` } as CSSProperties}
            />
          </span>
        );
      })}
    </span>
  );
}
