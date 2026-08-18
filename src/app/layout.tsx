import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const vazirmatn = localFont({
  src: './fonts/Vazirmatn-Variable.woff2',
  variable: '--font-vazirmatn',
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
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="min-h-screen bg-[var(--color-sand)] text-[var(--color-ink)] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
