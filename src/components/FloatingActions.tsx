'use client';

import React, { useEffect, useState } from 'react';
import { BotehMark } from './motifs';

interface FloatingActionsProps {
  onOpenConsultation: () => void;
}

export function FloatingActions({ onOpenConsultation }: FloatingActionsProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyCoupon = () => {
    navigator.clipboard.writeText('TASNIM10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed bottom-5 left-5 z-40 flex flex-col items-start gap-3">
      {/* 1. Discount Coupon Floating Pill */}
      <button
        onClick={copyCoupon}
        className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-paper/95 backdrop-blur-md border border-gold shadow-lg text-brand text-xs font-bold hover:scale-105 transition-all cursor-pointer group"
      >
        <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
        <span>{copied ? 'کد TASNIM10 کپی شد!' : '🎁 ۱۰٪ تخفیف: TASNIM10'}</span>
      </button>

      {/* 2. Direct Support & Consultation Floating Button */}
      <button
        onClick={onOpenConsultation}
        className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-brand to-brand-hover text-white text-xs sm:text-sm font-bold shadow-2xl shadow-brand/30 border border-gold/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        aria-label="پشتیبانی و مشاوره آنلاین"
      >
        <BotehMark className="w-5 h-5 text-gold animate-pulse" />
        <span>مشاوره و پشتیبانی</span>
      </button>

      {/* 3. Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-paper border border-line hover:border-gold text-brand flex items-center justify-center text-sm shadow-md transition-all cursor-pointer self-start"
          aria-label="بازگشت به بالای صفحه"
        >
          ▲
        </button>
      )}
    </div>
  );
}
