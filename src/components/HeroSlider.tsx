'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ShamsehOrnament } from './motifs';

interface SlideData {
  id: number;
  kicker: string;
  title: string;
  highlight: string;
  subtitle: string;
  description: string;
  primaryCta: { text: string; href: string };
  secondaryCta?: { text: string; onClick?: () => void };
  image: string;
  badge: string;
  subBadge: string;
}

interface HeroSliderProps {
  onOpenConsultation: () => void;
}

export function HeroSlider({ onOpenConsultation }: HeroSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: 'rtl',
    loop: true,
    duration: 35,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const slides: SlideData[] = [
    {
      id: 1,
      kicker: 'اصالت بافت و زری‌دوزی دیار یزد',
      title: 'شکوه و جاودانگی',
      highlight: 'هنر ترمه ایرانی',
      subtitle: 'در تار و پود دکوراسیون فاخر',
      description:
        'مجموعه بی‌نظیر رومیزی‌های ابریشم طبیعی، رانرهای زری‌بافت و ست‌های ۵ تکه پذیرایی با تراکم صادراتی و ضمانت ثبات رنگ مادام‌العمر.',
      primaryCta: { text: 'مشاهده گنجینه محصولات', href: '#products' },
      secondaryCta: { text: 'مشاوره خرید جهیزیه', onClick: onOpenConsultation },
      image: '/images/hero.jpg',
      badge: 'تراکم ۳۰۰ گره اعلا',
      subBadge: 'طرح بته‌جقه شاهی',
    },
    {
      id: 2,
      kicker: 'پک‌های لوکس و فاخر سازمانی',
      title: 'هدایای ارزشمند و ماندگار',
      highlight: 'برای مدیران و سازمان‌ها',
      subtitle: 'همراه با جعبه‌های خاتم‌کاری سنتی',
      description:
        'ارائه نفیس‌ترین ست‌های کادویی ترمه ابریشمی همراه با پلاک فلزی لوگوی سازمان، ظروف برنجی و زعفران اعلای ایرانی در بسته‌بندی چوبی گردو.',
      primaryCta: { text: 'مشاهده هدایای سازمانی', href: '#products' },
      secondaryCta: { text: 'دریافت پیش‌فاکتور عمده', onClick: onOpenConsultation },
      image: '/images/corporate-gift.jpg',
      badge: 'بسته‌بندی خاتم‌کاری',
      subBadge: 'پلاک اختصاصی برند شما',
    },
    {
      id: 3,
      kicker: 'آرامش و شکوه خانه‌های تاریخی یزد',
      title: 'سرویس‌های اصیل',
      highlight: 'شاه‌نشین سنتی',
      subtitle: '۷ و ۹ تکه سلطنتی دست‌دوز',
      description:
        'طراحی ارگونومیک با فوم سرد بادوام، مغزی‌دوزی‌های طلایی و بالشتک‌های لوله‌ای لمبه مناسب برای منازل، ویلاها، چایخانه‌ها و اقامتگاه‌های بومگردی.',
      primaryCta: { text: 'مشاهده سرویس‌های شاه‌نشین', href: '#shahneshin' },
      secondaryCta: { text: 'سفارش در ابعاد دلخواه', onClick: onOpenConsultation },
      image: '/images/shahneshin.jpg',
      badge: 'فوم سرد طبی درجه یک',
      subBadge: 'ضدحساسیت و بدون افت فرم',
    },
  ];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);

    // Subtle autoplay timer
    const interval = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 6500);

    return () => {
      clearInterval(interval);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="hero" className="relative overflow-hidden pt-6 pb-12 lg:pt-10 lg:pb-16">
      {/* Background Girih Texture */}
      <div className="absolute inset-0 bg-girih-subtle opacity-70 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Embla Viewport */}
          <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
            <div className="flex">
              {slides.map((slide) => (
                <div key={slide.id} className="min-w-0 flex-[0_0_100%]">
                  <div className="bg-paper rounded-3xl border border-line/80 shadow-card p-6 sm:p-10 lg:p-12 overflow-hidden relative">
                    {/* Background Soft Glow */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-soft rounded-full blur-3xl opacity-60 -z-10" />
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-soft rounded-full blur-3xl opacity-50 -z-10" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                      {/* Text Column */}
                      <div className="lg:col-span-7 space-y-5 text-right">
                        {/* Kicker Chip */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-soft border border-brand/20 text-brand text-xs sm:text-sm font-semibold">
                          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                          <span>{slide.kicker}</span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-ink leading-tight sm:leading-snug">
                          {slide.title} <br />
                          <span className="text-brand">{slide.highlight}</span> <br />
                          <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-ink-muted">
                            {slide.subtitle}
                          </span>
                        </h1>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-xl">
                          {slide.description}
                        </p>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center gap-3.5 pt-2">
                          <a
                            href={slide.primaryCta.href}
                            className="px-6 sm:px-8 py-3.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs sm:text-sm font-bold shadow-lg shadow-brand/20 transition-all transform hover:-translate-y-0.5"
                          >
                            {slide.primaryCta.text}
                          </a>
                          {slide.secondaryCta && (
                            <button
                              onClick={slide.secondaryCta.onClick}
                              className="px-5 sm:px-6 py-3.5 rounded-xl bg-paper border border-gold hover:bg-gold-soft text-brand text-xs sm:text-sm font-bold transition-all"
                            >
                              {slide.secondaryCta.text}
                            </button>
                          )}
                        </div>

                        {/* Trust highlights under CTA */}
                        <div className="grid grid-cols-3 gap-3 pt-6 border-t border-line text-right">
                          <div className="space-y-0.5">
                            <div className="text-lg sm:text-xl font-black text-gold">۱۰۰٪ ابریشم</div>
                            <div className="text-[11px] text-ink-muted">تار و پود طبیعی</div>
                          </div>
                          <div className="space-y-0.5">
                            <div className="text-lg sm:text-xl font-black text-brand">ارسال رایگان</div>
                            <div className="text-[11px] text-ink-muted">سراسر شهرهای ایران</div>
                          </div>
                          <div className="space-y-0.5">
                            <div className="text-lg sm:text-xl font-black text-turquoise">ضمانت اصالت</div>
                            <div className="text-[11px] text-ink-muted">شناسنامه کتبی یزد</div>
                          </div>
                        </div>
                      </div>

                      {/* Image Frame Column */}
                      <div className="lg:col-span-5 relative">
                        <div className="relative mx-auto max-w-md lg:max-w-none">
                          {/* Persian Decorative Frame Backing */}
                          <div className="absolute -inset-2 bg-gradient-to-tr from-gold via-gold/40 to-brand rounded-3xl blur-xs opacity-40 transform rotate-1" />
                          <div className="relative rounded-2xl overflow-hidden border-2 border-gold/50 shadow-2xl bg-paper aspect-4/3 sm:aspect-16/11">
                            <Image
                              src={slide.image}
                              alt={slide.title}
                              width={700}
                              height={500}
                              priority
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                            {/* Glass overlay badge on photo */}
                            <div className="absolute bottom-3 inset-x-3 bg-paper/90 backdrop-blur-md rounded-xl p-3.5 border border-line flex items-center justify-between shadow-lg">
                              <div>
                                <span className="text-[10px] font-bold text-gold uppercase tracking-wider block">
                                  {slide.subBadge}
                                </span>
                                <h4 className="text-xs sm:text-sm font-bold text-brand">{slide.badge}</h4>
                              </div>
                              <ShamsehOrnament className="w-6 h-6 text-gold" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls: RTL Arrows & Dots */}
          <div className="flex items-center justify-between mt-5 px-2">
            {/* Slide Indicator Dots */}
            <div className="flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollTo(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    selectedIndex === idx ? 'w-8 bg-brand' : 'w-2.5 bg-line hover:bg-gold'
                  }`}
                  aria-label={`اسلاید ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={scrollPrev}
                className="w-10 h-10 rounded-full bg-paper border border-line hover:border-gold hover:text-brand flex items-center justify-center text-sm shadow-xs transition-colors cursor-pointer"
                aria-label="اسلاید قبلی"
              >
                ➔
              </button>
              <button
                onClick={scrollNext}
                className="w-10 h-10 rounded-full bg-paper border border-line hover:border-gold hover:text-brand flex items-center justify-center text-sm shadow-xs transition-colors cursor-pointer"
                aria-label="اسلاید بعدی"
              >
                ←
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
