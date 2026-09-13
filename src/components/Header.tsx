'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface HeaderProps {
  cartCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectCategory: (category: string) => void;
  onOpenCart: () => void;
  onOpenConsultation: () => void;
}

export function Header({
  cartCount,
  searchQuery,
  onSearchChange,
  onSelectCategory,
  onOpenCart,
  onOpenConsultation,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const menuItems = [
    {
      id: 'table-runners',
      label: 'رومیزی و رانر',
      href: '#products',
      category: 'table-runners',
      sub: ['ست ۵ تکه پذیرایی', 'رانر تک ابریشم', 'رومیزی گرد و عسلی'],
    },
    {
      id: 'shahneshin',
      label: 'سرویس شاه‌نشین',
      href: '#shahneshin',
      category: 'shahneshin',
      sub: ['ست ۷ تکه یزدی', 'ست ۹ تکه سلطنتی', 'سفارش ابعاد دلخواه'],
    },
    {
      id: 'sajjadeh',
      label: 'سجاده و جانماز',
      href: '#products',
      category: 'sajjadeh',
      sub: ['ست جانماز و سجاده ابریشم', 'جانماز جیبی نفیس', 'تسبیح صدف و عقیق'],
    },
    {
      id: 'corporate',
      label: 'هدایای سازمانی',
      href: '#products',
      category: 'corporate',
      sub: ['پک‌های هدیه ترمه', 'جعبه چوبی خاتم و ترمه', 'هدایای همایش و سمینار'],
    },
    {
      id: 'patterns',
      label: 'خرید بر اساس طرح',
      href: '#products',
      category: 'all',
      sub: ['طرح شاه‌عباسی', 'طرح بته‌جقه مادر و بچه', 'طرح ترنج و لچک'],
    },
  ];

  const handleCategoryClick = (category: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    onSelectCategory(category);
  };

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-md border-b border-line shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          {/* 1. Right side: Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="flex items-center gap-3 group">
              <Image
                src="/images/logo.png"
                alt="تسنیم ترمه"
                width={150}
                height={58}
                priority
                className="h-11 w-auto object-contain drop-shadow-xs transition-transform group-hover:scale-105 sm:h-12"
              />
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-black text-brand tracking-tight block">
                <span className="text-lg xs:text-xl sm:text-2xl font-black text-brand tracking-tight block leading-tight">
                  تسنیم تِرمه
                </span>
                <span className="text-[11px] text-ink-muted block -mt-1 font-medium">
                <span className="text-[10px] xs:text-[11px] text-ink-muted block -mt-0.5 sm:-mt-1 font-medium">
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
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="جستجو در نام محصول، طرح شاه‌عباسی، رانر، شاه‌نشین…"
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-full border border-line bg-sand focus:bg-white focus:outline-hidden focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
              />
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted/70" aria-hidden="true">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" strokeWidth="1.8" />
                  <path strokeLinecap="round" strokeWidth="1.8" d="m20 20-4-4" />
                </svg>
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
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-paper bg-brand text-[11px] font-black text-white">
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
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
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
                onClick={() => handleCategoryClick(item.category)}
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
                        onClick={() => handleCategoryClick(item.category)}
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

          <a href="#atelier" className="hover:text-brand transition-colors">
            شاه‌نشین و سفارش اختصاصی
          </a>
          <a href="#atelier" className="hover:text-brand transition-colors">
            داستان تسنیم
          </a>
        </nav>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div id="mobile-navigation" className="lg:hidden border-t border-line bg-paper px-4 py-5 space-y-4 shadow-xl">
          <div id="mobile-navigation" className="lg:hidden border-t border-line bg-paper px-4 py-5 space-y-4 shadow-xl animate-fadeIn">
            {/* Search Input for Mobile */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="جستجو در محصولات…"
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-line bg-sand"
                placeholder="جستجو در نام محصول، طرح، رنگ…"
                className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-line bg-sand focus:bg-white focus:outline-hidden focus:border-gold"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted/70" aria-hidden="true">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" strokeWidth="1.8" />
                  <path strokeLinecap="round" strokeWidth="1.8" d="m20 20-4-4" />
                </svg>
              </span>
            </div>

            <div className="space-y-2 text-xs font-semibold text-ink">
            <div className="space-y-1 text-xs font-semibold text-ink divide-y divide-line/30">
              <a
                href="#hero"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-brand font-bold border-b border-line/40"
                className="flex items-center justify-between py-2.5 text-brand font-bold"
              >
                صفحه اصلی
                <span>صفحه اصلی</span>
                <span className="text-gold text-[10px]">✦</span>
              </a>
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => handleCategoryClick(item.category)}
                  className="block py-2 hover:text-brand border-b border-line/40"
                  className="flex items-center justify-between py-2.5 hover:text-brand transition-colors"
                >
                  {item.label}
                  <span>{item.label}</span>
                  <span className="text-ink-muted text-[10px]">←</span>
                </a>
              ))}
              <a
                href="#atelier"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-brand border-b border-line/40"
                className="flex items-center justify-between py-2.5 hover:text-brand transition-colors"
              >
                شاه‌نشین و سفارش اختصاصی
                <span>سرویس شاه‌نشین و سفارش ابعاد دلخواه</span>
                <span className="text-ink-muted text-[10px]">←</span>
              </a>
              <a
                href="#atelier"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-brand border-b border-line/40"
                className="flex items-center justify-between py-2.5 hover:text-brand transition-colors"
              >
                داستان تسنیم
                <span>داستان اصالت تسنیم ترمه</span>
                <span className="text-ink-muted text-[10px]">←</span>
              </a>
            </div>

            <div className="pt-2 flex flex-col gap-2">
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3 rounded-xl bg-brand text-white text-xs font-bold shadow-sm"
                className="w-full py-3 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-bold shadow-sm transition-colors"
              >
                درخواست مشاوره و سفارش اختصاصی
              </button>
              <a
                href="tel:03536220000"
                className="w-full py-2.5 rounded-xl bg-sand border border-line text-ink hover:text-brand text-xs font-bold text-center flex items-center justify-center gap-2 transition-colors"
              >
                <span className="text-gold">📞</span>
                <span>تماس مستقیم با کارگاه: ۰۳۵-۳۶۲۲۰۰۰۰</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
