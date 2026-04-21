"use client";

import { useMemo, useState } from "react";

type Word = {
  id: string;
  text: string;
  anchor: { x: number; y: number };
  rotation: number;
};

// The 12 words flow clockwise around the hero, tracing a full sentence:
// "Your next chapter begins here, apply, get offered, hired, and finally thrive."
// Reading path: top L→R, right T→B, bottom R→L, left B→T.
const WORDS: Word[] = [
  // Top band — L→R: "your next chapter begins"
  { id: "your",    text: "YOUR",    anchor: { x: 280,  y: 200 }, rotation: -5 },
  { id: "next",    text: "NEXT",    anchor: { x: 600,  y: 170 }, rotation:  3 },
  { id: "chapter", text: "CHAPTER", anchor: { x: 940,  y: 185 }, rotation: -3 },
  { id: "begins",  text: "BEGINS",  anchor: { x: 1260, y: 215 }, rotation:  5 },

  // Right column — T→B: "here, apply"
  { id: "here",    text: "HERE",    anchor: { x: 1360, y: 400 }, rotation:  6 },
  { id: "apply",   text: "APPLY",   anchor: { x: 1360, y: 600 }, rotation: -4 },

  // Bottom band — R→L: "get offered hired and"
  { id: "get",     text: "GET",     anchor: { x: 1280, y: 820 }, rotation: -5 },
  { id: "offered", text: "OFFERED", anchor: { x: 960,  y: 830 }, rotation:  4 },
  { id: "hired",   text: "HIRED",   anchor: { x: 620,  y: 820 }, rotation:  3 },
  { id: "and",     text: "AND",     anchor: { x: 290,  y: 835 }, rotation: -3 },

  // Left column — B→T: "finally thrive"
  { id: "finally", text: "FINALLY", anchor: { x: 160,  y: 600 }, rotation:  2 },
  { id: "thrive",  text: "THRIVE",  anchor: { x: 160,  y: 400 }, rotation: -5 },
];

const LETTER_SIZE = 15;
const LETTER_STEP = 11;
const SCATTER_RX = 82;
const SCATTER_RY = 38;

function seededRand(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

type Letter = {
  char: string;
  key: string;
  home: { x: number; y: number; rot: number };
  target: { x: number; y: number; rot: number };
  idx: number;
};

function buildWordLetters(w: Word, seedStart: number): Letter[] {
  const out: Letter[] = [];
  const n = w.text.length;
  const halfW = ((n - 1) * LETTER_STEP) / 2;
  let s = seedStart;
  const phase = seededRand(s++) * Math.PI * 2;
  for (let i = 0; i < n; i++) {
    const baseAngle = (i / n) * Math.PI * 2 + phase;
    const angleJitter = (seededRand(s++) - 0.5) * ((Math.PI * 2) / n) * 0.35;
    const angle = baseAngle + angleJitter;
    const radiusJitter = 0.88 + seededRand(s++) * 0.18;
    const dx = Math.cos(angle) * SCATTER_RX * radiusJitter;
    const dy = Math.sin(angle) * SCATTER_RY * radiusJitter;
    const rot = (seededRand(s++) - 0.5) * 70;
    out.push({
      char: w.text[i],
      key: `${w.id}-${i}`,
      idx: i,
      home: {
        x: w.anchor.x + dx,
        y: w.anchor.y + dy,
        rot,
      },
      target: {
        x: w.anchor.x - halfW + i * LETTER_STEP,
        y: w.anchor.y,
        rot: w.rotation,
      },
    });
  }
  return out;
}

function buildAllWords(): { word: Word; letters: Letter[] }[] {
  let seed = 31;
  return WORDS.map((w) => {
    const letters = buildWordLetters(w, seed);
    seed += w.text.length * 4 + 1;
    return { word: w, letters };
  });
}

export function LettersScatter({ className }: { className?: string }) {
  const groups = useMemo(() => buildAllWords(), []);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <svg
      className={className}
      viewBox="0 0 1492 1032"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <style>{`
        @keyframes letterFloat {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25%      { transform: translate(3px, -4px) rotate(6deg); }
          50%      { transform: translate(-4px, 3px) rotate(-7deg); }
          75%      { transform: translate(2px, 4px) rotate(4deg); }
        }
        .ls-letter {
          transform-box: fill-box;
          transform-origin: center;
          animation: letterFloat 12s ease-in-out infinite;
          will-change: transform, translate, rotate;
          transition:
            translate 1s cubic-bezier(0.19, 1, 0.22, 1),
            rotate 0.85s cubic-bezier(0.19, 1, 0.22, 1),
            fill-opacity 0.45s ease;
          fill: #FBFBF9;
          font-family: var(--font-display);
          font-weight: 300;
          font-size: ${LETTER_SIZE}px;
          fill-opacity: 0.28;
          letter-spacing: 0.04em;
          translate: 0 0;
          rotate: var(--rot-home, 0deg);
        }
        .ls-word-letter { pointer-events: all; cursor: default; }

        /* Active word — letters travel to target, fully opaque. */
        .ls-word[data-active="true"] .ls-letter {
          translate: var(--dx) var(--dy);
          rotate: var(--rot-target);
          fill-opacity: 0.95;
          animation-play-state: paused;
        }
        /* Dim everything else when any word is active. */
        .ls-root[data-any-active="true"] .ls-letter {
          fill-opacity: 0.1;
        }
        .ls-root[data-any-active="true"] .ls-word[data-active="true"] .ls-letter {
          fill-opacity: 0.95;
        }

        /* Hovering the hero CTA gathers the whole motivating sentence at once. */
        .hero-scatter-root:has(.hero-cta:hover) .ls-word-letter {
          translate: var(--dx) var(--dy);
          rotate: var(--rot-target);
          fill-opacity: 0.95;
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .ls-letter { animation: none; transition: none; }
        }
      `}</style>

      <g className="ls-root" data-any-active={hoveredId ? "true" : "false"}>
        {/* One <g.ls-word> per word. onMouseEnter/Leave toggle state — letters
            AND hit-rect are both event targets, so hovering a letter counts. */}
        {groups.map(({ word, letters }) => {
          const scatterW = SCATTER_RX * 2 + 40;
          const textW = word.text.length * LETTER_STEP + 60;
          const hoverW = Math.max(scatterW, textW);
          const hoverH = SCATTER_RY * 2 + 50;
          const isActive = hoveredId === word.id;
          return (
            <g
              key={word.id}
              className="ls-word"
              data-active={isActive ? "true" : "false"}
              onMouseEnter={() => setHoveredId(word.id)}
              onMouseLeave={() =>
                setHoveredId((cur) => (cur === word.id ? null : cur))
              }
            >
              <rect
                x={word.anchor.x - hoverW / 2}
                y={word.anchor.y - hoverH / 2}
                width={hoverW}
                height={hoverH}
                fill="transparent"
                pointerEvents="all"
                style={{ cursor: "default" }}
              />
              {letters.map((l) => {
                const dx = l.target.x - l.home.x;
                const dy = l.target.y - l.home.y;
                return (
                  <text
                    key={l.key}
                    x={l.home.x}
                    y={l.home.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="ls-letter ls-word-letter"
                    style={
                      {
                        "--dx": `${dx}px`,
                        "--dy": `${dy}px`,
                        "--rot-home": `${l.home.rot}deg`,
                        "--rot-target": `${l.target.rot}deg`,
                        animationDuration: `${9 + (l.idx % 5) * 1.8}s`,
                        animationDelay: `${-(l.idx * 293 + word.id.length * 71) % 9000}ms`,
                        transitionDelay: `${l.idx * 25}ms`,
                      } as React.CSSProperties
                    }
                  >
                    {l.char}
                  </text>
                );
              })}
            </g>
          );
        })}
      </g>
    </svg>
  );
}
