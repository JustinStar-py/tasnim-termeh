'use client';

import React, { useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { PersianArchImageFrame, ShamsehEightStar, ShamsehTwelveStar, BotehMark } from './motifs';

export interface ProductItem {
  id: number;
  title: string;
  category: string;
  density: string;
  colors: string;
  price: string;
  originalPrice?: string;
  image: string;
  badge?: string;
  dimensions?: string;
  rating?: number;
}

interface BestsellersBandProps {
  products: ProductItem[];
  onAddToCart: (product: ProductItem) => void;
  onQuickView: (product: ProductItem) => void;
}

export function BestsellersBand({ products, onAddToCart, onQuickView }: BestsellersBandProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: 'rtl',
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-16 bg-burgundy-girih text-white relative overflow-hidden">
      {/* Decorative Persian Corner Flourishes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-gold/25 via-gold/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-radial from-gold/25 via-gold/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Title & Slider Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 border-b border-white/15 pb-6">
          <div className="space-y-1.5 text-right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-gold/50 text-gold text-xs font-bold shadow-xs">
              <ShamsehEightStar className="w-4 h-4 text-gold" />
              <span>پرفروش‌ترین‌های برگزیده ماه</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              آثار پرطرفدار در قاب محراب ایرانی
            </h2>
            <p className="text-xs sm:text-sm text-gold-soft/85">
              ترمه‌های اصیل با بیشترین استقبال برای جهیزیه عروس، دکوراسیون پذیرایی و هدایای فاخر
            </p>
          </div>

          {/* Carousel Navigation Arrows */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={scrollPrev}
              className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-gold hover:text-brand border border-white/20 flex items-center justify-center text-sm text-white transition-all cursor-pointer shadow-md"
              aria-label="محصولات قبلی"
            >
              ➔
            </button>
            <button
              onClick={scrollNext}
              className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-gold hover:text-brand border border-white/20 flex items-center justify-center text-sm text-white transition-all cursor-pointer shadow-md"
              aria-label="محصولات بعدی"
            >
              ←
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {products.map((product, idx) => (
              <div
                key={product.id}
                className="min-w-0 flex-[0_0_84%] sm:flex-[0_0_46%] lg:flex-[0_0_30%] xl:flex-[0_0_24%]"
              >
                <div className="bg-paper text-ink rounded-3xl border border-gold/30 p-4 overflow-hidden shadow-xl flex flex-col justify-between group h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
                  {/* Persian Arch-Framed Product Image */}
                  <div className="relative mb-3">
                    <PersianArchImageFrame
                      variant={idx % 2 === 0 ? 'pointed' : 'scalloped'}
                      badge={product.badge}
                      className="aspect-4/3 w-full"
                    >
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Quick View Button on Hover */}
                      <button
                        onClick={() => onQuickView(product)}
                        className="absolute inset-x-3 bottom-3 py-2 rounded-xl bg-paper/95 backdrop-blur-xs text-brand text-xs font-bold opacity-0 group-hover:opacity-100 transition-all shadow-md hover:bg-gold hover:text-white z-30 cursor-pointer"
                      >
                        مشاهده سریع مشخصات
                      </button>
                    </PersianArchImageFrame>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-3 flex-1 flex flex-col justify-between text-right">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-ink-muted mb-1">
                        <span className="text-gold font-bold flex items-center gap-1">
                          <ShamsehEightStar className="w-3 h-3 text-gold" />
                          <span>{product.density}</span>
                        </span>
                        <span>{product.colors}</span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-ink group-hover:text-brand transition-colors line-clamp-2 leading-snug">
                        {product.title}
                      </h3>
                    </div>

                    <div className="pt-3 border-t border-line flex items-center justify-between gap-2">
                      <div>
                        {product.originalPrice && (
                          <span className="block text-[11px] text-gray-400 line-through">
                            {product.originalPrice}
                          </span>
                        )}
                        <div className="font-black text-sm text-brand">
                          {product.price} <span className="text-[11px] font-normal text-ink-muted">تومان</span>
                        </div>
                      </div>

                      {/* Quick Add Button */}
                      <button
                        onClick={() => onAddToCart(product)}
                        className="p-2.5 rounded-xl bg-gold-soft hover:bg-gold text-brand hover:text-white border border-gold/40 transition-colors shadow-xs cursor-pointer"
                        aria-label="افزودن به سبد خرید"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>
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
