'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  BotehMark,
  PersianArchImageFrame,
} from './motifs';

interface HeroTriptychProps {
  onOpenConsultation: () => void;
}

export function HeroTriptych({ onOpenConsultation }: HeroTriptychProps) {
  const [activeFlank, setActiveFlank] = useState<'right' | 'center' | 'left'>('center');

  return (
    <section id="hero" className="relative overflow-hidden pt-6 pb-12 lg:pt-8 lg:pb-16 bg-sand">
      {/* Background Architectural Ambiance & Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f4ede2]/70 via-sand to-sand pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-radial from-gold/15 via-brand/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* The 3-Dome Imperial Layout (طاق‌های گوشواره راست و چپ در طرفین متن، و طاق اصلی در بالای متن) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center">
          {/* 1. Right Flank Dome (طاقچه گوشواره راست - رومیزی ۵ تکه) - 3 cols on lg */}
          <div
            onMouseEnter={() => setActiveFlank('right')}
            className={`hidden lg:block lg:col-span-3 transition-all duration-500 cursor-pointer ${
              activeFlank === 'right' ? 'scale-105 z-20' : 'opacity-90 hover:opacity-100 z-10'
            }`}
          >
            <div className="bg-paper rounded-t-[70px] rounded-b-2xl border-2 border-gold/40 p-2 shadow-md hover:shadow-xl transition-all">
              <PersianArchImageFrame variant="scalloped" className="aspect-[3/4.2] w-full">
                <Image
                  src="/images/table-runner.jpg"
                  alt="ست رومیزی ۵ تکه ابریشم یزد"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 inset-x-2 text-center text-white z-20">
                  <span className="text-[10px] text-amber-200 font-bold block">
                    طرح شاه‌عباسی فیروزه‌ای
                  </span>
                  <h3 className="text-xs font-black">ست ۵ تکه پذیرایی</h3>
                </div>
              </PersianArchImageFrame>
            </div>
          </div>

          {/* 2. Center Stage (طاق و گنبد اصلی در بالا + متن و دکمه‌های فراخوان در زیر آن) - 6 cols on lg */}
          <div className="lg:col-span-6 space-y-5 text-center flex flex-col items-center">
            {/* Top Main Grand Dome (طاق و گنبد اصلی شاه‌نشین در بالای متن) */}
            <div
              onMouseEnter={() => setActiveFlank('center')}
              className="w-full max-w-md mx-auto transition-all duration-500"
            >
              <div className="bg-paper rounded-t-[80px] rounded-b-3xl border-2 border-gold p-3 shadow-xl relative group">
                {/* Top Center Keystone Finial */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-brand text-gold flex items-center justify-center border-2 border-gold shadow-md z-40">
                  <BotehMark className="w-5 h-5 text-gold" />
                </div>

                <PersianArchImageFrame
                  variant="pointed"
                  badge="شاهکار زری‌باف یزد"
                  className="aspect-16/10 sm:aspect-16/9 w-full"
                >
                  <Image
                    src="/images/hero.jpg"
                    alt="پارچه ترمه اصیل ایرانی با تار ابریشم طبیعی"
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </PersianArchImageFrame>
              </div>
            </div>

            {/* Main Prestigious Heading */}
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-ink leading-tight sm:leading-snug tracking-tight">
                شکوه و اصالت <span className="text-brand">ترمه دست‌بافت ایران</span>
              </h1>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed max-w-lg mx-auto">
                خلق نفیس‌ترین رومیزی‌ها، سرویس‌های شاه‌نشین و هدایای فاخر با تار و پود ابریشم طبیعی پیله و شناسنامه رسمی یزد.
              </p>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <a
                href="#products"
                className="px-6 py-3 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs sm:text-sm font-bold shadow-lg shadow-brand/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                مشاهده گنجینه محصولات
              </a>
              <button
                onClick={onOpenConsultation}
                className="px-5 py-3 rounded-xl bg-paper border border-gold hover:bg-gold-soft text-brand text-xs sm:text-sm font-bold shadow-2xs transition-all cursor-pointer"
              >
                مشاوره و سفارش اختصاصی
              </button>
            </div>
          </div>

          {/* 3. Left Flank Dome (طاقچه گوشواره چپ - سرویس شاه‌نشین) - 3 cols on lg */}
          <div
            onMouseEnter={() => setActiveFlank('left')}
            className={`hidden lg:block lg:col-span-3 transition-all duration-500 cursor-pointer ${
              activeFlank === 'left' ? 'scale-105 z-20' : 'opacity-90 hover:opacity-100 z-10'
            }`}
          >
            <div className="bg-paper rounded-t-[70px] rounded-b-2xl border-2 border-gold/40 p-2 shadow-md hover:shadow-xl transition-all">
              <PersianArchImageFrame variant="ogee" className="aspect-[3/4.2] w-full">
                <Image
                  src="/images/shahneshin.jpg"
                  alt="سرویس کامل شاه‌نشین سنتی ترمه"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 inset-x-2 text-center text-white z-20">
                  <span className="text-[10px] text-amber-200 font-bold block">
                    دست‌دوز با فوم سرد
                  </span>
                  <h3 className="text-xs font-black">سرویس ۷ تکه شاه‌نشین</h3>
                </div>
              </PersianArchImageFrame>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Alternative Carousel for Flanks */}
        <div className="grid grid-cols-2 gap-3 lg:hidden mt-6">
          <div className="bg-paper rounded-2xl border border-line p-2 text-center">
            <div className="relative aspect-4/3 rounded-xl overflow-hidden mb-1.5">
              <Image src="/images/table-runner.jpg" alt="رومیزی" fill className="object-cover" />
            </div>
            <span className="text-[10px] font-bold text-brand block">ست رومیزی ۵ تکه</span>
          </div>
          <div className="bg-paper rounded-2xl border border-line p-2 text-center">
            <div className="relative aspect-4/3 rounded-xl overflow-hidden mb-1.5">
              <Image src="/images/shahneshin.jpg" alt="شاه‌نشین" fill className="object-cover" />
            </div>
            <span className="text-[10px] font-bold text-brand block">سرویس شاه‌نشین</span>
          </div>
        </div>

        {/* Bottom Architectural Craftsmanship Ribbon (پایاب مشخصات کارگاه) */}
        <div className="mt-8 max-w-4xl mx-auto bg-paper/90 backdrop-blur-md rounded-2xl border border-line p-3.5 sm:p-4 shadow-xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-line text-xs">
            <div className="space-y-0.5">
              <div className="text-sm sm:text-base font-black text-brand">۱۰۰٪ ابریشم طبیعی</div>
              <div className="text-[10px] text-ink-muted">تار و پود پیله خالص</div>
            </div>
            <div className="space-y-0.5 pt-1.5 md:pt-0">
              <div className="text-sm sm:text-base font-black text-gold">۳۰۰ گره / cm²</div>
              <div className="text-[10px] text-ink-muted">تراکم سنگین صادراتی</div>
            </div>
            <div className="space-y-0.5 pt-1.5 md:pt-0">
              <div className="text-sm sm:text-base font-black text-turquoise">شناسنامه کتبی</div>
              <div className="text-[10px] text-ink-muted">پلاک شماره‌دار اصالت یزد</div>
            </div>
            <div className="space-y-0.5 pt-1.5 md:pt-0">
              <div className="text-sm sm:text-base font-black text-ink">ارسال بیمه‌شده</div>
              <div className="text-[10px] text-ink-muted">رایگان به سراسر کشور</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
