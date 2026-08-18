import React from 'react';

interface MotifProps {
  className?: string;
  size?: number;
  color?: string;
}

/**
 * Global SVG Definitions for Responsive Arch Clip Paths
 * These normalized 0-to-1 paths scale smoothly to any container size!
 */
export function GlobalIslamicClipDefs() {
  return (
    <svg className="absolute w-0 h-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <defs>
        {/* 1. Standard Persian Pointed Arch (طاق پنج‌او‌هفت / محراب) */}
        <clipPath id="persian-pointed-arch" clipPathUnits="objectBoundingBox">
          <path d="M 0.5 0 C 0.65 0.06, 0.88 0.15, 1 0.32 L 1 1 L 0 1 L 0 0.32 C 0.12 0.15, 0.35 0.06, 0.5 0 Z" />
        </clipPath>

        {/* 2. Persian Cusped / Scalloped Arch (طاق دالبری چندپَر شاهی) */}
        <clipPath id="persian-scalloped-arch" clipPathUnits="objectBoundingBox">
          <path d="M 0.5 0 C 0.56 0.04, 0.65 0.06, 0.7 0.11 C 0.8 0.14, 0.9 0.2, 0.96 0.28 C 1 0.33, 1 0.38, 1 0.44 L 1 1 L 0 1 L 0 0.44 C 0 0.38, 0 0.33, 0.04 0.28 C 0.1 0.2, 0.2 0.14, 0.3 0.11 C 0.35 0.06, 0.44 0.04, 0.5 0 Z" />
        </clipPath>

        {/* 3. Persian Ogee Arch (طاق قوس افشان و ختایی) */}
        <clipPath id="persian-ogee-arch" clipPathUnits="objectBoundingBox">
          <path d="M 0.5 0 C 0.54 0.05, 0.62 0.12, 0.74 0.15 C 0.88 0.18, 1 0.26, 1 0.38 L 1 1 L 0 1 L 0 0.38 C 0 0.26, 0.12 0.18, 0.26 0.15 C 0.38 0.12, 0.46 0.05, 0.5 0 Z" />
        </clipPath>

        {/* 4. Octagonal Islamic Medallion (قاب شمسه هشت‌گوش) */}
        <clipPath id="persian-octagon-frame" clipPathUnits="objectBoundingBox">
          <path d="M 0.26 0 L 0.74 0 L 1 0.26 L 1 0.74 L 0.74 1 L 0.26 1 L 0 0.74 L 0 0.26 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

/**
 * Boteh Jegheh (بته‌جقه) - Signature Persian Brocade Motif
 */
export function BotehMark({ className = 'w-7 h-7 text-gold', size }: MotifProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="currentColor"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-hidden="true"
    >
      <path d="M24 3C15.8 3 10 9.5 10 17.5C10 24 14.5 28.5 17 32C19.5 35.5 20.5 39 19.5 43.5C21 43 23 41.5 25 39.5C31 34 38 28 38 17.5C38 9.5 32.2 3 24 3ZM24 11C27.3 11 30 13.7 30 17C30 20.3 27.3 23 24 23C20.7 23 18 20.3 18 17C18 13.7 20.7 11 24 11ZM24 14C22.3 14 21 15.3 21 17C21 18.7 22.3 20 24 20C25.7 20 27 18.7 27 17C27 15.3 25.7 14 24 14Z" />
      <circle cx="24" cy="17" r="1.5" fill="#fdfbf7" />
      <path
        d="M20 28C22 30.5 25 31 27.5 29.5"
        stroke="#fdfbf7"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/**
 * 8-Pointed Girih Star Rosette (شمسه هشت‌پر اصیل - Reference Image 2)
 */
export function ShamsehEightStar({ className = 'w-7 h-7 text-gold' }: MotifProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      {/* 2 Overlapping rotated squares creating an 8-star */}
      <rect
        x="12"
        y="12"
        width="40"
        height="40"
        stroke="currentColor"
        strokeWidth="2"
        className="text-gold"
      />
      <rect
        x="12"
        y="12"
        width="40"
        height="40"
        stroke="currentColor"
        strokeWidth="2"
        transform="rotate(45 32 32)"
        className="text-gold"
      />
      {/* Inner rosette circle and core */}
      <circle cx="32" cy="32" r="12" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="5" fill="currentColor" />
      <circle cx="32" cy="32" r="1.5" fill="#ffffff" />
    </svg>
  );
}

/**
 * 12-Pointed Radiating Shamseh Star (شمسه دوازده‌پر خورشیدی - Reference Image 2)
 */
export function ShamsehTwelveStar({ className = 'w-8 h-8 text-gold' }: MotifProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <polygon
        points="32,4 39,21 57,14 47,29 60,42 43,45 42,62 29,51 16,60 21,43 4,40 17,27 7,12 25,19"
        fill="currentColor"
        opacity="0.15"
      />
      <polygon
        points="32,8 38,22 52,16 44,29 55,40 40,43 39,57 28,47 17,55 21,41 7,38 18,27 10,15 25,20"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="32" cy="32" r="10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="6" fill="currentColor" />
      <circle cx="32" cy="32" r="2" fill="#fdfbf7" />
    </svg>
  );
}

export function ShamsehOrnament({ className = 'w-8 h-8 text-gold' }: MotifProps) {
  return <ShamsehTwelveStar className={className} />;
}

/**
 * Orsi Geometric Fretwork Lattice Pattern (گره‌چینی مشبک ارسی یزد - Reference Image 1)
 */
export function OrsiWindowLattice({ className = 'w-full h-full opacity-20' }: MotifProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      {/* Repeated Geometric Girih Mesh */}
      <pattern id="girih-mesh" width="20" height="20" patternUnits="userSpaceOnUse">
        <path
          d="M 10 0 L 20 10 L 10 20 L 0 10 Z M 0 0 L 10 10 M 20 0 L 10 10 M 0 20 L 10 10 M 20 20 L 10 10"
          stroke="currentColor"
          strokeWidth="0.75"
        />
        <circle cx="10" cy="10" r="2" fill="currentColor" />
      </pattern>
      <rect width="100" height="100" fill="url(#girih-mesh)" />
    </svg>
  );
}

/**
 * Ornate Persian Arch Frame for Product Images (طاق و محراب زرین)
 */
export function PersianArchImageFrame({
  children,
  variant = 'pointed',
  className = '',
  badge,
}: {
  children: React.ReactNode;
  variant?: 'pointed' | 'scalloped' | 'ogee';
  className?: string;
  badge?: string;
}) {
  const clipId =
    variant === 'scalloped'
      ? 'persian-scalloped-arch'
      : variant === 'ogee'
      ? 'persian-ogee-arch'
      : 'persian-pointed-arch';

  return (
    <div className={`relative group ${className}`}>
      {/* Outer Golden Architectural Glow Backing */}
      <div
        className="absolute -inset-1.5 opacity-60 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-gold via-gold/40 to-transparent blur-[2px]"
        style={{ clipPath: `url(#${clipId})` }}
      />

      {/* Main Clipped Container */}
      <div
        className="relative w-full h-full overflow-hidden bg-sand shadow-md group-hover:shadow-xl transition-all duration-500 border border-line"
        style={{ clipPath: `url(#${clipId})` }}
      >
        {children}

        {/* Delicate Golden Inner Arch Border SVG Overlay */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none text-gold/60 group-hover:text-gold transition-colors duration-500 z-10"
        >
          {variant === 'scalloped' ? (
            <path
              d="M 50 2 C 56 6, 64 8, 69 13 C 78 16, 88 22, 94 30 C 98 34, 98 39, 98 44 L 98 98 L 2 98 L 2 44 C 2 39, 2 34, 6 30 C 12 22, 22 16, 31 13 C 36 8, 44 6, 50 2 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            />
          ) : (
            <path
              d="M 50 2 C 64 8, 86 16, 97 32 L 97 98 L 3 98 L 3 32 C 14 16, 36 8, 50 2 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            />
          )}
        </svg>

        {/* Top Arch Finial Medallion */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 z-20 w-6 h-6 rounded-full bg-paper/90 backdrop-blur-xs flex items-center justify-center text-gold border border-gold shadow-xs">
          <ShamsehEightStar className="w-3.5 h-3.5 text-brand" />
        </div>

        {/* Optional Badge */}
        {badge && (
          <span className="absolute top-8 right-2.5 z-20 bg-brand text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm border border-gold/30">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Girih Section Divider (خط جداکننده گره‌چینی و شمسه)
 */
export function GirihDivider({ className = 'text-gold' }: MotifProps) {
  return (
    <div className={`flex items-center justify-center gap-3 my-6 ${className}`}>
      <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold/40 to-gold" />
      <div className="flex items-center gap-1.5 text-gold">
        <ShamsehEightStar className="w-4 h-4 text-gold" />
        <ShamsehTwelveStar className="w-6 h-6 text-gold" />
        <ShamsehEightStar className="w-4 h-4 text-gold" />
      </div>
      <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold/40 to-gold" />
    </div>
  );
}

/**
 * Eslimi Arabesque Corner Flourish (لچک اسلیمی)
 */
export function EslimiFlourish({ className = 'w-12 h-12 text-gold/60' }: MotifProps) {
  return (
    <svg viewBox="0 0 50 50" fill="none" className={className} aria-hidden="true">
      <path
        d="M2 2C20 2 35 15 42 32C45 39 48 48 48 48M2 2C2 20 15 35 32 42C39 45 48 48 48 48M8 8C18 12 28 22 32 32M14 2C20 8 22 18 18 24C14 30 6 30 2 24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="18" r="2.5" fill="currentColor" />
    </svg>
  );
}

/**
 * Khatam geometric border ribbon (نوار خاتم‌کاری)
 */
export function KhatamBorder({ className = 'text-gold/40' }: MotifProps) {
  return (
    <div
      className={`w-full h-2.5 opacity-75 overflow-hidden ${className}`}
      style={{
        backgroundImage: `repeating-linear-gradient(45deg, #c59b27 0, #c59b27 2px, transparent 0, transparent 8px), repeating-linear-gradient(-45deg, #7a1c30 0, #7a1c30 2px, transparent 0, transparent 8px)`,
        backgroundSize: '12px 12px',
      }}
    />
  );
}
