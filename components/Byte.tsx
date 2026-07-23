import { Soul } from "./Soul";
import { assetUrl } from "@/lib/site";

type CharacterMood = "curious" | "focused" | "proud" | "sheepish";

const characters: Record<CharacterMood, { name: string; src: string; variant: string }> = {
  proud: { name: "KRIS", src: assetUrl("/assets/sprites/kris-spin.gif"), variant: "kris" },
  focused: { name: "KRIS", src: assetUrl("/assets/sprites/kris-spin.gif"), variant: "kris" },
  curious: { name: "RALSEI", src: assetUrl("/assets/sprites/ralsei-dance.gif"), variant: "ralsei" },
  sheepish: { name: "RALSEI", src: assetUrl("/assets/sprites/ralsei-dance.gif"), variant: "ralsei" },
};

export function Byte({ mood = "curious", compact = false }: { mood?: CharacterMood; compact?: boolean }) {
  const character = characters[mood];

  return (
    <figure className={`game-character game-character--${character.variant} ${compact ? "game-character--compact" : ""}`}>
      <div className="game-character__screen">
        <img src={character.src} alt={`${character.name} animated sprite`} width="498" height="380" />
      </div>
      <figcaption><Soul size="small" /> {character.name}</figcaption>
    </figure>
  );
}
