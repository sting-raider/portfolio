"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "@/data/portfolio";
import { AmbienceButton } from "./AmbienceButton";
import { EasterEggs } from "./EasterEggs";
import { IntroGate } from "./IntroGate";
import { Soul, type SoulColor } from "./Soul";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const soulColor: SoulColor = pathname === "/"
    ? "green"
    : pathname.startsWith("/projects")
      ? "blue"
      : pathname.startsWith("/skills")
        ? "orange"
        : "red";

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <IntroGate />
      <EasterEggs />
      <header className="site-header">
        <div className="brand">
          <Soul color={soulColor} interactive size="small" label="Break the SOUL" />
          <Link href="/" className="brand__link" aria-label="Ali Sufiyan Khan, home">
            <span>ALI</span><small>LV 20</small>
          </Link>
        </div>
        <nav className={`site-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={pathname.startsWith(item.href) ? "active" : ""}>{item.label}</Link>
          ))}
          <Link href="/quick" className="quick-link">QUICK VIEW</Link>
        </nav>
        <div className="header-tools">
          <AmbienceButton />
          <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Toggle navigation">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <p className="site-footer__save"><Soul color={soulColor} size="small" /> SAVE FILE: ALI SUFIYAN KHAN · {new Date().getFullYear()}</p>
        <p className="mono">Fan-made portfolio. UNDERTALE / DELTARUNE characters and music belong to Toby Fox.</p>
      </footer>
    </>
  );
}
