import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, ShoppingBag, Eye, Image as ImageIcon } from "lucide-react";
import type { Product } from "../data/products";

interface ProductsProps {
  products: Product[];
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  onOpenProduct: (product: Product) => void;
  onOpenCart: () => void;
  onToast: (message: string, type?: "success" | "info") => void;
}

const ui = {
  addedToCart: "\u062a\u0645\u062a \u0625\u0636\u0627\u0641\u0629",
  selectedCollection: "\u0627\u0644\u062a\u0634\u0643\u064a\u0644\u0629 \u0627\u0644\u0645\u062e\u062a\u0627\u0631\u0629",
  productsTitle: "\u0645\u062c\u0645\u0648\u0639\u0629 \u0627\u0644\u0639\u0637\u0648\u0631",
  productsDescription: "\u0628\u0627\u0642\u0629 \u0645\u0646 \u0627\u0644\u0639\u0637\u0648\u0631 \u0627\u0644\u0634\u0631\u0642\u064a\u0629 \u0648\u0627\u0644\u0641\u0631\u0646\u0633\u064a\u0629 \u0628\u0637\u0627\u0628\u0639 \u0641\u0627\u062e\u0631\u060c \u0645\u0646\u0627\u0633\u0628\u0629 \u0644\u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u064a\u0648\u0645\u064a \u0648\u0627\u0644\u0647\u062f\u0627\u064a\u0627 \u0648\u0627\u0644\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u062e\u0627\u0635\u0629.",
  selectedProducts: "\u0645\u0646\u062a\u062c\u0627\u062a\u0643 \u0627\u0644\u0645\u062e\u062a\u0627\u0631\u0629",
  viewCart: "\u0639\u0631\u0636 \u0627\u0644\u0633\u0644\u0629",
  noImage: "\u0644\u0627 \u062a\u0648\u062c\u062f \u0635\u0648\u0631\u0629",
  viewDetails: "\u0639\u0631\u0636 \u0627\u0644\u062a\u0641\u0627\u0635\u064a\u0644",
  currency: "\u0631.\u0633",
  added: "\u062a\u0645\u062a \u0627\u0644\u0625\u0636\u0627\u0641\u0629",
  addToOrder: "\u0623\u0636\u0641 \u0644\u0644\u0637\u0644\u0628",
};

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
      if (prev.find((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
    setAddedIds((prev) => new Set(prev).add(product.id));
    onToast(`${ui.addedToCart} \"${product.name}\" \u0625\u0644\u0649 \u0627\u0644\u0637\u0644\u0628`, "success");
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
          <span className="inline-block text-sm text-gold-400 tracking-widest mb-3 font-medium">{ui.selectedCollection}</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-beige-100 mb-4">{ui.productsTitle}</h2>
          <p className="text-beige-200/60 max-w-2xl mx-auto text-base leading-relaxed">{ui.productsDescription}</p>
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
                      <div className="text-sm text-beige-200/80">{ui.selectedProducts}: <span className="text-gold-400 font-bold">{cart.length}</span></div>
                      <div className="text-xs text-beige-200/50">{cart.map((item) => item.name).join("\u060c ")}</div>
                    </div>
                  </div>
                  <button onClick={onOpenCart} className="btn-shine px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-dark-900 text-sm font-bold rounded-sm transition-colors whitespace-nowrap">{ui.viewCart}</button>
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
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-dark-700 via-dark-800 to-[#16110a] cursor-pointer flex items-center justify-center" onClick={() => onOpenProduct(product)}>
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover object-center img-zoom" />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-beige-200/50">
                        <ImageIcon className="w-8 h-8" />
                        <span className="text-sm">{ui.noImage}</span>
                      </div>
                    )}
                    {product.badge && <div className="absolute top-4 right-4"><span className={`inline-block px-3 py-1 text-xs font-bold text-white rounded-sm ${product.badgeColor || "bg-gold-500"}`}>{product.badge}</span></div>}
                    <div className="absolute inset-0 bg-dark-900/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"><span className="inline-flex items-center gap-2 px-4 py-2 bg-dark-900/80 border border-gold-400/30 text-gold-400 text-sm rounded-sm backdrop-blur-sm"><Eye className="w-4 h-4" />{ui.viewDetails}</span></div>
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-dark-900/85 via-dark-900/15 to-transparent opacity-90 transition-opacity duration-500" />
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
                      <div><span className="font-serif text-2xl font-bold text-gold-400">{product.price.toLocaleString("ar-SA")}</span><span className="text-sm text-beige-200/50 mr-1">{ui.currency}</span></div>
                      <button onClick={() => addToCart(product)} disabled={addedIds.has(product.id)} className={`btn-shine inline-flex items-center gap-2 px-4 py-2.5 rounded-sm text-sm font-bold transition-all duration-300 ${addedIds.has(product.id) ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-gold-500 hover:bg-gold-400 text-dark-900"}`}>
                        {addedIds.has(product.id) ? <><Check className="w-4 h-4" />{ui.added}</> : <><Plus className="w-4 h-4" />{ui.addToOrder}</>}
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
