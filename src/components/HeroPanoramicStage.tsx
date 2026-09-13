'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  BotehMark,
  ShamsehEightStar,
  PersianArchImageFrame,
} from './motifs';

interface ShowcasePod {
  id: number;
  title: string;
  categoryName: string;
  price: string;
  image: string;
  density: string;
  badge: string;
  archVariant: 'pointed' | 'scalloped' | 'ogee';
}

const showcasePods: ShowcasePod[] = [
  {
    id: 1,
    title: 'رانر سلطنتی طرح بته‌جقه شاهی یاقوتی',
    categoryName: 'رومیزی ابریشم زربفت',
    price: '۱,۸۵۰,۰۰۰',
    image: '/images/hero.jpg',
    density: '۳۰۰ گره در سانتی‌متر',
    badge: 'شاهکار زری‌باف',
    archVariant: 'pointed',
  },
  {
    id: 2,
    title: 'ست رومیزی ۵ تکه طرح شاه‌عباسی فیروزه‌ای',
    categoryName: 'ست ۵ تکه پذیرایی',
    price: '۳,۴۵۰,۰۰۰',
    image: '/images/table-runner.jpg',
    density: '۲۸۰ گره متراکم',
    badge: 'پرفروش‌ترین',
    archVariant: 'scalloped',
  },
  {
    id: 3,
    title: 'سرویس ۷ تکه شاه‌نشین سنتی یزد با فوم سرد',
    categoryName: 'سرویس شاه‌نشین',
    price: '۱۲,۸۰۰,۰۰۰',
    image: '/images/shahneshin.jpg',
    density: '۳۲۰ گره سنگین',
    badge: 'ویژه جهیزیه',
    archVariant: 'ogee',
  },
];

interface HeroPanoramicStageProps {
  onOpenConsultation: () => void;
  onAddToCart?: (productId: number) => void;
}

export function HeroPanoramicStage({ onOpenConsultation }: HeroPanoramicStageProps) {
  const [activePodId, setActivePodId] = useState<number>(1);

  return (
    <section id="hero" className="relative min-h-[620px] lg:min-h-[720px] overflow-hidden flex flex-col justify-between">
      {/* 1. Full-Bleed Panoramic Yazd Courtyard Background */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/yazd-courtyard.jpg"
          alt="عمارت تاریخی یزد و شکوه ترمه ایرانی"
          fill
          priority
          className="object-cover object-center transform scale-105 transition-transform duration-1000"
        />
      </div>

      {/* 2. Deep Royal Gradient Overlay (Vignette for Crystal-Clear Persian Typography) */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#120e0c]/70 to-[#120e0c]/95 -z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#120e0c] via-transparent to-[#120e0c]/40 -z-10" />

      {/* 3. Main Content Stage */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-10 sm:pt-14 lg:pt-18 pb-8 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Right Side: Royal Typography & Authority (6 cols on lg) */}
          <div className="lg:col-span-6 space-y-6 text-right text-white">
            {/* National Heritage Plaque Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paper/10 backdrop-blur-md border border-gold/50 text-gold text-xs font-bold shadow-lg">
              <ShamsehEightStar className="w-4 h-4 text-gold animate-pulse" />
              <span>میراث کهن بافندگان دیار یزد • شناسنامه ثبت ملی صنایع دستی</span>
            </div>

            {/* Main Confident Heading */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight sm:leading-snug tracking-tight">
                شکوه و اصالت <br />
                <span className="gold-shimmer">ترمه دست‌بافت ایران</span>
              </h1>
              <p className="text-base sm:text-lg text-amber-100/90 font-medium">
                تار و پود ابریشم طبیعی و زری در تالار دکوراسیون و هدایای فاخر
              </p>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-xl text-justify sm:text-right">
              مجموعه بی‌بدیل <strong className="text-gold font-bold">تسنیم ترمه</strong>؛ خلق‌شده با الیاف پیله طبیعی، بالاترین تراکم گره و هنر چله‌کشی سنتی برای آراستن منازل، تالارهای پذیرایی و هدایای ارزشمند سازمانی.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#products"
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-gold to-gold-hover text-brand font-black text-xs sm:text-sm shadow-xl shadow-gold/25 hover:scale-105 transition-all cursor-pointer"
              >
                مشاهده گنجینه محصولات
              </a>
              <button
                onClick={onOpenConsultation}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
              >
                مشاوره و سفارش سفارشی
              </button>
            </div>

            {/* Trust Assurance Line */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-amber-100/85">
              <span className="flex items-center gap-1.5">
                <span className="text-gold">✓</span> ارسال رایگان سراسر کشور
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-gold">✓</span> ۱۰ سال ضمانت کتبی ثبات رنگ
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-gold">✓</span> پلاک رسمی اصالت یزد
              </span>
            </div>
          </div>

          {/* Left Side: 3D Staggered Arch Pods Stage (6 cols on lg) */}
          <div className="lg:col-span-6 relative mt-4 lg:mt-0">
            <div className="relative max-w-lg mx-auto lg:max-w-none">
              {/* Header Label for Pods */}
              <div className="flex items-center justify-between text-xs text-amber-200/90 font-bold mb-3 px-2">
                <div className="flex items-center gap-1.5">
                  <BotehMark className="w-4 h-4 text-gold" />
                  <span>شاهکارهای منتخب در قاب طاق‌های یزد:</span>
                </div>
                <span className="text-[11px] text-white/70">برای مشاهده کلیک کنید</span>
              </div>

              {/* 3 Interactive Staggered Showcase Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {showcasePods.map((pod) => {
                  const isActive = activePodId === pod.id;
                  return (
                    <div
                      key={pod.id}
                      onClick={() => setActivePodId(pod.id)}
                      className={`group cursor-pointer rounded-3xl transition-all duration-500 overflow-hidden ${
                        isActive
                          ? 'bg-paper/95 text-ink shadow-2xl ring-2 ring-gold scale-105 z-20'
                          : 'bg-paper/80 backdrop-blur-md text-ink shadow-lg hover:bg-paper hover:scale-[1.02] z-10'
                      }`}
                    >
                      {/* Architectural Arch Image */}
                      <div className="p-2.5 pb-0">
                        <PersianArchImageFrame
                          variant={pod.archVariant}
                          badge={pod.badge}
                          className="aspect-square w-full"
                        >
                          <Image
                            src={pod.image}
                            alt={pod.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </PersianArchImageFrame>
                      </div>

                      {/* Pod Content */}
                      <div className="p-3 text-right space-y-1.5">
                        <span className="text-[10px] text-gold font-black block">
                          {pod.categoryName}
                        </span>
                        <h3 className="text-xs font-bold text-ink line-clamp-1 group-hover:text-brand">
                          {pod.title}
                        </h3>
                        <div className="pt-2 border-t border-line flex items-center justify-between">
                          <span className="text-xs font-black text-brand">
                            {pod.price} <span className="text-[10px] font-normal text-ink-muted">تومان</span>
                          </span>
                          <span className="text-[10px] text-turquoise font-bold">
                            {pod.density.split(' ')[0]} گره
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Active Pod Quick Highlight Bar */}
              <div className="mt-4 p-3.5 rounded-2xl bg-paper/90 backdrop-blur-md border border-gold/40 shadow-xl flex items-center justify-between text-right text-ink">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-brand text-gold flex items-center justify-center border border-gold/40">
                    <BotehMark className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-brand">
                      {showcasePods.find((p) => p.id === activePodId)?.title}
                    </h4>
                    <span className="text-[10px] text-ink-muted">
                      دارای پلاک شماره‌دار و شناسنامه رسمی بافت یزد
                    </span>
                  </div>
                </div>

                <a
                  href="#products"
                  className="px-3.5 py-1.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-bold shadow-xs transition-colors shrink-0"
                >
                  مشاهده جزئیات
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Glassmorphic Heritage Metrics Bar */}
      <div className="w-full bg-[#120e0c]/90 backdrop-blur-md border-t border-gold/30 py-4 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-white/10 text-white text-xs">
          <div className="space-y-0.5">
            <div className="text-base sm:text-lg font-black text-gold">۱۰۰٪ ابریشم طبیعی</div>
            <div className="text-[11px] text-amber-100/70">تار و پود پیله خالص</div>
          </div>
          <div className="space-y-0.5 pt-2 md:pt-0">
            <div className="text-base sm:text-lg font-black text-gold">۳۰۰ گره / cm²</div>
            <div className="text-[11px] text-amber-100/70">تراکم سنگین صادراتی</div>
          </div>
          <div className="space-y-0.5 pt-2 md:pt-0">
            <div className="text-base sm:text-lg font-black text-gold">۱۰ سال ضمانت</div>
            <div className="text-[11px] text-amber-100/70">ثبات ماندگار رنگ و بافت</div>
          </div>
          <div className="space-y-0.5 pt-2 md:pt-0">
            <div className="text-base sm:text-lg font-black text-gold">بسته‌بندی فاخر</div>
            <div className="text-[11px] text-amber-100/70">جعبه چوب گردو و خاتم</div>
          </div>
        </div>
      </div>
    </section>
  );
}
