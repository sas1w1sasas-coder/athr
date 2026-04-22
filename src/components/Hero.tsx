import { motion } from "framer-motion";
import { ArrowDown, MessageCircle, Sparkles } from "lucide-react";
import PerfumeParticles from "./PerfumeParticles";

export default function Hero({ whatsappNumber }: { whatsappNumber: string }) {
  const handleScroll = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`;

  return (
    <section id="hero" className="relative w-full max-w-full min-h-[100svh] flex items-center overflow-hidden pt-20 sm:pt-24">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c0a08] via-[#1a1410] to-[#0c0a08]" />
        <PerfumeParticles />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, opacity: 0.12 }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 0%, rgba(12,10,8,0.5) 100%)" }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24 overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="text-center lg:text-right order-2 lg:order-1 w-full max-w-full overflow-hidden">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.6 }} className="inline-flex w-fit max-w-full items-center gap-2 px-3 py-2 sm:px-4 bg-gold-500/10 border border-gold-400/20 rounded-full mb-5 sm:mb-6 text-center whitespace-normal leading-6">
              <Sparkles className="w-4 h-4 text-gold-400 shrink-0" />
              <span className="text-xs sm:text-sm text-gold-400 font-medium">عطور مختارة بذوق شرقي فاخر</span>
            </motion.div>

            <h1 className="font-serif text-[2.2rem] leading-[1.22] sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-5 sm:mb-6 break-words px-1">
              <span className="text-gold-gradient">أثر</span><br />
              <span className="text-beige-100">عطر يليق بحضورك</span><br />
              <span className="text-beige-100/80 text-[1.85rem] sm:text-4xl lg:text-5xl">ويبقى في الذاكرة</span>
            </h1>

            <p className="text-[1rem] sm:text-lg text-beige-200/70 max-w-md sm:max-w-lg mx-auto lg:mx-0 mb-7 sm:mb-8 leading-8 sm:leading-relaxed px-1">
              ننتقي لك مجموعة عطور شرقية وعصرية تمنحك حضورًا راقيًا من أول نفحة. تجربة تسوق هادئة، طلب مباشر عبر واتساب، وتفاصيل تليق بذوق عميل يبحث عن الفخامة.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-9 sm:mb-12 w-full max-w-md mx-auto lg:mx-0">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleScroll("#products")} className="btn-shine inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 sm:px-8 py-4 bg-gold-500 hover:bg-gold-400 text-dark-900 font-bold text-base rounded-sm transition-colors">
                <ArrowDown className="w-5 h-5" />
                استعرض المنتجات
              </motion.button>
              <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 sm:px-8 py-4 border border-gold-400/30 hover:border-gold-400/60 text-gold-400 font-bold text-base rounded-sm transition-colors">
                <MessageCircle className="w-5 h-5" />
                اطلب عبر واتساب
              </motion.a>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-md mx-auto lg:mx-0">
              {[{ number: "100%", label: "عطور أصلية" }, { number: "24h", label: "تأكيد سريع" }, { number: "+500", label: "عميل يثق بأثر" }].map((point, index) => (
                <motion.div key={point.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }} className="text-center lg:text-right min-w-0">
                  <div className="font-serif text-xl sm:text-2xl font-bold text-gold-400 mb-1">{point.number}</div>
                  <div className="text-xs sm:text-sm text-beige-200/60 leading-5">{point.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut", delay: 0.3 }} className="relative order-1 lg:order-2 w-full max-w-full overflow-hidden">
            <div className="relative aspect-[16/10] sm:aspect-[4/5] w-full max-w-[92vw] sm:max-w-md mx-auto lg:max-w-none overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-gold-500/10 via-transparent to-transparent rounded-lg blur-xl" />
              <div className="relative h-full overflow-hidden rounded-lg border border-gold-400/10 gold-border-glow bg-[#0b0907]">
                <video
                  className="w-full h-full object-cover object-center"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster="/images/hero-perfume.jpg"
                >
                  <source src="/videos/hero-perfume.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/65 via-dark-900/10 to-transparent pointer-events-none" />
              </div>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.6 }} className="hidden sm:block absolute left-3 bottom-3 sm:-left-6 sm:bottom-1/4 max-w-[160px] sm:max-w-none bg-dark-800/95 backdrop-blur-sm border border-gold-400/20 rounded-sm px-3 py-2 sm:px-4 sm:py-3 shadow-xl">
                <div className="text-[11px] sm:text-xs text-gold-400 mb-1">الأكثر طلبًا</div>
                <div className="font-serif text-sm font-bold text-beige-100 leading-6">دهن العود الملكي</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 left-0 h-24 sm:h-32 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
    </section>
  );
}
