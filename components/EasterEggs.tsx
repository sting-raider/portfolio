"use client";

import { useEffect, useState } from "react";
import { assetUrl } from "@/lib/site";

const code = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export function EasterEggs() {
  const [progress, setProgress] = useState(0);
  const [found, setFound] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (key === code[progress]) {
        const next = progress + 1;
        if (next === code.length) {
          setFound(true);
          setProgress(0);
        } else {
          setProgress(next);
        }
      } else {
        setProgress(key === code[0] ? 1 : 0);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [progress]);

  if (!found) return null;

  return (
    <div className="secret-room" role="dialog" aria-modal="true" aria-label="Secret room">
      <div className="secret-room__panel">
        <img src={assetUrl("/assets/game/party-walk.gif")} alt="Kris, Ralsei, and Susie walking" />
        <p>* You found the secret room.</p>
        <span>* The party approves of your keyboard skills.</span>
        <button onClick={() => setFound(false)}>[ LEAVE ROOM ]</button>
      </div>
    </div>
  );
}
