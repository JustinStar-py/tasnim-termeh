import Link from 'next/link';
import type { ReactNode } from 'react';
import { BotehMark, KhatamBorder, AuthenticBotehJegheh } from './motifs';

export function PageIntro({ title, eyebrow, description, children }: {
  title: string;
  eyebrow: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-gold/30 bg-[#211017] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(122,28,48,0.65),transparent_65%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-12 top-4 opacity-25 -rotate-12 select-none sm:left-12">
        <AuthenticBotehJegheh idPrefix="page-intro-boteh" className="w-64 h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-6 sm:px-6 sm:pb-20 lg:px-8">
        <nav aria-label="مسیر صفحه" className="mb-10 flex items-center gap-2 text-xs text-gold-soft/70 sm:mb-14">
          <Link href="/" className="transition-colors hover:text-white">خانه</Link>
          <span aria-hidden="true" className="text-gold">/</span>
          <span aria-current="page" className="text-white">{title}</span>
        </nav>
        <div className="max-w-2xl">
          <p className="mb-4 flex items-center gap-2 text-xs font-bold text-gold"><BotehMark className="h-5 w-5" />{eyebrow}</p>
          <h1 className="text-3xl font-bold leading-snug sm:text-5xl sm:leading-snug">{title}</h1>
          <p className="mt-5 max-w-xl text-sm leading-8 text-gold-soft/80 sm:text-base sm:leading-9">{description}</p>
          {children}
        </div>
      </div>
      <KhatamBorder className="absolute inset-x-0 bottom-0 h-1.5 opacity-60" />
    </section>
  );
}

export function SupportCallout({ title = 'برای انتخاب، کنارتان هستیم', description = 'از انتخاب نقش و رنگ تا سفارش اختصاصی؛ با ما درباره ترمه‌ای که در ذهن دارید صحبت کنید.' }: { title?: string; description?: string }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-turquoise/20 bg-turquoise-soft p-6 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-bold text-turquoise">یک گفت‌وگوی خوب، یک انتخاب ماندگار</p>
          <h2 className="text-xl font-bold text-ink sm:text-2xl">{title}</h2>
          <p className="mt-3 text-sm leading-8 text-ink-muted">{description}</p>
        </div>
        <Link href="/contact" className="info-button mt-6 shrink-0 lg:mt-0">گفت‌وگو با تسنیم <span aria-hidden="true">←</span></Link>
      </div>
    </section>
  );
}
