"use client";

import { useEffect, useState } from "react";

const WORDS = ["found", "applied", "landed", "signed", "yours"] as const;

const TYPE_MS = 110;
const ERASE_MS = 55;
const HOLD_MS = 1600;
const GAP_MS = 280;

type Phase = "typing" | "holding" | "erasing" | "gap";

export function Typewriter() {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState<string>(WORDS[0]);
  const [phase, setPhase] = useState<Phase>("holding");

  useEffect(() => {
    const word = WORDS[wordIndex];
    let id: number;

    if (phase === "typing") {
      if (text.length < word.length) {
        id = window.setTimeout(
          () => setText(word.slice(0, text.length + 1)),
          TYPE_MS,
        );
      } else {
        id = window.setTimeout(() => setPhase("holding"), HOLD_MS);
      }
    } else if (phase === "holding") {
      id = window.setTimeout(() => setPhase("erasing"), HOLD_MS);
    } else if (phase === "erasing") {
      if (text.length > 0) {
        id = window.setTimeout(
          () => setText(text.slice(0, -1)),
          ERASE_MS,
        );
      } else {
        id = window.setTimeout(() => setPhase("gap"), GAP_MS);
      }
    } else {
      id = window.setTimeout(() => {
        setWordIndex((i) => (i + 1) % WORDS.length);
        setPhase("typing");
      }, 0);
    }

    return () => window.clearTimeout(id);
  }, [text, phase, wordIndex]);

  return (
    <span className="typewriter" aria-live="polite">
      <span>{text}</span>
      <span className="typewriter-caret" aria-hidden="true" />
      <style>{`
        .typewriter {
          display: inline-flex;
          align-items: baseline;
          white-space: nowrap;
        }
        .typewriter-caret {
          display: inline-block;
          width: 0.05em;
          height: 0.82em;
          margin-left: 0.08em;
          background: currentColor;
          transform: translateY(0.06em);
          animation: typewriter-caret-blink 1.05s steps(2, start) infinite;
        }
        @keyframes typewriter-caret-blink {
          0%, 49%   { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .typewriter-caret { animation: none; opacity: 1; }
        }
      `}</style>
    </span>
  );
}
