"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Soul } from "./Soul";

export function IntroGate() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname !== "/" || window.sessionStorage.getItem("ali-intro-seen")) return;
    setVisible(true);
    const timeout = window.setTimeout(() => {
      setVisible(false);
      window.sessionStorage.setItem("ali-intro-seen", "yes");
    }, 2800);
    return () => window.clearTimeout(timeout);
  }, [pathname]);

  const skip = () => {
    setVisible(false);
    window.sessionStorage.setItem("ali-intro-seen", "yes");
  };

  if (!visible) return null;
  return (
    <div className="intro" role="dialog" aria-label="Portfolio introduction">
      <button className="intro__skip" onClick={skip}>Skip intro</button>
      <div className="intro__heart"><Soul interactive size="large" label="Break the intro SOUL" /></div>
      <p className="pixel-label">THE DARK WORLD</p>
      <h1>ALI&apos;S SAVE FILE</h1>
      <p className="intro__line">* A portfolio shines within the darkness.</p>
    </div>
  );
}
