'use client';

import React from 'react';
import { BotehMark, ShamsehOrnament } from './motifs';

export function ValueProps() {
  const values = [
    {
      id: 1,
      title: 'شناسنامه و هولوگرام اصالت',
      description:
        'هر اثر ترمه همراه با پلاک فلزی شماره‌دار، هولوگرام رسمی کارگاه یزد و کد رهگیری اصالت بافت ارائه می‌گردد.',
      badge: 'ضمانت اصالت',
      bgColor: 'bg-brand-soft',
      borderColor: 'border-brand/20',
      textColor: 'text-brand',
      icon: '📜',
    },
    {
      id: 2,
      title: 'تار و پود ابریشم طبیعی و زری',
      description:
        'استفاده از مرغوب‌ترین ابریشم طبیعی و نخ لمه مقاوم با بالاترین تراکم گره (۲۴۰ تا ۳۰۰ گره در سانتیمتر).',
      badge: 'تراکم صادراتی',
      bgColor: 'bg-gold-soft',
      borderColor: 'border-gold/30',
      textColor: 'text-gold',
      icon: '✨',
    },
    {
      id: 3,
      title: '۱۰ سال ضمانت کتبی ثبات رنگ',
      description:
        'رنگرزی سنتی با رنگ‌های گیاهی و متالیک ثابت؛ مقاوم در برابر تابش نور خورشید و شستشوی استاندارد.',
      badge: 'ضمانت مادام‌العمر',
      bgColor: 'bg-turquoise-soft',
      borderColor: 'border-turquoise/25',
      textColor: 'text-turquoise',
      icon: '🛡️',
    },
    {
      id: 4,
      title: 'بسته‌بندی فاخر چوبی و کادویی',
      description:
        'ارائه در جعبه‌های اختصاصی روکش مخمل و چوب گردو با لچک‌های خاتم؛ آماده برای هدیه دادن و جهیزیه.',
      badge: 'بسته‌بندی لوکس',
      bgColor: 'bg-sand',
      borderColor: 'border-line',
      textColor: 'text-brand',
      icon: '🎁',
    },
  ];

  return (
    <section id="about" className="py-16 bg-paper border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-soft border border-gold/30 text-gold text-xs font-bold">
            <ShamsehOrnament className="w-4 h-4 text-gold" />
            <span>تعهد به هنر و کیفیت</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-ink">
            چرا تسنیم ترمه را برمی‌گزینند؟
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted">
            تلفیق شکوه هنر چندصدساله دست‌بافان یزد با استانداردهای نوین کیفیت و مشتری‌مداری
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div
              key={v.id}
              className={`${v.bgColor} p-6 rounded-3xl border ${v.borderColor} shadow-xs hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-1`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{v.icon}</span>
                  <span
                    className={`text-[10px] font-black px-2.5 py-0.5 rounded-full bg-white border ${v.borderColor} ${v.textColor}`}
                  >
                    {v.badge}
                  </span>
                </div>
                <h3 className={`text-base font-bold ${v.textColor}`}>{v.title}</h3>
                <p className="text-xs text-ink-muted leading-relaxed">{v.description}</p>
              </div>

              <div className="pt-3 border-t border-black/5 flex items-center gap-1.5 text-[11px] font-bold text-ink">
                <BotehMark className={`w-3.5 h-3.5 ${v.textColor}`} />
                <span>تولید مستقیم کارگاه یزد</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
