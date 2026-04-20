"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mirrors Ellipsus's `styles_appearOnScroll__I4os0` → `styles_isVisible__TsX_p`
 * pattern. Once the element crosses the observer threshold, `isVisible`
 * latches true and the observer disconnects (one-shot reveal).
 */
export function useReveal<T extends Element = HTMLDivElement>(
  threshold = 0.2,
  rootMargin = "0px 0px -10% 0px",
) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
            return;
          }
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}
