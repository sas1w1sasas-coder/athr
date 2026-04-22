import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-dark-900 flex flex-col items-center justify-center"
          dir="rtl"
        >
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100 }}
                animate={{
                  opacity: [0, 0.6, 0],
                  y: [-50, -300],
                  x: [0, (i % 2 === 0 ? 1 : -1) * (30 + Math.random() * 50)],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
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

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <motion.h1
              className="font-serif text-6xl sm:text-8xl font-bold text-gold-400"
              animate={{
                textShadow: [
                  "0 0 20px rgba(201,169,110,0.2)",
                  "0 0 40px rgba(201,169,110,0.5)",
                  "0 0 20px rgba(201,169,110,0.2)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              أثر
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              className="absolute -bottom-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent origin-center"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 text-beige-200/40 text-sm tracking-widest"
          >
            عطور تترك أثرًا
          </motion.p>

          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-dark-800">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-full bg-gradient-to-l from-gold-400 to-gold-600 origin-right"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
