'use client';

import React from 'react';
import Image from 'next/image';

interface TermehStrokeMaskHeroProps {
  title?: string;
  imageSrc?: string;
  className?: string;
}

/**
 * Text Stroke Mask Effect (هماهنگ با متدولوژی Concentric Coordinate Locking و حل مشکل پیوستگی خط فارسی):
 * ۱. استفاده از فیلتر SVG (feMorphology + feComposite) برای ایجاد استروک سراسری بدون بریدگی اتصالات حروف فارسی
 * ۲. ابعاد فشرده‌تر و متناسب کارت عکس ترمه (Compact Card Ratio)
 * ۳. قفل مختصات هم‌مرکز (Absolute Center Coordinate Locking: top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2)
 * ۴. شتاب‌دهی سخت‌افزاری GPU با will-change
 */
export function TermehStrokeMaskHero({
  title = 'تِرمه تسنیم',
  imageSrc = '/images/hero.jpg',
  className = '',
}: TermehStrokeMaskHeroProps) {
  // رندر همسان و یکپارچه متن در هر دو لایه بیرونی و درونی
  const renderVisualTitle = (isOuter: boolean) => (
    <div className="flex items-center justify-center pointer-events-none select-none text-center">
      <span
        className={`font-black text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none whitespace-nowrap will-change-transform ${
          isOuter
            ? 'text-[#fffaf1] drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)]'
            : 'text-[#fffaf1]'
        }`}
        style={
          isOuter
            ? undefined
            : {
                filter: 'url(#persian-termeh-outline)',
                WebkitTextStroke: '2px #fffaf1',
              }
        }
      >
        {title}
      </span>
    </div>
  );

  return (
    <div className={`relative w-full flex items-center justify-center select-none ${className}`}>
      {/* فیلتر SVG برای خط محیطی یکپارچه و پیوسته حروف فارسی (بدون تکه تکه شدن پیوندهای حروف) */}
      <svg className="absolute w-0 h-0 pointer-events-none opacity-0 overflow-hidden" aria-hidden="true">
        <defs>
          <filter id="persian-termeh-outline" x="-20%" y="-20%" width="140%" height="140%">
            <feMorphology in="SourceAlpha" result="DILATED" operator="dilate" radius="2" />
            <feComposite in="DILATED" in2="SourceAlpha" operator="out" result="HOLLOW_OUTLINE" />
            <feFlood floodColor="#fffaf1" result="OUTLINE_COLOR" />
            <feComposite in="OUTLINE_COLOR" in2="HOLLOW_OUTLINE" operator="in" />
          </filter>
        </defs>
      </svg>

      {/* جعبه قفل مختصات مرکزی (Concentric Coordinate Locking Anchor) */}
      <div className="relative w-full max-w-5xl h-[160px] xs:h-[200px] sm:h-[260px] md:h-[320px] lg:h-[360px] flex items-center justify-center">
        
        {/* --- لایه A: متن پایه بیرونی و توپر (پشت کارت، z-[2]) --- */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] pointer-events-none flex items-center justify-center">
          {renderVisualTitle(true)}
        </div>

        {/* --- لایه B: کارت چرخان فشرده عکس ترمه (z-[15]) --- */}
        <div
          className="relative z-[15] w-[180px] xs:w-[220px] sm:w-[280px] md:w-[350px] lg:w-[410px] aspect-[4/3] rounded-[22px] sm:rounded-[30px] md:rounded-[34px] overflow-hidden rotate-[-10deg] hover:rotate-[-3deg] transition-transform duration-700 ease-out border-2 border-white/30 sm:border-gold/45 shadow-[0_25px_70px_rgba(0,0,0,0.85)] bg-[#17060D] group pointer-events-auto cursor-pointer"
          style={{ willChange: 'transform' }}
        >
          {/* عکس ترمه دست‌بافت */}
          <Image
            src={imageSrc}
            alt="دست‌بافته ابریشمی اصیل ترمه تسنیم یزد"
            fill
            priority
            sizes="(max-width: 640px) 220px, (max-width: 1024px) 350px, 410px"
            className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
          />

          {/* فیلتر تاریک و گرادیان با کنتراست بالا برای وضوح استروک سفید */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/45" />

          {/* گوشه‌های زرین سنتی */}
          <div className="pointer-events-none absolute top-2.5 left-2.5 sm:top-3 sm:left-3 w-5 h-5 sm:w-7 sm:h-7 border-t-2 border-l-2 border-gold/60 rounded-tl-lg sm:rounded-tl-xl" />
          <div className="pointer-events-none absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-5 h-5 sm:w-7 sm:h-7 border-t-2 border-r-2 border-gold/60 rounded-tr-lg sm:rounded-tr-xl" />
          <div className="pointer-events-none absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 w-5 h-5 sm:w-7 sm:h-7 border-b-2 border-l-2 border-gold/60 rounded-bl-lg sm:rounded-bl-xl" />
          <div className="pointer-events-none absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 w-5 h-5 sm:w-7 sm:h-7 border-b-2 border-r-2 border-gold/60 rounded-br-xl" />

          {/* --- لایه C: متن معکوس چرخانده‌شده با استروک توخالی (روی عکس، z-[20]) --- */}
          {/* قفل شده به دقیقاً همان مرکز مختصاتی لایه A بدون کوچک‌ترین جابجایی */}
          <div
            className="absolute top-1/2 left-1/2 w-[1600px] h-[1600px] -translate-x-1/2 -translate-y-1/2 rotate-[10deg] group-hover:rotate-[3deg] transition-transform duration-700 ease-out pointer-events-none flex items-center justify-center z-[20]"
            style={{ willChange: 'transform' }}
          >
            {renderVisualTitle(false)}
          </div>
        </div>

      </div>
    </div>
  );
}
