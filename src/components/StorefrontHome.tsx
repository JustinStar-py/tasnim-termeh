'use client';

import Image from 'next/image';
import { BotehMark, ShamsehEightStar, ShamsehTwelveStar } from './motifs';
import TermehMosaic from './TermehMosaic';
import { ProductItem } from './BestsellersBand';
import { CategoryArches } from './CategoryArches';

interface StorefrontHomeProps {
  products: ProductItem[];
  selectedCategory: string;
  searchQuery: string;
  onSelectCategory: (category: string) => void;
  onSearchChange: (query: string) => void;
  onAddToCart: (product: ProductItem) => void;
  onQuickView: (product: ProductItem) => void;
  onOpenConsultation: () => void;
}

const categories = [
  { id: 'all', label: 'همه ترمه‌ها', shortLabel: 'همه' },
  { id: 'table-runners', label: 'رومیزی و رانر', shortLabel: 'میز و رانر' },
  { id: 'shahneshin', label: 'سرویس شاه‌نشین', shortLabel: 'شاه‌نشین' },
  { id: 'sajjadeh', label: 'سجاده و جانماز', shortLabel: 'سجاده' },
  { id: 'corporate', label: 'هدایای نفیس', shortLabel: 'هدیه' },
  { id: 'boghtche', label: 'بقچه و ترمه تک', shortLabel: 'ترمه تک' },
];

const categoryNames: Record<string, string> = Object.fromEntries(
  categories.map((category) => [category.id, category.label]),
);

const toPersianDigits = (value: string | number) =>
  String(value).replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]);

const normalizeSearch = (value: string) =>
  value
    .trim()
    .toLocaleLowerCase()
    .replace(/[يى]/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/\s+/g, ' ');

function KhatoonStar({ className = '' }: { className?: string }) {
  return (
    <span className={`khatoon-star ${className}`} aria-hidden="true">
      <ShamsehTwelveStar className="h-full w-full text-gold" />
    </span>
  );
}

function ProductCard({
  product,
  index,
  onAddToCart,
  onQuickView,
}: {
  product: ProductItem;
  index: number;
  onAddToCart: (product: ProductItem) => void;
  onQuickView: (product: ProductItem) => void;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-line bg-paper shadow-[0_10px_35px_-25px_rgba(26,21,19,0.5)] transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_20px_45px_-24px_rgba(122,28,48,0.42)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand-dark">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-50" />

        {product.badge && (
          <span className="absolute right-3 top-3 rounded-full border border-white/50 bg-brand px-2.5 py-1 text-[10px] font-bold text-white shadow-lg">
            {product.badge}
          </span>
        )}

        <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/60 bg-paper/90 text-[10px] font-black text-brand backdrop-blur-sm">
          {toPersianDigits(String(index + 1).padStart(2, '0'))}
        </span>

        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="absolute inset-x-3 bottom-3 translate-y-2 rounded-xl bg-paper/95 px-3 py-2.5 text-xs font-bold text-brand opacity-100 shadow-lg transition-all hover:bg-gold hover:text-white lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
        >
          مشاهده جزئیات و بافت
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4 text-right sm:p-5">
        <div className="mb-2 flex items-center justify-between gap-3 text-[10px] font-medium text-ink-muted">
          <span className="text-gold">{categoryNames[product.category] ?? 'ترمه اصیل'}</span>
          <span className="truncate">{product.colors}</span>
        </div>

        <h3 className="min-h-[3.2rem] text-sm font-bold leading-7 text-ink transition-colors group-hover:text-brand sm:text-[15px]">
          {product.title}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-[10px] font-medium text-turquoise">
          <ShamsehEightStar className="h-3.5 w-3.5 shrink-0 text-gold" />
          <span>{product.density}</span>
        </div>

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-line pt-3">
          <div>
            {product.originalPrice && (
              <span className="mb-0.5 block text-[10px] text-ink-muted/70 line-through">
                {toPersianDigits(product.originalPrice)} تومان
              </span>
            )}
            <div className="whitespace-nowrap text-base font-black tabular-nums text-brand sm:text-lg">
              {toPersianDigits(product.price)}{' '}
              <span className="text-[10px] font-bold text-ink-muted sm:text-xs">تومان</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-brand px-3 py-2.5 text-[11px] font-bold text-white shadow-md shadow-brand/15 transition-colors hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            aria-label={`افزودن ${product.title} به سبد خرید`}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            افزودن
          </button>
        </div>
      </div>
    </article>
  );
}

export function StorefrontHome({
  products,
  selectedCategory,
  searchQuery,
  onSelectCategory,
  onSearchChange,
  onAddToCart,
  onQuickView,
  onOpenConsultation,
}: StorefrontHomeProps) {
  const normalizedSearch = normalizeSearch(searchQuery);
  const visibleProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const searchableText = normalizeSearch(
      [product.title, product.colors, product.density, product.badge, categoryNames[product.category]]
        .filter(Boolean)
        .join(' '),
    );

    return matchesCategory && (!normalizedSearch || searchableText.includes(normalizedSearch));
  });
  const signatureProduct = products[0];
  const shahneshinProduct = products.find((product) => product.category === 'shahneshin') ?? products[1];

  return (
    <main className="overflow-hidden">
      {/* 1. Full-Width Khatam Stars & Termeh Heritage Hero Section */}
      <section id="hero" className="relative isolate overflow-hidden bg-[#1D0C13] text-[#fffaf1] border-b border-gold/30">
        {/* Full-Bleed Khatam Star & Termeh Mosaic Background across 100% of the canvas */}
        <div className="pointer-events-none absolute inset-0 select-none overflow-hidden" aria-hidden="true">
          <div className="absolute inset-0 h-full w-full opacity-35 mix-blend-screen scale-[1.02]">
            <TermehMosaic />
          </div>
          {/* Multi-layered luxury vignette & radial depth for contrast & elegance */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_50%_40%,rgba(37,15,23,0.72)_0%,rgba(24,9,15,0.94)_70%,#16060c_100%)]" />
          <div className="absolute -left-28 top-1/4 h-80 w-80 rounded-full bg-gold/15 blur-[120px]" />
          <div className="absolute -right-28 bottom-10 h-96 w-96 rounded-full bg-brand/50 blur-[140px]" />
          <div className="absolute top-8 left-10 opacity-15 hidden lg:block">
            <ShamsehTwelveStar className="h-28 w-28 text-gold" />
          </div>
          <div className="absolute bottom-8 right-10 opacity-15 hidden lg:block">
            <ShamsehTwelveStar className="h-24 w-24 text-gold" />
          </div>
        </div>

        {/* Hero Content: Grand Persian Brand Stage (Zero Sales Cards) */}
        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28 text-center">
          {/* Eyebrow Pill */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-1.5 text-xs font-bold text-gold-soft backdrop-blur-md shadow-2xs">
            <BotehMark className="h-4 w-4 text-gold" />
            <span>تسنیم تِرمه · میراثِ اصالت و زری‌دوزی یزد</span>
            <span className="inline-block h-1 w-1 rounded-full bg-gold" />
            <span className="text-[11px] text-amber-200/80 font-normal">ثبت جهانی یونسکو</span>
          </div>

          {/* Majestic Royal Headline */}
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.3] lg:leading-[1.25] max-w-4xl mx-auto">
            شکوهِ اصالت و هنرِ ترمه‌بافی ایران،
            <span className="block text-gold mt-2 sm:mt-3">در کالبدِ خانه‌های امروز</span>
          </h1>

          {/* Poetic Narrative */}
          <p className="mt-6 max-w-2xl mx-auto text-xs sm:text-sm lg:text-base leading-relaxed sm:leading-8 text-[#F5E9D7]/85 font-normal">
            آفرینش نفیس‌ترین دست‌بافته‌های ابریشم طبیعی پیله، سرویس‌های سنتی شاه‌نشین و هدایای فاخر سازمانی؛ بافته‌شده با تار و پود زری و شناسنامه رسمی کارگاه‌های کهن یزد.
          </p>

          {/* Discovery Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#categories"
              className="inline-flex items-center gap-2.5 rounded-xl bg-gold px-6 py-3.5 text-xs sm:text-sm font-black text-[#2B1715] shadow-xl shadow-gold/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e0b745] cursor-pointer"
            >
              <span>کاوش در دسته‌بندی‌های اصیل</span>
              <span aria-hidden="true" className="text-base">↓</span>
            </a>
            <button
              type="button"
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-2 rounded-xl border border-gold/40 bg-white/5 px-6 py-3.5 text-xs sm:text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-gold/15 hover:border-gold hover:text-gold cursor-pointer"
            >
              <span>مشاوره و سفارش اختصاصی</span>
              <span className="text-gold" aria-hidden="true">✦</span>
            </button>
          </div>

          {/* 4-Pillar Artisanal Heritage Ribbon */}
          <div className="mt-14 sm:mt-18 max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3.5 border-t border-white/15 pt-8 text-center">
            <div className="border-l border-white/10 pl-3">
              <strong className="block text-sm sm:text-base font-black text-white">۱۰۰٪ ابریشم</strong>
              <span className="text-[11px] text-[#F5E9D7]/65">تار و پود طبیعی پیله</span>
            </div>
            <div className="border-l border-white/10 px-3">
              <strong className="block text-sm sm:text-base font-black text-white">دار سنتی</strong>
              <span className="text-[11px] text-[#F5E9D7]/65">بافندگان اصیل یزد</span>
            </div>
            <div className="border-l border-white/10 px-3">
              <strong className="block text-sm sm:text-base font-black text-white">تراکم سنگین</strong>
              <span className="text-[11px] text-[#F5E9D7]/65">۲۸۰ تا ۳۲۰ گره در سانتیمتر</span>
            </div>
            <div className="pr-3">
              <strong className="block text-sm sm:text-base font-black text-white">شناسنامه کارگاه</strong>
              <span className="text-[11px] text-[#F5E9D7]/65">ضمانت اصالت و کیفیت</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Authentic Persian Architectural Category Arches */}
      <CategoryArches onSelectCategory={onSelectCategory} />

      <section id="products" className="scroll-mt-24 bg-sand py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-5 border-b border-line pb-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="text-right">
              <div className="mb-2 inline-flex items-center gap-2 text-[11px] font-bold text-brand">
                <span className="h-px w-8 bg-gold" />
                <span>ویترین اصلی ترمه</span>
              </div>
              <h2 className="text-2xl font-black leading-tight text-ink sm:text-3xl lg:text-4xl">
                {normalizedSearch ? `نتیجهٔ جست‌وجوی «${searchQuery.trim()}»` : 'بافتی برای هر گوشهٔ خانه'}
              </h2>
              <p className="mt-2 max-w-xl text-xs leading-7 text-ink-muted sm:text-sm">
                {normalizedSearch
                  ? 'محصولات نزدیک به جست‌وجوی شما را بر اساس طرح، رنگ و نوع بافت پیدا کردیم.'
                  : 'از رانرهای روزمره تا سرویس‌های شاه‌نشین؛ هر محصول با تصویر واقعی، مشخصات بافت و قیمت نهایی ارائه می‌شود.'}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-ink-muted">
              <ShamsehEightStar className="h-5 w-5 text-gold" />
              <span aria-live="polite">{toPersianDigits(visibleProducts.length)} محصول آماده انتخاب</span>
              {normalizedSearch && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="mr-2 rounded-full border border-line bg-paper px-2.5 py-1 text-[10px] font-bold text-brand transition-colors hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  پاک کردن جست‌وجو
                </button>
              )}
            </div>
          </div>

          <div className="sticky top-16 z-30 -mx-4 mb-8 border-y border-line bg-sand/95 px-4 py-3 backdrop-blur-md sm:static sm:mx-0 sm:border-y-0 sm:bg-transparent sm:p-0">
            <nav className="flex gap-2 overflow-x-auto pb-1" aria-label="فیلتر دسته‌بندی محصولات">
              {categories.map((category) => {
                const count = products.filter(
                  (product) => category.id === 'all' || product.category === category.id,
                ).length;
                const isActive = selectedCategory === category.id;

                return (
                  <button
                    type="button"
                    key={category.id}
                    onClick={() => onSelectCategory(category.id)}
                    aria-pressed={isActive}
                    className={`flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-[11px] font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 sm:px-4 sm:py-2.5 ${
                      isActive
                        ? 'border-brand bg-brand text-white shadow-md shadow-brand/15'
                        : 'border-line bg-paper text-ink-muted hover:border-gold hover:text-brand'
                    }`}
                  >
                    <span className="sm:hidden">{category.shortLabel}</span>
                    <span className="hidden sm:inline">{category.label}</span>
                    <span className={`rounded-full px-1.5 py-0.5 text-[9px] ${isActive ? 'bg-white/15 text-gold-soft' : 'bg-sand-dark text-ink-muted'}`}>
                      {toPersianDigits(count)}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
              />
            ))}
          </div>

          {visibleProducts.length === 0 && (
            <div className="rounded-2xl border border-dashed border-gold/50 bg-gold-soft p-12 text-center text-sm font-bold text-brand">
              محصولی در این دسته‌بندی پیدا نشد.
            </div>
          )}
        </div>
      </section>

      <section id="atelier" className="relative overflow-hidden border-y border-line bg-sand-dark py-14 sm:py-20">
        <div className="pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full bg-turquoise/10 blur-3xl" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div id="shahneshin" className="grid overflow-hidden rounded-[1.75rem] border border-gold/35 bg-[#211517] shadow-2xl lg:grid-cols-[0.95fr_1.05fr]">
            <div className="relative min-h-[280px] lg:min-h-[430px]">
              <Image
                src={shahneshinProduct?.image ?? '/images/shahneshin.jpg'}
                alt="سرویس شاه‌نشین ترمه یزد در فضای خانه ایرانی"
                fill
                sizes="(max-width: 1023px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#211517]/75 via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-gold/50 bg-[#211517]/80 px-3 py-1.5 text-[10px] font-bold text-gold-soft backdrop-blur-sm">
                <ShamsehEightStar className="h-4 w-4 text-gold" />
                <span>برای خانه‌های ماندگار</span>
              </div>
            </div>

            <div className="relative p-7 text-right text-white sm:p-10 lg:p-14">
              <div className="pointer-events-none absolute left-8 top-8 opacity-25" aria-hidden="true">
                <ShamsehTwelveStar className="h-24 w-24 text-gold" />
              </div>
              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-[10px] font-bold text-gold-soft">
                  <BotehMark className="h-4 w-4 text-gold" />
                  <span>امضای دکوراسیون ایرانی</span>
                </div>
                <h2 className="max-w-xl text-2xl font-black leading-[1.7] sm:text-3xl lg:text-4xl">
                  شاه‌نشین؛<span className="text-gold"> نقطهٔ کانونی خانه</span>
                </h2>
                <p className="mt-4 max-w-xl text-xs leading-8 text-[#f4e6d5]/75 sm:text-sm">
                  سرویس‌های ۷ و ۹ تکه با ترمهٔ سنگین، فوم سرد طبی و امکان انتخاب رنگ و ابعاد. برای فضایی که قرار است خاطره بسازد، سفارش را با مشاورهٔ مستقیم کارگاه تنظیم کنید.
                </p>

                <div className="mt-6 grid max-w-xl grid-cols-3 gap-2 border-y border-white/15 py-4 text-center text-[10px] text-[#f4e6d5]/70 sm:gap-4">
                  <div><strong className="mb-1 block text-sm text-white">۷ و ۹</strong>تکهٔ کامل</div>
                  <div><strong className="mb-1 block text-sm text-white">۳۲۰</strong>گرهٔ متراکم</div>
                  <div><strong className="mb-1 block text-sm text-white">اختصاصی</strong>ابعاد و رنگ</div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={onOpenConsultation}
                    className="rounded-xl bg-gold px-5 py-3 text-xs font-black text-[#2b1715] transition-colors hover:bg-[#d9b34f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#211517]"
                  >
                    مشاوره و سفارش ابعاد دلخواه
                  </button>
                  <span className="text-xs text-gold-soft/75">
                    شروع از {toPersianDigits(shahneshinProduct?.price ?? '۱۲,۸۰۰,۰۰۰')} تومان
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 border-b border-line pb-1 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['اصالت بافت', 'انتخاب مستقیم از کارگاه‌های یزد'],
              ['قیمت روشن', 'بدون واسطه و هزینهٔ پنهان'],
              ['بسته‌بندی فاخر', 'آماده برای هدیه‌دادن'],
              ['ارسال ایمن', 'بسته‌بندی ویژه به سراسر کشور'],
            ].map(([title, description], index) => (
              <div key={title} className="flex items-start gap-3 border-l border-line px-1 py-3 last:border-l-0 sm:px-4">
                <span className="font-serif text-sm font-black text-gold">{toPersianDigits(index + 1)}</span>
                <div>
                  <strong className="block text-xs font-bold text-ink">{title}</strong>
                  <span className="mt-1 block text-[10px] leading-5 text-ink-muted">{description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
