'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  BotehMark,
  ShamsehEightStar,
  PersianArchImageFrame,
} from './motifs';

interface EditorialStory {
  id: string;
  badge: string;
  poetry: string;
  poetryPoet: string;
  title: string;
  highlight: string;
  subtitle: string;
  leadParagraph: string;
  mainImage: string;
  insetThumb: string;
  insetTitle: string;
  densityNum: string;
  era: string;
  material: string;
  dyeingMethod: string;
}

const stories: EditorialStory[] = [
  {
    id: 'safavid-royal',
    badge: 'کلکسیون شاهانه صفوی • شماره ثبت ۱۱۰۴',
    poetry: '« ز تار ابریشم و پود زر ناب / درخشد ترمه چون آیینه آب »',
    poetryPoet: '— در وصف هنر زری‌بافان کهن یزد',
    title: 'شکوه جاودان',
    highlight: 'ترمه زربفت و ابریشم',
    subtitle: 'میراث پنج قرن هنر دست‌بافان یزد در خانه‌های اصیل',
    leadParagraph:
      'در تلاقی نور کویر و پنجه‌های هنرمندان صاحب‌نام، هر تخته ترمه شاهکاری بی‌همتا از توازن هندسه اسلیمی و درخشش نخ‌های لمه طلایی است؛ دست‌بافته‌ای که از دیرباز زینت‌بخش تالارهای درباری و جهاز ماندگار خاندان‌های اصیل بوده است.',
    mainImage: '/images/hero.jpg',
    insetThumb: '/images/table-runner.jpg',
    insetTitle: 'ست رومیزی ۵ تکه شاه‌عباسی',
    densityNum: '۳۰۰ گره / cm²',
    era: 'طرح اصیل قرن دهم هجری',
    material: '۱۰۰٪ ابریشم طبیعی پیله',
    dyeingMethod: 'عصاره گیاهی روناس و اسپرک',
  },
  {
    id: 'yazd-shahneshin',
    badge: 'چیدمان سنتی و اشرافی • دست‌دوز',
    poetry: '« چو بر مسند نشینی با وقار و فرّ شاهی / شود بزم تو روشن از نگار و دلربایی »',
    poetryPoet: '— رساله هنر و چیدمان عهد ناصری',
    title: 'آرامش و وقار',
    highlight: 'سرویس شاه‌نشین سنتی',
    subtitle: 'همنشینی هنر ترمه و معماری تاریخی در فضای زندگی شما',
    leadParagraph:
      'سرویس‌های هفت و نه تکه شاه‌نشین تسنیم با تلفیق فوم سرد ارگونومیک، مغزی‌دوزی‌های لمه طلایی و بالشتک‌های لوله‌ای لمبه، حسی از آرامش کوشک‌های تاریخی یزد را به فضای منزل و ویلای شما هدیه می‌دهد.',
    mainImage: '/images/shahneshin.jpg',
    insetThumb: '/images/corporate-gift.jpg',
    insetTitle: 'پک نفیس خاتم و ترمه',
    densityNum: '۳۲۰ گره سنگین',
    era: 'چیدمان سنتی قاجار و صفوی',
    material: 'پارچه ابریشم سنگین ضدفرسایش',
    dyeingMethod: 'رنگرزی سنتی پایدار در برابر نور',
  },
];

interface HeroEditorialProps {
  onOpenConsultation: () => void;
}

export function HeroEditorial({ onOpenConsultation }: HeroEditorialProps) {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const story = stories[activeStoryIdx];

  return (
    <section id="hero" className="relative overflow-hidden pt-6 pb-16 lg:pt-10 lg:pb-24 bg-sand">
      {/* Editorial Watermark Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-soft/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-soft/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Heritage Inscription Ribbon */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-line pb-4 mb-8 text-xs">
          {/* Poetry Calligraphy Ribbon */}
          <div className="flex items-center gap-2 text-brand">
            <ShamsehEightStar className="w-4 h-4 text-gold shrink-0" />
            <span className="font-bold text-xs sm:text-sm tracking-wide">{story.poetry}</span>
            <span className="text-ink-muted hidden md:inline text-[11px]">{story.poetryPoet}</span>
          </div>

          {/* Collection Switcher Tabs */}
          <div className="flex items-center gap-1.5 bg-paper p-1 rounded-xl border border-line shadow-2xs">
            {stories.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveStoryIdx(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeStoryIdx === idx
                    ? 'bg-brand text-white shadow-xs'
                    : 'text-ink-muted hover:text-brand'
                }`}
              >
                {s.insetTitle.split(' ')[0]} {s.insetTitle.split(' ')[1] || ''}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left / Visual Arts Canvas with Overlapping Orsi Inset (7 cols on lg) */}
          <div className="lg:col-span-7 relative order-2 lg:order-1">
            <div className="relative">
              {/* Grand Main Architectural Frame */}
              <PersianArchImageFrame
                variant={activeStoryIdx === 0 ? 'pointed' : 'scalloped'}
                className="aspect-16/11 sm:aspect-16/10 w-full shadow-2xl"
                badge={story.badge.split(' • ')[0]}
              >
                <Image
                  src={story.mainImage}
                  alt={story.title}
                  fill
                  priority
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Inscribed Bottom Story Plaque */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-paper/95 backdrop-blur-md border border-gold/40 shadow-lg text-right z-20 hidden sm:block">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-black text-brand text-sm">{story.highlight}</span>
                    <span className="text-gold font-bold">{story.densityNum}</span>
                  </div>
                  <p className="text-[11px] text-ink-muted mt-1">{story.material}</p>
                </div>
              </PersianArchImageFrame>

              {/* Floating Overlapping Orsi Inset Frame */}
              <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-6 w-36 sm:w-48 aspect-square rounded-3xl overflow-hidden border-3 border-paper shadow-2xl bg-sand z-30 group hover:scale-105 transition-transform">
                <Image
                  src={story.insetThumb}
                  alt={story.insetTitle}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2 inset-x-2 text-center text-white z-10">
                  <span className="text-[9px] text-amber-200 font-bold block">نمونه بافت</span>
                  <span className="text-[11px] font-black leading-tight block truncate">
                    {story.insetTitle}
                  </span>
                </div>
              </div>

              {/* Golden Seal of Excellence */}
              <div className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand text-gold flex flex-col items-center justify-center border-2 border-gold shadow-xl z-30">
                <BotehMark className="w-5 h-5 text-gold animate-pulse" />
                <span className="text-[8px] font-black text-amber-100 tracking-tighter">اصالت یزد</span>
              </div>
            </div>
          </div>

          {/* Right / Editorial Story & Typography (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6 text-right order-1 lg:order-2">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gold bg-gold-soft px-3 py-1 rounded-md border border-gold/30">
                <ShamsehEightStar className="w-3.5 h-3.5 text-gold" />
                <span>{story.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-ink leading-tight sm:leading-snug">
                {story.title}؛ <br />
                <span className="text-brand">{story.highlight}</span>
              </h1>

              <h2 className="text-sm sm:text-base font-bold text-ink-muted leading-relaxed">
                {story.subtitle}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed text-justify">
              {story.leadParagraph}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#products"
                className="px-7 py-3.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs sm:text-sm font-bold shadow-lg shadow-brand/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                مشاهده و خرید این اثر
              </a>
              <button
                onClick={onOpenConsultation}
                className="px-5 py-3.5 rounded-xl bg-paper border border-gold hover:bg-gold-soft text-brand text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
              >
                درخواست کاتالوگ و سمپل
              </button>
            </div>
          </div>
        </div>

        {/* Curator's Technical Craft Ledger (نوار مشخصات فنی و موزه) */}
        <div className="mt-14 pt-8 border-t border-line">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-right">
            <div className="space-y-1 p-3 rounded-2xl bg-paper border border-line">
              <div className="text-[10px] font-bold text-gold flex items-center gap-1">
                <span>۰۱</span>
                <span>•</span>
                <span>قدمت و ریشه طرح</span>
              </div>
              <h4 className="text-xs sm:text-sm font-black text-ink">{story.era}</h4>
              <p className="text-[10px] text-ink-muted">الهام از طومارهای کهن نساجی</p>
            </div>

            <div className="space-y-1 p-3 rounded-2xl bg-paper border border-line">
              <div className="text-[10px] font-bold text-brand flex items-center gap-1">
                <span>۰۲</span>
                <span>•</span>
                <span>تراکم چله و گره</span>
              </div>
              <h4 className="text-xs sm:text-sm font-black text-ink">{story.densityNum}</h4>
              <p className="text-[10px] text-ink-muted">بالاترین گرید بافت ماشینی و دستی</p>
            </div>

            <div className="space-y-1 p-3 rounded-2xl bg-paper border border-line">
              <div className="text-[10px] font-bold text-turquoise flex items-center gap-1">
                <span>۰۳</span>
                <span>•</span>
                <span>خلوص و جنس الیاف</span>
              </div>
              <h4 className="text-xs sm:text-sm font-black text-ink">{story.material}</h4>
              <p className="text-[10px] text-ink-muted">تار و پود لطیف و متراکم</p>
            </div>

            <div className="space-y-1 p-3 rounded-2xl bg-paper border border-line">
              <div className="text-[10px] font-bold text-ink flex items-center gap-1">
                <span>۰۴</span>
                <span>•</span>
                <span>شیوه رنگرزی الیاف</span>
              </div>
              <h4 className="text-xs sm:text-sm font-black text-ink">{story.dyeingMethod}</h4>
              <p className="text-[10px] text-ink-muted">ثبات رنگ تضمین‌شده مادام‌العمر</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
