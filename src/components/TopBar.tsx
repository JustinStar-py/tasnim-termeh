'use client';

import React, { useState } from 'react';
import { BotehMark } from './motifs';

export function TopBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-brand text-gold-soft text-xs sm:text-sm py-2 px-4 border-b border-gold/30 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Notice & Badge */}
        <div className="flex-1 flex items-center justify-center gap-2.5 text-center">
          <BotehMark className="w-4 h-4 text-gold shrink-0 animate-pulse" />
          <span className="font-medium">
            <strong className="text-white font-bold ml-1">جشنوارهٔ شکوه یزد:</strong>
            ارسال رایگان به سراسر کشور + ۱۰٪ تخفیف ویژه سفارش‌های ست شاه‌نشین و رومیزی ۵ تکه
          </span>
          <span className="hidden md:inline-block px-2 py-0.5 rounded-full bg-gold text-brand font-bold text-[11px]">
            کد: TASNIM10
          </span>
        </div>

        {/* Quick links & Dismiss */}
        <div className="hidden lg:flex items-center gap-4 text-xs text-gold-soft/80">
          <a href="tel:03536220000" className="hover:text-white transition-colors">
            پیگیری سفارش
          </a>
          <span className="text-gold/40">|</span>
          <a href="#atelier" className="hover:text-white transition-colors">
            مشاورهٔ تخصصی
          </a>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="text-gold-soft/60 hover:text-white p-1 rounded-sm text-sm"
          aria-label="بستن پیام"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
