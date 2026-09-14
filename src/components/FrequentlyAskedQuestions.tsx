'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShamsehEightStar } from './motifs';

const groups = [
  { id: 'selection', label: 'انتخاب ترمه', questions: [
    { question: 'چطور ترمه مناسب میز خود را انتخاب کنم؟', answer: 'ابتدا طول و عرض یا قطر میز را اندازه بگیرید. سپس تصمیم بگیرید ترمه تمام سطح را بپوشاند یا مانند یک رانر در مرکز قرار بگیرد. ابعاد درج‌شده در مشخصات هر محصول را با میز مقایسه کنید؛ برای هماهنگی رنگ نیز می‌توانید تصویر فضای خانه را در واتس‌اپ بفرستید.' },
    { question: 'تفاوت ترمه دست‌بافت و ماشینی چیست؟', answer: 'تفاوت اصلی در شیوه بافت است. نوع نخ، تراکم، ظرافت نقش و کیفیت پرداخت نیز در ظاهر و قیمت تأثیر دارند. دست‌بافت یا ماشینی بودن به‌تنهایی جنس الیاف را مشخص نمی‌کند؛ مشخصات همان محصول را بخوانید و برای جزئیات بیشتر از ما بپرسید.' },
    { question: 'آیا رنگ محصول دقیقاً مانند تصویر است؟', answer: 'نور عکاسی و تنظیمات نمایشگر می‌تواند رنگ ترمه را کمی متفاوت نشان دهد. نخ‌های براق نیز در زاویه‌های مختلف جلوه متفاوتی دارند. اگر رنگ برای شما تعیین‌کننده است، پیش از سفارش تصویر نزدیک‌تر یا ویدئوی محصول را درخواست کنید.' },
  ] },
  { id: 'orders', label: 'ثبت و پیگیری سفارش', questions: [
    { question: 'چطور برای خرید و نهایی‌کردن سفارش اقدام کنم؟', answer: 'محصولات مورد نظر را به سبد اضافه کنید و از بخش سبد خرید وارد مرحله مشاوره شوید. برای تأیید موجودی، قیمت نهایی و هماهنگی سفارش، از طریق شماره تماس یا واتس‌اپ درج‌شده در صفحه تماس با ما با فروشگاه ارتباط بگیرید.' },
    { question: 'برای پیگیری سفارش چه اطلاعاتی لازم است؟', answer: 'شماره سفارش یا مشخصات خرید، نام ثبت‌کننده و تاریخ سفارش را آماده کنید و با پشتیبانی تماس بگیرید. اگر سفارش شما ارسال شده، کد رهگیری مرسوله را از پشتیبانی بخواهید.' },
    { question: 'زمان و هزینه ارسال چطور مشخص می‌شود؟', answer: 'مقصد، ابعاد بسته، موجودی محصول و سفارشی‌بودن آن بر زمان آماده‌سازی و ارسال تأثیر دارند. زمان و هزینه نهایی، از جمله شرایط جشنواره ارسال رایگان، باید هنگام تأیید سفارش با فروشگاه هماهنگ شود.' },
    { question: 'اگر سفارش آسیب‌دیده یا با انتخاب من متفاوت بود چه کنم؟', answer: 'پس از دریافت، بسته و محصول را بررسی کنید. در صورت مشاهده آسیب یا مغایرت، تصاویر بسته‌بندی و محصول را همراه با مشخصات سفارش برای پشتیبانی بفرستید. پیش از بازفرستادن کالا، روش و شرایط رسیدگی را با فروشگاه هماهنگ کنید.' },
  ] },
  { id: 'custom', label: 'سفارش اختصاصی و هدیه', questions: [
    { question: 'می‌توانم شاه‌نشین را با ابعاد دلخواه سفارش بدهم؟', answer: 'برای بررسی امکان سفارش اختصاصی، اندازه فضای نشیمن، تعداد تکه‌ها و رنگ دلخواه را ارسال کنید. پس از بررسی طرح و جزئیات ساخت، امکان اجرا، قیمت و زمان آماده‌سازی با شما هماهنگ می‌شود.' },
    { question: 'برای هدایای سازمانی از کجا شروع کنم؟', answer: 'تعداد تقریبی هدایا، بودجه هر بسته و تاریخ تحویل مورد نظر را اعلام کنید. اگر بسته‌بندی یا نشان اختصاصی می‌خواهید، آن را هم در پیام بنویسید تا امکان اجرا و پیشنهادهای مناسب بررسی شود.' },
    { question: 'آیا می‌توان بسته‌بندی هدیه انتخاب کرد؟', answer: 'بسته‌بندی هر محصول ممکن است متفاوت باشد. پیش از نهایی‌کردن سفارش، نوع جعبه، محتویات ست و گزینه‌های بسته‌بندی هدیه را با همکاران فروش بررسی کنید.' },
  ] },
  { id: 'care', label: 'نگهداری و شست‌وشو', questions: [
    { question: 'آیا ترمه را می‌توان در خانه شست؟', answer: 'روش مناسب به جنس نخ، آستر و تزئینات بستگی دارد. ابتدا دستور نگهداری همان محصول را بررسی کنید. برای ترمه ابریشمی، زری‌دار یا آستردار، پیش از شست‌وشو با متخصص منسوجات ظریف مشورت کنید. از ماشین لباس‌شویی، سفیدکننده و چنگ‌زدن خودداری کنید.' },
    { question: 'چطور ترمه را برای مدت طولانی نگهداری کنم؟', answer: 'ترمه را تمیز و کاملاً خشک، دور از نور مستقیم خورشید و رطوبت، در پوشش پارچه‌ای قابل‌تنفس نگه دارید. از گذاشتن اجسام سنگین روی آن و تاهای تیز و طولانی‌مدت پرهیز کنید.', link: true },
  ] },
];

const normalize = (text: string) => text.trim().replace(/[يى]/g, 'ی').replace(/ك/g, 'ک').replace(/[\u200c\s]+/g, ' ').toLocaleLowerCase('fa');

export function FrequentlyAskedQuestions() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const normalizedQuery = normalize(query);
  const visibleGroups = groups.filter((group) => category === 'all' || category === group.id)
    .map((group) => ({ ...group, questions: group.questions.filter((item) => normalize(`${item.question} ${item.answer}`).includes(normalizedQuery)) }))
    .filter((group) => group.questions.length > 0);
  const count = visibleGroups.reduce((sum, group) => sum + group.questions.length, 0);

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[250px_1fr] lg:gap-12">
      <aside className="lg:sticky lg:top-32">
        <label htmlFor="faq-search" className="info-label">پرسش شما درباره چیست؟</label>
        <input id="faq-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="جستجو در پرسش‌ها…" className="info-input bg-paper" />
        <nav aria-label="موضوع پرسش‌ها" className="mt-5 flex flex-wrap gap-2 lg:flex-col">
          {[{ id: 'all', label: 'همه پرسش‌ها' }, ...groups].map((group) => <button key={group.id} type="button" onClick={() => setCategory(group.id)} aria-pressed={category === group.id} className={`rounded-xl border px-4 py-3 text-start text-xs font-bold transition-colors ${category === group.id ? 'border-brand bg-brand text-white' : 'border-line bg-paper text-ink-muted hover:border-gold hover:text-brand'}`}>{group.label}</button>)}
        </nav>
        <div className="mt-6 hidden rounded-2xl border border-gold/30 bg-gold-soft p-5 lg:block"><ShamsehEightStar className="mb-3 h-7 w-7 text-gold" /><p className="text-sm font-bold text-brand">پاسختان را پیدا نکردید؟</p><p className="mt-2 text-xs leading-7 text-ink-muted">برای پرسش‌های مربوط به سفارش خود با ما گفت‌وگو کنید.</p><Link href="/contact" className="mt-3 inline-flex text-xs font-bold text-brand hover:text-turquoise">ارتباط با پشتیبانی ←</Link></div>
      </aside>
      <div>
        <p role="status" className="mb-5 text-xs text-ink-muted">{count.toLocaleString('fa-IR')} پرسش در این بخش</p>
        {visibleGroups.length ? <div className="space-y-9">{visibleGroups.map((group) => <section key={group.id} aria-labelledby={`faq-${group.id}`}><h2 id={`faq-${group.id}`} className="mb-4 flex items-center gap-2 text-lg font-bold text-brand"><ShamsehEightStar className="h-5 w-5 text-gold" />{group.label}</h2><div className="space-y-3">{group.questions.map((item) => <details key={item.question} className="group rounded-2xl border border-line bg-paper open:border-gold/50"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-5 text-sm font-bold leading-7 text-ink [&::-webkit-details-marker]:hidden"><span>{item.question}</span><span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-soft text-lg text-brand group-open:rotate-45">+</span></summary><div className="mx-5 border-t border-line pb-5 pt-4 text-sm leading-9 text-ink-muted"><p>{item.answer}</p>{'link' in item && <Link href="/care" className="mt-3 inline-flex font-bold text-brand hover:text-turquoise">راهنمای کامل نگهداری ترمه ←</Link>}</div></details>)}</div></section>)}</div> : <div className="rounded-3xl border border-dashed border-gold/50 bg-gold-soft/40 px-6 py-14 text-center"><ShamsehEightStar className="mx-auto mb-5 h-10 w-10 text-gold" /><h2 className="text-lg font-bold text-brand">پرسشی با این عبارت پیدا نشد</h2><p className="mt-3 text-sm leading-8 text-ink-muted">عبارت کوتاه‌تری جستجو کنید یا همه موضوع‌ها را ببینید.</p><button type="button" onClick={() => { setQuery(''); setCategory('all'); }} className="info-button mt-6">نمایش همه پرسش‌ها</button></div>}
      </div>
    </div>
  );
}
