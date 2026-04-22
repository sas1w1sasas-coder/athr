import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ShoppingBag } from "lucide-react";
import type { Product } from "../data/products";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  inCart: boolean;
  onAddToCart: (product: Product) => void;
}

export default function ProductModal({ product, onClose, inCart, onAddToCart }: ProductModalProps) {
  if (!product) return null;

  const noteColors = [
    "bg-gold-500/20 text-gold-400 border-gold-500/30",
    "bg-brown-500/20 text-amber-300 border-brown-500/30",
    "bg-beige-200/10 text-beige-200 border-beige-200/20",
  ];

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-dark-900/90 backdrop-blur-md" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-dark-800 border border-gold-400/20 rounded-sm shadow-2xl"
            dir="rtl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 left-4 z-10 w-10 h-10 bg-dark-900/80 border border-gold-400/20 rounded-full flex items-center justify-center hover:bg-gold-500/10 hover:border-gold-400/40 transition-all"
            >
              <X className="w-5 h-5 text-beige-200" />
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative aspect-square md:aspect-auto md:min-h-[500px] overflow-hidden bg-dark-700">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <div className="absolute top-4 right-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-bold text-white rounded-sm ${
                        product.badgeColor || "bg-gold-500"
                      }`}
                    >
                      {product.badge}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-800/60 via-transparent to-transparent" />
              </div>

              <div className="p-6 sm:p-8 flex flex-col">
                <div className="mb-6">
                  <p className="text-sm text-gold-400 mb-2">{product.subtitle}</p>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-beige-100 mb-4">
                    {product.name}
                  </h2>
                  <p className="text-beige-200/70 leading-relaxed text-sm sm:text-base">
                    {product.longDescription || product.description}
                  </p>
                </div>

                {product.notes && (
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-beige-100 mb-4 flex items-center gap-2">
                      <span className="w-6 h-px bg-gold-400/40" />
                      مكونات العطر
                    </h3>
                    <div className="space-y-3">
                      {[
                        { label: "الافتتاحية", items: product.notes.top, color: noteColors[0] },
                        { label: "القلب", items: product.notes.middle, color: noteColors[1] },
                        { label: "القاعدة", items: product.notes.base, color: noteColors[2] },
                      ].map((layer) => (
                        <div key={layer.label} className="flex flex-wrap items-center gap-2">
                          <span className="text-xs text-beige-200/50 w-20 shrink-0">{layer.label}</span>
                          <div className="flex flex-wrap gap-1.5">
                            {layer.items.map((note) => (
                              <span
                                key={note}
                                className={`px-2.5 py-1 text-xs rounded-sm border ${layer.color}`}
                              >
                                {note}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mb-6 pt-4 border-t border-gold-400/10">
                  <div>
                    <span className="font-serif text-3xl font-bold text-gold-400">
                      {product.price.toLocaleString("ar-EG")}
                    </span>
                    <span className="text-sm text-beige-200/50 mr-2">ج.م</span>
                  </div>
                  <span className="text-sm text-beige-200/50 border border-beige-200/20 px-3 py-1.5 rounded-sm">
                    {product.size}
                  </span>
                </div>

                <div className="mt-auto space-y-3">
                  <button
                    onClick={() => {
                      onAddToCart(product);
                    }}
                    disabled={inCart}
                    className={`w-full btn-shine inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm text-sm font-bold transition-all duration-300 ${
                      inCart
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-gold-500 hover:bg-gold-400 text-dark-900"
                    }`}
                  >
                    {inCart ? (
                      <>
                        <Check className="w-4 h-4" />
                        تمت الإضافة إلى السلة
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        أضف للطلب
                      </>
                    )}
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full px-6 py-3 border border-gold-400/20 text-beige-200/70 text-sm rounded-sm hover:border-gold-400/40 hover:text-beige-100 transition-all"
                  >
                    متابعة التصفح
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

