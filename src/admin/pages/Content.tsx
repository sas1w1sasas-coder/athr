import { useState } from "react";
import { Save, Type, MessageSquare, HelpCircle, Plus, Trash2, GripVertical } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
}

export default function Content() {
  const [hero, setHero] = useState({
    eyebrow: "عطور فاخرة بطابع شرقي أنيق",
    title: "واجهة تليق بعطورك وتمنح العميل تجربة أرقى",
    accent: "أثر",
    description: "نقدّم تجربة عرض وطلب هادئة وسهلة، تبرز جودة العطور وتمنح العميل ثقة أكبر قبل إتمام الطلب عبر واتساب.",
    features: ["تأكيد سريع", "تغليف راقٍ", "طلب مباشر عبر واتساب"],
  });

  const [faqs, setFaqs] = useState<FAQItem[]>([
    { id: 1, question: "كم تستغرق مدة تجهيز الطلب؟", answer: "يتم تجهيز الطلب عادة خلال 24 ساعة من التأكيد، ثم يتم التنسيق مع العميل للشحن أو الاستلام." },
    { id: 2, question: "هل يمكن اختيار طريقة دفع يدوية؟", answer: "نعم، يمكن للعميل اختيار إنستاباي أو فودافون كاش أو التحويل البنكي ثم إرسال التأكيد عبر واتساب." },
    { id: 3, question: "هل التغليف مناسب للهدايا؟", answer: "واجهة العرض الحالية مصممة لإبراز المنتجات الفاخرة، ويمكن اعتماد تغليف راقٍ مناسب للهدايا والمناسبات." },
  ]);

  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    { id: 1, name: "سارة خالد", text: "التجربة كانت مرتبة جدًا، والتواصل عبر واتساب سريع وواضح، والعطر وصل بشكل يليق فعلًا بالهدية.", rating: 5 },
    { id: 2, name: "محمد علي", text: "أعجبني وضوح العرض وطريقة الطلب، والمنتج نفسه جاء بجودة ممتازة وثبات جميل.", rating: 5 },
  ]);

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addFaq = () => {
    setFaqs([...faqs, { id: Date.now(), question: "", answer: "" }]);
  };

  const updateFaq = (id: number, field: keyof FAQItem, value: string) => {
    setFaqs(faqs.map((f) => (f.id === id ? { ...f, [field]: value } : f)));
  };

  const removeFaq = (id: number) => {
    setFaqs(faqs.filter((f) => f.id !== id));
  };

  const addTestimonial = () => {
    setTestimonials([...testimonials, { id: Date.now(), name: "", text: "", rating: 5 }]);
  };

  const updateTestimonial = (id: number, field: keyof Testimonial, value: string | number) => {
    setTestimonials(testimonials.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  };

  const removeTestimonial = (id: number) => {
    setTestimonials(testimonials.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-[#e8e0d4] font-['Amiri']">إدارة المحتوى</h1>
        <p className="text-sm text-[#8a8279] mt-1">تعديل نصوص الواجهة الرئيسية والأسئلة والآراء</p>
      </div>

      <div className="bg-[#141414] border border-[#2a2520] rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-[#c9a96e]/10 border border-[#c9a96e]/30 flex items-center justify-center">
            <Type className="w-4 h-4 text-[#c9a96e]" />
          </div>
          <h2 className="text-lg font-semibold text-[#e8e0d4]">محتوى الواجهة الرئيسية</h2>
        </div>

        <div>
          <label className="block text-sm text-[#a0988e] mb-1.5">النص العلوي</label>
          <input
            value={hero.eyebrow}
            onChange={(e) => setHero({ ...hero, eyebrow: e.target.value })}
            className="w-full bg-[#1a1a1a] border border-[#2a2520] rounded-xl px-4 py-2.5 text-sm text-[#e8e0d4] outline-none focus:border-[#c9a96e]/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-[#a0988e] mb-1.5">العنوان الرئيسي</label>
          <input
            value={hero.title}
            onChange={(e) => setHero({ ...hero, title: e.target.value })}
            className="w-full bg-[#1a1a1a] border border-[#2a2520] rounded-xl px-4 py-2.5 text-sm text-[#e8e0d4] outline-none focus:border-[#c9a96e]/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-[#a0988e] mb-1.5">الكلمة المميزة</label>
          <input
            value={hero.accent}
            onChange={(e) => setHero({ ...hero, accent: e.target.value })}
            className="w-full bg-[#1a1a1a] border border-[#2a2520] rounded-xl px-4 py-2.5 text-sm text-[#e8e0d4] outline-none focus:border-[#c9a96e]/50 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-[#a0988e] mb-1.5">الوصف</label>
          <textarea
            rows={3}
            value={hero.description}
            onChange={(e) => setHero({ ...hero, description: e.target.value })}
            className="w-full bg-[#1a1a1a] border border-[#2a2520] rounded-xl px-4 py-2.5 text-sm text-[#e8e0d4] outline-none focus:border-[#c9a96e]/50 transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-sm text-[#a0988e] mb-1.5">المزايا السريعة</label>
          <input
            value={hero.features.join("، ")}
            onChange={(e) => setHero({ ...hero, features: e.target.value.split("،").map((item) => item.trim()).filter(Boolean) })}
            className="w-full bg-[#1a1a1a] border border-[#2a2520] rounded-xl px-4 py-2.5 text-sm text-[#e8e0d4] outline-none focus:border-[#c9a96e]/50 transition-colors"
          />
        </div>
      </div>

      <div className="bg-[#141414] border border-[#2a2520] rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#c9a96e]/10 border border-[#c9a96e]/30 flex items-center justify-center">
              <HelpCircle className="w-4 h-4 text-[#c9a96e]" />
            </div>
            <h2 className="text-lg font-semibold text-[#e8e0d4]">الأسئلة الشائعة</h2>
          </div>
          <button onClick={addFaq} className="inline-flex items-center gap-1.5 text-sm text-[#c9a96e] hover:text-[#b8985e] transition-colors">
            <Plus className="w-4 h-4" />
            إضافة سؤال
          </button>
        </div>

        {faqs.map((faq) => (
          <div key={faq.id} className="bg-[#1a1a1a] border border-[#2a2520] rounded-xl p-4 space-y-3">
            <div className="flex items-start gap-2">
              <GripVertical className="w-4 h-4 text-[#5a524a] mt-2 cursor-grab" />
              <div className="flex-1 space-y-3">
                <input
                  value={faq.question}
                  onChange={(e) => updateFaq(faq.id, "question", e.target.value)}
                  placeholder="اكتب السؤال"
                  className="w-full bg-[#141414] border border-[#2a2520] rounded-xl px-4 py-2.5 text-sm text-[#e8e0d4] placeholder-[#5a524a] outline-none focus:border-[#c9a96e]/50 transition-colors"
                />
                <textarea
                  value={faq.answer}
                  onChange={(e) => updateFaq(faq.id, "answer", e.target.value)}
                  placeholder="اكتب الإجابة"
                  rows={2}
                  className="w-full bg-[#141414] border border-[#2a2520] rounded-xl px-4 py-2.5 text-sm text-[#e8e0d4] placeholder-[#5a524a] outline-none focus:border-[#c9a96e]/50 transition-colors resize-none"
                />
              </div>
              <button
                onClick={() => removeFaq(faq.id)}
                className="p-2 rounded-lg hover:bg-red-500/10 text-[#5a524a] hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#141414] border border-[#2a2520] rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#c9a96e]/10 border border-[#c9a96e]/30 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-[#c9a96e]" />
            </div>
            <h2 className="text-lg font-semibold text-[#e8e0d4]">آراء العملاء</h2>
          </div>
          <button onClick={addTestimonial} className="inline-flex items-center gap-1.5 text-sm text-[#c9a96e] hover:text-[#b8985e] transition-colors">
            <Plus className="w-4 h-4" />
            إضافة رأي
          </button>
        </div>

        {testimonials.map((t) => (
          <div key={t.id} className="bg-[#1a1a1a] border border-[#2a2520] rounded-xl p-4 space-y-3">
            <div className="flex items-start gap-2">
              <GripVertical className="w-4 h-4 text-[#5a524a] mt-2 cursor-grab" />
              <div className="flex-1 space-y-3">
                <input
                  value={t.name}
                  onChange={(e) => updateTestimonial(t.id, "name", e.target.value)}
                  placeholder="اسم العميل"
                  className="w-full bg-[#141414] border border-[#2a2520] rounded-xl px-4 py-2.5 text-sm text-[#e8e0d4] placeholder-[#5a524a] outline-none focus:border-[#c9a96e]/50 transition-colors"
                />
                <textarea
                  value={t.text}
                  onChange={(e) => updateTestimonial(t.id, "text", e.target.value)}
                  placeholder="نص الرأي"
                  rows={2}
                  className="w-full bg-[#141414] border border-[#2a2520] rounded-xl px-4 py-2.5 text-sm text-[#e8e0d4] placeholder-[#5a524a] outline-none focus:border-[#c9a96e]/50 transition-colors resize-none"
                />
                <select
                  value={t.rating}
                  onChange={(e) => updateTestimonial(t.id, "rating", Number(e.target.value))}
                  className="bg-[#141414] border border-[#2a2520] rounded-xl px-4 py-2.5 text-sm text-[#e8e0d4] outline-none focus:border-[#c9a96e]/50 transition-colors"
                >
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>{r} نجوم</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => removeTestimonial(t.id)}
                className="p-2 rounded-lg hover:bg-red-500/10 text-[#5a524a] hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 bg-[#c9a96e] hover:bg-[#b8985e] text-[#0c0c0c] font-medium rounded-xl px-6 py-2.5 text-sm transition-colors"
        >
          <Save className="w-4 h-4" />
          حفظ التغييرات
        </button>
        {saved && <span className="text-sm text-emerald-400">تم الحفظ بنجاح</span>}
      </div>
    </div>
  );
}
