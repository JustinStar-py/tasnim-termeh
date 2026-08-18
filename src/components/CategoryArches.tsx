'use client';

import React from 'react';
import Image from 'next/image';
import { PersianArchImageFrame, ShamsehEightStar, ShamsehTwelveStar, OrsiWindowLattice } from './motifs';

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
    image: '/images/hero.jpg',
    motif: 'زری‌بافت اعلا',
    tag: 'صادراتی',
    archVariant: 'scalloped',
  },
];

interface CategoryArchesProps {
  onSelectCategory: (categoryId: string) => void;
}

export function CategoryArches({ onSelectCategory }: CategoryArchesProps) {
  return (
    <section className="py-16 bg-sand border-b border-line relative overflow-hidden">
      {/* Background Girih Lattice Watermark */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <OrsiWindowLattice className="w-full h-full text-brand" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-soft border border-gold/40 text-gold text-xs font-bold shadow-xs">
            <ShamsehEightStar className="w-4 h-4 text-gold" />
            <span>دسته‌بندی‌های اصیل در قاب طاق‌های سنتی</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-ink">
            انتخاب بر اساس هنر، نقش و کاربرد
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted">
            نگاهی به گنجینه ترمه‌های نفیس در پنجره‌های معماری تاریخی یزد
          </p>
        </div>

        {/* 5 Islamic Arch-Shaped Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group cursor-pointer flex flex-col items-center"
            >
              {/* Islamic Arch Framed Container */}
              <PersianArchImageFrame
                variant={cat.archVariant}
                className="w-full aspect-3/4"
              >
                {/* Product Image with Zoom */}
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Subtle Lattice Overlay visible on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 text-gold pointer-events-none">
                  <OrsiWindowLattice />
                </div>

                {/* Dark Vignette Overlay for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                {/* Tag Badge */}
                <div className="absolute top-10 right-2 z-20">
                  <span className="text-[10px] font-bold bg-brand text-white px-2 py-0.5 rounded-md shadow-xs border border-gold/30">
                    {cat.tag}
                  </span>
                </div>

                {/* Card Content Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-center text-white space-y-1 z-20">
                  <span className="text-[10px] text-amber-200 font-bold block">
                    {cat.motif}
                  </span>
                  <h3 className="text-xs sm:text-sm font-black tracking-tight leading-snug">
                    {cat.title}
                  </h3>
                  <span className="text-[11px] text-white/80 block">{cat.count}</span>

                  {/* Explore Pill Button */}
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-white text-brand px-3.5 py-1 rounded-full shadow-md group-hover:bg-gold group-hover:text-white transition-colors">
                      <span>مشاهده</span>
                      <span>←</span>
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
