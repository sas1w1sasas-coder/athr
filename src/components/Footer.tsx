import { motion } from "framer-motion";
import { MessageCircle, Mail, Clock, MapPin } from "lucide-react";
import type { StoreSettings } from "../store/storeDefaults";

export default function Footer({ settings }: { settings: StoreSettings }) {
  const whatsappLink = `https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`;

  return (
    <footer id="contact" className="relative bg-dark-900 noise-overlay">
      <div className="section-divider" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-2">
            <h3 className="font-serif text-3xl font-bold text-gold-400 mb-4">{settings.storeName}</h3>
            <p className="text-beige-200/60 leading-relaxed max-w-md text-sm sm:text-base mb-6">
              نؤمن أن العطر ليس مجرد رائحة جميلة، بل حضور يترك انطباعًا طويلًا. لذلك صممنا هذه التجربة لتكون هادئة، أنيقة، ومناسبة لعلامة عطور تبحث عن مستوى أعلى من التقديم.
            </p>
            <div className="flex items-center gap-2 text-sm text-beige-200/40"><MapPin className="w-4 h-4 text-gold-400/60" /><span>المملكة العربية السعودية</span></div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <h4 className="font-serif text-lg font-bold text-beige-100 mb-5">تواصل معنا</h4>
            <div className="space-y-4">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-beige-200/60 hover:text-gold-400 transition-colors"><div className="w-8 h-8 bg-gold-500/10 rounded-sm flex items-center justify-center"><MessageCircle className="w-4 h-4 text-gold-400" /></div><span>واتساب: +{settings.whatsapp.replace(/\D/g, "")}</span></a>
              <a href={`mailto:${settings.email}`} className="flex items-center gap-3 text-sm text-beige-200/60 hover:text-gold-400 transition-colors"><div className="w-8 h-8 bg-gold-500/10 rounded-sm flex items-center justify-center"><Mail className="w-4 h-4 text-gold-400" /></div><span>{settings.email}</span></a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h4 className="font-serif text-lg font-bold text-beige-100 mb-5">أوقات العمل</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-beige-200/60"><div className="w-8 h-8 bg-gold-500/10 rounded-sm flex items-center justify-center"><Clock className="w-4 h-4 text-gold-400" /></div><div><div>خدمة العملاء</div><div className="text-gold-400">{settings.workingHours}</div></div></div>
            </div>
          </motion.div>
        </div>

        <div className="pt-8 border-t border-gold-400/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-beige-200/30">{settings.storeName} - جميع الحقوق محفوظة {new Date().getFullYear()}</p>
            <p className="text-xs text-beige-200/30">عطور فاخرة بطابع شرقي معاصر</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
