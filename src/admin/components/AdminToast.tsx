import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";

export interface AdminToastItem {
  id: string;
  message: string;
  tone?: "success" | "info";
}

export default function AdminToast({
  toasts,
  removeToast,
}: {
  toasts: AdminToastItem[];
  removeToast: (id: string) => void;
}) {
  return (
    <div className="fixed top-20 left-1/2 z-[120] w-full max-w-sm -translate-x-1/2 px-4 pointer-events-none" dir="rtl">
      <AnimatePresence>
        {toasts.map((toast) => {
          const isSuccess = toast.tone !== "info";
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className={`mb-3 pointer-events-auto rounded-2xl border px-4 py-3 shadow-xl backdrop-blur-xl ${
                isSuccess
                  ? "border-emerald-500/30 bg-[#141414]/95 text-[#e8e0d4]"
                  : "border-[#c9a96e]/30 bg-[#141414]/95 text-[#e8e0d4]"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 shrink-0 ${isSuccess ? "text-emerald-400" : "text-[#c9a96e]"}`}>
                  {isSuccess ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                </div>
                <div className="flex-1 text-sm leading-6">{toast.message}</div>
                <button
                  type="button"
                  onClick={() => removeToast(toast.id)}
                  className="shrink-0 text-xs text-[#8a8279] hover:text-[#e8e0d4] transition-colors"
                >
                  إغلاق
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
