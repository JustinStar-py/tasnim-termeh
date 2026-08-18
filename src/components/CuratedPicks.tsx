'use client';

import React from 'react';
import Image from 'next/image';
import { ProductItem } from './BestsellersBand';
import { PersianArchImageFrame, ShamsehEightStar, ShamsehTwelveStar, BotehMark } from './motifs';

interface CuratedPicksProps {
  products: ProductItem[];
  onAddToCart: (product: ProductItem) => void;
  onQuickView: (product: ProductItem) => void;
  onOpenConsultation: () => void;
}

export function CuratedPicks({
  products,
  onAddToCart,
  onQuickView,
  onOpenConsultation,
}: CuratedPicksProps) {
  const secondary = products.slice(1, 4);

  return (
    <section id="artisan" className="py-16 bg-sand border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2 text-right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-soft border border-gold/30 text-gold text-xs font-bold shadow-xs">
              <ShamsehEightStar className="w-4 h-4 text-gold" />
              <span>انتخاب استادکاران و طراحان یزد</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-ink">
              منتخب شاهکارهای دست‌بافت و زری‌دوزی
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted">
              آثاری با بیشترین تراکم نخ ابریشم و ظریف‌ترین جزئیات حاشیه‌دوزی در قاب‌های سنتی
            </p>
          </div>

          <button
            onClick={onOpenConsultation}
            className="px-5 py-2.5 rounded-xl border border-brand text-brand hover:bg-brand hover:text-white text-xs font-bold transition-colors cursor-pointer"
          >
            سفارش طرح‌های اختصاصی و سفارشی
          </button>
        </div>

        {/* Mixed Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Large Master Artisan Lifestyle Block inside Grand Persian Arch (5 cols) */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden border border-gold/40 bg-paper shadow-lg flex flex-col justify-between group min-h-[460px]">
            <div className="absolute inset-0">
              <Image
                src="/images/artisan-loom.jpg"
                alt="کارگاه بافت سنتی ترمه یزد"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>

            <div className="relative p-6 z-10 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs bg-gold text-brand px-3 py-1 rounded-full font-black shadow-md">
                <ShamsehEightStar className="w-3.5 h-3.5 text-brand" />
                <span>هنر دستی اصیل یزد</span>
              </span>
            </div>

            <div className="relative p-6 sm:p-8 z-10 text-white space-y-3 text-right">
              <div className="text-xs text-amber-200 font-bold">پاسداری از میراث ۵۰۰ ساله</div>
              <h3 className="text-xl sm:text-2xl font-black leading-snug">
                کارگاه بافت سنتی تسنیم در دل بافت تاریخی یزد
              </h3>
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                هر تخته ترمه با روزها دقت در چله‌کشی و هماهنگی بیش از ۱۰ رنگ نخ ابریشم طبیعی و زری بافته می‌شود تا در برابر نور و زمان درخشش خود را حفظ کند.
              </p>
              <div className="pt-2">
                <a
                  href="#about"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white transition-colors"
                >
                  <span>مشاهده شناسنامه کارگاه و فرایند بافت</span>
                  <span>←</span>
                </a>
              </div>
            </div>
          </div>

          {/* 3 Featured Products Column in Arch Frames (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {secondary.map((prod, idx) => (
              <div
                key={prod.id}
                className="bg-paper rounded-3xl border border-line p-3.5 overflow-hidden shadow-sm hover:shadow-card-hover transition-all flex flex-col justify-between group"
              >
                {/* Arch frame */}
                <div className="relative mb-2.5">
                  <PersianArchImageFrame
                    variant={idx === 0 ? 'pointed' : idx === 1 ? 'scalloped' : 'ogee'}
                    badge={prod.badge}
                    className="aspect-square w-full"
                  >
                    <Image
                      src={prod.image}
                      alt={prod.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </PersianArchImageFrame>
                </div>

                <div className="space-y-2 flex-1 flex flex-col justify-between text-right">
                  <div>
                    <span className="text-[10px] text-gold font-bold flex items-center gap-1 mb-1">
                      <ShamsehEightStar className="w-3 h-3 text-gold" />
                      <span>{prod.density}</span>
                    </span>
                    <h4 className="text-xs font-bold text-ink group-hover:text-brand line-clamp-2 leading-snug">
                      {prod.title}
                    </h4>
                  </div>

                  <div className="pt-3 border-t border-line flex items-center justify-between">
                    <div className="text-xs font-black text-brand">
                      {prod.price} <span className="text-[10px] font-normal text-ink-muted">تومان</span>
                    </div>

                    <button
                      onClick={() => onAddToCart(prod)}
                      className="px-2.5 py-1.5 rounded-lg bg-gold-soft hover:bg-gold text-brand hover:text-white border border-gold/40 text-[11px] font-bold transition-colors cursor-pointer"
                    >
                      افزودن
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
