"use client";

import { useEffect, useState } from "react";
import type { RotatingWord } from "@/types/homepage";

/**
 * Cycles through a list of words on a fixed interval. Matches the
 * Ellipsus Introduction section: middle word swaps every ~1500ms via
 * setInterval (no CSS transition). Respects prefers-reduced-motion by
 * freezing on the first entry.
 */
export function useRotatingWord(words: RotatingWord[], intervalMs = 1500) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [words, intervalMs]);

  return words[index] ?? words[0];
}
