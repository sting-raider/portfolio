import type { Metadata } from "next";
import "@fontsource/press-start-2p/400.css";
import "@fontsource-variable/space-grotesk";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/600.css";
import "./globals.css";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: { default: "Ali Sufiyan Khan — Software Engineer & AI Builder", template: "%s | Ali Sufiyan Khan" },
  description: "Software engineer building reinforcement learning systems, AI products, robotics simulations, and multi-cloud infrastructure.",
  keywords: ["Ali Sufiyan Khan", "software engineer", "AI", "reinforcement learning", "robotics", "cloud infrastructure"],
  openGraph: {
    title: "Ali Sufiyan Khan — Software Engineer & AI Builder",
    description: "A fan-made Dark World portfolio of AI, robotics, and distributed systems projects.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body><SiteShell>{children}</SiteShell></body>
    </html>
  );
}
