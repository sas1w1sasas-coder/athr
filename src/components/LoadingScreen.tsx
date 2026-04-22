import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isSmallScreen = window.innerWidth < 640;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isSmallScreen || prefersReducedMotion) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-dark-900 flex flex-col items-center justify-center"
          dir="rtl"
        >
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100 }}
                animate={{
                  opacity: [0, 0.5, 0],
                  y: [-50, -240],
                  x: [0, (i % 2 === 0 ? 1 : -1) * (24 + Math.random() * 36)],
                }}
                transition={{
                  duration: 1.6 + Math.random() * 0.8,
                  repeat: Infinity,
                  delay: Math.random() * 1.2,
                  ease: "easeOut",
                }}
                className="absolute w-1 h-1 bg-gold-400 rounded-full"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  bottom: "0%",
                }}
              />
            ))}
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: "easeOut" }} className="relative">
            <motion.h1
              className="font-serif text-6xl sm:text-8xl font-bold text-gold-400"
              animate={{
                textShadow: [
                  "0 0 16px rgba(201,169,110,0.2)",
                  "0 0 28px rgba(201,169,110,0.45)",
                  "0 0 16px rgba(201,169,110,0.2)",
                ],
              }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              أثر
            </motion.h1>

            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }} className="absolute -bottom-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent origin-center" />
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="mt-6 text-beige-200/40 text-sm tracking-widest">
            عطور تترك أثرًا
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
