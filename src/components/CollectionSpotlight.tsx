'use client';

import React from 'react';
import Image from 'next/image';
import { PersianArchImageFrame, ShamsehEightStar, ShamsehTwelveStar, BotehMark } from './motifs';

interface CollectionItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  accentColor: string;
  productsCount: string;
  thumbnails: string[];
  archVariant: 'pointed' | 'scalloped' | 'ogee';
}

const collections: CollectionItem[] = [
  {
    id: 'shah-abbasi',
    title: 'مجموعهٔ نفیس طرح شاه‌عباسی',
    subtitle: 'گل‌های ختایی و اسلیمی دوران صفوی',
    description:
      'طرحی باشکوه با گل‌های شاه‌عباسی و خطوط اسلیمی بافته‌شده از الیاف ابریشم ناب و لمه درخشان طلایی برای پذیرایی‌های مجلل.',
    image: '/images/table-runner.jpg',
    accentColor: 'border-gold',
    productsCount: '۱۸ محصول مرتبط',
    thumbnails: ['/images/table-runner.jpg', '/images/hero.jpg', '/images/sajjadeh.jpg'],
    archVariant: 'pointed',
  },
  {
    id: 'boteh-jegheh',
    title: 'مجموعهٔ اصیل بته‌جقه مادر و بچه',
    subtitle: 'نماد سرو خمیده و جاودانگی فرهنگ ایران',
    description:
      'پرآوازه‌ترین نقش ترمه یزد، آمیخته با رنگ‌های یاقوتی، فیروزه‌ای و زری با تراکم فوق‌العاده ۲۸۰ گره در سانتیمتر مربع.',
    image: '/images/hero.jpg',
    accentColor: 'border-brand',
    productsCount: '۲۴ محصول مرتبط',
    thumbnails: ['/images/hero.jpg', '/images/shahneshin.jpg', '/images/corporate-gift.jpg'],
    archVariant: 'scalloped',
  },
  {
    id: 'toranj-lachak',
    title: 'مجموعهٔ سلطنتی ترنج و لچک',
    subtitle: 'تقارن شمسه مرکزی و حاشیه‌های زردوزی',
    description:
      'الهام‌گرفته از قالی‌ها و کاشی‌کاری‌های مساجد کهن یزد؛ دارای شمسه مرکزی و لچک‌های گوشه‌ای با هارمونی رنگ‌های درباری.',
    image: '/images/shahneshin.jpg',
    accentColor: 'border-turquoise',
    productsCount: '۱۲ محصول مرتبط',
    thumbnails: ['/images/shahneshin.jpg', '/images/table-runner.jpg', '/images/sajjadeh.jpg'],
    archVariant: 'ogee',
  },
];

interface CollectionSpotlightProps {
  onExploreCollection: (collectionId: string) => void;
}

export function CollectionSpotlight({ onExploreCollection }: CollectionSpotlightProps) {
  return (
    <section id="collections" className="py-16 bg-sand-dark/40 border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-soft border border-brand/20 text-brand text-xs font-bold shadow-xs">
            <ShamsehEightStar className="w-4 h-4 text-brand" />
            <span>کلکسیون‌های بر اساس طرح و نقوش هندسی</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-ink">
            داستان نقش‌ها در گذر تاریخ
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted">
            هر طرح ترمه نامی کهن و فلسفه‌ای عمیق در هنر نساجی سنتی ایران دارد
          </p>
        </div>

        {/* 3 Showcase Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {collections.map((col) => (
            <div
              key={col.id}
              className="bg-paper rounded-3xl border border-line p-4 overflow-hidden shadow-sm hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Persian Arch-Framed Header Banner */}
              <div className="relative mb-3">
                <PersianArchImageFrame variant={col.archVariant} className="aspect-16/10 w-full">
                  <Image
                    src={col.image}
                    alt={col.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute top-8 right-3 bg-paper/90 backdrop-blur-xs text-brand text-[11px] font-bold px-2.5 py-1 rounded-lg border border-line z-20">
                    {col.productsCount}
                  </div>
                  <div className="absolute bottom-3 right-3 text-white z-20 text-right">
                    <span className="text-[11px] text-amber-200 font-bold block">
                      {col.subtitle}
                    </span>
                    <h3 className="text-base font-black">{col.title}</h3>
                  </div>
                </PersianArchImageFrame>
              </div>

              {/* Description & Product Thumbnail Cluster */}
              <div className="space-y-4 flex-1 flex flex-col justify-between text-right">
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {col.description}
                </p>

                {/* Arch-Framed Thumbnails Cluster */}
                <div className="space-y-2 pt-2">
                  <div className="text-[11px] font-bold text-ink-muted flex items-center justify-between">
                    <span>نمونه آثار در طاق‌های سنتی:</span>
                    <span className="text-gold flex items-center gap-1">
                      <ShamsehEightStar className="w-3 h-3 text-gold" />
                      <span>تراکم ابریشم بالا</span>
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {col.thumbnails.map((thumb, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square rounded-t-2xl rounded-b-lg overflow-hidden border border-gold/40 shadow-xs"
                      >
                        <Image src={thumb} alt="نمونه" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-4 border-t border-line">
                  <button
                    onClick={() => onExploreCollection(col.id)}
                    className="w-full py-2.5 rounded-xl bg-sand hover:bg-brand hover:text-white border border-line text-brand text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>مشاهده محصولات طرح {col.title.split('طرح ')[1] || col.title}</span>
                    <span>←</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
