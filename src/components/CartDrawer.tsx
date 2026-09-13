'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ProductItem } from './BestsellersBand';
import { BotehMark } from './motifs';

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: number, newQty: number) => void;
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);

  if (!isOpen) return null;

  // Calculate total price in raw integer
  const parsePrice = (pStr: string) => {
    return parseInt(pStr.replace(/,/g, ''), 10) || 0;
  };

  const rawSubtotal = items.reduce(
    (sum, item) => sum + parsePrice(item.product.price) * item.quantity,
    0
  );

  const discountAmount = discountApplied ? Math.round(rawSubtotal * 0.1) : 0;
  const giftWrapFee = giftWrap ? 85000 : 0;
  const finalTotal = rawSubtotal - discountAmount + giftWrapFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'TASNIM10') {
      setDiscountApplied(true);
    } else {
      alert('کد تخفیف معتبر نیست. از کد TASNIM10 استفاده نمایید.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        aria-label="بستن سبد خرید"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pr-0">
        <div className="flex w-screen max-w-md flex-col justify-between border-l border-line bg-paper shadow-2xl">
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10 pr-0">
        <div className="flex w-screen max-w-full sm:max-w-md flex-col justify-between border-l border-line bg-paper shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-line flex items-center justify-between bg-sand">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand text-gold flex items-center justify-center">
                <BotehMark className="w-5 h-5 text-gold" />
              </div>
              <h3 id="cart-title" className="text-sm font-bold text-ink">
                سبد خرید شما ({items.reduce((s, i) => s + i.quantity, 0)} کالا)
              </h3>
            </div>
            <button
              onClick={onClose}
              className="cursor-pointer rounded-lg p-1.5 text-sm text-ink-muted hover:bg-paper hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="بستن سبد خرید"
            >
              ✕
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-gold-soft flex items-center justify-center text-gold text-2xl">
                  🛒
                </div>
                <h4 className="font-bold text-sm text-ink">سبد خرید شما خالی است</h4>
                <p className="text-xs text-ink-muted">
                  از میان شاهکارهای ترمه یزد محصول دلخواه خود را برگزینید.
                </p>
                <button
                  onClick={onClose}
                  className="mt-3 px-5 py-2 rounded-xl bg-brand text-white text-xs font-bold"
                >
                  مشاهده محصولات
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 rounded-2xl bg-sand border border-line"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white shrink-0 border border-line">
                    <Image
                      src={item.product.image}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info & Quantity */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-ink line-clamp-1">
                        {item.product.title}
                      </h4>
                      <span className="text-[10px] text-gold font-semibold block mt-0.5">
                        {item.product.density}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-xs font-black text-brand">
                        {(
                          parsePrice(item.product.price) * item.quantity
                        ).toLocaleString('fa-IR')}{' '}
                        <span className="text-[10px] font-normal text-ink-muted">تومان</span>
                      </div>

                      {/* Quantity buttons */}
                      <div className="flex items-center gap-1.5 bg-paper px-2 py-1 rounded-lg border border-line">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="text-xs font-bold text-brand hover:text-gold px-1"
                          aria-label={`افزایش تعداد ${item.product.title}`}
                        >
                          +
                        </button>
                        <span className="text-xs font-bold px-1">{item.quantity}</span>
                        <button
                          onClick={() => {
                            if (item.quantity > 1) {
                              onUpdateQuantity(item.product.id, item.quantity - 1);
                            } else {
                              onRemoveItem(item.product.id);
                            }
                          }}
                          className="text-xs font-bold text-ink-muted hover:text-red-600 px-1"
                          aria-label={`کاهش تعداد ${item.product.title}`}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {items.length > 0 && (
              <div className="space-y-3 pt-2">
                {/* Gift Wrap option */}
                <label className="flex items-center gap-2 text-xs text-ink cursor-pointer bg-gold-soft/50 p-2.5 rounded-xl border border-gold/30">
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={(e) => setGiftWrap(e.target.checked)}
                    className="rounded-sm text-brand focus:ring-gold"
                  />
                  <span>افزودن بسته‌بندی کادویی اختصاصی با جعبه چوبی و روبان (+۸۵,۰۰۰ تومان)</span>
                </label>

                {/* Discount Code Form */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="کد تخفیف (مثلا TASNIM10)"
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-line bg-sand uppercase"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-gold text-brand font-bold text-xs hover:bg-gold-hover hover:text-white transition-colors"
                  >
                    اعمال
                  </button>
                </form>
                {discountApplied && (
                  <span className="text-[11px] text-turquoise font-bold block">
                    ✓ کد تخفیف ۱۰٪ جشنواره با موفقیت اعمال شد.
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Footer Summary */}
          {items.length > 0 && (
            <div className="p-5 border-t border-line bg-sand space-y-3">
              <div className="space-y-1.5 text-xs text-ink-muted">
                <div className="flex justify-between">
                  <span>جمع کل کالاها:</span>
                  <span>{rawSubtotal.toLocaleString('fa-IR')} تومان</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-turquoise font-bold">
                    <span>تخفیف جشنواره (۱۰٪):</span>
                    <span>- {discountAmount.toLocaleString('fa-IR')} تومان</span>
                  </div>
                )}
                {giftWrap && (
                  <div className="flex justify-between text-brand">
                    <span>بسته‌بندی کادویی:</span>
                    <span>۸۵,۰۰۰ تومان</span>
                  </div>
                )}
                <div className="flex justify-between text-ink font-bold text-sm pt-2 border-t border-line">
                  <span>مبلغ قابل پرداخت:</span>
                  <span className="text-brand font-black text-base">
                    {finalTotal.toLocaleString('fa-IR')} تومان
                  </span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-3.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs sm:text-sm font-bold shadow-lg shadow-brand/20 transition-all cursor-pointer"
              >
                تکمیل سفارش و پرداخت آنلاین
              </button>

              <div className="text-[10px] text-center text-ink-muted flex items-center justify-center gap-2">
                <span>🔒 پرداخت امن بانکی</span>
                <span>•</span>
                <span>ارسال رایگان سراسر کشور</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
