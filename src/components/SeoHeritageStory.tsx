'use client';

import React from 'react';
import { BotehMark, GirihDivider, ShamsehOrnament } from './motifs';

export function SeoHeritageStory() {
  return (
    <section className="py-16 bg-sand-dark/40 border-b border-line">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="w-12 h-12 rounded-2xl bg-gold-soft border border-gold/40 mx-auto flex items-center justify-center text-gold shadow-sm">
          <BotehMark className="w-7 h-7 text-brand" />
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-ink">
          تسنیم ترمه؛ روایت شکوه ابریشم و زری در پایتخت ترمه ایران، یزد
        </h2>

        <GirihDivider />

        <div className="space-y-4 text-xs sm:text-sm text-ink-muted leading-relaxed text-justify sm:text-center max-w-4xl mx-auto">
          <p>
            شهر تاریخی یزد، نگین کویر مرکزی ایران و میراث ثبت‌شده جهانی یونسکو، خاستگاه کهن‌ترین و نامدارترین کارگاه‌های بافت ترمه سنتی است. در روزگاری که تار و پود با پنجه‌های هنرمندان زبردست بر دارهای چوبی سنتی شکل می‌گرفت، ترمه نمادی از شوکت درباری، وقار خاندان‌های اصیل و هدیه‌ای شاهانه به شمار می‌رفت.
          </p>
          <p>
            برند <strong className="text-brand font-bold">تسنیم ترمه</strong> با اتکا به کارگاه‌های بومی یزد و همراهی بافندگان صاحب‌نام، رسالت خود را زنده نگه‌داشتن نقش‌مایه‌های اصیل ایرانی همچون بته‌جقه، شاه‌عباسی، ترنج و اسلیمی در کنار استفاده از مرغوب‌ترین الیاف ابریشم طبیعی و نخ‌های زری‌باف قرار داده است. تنوع محصولات ما از انواع <strong className="text-ink font-semibold">ست رومیزی ۵ تکه پذیرایی</strong> و <strong className="text-ink font-semibold">سرویس‌های شاه‌نشین سنتی</strong> تا <strong className="text-ink font-semibold">سجاده‌های نفیس کادویی</strong> و هدایای سازمانی چوبی، پاسخی شایسته به ذوق و اصالت خانه‌های ایرانی است.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-6 text-xs font-bold text-brand">
          <span>✓ ارسال مستقیم از کارگاه یزد</span>
          <span className="text-gold">•</span>
          <span>✓ ضمانت بازگشت و تعویض</span>
          <span className="text-gold">•</span>
          <span>✓ شناسنامه رسمی اصالت کالا</span>
        </div>
      </div>
    </section>
  );
}
