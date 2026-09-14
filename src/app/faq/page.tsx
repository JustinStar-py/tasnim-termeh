import type { Metadata } from 'next';
import { PageIntro, SupportCallout } from '@/components/InformationPage';
import { FrequentlyAskedQuestions } from '@/components/FrequentlyAskedQuestions';

export const metadata: Metadata = {
  title: 'پرسش‌های متداول | تسنیم ترمه',
  description: 'پاسخ پرسش‌های رایج درباره انتخاب ترمه، ثبت و پیگیری سفارش، ارسال، هدایای سازمانی و نگهداری محصولات تسنیم ترمه.',
};

export default function FaqPage() {
  return (
    <main>
      <PageIntro title="پرسش‌های متداول" eyebrow="با خیال آسوده انتخاب کنید" description="از اولین انتخاب تا مراقبت از ترمه؛ پاسخ پرسش‌های پر تکرار را اینجا کنار هم گذاشته‌ایم." />
      <section aria-label="راهنمای پرسش و پاسخ" className="info-container py-12 sm:py-20"><FrequentlyAskedQuestions /></section>
      <SupportCallout title="هنوز پرسشی باقی مانده؟" description="بعضی پرسش‌ها به یک گفت‌وگوی کوتاه نیاز دارند. برای راهنمایی درباره محصول یا سفارش خود با ما در ارتباط باشید." />
    </main>
  );
}
