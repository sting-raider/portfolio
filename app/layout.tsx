import type { Metadata } from "next";
import localFont from "next/font/local";
import "@fontsource/press-start-2p/400.css";
import "@fontsource-variable/space-grotesk";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/600.css";
import "./globals.css";
import "./motion-lab.css";
import "./retro-motion.css";
import "./dark-world.css";
import { Analytics } from "@/components/Analytics";
import { SiteShell } from "@/components/SiteShell";

const pixelPapyrus = localFont({
  src: "./fonts/papyrus-undertale.woff",
  variable: "--font-pixel-papyrus",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Ali Sufiyan Khan — Software Engineer & AI Builder", template: "%s | Ali Sufiyan Khan" },
  description: "Software engineer building agentic commerce, evidence-grounded AI, network security systems, robotics, and distributed infrastructure.",
  keywords: ["Ali Sufiyan Khan", "software engineer", "AI", "DANTE", "AegisFlow", "RoleAtlas", "robotics", "document intelligence"],
  openGraph: {
    title: "Ali Sufiyan Khan — Software Engineer & AI Builder",
    description: "A fan-made Dark World portfolio of AI, robotics, and distributed systems projects.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={pixelPapyrus.variable} data-motion-variant={process.env.NEXT_PUBLIC_MOTION_VARIANT || undefined}>
        <SiteShell>{children}</SiteShell>
        {!process.env.NEXT_PUBLIC_MOTION_VARIANT && <Analytics />}
      </body>
    </html>
  );
}
