'use client';

import React from 'react';
import { BotehMark, ShamsehOrnament } from './motifs';

/* -------------------- Authentic Persian-Islamic Vector Motifs -------------------- */

/** 1. Royal Persian Calligraphic Wax Seal & Parchment Certificate (مهر و نشان اصالت یزد) */
function IconIslamicSeal({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      {/* 8-Pointed Khatam Star Halo */}
      <rect x="12" y="12" width="24" height="24" rx="2" stroke="#b8862b" strokeWidth="1.2" />
      <rect x="12" y="12" width="24" height="24" rx="2" stroke="#b8862b" strokeWidth="1.2" transform="rotate(45 24 24)" />
      {/* Inner Medallion */}
      <circle cx="24" cy="24" r="8" fill="#7a1c30" stroke="#ffd966" strokeWidth="1.2" />
      {/* Calligraphic Seal Monogram */}
      <path d="M21 21.5C22.5 20 25.5 20 27 21.5C28 22.5 28 24.5 26.5 25.5C25 26.5 22 26.5 21 28" stroke="#ffd966" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="24" cy="24" r="1.5" fill="#ffd966" />
      {/* Hanging Silk Ribbons */}
      <path d="M19 32L16 42L22 39L24 43L26 39L32 42L29 32" fill="#7a1c30" stroke="#b8862b" strokeWidth="1" />
    </svg>
  );
}

/** 2. Natural Silk & Zari Spindle Loom (دوک و تار و پود ابریشم و زری) */
function IconSilkSpindle({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      {/* Radiating Zari Threads / Starburst */}
      <g stroke="#b8862b" strokeWidth="1" opacity="0.6">
        <line x1="24" y1="4" x2="24" y2="44" strokeDasharray="2 2" />
        <line x1="4" y1="24" x2="44" y2="24" strokeDasharray="2 2" />
        <line x1="10" y1="10" x2="38" y2="38" strokeDasharray="2 2" />
        <line x1="10" y1="38" x2="38" y2="10" strokeDasharray="2 2" />
      </g>
      {/* Traditional Persian Wooden Silk Loom Shuttle */}
      <path d="M8 24C12 18 36 18 40 24C36 30 12 30 8 24Z" fill="#fdfbf7" stroke="#9c6806" strokeWidth="1.6" />
      {/* Golden Thread Spool */}
      <ellipse cx="24" cy="24" rx="7" ry="3.5" fill="#c59b27" stroke="#7a1c30" strokeWidth="1.2" />
      <line x1="18" y1="24" x2="30" y2="24" stroke="#ffd966" strokeWidth="2" />
      {/* Silk Cocoons / Boteh Flourish */}
      <circle cx="24" cy="11" r="3" fill="#fcf7ee" stroke="#b8862b" strokeWidth="1.2" />
      <circle cx="24" cy="37" r="3" fill="#fcf7ee" stroke="#b8862b" strokeWidth="1.2" />
    </svg>
  );
}

/** 3. Traditional Persian Girih Shield with Floral Eslemi (سپر اسلیمی و رنگرزی سنتی) */
function IconGirihShield({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      {/* Traditional Pointed Shield / Mihrab Arch */}
      <path
        d="M24 5C35 9 40 18 40 28C40 37 32 43 24 45C16 43 8 37 8 28C8 18 13 9 24 5Z"
        fill="#147a75"
        fillOpacity="0.12"
        stroke="#147a75"
        strokeWidth="1.6"
      />
      {/* Inner Golden Girih Border */}
      <path
        d="M24 10C32 13 36 20 36 27C36 34 30 38 24 40C18 38 12 34 12 27C12 20 16 13 24 10Z"
        stroke="#b8862b"
        strokeWidth="1.1"
      />
      {/* Floral Arabesque / Eslemi Heart */}
      <path
        d="M24 15C20 18 17 23 20 27C23 30 24 33 24 33C24 33 25 30 28 27C31 23 28 18 24 15Z"
        fill="#147a75"
        stroke="#ffd966"
        strokeWidth="1.2"
      />
      <circle cx="24" cy="23" r="2" fill="#ffd966" />
    </svg>
  );
}

/** 4. Inlaid Khatam & Walnut Gift Casket (صندوقچه خاتم‌کاری و چوب گردو) */
function IconKhatamChest({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} stroke="currentColor" strokeWidth="1.5">
      {/* Chest Body */}
      <path d="M8 20L24 12L40 20L24 28L8 20Z" fill="#fdfbf7" stroke="#7a1c30" strokeWidth="1.6" />
      <path d="M8 20V34L24 42V28L8 20Z" fill="#7a1c30" fillOpacity="0.08" stroke="#7a1c30" strokeWidth="1.5" />
      <path d="M40 20V34L24 42V28L40 20Z" fill="#7a1c30" fillOpacity="0.16" stroke="#7a1c30" strokeWidth="1.5" />
      {/* Khatam Star Inlay on Lid */}
      <g transform="translate(24 20) scale(0.4)" stroke="#b8862b" strokeWidth="1.8" fill="#fcf7ee">
        <rect x="-8" y="-8" width="16" height="16" />
        <rect x="-8" y="-8" width="16" height="16" transform="rotate(45)" />
      </g>
      {/* Ornate Golden Lock Hasp */}
      <circle cx="24" cy="28" r="2.5" fill="#ffd966" stroke="#7a1c30" strokeWidth="1" />
      <path d="M24 30.5V34" stroke="#ffd966" strokeWidth="1.5" />
    </svg>
  );
}

/* -------------------- Main Component -------------------- */

export function ValueProps() {
  const values = [
    {
      id: 1,
      title: 'شناسنامه و هولوگرام رسمی اصالت',
      description:
        'هر اثر ترمه با پلاک برنجی شماره‌دار اختصاصی، هولوگرام رسمی کارگاه یزد و کد رهگیری اصالت بافت تحویل داده می‌شود.',
      badge: 'ضمانت اصالت ثبت‌شده',
      themeColor: '#7a1c30',
      accentColor: '#b8862b',
      icon: <IconIslamicSeal className="w-11 h-11 text-[#7a1c30]" />,
    },
    {
      id: 2,
      title: 'تار و پود ابریشم طبیعی و زری ۲۴ عیار',
      description:
        'استفاده از ناب‌ترین ابریشم پیله طبیعی و نخ لمه مقاوم با بالاترین تراکم گره (۲۶۰ تا ۳۰۰ گره در سانتیمتر).',
      badge: 'تراکم صادراتی ممتاز',
      themeColor: '#9c6806',
      accentColor: '#c59b27',
      icon: <IconSilkSpindle className="w-11 h-11 text-[#9c6806]" />,
    },
    {
      id: 3,
      title: '۱۰ سال ضمانت کتبی ثبات رنگ سنتی',
      description:
        'رنگرزی اصیل با گیاهان کویری یزد و مواد معدنی پایدار؛ مقاوم در برابر تابش نور خورشید و شستشوی استاندارد.',
      badge: 'رنگرزی گیاهی ماندگار',
      themeColor: '#147a75',
      accentColor: '#147a75',
      icon: <IconGirihShield className="w-11 h-11 text-[#147a75]" />,
    },
    {
      id: 4,
      title: 'بسته‌بندی فاخر چوب گردو و خاتم‌کاری',
      description:
        'ارائه در جعبه‌های دست‌ساز نفیس با روکش مخمل درباری، لچک‌های خاتم اصل و آماده برای هدیه و جهیزیه فاخر.',
      badge: 'بسته‌بندی شاهانه',
      themeColor: '#631425',
      accentColor: '#b8862b',
      icon: <IconKhatamChest className="w-11 h-11 text-[#631425]" />,
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 bg-[#f9f5ec] border-b border-[#e6dcce] relative overflow-hidden">
      {/* Subtle Persian Arabesque Background Motifs */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#7a1c30_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fdf9f0] border border-[#b8862b]/45 text-[#9c6806] text-xs font-bold shadow-2xs">
            <ShamsehOrnament className="w-4 h-4 text-[#b8862b]" />
            <span>میراث و تعهد کارگاه تسنیم</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#2e1516] tracking-tight">
            چرا تسنیم ترمه را برمی‌گزینند؟
          </h2>

          <div className="flex items-center justify-center gap-3" aria-hidden="true">
            <span className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-[#b8862b]" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#b8862b]" />
            <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-[#b8862b]" />
          </div>

          <p className="text-xs sm:text-sm text-[#3e1d1c]/80 leading-relaxed font-medium">
            تلفیق شکوه هنر چندصدساله دست‌بافان اصیل یزد با استانداردهای نوین کیفیت و گواهی اصالت بافت
          </p>
        </div>

        {/* 4 Persian-Islamic Architectural Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div
              key={v.id}
              className="group relative bg-[#fdfbf7] p-6 sm:p-7 rounded-2xl border border-[#d9ccb8] shadow-xs hover:shadow-xl hover:border-[#b8862b] transition-all duration-300 flex flex-col justify-between space-y-5 hover:-translate-y-1.5"
            >
              {/* Ornate Gold Corner Accent (Top Left) */}
              <div className="absolute top-2 left-2 text-[#b8862b]/40 group-hover:text-[#b8862b] transition-colors">
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-current">
                  <path d="M0 0 H8 V2 H2 V8 H0 Z" />
                </svg>
              </div>
              {/* Ornate Gold Corner Accent (Top Right) */}
              <div className="absolute top-2 right-2 text-[#b8862b]/40 group-hover:text-[#b8862b] transition-colors">
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-current">
                  <path d="M16 0 H8 V2 H14 V8 H16 Z" />
                </svg>
              </div>

              <div className="space-y-4">
                {/* Header: Islamic Vector Icon + Calligraphic Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div className="p-3 rounded-2xl bg-[#f9f3e6] border border-[#b8862b]/35 shadow-2xs group-hover:scale-108 group-hover:bg-[#f6eedb] transition-all duration-300">
                    {v.icon}
                  </div>

                  <span className="text-[10.5px] font-bold px-3 py-1 rounded-full bg-[#f6eedb] border border-[#b8862b]/35 text-[#7a1c30] shadow-2xs">
                    ◈ {v.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-[17px] font-bold text-[#2e1516] leading-snug group-hover:text-[#7a1c30] transition-colors">
                  {v.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-[12.5px] text-[#3e1d1c]/80 leading-relaxed font-normal">
                  {v.description}
                </p>
              </div>

              {/* Bottom Guarantee Signature */}
              <div className="pt-3.5 border-t border-[#ebdcc9] flex items-center justify-between text-[11px] font-bold text-[#7a1c30]">
                <div className="flex items-center gap-1.5">
                  <BotehMark className="w-3.5 h-3.5 text-[#b8862b]" />
                  <span>تولید مستقیم کارگاه بافت یزد</span>
                </div>
                <span className="text-[#b8862b] text-xs">✦</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
