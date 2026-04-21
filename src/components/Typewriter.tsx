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

const PREFIX = "Your dream job, ";

const PREFIX_TYPE_MS = 55;
const PREFIX_HOLD_MS = 420;
const TYPE_MS = 110;
const ERASE_MS = 55;
const HOLD_MS = 1600;
const GAP_MS = 280;

type Phase =
  | "prefix-typing"
  | "prefix-hold"
  | "typing"
  | "holding"
  | "erasing"
  | "gap";

export function Typewriter() {
  const [wordIndex, setWordIndex] = useState(0);
  const [prefixText, setPrefixText] = useState("");
  const [text, setText] = useState<string>("");
  const [phase, setPhase] = useState<Phase>("prefix-typing");
  const [fontsReady, setFontsReady] = useState(false);

  // Roslindale Narrow Light is ~10-15% narrower than the serif fallback; if we
  // start typing before the woff2 is loaded, the font swap lands mid-animation
  // (often at the prefix→word handoff) and the centered H1 snaps left.
  useEffect(() => {
    if (typeof document === "undefined" || !document.fonts) {
      setFontsReady(true);
      return;
    }
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) setFontsReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!fontsReady) return;
    let id: number;

    if (phase === "prefix-typing") {
      if (prefixText.length < PREFIX.length) {
        id = window.setTimeout(
          () => setPrefixText(PREFIX.slice(0, prefixText.length + 1)),
          PREFIX_TYPE_MS,
        );
      } else {
        id = window.setTimeout(() => setPhase("prefix-hold"), 0);
      }
    } else if (phase === "prefix-hold") {
      id = window.setTimeout(() => setPhase("typing"), PREFIX_HOLD_MS);
    } else if (phase === "typing") {
      const word = WORDS[wordIndex].word;
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
  }, [fontsReady, text, prefixText, phase, wordIndex]);

  const inPrefixPhase = phase === "prefix-typing" || phase === "prefix-hold";
  const displayPrefix = inPrefixPhase ? prefixText : PREFIX;
  const color = WORDS[wordIndex].color;

  return (
    <span className="typewriter">
      <span className="typewriter-prefix">
        {displayPrefix}
        {inPrefixPhase && (
          <span
            className="typewriter-caret typewriter-caret-prefix typewriter-caret-abs"
            aria-hidden="true"
          />
        )}
      </span>
      <span className="typewriter-word">
        <span className="typewriter-ghost" aria-hidden="true">
          {LONGEST}
        </span>
        <span
          className="typewriter-text"
          style={{ color }}
          aria-live="polite"
        >
          {!inPrefixPhase && (
            <>
              {text}
              <span className="typewriter-caret" aria-hidden="true" />
            </>
          )}
        </span>
      </span>
      <style>{`
        .typewriter {
          display: inline;
          white-space: normal;
        }
        .typewriter-prefix {
          display: inline-block;
          position: relative;
          white-space: pre;
        }
        .typewriter-word {
          display: inline-grid;
          grid-template-columns: max-content;
          vertical-align: baseline;
        }
        .typewriter-ghost,
        .typewriter-text {
          grid-column: 1;
          grid-row: 1;
        }
        .typewriter-ghost {
          visibility: hidden;
          white-space: nowrap;
        }
        .typewriter-text {
          justify-self: start;
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
        .typewriter-caret-abs {
          position: absolute;
          left: 100%;
          top: 0;
          margin-left: 0;
        }
        .typewriter-caret-prefix {
          color: #FBFBF9;
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
