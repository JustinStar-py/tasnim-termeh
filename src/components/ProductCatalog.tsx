'use client';

import React from 'react';
import Image from 'next/image';
import { ProductItem } from './BestsellersBand';
import { PersianArchImageFrame, ShamsehEightStar } from './motifs';

interface ProductCatalogProps {
  products: ProductItem[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onAddToCart: (product: ProductItem) => void;
  onQuickView: (product: ProductItem) => void;
}

export function ProductCatalog({
  products,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onQuickView,
}: ProductCatalogProps) {
  const categories = [
    { id: 'all', label: 'همه آثار' },
    { id: 'table-runners', label: 'رومیزی و رانر ۵ تکه' },
    { id: 'shahneshin', label: 'سرویس شاه‌نشین سنتی' },
    { id: 'sajjadeh', label: 'سجاده و جانماز نفیس' },
    { id: 'corporate', label: 'هدایای سازمانی و چوبی' },
    { id: 'boghtche', label: 'بقچه و رانر ابریشمی' },
  ];

  const filtered = products.filter((p) => {
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchCat;
  });

  return (
    <section id="products" className="py-16 bg-paper border-b border-line relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-soft border border-brand/20 text-brand text-xs font-bold shadow-xs">
            <ShamsehEightStar className="w-4 h-4 text-brand" />
            <span>کاتالوگ شاهکارهای بافت یزد</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-ink">
            گنجینهٔ محصولات در قاب اصالت ایرانی
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted">
            بافته‌شده از تار و پود ابریشم طبیعی و زری با شناسنامه معتبر و ضمانت کیفیت
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-brand text-white shadow-md shadow-brand/20 border border-gold/30'
                  : 'bg-sand text-ink-muted hover:bg-gold-soft hover:text-brand border border-line'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((prod, idx) => (
            <div
              key={prod.id}
              className="group bg-sand rounded-3xl border border-line p-4 overflow-hidden hover:shadow-card-hover hover:border-gold/60 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Persian Arch-Framed Image */}
              <div className="relative mb-3">
                <PersianArchImageFrame
                  variant={idx % 3 === 0 ? 'pointed' : idx % 3 === 1 ? 'scalloped' : 'ogee'}
                  badge={prod.badge}
                  className="aspect-4/3 w-full"
                >
                  <Image
                    src={prod.image}
                    alt={prod.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Quick view button */}
                  <button
                    onClick={() => onQuickView(prod)}
                    className="absolute inset-x-3 bottom-3 py-2 rounded-xl bg-paper/95 backdrop-blur-xs text-brand text-xs font-bold opacity-0 group-hover:opacity-100 transition-all shadow-md hover:bg-gold hover:text-white z-30 cursor-pointer"
                  >
                    مشاهده سریع مشخصات
                  </button>
                </PersianArchImageFrame>
              </div>

              {/* Info & Pricing */}
              <div className="flex-1 flex flex-col justify-between space-y-3 text-right">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-ink-muted mb-1">
                    <span className="text-gold font-bold flex items-center gap-1">
                      <ShamsehEightStar className="w-3 h-3 text-gold" />
                      <span>{prod.density}</span>
                    </span>
                    <span>{prod.colors}</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-ink group-hover:text-brand transition-colors line-clamp-2 leading-snug">
                    {prod.title}
                  </h3>
                  {prod.dimensions && (
                    <span className="text-[11px] text-ink-muted/80 block mt-1">
                      ابعاد: {prod.dimensions}
                    </span>
                  )}
                </div>

                <div className="pt-3 border-t border-line flex items-center justify-between gap-2">
                  <div>
                    {prod.originalPrice && (
                      <span className="block text-[11px] text-gray-400 line-through">
                        {prod.originalPrice} تومان
                      </span>
                    )}
                    <span className="font-black text-sm text-brand">
                      {prod.price} <span className="text-[11px] font-normal text-ink-muted">تومان</span>
                    </span>
                  </div>

                  <button
                    onClick={() => onAddToCart(prod)}
                    className="px-3 py-2 rounded-xl bg-gold-soft hover:bg-gold text-brand hover:text-white border border-gold/40 text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    افزودن به سبد
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
