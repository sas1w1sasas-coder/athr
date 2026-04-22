import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, ArrowLeft } from "lucide-react";
import type { Product } from "../data/products";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function CartSidebar({ isOpen, onClose, cart, setCart }: CartSidebarProps) {
  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const total = cart.reduce((sum, p) => sum + p.price, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-dark-900/70 backdrop-blur-sm z-[90]"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-dark-800 border-l border-gold-400/20 shadow-2xl z-[95] flex flex-col"
            dir="rtl"
          >
            <div className="flex items-center justify-between p-6 border-b border-gold-400/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-gold-400" />
                <h2 className="font-serif text-xl font-bold text-beige-100">سلة الطلبات</h2>
                <span className="w-6 h-6 bg-gold-500 text-dark-900 text-xs font-bold rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 border border-gold-400/20 rounded-full flex items-center justify-center hover:bg-gold-500/10 hover:border-gold-400/40 transition-all"
              >
                <X className="w-4 h-4 text-beige-200" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-gold-400/20 mb-4" />
                  <p className="text-beige-200/50 text-sm">السلة فارغة حتى الآن</p>
                  <p className="text-beige-200/30 text-xs mt-1">أضف عطرك المفضل لتبدأ الطلب</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="flex gap-4 bg-dark-900/50 border border-gold-400/10 rounded-sm p-3"
                    >
                      <div className="w-20 h-20 shrink-0 overflow-hidden rounded-sm bg-dark-700">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-sm font-bold text-beige-100 truncate">
                          {product.name}
                        </h3>
                        <p className="text-xs text-gold-400 mt-0.5">{product.subtitle}</p>
                        <p className="text-xs text-beige-200/40 mt-1">{product.size}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-bold text-gold-400">
                            {product.price.toLocaleString("ar-EG")} ج.م
                          </span>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="w-7 h-7 flex items-center justify-center text-beige-200/30 hover:text-red-400 hover:bg-red-500/10 rounded-sm transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-gold-400/10 bg-dark-900/30">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-beige-200/70 text-sm">الإجمالي</span>
                  <span className="font-serif text-2xl font-bold text-gold-400">
                    {total.toLocaleString("ar-EG")} ج.م
                  </span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    setTimeout(() => {
                      const element = document.querySelector("#order");
                      if (element) element.scrollIntoView({ behavior: "smooth" });
                    }, 300);
                  }}
                  className="w-full btn-shine bg-gold-500 hover:bg-gold-400 text-dark-900 font-bold py-3.5 rounded-sm text-sm transition-colors flex items-center justify-center gap-2"
                >
                  أكمل الطلب
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

