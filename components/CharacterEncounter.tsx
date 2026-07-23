type CharacterEncounterProps = {
  character: "sans" | "papyrus";
  name: string;
  line: string;
  src: string;
};

export function CharacterEncounter({ character, name, line, src }: CharacterEncounterProps) {
  return (
    <aside className={`character-encounter character-encounter--${character}`} aria-label={`${name} says: ${line}`}>
      <div className="character-encounter__stage" aria-hidden="true">
        <img src={src} alt="" />
      </div>
      <div className="character-encounter__dialogue">
        <strong>{name}</strong>
        <p>{line}</p>
        <span aria-hidden="true">▼</span>
      </div>
    </aside>
  );
}
