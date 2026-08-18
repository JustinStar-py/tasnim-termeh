'use client';

import React, { useState } from 'react';
import { BotehMark } from './motifs';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenConsultation: () => void;
}

export function Header({ cartCount, onOpenCart, onOpenConsultation }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const menuItems = [
    {
      id: 'table-runners',
      label: 'رومیزی و رانر',
      href: '#products',
      sub: ['ست ۵ تکه پذیرایی', 'رانر تک ابریشم', 'بقچه سنتی مربع', 'رومیزی گرد و عسلی'],
    },
    {
      id: 'shahneshin',
      label: 'سرویس شاه‌نشین',
      href: '#shahneshin',
      sub: ['ست ۷ تکه یزدی', 'ست ۹ تکه سلطنتی', 'تشک و بالشتک لمبه', 'سفارش ابعاد دلخواه'],
    },
    {
      id: 'sajjadeh',
      label: 'سجاده و جانماز',
      href: '#products',
      sub: ['ست جانماز و سجاده ابریشم', 'جانماز جیبی نفیس', 'تسبیح صدف و عقیق'],
    },
    {
      id: 'corporate',
      label: 'هدایای سازمانی',
      href: '#corporate',
      sub: ['جعبه چوبی خاتم و ترمه', 'پک زعفران و رانر', 'هدایای همایش و سمینار'],
    },
    {
      id: 'patterns',
      label: 'خرید بر اساس طرح',
      href: '#collections',
      sub: ['طرح شاه‌عباسی', 'طرح بته‌جقه مادر و بچه', 'طرح ترنج و لچک', 'طرح درباری صفوی'],
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-md border-b border-line shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between gap-4">
          {/* 1. Right side: Brand Logo + Boteh Mark */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand to-brand-hover flex items-center justify-center text-gold shadow-md border border-gold/40 group-hover:scale-105 transition-transform">
                <BotehMark className="w-7 h-7 text-gold drop-shadow-xs" />
              </div>
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-black text-brand tracking-tight block">
                  تسنیم تِرمه
                </span>
                <span className="text-[11px] text-ink-muted block -mt-1 font-medium">
                  اصالت بافت و زری‌دوزی یزد
                </span>
              </div>
            </a>
          </div>

          {/* 2. Center: Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو در نام محصول، طرح شاه‌عباسی، رانر، شاه‌نشین…"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-full border border-line bg-sand focus:bg-white focus:outline-hidden focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
              />
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted/70">
                🔍
              </span>
            </div>
          </div>

          {/* 3. Left side: Order tracking, Consultation, Cart Button & Mobile Hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              onClick={onOpenConsultation}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-soft hover:bg-brand hover:text-white text-brand border border-brand/20 text-xs font-bold transition-all"
            >
              <span>مشاوره و سفارش عمده</span>
            </button>

            {/* Cart Trigger Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-gold-soft hover:bg-gold text-brand hover:text-white border border-gold/40 transition-all group"
              aria-label="سبد خرید"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand text-white text-[11px] font-black flex items-center justify-center border-2 border-paper animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Direct Call / Branch Hotline */}
            <a
              href="tel:03536220000"
              className="hidden xl:flex items-center gap-1 px-3 py-2 rounded-xl bg-sand border border-line text-ink text-xs font-semibold hover:border-gold transition-colors"
            >
              <span className="text-gold">📞</span>
              <span dir="ltr">۰۳۵-۳۶۲۲۰۰۰۰</span>
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-brand hover:bg-brand-soft"
              aria-label="منو"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Category Navigation & Mega-Menu */}
        <nav className="hidden lg:flex items-center justify-start gap-7 border-t border-line/60 py-2.5 text-xs font-medium text-ink-muted">
          <a href="#hero" className="text-brand font-bold flex items-center gap-1">
            <span>صفحه اصلی</span>
          </a>

          {menuItems.map((item) => (
            <div
              key={item.id}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.id)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href={item.href}
                className="hover:text-brand flex items-center gap-1 py-1 transition-colors"
              >
                <span>{item.label}</span>
                <span className="text-[9px] text-gold transition-transform group-hover:rotate-180">
                  ▼
                </span>
              </a>

              {/* Mega-menu dropdown panel */}
              {activeDropdown === item.id && (
                <div className="absolute right-0 top-full pt-2 w-56 z-50 animate-fadeIn">
                  <div className="bg-paper rounded-2xl border border-line p-3 shadow-xl space-y-1">
                    {item.sub.map((subItem, idx) => (
                      <a
                        key={idx}
                        href={item.href}
                        className="block px-3 py-2 rounded-lg text-xs text-ink hover:bg-gold-soft hover:text-brand transition-colors"
                      >
                        {subItem}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          <a href="#artisan" className="hover:text-brand transition-colors">
            کارگاه و اصالت بافت
          </a>
          <a href="#magazine" className="hover:text-brand transition-colors">
            مجلهٔ ترمه
          </a>
          <a href="#about" className="hover:text-brand transition-colors">
            دربارهٔ تسنیم
          </a>
        </nav>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-line bg-paper px-4 py-5 space-y-4 shadow-xl">
            {/* Search Input for Mobile */}
            <div className="relative">
              <input
                type="text"
                placeholder="جستجو در محصولات…"
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-line bg-sand"
              />
            </div>

            <div className="space-y-2 text-xs font-semibold text-ink">
              <a
                href="#hero"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-brand font-bold border-b border-line/40"
              >
                صفحه اصلی
              </a>
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 hover:text-brand border-b border-line/40"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#artisan"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-brand border-b border-line/40"
              >
                کارگاه و بافت اصیل
              </a>
              <a
                href="#magazine"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-brand border-b border-line/40"
              >
                مجله و راهنمای نگهداری
              </a>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3 rounded-xl bg-brand text-white text-xs font-bold shadow-sm"
              >
                درخواست مشاوره و سفارش اختصاصی
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
