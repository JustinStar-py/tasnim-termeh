'use client';

import { useState, type FormEvent } from 'react';

export function ContactForm() {
  const [preparedMessage, setPreparedMessage] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    if (!name || !message) return;
    setPreparedMessage(`سلام تسنیم ترمه\nنام: ${name}\nموضوع: ${data.get('subject')}\n${message}`);
  }

  return (
    <div className="rounded-3xl border border-line bg-paper p-6 shadow-card sm:p-9">
      <p className="info-eyebrow">شروع یک گفت‌وگو</p>
      <h2 className="text-xl font-bold text-ink sm:text-2xl">برایمان بنویسید</h2>
      <p id="contact-form-note" className="mt-3 text-sm leading-8 text-ink-muted">پیام خود را آماده کنید و در واتس‌اپ برای ما بفرستید. ارسال نهایی در واتس‌اپ انجام می‌شود.</p>
      <form onSubmit={handleSubmit} onChange={() => setPreparedMessage(null)} aria-describedby="contact-form-note" className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div><label htmlFor="contact-name" className="info-label">نام و نام خانوادگی <span className="text-brand">*</span></label><input id="contact-name" name="name" autoComplete="name" required minLength={2} maxLength={80} pattern=".*\S.*" placeholder="نام شما" className="info-input" /></div>
          <div><label htmlFor="contact-subject" className="info-label">موضوع گفت‌وگو</label><select id="contact-subject" name="subject" className="info-input"><option>راهنمای انتخاب محصول</option><option>سفارش اختصاصی و شاه‌نشین</option><option>هدایای سازمانی و خرید عمده</option><option>پیگیری سفارش</option><option>سایر پرسش‌ها</option></select></div>
        </div>
        <div><label htmlFor="contact-message" className="info-label">پیام شما <span className="text-brand">*</span></label><textarea id="contact-message" name="message" required minLength={10} maxLength={2000} rows={5} placeholder="از طرح و رنگ دلخواهتان بگویید یا پرسشتان را بنویسید…" className="info-input resize-y" /></div>
        <button type="submit" className="info-button w-full sm:w-auto">آماده‌سازی پیام <span aria-hidden="true">←</span></button>
        <div aria-live="polite" aria-atomic="true">
          {preparedMessage && <div className="rounded-2xl border border-turquoise/20 bg-turquoise-soft p-5"><p className="text-sm font-bold text-turquoise">پیام شما آماده است؛ هنوز ارسال نشده.</p><p className="mt-2 text-xs leading-7 text-ink-muted">با دکمه زیر وارد واتس‌اپ شوید و پیام را ارسال کنید.</p><a href={`https://wa.me/989130000000?text=${encodeURIComponent(preparedMessage)}`} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-turquoise px-5 py-2 text-sm font-bold text-white hover:bg-turquoise/90">ادامه در واتس‌اپ <span aria-hidden="true">↗</span></a></div>}
        </div>
      </form>
    </div>
  );
}
