'use client';

import React, { useCallback } from 'react';
import { BackdropBase } from './Backdrop';
import TermehMosaic from './TermehMosaic';

/* ------------------------- decorative elements ------------------------- */

function Star8({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="6.2" y="6.2" width="11.6" height="11.6" />
      <rect x="6.2" y="6.2" width="11.6" height="11.6" transform="rotate(45 12 12)" />
    </svg>
  );
}

function BotehOrnament() {
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4" aria-hidden="true">
      <span className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#b8862b] to-[#b8862b]" />
      <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6 text-[#b8862b]" fill="currentColor">
        <path d="M12 2.4c5.8 3.4 8.6 8.3 5.4 13.1C14.5 19.8 7 19.6 4.4 15 2 10.7 6.4 5.5 12 2.4Zm.2 4.1c-3.6 2.2-6 5.4-4.4 8.2 1.7 3 6.6 3.1 8.5.2 2-3 .3-6.2-4.1-8.4Z" />
      </svg>
      <span className="h-1.5 w-1.5 rotate-45 bg-[#b8862b]" />
      <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6 -scale-x-100 text-[#b8862b]" fill="currentColor">
        <path d="M12 2.4c5.8 3.4 8.6 8.3 5.4 13.1C14.5 19.8 7 19.6 4.4 15 2 10.7 6.4 5.5 12 2.4Zm.2 4.1c-3.6 2.2-6 5.4-4.4 8.2 1.7 3 6.6 3.1 8.5.2 2-3 .3-6.2-4.1-8.4Z" />
      </svg>
      <span className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#b8862b] to-[#b8862b]" />
    </div>
  );
}

function IconSilk() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth="1.35">
      <ellipse cx="12" cy="11" rx="6.5" ry="8.4" />
      <path d="M8.6 6.6c2.4 1.9 4.4 1.9 6.8 0M7.7 11c2.9 2.3 5.7 2.3 8.6 0M8.6 15.4c2.4-1.9 4.4-1.9 6.8 0" />
      <path d="M12 19.4c0 1.9 1.4 2.4 2.9 2.4" />
    </svg>
  );
}

function IconLoom() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth="1.35">
      <rect x="3.6" y="4.2" width="16.8" height="14" rx="1" />
      <path d="M7.4 4.2v14M12 4.2v14M16.6 4.2v14" strokeOpacity="0.75" />
      <ellipse cx="12" cy="11.2" rx="4.4" ry="1.7" fill="currentColor" stroke="none" opacity="0.85" />
      <path d="M2.2 21h19.6" />
    </svg>
  );
}

function IconSeal() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth="1.35">
      <circle cx="12" cy="9.6" r="6.2" />
      <path d="m12 6 1.1 2.2 2.4.4-1.75 1.7.4 2.4L12 11.6l-2.15 1.1.4-2.4L8.5 8.6l2.4-.4Z" fill="currentColor" stroke="none" opacity="0.85" />
      <path d="M8.6 14.9 7.2 21l4.8-2.5L16.8 21l-1.4-6.1" />
    </svg>
  );
}

/** Persian pointed-oval cartouche (toranj) without heavy drop-shadow */
function Cartouche() {
  return (
    <svg viewBox="0 0 980 460" className="block h-auto w-full">
      <path
        d="M 12 230 C 150 -30, 830 -30, 968 230 C 830 490, 150 490, 12 230 Z"
        fill="rgba(253,249,240,0.98)"
        stroke="#b8862b"
        strokeOpacity="0.9"
        strokeWidth="2"
      />
      <path
        d="M 38 230 C 170 0, 810 0, 942 230 C 810 460, 170 460, 38 230 Z"
        fill="none"
        stroke="#b8862b"
        strokeOpacity="0.45"
        strokeWidth="1.2"
      />
      {[12, 968].map((x) => (
        <g key={x} transform={`translate(${x} 230)`} stroke="#b8862b" strokeWidth="1.2" fill="rgba(253,249,240,1)">
          <rect x="-6" y="-6" width="12" height="12" />
          <rect x="-6" y="-6" width="12" height="12" transform="rotate(45)" />
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------ data ------------------------------ */

const META = [
  { icon: <IconSilk />, label: "ابریشمِ طبیعیِ پیله", sub: "تار و پودی از پیلهٔ اصل" },
  { icon: <IconLoom />, label: "دست‌بافتِ دارِ سنتی", sub: "هنرِ دستانِ بافندگان یزد" },
  { icon: <IconSeal />, label: "شناسنامهٔ رسمی یزد", sub: "اصالتِ ثبت‌شده و مستند" },
];

interface HeroMasterpieceProps {
  onOpenConsultation: () => void;
}

export function HeroMasterpiece({ onOpenConsultation }: HeroMasterpieceProps) {
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--px", (nx * 1.5).toFixed(3));
    el.style.setProperty("--py", (ny * 1.5).toFixed(3));
  }, []);

  return (
    <section
      id="hero"
      onMouseMove={onMouseMove}
      className="relative flex min-h-[84vh] lg:min-h-[92vh] flex-col justify-between overflow-hidden text-[#221612] bg-[#f8f3e8]"
    >
      <BackdropBase />

      {/* full-bleed girih field of Khatam Star Burgundy-Gold Termeh fragments */}
      <div
        className="parallax absolute inset-0 scale-[1.03]"
        style={{ "--depth": -5 } as React.CSSProperties}
      >
        <TermehMosaic />
      </div>

      {/* side rails */}
      <div className="pointer-events-none absolute left-4 lg:left-6 top-1/2 z-20 hidden -translate-y-1/2 lg:block">
        <div className="flex flex-col items-center gap-4 border border-[#b8862b]/35 bg-[#fbf5e8]/95 px-2 py-5 rounded-2xl">
          <span className="h-12 w-px bg-[#b8862b]/40" />
          <span
            className="text-[11px] tracking-[0.35em] text-[#7a1c30] font-bold italic"
            style={{ writingMode: "vertical-rl" }}
          >
            تسنیم ترمه — اصالت هنر بافت یزد
          </span>
          <span className="h-12 w-px bg-[#b8862b]/40" />
        </div>
      </div>

      <div className="pointer-events-none absolute right-4 lg:right-6 top-1/2 z-20 hidden -translate-y-1/2 lg:block">
        <div className="flex flex-col items-center gap-3 border border-[#b8862b]/35 bg-[#fbf5e8]/95 px-2.5 py-4 rounded-2xl">
          <span className="text-[#b8862b]">
            <Star8 className="h-6 w-6" />
          </span>
          <span className="text-[14px] font-black text-[#7a1c30]">یزد</span>
          <span className="text-[13px] font-bold text-[#147a75]">۱۳۴۷</span>
          <span className="text-[#b8862b]">
            <Star8 className="h-6 w-6" />
          </span>
        </div>
      </div>

      {/* cartouche + typography, centred on the field (Compact & Sleek) */}
      <div className="relative z-10 pointer-events-none flex flex-1 items-center justify-center px-4 pt-6 sm:pt-10 pb-3">
        <div
          className="relative pointer-events-auto"
          style={{
            width: "min(84vw, 700px, calc((100dvh - 250px) * 1.9))",
          }}
        >
          <div className="relative">
            <Cartouche />

            <div className="absolute inset-0 flex flex-col items-center justify-center px-[8%] sm:px-[10%] text-center">
              {/* Eyebrow inscription */}
              <p className="mb-0.5 sm:mb-1 flex items-center gap-1.5 sm:gap-2 text-[9.5px] sm:text-[11.5px] font-bold text-[#8a5a06]">
                <span className="inline-block h-1 w-1 sm:h-1.5 sm:w-1.5 rotate-45 bg-[#b8862b]" />
                میراثِ بافتِ یزد — تسنیم ترمه
                <span className="inline-block h-1 w-1 sm:h-1.5 sm:w-1.5 rotate-45 bg-[#b8862b]" />
              </p>

              {/* Main Headline with Deep Visible Gold on Brand Name */}
              <h1 className="text-[clamp(1.2rem,2.1vw,2.2rem)] font-black leading-[1.22] text-[#2e1516]">
                <span className="text-[#9c6806] font-black">تسنیم:</span> شکوه اصالت ترمه
              </h1>

              {/* Boteh Ornament Divider */}
              <div className="my-1 sm:my-1.5">
                <BotehOrnament />
              </div>

              {/* Subtitle */}
              <p className="max-w-[460px] text-[clamp(0.68rem,0.85vw,0.84rem)] font-medium leading-[1.8] sm:leading-[1.95] text-[#3e1d1c]/90 line-clamp-2 sm:line-clamp-none">
                خلق نفیس‌ترین رومیزی‌ها، سرویس‌های شاه‌نشین و هدایای فاخر با تار و پود
                ابریشم طبیعی پیله و شناسنامه رسمی یزد.
              </p>

              {/* Action Buttons inside Cartouche on bottom */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 pt-2 sm:pt-2.5">
                <a
                  href="#products"
                  className="px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-lg bg-[#7a1c30] hover:bg-[#631425] text-white text-[11px] sm:text-[12.5px] font-bold shadow-md shadow-brand/25 transition-all transform hover:-translate-y-0.5 cursor-pointer pointer-events-auto"
                >
                  مشاهده گنجینه محصولات
                </a>
                <button
                  onClick={onOpenConsultation}
                  className="px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-lg bg-white border border-[#b8862b] hover:bg-[#fbf5e8] text-[#7a1c30] text-[11px] sm:text-[12.5px] font-bold shadow-2xs transition-all cursor-pointer pointer-events-auto"
                >
                  مشاوره و سفارش اختصاصی
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* heritage meta chips */}
      <div className="relative z-20 pb-6 pt-2">
        <div className="mx-auto flex max-w-[1150px] flex-wrap items-stretch justify-center gap-3 px-4 sm:px-6">
          {META.map((m) => (
            <div
              key={m.label}
              className="group flex items-center gap-3 border border-[#b8862b]/40 bg-[#fdfaf2]/95 px-4 py-2 sm:py-2.5 rounded-xl shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#b8862b] hover:shadow-md"
            >
              <span className="text-[#b8862b] transition-colors duration-200 group-hover:text-[#7a1c30]">
                {m.icon}
              </span>
              <span className="text-right">
                <span className="block text-[12px] sm:text-[13.5px] font-bold leading-5 text-[#6b1626]">
                  {m.label}
                </span>
                <span className="block text-[10px] sm:text-[11px] font-normal text-[#3e1d1c]/70">{m.sub}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
