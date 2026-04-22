import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, CreditCard, Smartphone, Landmark } from "lucide-react";
import type { Product } from "../data/products";
import type { CreateOrderInput } from "../store/storeDefaults";

interface OrderSectionProps {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  whatsappNumber: string;
  onSubmitOrder: (payload: CreateOrderInput) => Promise<{ success: boolean; orderId: string }>;
}

const paymentMethods = [
  { id: "instapay", label: "إنستاباي", icon: CreditCard },
  { id: "vodafone", label: "فودافون كاش", icon: Smartphone },
  { id: "bank", label: "تحويل بنكي", icon: Landmark },
  { id: "whatsapp", label: "واتساب لتأكيد التحويل", icon: MessageCircle },
];

export default function OrderSection({ cart, setCart, whatsappNumber, onSubmitOrder }: OrderSectionProps) {
  const [formData, setFormData] = useState({ name: "", phone: "", city: "", notes: "", paymentMethod: "" });

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.city || !formData.paymentMethod) return;

    const orderItems = cart.map((p) => ({ name: p.name, price: p.price, qty: 1 }));
    const result = await onSubmitOrder({
      customerName: formData.name,
      phone: formData.phone,
      city: formData.city,
      paymentMethod: paymentMethods.find((m) => m.id === formData.paymentMethod)?.label ?? formData.paymentMethod,
      notes: formData.notes,
      items: orderItems,
    });

    const productsText = cart.length > 0 ? cart.map((p) => `- ${p.name} (${p.size}) - ${p.price.toLocaleString("ar-EG")} ج.م`).join("\n") : "لم يتم اختيار منتجات بعد";
    const total = cart.reduce((sum, p) => sum + p.price, 0);
    const message = `طلب جديد من متجر أثر\n\nرقم الطلب: ${result.orderId}\nالاسم: ${formData.name}\nرقم الهاتف: ${formData.phone}\nالمدينة: ${formData.city}\nطريقة الدفع: ${paymentMethods.find((m) => m.id === formData.paymentMethod)?.label}\n\nالمنتجات:\n${productsText}\n\nالإجمالي: ${total.toLocaleString("ar-EG")} ج.م\n\nملاحظات: ${formData.notes || "لا توجد ملاحظات"}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodedMessage}`, "_blank");
    setCart([]);
  };

  const removeFromCart = (id: number) => setCart((prev) => prev.filter((p) => p.id !== id));
  const total = cart.reduce((sum, p) => sum + p.price, 0);

  return (
    <section id="order" className="relative py-20 sm:py-28 bg-dark-800 noise-overlay">
      <div className="absolute inset-0 pointer-events-none"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[600px] sm:h-[600px] bg-gold-500/3 rounded-full blur-3xl" /></div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.7 }} className="text-center mb-16">
          <span className="inline-block text-sm text-gold-400 tracking-widest mb-3 font-medium">طلب يدوي مباشر</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-beige-100 mb-4">أرسل طلبك عبر واتساب</h2>
          <p className="text-beige-200/60 max-w-2xl mx-auto text-base leading-relaxed">اختر العطور التي تناسبك، ثم اترك بياناتك وسنجهز لك رسالة طلب جاهزة على واتساب لتأكيد الطلب والدفع بسهولة.</p>
          <div className="w-24 h-px bg-gradient-to-l from-transparent via-gold-400 to-transparent mx-auto mt-6" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, delay: 0.1 }} className="bg-dark-900/60 border border-gold-400/15 rounded-sm p-6 sm:p-10">
          {cart.length > 0 && (
            <div className="mb-8 pb-8 border-b border-gold-400/10">
              <h3 className="font-serif text-lg font-bold text-beige-100 mb-4">المنتجات المختارة</h3>
              <div className="space-y-3">
                {cart.map((product) => (
                  <div key={product.id} className="flex items-center justify-between bg-dark-800/60 border border-gold-400/10 rounded-sm p-3">
                    <div className="flex items-center gap-3"><img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-sm" /><div><div className="text-sm font-bold text-beige-100">{product.name}</div><div className="text-xs text-beige-200/50">{product.size}</div></div></div>
                    <div className="flex items-center gap-4"><span className="text-sm font-bold text-gold-400">{product.price.toLocaleString("ar-EG")} ج.م</span><button onClick={() => removeFromCart(product.id)} className="text-xs text-beige-200/40 hover:text-red-400 transition-colors px-2 py-1">إزالة</button></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gold-400/10"><span className="text-sm text-beige-200/70">الإجمالي</span><span className="font-serif text-xl font-bold text-gold-400">{total.toLocaleString("ar-EG")} ج.م</span></div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-5 mb-6">
            <div><label className="block text-sm font-medium text-beige-200/80 mb-2">الاسم الكامل <span className="text-gold-400">*</span></label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="اكتب اسمك الكامل" className="w-full px-4 py-3 bg-dark-800 border border-gold-400/15 rounded-sm text-beige-100 placeholder:text-beige-200/30 text-sm transition-all duration-300" /></div>
            <div><label className="block text-sm font-medium text-beige-200/80 mb-2">رقم الهاتف <span className="text-gold-400">*</span></label><input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="05xxxxxxxx" className="w-full px-4 py-3 bg-dark-800 border border-gold-400/15 rounded-sm text-beige-100 placeholder:text-beige-200/30 text-sm transition-all duration-300" /></div>
          </div>

          <div className="mb-6"><label className="block text-sm font-medium text-beige-200/80 mb-2">المدينة <span className="text-gold-400">*</span></label><input type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} placeholder="مثال: القاهرة أو الإسكندرية أو الجيزة" className="w-full px-4 py-3 bg-dark-800 border border-gold-400/15 rounded-sm text-beige-100 placeholder:text-beige-200/30 text-sm transition-all duration-300" /></div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-beige-200/80 mb-3">طريقة الدفع <span className="text-gold-400">*</span></label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {paymentMethods.map((method) => (
                <button key={method.id} onClick={() => setFormData({ ...formData, paymentMethod: method.id })} className={`flex flex-col items-center gap-2 p-4 rounded-sm border transition-all duration-300 ${formData.paymentMethod === method.id ? "bg-gold-500/10 border-gold-400/40 text-gold-400" : "bg-dark-800 border-gold-400/10 text-beige-200/60 hover:border-gold-400/25"}`}>
                  <method.icon className="w-6 h-6" />
                  <span className="text-xs font-medium text-center">{method.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8"><label className="block text-sm font-medium text-beige-200/80 mb-2">ملاحظات إضافية</label><textarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder="أي ملاحظات خاصة بالتغليف أو التوصيل أو طريقة التواصل" rows={3} className="w-full px-4 py-3 bg-dark-800 border border-gold-400/15 rounded-sm text-beige-100 placeholder:text-beige-200/30 text-sm transition-all duration-300 resize-none" /></div>

          <button onClick={() => void handleSubmit()} disabled={!formData.name || !formData.phone || !formData.city || !formData.paymentMethod} className={`btn-shine w-full flex items-center justify-center gap-3 px-8 py-4 rounded-sm text-base font-bold transition-all duration-300 ${!formData.name || !formData.phone || !formData.city || !formData.paymentMethod ? "bg-dark-700 text-beige-200/30 cursor-not-allowed" : "bg-gold-500 hover:bg-gold-400 text-dark-900"}`}>
            <Send className="w-5 h-5" />
            إرسال الطلب على واتساب
          </button>

          <p className="text-center text-xs text-beige-200/40 mt-4">سيتم فتح واتساب برسالة طلب جاهزة تتضمن المنتجات والبيانات التي أدخلتها.</p>
        </motion.div>
      </div>
    </section>
  );
}


