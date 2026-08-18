'use client';

import React from 'react';
import Image from 'next/image';
import { BotehMark, ShamsehOrnament } from './motifs';

interface CorporateGiftSectionProps {
  onOpenConsultation: () => void;
}

export function CorporateGiftSection({ onOpenConsultation }: CorporateGiftSectionProps) {
  return (
    <section id="corporate" className="py-16 bg-sand border-b border-line relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#1a1513] to-[#2b1b16] text-white rounded-3xl border border-gold/40 shadow-2xl p-8 sm:p-12 overflow-hidden relative">
          {/* Subtle gold glow */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Image Showcase */}
            <div className="lg:col-span-5 relative aspect-4/3 rounded-2xl overflow-hidden border border-gold/40 shadow-xl bg-black/40">
              <Image
                src="/images/corporate-gift.jpg"
                alt="پک هدیه سازمانی نفیس ترمه و خاتم تسنیم"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-3 right-3 bg-paper/90 text-brand text-xs font-bold px-3 py-1 rounded-lg">
                بسته‌بندی چوبی گردو با حاشیه خاتم
              </div>
            </div>

            {/* Content & Details */}
            <div className="lg:col-span-7 space-y-6 text-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/20 border border-gold/40 text-gold-soft text-xs font-bold">
                <ShamsehOrnament className="w-4 h-4 text-gold" />
                <span>سفارش‌های سازمانی و مدیریتی</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-snug">
                هدایای ارزشمند سازمانی <br />
                <span className="text-gold">با شناسنامه و بسته‌بندی نفیس</span>
              </h2>

              <p className="text-xs sm:text-sm text-gold-soft/80 leading-relaxed">
                ویژه نوروز، روز پزشک، روز معلم، کنفرانس‌های بین‌المللی و تجلیل از مدیران ارشد. شامل رانر ابریشمی اعلا، ظروف میناکاری، زعفران صادراتی قائنات و پلاک فلزی اختصاصی با لوگوی سازمان شما.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-amber-100/90 pt-1">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <div className="font-bold text-gold text-sm mb-1">پلاک فلزی اختصاصی</div>
                  <span>حک لیزری لوگوی برند شما</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <div className="font-bold text-gold text-sm mb-1">تخفیف تیراژ بالا</div>
                  <span>قیمت رقابتی بدون واسطه</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <div className="font-bold text-gold text-sm mb-1">ارسال نمونه رایگان</div>
                  <span>جهت تصمیم‌گیری سازمان‌ها</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenConsultation}
                  className="px-7 py-3.5 rounded-xl bg-gold hover:bg-gold-hover text-brand font-black text-xs sm:text-sm shadow-lg shadow-gold/20 transition-all cursor-pointer"
                >
                  درخواست کاتالوگ سازمانی و صدور پیش‌فاکتور
                </button>
                <a
                  href="tel:09130000000"
                  className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-colors"
                >
                  تماس مستقیم با واحد بازرگانی: ۰۹۱۳۰۰۰۰۰۰۰
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
