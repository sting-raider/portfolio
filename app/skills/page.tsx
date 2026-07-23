"use client";

import { useState } from "react";
import { skillGroups } from "@/data/portfolio";
import { Check, ChevronRight } from "lucide-react";
import { CharacterEncounter } from "@/components/CharacterEncounter";
import { assetUrl } from "@/lib/site";

export default function SkillsPage() {
  const [active, setActive] = useState(0);
  const group = skillGroups[active];
  return (
    <div className="page-shell">
      <section className="page-hero compact-hero skills-hero">
        <div>
          <p className="eyebrow">Inventory / evidence equipped</p>
          <h1>Tools are only useful<br />when they <em>ship.</em></h1>
          <p className="page-lede">No percentages. Select a category to see the tools and the work that backs them up.</p>
        </div>
        <CharacterEncounter
          character="papyrus"
          name="PAPYRUS"
          line="HUMAN! THESE TOOLS ARE ACCEPTABLE! NOW SHOW ME WHICH ONES YOU ACTUALLY USED!"
          src={assetUrl("/assets/sprites/papyrus-overworld.gif")}
        />
      </section>
      <section className="content-section inventory-layout">
        <div className="inventory-tabs" role="tablist" aria-label="Skill categories">
          {skillGroups.map((item, index) => (
            <button key={item.title} role="tab" aria-selected={active === index} onClick={() => setActive(index)}>
              <span>{item.title}</span><small>{item.level}</small><ChevronRight />
            </button>
          ))}
        </div>
        <div className="inventory-panel" role="tabpanel">
          <div className="inventory-panel__head"><p className="pixel-label">{group.level} LOADOUT</p><h2>{group.title}</h2></div>
          <div className="skill-list">{group.skills.map((skill) => <span key={skill}><Check size={14} />{skill}</span>)}</div>
          <div className="evidence-box"><span>EVIDENCE</span><p>{group.evidence}</p></div>
        </div>
      </section>
      <p className="inventory-footnote mono">* Inventory expands whenever a problem demands a better tool.</p>
    </div>
  );
}
