'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { KhatamBorder } from './motifs';
import Link from 'next/link';

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#151210] text-[#a89d95] text-xs sm:text-sm pt-14 pb-8 border-t border-[#2e2622] relative overflow-hidden">
      {/* Top Khatam / Ornamental Border Ribbon */}
      <div className="absolute top-0 inset-x-0">
        <KhatamBorder />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Brand & Bio (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <Image
                src="/images/logo.png"
                alt="تسنیم ترمه یزد"
                width={250}
                height={250}
                className="h-12 sm:h-14 w-auto object-contain drop-shadow-sm brightness-110"
              />
              <div>
                <span className="text-lg font-black text-white block">تسنیم تِرمه یزد</span>
                <span className="text-[11px] text-[#8a7f77] block">هنر و اصالت کهن ایرانی</span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-[#8a7f77] max-w-sm">
              تولیدکننده تخصصی انواع پارچه‌های ترمه ابریشمی، رومیزی و رانرهای ۵ تکه، سرویس‌های سنتی شاه‌نشین و پک‌های نفیس کادویی با نشان اصالت بافت یزد.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2 max-w-sm">
              <span className="block text-xs font-bold text-white mb-2">
                عضویت در خبرنامه و اطلاع از تخفیف‌ها:
              </span>
              {subscribed ? (
                <div className="p-2.5 rounded-xl bg-turquoise/20 border border-turquoise/40 text-turquoise text-xs font-bold">
                  ✓ با تشکر! عضویت شما در باشگاه مشتریان ثبت شد.
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="ایمیل یا شماره همراه خود را وارد کنید…"
                    className="min-w-0 flex-1 px-3 py-2 text-xs rounded-xl bg-[#241e1b] border border-[#3d332d] text-white focus:outline-hidden focus:border-gold"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    عضویت
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm flex items-center gap-1.5">
              <span className="text-gold">✦</span>
              <span>دسترسی سریع</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#products" className="hover:text-gold transition-colors">
                  ست رومیزی ۵ تکه پذیرایی
                </Link>
              </li>
              <li>
                <Link href="/#shahneshin" className="hover:text-gold transition-colors">
                  سرویس‌های شاه‌نشین سنتی
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold transition-colors">درباره تسنیم ترمه</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold transition-colors">تماس با ما</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gold transition-colors">پرسش‌های متداول</Link>
              </li>
              <li>
                <Link href="/care" className="hover:text-gold transition-colors">راهنمای نگهداری ترمه</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Addresses */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm flex items-center gap-1.5">
              <span className="text-gold">✦</span>
              <span>شعبه‌ها و کارگاه</span>
            </h4>
            <div className="space-y-2 text-xs text-[#8a7f77]">
              <div>
                <strong className="text-white block mb-0.5">کارگاه مرکزی و شو‌روم یزد:</strong>
                <span>خیابان مسجد جامع، بازار سنتی ترمه‌بافان یزد، پلاک ۴۲</span>
              </div>
              <div>
                <strong className="text-white block mb-0.5">دفتر فروش تهران:</strong>
                <span>خیابان جمهوری، تقاطع فردوسی، مرکز تجاری صنایع دستی، طبقه ۲</span>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Trust */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm flex items-center gap-1.5">
              <span className="text-gold">✦</span>
              <span>پشتیبانی و اصالت</span>
            </h4>
            <div className="space-y-1.5 text-xs text-[#8a7f77]">
              <p>تلفن یزد: <span className="text-white" dir="ltr">۰۳۵-۳۶۲۲۰۰۰۰</span></p>
              <p>تلفن همراه و مشاوره: <span className="text-white" dir="ltr">۰۹۱۳۰۰۰۰۰۰۰</span></p>
              <p>ساعات کاری: همه‌روزه از ۸:۳۰ الی ۲۱:۰۰</p>
            </div>

            {/* Trust Badges */}
            <div className="pt-2 flex items-center gap-2">
              <div className="w-16 h-16 rounded-xl bg-[#241e1b] border border-[#3d332d] flex flex-col items-center justify-center p-1 text-center">
                <span className="text-base">🛡️</span>
                <span className="text-[9px] text-gold font-bold">ضمانت اصالت</span>
              </div>
              <div className="w-16 h-16 rounded-xl bg-[#241e1b] border border-[#3d332d] flex flex-col items-center justify-center p-1 text-center">
                <span className="text-base">🚚</span>
                <span className="text-[9px] text-gold font-bold">ارسال رایگان</span>
              </div>
              <div className="w-16 h-16 rounded-xl bg-[#241e1b] border border-[#3d332d] flex flex-col items-center justify-center p-1 text-center">
                <span className="text-base">🏅</span>
                <span className="text-[9px] text-gold font-bold">نشان یونسکو</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="border-t border-[#26201c] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6e635d]">
          <span>تمامی حقوق مادی و معنوی این وب‌سایت متعلق به گروه تولیدی تسنیم ترمه یزد می‌باشد.</span>
          <div className="flex items-center gap-4 text-gold-soft/80">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-gold">
              اینستاگرام
            </a>
            <span>•</span>
            <a href="https://ble.ir" target="_blank" rel="noreferrer" className="hover:text-gold">
              پیام‌رسان بله
            </a>
            <span>•</span>
            <a href="https://wa.me/989130000000" target="_blank" rel="noreferrer" className="hover:text-gold">
              واتس‌اپ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
