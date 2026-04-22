import { motion } from "framer-motion";
import { Gem, Package, Gift, MessageCircleCheck } from "lucide-react";

const benefits = [
  {
    icon: Gem,
    title: "عطور مختارة بعناية",
    description:
      "ننتقي كل عطر من تشكيلات تحمل جودة واضحة وثباتًا مميزًا حتى تصل للعميل تجربة تليق باسم البراند.",
  },
  {
    icon: Package,
    title: "تجربة طلب سهلة",
    description:
      "يستعرض العميل العطور، يضيف ما يناسبه، ثم يرسل الطلب مباشرة عبر واتساب بخطوات بسيطة وواضحة.",
  },
  {
    icon: Gift,
    title: "تغليف راقٍ للهدايا",
    description:
      "التقديم جزء من التجربة، لذلك تظهر المنتجات بصورة فاخرة مناسبة للهدايا والمناسبات الخاصة.",
  },
  {
    icon: MessageCircleCheck,
    title: "تأكيد سريع عبر واتساب",
    description:
      "التواصل المباشر يختصر الوقت ويمنح العميل ثقة أكبر في متابعة الطلب وطريقة الدفع والتوصيل.",
  },
];

export default function Benefits() {
  return (
    <section className="relative py-20 sm:py-28 bg-dark-900 noise-overlay">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm text-gold-400 tracking-widest mb-3 font-medium">
            لماذا أثر
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-beige-100 mb-4">
            تفاصيل صنعت لتبقى
          </h2>
          <div className="w-24 h-px bg-gradient-to-l from-transparent via-gold-400 to-transparent mx-auto" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="card-lift relative bg-dark-800/50 border border-gold-400/10 rounded-sm p-6 sm:p-8 h-full hover:border-gold-400/25 transition-colors duration-500">
                <div className="w-12 h-12 flex items-center justify-center bg-gold-500/10 border border-gold-400/20 rounded-sm mb-6 group-hover:bg-gold-500/20 transition-colors duration-500">
                  <benefit.icon className="w-6 h-6 text-gold-400" />
                </div>

                <h3 className="font-serif text-xl font-bold text-beige-100 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-sm text-beige-200/60 leading-relaxed">
                  {benefit.description}
                </p>

                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-sm">
                  <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-gold-400/30 to-transparent" />
                  <div className="absolute top-0 right-0 h-px w-8 bg-gradient-to-l from-gold-400/30 to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
