'use client';

import React from 'react';
import Image from 'next/image';
import {
  GlobalIslamicClipDefs,
  PersianArchImageFrame,
  ShamsehEightStar,
  OrsiWindowLattice,
  BotehMark,
} from './motifs';

interface CategoryItem {
  id: string;
  title: string;
  count: string;
  image: string;
  motif: string;
  tag: string;
  archVariant: 'pointed' | 'scalloped' | 'ogee';
}

const categories: CategoryItem[] = [
  {
    id: 'table-runners',
    title: 'رومیزی و رانر ۵ تکه',
    count: '۴۲ طرح و رنگ',
    image: '/images/table-runner.jpg',
    motif: 'طرح شاه‌عباسی',
    tag: 'محبوب‌ترین',
    archVariant: 'pointed',
  },
  {
    id: 'shahneshin',
    title: 'سرویس‌های شاه‌نشین',
    count: '۱۸ مدل سلطنتی',
    image: '/images/shahneshin.jpg',
    motif: 'بافت یزدی',
    tag: 'ویژه دکوراسیون',
    archVariant: 'scalloped',
  },
  {
    id: 'sajjadeh',
    title: 'سجاده و جانماز نفیس',
    count: '۲۵ مدل کادویی',
    image: '/images/sajjadeh.jpg',
    motif: 'ابریشم طبیعی',
    tag: 'هدیه معنوی',
    archVariant: 'pointed',
  },
  {
    id: 'corporate',
    title: 'پک‌های هدیه سازمانی',
    count: '۱۵ مدل مدیریتی',
    image: '/images/corporate-gift.jpg',
    motif: 'جعبه خاتم و چوب',
    tag: 'لوکس و سفارشی',
    archVariant: 'ogee',
  },
  {
    id: 'boghtche',
    title: 'بقچه و رانر تک ابریشم',
    count: '۳۰ تنوع ابعاد',
    image: '/images/boghtche.jpg',
    motif: 'زری‌بافت اعلا',
    tag: 'صادراتی',
    archVariant: 'scalloped',
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
    <section id="categories" className="scroll-mt-20 py-16 sm:py-20 bg-sand border-b border-line relative overflow-hidden">
      {/* Global SVG Islamic Arch Clip Paths Definitions */}
      <GlobalIslamicClipDefs />

      {/* Background Girih Lattice Watermark */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" aria-hidden="true">
        <OrsiWindowLattice className="w-full h-full text-brand" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-soft border border-gold/40 text-[#8A5A06] text-xs font-bold shadow-2xs">
            <BotehMark className="w-4 h-4 text-brand" />
            <span>گنجینه دسته‌بندی‌های اصیل در قاب طاق‌های معماری یزد</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-ink tracking-tight">
            انتخاب بر اساس هنر، نقش و کاربری
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
            ورود به گنجینه ترمه‌های نفیس از درگاه‌های الهام‌گرفته از معماری تاریخی یزد
          </p>
        </div>

        {/* 5 Islamic Arch-Shaped Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleClick(cat.id)}
              className="group cursor-pointer flex flex-col items-center"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleClick(cat.id);
                }
              }}
              aria-label={`مشاهده دسته‌بندی ${cat.title}`}
            >
              {/* Islamic Arch Framed Container */}
              <PersianArchImageFrame
                variant={cat.archVariant}
                className="w-full aspect-[3/4] shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1"
              >
                {/* Product Image with Zoom */}
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 20vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Subtle Lattice Overlay visible on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 text-gold pointer-events-none" aria-hidden="true">
                  <OrsiWindowLattice />
                </div>

                {/* Dark Vignette Overlay for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />

                {/* Tag Badge */}
                <div className="absolute top-8 right-2.5 z-20">
                  <span className="text-[10px] font-bold bg-brand text-white px-2.5 py-0.5 rounded-md shadow-xs border border-gold/30">
                    {cat.tag}
                  </span>
                </div>

                {/* Card Content Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-center text-white space-y-1 z-20">
                  <span className="text-[10px] text-amber-200 font-bold block">
                    {cat.motif}
                  </span>
                  <h3 className="text-xs sm:text-sm font-black tracking-tight leading-snug text-white group-hover:text-gold-soft transition-colors">
                    {cat.title}
                  </h3>
                  <span className="text-[11px] text-white/80 block">{cat.count}</span>

                  {/* Explore Pill Button */}
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-white/95 text-brand px-3.5 py-1 rounded-full shadow-md group-hover:bg-gold group-hover:text-[#210F15] transition-all duration-200">
                      <span>مشاهده</span>
                      <span aria-hidden="true">←</span>
                    </span>
                  </div>
                </div>
              </PersianArchImageFrame>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
