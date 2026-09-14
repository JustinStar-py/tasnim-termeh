'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  BotehMark,
  AuthenticBotehJegheh,
  ShamsehEightStar,
  GirihDivider,
  KhatamBorder,
} from './motifs';
import TermehMosaic from './TermehMosaic';
import { ProductItem } from './BestsellersBand';
import { CategoryArches } from './CategoryArches';
import { TermehStrokeMaskHero } from './TermehStrokeMaskHero';
// import { InteractiveSilkHero } from './InteractiveSilkHero'; // Preserved for reference

interface StorefrontHomeProps {
  products: ProductItem[];
  selectedCategory: string;
  searchQuery: string;
  onSelectCategory: (category: string) => void;
  onSearchChange: (query: string) => void;
  onAddToCart: (product: ProductItem) => void;
  onQuickView: (product: ProductItem) => void;
  onOpenConsultation: () => void;
}

const categories = [
  { id: 'all', label: 'همه ترمه‌ها', shortLabel: 'همه' },
  { id: 'table-runners', label: 'رومیزی و رانر', shortLabel: 'میز و رانر' },
  { id: 'shahneshin', label: 'سرویس شاه‌نشین', shortLabel: 'شاه‌نشین' },
  { id: 'sajjadeh', label: 'سجاده و جانماز', shortLabel: 'سجاده' },
  { id: 'corporate', label: 'هدایای نفیس', shortLabel: 'هدیه' },
  { id: 'boghtche', label: 'بقچه و ترمه تک', shortLabel: 'ترمه تک' },
];

const categoryNames: Record<string, string> = Object.fromEntries(
  categories.map((category) => [category.id, category.label]),
);

const toPersianDigits = (value: string | number) =>
  String(value).replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]);

const normalizeSearch = (value: string) =>
  value
    .trim()
    .toLocaleLowerCase()
    .replace(/[يى]/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/\s+/g, ' ');

function ProductCard({
  product,
  index,
  onAddToCart,
  onQuickView,
}: {
  product: ProductItem;
  index: number;
  onAddToCart: (product: ProductItem) => void;
  onQuickView: (product: ProductItem) => void;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-line bg-paper shadow-[0_10px_35px_-25px_rgba(26,21,19,0.5)] transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_20px_45px_-24px_rgba(122,28,48,0.42)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand-dark">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-50" />

        {product.badge && (
          <span className="absolute right-3 top-3 rounded-full border border-white/50 bg-brand px-2.5 py-1 text-[10px] font-bold text-white shadow-lg">
            {product.badge}
          </span>
        )}

        <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/60 bg-paper/90 text-[10px] font-black text-brand backdrop-blur-sm">
          {toPersianDigits(String(index + 1).padStart(2, '0'))}
        </span>

        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="absolute inset-x-3 bottom-3 translate-y-2 rounded-xl bg-paper/95 px-3 py-2.5 text-xs font-bold text-brand opacity-100 shadow-lg transition-all hover:bg-gold hover:text-white lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
        >
          مشاهده جزئیات و بافت
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4 text-right sm:p-5">
        <div className="mb-2 flex items-center justify-between gap-3 text-[10px] font-medium text-ink-muted">
          <span className="text-gold">{categoryNames[product.category] ?? 'ترمه اصیل'}</span>
          <span className="truncate">{product.colors}</span>
        </div>

        <h3 className="min-h-[3.2rem] text-sm font-bold leading-7 text-ink transition-colors group-hover:text-brand sm:text-[15px]">
          {product.title}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-[10px] font-medium text-turquoise">
          <ShamsehEightStar className="h-3.5 w-3.5 shrink-0 text-gold" />
          <span>{product.density}</span>
        </div>

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-line pt-3">
          <div>
            {product.originalPrice && (
              <span className="mb-0.5 block text-[10px] text-ink-muted/70 line-through">
                {toPersianDigits(product.originalPrice)} تومان
              </span>
            )}
            <div className="whitespace-nowrap text-base font-black tabular-nums text-brand sm:text-lg">
              {toPersianDigits(product.price)}{' '}
              <span className="text-[10px] font-bold text-ink-muted sm:text-xs">تومان</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-brand px-3 py-2.5 text-[11px] font-bold text-white shadow-md shadow-brand/15 transition-colors hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            aria-label={`افزودن ${product.title} به سبد خرید`}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            افزودن
          </button>
        </div>
      </div>
    </article>
  );
}

function ProductLookbookCard({
  product,
  index,
  onAddToCart,
  onQuickView,
}: {
  product: ProductItem;
  index: number;
  onAddToCart: (product: ProductItem) => void;
  onQuickView: (product: ProductItem) => void;
}) {
  return (
    <article className="group snap-start scroll-mt-28 flex flex-col overflow-hidden rounded-3xl border border-line bg-paper shadow-md transition-all duration-300 hover:border-gold/60">
      {/* Immersive Portrait Visual Stage */}
      <div className="relative aspect-[4/5] overflow-hidden bg-sand-dark">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 639px) 100vw, 400px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/15 to-transparent opacity-70" />

        {product.badge && (
          <span className="absolute right-3.5 top-3.5 rounded-full border border-white/40 bg-brand px-3 py-1 text-xs font-bold text-white shadow-md">
            {product.badge}
          </span>
        )}

        <span className="absolute left-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/60 bg-paper/95 text-xs font-black text-brand backdrop-blur-sm shadow-sm">
          {toPersianDigits(String(index + 1).padStart(2, '0'))}
        </span>

        {/* Floating Quick View Inspection Button */}
        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="absolute left-3.5 bottom-3.5 inline-flex items-center gap-1.5 rounded-xl bg-paper/95 px-3.5 py-2 text-xs font-bold text-brand shadow-md backdrop-blur-sm active:bg-gold active:text-white transition-colors"
        >
          <ShamsehEightStar className="w-3.5 h-3.5 text-gold" />
          <span>بررسی بافت و مشخصات</span>
        </button>
      </div>

      {/* Narrative & High-Utility Actions */}
      <div className="p-4 xs:p-5 text-right space-y-3">
        <div className="flex items-center justify-between text-xs text-ink-muted">
          <span className="font-bold text-gold">{categoryNames[product.category] ?? 'ترمه اصیل'}</span>
          <span className="text-[11px] font-medium">{product.colors}</span>
        </div>

        <h3 className="text-base font-black text-ink leading-snug">
          {product.title}
        </h3>

        {/* Artisanal Weave & Dimensions Tag */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-ink-muted">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sand border border-line text-turquoise font-medium">
            <ShamsehEightStar className="w-3 h-3 text-gold" />
            {product.density}
          </span>
          {product.dimensions && (
            <span className="px-2.5 py-1 rounded-lg bg-sand border border-line text-ink-muted">
              {product.dimensions}
            </span>
          )}
        </div>

        {/* Price & Primary CTA */}
        <div className="pt-3 border-t border-line flex items-center justify-between gap-3">
          <div>
            {product.originalPrice && (
              <span className="block text-[11px] text-ink-muted/70 line-through">
                {toPersianDigits(product.originalPrice)} تومان
              </span>
            )}
            <div className="text-lg font-black text-brand">
              {toPersianDigits(product.price)}{' '}
              <span className="text-xs font-bold text-ink-muted">تومان</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="flex-1 max-w-[170px] inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-xs font-bold text-white shadow-md shadow-brand/15 active:bg-brand-hover transition-colors"
            aria-label={`افزودن ${product.title} به سبد خرید`}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>افزودن به سبد</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export function StorefrontHome({
  products,
  selectedCategory,
  searchQuery,
  onSelectCategory,
  onSearchChange,
  onAddToCart,
  onQuickView,
  onOpenConsultation,
}: StorefrontHomeProps) {
  const [mobileViewMode, setMobileViewMode] = useState<'vertical-feed' | 'grid'>('vertical-feed');
  const normalizedSearch = normalizeSearch(searchQuery);
  const visibleProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const searchableText = normalizeSearch(
      [product.title, product.colors, product.density, product.badge, categoryNames[product.category]]
        .filter(Boolean)
        .join(' '),
    );

    return matchesCategory && (!normalizedSearch || searchableText.includes(normalizedSearch));
  });
  const shahneshinProduct = products.find((product) => product.category === 'shahneshin') ?? products[1];

  return (
    <main className="overflow-hidden">
      {/* 1. Full-Width Khatam Stars & Termeh Heritage Hero Section */}
      <section id="hero" className="relative isolate overflow-hidden bg-[#1D0C13] text-[#fffaf1] border-b border-gold/30">
        {/* Full-Bleed Khatam Star & Termeh Mosaic Background across 100% of the canvas */}
        <div className="pointer-events-none absolute inset-0 select-none overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 h-full w-full opacity-35 mix-blend-screen scale-[1.02]">
            <TermehMosaic />
          </div>
          {/* Multi-layered luxury vignette & radial depth for contrast & elegance */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_50%_40%,rgba(37,15,23,0.72)_0%,rgba(24,9,15,0.94)_70%,#16060c_100%)]" />
          <div className="absolute -left-28 top-1/4 h-80 w-80 rounded-full bg-gold/15 blur-[120px]" />
          <div className="absolute -right-28 bottom-10 h-96 w-96 rounded-full bg-brand/50 blur-[140px]" />
          {/* Authentic Persian Boteh Jegheh Watermark (Top Left) */}
          <div className="absolute -top-4 left-6 opacity-30 hidden lg:block -rotate-12 pointer-events-none select-none transition-all duration-700 hover:opacity-45">
            <AuthenticBotehJegheh idPrefix="hero-boteh-tl" className="w-52 h-auto drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)]" />
          </div>
          {/* Authentic Persian Boteh Jegheh Watermark (Bottom Right) */}
          <div className="absolute -bottom-10 right-8 opacity-25 hidden lg:block rotate-[165deg] scale-x-[-1] pointer-events-none select-none transition-all duration-700 hover:opacity-40">
            <AuthenticBotehJegheh idPrefix="hero-boteh-br" className="w-48 h-auto drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)]" />
          </div>
        </div>

        {/* Hero Content: Luxury Persian Brand Stage with 3D Text Stroke Mask Centerpiece */}
        <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 flex flex-col items-center text-center">

          {/* Eyebrow Pill */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-1.5 text-[10px] xs:text-xs font-bold text-gold-soft backdrop-blur-md shadow-2xs">
            <BotehMark className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold" />
            <span>تسنیم تِرمه · میراثِ اصالت و زری‌دوزی یزد</span>
            <span className="inline-block h-1 w-1 rounded-full bg-gold" />
            <span className="text-[10px] sm:text-[11px] text-amber-200/80 font-normal">ثبت جهانی یونسکو</span>
          </div>

          {/* 1. PRIMARY H1 HERO HEADLINE WITH TERMEH STROKE MASK EFFECT (Right at the very top) */}
          <div className="w-full mt-2 sm:mt-4 mb-3 sm:mb-5">
            <TermehStrokeMaskHero
              title="تِرمه تسنیم"
              imageSrc="/images/hero.jpg"
            />
          </div>

          {/* 2. Sub-Headline (H2) */}
          <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-[1.3] lg:leading-[1.25] max-w-3xl">
            شکوهِ اصالت و هنرِ ترمه‌بافی ایران،
            <span className="block text-gold mt-1.5 sm:mt-2">در کالبدِ خانه‌های امروز</span>
          </h2>

          {/* 3. Poetic Narrative */}
          {/* <p className="mt-3 sm:mt-4 text-xs sm:text-sm lg:text-base leading-6 sm:leading-8 text-[#F5E9D7]/85 font-normal max-w-2xl">
            آفرینش نفیس‌ترین دست‌بافته‌های ابریشم طبیعی پیله، سرویس‌های سنتی شاه‌نشین و هدایای فاخر سازمانی؛ بافته‌شده با تار و پود زری و شناسنامه رسمی کارگاه‌های کهن یزد.
          </p> */}

          {/* Discovery Action Buttons - Always in One Row (One Left, One Right) */}
          <div className="mt-4 pt-2 flex flex-row items-center justify-center gap-2.5 sm:gap-4 w-full max-w-lg mx-auto">
            <a
              href="#categories"
              className="flex-1 min-w-0 inline-flex items-center justify-center gap-1.5 sm:gap-2.5 rounded-xl bg-gold px-3 sm:px-6 py-3 sm:py-3.5 text-[11px] xs:text-xs sm:text-sm font-black text-[#2B1715] shadow-xl shadow-gold/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e0b745] cursor-pointer whitespace-nowrap"
            >
              <span className="truncate">کاوش در دسته‌بندی‌ها</span>
              <span aria-hidden="true" className="text-sm sm:text-base">↓</span>
            </a>
            <button
              type="button"
              onClick={onOpenConsultation}
              className="flex-1 min-w-0 inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl border border-gold/40 bg-white/5 px-3 sm:px-6 py-3 sm:py-3.5 text-[11px] xs:text-xs sm:text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-gold/15 hover:border-gold hover:text-gold cursor-pointer whitespace-nowrap"
            >
              <span className="truncate">مشاوره و سفارش اختصاصی</span>
              <span className="text-gold" aria-hidden="true">✦</span>
            </button>
          </div>

          {/* 4-Pillar Artisanal Heritage Ribbon */}
          <div className="mt-10 w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 border-t border-white/15 pt-6 text-center">
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-2.5 sm:bg-transparent sm:border-0 sm:border-l sm:border-white/10 sm:pl-2">
              <strong className="block text-xs sm:text-sm font-black text-white">۱۰۰٪ ابریشم</strong>
              <span className="text-[10px] text-[#F5E9D7]/65">تار و پود طبیعی پیله</span>
            </div>
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-2.5 sm:bg-transparent sm:border-0 sm:border-l sm:border-white/10 sm:px-2">
              <strong className="block text-xs sm:text-sm font-black text-white">دار سنتی</strong>
              <span className="text-[10px] text-[#F5E9D7]/65">بافندگان اصیل یزد</span>
            </div>
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-2.5 sm:bg-transparent sm:border-0 sm:border-l sm:border-white/10 sm:px-2">
              <strong className="block text-xs sm:text-sm font-black text-white">تراکم سنگین</strong>
              <span className="text-[10px] text-[#F5E9D7]/65">۲۸۰ تا ۳۲۰ گره</span>
            </div>
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-2.5 sm:bg-transparent sm:border-0 sm:pr-2">
              <strong className="block text-xs sm:text-sm font-black text-white">شناسنامه کارگاه</strong>
              <span className="text-[10px] text-[#F5E9D7]/65">ضمانت اصالت و کیفیت</span>
            </div>
          </div>

          {/*
            // [ARCHIVED]: Interactive Silk Tapestry Hero commented out per user request:
            // <div className="w-full flex justify-center order-first lg:order-last">
            //   <InteractiveSilkHero imageSrc="/images/hero.jpg" onOpenConsultation={onOpenConsultation} />
            // </div>
          */}
        </div>
      </section>

      {/* 2. Authentic Persian Architectural Category Arches */}
      <CategoryArches onSelectCategory={onSelectCategory} />

      <section id="products" className="scroll-mt-24 bg-sand py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-8 flex flex-col gap-4 border-b border-line pb-5 sm:pb-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="text-right">
              <div className="mb-2 inline-flex items-center gap-2 text-[11px] font-bold text-brand">
                <ShamsehEightStar className="h-4 w-4 text-gold shrink-0" />
                <span>ویترین و کاتالوگ آثار ترمه</span>
                <span className="h-px w-6 bg-gradient-to-l from-transparent to-gold" />
              </div>
              <h2 className="text-xl xs:text-2xl font-black leading-tight text-ink sm:text-3xl lg:text-4xl">
                {normalizedSearch ? `نتیجهٔ جست‌وجوی «${searchQuery.trim()}»` : 'بافتی برای هر گوشهٔ خانه'}
              </h2>
              <p className="mt-1.5 sm:mt-2 max-w-xl text-xs leading-6 sm:leading-7 text-ink-muted sm:text-sm">
                {normalizedSearch
                  ? 'محصولات نزدیک به جست‌وجوی شما را بر اساس طرح، رنگ و نوع بافت پیدا کردیم.'
                  : 'از رانرهای روزمره تا سرویس‌های شاه‌نشین؛ هر محصول با تصویر واقعی، مشخصات بافت و قیمت نهایی ارائه می‌شود.'}
              </p>
            </div>
            
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-medium text-ink-muted">
              <div className="flex items-center gap-2">
                <ShamsehEightStar className="h-4 w-4 sm:h-5 sm:w-5 text-gold" />
                <span aria-live="polite">{toPersianDigits(visibleProducts.length)} محصول آماده انتخاب</span>
              </div>

              {normalizedSearch && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="rounded-full border border-line bg-paper px-2.5 py-1 text-[10px] font-bold text-brand transition-colors hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  پاک کردن جست‌وجو
                </button>
              )}
            </div>
          </div>

          {/* Sticky Category Filters & Mobile Layout Switcher */}
          <div className="sticky top-16 z-30 -mx-4 mb-6 sm:mb-8 border-y border-line bg-sand/95 px-4 py-2.5 sm:py-3 backdrop-blur-md sm:static sm:mx-0 sm:border-y-0 sm:bg-transparent sm:p-0">
            {/* Mobile Layout Switcher Bar */}
            <div className="flex sm:hidden items-center justify-between pb-2.5 mb-2 border-b border-line/50 text-xs">
              <span className="text-[11px] font-bold text-ink-muted flex items-center gap-1.5">
                <BotehMark className="w-3.5 h-3.5 text-brand" />
                <span>حالت نمایش در موبایل:</span>
              </span>
              <div className="inline-flex rounded-xl bg-paper p-0.5 border border-line shadow-2xs">
                <button
                  type="button"
                  onClick={() => setMobileViewMode('vertical-feed')}
                  aria-pressed={mobileViewMode === 'vertical-feed'}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                    mobileViewMode === 'vertical-feed'
                      ? 'bg-brand text-white shadow-xs'
                      : 'text-ink-muted hover:text-brand'
                  }`}
                >
                  <span>کاروسل عمودی</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMobileViewMode('grid')}
                  aria-pressed={mobileViewMode === 'grid'}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                    mobileViewMode === 'grid'
                      ? 'bg-brand text-white shadow-xs'
                      : 'text-ink-muted hover:text-brand'
                  }`}
                >
                  <span>شبکه‌ای ۲ستونه</span>
                </button>
              </div>
            </div>

            {/* Horizontal Scrollable Categories with Smooth Touch */}
            <nav className="flex gap-2 overflow-x-auto pb-1 no-scrollbar overscroll-contain" aria-label="فیلتر دسته‌بندی محصولات">
              {categories.map((category) => {
                const count = products.filter(
                  (product) => category.id === 'all' || product.category === category.id,
                ).length;
                const isActive = selectedCategory === category.id;

                return (
                  <button
                    type="button"
                    key={category.id}
                    onClick={() => onSelectCategory(category.id)}
                    aria-pressed={isActive}
                    className={`flex shrink-0 items-center gap-1.5 sm:gap-2 rounded-full border px-3 py-1.5 sm:px-4 sm:py-2.5 text-[10px] sm:text-[11px] font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${
                      isActive
                        ? 'border-brand bg-brand text-white shadow-md shadow-brand/15'
                        : 'border-line bg-paper text-ink-muted hover:border-gold hover:text-brand'
                    }`}
                  >
                    <span className="sm:hidden">{category.shortLabel}</span>
                    <span className="hidden sm:inline">{category.label}</span>
                    <span className={`rounded-full px-1.5 py-0.5 text-[9px] ${isActive ? 'bg-white/15 text-gold-soft' : 'bg-sand-dark text-ink-muted'}`}>
                      {toPersianDigits(count)}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* 1. Mobile Vertical Lookbook Carousel / Feed Mode */}
          {mobileViewMode === 'vertical-feed' && (
            <div className="flex flex-col gap-6 sm:hidden">
              {visibleProducts.map((product, index) => (
                <ProductLookbookCard
                  key={product.id}
                  product={product}
                  index={index}
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          )}

          {/* 2. Grid Mode (Active on desktop, or on mobile when grid is selected) */}
          <div className={`${mobileViewMode === 'grid' ? 'grid grid-cols-2' : 'hidden sm:grid sm:grid-cols-2'} gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4`}>
            {visibleProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
              />
            ))}
          </div>

          {visibleProducts.length === 0 && (
            <div className="rounded-3xl border border-dashed border-gold/40 bg-gold-soft/50 p-12 text-center text-sm font-bold text-brand space-y-2">
              <BotehMark className="h-9 w-9 text-gold mx-auto opacity-80" />
              <div>محصولی در این دسته‌بندی پیدا نشد.</div>
            </div>
          )}
        </div>
      </section>

      <section id="atelier" className="relative overflow-hidden border-y border-line bg-sand-dark py-14 sm:py-20">
        <div className="pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full bg-turquoise/10 blur-3xl" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Subtle Persian Girih Divider before Shahneshin */}
          <div className="max-w-xs sm:max-w-md mx-auto mb-10 sm:mb-14 opacity-60">
            <GirihDivider />
          </div>

          <div id="shahneshin" className="relative grid overflow-hidden rounded-[1.75rem] border border-gold/35 bg-[#211517] shadow-2xl lg:grid-cols-[0.95fr_1.05fr]">
            {/* Delicate Khatam Inlay Top Border */}
            <div className="absolute top-0 inset-x-0 z-20">
              <KhatamBorder className="h-1.5 opacity-40" />
            </div>

            <div className="relative min-h-[280px] lg:min-h-[430px]">
              <Image
                src={shahneshinProduct?.image ?? '/images/shahneshin.jpg'}
                alt="سرویس شاه‌نشین ترمه یزد در فضای خانه ایرانی"
                fill
                sizes="(max-width: 1023px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#211517]/75 via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-gold/50 bg-[#211517]/80 px-3 py-1.5 text-[10px] font-bold text-gold-soft backdrop-blur-sm">
                <ShamsehEightStar className="h-4 w-4 text-gold" />
                <span>برای خانه‌های ماندگار</span>
              </div>
            </div>

            <div className="relative p-5 xs:p-7 text-right text-white sm:p-10 lg:p-14">
              <div className="pointer-events-none absolute -left-4 -top-4 opacity-25 -rotate-12 select-none" aria-hidden="true">
                <AuthenticBotehJegheh idPrefix="shahneshin-boteh" className="w-36 h-auto drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)]" />
              </div>
              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-[10px] font-bold text-gold-soft">
                  <BotehMark className="h-4 w-4 text-gold" />
                  <span>امضای دکوراسیون ایرانی</span>
                </div>
                <h2 className="max-w-xl text-xl xs:text-2xl font-black leading-[1.6] sm:text-3xl lg:text-4xl">
                  شاه‌نشین؛<span className="text-gold"> نقطهٔ کانونی خانه</span>
                </h2>
                <p className="mt-3 sm:mt-4 max-w-xl text-xs leading-6 sm:leading-8 text-[#f4e6d5]/75 sm:text-sm">
                  سرویس‌های ۷ و ۹ تکه با ترمهٔ سنگین، فوم سرد طبی و امکان انتخاب رنگ و ابعاد. برای فضایی که قرار است خاطره بسازد، سفارش را با مشاورهٔ مستقیم کارگاه تنظیم کنید.
                </p>

                <div className="mt-5 sm:mt-6 grid max-w-xl grid-cols-3 gap-1.5 xs:gap-2 border-y border-white/15 py-3 sm:py-4 text-center text-[9px] xs:text-[10px] text-[#f4e6d5]/70 sm:gap-4">
                  <div><strong className="mb-1 block text-xs xs:text-sm text-white">۷ و ۹</strong>تکهٔ کامل</div>
                  <div><strong className="mb-1 block text-xs xs:text-sm text-white">۳۲۰</strong>گرهٔ متراکم</div>
                  <div><strong className="mb-1 block text-xs xs:text-sm text-white">اختصاصی</strong>ابعاد و رنگ</div>
                </div>

                <div className="mt-6 flex flex-col xs:flex-row items-center gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={onOpenConsultation}
                    className="w-full xs:w-auto rounded-xl bg-gold px-5 py-3 text-xs font-black text-[#2b1715] transition-colors hover:bg-[#d9b34f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#211517]"
                  >
                    مشاوره و سفارش ابعاد دلخواه
                  </button>
                  <span className="text-xs text-gold-soft/75">
                    شروع از {toPersianDigits(shahneshinProduct?.price ?? '۱۲,۸۰۰,۰۰۰')} تومان
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 sm:mt-12 grid gap-3 sm:gap-4 border-t border-line/80 pt-6 sm:pt-8 grid-cols-1 xs:grid-cols-2 lg:grid-cols-4">
            {[
              ['اصالت بافت', 'انتخاب مستقیم از کارگاه‌های یزد'],
              ['قیمت روشن', 'بدون واسطه و هزینهٔ پنهان'],
              ['بسته‌بندی فاخر', 'آماده برای هدیه‌دادن'],
              ['ارسال ایمن', 'بسته‌بندی ویژه به سراسر کشور'],
            ].map(([title, description], index) => (
              <div key={title} className="flex items-start gap-3 rounded-xl bg-paper/60 p-3 sm:bg-transparent sm:p-0 sm:border-l sm:border-line/60 sm:px-4 sm:last:border-l-0 text-right border border-line/40 sm:border-0">
                <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gold-soft border border-gold/30 text-brand shadow-2xs">
                  <span className="font-serif text-xs font-black">{toPersianDigits(index + 1)}</span>
                </div>
                <div>
                  <strong className="block text-xs font-bold text-ink">{title}</strong>
                  <span className="mt-1 block text-[10px] leading-5 text-ink-muted">{description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
