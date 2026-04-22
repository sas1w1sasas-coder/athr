import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, ShoppingBag, Eye } from "lucide-react";
import type { Product } from "../data/products";

interface ProductsProps {
  products: Product[];
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  onOpenProduct: (product: Product) => void;
  onOpenCart: () => void;
  onToast: (message: string, type?: "success" | "info") => void;
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  return <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={() => setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg)")} style={{ transform, transition: "transform 0.3s ease-out" }} className={className}>{children}</div>;
}

export default function Products({ products, cart, setCart, onOpenProduct, onOpenCart, onToast }: ProductsProps) {
  const [addedIds, setAddedIds] = useState<Set<number>>(new Set());

  const addToCart = (product: Product) => {
    setCart((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
    setAddedIds((prev) => new Set(prev).add(product.id));
    onToast(`تمت إضافة \"${product.name}\" إلى الطلب`, "success");
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 2000);
  };

  return (
    <section id="products" className="relative py-20 sm:py-28 bg-dark-900 noise-overlay">
      <div className="absolute inset-0 opacity-30 pointer-events-none"><div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-gold-400/20 to-transparent" /></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }} className="text-center mb-16">
          <span className="inline-block text-sm text-gold-400 tracking-widest mb-3 font-medium">التشكيلة المختارة</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-beige-100 mb-4">مجموعة العطور</h2>
          <p className="text-beige-200/60 max-w-2xl mx-auto text-base leading-relaxed">باقة من العطور الشرقية والفرنسية بطابع فاخر، مناسبة للاستخدام اليومي والهدايا والطلبات الخاصة.</p>
          <div className="w-24 h-px bg-gradient-to-l from-transparent via-gold-400 to-transparent mx-auto mt-6" />
        </motion.div>

        <AnimatePresence>
          {cart.length > 0 && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-10">
              <div className="bg-dark-800/80 border border-gold-400/20 rounded-sm p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gold-500/10 rounded-full flex items-center justify-center"><ShoppingBag className="w-5 h-5 text-gold-400" /></div>
                    <div>
                      <div className="text-sm text-beige-200/80">منتجاتك المختارة: <span className="text-gold-400 font-bold">{cart.length}</span></div>
                      <div className="text-xs text-beige-200/50">{cart.map((p) => p.name).join("، ")}</div>
                    </div>
                  </div>
                  <button onClick={onOpenCart} className="btn-shine px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-dark-900 text-sm font-bold rounded-sm transition-colors whitespace-nowrap">عرض السلة</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: index * 0.08 }} className="group">
              <TiltCard className="h-full">
                <div className="card-lift bg-dark-800/40 border border-gold-400/10 rounded-sm overflow-hidden hover:border-gold-400/25 transition-all duration-500 h-full flex flex-col">
                  <div className="relative aspect-square overflow-hidden bg-dark-700 cursor-pointer" onClick={() => onOpenProduct(product)}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover img-zoom" />
                    {product.badge && <div className="absolute top-4 right-4"><span className={`inline-block px-3 py-1 text-xs font-bold text-white rounded-sm ${product.badgeColor || "bg-gold-500"}`}>{product.badge}</span></div>}
                    <div className="absolute inset-0 bg-dark-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"><span className="inline-flex items-center gap-2 px-4 py-2 bg-dark-900/80 border border-gold-400/30 text-gold-400 text-sm rounded-sm backdrop-blur-sm"><Eye className="w-4 h-4" />عرض التفاصيل</span></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  </div>
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="cursor-pointer" onClick={() => onOpenProduct(product)}>
                        <h3 className="font-serif text-xl font-bold text-beige-100 mb-1 group-hover:text-gold-400 transition-colors">{product.name}</h3>
                        <p className="text-sm text-gold-400">{product.subtitle}</p>
                      </div>
                      <span className="text-xs text-beige-200/50 border border-beige-200/20 px-2 py-1 rounded-sm whitespace-nowrap">{product.size}</span>
                    </div>
                    <p className="text-sm text-beige-200/60 leading-relaxed mb-5 line-clamp-2 flex-1">{product.description}</p>
                    <div className="flex items-center justify-between gap-4">
                      <div><span className="font-serif text-2xl font-bold text-gold-400">{product.price.toLocaleString("ar-SA")}</span><span className="text-sm text-beige-200/50 mr-1">ر.س</span></div>
                      <button onClick={() => addToCart(product)} disabled={addedIds.has(product.id)} className={`btn-shine inline-flex items-center gap-2 px-4 py-2.5 rounded-sm text-sm font-bold transition-all duration-300 ${addedIds.has(product.id) ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-gold-500 hover:bg-gold-400 text-dark-900"}`}>
                        {addedIds.has(product.id) ? <><Check className="w-4 h-4" />تمت الإضافة</> : <><Plus className="w-4 h-4" />أضف للطلب</>}
                      </button>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
