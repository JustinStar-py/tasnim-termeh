'use client';

import React from 'react';
import Image from 'next/image';
import { ProductItem } from './BestsellersBand';
import { PersianArchImageFrame, ShamsehEightStar, ShamsehTwelveStar, BotehMark } from './motifs';

interface ProductQuickViewProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCart: (product: ProductItem) => void;
}

export function ProductQuickView({ product, onClose, onAddToCart }: ProductQuickViewProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-paper rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 border-2 border-gold/40 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 text-ink-muted hover:text-ink p-2 rounded-full hover:bg-sand transition-colors cursor-pointer z-40"
          aria-label="بستن"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Persian Arch-Framed Image */}
          <div className="relative">
            <PersianArchImageFrame variant="pointed" badge={product.badge} className="aspect-square w-full">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
              />
            </PersianArchImageFrame>
          </div>

          {/* Details */}
          <div className="space-y-4 text-right">
            <div>
              <span className="text-xs font-bold text-gold bg-gold-soft px-3 py-1 rounded-md inline-flex items-center gap-1.5 mb-1.5 border border-gold/30">
                <ShamsehEightStar className="w-3.5 h-3.5 text-gold" />
                <span>تولید اصل یزد • دارای شناسنامه رسمی</span>
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-ink leading-snug">
                {product.title}
              </h3>
            </div>

            {/* Spec Box */}
            <div className="space-y-2 text-xs bg-sand p-3.5 rounded-2xl border border-line">
              <div className="flex justify-between">
                <span className="text-ink-muted">تراکم بافت:</span>
                <span className="font-bold text-ink">{product.density}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted">رنگ‌بندی:</span>
                <span className="font-bold text-ink">{product.colors}</span>
              </div>
              {product.dimensions && (
                <div className="flex justify-between">
                  <span className="text-ink-muted">ابعاد:</span>
                  <span className="font-bold text-ink">{product.dimensions}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-ink-muted">جنس الیاف:</span>
                <span className="font-bold text-brand">ابریشم طبیعی + نخ لمه طلایی</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted">ضمانت:</span>
                <span className="font-bold text-turquoise">۱۰ سال ثبات رنگ و بافت</span>
              </div>
            </div>

            {/* Price & Add */}
            <div className="pt-2 flex items-center justify-between">
              <div>
                {product.originalPrice && (
                  <span className="block text-xs text-gray-400 line-through">
                    {product.originalPrice} تومان
                  </span>
                )}
                <span className="text-xl font-black text-brand">
                  {product.price} <span className="text-xs font-normal text-ink-muted">تومان</span>
                </span>
              </div>

              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="px-6 py-3 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs sm:text-sm font-bold shadow-md shadow-brand/20 transition-all cursor-pointer"
              >
                افزودن به سبد خرید
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
