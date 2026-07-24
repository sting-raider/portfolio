import { Soul } from "./Soul";
import { assetUrl } from "@/lib/site";

type CharacterMood = "curious" | "focused" | "proud" | "sheepish";

const characters: Record<CharacterMood, { name: string; src: string; variant: string }> = {
  proud: { name: "KRIS", src: assetUrl("/assets/portraits/kris.webp"), variant: "kris" },
  focused: { name: "KRIS", src: assetUrl("/assets/portraits/kris.webp"), variant: "kris" },
  curious: { name: "RALSEI", src: assetUrl("/assets/portraits/ralsei.webp"), variant: "ralsei" },
  sheepish: { name: "RALSEI", src: assetUrl("/assets/portraits/ralsei.webp"), variant: "ralsei" },
};

export function Byte({ mood = "curious", compact = false }: { mood?: CharacterMood; compact?: boolean }) {
  const character = characters[mood];

  return (
    <figure className={`game-character game-character--${character.variant} ${compact ? "game-character--compact" : ""}`}>
      <div className="game-character__screen">
        <img src={character.src} alt={`${character.name} portrait`} width="360" height="360" />
      </div>
      <figcaption><Soul size="small" /> {character.name}</figcaption>
    </figure>
  );
}
