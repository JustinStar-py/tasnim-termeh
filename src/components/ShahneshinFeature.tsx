'use client';

import React from 'react';
import Image from 'next/image';
import { BotehMark, ShamsehOrnament } from './motifs';

interface ShahneshinFeatureProps {
  onOpenConsultation: () => void;
}

export function ShahneshinFeature({ onOpenConsultation }: ShahneshinFeatureProps) {
  return (
    <section id="shahneshin" className="py-16 bg-sand-dark/60 border-b border-line relative overflow-hidden">
      {/* Background Girih Motif */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-soft/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-paper rounded-3xl border-2 border-gold/40 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Left / Text Side */}
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-6 text-right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-soft border border-brand/20 text-brand text-xs font-bold">
              <BotehMark className="w-4 h-4 text-brand" />
              <span>شاهکار دکوراسیون سنتی ایرانی</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-ink leading-snug">
              سرویس‌های اصیل <span className="text-brand">شاه‌نشین یزدی</span> (۷ و ۹ تکه)
            </h2>

            <p className="text-xs sm:text-sm lg:text-base text-ink-muted leading-relaxed">
              گرما و آرامش اصیل شاه‌نشین‌های کهن یزد را به فضای خانه، ویلا یا اقامتگاه خود دعوت کنید. مجموعه‌ای دست‌دوز شامل تشک ضخیم طبی، پشتی‌های سنتی لمبه، بالشتک‌های لوله‌ای و کوسن‌های زردوزی‌شده با تراکم صادراتی و مغزی‌دوزی‌های طلایی.
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm text-ink pt-2">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-gold-soft text-gold flex items-center justify-center text-xs font-bold shrink-0">
                  ✔
                </span>
                <span>فوم سرد ارگونومیک (بدون افت ضخامت طی سال‌ها)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-gold-soft text-gold flex items-center justify-center text-xs font-bold shrink-0">
                  ✔
                </span>
                <span>پارچه ترمه ابریشم سنگین با زیپ مخفی قابل شستشو</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-gold-soft text-gold flex items-center justify-center text-xs font-bold shrink-0">
                  ✔
                </span>
                <span>مغزی‌دوزی لمه طلایی و منگوله‌های دست‌بافت</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-gold-soft text-gold flex items-center justify-center text-xs font-bold shrink-0">
                  ✔
                </span>
                <span>امکان سفارشی‌سازی رنگ و ابعاد تشک نشیمن</span>
              </div>
            </div>

            {/* Price & Action */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-line">
              <div>
                <span className="block text-xs text-ink-muted">شروع قیمت ست کامل ۷ تکه از:</span>
                <span className="text-xl sm:text-2xl font-black text-brand">
                  ۱۲,۸۰۰,۰۰۰ <span className="text-xs font-normal text-ink-muted">تومان</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenConsultation}
                  className="px-6 py-3.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs sm:text-sm font-bold shadow-lg shadow-brand/20 transition-all cursor-pointer"
                >
                  سفارش ست شاه‌نشین با ابعاد دلخواه
                </button>
              </div>
            </div>
          </div>

          {/* Right / Big Image Side */}
          <div className="lg:col-span-5 relative aspect-4/3 lg:aspect-auto lg:h-full min-h-[380px] bg-sand">
            <Image
              src="/images/shahneshin.jpg"
              alt="سرویس کامل شاه‌نشین ترمه یزد"
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4 bg-paper/90 backdrop-blur-xs text-brand text-xs font-bold px-3 py-1.5 rounded-xl border border-line shadow-md flex items-center gap-1.5">
              <ShamsehOrnament className="w-4 h-4 text-gold" />
              <span>اصالت تضمین‌شده یزد</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
