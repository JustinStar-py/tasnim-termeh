'use client';

import React, { useState } from 'react';
import { BotehMark, ShamsehOrnament } from './motifs';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    type: 'ست رومیزی ۵ تکه پذیرایی',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-paper rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 border border-gold/40 shadow-2xl relative">
        <button
          onClick={() => {
            onClose();
            setSubmitted(false);
          }}
          className="absolute top-5 left-5 text-ink-muted hover:text-ink p-1.5 rounded-full hover:bg-sand transition-colors cursor-pointer"
          aria-label="بستن"
        >
          ✕
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-turquoise-soft text-turquoise rounded-full mx-auto flex items-center justify-center text-3xl font-bold border border-turquoise/30">
              ✓
            </div>
            <h3 className="text-lg font-bold text-ink">درخواست شما با موفقیت ثبت شد</h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              کارشناسان کارگاه تسنیم ترمه یزد در اسرع وقت جهت ارائه مشاوره تخصصی و ارسال آلبوم تصاویر با شما تماس خواهند گرفت.
            </p>
            <button
              onClick={() => {
                onClose();
                setSubmitted(false);
              }}
              className="px-6 py-2.5 rounded-xl bg-brand text-white text-xs font-bold hover:bg-brand-hover transition-colors cursor-pointer"
            >
              بستن پنجره
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-right">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-gold">
                <BotehMark className="w-4 h-4 text-brand" />
                <span>مشاوره و ثبت سفارش اختصاصی</span>
              </div>
              <h3 className="text-lg font-black text-ink">
                فرم درخواست کاتالوگ و مشاوره ترمه
              </h3>
              <p className="text-xs text-ink-muted">
                مشخصات خود را وارد نمایید تا راهنمای کامل محصولات و نمونه‌ها ارسال شود.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  نام و نام خانوادگی
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="مثال: مریم رضایی"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-line bg-sand focus:bg-white focus:outline-hidden focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  شماره تماس همراه
                </label>
                <input
                  required
                  type="tel"
                  dir="ltr"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="09123456789"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-line bg-sand focus:bg-white focus:outline-hidden focus:border-brand text-left"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  موضوع درخواست
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-line bg-sand focus:bg-white focus:outline-hidden focus:border-brand"
                >
                  <option>ست رومیزی ۵ تکه پذیرایی</option>
                  <option>سفارش ست شاه‌نشین سنتی در ابعاد دلخواه</option>
                  <option>سجاده و جانماز نفیس کادویی</option>
                  <option>خرید عمده و هدایای سازمانی چوبی</option>
                  <option>مشاوره خرید جهیزیه عروس</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink mb-1">
                  توضیحات اختیاری (طرح یا ابعاد مدنظر)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="رنگ‌بندی دلخواه، ابعاد میز یا تعداد مدنظر…"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-line bg-sand focus:bg-white focus:outline-hidden focus:border-brand"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-bold shadow-md shadow-brand/20 transition-all cursor-pointer"
            >
              ثبت و دریافت تماس کارشناس
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
