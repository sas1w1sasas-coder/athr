import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton({ whatsappNumber }: { whatsappNumber: string }) {
  return (
    <motion.a
      href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-green-600 hover:bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-900/30 transition-colors duration-300"
      aria-label="تواصل عبر واتساب"
    >
      <MessageCircle className="w-7 h-7 text-white fill-white" />
      <span className="absolute inset-0 rounded-full bg-green-600 animate-ping opacity-20" />
    </motion.a>
  );
}
