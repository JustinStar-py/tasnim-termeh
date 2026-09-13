'use client';

import React from 'react';
import Image from 'next/image';
import { BotehMark } from './motifs';

interface ArticleItem {
  id: number;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  image: string;
  date: string;
}

const articles: ArticleItem[] = [
  {
    id: 1,
    title: 'راهنمای جامع نگهداری، شستشو و اتوکشی ترمه‌های ابریشمی',
    category: 'آموزش و نگهداری',
    readTime: '۵ دقیقه مطالعه',
    summary:
      'اصول مراقبت از الیاف ابریشم و زری، روش‌های شستشوی خشک‌شویی و نحوه پهن کردن برای جلوگیری از شکستن خطوط زری.',
    image: '/images/table-runner.jpg',
    date: '۲۵ مرداد ۱۴۰۵',
  },
  {
    id: 2,
    title: 'فلسفه و تاریخچه ۵۰۰ ساله نقش «بته‌جقه» در نساجی یزد',
    category: 'تاریخ و هنر',
    readTime: '۷ دقیقه مطالعه',
    summary:
      'چرا نماد سرو خمیده ایرانی قرن‌هاست که قلب تپنده نفیس‌ترین پارچه‌های زربفت و ترمه جهان باقی مانده است؟',
    image: '/images/hero.jpg',
    date: '۱۸ مرداد ۱۴۰۵',
  },
  {
    id: 3,
    title: 'چگونه ترمه ابریشم طبیعی اصل را از الیاف مصنوعی تشخیص دهیم؟',
    category: 'راهنمای خرید',
    readTime: '۴ دقیقه مطالعه',
    summary:
      'بررسی تراکم گره، تست حرارت تار و پود، میزان لطافت و شناسایی تقلب‌های رایج بازار منسوجات سنتی.',
    image: '/images/artisan-loom.jpg',
    date: '۱۰ مرداد ۱۴۰۵',
  },
];

export function TermehMagazine() {
  return (
    <section id="magazine" className="py-16 bg-sand border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-soft border border-brand/20 text-brand text-xs font-bold">
              <BotehMark className="w-4 h-4 text-brand" />
              <span>دانشنامه و مجلهٔ تخصصی</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-ink">
              مجلهٔ فرهنگ و هنر ترمه‌بافی
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted">
              آگاهی‌بخشی درباره تاریخ، شیوه نگهداری و شناخت ارزش صنایع دستی اصیل ایران
            </p>
          </div>

          <a
            href="#magazine"
            className="text-xs font-bold text-brand hover:text-brand-hover flex items-center gap-1 group"
          >
            <span>مشاهده همه مقالات مجله</span>
            <span className="transition-transform group-hover:-translate-x-1">←</span>
          </a>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((art) => (
            <article
              key={art.id}
              className="bg-paper rounded-3xl border border-line overflow-hidden shadow-xs hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-sand">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-brand text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                  {art.category}
                </div>
              </div>

              <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-ink-muted">
                    <span>{art.date}</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-ink group-hover:text-brand transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed line-clamp-3">
                    {art.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-line flex items-center justify-between text-xs font-bold text-brand">
                  <span>ادامه مطلب</span>
                  <span>←</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
