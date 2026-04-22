import { useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Benefits from "./components/Benefits";
import Products from "./components/Products";
import OrderSection from "./components/OrderSection";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ProductModal from "./components/ProductModal";
import CartSidebar from "./components/CartSidebar";
import Toast, { type ToastItem } from "./components/Toast";
import ScrollToTop from "./components/ScrollToTop";
import LoadingScreen from "./components/LoadingScreen";
import type { Product } from "./data/products";
import { useStore } from "./store/StoreProvider";

export default function Storefront() {
  const { storefrontProducts, settings, createOrder } = useStore();
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((message: string, type?: "success" | "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  }, []);

  const isInCart = (product: Product) => cart.some((p) => p.id === product.id);

  return (
    <div className="min-h-screen bg-dark-900 text-beige-100" dir="rtl">
      <LoadingScreen />
      <Navbar onOpenCart={() => setIsCartOpen(true)} cartCount={cart.length} />
      <main>
        <Hero whatsappNumber={settings.whatsapp} />
        <Benefits />
        <Products products={storefrontProducts} cart={cart} setCart={setCart} onOpenProduct={setSelectedProduct} onOpenCart={() => setIsCartOpen(true)} onToast={addToast} />
        <OrderSection cart={cart} setCart={setCart} whatsappNumber={settings.whatsapp} onSubmitOrder={createOrder} />
        <Testimonials />
        <FAQ />
      </main>
      <Footer settings={settings} />
      <WhatsAppButton whatsappNumber={settings.whatsapp} />
      <ScrollToTop />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} setCart={setCart} />
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        inCart={selectedProduct ? isInCart(selectedProduct) : false}
        onAddToCart={(p) => {
          addToCart(p);
          addToast(`تمت إضافة \"${p.name}\" إلى السلة`, "success");
        }}
      />
      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
