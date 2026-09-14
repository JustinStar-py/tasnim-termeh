import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageIntro, SupportCallout } from '@/components/InformationPage';
import { BotehMark, GirihDivider, ShamsehEightStar } from '@/components/motifs';

export const metadata: Metadata = {
  title: 'درباره ما | داستان تسنیم ترمه',
  description: 'با دنیای تسنیم ترمه آشنا شوید؛ پیوند نقش‌های اصیل یزد با خانه‌های امروز، از انتخاب بافت تا آخرین جزئیات دوخت.',
};

const values = [
  ['ریشه در اصالت', 'بته‌جقه، ترنج و شاه‌عباسی برای ما فقط یک طرح نیستند؛ زبان مشترک نسل‌هایی‌اند که زیبایی را به خانه آورده‌اند.'],
  ['دقت در جزئیات', 'از هماهنگی رنگ‌ها تا آستر، حاشیه و دوخت؛ زیبایی یک ترمه در کنار هم نشستن همین جزئیات کوچک است.'],
  ['انتخاب با آگاهی', 'جنس، ابعاد و کاربرد هر ترمه باید روشن باشد تا آنچه به خانه می‌برید با انتظار و سلیقه شما هماهنگ باشد.'],
];

export default function AboutPage() {
  return (
    <main>
      <PageIntro title="درباره تسنیم ترمه" eyebrow="از دل یزد، برای خانه شما" description="ما به ماندگاری زیبایی باور داریم؛ به نقش‌هایی که از دیروز رسیده‌اند و هنوز می‌توانند گرم‌ترین گوشه خانه امروز باشند.">
        <a href="#our-story" className="mt-7 inline-flex items-center gap-3 border-b border-gold/50 pb-2 text-xs font-bold text-gold-soft">روایت ما را بخوانید <span aria-hidden="true">↓</span></a>
      </PageIntro>

      <section id="our-story" className="info-container scroll-mt-32 py-14 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="relative mx-auto w-full max-w-xl pb-7 ps-7">
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 top-8 rounded-t-[10rem] rounded-b-2xl border border-gold/40" />
            <div className="relative aspect-[4/4.2] overflow-hidden rounded-t-[10rem] rounded-b-2xl bg-sand-dark">
              <Image src="/images/artisan-loom.jpg" alt="بافنده در کنار دار چوبی و تار و پود ترمه در فضای سنتی یزد" fill priority sizes="(max-width: 1023px) 90vw, 45vw" className="object-cover object-[65%_center]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#211017]/80 via-transparent to-transparent" />
              <p className="absolute inset-x-6 bottom-7 text-center text-sm text-gold-soft">هر نقش، ادامه یک داستان است.</p>
            </div>
            <div className="absolute -bottom-1 start-0 flex h-20 w-20 items-center justify-center rounded-2xl border border-gold/40 bg-paper shadow-card sm:h-24 sm:w-24"><BotehMark className="h-12 w-12 text-brand" /></div>
          </div>
          <div>
            <p className="info-eyebrow">روایت یک علاقه ماندگار</p>
            <h2 className="info-heading">ترمه، تنها یک پارچه نیست؛<br /><span className="text-brand">تکه‌ای از فرهنگ ماست.</span></h2>
            <div className="mt-6 space-y-4 text-sm leading-9 text-ink-muted">
              <p>در یزد، زیبایی را می‌شود در آجرهای آفتاب‌خورده، نور پنجره‌های رنگی و پیچ‌وتاب نقش‌های ترمه پیدا کرد. تسنیم ترمه از همین جهان الهام می‌گیرد؛ جهانی که در آن صبر، سلیقه و هنر کنار هم معنا پیدا می‌کنند.</p>
              <p>ما ترمه را برای زندگی انتخاب می‌کنیم؛ برای میزی که دورش جمع می‌شویم، شاه‌نشینی که مهمان خاطره‌هاست و هدیه‌ای که حرف دل را می‌رساند. می‌خواهیم میان شکوه نقش‌های ایرانی و نیاز خانه‌های امروز، پیوندی ساده و صمیمی بسازیم.</p>
              <p>مجموعه ما از رومیزی و رانر تا سجاده، بقچه و هدایای نفیس را در بر می‌گیرد. در هر انتخاب، تناسب رنگ، کیفیت بافت و ظرافت پرداخت برایمان اهمیت دارد.</p>
            </div>
            <Link href="/#products" className="mt-6 inline-flex items-center gap-3 text-sm font-bold text-brand hover:text-turquoise">تماشای مجموعه ترمه‌ها <span aria-hidden="true">←</span></Link>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-sand-dark/60 py-14 sm:py-20">
        <div className="info-container">
          <div className="mx-auto mb-8 max-w-xs"><GirihDivider /></div>
          <div className="mb-9 text-center"><p className="info-eyebrow">چیزی که برای ما مهم است</p><h2 className="info-heading">سه رشته در تار و پود تسنیم</h2></div>
          <div className="grid gap-5 md:grid-cols-3">
            {values.map(([title, description], index) => (
              <article key={title} className="rounded-3xl border border-line bg-paper p-7 sm:p-8">
                <div className="mb-6 flex items-center justify-between"><ShamsehEightStar className="h-9 w-9 text-gold" /><span className="text-sm text-ink-muted">۰{index + 1 === 1 ? '۱' : index + 1 === 2 ? '۲' : '۳'}</span></div>
                <h3 className="text-lg font-bold text-brand">{title}</h3>
                <p className="mt-3 text-sm leading-8 text-ink-muted">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="info-container py-14 sm:py-20">
        <div className="grid overflow-hidden rounded-3xl border border-line bg-paper md:grid-cols-2">
          <div className="relative min-h-72"><Image src="/images/yazd-courtyard.jpg" alt="حیاط ایرانی با حوض فیروزه‌ای، پنجره‌های رنگی و نشیمن‌های ترمه" fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" /></div>
          <div className="p-7 sm:p-10 lg:p-14"><p className="info-eyebrow">میراثی برای زندگی امروز</p><h2 className="info-heading">از خانه‌های یزد<br />تا گوشه دنج خانه شما</h2><p className="mt-5 text-sm leading-9 text-ink-muted">گاهی یک رانر فیروزه‌ای، یک بقچه زرشکی یا یک جفت پشتی ترمه کافی است تا حال‌وهوای یک فضا عوض شود. کنار شما هستیم تا رنگ و نقشی را پیدا کنید که با خانه و سلیقه‌تان هم‌داستان باشد.</p><Link href="/care" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand hover:text-turquoise">چطور از این زیبایی مراقبت کنیم؟ <span aria-hidden="true">←</span></Link></div>
        </div>
      </section>
      <SupportCallout />
    </main>
  );
}
