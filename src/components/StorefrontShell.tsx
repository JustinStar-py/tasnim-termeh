'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { TopBar } from './TopBar';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer, type CartItem } from './CartDrawer';
import { ProductQuickView } from './ProductQuickView';
import { ConsultationModal } from './ConsultationModal';
import { FloatingActions } from './FloatingActions';
import type { ProductItem } from './BestsellersBand';

interface StorefrontContextValue {
  selectedCategory: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectCategory: (category: string) => void;
  onAddToCart: (product: ProductItem) => void;
  onQuickView: (product: ProductItem) => void;
  onOpenConsultation: () => void;
}

const StorefrontContext = createContext<StorefrontContextValue | null>(null);

export function useStorefront() {
  const context = useContext(StorefrontContext);
  if (!context) throw new Error('useStorefront must be used within StorefrontShell');
  return context;
}

export function StorefrontShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const showProducts = () => {
    if (pathname !== '/') {
      router.push('/#products');
    } else {
      document.getElementById('products')?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      });
    }
  };

  const onSelectCategory = (category: string) => {
    setSelectedCategory(category);
    showProducts();
  };

  const onAddToCart = (product: ProductItem) => {
    setCartItems((items) => items.some((item) => item.product.id === product.id)
      ? items.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...items, { product, quantity: 1 }]);
    setQuickViewProduct(null);
    setIsCartOpen(true);
  };

  const onOpenConsultation = () => setIsConsultationOpen(true);

  return (
    <StorefrontContext.Provider value={{ selectedCategory, searchQuery, onSearchChange: setSearchQuery, onSelectCategory, onAddToCart, onQuickView: setQuickViewProduct, onOpenConsultation }}>
      <div className="flex min-h-screen flex-col bg-sand font-sans text-ink selection:bg-gold/30 selection:text-brand">
        <a href="#main-content" className="skip-link">رفتن به محتوای اصلی</a>
        <TopBar />
        <Header
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={showProducts}
          onSelectCategory={onSelectCategory}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenConsultation={onOpenConsultation}
        />
        <div id="main-content" tabIndex={-1} className="flex-1 scroll-mt-32 outline-none">{children}</div>
        <Footer />
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={(id, quantity) => setCartItems((items) => items.map((item) => item.product.id === id ? { ...item, quantity } : item))}
          onRemoveItem={(id) => setCartItems((items) => items.filter((item) => item.product.id !== id))}
          onCheckout={() => { setIsCartOpen(false); onOpenConsultation(); }}
        />
        <ProductQuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} onAddToCart={onAddToCart} />
        <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
        <FloatingActions onOpenConsultation={onOpenConsultation} />
      </div>
    </StorefrontContext.Provider>
  );
}
