'use client';

import React from 'react';
import { fieldPieces, poly, VW, VH } from '../termeh/geometry';

/**
 * Clean & Interactive Khatam Star Girih Mosaic:
 * Displays the high-definition Burgundy & Gold Termeh textile.
 * On mouse hover, each star smoothly transitions to grayscale(1)
 * and its outline stroke is cleanly removed.
 */
export default function TermehMosaic() {
  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="geometricPrecision"
      className="absolute inset-0 h-full w-full select-none"
      style={{
        imageRendering: '-webkit-optimize-contrast',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
      role="img"
      aria-label="میدان ستاره‌های خاتم و گره‌چینی ایرانی با ترمه عنابی و زرین یزد"
    >
      <defs>
        {/* High-Definition Burgundy & Gold Termeh (Exact 16:9 scale registration) */}
        <image
          id="termeh-src-burgundy"
          href="/images/termeh-brand-mosaic.jpg"
          x="-200"
          y="-112.5"
          width="2000"
          height="1125"
          preserveAspectRatio="xMidYMid slice"
        />

        {/* Star & Cross Geometric ClipPaths */}
        {fieldPieces.map((p) => (
          <clipPath key={p.id} id={`pc-${p.id}`}>
            <polygon points={poly(p.pts)} />
          </clipPath>
        ))}

        {/* Soft Vignette Depth */}
        <radialGradient id="vin-grad" cx="0.5" cy="0.48" r="0.82">
          <stop offset="0.65" stopColor="#1a0407" stopOpacity="0" />
          <stop offset="1" stopColor="#150205" stopOpacity="0.4" />
        </radialGradient>
      </defs>

      {/* The Geometric Khatam Cutout Field */}
      {fieldPieces.map((p) => (
        <g
          key={p.id}
          className="piece cursor-pointer"
          style={{
            transformOrigin: `${p.cx}px ${p.cy}px`,
          }}
        >
          {/* Burgundy & Gold Termeh Layer */}
          <g clipPath={`url(#pc-${p.id})`}>
            <use href="#termeh-src-burgundy" />
          </g>

          {/* Hairline Grout & Golden Star Rim (Removed on hover) */}
          <polygon
            className="piece-gap"
            points={poly(p.pts)}
          />

          {/* Interactive Hit Area */}
          <polygon
            points={poly(p.pts)}
            fill="transparent"
            style={{ pointerEvents: 'all' }}
          />
        </g>
      ))}

      {/* Gentle Depth Vignette */}
      <rect
        x="0"
        y="0"
        width={VW}
        height={VH}
        fill="url(#vin-grad)"
        opacity="0.6"
        className="pointer-events-none"
      />
    </svg>
  );
}
