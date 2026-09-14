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
 * ShamsehTwelveStar alias - redirects to BotehMark per user preference to use Boteh Jegheh across all pages
 */
export function ShamsehTwelveStar({ className = 'w-8 h-8 text-gold', size }: MotifProps) {
  return <BotehMark className={className} size={size} />;
}

/**
 * Authentic Persian Boteh Jegheh (بته‌جقه اصیل ایرانی با گردن کشیده، خطوط نرم، حاشیه طلایی و گل‌وبوته‌های اسلیمی)
 * برگرفته از طراحی فاخر و متناسب نساجی کهن یزد
 */
export function AuthenticBotehJegheh({
  className = 'w-48 h-auto',
  idPrefix = 'termeh-boteh',
  size,
  style,
}: {
  className?: string;
  idPrefix?: string;
  size?: number;
  style?: React.CSSProperties;
}) {
  const botehId = `${idPrefix}-boteh`;
  const insideId = `${idPrefix}-inside`;
  const textureId = `${idPrefix}-texture`;
  const petalId = `${idPrefix}-petal`;
  const flowerId = `${idPrefix}-flower`;
  const leafId = `${idPrefix}-leaf`;
  const tealId = `${idPrefix}-teal`;
  const goldId = `${idPrefix}-gold`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="35 -15 330 525"
      className={className}
      style={size ? { width: size, height: 'auto', ...style } : style}
      role="img"
      aria-label="نقش بته‌جقه اصیل ایرانی"
    >
      <defs>
        <linearGradient id={tealId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stopColor="#319e98" />
          <stop offset="0.52" stopColor="#146e78" />
          <stop offset="1" stopColor="#073f51" />
        </linearGradient>

        <linearGradient id={goldId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stopColor="#fff0b5" />
          <stop offset="0.5" stopColor="#d5a64e" />
          <stop offset="1" stopColor="#f1d38a" />
        </linearGradient>

        {/* منحنی‌های متصل با جهت مماس مشترک و گردن کشیده */}
        <path
          id={botehId}
          d="
            M200 480
            C90 480 45 370 65 265
            C85 160 150 75 238 25
            C282 0 316 10 328 46
            C340 82 316 117 288 112
            C274 109.5 261 97 257 88
            C253 79 246 79 246 86
            C246 114 279 149 300 198
            C321 247 333 275 337 315
            C345 395 305 480 200 480
            Z
          "
        />

        <clipPath id={insideId}>
          <use href={`#${botehId}`} />
        </clipPath>

        <pattern id={textureId} width="24" height="24" patternUnits="userSpaceOnUse">
          <path
            d="M12 6 Q20 12 12 18 Q4 12 12 6Z"
            fill="none"
            stroke="#b4dcc1"
            strokeOpacity="0.16"
          />
          <circle cx="0" cy="0" r="1" fill="#efd18a" opacity="0.3" />
        </pattern>

        <ellipse id={petalId} cy="-12" rx="5.5" ry="10" />

        <g id={flowerId}>
          <g fill={`url(#${goldId})`} stroke="#9c622e" strokeWidth="0.7">
            <use href={`#${petalId}`} />
            <use href={`#${petalId}`} transform="rotate(60)" />
            <use href={`#${petalId}`} transform="rotate(120)" />
            <use href={`#${petalId}`} transform="rotate(180)" />
            <use href={`#${petalId}`} transform="rotate(240)" />
            <use href={`#${petalId}`} transform="rotate(300)" />
          </g>
          <circle r="7" fill="#963448" stroke="#f5d995" strokeWidth="1" />
          <circle r="2.5" fill="#ffeab0" />
        </g>

        <g id={leafId}>
          <path
            d="M0 0 Q-20 -12 -9 -32 Q10 -22 0 0Z"
            fill="#83c6aa"
            stroke="#e5c27a"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <path
            d="M0 0 Q-7 -15 -9 -27"
            fill="none"
            stroke="#377f77"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </g>
      </defs>

      <use
        href={`#${botehId}`}
        fill={`url(#${tealId})`}
        stroke={`url(#${goldId})`}
        strokeWidth="5"
        strokeLinejoin="round"
      />

      <g clipPath={`url(#${insideId})`}>
        <path d="M35 -15H365V510H35Z" fill={`url(#${textureId})`} />

        {/* ساقه اصلی با ادامه‌ای نرم در گردن */}
        <g
          fill="none"
          stroke={`url(#${goldId})`}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="
              M198 451
              C159 404 227 365 218 308
              C209 251 170 244 186 198
              C202 152 218 133 226 103
              C234 73 249 43 275 39
              C301 35 314 62 300 81
              C296 87 290 90 285 89
            "
          />

          <path
            d="
              M193 416
              C142 424 102 394 115 360
              C126 331 164 337 165 360
              C166 376 146 384 138 371
            "
          />

          <path
            d="
              M208 376
              C259 401 308 365 289 328
              C276 301 244 311 246 331
              C247 347 266 350 272 338
            "
          />

          <path
            d="
              M217 311
              C177 324 126 307 132 274
              C137 247 166 251 171 268
              C175 283 157 292 150 282
            "
          />

          <path
            d="
              M186 223
              C225 239 271 228 268 200
              C265 176 237 176 232 192
              C229 204 242 211 250 204
            "
          />

          <path
            d="
              M207 152
              C177 169 157 158 165 138
              C171 123 188 121 194 134
            "
          />

          <path d="M221 121 C238 134 250 145 260 146" />
          <path d="M196 444 Q238 445 259 416" />
          <path d="M119 350 Q95 327 108 310" />
          <path d="M291 319 Q313 296 296 270" />
        </g>

        {/* برگ‌ها */}
        <use href={`#${leafId}`} transform="translate(191 412) rotate(-48)" />
        <use href={`#${leafId}`} transform="translate(198 391) rotate(65)" />
        <use href={`#${leafId}`} transform="translate(219 352) rotate(35)" />
        <use href={`#${leafId}`} transform="translate(216 308) rotate(-48)" />
        <use href={`#${leafId}`} transform="translate(189 260) rotate(-42)" />
        <use href={`#${leafId}`} transform="translate(189 211) rotate(40) scale(.85)" />
        <use href={`#${leafId}`} transform="translate(213 139) rotate(-35) scale(.65)" />
        <use href={`#${leafId}`} transform="translate(229 92) rotate(-35) scale(.52)" />
        <use href={`#${leafId}`} transform="translate(249 54) rotate(-25) scale(.42)" />
        <use href={`#${leafId}`} transform="translate(117 391) rotate(-40) scale(.8)" />
        <use href={`#${leafId}`} transform="translate(278 374) rotate(75) scale(.85)" />
        <use href={`#${leafId}`} transform="translate(136 298) rotate(-55) scale(.7)" />
        <use href={`#${leafId}`} transform="translate(254 225) rotate(70) scale(.75)" />
        <use href={`#${leafId}`} transform="translate(230 438) rotate(65) scale(.65)" />
        <use href={`#${leafId}`} transform="translate(171 159) rotate(-45) scale(.55)" />

        {/* گل‌ها */}
        <use href={`#${flowerId}`} transform="translate(197 443) scale(.8)" />
        <use href={`#${flowerId}`} transform="translate(145 362) scale(.85)" />
        <use href={`#${flowerId}`} transform="translate(265 333) scale(.95)" />
        <use href={`#${flowerId}`} transform="translate(151 272) scale(.75)" />
        <use href={`#${flowerId}`} transform="translate(246 195) scale(.8)" />
        <use href={`#${flowerId}`} transform="translate(181 136) scale(.58)" />
        <use href={`#${flowerId}`} transform="translate(260 146) scale(.4)" />
        <use href={`#${flowerId}`} transform="translate(260 412) scale(.6)" />
        <use href={`#${flowerId}`} transform="translate(108 309) scale(.48)" />
        <use href={`#${flowerId}`} transform="translate(296 270) scale(.58)" />
        <use href={`#${flowerId}`} transform="translate(280 40) scale(.38)" />

        {/* نقاط زرین */}
        <g fill="#f3d893">
          <circle cx="118" cy="225" r="2" />
          <circle cx="137" cy="205" r="1.5" />
          <circle cx="289" cy="238" r="2" />
          <circle cx="179" cy="342" r="2" />
          <circle cx="238" cy="282" r="1.6" />
          <circle cx="197" cy="103" r="1.6" />
          <circle cx="304" cy="383" r="1.7" />
          <circle cx="161" cy="434" r="1.7" />
          <circle cx="285" cy="89" r="2" />
        </g>

        {/* قاب ظریف‌تر برای جلوگیری از ازدحام در پیچ گردن */}
        <g fill="none" strokeLinejoin="round" strokeLinecap="round">
          <use href={`#${botehId}`} stroke="#082f3e" strokeWidth="19" />
          <use href={`#${botehId}`} stroke="#dcb66b" strokeWidth="15" />
          <use href={`#${botehId}`} stroke="#103f4b" strokeWidth="12" />
          <use href={`#${botehId}`} stroke="#f4d38b" strokeWidth="8" strokeDasharray=".1 8" />
          <use href={`#${botehId}`} stroke="#103f4b" strokeWidth="5" />
        </g>
      </g>

      <use
        href={`#${botehId}`}
        fill="none"
        stroke={`url(#${goldId})`}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ShamsehOrnament({ className = 'w-8 h-8 text-gold', size }: MotifProps) {
  return <BotehMark className={className} size={size} />;
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
        <BotehMark className="w-5 h-5 text-gold" />
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
