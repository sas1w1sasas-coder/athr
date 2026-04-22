import { useMemo, useState } from "react";
import { Plus, Search, Pencil, Trash2, Eye, EyeOff, Filter, X } from "lucide-react";
import type { AdminProduct } from "../data/mockData";
import { useStore } from "../../store/StoreProvider";
import { categories } from "../../store/storeDefaults";

export default function Products() {
  const { adminProducts, saveProduct, deleteProduct, toggleProductVisibility } = useStore();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState<"" | "visible" | "hidden">("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);

  const [form, setForm] = useState<Partial<AdminProduct>>({
    name: "",
    subtitle: "",
    description: "",
    price: 0,
    size: "",
    category: "",
    badges: [],
    visible: true,
  });

  const filtered = useMemo(() => adminProducts.filter((p) => {
    const matchesSearch = p.name.includes(search) || p.subtitle.includes(search);
    const matchesCategory = !categoryFilter || p.category === categoryFilter;
    const matchesVisibility = !visibilityFilter || (visibilityFilter === "visible" ? p.visible : !p.visible);
    return matchesSearch && matchesCategory && matchesVisibility;
  }), [adminProducts, search, categoryFilter, visibilityFilter]);

  const openForm = (product?: AdminProduct) => {
    if (product) {
      setEditingProduct(product);
      setForm({ ...product });
    } else {
      setEditingProduct(null);
      setForm({ name: "", subtitle: "", description: "", price: 0, size: "", category: "", badges: [], visible: true });
    }
    setShowForm(true);
  };

  const handleSave = async () => {
    await saveProduct(form, editingProduct?.id ?? null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#e8e0d4] font-['Amiri']">المنتجات</h1>
          <p className="text-sm text-[#8a8279] mt-1">إدارة تشكيلة العطور المعروضة داخل المتجر</p>
        </div>
        <button onClick={() => openForm()} className="inline-flex items-center gap-2 bg-[#c9a96e] hover:bg-[#b8985e] text-[#0c0c0c] font-medium rounded-xl px-5 py-2.5 text-sm transition-colors">
          <Plus className="w-4 h-4" />
          إضافة منتج
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a524a]" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ابحث باسم المنتج أو العنوان الفرعي" className="w-full bg-[#141414] border border-[#2a2520] rounded-xl pr-10 pl-4 py-2.5 text-sm text-[#e8e0d4] placeholder-[#5a524a] outline-none focus:border-[#c9a96e]/50 transition-colors" />
        </div>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="bg-[#141414] border border-[#2a2520] rounded-xl px-4 py-2.5 text-sm text-[#e8e0d4] outline-none focus:border-[#c9a96e]/50 transition-colors">
          <option value="">كل الفئات</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={visibilityFilter} onChange={(e) => setVisibilityFilter(e.target.value as "" | "visible" | "hidden")} className="bg-[#141414] border border-[#2a2520] rounded-xl px-4 py-2.5 text-sm text-[#e8e0d4] outline-none focus:border-[#c9a96e]/50 transition-colors">
          <option value="">كل الحالات</option>
          <option value="visible">ظاهر</option>
          <option value="hidden">مخفي</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((product) => (
          <div key={product.id} className="bg-[#141414] border border-[#2a2520] rounded-2xl overflow-hidden hover:border-[#c9a96e]/20 transition-all group">
            <div className="h-40 bg-[#1a1a1a] relative overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              {!product.visible && (
                <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                  <span className="text-xs text-[#e8e0d4] bg-black/70 px-3 py-1 rounded-full">مخفي عن المتجر</span>
                </div>
              )}
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-2 gap-4">
                <div>
                  <h3 className="font-semibold text-[#e8e0d4]">{product.name}</h3>
                  <p className="text-xs text-[#8a8279]">{product.subtitle}</p>
                </div>
                <span className="text-lg font-bold text-[#c9a96e]">{product.price.toLocaleString()} ج.م</span>
              </div>
              <p className="text-xs text-[#8a8279] mb-3 line-clamp-2">{product.description}</p>
              <div className="flex items-center flex-wrap gap-2 mb-4">
                <span className="text-xs bg-[#1a1a1a] border border-[#2a2520] text-[#a0988e] px-2 py-1 rounded-lg">{product.size}</span>
                <span className="text-xs bg-[#1a1a1a] border border-[#2a2520] text-[#a0988e] px-2 py-1 rounded-lg">{product.category}</span>
                {product.badges.map((b) => <span key={b} className="text-xs bg-[#c9a96e]/10 border border-[#c9a96e]/30 text-[#c9a96e] px-2 py-1 rounded-lg">{b}</span>)}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => openForm(product)} className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#1a1a1a] hover:bg-[#252525] border border-[#2a2520] text-[#e8e0d4] rounded-xl py-2 text-xs transition-colors">
                  <Pencil className="w-3.5 h-3.5" />
                  تعديل
                </button>
                <button onClick={() => void toggleProductVisibility(product.id)} className="p-2 rounded-xl bg-[#1a1a1a] hover:bg-[#252525] border border-[#2a2520] text-[#8a8279] transition-colors" title={product.visible ? "إخفاء" : "إظهار"}>
                  {product.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button onClick={() => void deleteProduct(product.id)} className="p-2 rounded-xl bg-[#1a1a1a] hover:bg-red-500/10 border border-[#2a2520] hover:border-red-500/30 text-[#8a8279] hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Filter className="w-12 h-12 text-[#2a2520] mx-auto mb-4" />
          <p className="text-[#8a8279]">لا توجد منتجات مطابقة للفلاتر الحالية</p>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative bg-[#141414] border border-[#2a2520] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[#2a2520]">
              <h2 className="text-lg font-semibold text-[#e8e0d4]">{editingProduct ? "تعديل المنتج" : "إضافة منتج جديد"}</h2>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-[#2a2520] transition-colors"><X className="w-5 h-5 text-[#8a8279]" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-[#a0988e] mb-1.5">اسم المنتج</label>
                <input value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#2a2520] rounded-xl px-4 py-2.5 text-sm text-[#e8e0d4] outline-none focus:border-[#c9a96e]/50 transition-colors" />
              </div>
              <div>
                <label className="block text-sm text-[#a0988e] mb-1.5">العنوان الفرعي</label>
                <input value={form.subtitle || ""} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#2a2520] rounded-xl px-4 py-2.5 text-sm text-[#e8e0d4] outline-none focus:border-[#c9a96e]/50 transition-colors" />
              </div>
              <div>
                <label className="block text-sm text-[#a0988e] mb-1.5">الوصف المختصر</label>
                <textarea rows={3} value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#2a2520] rounded-xl px-4 py-2.5 text-sm text-[#e8e0d4] outline-none focus:border-[#c9a96e]/50 transition-colors resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#a0988e] mb-1.5">السعر</label>
                  <input type="number" value={form.price || ""} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="w-full bg-[#1a1a1a] border border-[#2a2520] rounded-xl px-4 py-2.5 text-sm text-[#e8e0d4] outline-none focus:border-[#c9a96e]/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-[#a0988e] mb-1.5">الحجم</label>
                  <input value={form.size || ""} onChange={(e) => setForm({ ...form, size: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#2a2520] rounded-xl px-4 py-2.5 text-sm text-[#e8e0d4] outline-none focus:border-[#c9a96e]/50 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-[#a0988e] mb-1.5">الفئة</label>
                <select value={form.category || ""} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#2a2520] rounded-xl px-4 py-2.5 text-sm text-[#e8e0d4] outline-none focus:border-[#c9a96e]/50 transition-colors">
                  <option value="">اختر الفئة</option>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="visible" checked={!!form.visible} onChange={(e) => setForm({ ...form, visible: e.target.checked })} className="w-4 h-4 rounded border-[#2a2520] bg-[#1a1a1a] text-[#c9a96e] accent-[#c9a96e]" />
                <label htmlFor="visible" className="text-sm text-[#a0988e]">ظاهر داخل المتجر</label>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-[#2a2520]">
              <button onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl text-sm text-[#8a8279] hover:bg-[#1a1a1a] transition-colors">إلغاء</button>
              <button onClick={() => void handleSave()} className="px-5 py-2.5 rounded-xl text-sm bg-[#c9a96e] hover:bg-[#b8985e] text-[#0c0c0c] font-medium transition-colors">حفظ المنتج</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
