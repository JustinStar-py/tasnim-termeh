'use client';

import React, { useState, useRef, MouseEvent } from 'react';
import Image from 'next/image';
import {
  BotehMark,
  ShamsehEightStar,
  PersianArchImageFrame,
} from './motifs';

interface Colorway {
  id: string;
  name: string;
  enName: string;
  colorHex: string;
  goldAccent: string;
  image: string;
  patternTitle: string;
  density: string;
  yarnSpec: string;
  description: string;
}

const colorways: Colorway[] = [
  {
    id: 'ruby',
    name: 'زرشکی لاکی و زری',
    enName: 'Royal Ruby & Gold',
    colorHex: '#7a1c30',
    goldAccent: '#c59b27',
    image: '/images/hero.jpg',
    patternTitle: 'طرح بته‌جقه شاهی یاقوتی',
    density: '۳۰۰ گره در سانتی‌متر مربع',
    yarnSpec: 'تار و پود ابریشم طبیعی پیله + نخ لمه متالیک درخشان',
    description:
      'شاهکار اصیل دست‌بافان یزد با تراکم سنگین صادراتی و مقاومت بی‌نظیر در برابر فرسایش و نور.',
  },
  {
    id: 'turquoise',
    name: 'فیروزه کویری و زرین',
    enName: 'Yazd Turquoise & Gold',
    colorHex: '#147a75',
    goldAccent: '#dfb74a',
    image: '/images/table-runner.jpg',
    patternTitle: 'طرح شاه‌عباسی فیروزه‌ای',
    density: '۲۸۰ گره متراکم',
    yarnSpec: 'رنگرزی گیاهی نیل و اسپرک + الیاف ابریشم ۱۰۰٪ طبیعی',
    description:
      'آمیزه‌ای از رنگ لاجورد و فیروزه مساجد تاریخی با گل‌های شاه‌عباسی زردوزی‌شده برای میز پذیرایی.',
  },
  {
    id: 'khatam-gold',
    name: 'زربفت سلطنتی و گردو',
    enName: 'Imperial Gold & Khatam',
    colorHex: '#c59b27',
    goldAccent: '#7a1c30',
    image: '/images/corporate-gift.jpg',
    patternTitle: 'طرح ترنج و خاتم سلطنتی',
    density: '۲۹۰ گره ابریشمی',
    yarnSpec: 'نخ‌های زری خالص + جعبه خاتم‌کاری چوب گردوی اعلا',
    description:
      'محبوب‌ترین ترکیب برای هدایای نفیس مدیریتی و تشریفاتی به همراه پلاک شماره‌دار اصالت.',
  },
  {
    id: 'garnet-shahneshin',
    name: 'عنابی شاه‌نشین',
    enName: 'Garnet Shahneshin',
    colorHex: '#541120',
    goldAccent: '#c59b27',
    image: '/images/shahneshin.jpg',
    patternTitle: 'سرویس سنتی شاه‌نشین یزد',
    density: '۳۲۰ گره فوق‌سنگین',
    yarnSpec: 'فوم سرد ارگونومیک بدون افت فرم + مغزی‌دوزی لمه طلایی',
    description:
      'چیدمان سلطنتی ایرانی با بالشتک‌های لوله‌ای لمبه و کوسن‌های زردوزی‌شده دست‌دوز.',
  },
];

interface HeroAtelierProps {
  onOpenConsultation: () => void;
}

export function HeroAtelier({ onOpenConsultation }: HeroAtelierProps) {
  const [selectedColor, setSelectedColor] = useState<Colorway>(colorways[0]);
  const [isInspecting, setIsInspecting] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-20 bg-sand">
      {/* Background Subtle Gradient & Girih Ambiance */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f4ede2]/70 via-sand to-sand pointer-events-none -z-10" />
      <div
        className="absolute top-1/3 left-1/4 w-[500px] h-[350px] rounded-full blur-3xl pointer-events-none opacity-20 -z-10 transition-colors duration-700"
        style={{ backgroundColor: selectedColor.colorHex }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Atelier Badge */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paper border border-gold/40 text-brand text-xs font-bold shadow-xs">
            <ShamsehEightStar className="w-4 h-4 text-gold" />
            <span>میز تعاملی کارگاه و بررسی میکروسکوپی تار و پود</span>
            <ShamsehEightStar className="w-4 h-4 text-gold" />
          </div>
        </div>

        {/* 2-Column Master Atelier Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Right Column: Copy, Colorway Switcher & Quality Metrics (7 cols) */}
          <div className="lg:col-span-6 space-y-6 text-right order-2 lg:order-1">
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-ink leading-tight sm:leading-snug">
                تار و پود اصالت؛ <br />
                <span style={{ color: selectedColor.colorHex }} className="transition-colors duration-500">
                  {selectedColor.patternTitle}
                </span>
              </h1>
              <p className="text-xs sm:text-base text-ink-muted leading-relaxed">
                {selectedColor.description}
              </p>
            </div>

            {/* Interactive Colorway Switcher (کلاف‌های رنگی کارگاه) */}
            <div className="p-4 sm:p-5 rounded-3xl bg-paper border border-line shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-ink flex items-center gap-1.5">
                  <BotehMark className="w-4 h-4 text-gold" />
                  <span>انتخاب کلاف و رنگ‌بندی اصیل کارگاه:</span>
                </span>
                <span className="text-brand font-black">{selectedColor.name}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {colorways.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c)}
                    className={`p-2.5 rounded-2xl border text-right transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                      selectedColor.id === c.id
                        ? 'border-gold bg-gold-soft/50 shadow-md ring-2 ring-gold/20 scale-[1.02]'
                        : 'border-line bg-sand hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="w-5 h-5 rounded-full border border-white shadow-xs"
                        style={{ backgroundColor: c.colorHex }}
                      />
                      {selectedColor.id === c.id && (
                        <span className="text-[10px] text-gold font-bold">فعال</span>
                      )}
                    </div>
                    <div>
                      <span className="text-xs font-black block text-ink">{c.name.split(' و ')[0]}</span>
                      <span className="text-[10px] text-ink-muted block">{c.density.split(' ')[0]} گره</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Thread & Density Specs */}
            <div className="p-4 rounded-2xl bg-[#fdfbf7] border border-line space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-ink-muted">تراکم چله‌کشی:</span>
                <span className="font-bold text-brand">{selectedColor.density}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink-muted">مشخصات الیاف:</span>
                <span className="font-bold text-ink">{selectedColor.yarnSpec}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <a
                href="#products"
                className="px-7 py-3.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs sm:text-sm font-bold shadow-lg shadow-brand/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                خرید این طرح و رنگ‌بندی
              </a>
              <button
                onClick={onOpenConsultation}
                className="px-6 py-3.5 rounded-xl bg-paper border border-gold hover:bg-gold-soft text-brand text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
              >
                درخواست کاتالوگ و سمپل الیاف
              </button>
            </div>
          </div>

          {/* Left Column: Interactive Textile Macro Lens (ذره‌بین لمس بافت) (6 cols) */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="space-y-3">
              {/* Inspection Mode Indicator Banner */}
              <div className="flex items-center justify-between text-xs px-2">
                <div className="flex items-center gap-1.5 text-gold font-bold">
                  <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
                  <span>قابلیت ذره‌بین تعاملی: نشانگر ماوس را روی پارچه حرکت دهید</span>
                </div>
                <span className="text-ink-muted text-[11px]">بزرگ‌نمایی ۲.۵ برابر</span>
              </div>

              {/* Main Interactive Arch Image Container */}
              <div
                ref={imageContainerRef}
                onMouseEnter={() => setIsInspecting(true)}
                onMouseLeave={() => setIsInspecting(false)}
                onMouseMove={handleMouseMove}
                className="relative cursor-crosshair group select-none"
              >
                <PersianArchImageFrame
                  variant="pointed"
                  badge={selectedColor.name}
                  className="aspect-4/3 sm:aspect-16/11 w-full"
                >
                  {/* Base Image */}
                  <Image
                    src={selectedColor.image}
                    alt={selectedColor.patternTitle}
                    fill
                    priority
                    className="object-cover transition-opacity duration-500"
                  />

                  {/* Microscopic Magnifying Lens Overlay */}
                  {isInspecting && (
                    <div
                      className="absolute w-44 h-44 rounded-full border-3 border-gold bg-paper shadow-2xl pointer-events-none overflow-hidden z-30 transform -translate-x-1/2 -translate-y-1/2 hidden sm:block"
                      style={{
                        left: `${zoomPos.x}%`,
                        top: `${zoomPos.y}%`,
                        boxShadow: '0 0 0 4px rgba(255, 255, 255, 0.8), 0 20px 40px rgba(0, 0, 0, 0.4)',
                      }}
                    >
                      {/* 2.5x Zoomed Background Image */}
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage: `url(${selectedColor.image})`,
                          backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                          backgroundSize: '350%',
                          backgroundRepeat: 'no-repeat',
                        }}
                      />

                      {/* Lens Crosshair & Specs overlay */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                        <div className="w-full h-[1px] bg-gold" />
                        <div className="h-full w-[1px] bg-gold absolute" />
                        <div className="w-8 h-8 rounded-full border border-gold absolute" />
                      </div>

                      <div className="absolute bottom-2 inset-x-0 text-center">
                        <span className="text-[9px] font-black bg-brand text-white px-2 py-0.5 rounded-full shadow-xs">
                          تراکم ۳۰۰ گره
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Floating Plaque at Bottom of Frame */}
                  <div className="absolute bottom-3 inset-x-3 bg-paper/95 backdrop-blur-md rounded-2xl p-3.5 border border-gold/40 shadow-lg flex items-center justify-between text-right z-20">
                    <div>
                      <div className="flex items-center gap-1 text-[10px] font-black text-gold">
                        <ShamsehEightStar className="w-3 h-3 text-gold" />
                        <span>شناسنامه رسمی بافت یزد</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-black text-brand mt-0.5">
                        {selectedColor.patternTitle}
                      </h4>
                    </div>

                    <span className="text-xs text-turquoise font-black bg-turquoise-soft px-3 py-1.5 rounded-xl border border-turquoise/20">
                      ✓ ابریشم طبیعی اصل
                    </span>
                  </div>
                </PersianArchImageFrame>
              </div>

              {/* Mobile Inspector Helper Notice */}
              <div className="sm:hidden text-center text-[11px] text-ink-muted bg-paper p-2.5 rounded-xl border border-line">
                ✨ برای مشاهده تراکم تار و پود، رنگ‌بندی‌های بالا را لمس نمایید.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
