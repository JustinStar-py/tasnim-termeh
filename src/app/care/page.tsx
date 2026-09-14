import type { Metadata } from 'next';
import Image from 'next/image';
import { PageIntro, SupportCallout } from '@/components/InformationPage';
import { BotehMark } from '@/components/motifs';

export const metadata: Metadata = {
  title: 'راهنمای نگهداری ترمه | تسنیم ترمه',
  description: 'راهنمای مراقبت روزمره، تمیزکردن، اتوکشی و نگهداری ترمه؛ نکته‌هایی ساده برای حفظ زیبایی بافت و رنگ.',
};

const steps = [
  { id: 'everyday', number: '۰۱', title: 'مراقبت در استفاده روزمره', subtitle: 'کمی توجه، هر روز', text: 'ترمه را دور از تابش مداوم آفتاب قرار دهید و برای ظرف داغ، گلدان مرطوب یا اشیای تیز از زیرانداز مناسب استفاده کنید. زیورآلات و لبه‌های زبر ممکن است به نخ‌های ظریف گیر کنند.', tips: ['گردوغبار سطح را با پارچه نرم و خشک، بدون کشیدن روی بافت بردارید.', 'برای رومیزی، محل قرارگیری ظروف را هر از گاهی تغییر دهید.'] },
  { id: 'cleaning', number: '۰۲', title: 'تمیزکردن و رسیدگی به لکه', subtitle: 'آرام و بدون عجله', text: 'اگر مایعی ریخت، با پارچه سفید و تمیز رطوبت را به‌آرامی جذب کنید؛ لکه را نمالید. شست‌وشوی کامل باید متناسب با جنس الیاف، آستر و تزئینات و طبق دستور نگهداری محصول انجام شود.', tips: ['از سفیدکننده، لکه‌بر قوی، آب داغ و چنگ‌زدن استفاده نکنید.', 'برای ترمه ابریشمی یا زری‌دار، از متخصص منسوجات ظریف راهنمایی بگیرید.'] },
  { id: 'ironing', number: '۰۳', title: 'خشک‌کردن و رفع چروک', subtitle: 'با حرارت، محتاط باشید', text: 'اگر شست‌وشو طبق دستور محصول مجاز است، ترمه را بدون چلاندن و در سایه روی سطح صاف خشک کنید. ترمه سنگین و خیس را آویزان نکنید؛ وزن آب می‌تواند به فرم و بافت آن فشار وارد کند.', tips: ['اتوکشی فقط در صورت مجازبودن روی برچسب و با دمای متناسب با الیاف انجام شود.', 'از تماس مستقیم اتو با روی بافت و نخ‌های زری پرهیز کنید؛ از پارچه محافظ استفاده کنید.'] },
  { id: 'storage', number: '۰۴', title: 'نگهداری برای روزهای بعد', subtitle: 'جایی امن برای نقش‌ها', text: 'ترمه را پس از اطمینان از تمیزی و خشکی کامل، در محیط خنک و خشک و داخل پوشش پارچه‌ای قابل‌تنفس بگذارید. بسته‌بندی تزئینی هدیه همیشه برای نگهداری طولانی‌مدت مناسب نیست.', tips: ['از قرار دادن وسایل سنگین روی ترمه و ایجاد تاهای تیز خودداری کنید.', 'در نگهداری طولانی، گهگاه ترمه را باز کنید و محل تاها را تغییر دهید.'] },
];

export default function CarePage() {
  return (
    <main>
      <PageIntro title="زیبایی‌ای که ماندگار می‌ماند" eyebrow="راهنمای نگهداری ترمه" description="ترمه برای سال‌ها همراهی با خانه شماست. با چند عادت ساده، از رنگ، لطافت و نقش‌های ظریف آن مراقبت کنید." />
      <section className="info-container py-12 sm:py-20">
        <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <aside className="lg:sticky lg:top-32">
            <div className="relative aspect-[4/3] overflow-hidden rounded-t-[7rem] rounded-b-2xl bg-sand-dark"><Image src="/images/termeh-blue-gold.jpg" alt="جزئیات نقش و بافت ترمه آبی و طلایی" fill priority sizes="(max-width: 1023px) 100vw, 40vw" className="object-cover" /></div>
            <div className="mt-6 rounded-2xl border border-gold/35 bg-gold-soft p-6"><BotehMark className="mb-3 h-7 w-7 text-brand" /><h2 className="text-base font-bold text-brand">اول، دستور نگهداری محصول</h2><p className="mt-3 text-sm leading-8 text-ink-muted">همه ترمه‌ها الیاف و تزئینات یکسانی ندارند. دستور همراه محصول بر این راهنمای عمومی اولویت دارد. اگر از جنس یا روش مراقبت مطمئن نیستید، پیش از شست‌وشو بپرسید.</p></div>
            <nav aria-label="بخش‌های راهنمای نگهداری" className="mt-6 grid grid-cols-2 gap-2">{steps.map((step) => <a key={step.id} href={`#${step.id}`} className="rounded-xl border border-line bg-paper px-3 py-3 text-xs font-bold text-ink-muted transition-colors hover:border-gold hover:text-brand"><span className="me-2 text-brand">{step.number}</span>{step.title.split(' و ')[0]}</a>)}</nav>
          </aside>
          <div className="divide-y divide-line">{steps.map((step) => <article key={step.id} id={step.id} className="scroll-mt-32 py-8 first:pt-0 last:pb-0"><div className="mb-5 flex items-center gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold/30 bg-paper text-lg font-bold text-brand">{step.number}</span><div><p className="mb-1 text-xs text-ink-muted">{step.subtitle}</p><h2 className="text-lg font-bold text-brand sm:text-xl">{step.title}</h2></div></div><p className="text-sm leading-9 text-ink-muted">{step.text}</p><ul className="mt-5 space-y-3">{step.tips.map((tip) => <li key={tip} className="flex items-start gap-3 text-sm leading-8 text-ink"><span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />{tip}</li>)}</ul></article>)}</div>
        </div>
      </section>
      <SupportCallout title="درباره مراقبت از ترمه‌تان بپرسید" description="نام محصول و تصویری از بافت یا برچسب نگهداری را برایمان بفرستید تا درباره روش مناسب مراقبت گفت‌وگو کنیم." />
    </main>
  );
}
