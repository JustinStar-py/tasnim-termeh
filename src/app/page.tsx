'use client';

import React, { useState } from 'react';
import { TopBar } from '@/components/TopBar';
import { Header } from '@/components/Header';
import { HeroMasterpiece } from '@/components/HeroMasterpiece';
import { CategoryArches } from '@/components/CategoryArches';
import { BestsellersBand, ProductItem } from '@/components/BestsellersBand';
import { CollectionSpotlight } from '@/components/CollectionSpotlight';
import { CuratedPicks } from '@/components/CuratedPicks';
import { ShahneshinFeature } from '@/components/ShahneshinFeature';
import { CorporateGiftSection } from '@/components/CorporateGiftSection';
import { ProductCatalog } from '@/components/ProductCatalog';
import { ValueProps } from '@/components/ValueProps';
import { SeoHeritageStory } from '@/components/SeoHeritageStory';
import { TermehMagazine } from '@/components/TermehMagazine';
import { Footer } from '@/components/Footer';
import { CartDrawer, CartItem } from '@/components/CartDrawer';
import { ProductQuickView } from '@/components/ProductQuickView';
import { ConsultationModal } from '@/components/ConsultationModal';
import { FloatingActions } from '@/components/FloatingActions';
import { ScrollRevealObserver } from '@/components/ScrollRevealObserver';

import { GlobalIslamicClipDefs } from '@/components/motifs';

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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: allProducts[0], quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  // Cart operations
  const handleAddToCart = (product: ProductItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: number, newQty: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    const elem = document.getElementById('products');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-sand text-ink flex flex-col font-sans selection:bg-gold/30 selection:text-brand">
      {/* Global SVG Islamic Arch Clip Paths */}
      <GlobalIslamicClipDefs />

      {/* 1. Top Utility Notification Bar */}
      <TopBar />

      {/* 2. Sticky Header with Mega-Menu & Cart */}
      <Header
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      {/* Scroll-Triggered Reveal Engine */}
      <ScrollRevealObserver />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 3. Yazdi Girih Burgundy-Gold Termeh Mosaic & Floating Cartouche Hero */}
        <HeroMasterpiece onOpenConsultation={() => setIsConsultationOpen(true)} />

        {/* 4. Mihrab Arch Category Cards */}
        <div className="reveal-init">
          <CategoryArches onSelectCategory={handleCategorySelect} />
        </div>

        {/* 5. Bestsellers Band (Burgundy Girih Carousel) */}
        <div className="reveal-init">
          <BestsellersBand
            products={allProducts}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        </div>

        {/* 6. Collection / Motif Spotlight Blocks */}
        <div className="reveal-init">
          <CollectionSpotlight onExploreCollection={handleCategorySelect} />
        </div>

        {/* 7. Curated Artisan Picks (Editorial Layout) */}
        <div className="reveal-init">
          <CuratedPicks
            products={allProducts}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            onOpenConsultation={() => setIsConsultationOpen(true)}
          />
        </div>

        {/* 8. Flagship Shahneshin Feature */}
        <div className="reveal-init">
          <ShahneshinFeature onOpenConsultation={() => setIsConsultationOpen(true)} />
        </div>

        {/* 9. Corporate Gift Boxes Section */}
        <div className="reveal-init">
          <CorporateGiftSection onOpenConsultation={() => setIsConsultationOpen(true)} />
        </div>

        {/* 10. Complete Interactive Product Catalog */}
        <div className="reveal-init">
          <ProductCatalog
            products={allProducts}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        </div>

        {/* 11. Value Propositions (4 Soft-Tinted Motif Cards) */}
        <div className="reveal-init">
          <ValueProps />
        </div>

        {/* 12. SEO & UNESCO Yazd Heritage Story */}
        <div className="reveal-init">
          <SeoHeritageStory />
        </div>

        {/* 13. Termeh Magazine Strip */}
        <div className="reveal-init">
          <TermehMagazine />
        </div>
      </main>

      {/* 14. Luxury Persian Footer */}
      <Footer />

      {/* 15. Slide-Over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsConsultationOpen(true);
        }}
      />

      {/* 16. Product Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 17. Consultation / Custom Order Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      {/* 18. Floating Support & Discount Actions */}
      <FloatingActions onOpenConsultation={() => setIsConsultationOpen(true)} />
    </div>
  );
}
