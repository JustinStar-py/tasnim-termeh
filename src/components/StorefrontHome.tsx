'use client';

import Image from 'next/image';
import { BotehMark, ShamsehEightStar } from './motifs';
import { ProductItem } from './BestsellersBand';

interface StorefrontHomeProps {
  products: ProductItem[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onAddToCart: (product: ProductItem) => void;
  onQuickView: (product: ProductItem) => void;
  onOpenConsultation: () => void;
}

const categories = [
  { id: 'all', label: 'همه محصولات' },
  { id: 'table-runners', label: 'رومیزی و رانر' },
  { id: 'shahneshin', label: 'شاه‌نشین' },
  { id: 'sajjadeh', label: 'سجاده و جانماز' },
  { id: 'corporate', label: 'هدایای نفیس' },
  { id: 'boghtche', label: 'بقچه و ترمه تک' },
];

function ProductCard({
  product,
  featured = false,
  onAddToCart,
  onQuickView,
}: {
  product: ProductItem;
  featured?: boolean;
  onAddToCart: (product: ProductItem) => void;
  onQuickView: (product: ProductItem) => void;
}) {
  return (
    <article
      className={`storefront-product group ${featured ? 'storefront-product-featured' : ''}`}
    >
      <div className="storefront-product-image">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes={featured ? '(max-width: 1023px) 100vw, 50vw' : '(max-width: 639px) 100vw, 33vw'}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="storefront-product-wash" />
        {product.badge && <span className="storefront-product-badge">{product.badge}</span>}
        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="storefront-quick-view"
        >
          مشاهده جزئیات
        </button>
      </div>

      <div className="storefront-product-info">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="storefront-product-category">{product.colors}</p>
            <h3 className="storefront-product-title">{product.title}</h3>
          </div>
          <span className="storefront-product-index">۰{product.id}</span>
        </div>

        <div className="storefront-product-footer">
          <div>
            <p className="storefront-product-meta">{product.density}</p>
            <p className="storefront-product-price">
              {product.price} <span>تومان</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="storefront-add-button"
            aria-label={`افزودن ${product.title} به سبد خرید`}
          >
            <span>افزودن</span>
            <span aria-hidden="true">+</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export function StorefrontHome({
  products,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  onQuickView,
  onOpenConsultation,
}: StorefrontHomeProps) {
  const visibleProducts = products.filter(
    (product) => selectedCategory === 'all' || product.category === selectedCategory,
  );
  const signatureProduct = products[0];

  return (
    <main>
      <section id="hero" className="storefront-hero">
        <div className="storefront-hero-grid">
          <div className="storefront-hero-copy">
            <div className="storefront-eyebrow">
              <BotehMark className="h-4 w-4 text-gold" />
              <span>تسنیم ترمه · از کارگاه‌های یزد</span>
            </div>
            <h1>
              ترمه‌ای برای
              <em> ماندن.</em>
            </h1>
            <p>
              نقش‌های اصیل ایرانی، در بافتی که هر روز زیباتر می‌شود. ترمه‌های نفیس برای
              میز، خانه و هدیه‌هایی که به یاد می‌مانند.
            </p>
            <div className="storefront-hero-actions">
              <a href="#products" className="storefront-primary-button">
                دیدن مجموعه ترمه
                <span aria-hidden="true">←</span>
              </a>
              <button type="button" onClick={onOpenConsultation} className="storefront-text-button">
                راهنمای انتخاب
                <span aria-hidden="true">↗</span>
              </button>
            </div>
            <div className="storefront-hero-note">
              <span className="storefront-note-line" />
              <span>ارسال مستقیم از یزد · بسته‌بندی فاخر</span>
            </div>
          </div>

          <div className="storefront-hero-art">
            <div className="storefront-hero-arch" />
            <div className="storefront-hero-image">
              <Image
                src="/images/table-runner.jpg"
                alt="ست رومیزی ترمه فیروزه‌ای و طلایی روی میز پذیرایی"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 56vw"
                className="object-cover"
              />
            </div>
            <div className="storefront-hero-product">
              <div className="flex items-center justify-between gap-4">
                <span className="storefront-mini-label">پیشنهاد امروز</span>
                <ShamsehEightStar className="h-5 w-5 text-gold" />
              </div>
              <p>{signatureProduct.title}</p>
              <strong>
                {signatureProduct.price} <small>تومان</small>
              </strong>
              <a href="#products">مشاهده محصول <span aria-hidden="true">←</span></a>
            </div>
            <div className="storefront-hero-stamp" aria-hidden="true">
              <span>اصالت</span>
              <strong>یزد</strong>
              <span>از ۱۳۴۷</span>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="storefront-catalog">
        <div className="storefront-section-heading">
          <div>
            <div className="storefront-eyebrow storefront-eyebrow-dark">
              <span className="storefront-eyebrow-mark" />
              <span>انتخابی از بافته‌های اصیل</span>
            </div>
            <h2>ترمه را برای جای درستش پیدا کنید.</h2>
          </div>
          <p>
            هر اثر با تصویر واقعی، قیمت روشن و اطلاعات بافت ارائه شده است؛ برای انتخابی
            مطمئن و بی‌دغدغه.
          </p>
        </div>

        <div className="storefront-filter-row" aria-label="فیلتر دسته‌بندی محصولات">
          <span className="storefront-filter-label">دسته‌بندی:</span>
          <div className="storefront-filters">
            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={selectedCategory === category.id ? 'is-active' : ''}
              >
                {category.label}
              </button>
            ))}
          </div>
          <span className="storefront-result-count">{visibleProducts.length} محصول</span>
        </div>

        <div className="storefront-product-grid">
          {visibleProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              featured={index === 0 && selectedCategory === 'all'}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {visibleProducts.length === 0 && (
          <div className="storefront-empty-state">محصولی در این دسته‌بندی پیدا نشد.</div>
        )}
      </section>

      <section className="storefront-proof" aria-label="تعهدات تسنیم ترمه">
        <div className="storefront-proof-intro">
          <span>چرا تسنیم؟</span>
          <strong>زیبایی، وقتی ارزشمند است که قابل اعتماد باشد.</strong>
        </div>
        <div className="storefront-proof-item">
          <span>۰۱</span>
          <div><strong>اصالت بافت</strong><p>انتخاب مستقیم از کارگاه‌های یزد</p></div>
        </div>
        <div className="storefront-proof-item">
          <span>۰۲</span>
          <div><strong>قیمت روشن</strong><p>بدون واسطه و هزینه پنهان</p></div>
        </div>
        <div className="storefront-proof-item">
          <span>۰۳</span>
          <div><strong>هدیه آماده</strong><p>بسته‌بندی فاخر برای هر مناسبت</p></div>
        </div>
      </section>

      <section id="about" className="storefront-story">
        <div className="storefront-story-image">
          <Image
            src="/images/artisan-loom.jpg"
            alt="بافنده ترمه در کارگاه سنتی یزد"
            fill
            sizes="(max-width: 767px) 100vw, 42vw"
            className="object-cover"
          />
        </div>
        <div className="storefront-story-copy">
          <div className="storefront-eyebrow storefront-eyebrow-dark">
            <BotehMark className="h-4 w-4 text-brand" />
            <span>از تار و پود تا خانه شما</span>
          </div>
          <h2>یک نقش قدیمی، برای زندگی امروز.</h2>
          <p>
            ترمه برای ما فقط یک پارچه نیست؛ حافظه‌ای است از خانه‌های یزد، از رنگ‌های
            عمیق کویر و دست‌هایی که با حوصله نقش را کامل می‌کنند. ما این میراث را با
            انتخابی دقیق و ارائه‌ای امروزی به خانه‌های امروز می‌آوریم.
          </p>
          <a href="#products" className="storefront-story-link">
            خرید بر اساس کاربرد <span aria-hidden="true">←</span>
          </a>
        </div>
      </section>
    </main>
  );
}
