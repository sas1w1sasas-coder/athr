import { useState } from "react";
import { Save, Store, Phone, Mail, Clock, CreditCard } from "lucide-react";
import { useStore } from "../../store/StoreProvider";

export default function Settings() {
  const { settings, saveSettings } = useStore();
  const [formState, setFormState] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    await saveSettings(formState);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-[#e8e0d4] font-['Amiri']">إعدادات المتجر</h1>
        <p className="text-sm text-[#8a8279] mt-1">تعديل بيانات التواصل وطرق الدفع الأساسية</p>
      </div>

      <div className="bg-[#141414] border border-[#2a2520] rounded-2xl p-6 space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#c9a96e]/10 border border-[#c9a96e]/30 flex items-center justify-center">
            <Store className="w-4 h-4 text-[#c9a96e]" />
          </div>
          <h2 className="text-lg font-semibold text-[#e8e0d4]">بيانات المتجر</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-[#a0988e] mb-1.5">اسم المتجر</label>
            <input value={formState.storeName} onChange={(e) => setFormState({ ...formState, storeName: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#2a2520] rounded-xl px-4 py-2.5 text-sm text-[#e8e0d4] outline-none focus:border-[#c9a96e]/50 transition-colors" />
          </div>
          <div>
            <label className="block text-sm text-[#a0988e] mb-1.5">رقم واتساب</label>
            <div className="relative">
              <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a524a]" />
              <input value={formState.whatsapp} onChange={(e) => setFormState({ ...formState, whatsapp: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#2a2520] rounded-xl pr-10 pl-4 py-2.5 text-sm text-[#e8e0d4] outline-none focus:border-[#c9a96e]/50 transition-colors" dir="ltr" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#a0988e] mb-1.5">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a524a]" />
              <input value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#2a2520] rounded-xl pr-10 pl-4 py-2.5 text-sm text-[#e8e0d4] outline-none focus:border-[#c9a96e]/50 transition-colors" dir="ltr" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#a0988e] mb-1.5">ساعات العمل</label>
            <div className="relative">
              <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a524a]" />
              <input value={formState.workingHours} onChange={(e) => setFormState({ ...formState, workingHours: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#2a2520] rounded-xl pr-10 pl-4 py-2.5 text-sm text-[#e8e0d4] outline-none focus:border-[#c9a96e]/50 transition-colors" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#141414] border border-[#2a2520] rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#c9a96e]/10 border border-[#c9a96e]/30 flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-[#c9a96e]" />
          </div>
          <h2 className="text-lg font-semibold text-[#e8e0d4]">طرق الدفع المتاحة</h2>
        </div>

        <div className="space-y-3">
          {[
            { key: "instapay", label: "إنستاباي" },
            { key: "vodafoneCash", label: "فودافون كاش" },
            { key: "bankTransfer", label: "تحويل بنكي" },
          ].map((method) => (
            <label key={method.key} className="flex items-center justify-between p-4 bg-[#1a1a1a] border border-[#2a2520] rounded-xl cursor-pointer hover:border-[#c9a96e]/20 transition-colors">
              <span className="text-sm text-[#e8e0d4]">{method.label}</span>
              <input type="checkbox" checked={formState[method.key as keyof typeof formState] as boolean} onChange={(e) => setFormState({ ...formState, [method.key]: e.target.checked })} className="w-5 h-5 rounded border-[#2a2520] bg-[#141414] text-[#c9a96e] accent-[#c9a96e]" />
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={() => void handleSave()} className="inline-flex items-center gap-2 bg-[#c9a96e] hover:bg-[#b8985e] text-[#0c0c0c] font-medium rounded-xl px-6 py-2.5 text-sm transition-colors">
          <Save className="w-4 h-4" />
          حفظ الإعدادات
        </button>
        {saved && <span className="text-sm text-emerald-400">تم الحفظ بنجاح</span>}
      </div>
    </div>
  );
}
