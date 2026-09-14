import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageIntro } from '@/components/InformationPage';
import { ContactForm } from '@/components/ContactForm';
import { BotehMark, ShamsehEightStar } from '@/components/motifs';

export const metadata: Metadata = {
  title: 'تماس با ما | تسنیم ترمه',
  description: 'راه‌های ارتباط با تسنیم ترمه، نشانی کارگاه یزد و دفتر تهران؛ مشاوره انتخاب ترمه، سفارش اختصاصی و هدایای سازمانی.',
};

export default function ContactPage() {
  return (
    <main>
      <PageIntro title="تماس با ما" eyebrow="صدای شما، آغاز یک آشنایی" description="برای انتخاب یک ترمه، پیگیری سفارش یا صحبت درباره هدیه‌ای خاص؛ با خوشحالی همراهتان هستیم." />
      <section aria-label="راه‌های ارتباطی" className="info-container py-10 sm:py-14">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: 'تماس با کارگاه یزد', detail: '۰۳۵–۳۶۲۲۰۰۰۰', note: 'گفت‌وگوی مستقیم درباره محصولات', href: 'tel:03536220000', icon: '۰۱' },
            { title: 'پیام در واتس‌اپ', detail: '۰۹۱۳۰۰۰۰۰۰۰', note: 'ارسال تصویر، ابعاد و طرح دلخواه', href: 'https://wa.me/989130000000', icon: '۰۲' },
            { title: 'پاسخ پرسش‌های شما', detail: 'پرسش‌های متداول', note: 'راهنمای انتخاب، سفارش و نگهداری', href: '/faq', icon: '۰۳' },
          ].map((item) => <Link key={item.title} href={item.href} className="group rounded-2xl border border-line bg-paper p-6 transition-colors hover:border-gold"><div className="mb-5 flex items-center justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-soft text-xs font-bold text-brand">{item.icon}</span><span aria-hidden="true" className="text-gold transition-transform group-hover:-translate-x-1">←</span></div><h2 className="text-sm font-bold text-ink-muted">{item.title}</h2><p className="mt-2 text-xl font-bold text-brand"><bdi>{item.detail}</bdi></p><p className="mt-2 text-xs leading-6 text-ink-muted">{item.note}</p></Link>)}
        </div>
      </section>

      <section className="info-container pb-14 sm:pb-20">
        <div className="grid items-start gap-8 lg:grid-cols-[1.35fr_0.85fr] lg:gap-12">
          <ContactForm />
          <aside className="space-y-6 lg:pt-5">
            <div className="flex items-center gap-3"><ShamsehEightStar className="h-8 w-8 text-gold" /><h2 className="text-xl font-bold">پیش از گفت‌وگو</h2></div>
            <p className="text-sm leading-9 text-ink-muted">هرچه بیشتر از نیازتان بدانیم، بهتر می‌توانیم راهنمایی کنیم. این چند نکته به شروع گفت‌وگو کمک می‌کند:</p>
            <ul className="space-y-5">
              {[
                ['برای انتخاب ترمه', 'نام محصول، رنگ‌های مورد علاقه و ابعاد میز یا فضای مورد نظر را همراه داشته باشید.'],
                ['برای سفارش سازمانی', 'تعداد هدایا، بودجه تقریبی و تاریخ مورد نیاز را با ما در میان بگذارید.'],
                ['برای پیگیری سفارش', 'شماره سفارش و نام ثبت‌کننده سفارش را در پیام ذکر کنید.'],
              ].map(([title, text]) => <li key={title} className="flex items-start gap-3"><BotehMark className="mt-1 h-4 w-4 shrink-0 text-gold" /><div><h3 className="text-sm font-bold text-brand">{title}</h3><p className="mt-1 text-xs leading-7 text-ink-muted">{text}</p></div></li>)}
            </ul>
            <div className="rounded-2xl border border-turquoise/15 bg-turquoise-soft p-5"><p className="text-sm font-bold text-turquoise">ساعت پاسخ‌گویی</p><p className="mt-2 text-sm text-ink">همه‌روزه، ۸:۳۰ تا ۲۱:۰۰</p><p className="mt-2 text-xs leading-7 text-ink-muted">برای مراجعه حضوری و اطمینان از حضور همکاران، پیش از حرکت تماس بگیرید.</p></div>
          </aside>
        </div>
      </section>

      <section className="border-t border-line bg-sand-dark/60 py-14 sm:py-20">
        <div className="info-container">
          <div className="mb-8"><p className="info-eyebrow">دیدار از نزدیک</p><h2 className="info-heading">نشانی شعبه‌ها و کارگاه</h2></div>
          <div className="grid overflow-hidden rounded-3xl border border-line bg-paper lg:grid-cols-2">
            <div className="relative min-h-72 lg:min-h-96"><Image src="/images/yazd-courtyard.jpg" alt="معماری سنتی و حال‌وهوای خانه‌های یزد" fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" /><p className="absolute inset-x-7 bottom-6 text-sm text-gold-soft">یزد؛ شهر خشت، آفتاب و نقش‌های ماندگار</p></div>
            <div className="divide-y divide-line px-6 sm:px-9">
              {[
                { title: 'کارگاه مرکزی و شوروم یزد', address: 'خیابان مسجد جامع، بازار سنتی ترمه‌بافان یزد، پلاک ۴۲', query: 'یزد خیابان مسجد جامع بازار ترمه' },
                { title: 'دفتر فروش تهران', address: 'خیابان جمهوری، تقاطع فردوسی، مرکز تجاری صنایع دستی، طبقه ۲', query: 'تهران خیابان جمهوری تقاطع فردوسی' },
              ].map((branch) => <article key={branch.title} className="py-7 sm:py-9"><h3 className="text-base font-bold text-brand">{branch.title}</h3><address className="mt-3 text-sm not-italic leading-8 text-ink-muted">{branch.address}</address><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.query)}`} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-turquoise hover:text-brand">مشاهده محدوده روی نقشه <span aria-hidden="true">↗</span></a></article>)}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
