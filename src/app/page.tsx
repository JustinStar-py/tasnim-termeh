'use client';

import { ProductItem } from '@/components/BestsellersBand';
import { StorefrontHome } from '@/components/StorefrontHome';
import { useStorefront } from '@/components/StorefrontShell';

const allProducts: ProductItem[] = [
  {
    id: 1,
    title: 'ست رومیزی ۵ تکه ابریشم طرح شاه‌عباسی فیروزه‌ای و طلایی',
    category: 'table-runners',
    density: '۲۶۰ گره در سانتیمتر',
    colors: 'فیروزه‌ای، طلایی و یاقوتی',
    price: '۳,۴۵۰,۰۰۰',
    originalPrice: '۳,۹۰۰,۰۰۰',
    image: '/images/table-runner.jpg',
    badge: 'پرفروش‌ترین',
    dimensions: 'رانر ۱۰۰×۴۵ + ۴ عسلی',
  },
  {
    id: 2,
    title: 'سرویس شاه‌نشین ۷ تکه سنتی یزد (طرح بته‌جقه اعلا زرشکی)',
    category: 'shahneshin',
    density: '۳۰۰ گره سنگین زری‌بافت',
    colors: 'زرشکی لاکی و طلایی',
    price: '۱۲,۸۰۰,۰۰۰',
    originalPrice: '۱۴,۵۰۰,۰۰۰',
    image: '/images/shahneshin.jpg',
    badge: 'ویژه جهیزیه',
    dimensions: 'تشک نشیمن ۲ متری + ۶ پشتی و بالشتک لمبه',
  },
  {
    id: 3,
    title: 'ست سجاده و جانماز ابریشم طبیعی با جعبه چوبی خاتم و تسبیح صدف',
    category: 'sajjadeh',
    density: 'ابریشم ۱۰۰٪ طبیعی دست‌بافت',
    colors: 'آبی درباری، فیروزه‌ای و زری',
    price: '۲,۲۰۰,۰۰۰',
    image: '/images/sajjadeh.jpg',
    badge: 'هدیه نفیس',
    dimensions: 'سجاده ۹۰×۶۰ + جانماز و تسبیح',
  },
  {
    id: 4,
    title: 'پک هدیه سازمانی نفیس ترمه، جعبه خاتم و زعفران قائنات',
    category: 'corporate',
    density: 'ابریشم و لمه زردوزی',
    colors: 'زرشکی و طلایی',
    price: '۲,۸۵۰,۰۰۰',
    image: '/images/corporate-gift.jpg',
    badge: 'ویژه سازمان‌ها',
    dimensions: 'جعبه چوبی گردو ۳۵×۲۵ سانتیمتر',
  },
  {
    id: 5,
    title: 'رانر تک ابریشمی سلطنتی طرح بته‌جقه مادر و بچه یاقوتی',
    category: 'table-runners',
    density: '۲۸۰ گره متراکم',
    colors: 'یاقوتی، طلایی براق و سرمه‌ای',
    price: '۱,۸۵۰,۰۰۰',
    originalPrice: '۲,۱۰۰,۰۰۰',
    image: '/images/hero.jpg',
    badge: 'صادراتی',
    dimensions: '۱۴۰×۵۰ سانتیمتر',
  },
  {
    id: 6,
    title: 'بقچه سنتی ترمه یزد ابعاد ۱۰۰×۱۰۰ طرح ترنج و لچک صفوی',
    category: 'boghtche',
    density: '۲۴۰ گره ابریشمی',
    colors: 'کرم طلایی و فیروزه‌ای',
    price: '۱,۶۵۰,۰۰۰',
    image: '/images/table-runner.jpg',
    badge: 'دست‌دوز',
    dimensions: '۱۰۰×۱۰۰ سانتیمتر',
  },
  {
    id: 7,
    title: 'سرویس ۹ تکه شاه‌نشین سلطنتی درباری با فوم سرد طبی درجه یک',
    category: 'shahneshin',
    density: '۳۲۰ گره فوق‌متراکم',
    colors: 'یشمی، یاقوتی و طلایی',
    price: '۱۶,۵۰۰,۰۰۰',
    image: '/images/shahneshin.jpg',
    badge: 'لوکس و سفارشی',
    dimensions: 'تشک ۲ متری ضخیم + ۸ تکه پشتی و لمبه',
  },
  {
    id: 8,
    title: 'ست رومیزی گرد پذیرایی قطر ۹۰ سانتیمتر با منگوله‌های زری',
    category: 'table-runners',
    density: '۲۵۰ گره',
    colors: 'طلایی و زرشکی',
    price: '۱,۴۵۰,۰۰۰',
    image: '/images/hero.jpg',
    badge: 'جدید',
    dimensions: 'قطر ۹۰ سانتیمتر',
  },
];

export default function HomePage() {
  const storefront = useStorefront();
  return <StorefrontHome products={allProducts} {...storefront} />;
}
