import { Fragment } from "react";
import { assetUrl } from "@/lib/site";
import { projects } from "@/data/portfolio";

// Deltarune battle backdrop and TP meter; both are pure CSS and hidden from assistive tech.
export function DarkWorldBackdrop() {
  return (
    <>
      <div className="dw-backdrop" aria-hidden="true" />
      <div className="dw-tp" aria-hidden="true">
        <span className="dw-tp__label">T<br />P</span>
        <span className="dw-tp__bar"><span /></span>
        <span className="dw-tp__value" />
      </div>
    </>
  );
}

const party = [
  { name: "KRIS", hp: 90, src: "/assets/portraits/kris.webp" },
  { name: "SUSIE", hp: 110, src: "/assets/portraits/susie.webp" },
  { name: "RALSEI", hp: 70, src: "/assets/portraits/ralsei.webp" },
];

// Battle HUD above the dialogue box; the speaking member's panel lights up via CSS :has().
export function PartyStatus() {
  return (
    <div className="dw-party" aria-hidden="true">
      {party.map((member) => (
        <div key={member.name} className={`dw-party__panel dw-party__panel--${member.name.toLowerCase()}`}>
          <img src={assetUrl(member.src)} alt="" />
          <strong>{member.name}</strong>
          <span className="dw-party__hp">
            <small>HP</small>
            <span className="dw-party__bar"><span /></span>
            <em>{member.hp}<i>/</i>{member.hp}</em>
          </span>
        </div>
      ))}
    </div>
  );
}

// Title letters bob in a wave like the Deltarune title screen; screen readers get the plain text from the parent's aria-label.
export function WavyText({ text, offset = 0 }: { text: string; offset?: number }) {
  let index = offset;
  // Letters are grouped per word so a narrow screen wraps between words, never inside one.
  return (
    <>
      {text.split(" ").map((word, w) => (
        <Fragment key={w}>
          {w > 0 && " "}
          <b className="dw-word" aria-hidden="true">
            {[...word].map((char) => <b key={index} className="dw-ch" style={{ "--i": index++ } as React.CSSProperties}>{char}</b>)}
          </b>
        </Fragment>
      ))}
    </>
  );
}

const tapeA = ["ALI SUFIYAN KHAN", "SOFTWARE ENGINEER", "AI BUILDER", "ROBOTICS", "DISTRIBUTED SYSTEMS", "* IT'S STILL ALI'S PORTFOLIO"];
const tapeB = ["FIGHT", "ACT", "ITEM", "MERCY", `${projects.length} ENCOUNTERS`, "LV 20", "* FILLED WITH DETERMINATION"];

// Two crossing hazard tapes; content is duplicated once so the -50% loop is seamless.
export function MarqueeTapes() {
  return (
    <div className="dw-tapes" aria-hidden="true">
      {[tapeA, tapeB].map((items, t) => (
        <div key={t} className={`dw-tape dw-tape--${t ? "b" : "a"}`}>
          <div>{[...items, ...items].map((item, i) => <span key={i}>{item}<i>✦</i></span>)}</div>
        </div>
      ))}
    </div>
  );
}
