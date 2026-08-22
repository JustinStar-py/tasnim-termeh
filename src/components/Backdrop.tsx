'use client';

import React from 'react';

const MOTES = [
  { left: "10%", size: 6, dur: 19, delay: 0 },
  { left: "24%", size: 4, dur: 24, delay: 5 },
  { left: "41%", size: 5, dur: 21, delay: 9 },
  { left: "58%", size: 4, dur: 26, delay: 3 },
  { left: "74%", size: 6, dur: 20, delay: 12 },
  { left: "88%", size: 4, dur: 23, delay: 7 },
];

const GRAIN = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='180' height='180' filter='url(%23n)' opacity='0.55'/></svg>")`;

/** warm golden light beneath everything */
export function BackdropBase() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="parallax absolute inset-0" style={{ "--depth": 6 } as React.CSSProperties}>
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,#fdf6e4_0%,rgba(253,246,228,0)_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_85%_110%,rgba(20,122,117,0.12)_0%,rgba(20,122,117,0)_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_8%_100%,rgba(197,155,39,0.12)_0%,rgba(197,155,39,0)_60%)]" />
      </div>
    </div>
  );
}

/** gold dust + film grain above everything */
export function BackdropOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
      {MOTES.map((m, i) => (
        <span
          key={i}
          className="mote"
          style={{
            left: m.left,
            width: m.size,
            height: m.size,
            animationDuration: `${m.dur}s`,
            animationDelay: `${m.delay}s`,
          }}
        />
      ))}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: GRAIN, mixBlendMode: "multiply" }}
      />
    </div>
  );
}
