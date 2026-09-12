import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const shabnam = localFont({
  src: [
    {
      path: './fonts/Shabnam-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Shabnam.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Shabnam-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Shabnam-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-shabnam',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'تسنیم ترمه | اصالت و هنر ترمه‌بافی یزد',
  description: 'فروشگاه تخصصی انواع ترمه اصیل یزد، رومیزی، سجاده و جانماز، سرویس‌های شاه‌نشین و هدایای نفیس سنتی تسنیم ترمه.',
  keywords: ['ترمه', 'ترمه یزد', 'تسنیم ترمه', 'رومیزی ترمه', 'شاه نشین', 'صنایع دستی'],
  authors: [{ name: 'تسنیم ترمه' }],
  openGraph: {
    title: 'تسنیم ترمه | اصالت و زیبایی هنر یزد',
    description: 'تولید و عرضه مستقیم باکیفیت‌ترین محصولات ترمه دست‌بافت و ماشینی',
    locale: 'fa_IR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={shabnam.variable} suppressHydrationWarning>
      <body
        className="min-h-screen bg-[var(--color-sand)] text-[var(--color-ink)] font-sans antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
