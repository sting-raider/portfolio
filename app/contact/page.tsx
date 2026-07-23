"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, BriefcaseBusiness, Code2, Mail } from "lucide-react";
import { Byte } from "@/components/Byte";

export default function ContactPage() {
  const [state, setState] = useState<"idle" | "sent">("idle");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(String(data.get("subject") || "Portfolio hello"));
    const body = encodeURIComponent(`Hi Ali,\n\n${String(data.get("message") || "")}\n\n— ${String(data.get("name") || "")}`);
    setState("sent");
    window.location.href = `mailto:alizaydsab@gmail.com?subject=${subject}&body=${body}`;
  };
  return (
    <div className="page-shell contact-page">
      <section className="page-hero contact-hero"><div><p className="eyebrow">The final save point</p><h1>Have a hard problem?<br /><em>Open a channel.</em></h1><p className="page-lede">I’m exploring 2027 software engineering opportunities across applied AI, robotics, and infrastructure.</p><div className="contact-links"><a href="mailto:alizaydsab@gmail.com"><Mail />alizaydsab@gmail.com</a><a href="https://www.linkedin.com/in/ali-khan-4197b1217" target="_blank" rel="noreferrer"><BriefcaseBusiness />LinkedIn</a><a href="https://github.com/sting-raider" target="_blank" rel="noreferrer"><Code2 />GitHub</a></div></div><div className="contact-mascot"><Byte mood="curious" /><div className="dialogue-box"><span>*</span><p>Your journey is almost over.<br />Perhaps contact its creator.</p></div></div></section>
      <section className="content-section contact-layout">
        <div><p className="eyebrow">Send a transmission</p><h2>Your email app will handle delivery.</h2><p className="muted">This keeps your message private and avoids collecting form data on the site.</p></div>
        {state === "sent" ? <div className="success-panel" role="status"><span>✦</span><h2>Transmission prepared.</h2><p>Your email app should be open. Somewhere, a developer became slightly happier.</p><button className="button button--ghost" onClick={() => setState("idle")}>Write another</button></div> : <form className="contact-form" onSubmit={submit}><label>Your name<input name="name" autoComplete="name" required placeholder="Ada Lovelace" /></label><label>Subject<input name="subject" required placeholder="A role, project, or good question" /></label><label>Message<textarea name="message" required rows={6} placeholder="Tell me what you’re building..." /></label><button className="button button--primary" type="submit">Open email draft <ArrowRight size={18} /></button></form>}
      </section>
    </div>
  );
}
