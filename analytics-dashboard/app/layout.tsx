import "@fontsource/press-start-2p";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "True Lab // Portfolio Analytics",
  description: "Private analytics console for Ali Sufiyan Khan.",
  icons: { icon: "/soul.svg" },
  robots: { index: false, follow: false, nocache: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
