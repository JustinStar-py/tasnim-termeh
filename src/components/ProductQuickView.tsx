'use client';

import React from 'react';
import Image from 'next/image';
import { ProductItem } from './BestsellersBand';
import { ShamsehEightStar } from './motifs';

interface ProductQuickViewProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCart: (product: ProductItem) => void;
}

export function ProductQuickView({ product, onClose, onAddToCart }: ProductQuickViewProps) {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl space-y-6 overflow-y-auto rounded-3xl border border-gold/40 bg-paper p-6 shadow-2xl sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute left-5 top-5 z-40 rounded-full p-2 text-ink-muted transition-colors hover:bg-sand hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          aria-label="بستن"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Keep the full textile visible; the star mark carries the ornament. */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-sand shadow-card">
            <Image src={product.image} alt={product.title} fill sizes="(max-width: 767px) 100vw, 45vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
            {product.badge && (
              <span className="absolute right-3 top-3 rounded-full border border-white/60 bg-brand px-2.5 py-1 text-[10px] font-bold text-white shadow-lg">
                {product.badge}
              </span>
            )}
            <ShamsehEightStar className="absolute bottom-3 left-3 h-8 w-8 text-gold drop-shadow-md" />
          </div>

          {/* Details */}
          <div className="space-y-4 text-right">
            <div>
              <span className="text-xs font-bold text-gold bg-gold-soft px-3 py-1 rounded-md inline-flex items-center gap-1.5 mb-1.5 border border-gold/30">
                <ShamsehEightStar className="w-3.5 h-3.5 text-gold" />
                <span>تولید اصل یزد • دارای شناسنامه رسمی</span>
              </span>
                <h3 id="quick-view-title" className="text-lg font-bold leading-snug text-ink sm:text-xl">
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
