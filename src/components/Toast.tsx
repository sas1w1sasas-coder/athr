import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ShoppingBag } from "lucide-react";

export interface ToastItem {
  id: string;
  message: string;
  type?: "success" | "info";
}

interface ToastProps {
  toasts: ToastItem[];
  removeToast: (id: string) => void;
}

export default function Toast({ toasts, removeToast }: ToastProps) {
  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[110] flex flex-col gap-2 w-full max-w-sm px-4 pointer-events-none" dir="rtl">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="pointer-events-auto"
          >
            <ToastItemComponent toast={toast} onRemove={() => removeToast(toast.id)} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItemComponent({ toast, onRemove }: { toast: ToastItem; onRemove: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onRemove, 3000);
    return () => clearTimeout(timer);
  }, [onRemove]);

  const isSuccess = toast.type === "success";

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-sm border shadow-lg backdrop-blur-md ${
        isSuccess
          ? "bg-dark-800/95 border-green-500/20"
          : "bg-dark-800/95 border-gold-400/20"
      }`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          isSuccess ? "bg-green-500/15" : "bg-gold-500/15"
        }`}
      >
        {isSuccess ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <ShoppingBag className="w-4 h-4 text-gold-400" />
        )}
      </div>
      <p className="text-sm text-beige-100 flex-1">{toast.message}</p>
      <button
        onClick={onRemove}
        className="w-6 h-6 flex items-center justify-center text-beige-200/30 hover:text-beige-100 transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
