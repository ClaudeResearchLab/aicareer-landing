"use client";

import { useEffect, useState } from "react";

type WordSpec = { word: string; color: string };

const WORDS: WordSpec[] = [
  { word: "found",   color: "#EB5B55" },
  { word: "applied", color: "#529A6A" },
  { word: "landed",  color: "#2173BE" },
  { word: "signed",  color: "#C455EB" },
  { word: "yours",   color: "#F09236" },
];

const LONGEST = WORDS.reduce((a, b) =>
  a.word.length >= b.word.length ? a : b,
).word;

const TYPE_MS = 110;
const ERASE_MS = 55;
const HOLD_MS = 1600;
const GAP_MS = 280;

type Phase = "typing" | "holding" | "erasing" | "gap";

export function Typewriter() {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState<string>(WORDS[0].word);
  const [phase, setPhase] = useState<Phase>("holding");

  useEffect(() => {
    const word = WORDS[wordIndex].word;
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
        id = window.setTimeout(() => setText(text.slice(0, -1)), ERASE_MS);
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

  const color = WORDS[wordIndex].color;

  return (
    <span className="typewriter">
      <span className="typewriter-ghost" aria-hidden="true">
        {LONGEST}
      </span>
      <span
        className="typewriter-text"
        style={{ color }}
        aria-live="polite"
      >
        {text}
        <span className="typewriter-caret" aria-hidden="true" />
      </span>
      <style>{`
        .typewriter {
          position: relative;
          display: inline-block;
          vertical-align: baseline;
        }
        .typewriter-ghost {
          display: inline-block;
          visibility: hidden;
          white-space: nowrap;
        }
        .typewriter-text {
          position: absolute;
          left: 0;
          top: 0;
          display: inline-flex;
          align-items: baseline;
          white-space: nowrap;
          transition: color 0.25s ease;
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
