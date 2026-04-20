import type { Metadata } from "next";
import "./globals.css";

// Phase 1 replaces this with the verbatim <head> metadata from ellipsus.com.
// Phase 2 wires next/font/google or next/font/local once the real font list is known.
export const metadata: Metadata = {
  title: "AICareer v2 Landing — Ellipsus port (WIP)",
  description: "Pixel-perfect port scaffold. Phase 1 replaces this metadata.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
