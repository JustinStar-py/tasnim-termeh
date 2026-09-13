'use client';

import React from 'react';
import Image from 'next/image';
import {
  BotehMark,
  ShamsehEightStar,
  ShamsehTwelveStar,
  OrsiWindowLattice,
  GirihDivider,
} from './motifs';

interface CategoryItem {
  id: string;
  title: string;
  count: string;
  image: string;
  motif: string;
  tag: string;
}

const categories: CategoryItem[] = [
  {
    id: 'table-runners',
    title: 'رومیزی و رانر ۵ تکه',
    count: '۴۲ طرح و رنگ',
    image: '/images/table-runner.jpg',
    motif: 'طرح شاه‌عباسی و بته‌جقه',
    tag: 'محبوب‌ترین',
  },
  {
    id: 'shahneshin',
    title: 'سرویس‌های شاه‌نشین',
    count: '۱۸ مدل سلطنتی',
    image: '/images/shahneshin.jpg',
    motif: 'بافت سنگین یزدی',
    tag: 'ویژه دکوراسیون',
  },
  {
    id: 'sajjadeh',
    title: 'سجاده و جانماز نفیس',
    count: '۲۵ مدل کادویی',
    image: '/images/sajjadeh.jpg',
    motif: 'ابریشم ۱۰۰٪ طبیعی',
    tag: 'هدیه معنوی',
  },
  {
    id: 'corporate',
    title: 'پک‌های هدیه سازمانی',
    count: '۱۵ مدل مدیریتی',
    image: '/images/corporate-gift.jpg',
    motif: 'جعبه چوبی خاتم و ترمه',
    tag: 'لوکس و سفارشی',
  },
  {
    id: 'boghtche',
    title: 'بقچه و رانر تک ابریشم',
    count: '۳۰ تنوع ابعاد',
    image: '/images/boghtche.jpg',
    motif: 'زری‌بافت اعلا و ترنج',
    tag: 'صادراتی',
  },
];

interface CategoryArchesProps {
  onSelectCategory: (categoryId: string) => void;
}

export function CategoryArches({ onSelectCategory }: CategoryArchesProps) {
  const handleClick = (catId: string) => {
    onSelectCategory(catId);
    const elem = document.getElementById('products');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="scroll-mt-20 py-14 sm:py-20 bg-sand border-b border-line relative overflow-hidden">
      {/* 1. Subtle Khatoon Star & Girih Faint Watermarks (Ultra-low opacity, non-intrusive) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02] text-brand select-none overflow-hidden" aria-hidden="true">
        <OrsiWindowLattice className="w-full h-full" />
      </div>
      <div className="pointer-events-none absolute -left-14 top-1/2 -translate-y-1/2 opacity-[0.04] text-gold select-none hidden lg:block" aria-hidden="true">
        <ShamsehTwelveStar className="h-72 w-72" />
      </div>
      <div className="pointer-events-none absolute -right-14 top-1/2 -translate-y-1/2 opacity-[0.04] text-gold select-none hidden lg:block" aria-hidden="true">
        <ShamsehTwelveStar className="h-72 w-72" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-soft border border-gold/40 text-[#8A5A06] text-xs font-bold shadow-2xs">
            <BotehMark className="w-4 h-4 text-brand" />
            <span>دسته‌بندی‌های برگزیده ترمه تسنیم</span>
            <ShamsehEightStar className="w-3.5 h-3.5 text-gold" />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-ink tracking-tight">
            انتخاب بر اساس هنر، نقش و کاربری
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
            مجموعه‌ای هماهنگ و چشم‌نواز از اصیل‌ترین دست‌بافته‌های ابریشمی یزد
          </p>
        </div>

        {/* Mobile Horizontal Snap Carousel / Desktop 5-Column Grid */}
        <div className="flex sm:grid overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none -mx-4 px-4 sm:mx-0 sm:px-0 gap-3.5 sm:gap-5 lg:gap-6 pb-3 sm:pb-0 no-scrollbar sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleClick(cat.id)}
              className="w-[75vw] xs:w-[62vw] shrink-0 snap-center sm:w-auto group cursor-pointer flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-line bg-paper p-2.5 sm:p-3 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-gold/60 hover:-translate-y-1 text-right"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleClick(cat.id);
                }
              }}
              aria-label={`مشاهده دسته‌بندی ${cat.title}`}
            >
              {/* Unclipped Image Container matching product card proportions (aspect-[3/4]) */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-sand-dark">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 639px) 75vw, (max-width: 1023px) 33vw, 20vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Gentle Scrim Vignette for typography contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* Clean Floating Badge */}
                <div className="absolute top-2.5 right-2.5 z-10">
                  <span className="inline-block rounded-lg bg-brand/90 backdrop-blur-xs px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-white shadow-sm border border-gold/30">
                    {cat.tag}
                  </span>
                </div>

                {/* Bottom Overlay Text */}
                <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-right z-10 space-y-1">
                  <span className="text-[10px] sm:text-[11px] text-amber-200 font-bold block truncate">
                    {cat.motif}
                  </span>
                  <h3 className="text-xs sm:text-sm font-black text-white leading-snug group-hover:text-gold-soft transition-colors line-clamp-1">
                    {cat.title}
                  </h3>
                  <span className="text-[10px] sm:text-[11px] text-white/80 block">
                    {cat.count}
                  </span>
                </div>
              </div>

              {/* Action Strip at bottom */}
              <div className="pt-2.5 pb-1 px-1 flex items-center justify-between text-xs font-bold text-brand group-hover:text-gold transition-colors">
                <span>مشاهده آثار</span>
                <span className="transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true">
                  ←
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Hint Indicator */}
        <div className="flex sm:hidden items-center justify-center gap-1.5 mt-3 text-[11px] text-ink-muted">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold" />
          <span>برای مشاهده سایر دسته‌بندی‌ها به چپ بکشید</span>
          <span className="text-gold">←</span>
        </div>

        {/* Delicate Persian Girih Divider bridging to the Catalog */}
        <div className="max-w-xs sm:max-w-md mx-auto mt-12 sm:mt-16 opacity-60">
          <GirihDivider />
        </div>

      </div>
    </section>
  );
}
