import { useMemo, useRef, useState } from "react";
import { Plus, Search, Pencil, Trash2, Eye, EyeOff, Filter, X, Upload, Image as ImageIcon } from "lucide-react";
import type { ChangeEvent } from "react";
import type { AdminProduct } from "../data/mockData";
import { useStore } from "../../store/StoreProvider";
import { categories } from "../../store/storeDefaults";

const defaultProductImage = "/images/perfume-oud.jpg";

export default function Products() {
  const { adminProducts, saveProduct, deleteProduct, toggleProductVisibility } = useStore();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState<"" | "visible" | "hidden">("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState<Partial<AdminProduct>>({
    name: "",
    subtitle: "",
    description: "",
    price: 0,
    size: "",
    category: "",
    badges: [],
    image: defaultProductImage,
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
      setForm({ ...product, image: product.image || defaultProductImage });
    } else {
      setEditingProduct(null);
      setForm({
        name: "",
        subtitle: "",
        description: "",
        price: 0,
        size: "",
        category: "",
        badges: [],
        image: defaultProductImage,
        visible: true,
      });
    }
    setShowForm(true);
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : defaultProductImage;
      setForm((prev) => ({ ...prev, image: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    await saveProduct({ ...form, image: form.image || defaultProductImage }, editingProduct?.id ?? null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#e8e0d4] font-['Amiri']">«·„‰ Ã« </h1>
          <p className="text-sm text-[#8a8279] mt-1">≈œ«—…  ‘ﬂÌ·… «·⁄ÿÊ— «·„⁄—Ê÷… œ«Œ· «·„ Ã—</p>
        </div>
        <button onClick={() => openForm()} className="inline-flex items-center gap-2 bg-[#c9a96e] hover:bg-[#b8985e] text-[#0c0c0c] font-medium rounded-xl px-5 py-2.5 text-sm transition-colors">
          <Plus className="w-4 h-4" />
          ≈÷«›… „‰ Ã
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a524a]" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="«»ÕÀ »«”„ «·„‰ Ã √Ê «·⁄‰Ê«‰ «·›—⁄Ì" className="w-full bg-[#141414] border border-[#2a2520] rounded-xl pr-10 pl-4 py-2.5 text-sm text-[#e8e0d4] placeholder-[#5a524a] outline-none focus:border-[#c9a96e]/50 transition-colors" />
        </div>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="bg-[#141414] border border-[#2a2520] rounded-xl px-4 py-2.5 text-sm text-[#e8e0d4] outline-none focus:border-[#c9a96e]/50 transition-colors">
          <option value="">ﬂ· «·›∆« </option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={visibilityFilter} onChange={(e) => setVisibilityFilter(e.target.value as "" | "visible" | "hidden")} className="bg-[#141414] border border-[#2a2520] rounded-xl px-4 py-2.5 text-sm text-[#e8e0d4] outline-none focus:border-[#c9a96e]/50 transition-colors">
          <option value="">ﬂ· «·Õ«·« </option>
          <option value="visible">Ÿ«Â—</option>
          <option value="hidden">„Œ›Ì</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((product) => (
          <div key={product.id} className="bg-[#141414] border border-[#2a2520] rounded-2xl overflow-hidden hover:border-[#c9a96e]/20 transition-all group">
            <div className="h-52 bg-gradient-to-br from-[#181512] via-[#111111] to-[#1d1914] relative overflow-hidden flex items-center justify-center">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]" />
              ) : (
                <div className="flex flex-col items-center justify-center text-[#8a8279] gap-2">
                  <ImageIcon className="w-8 h-8" />
                  <span className="text-sm">·«  ÊÃœ ’Ê—…</span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
              {!product.visible && (
                <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                  <span className="text-xs text-[#e8e0d4] bg-black/70 px-3 py-1 rounded-full">„Œ›Ì ⁄‰ «·„ Ã—</span>
                </div>
              )}
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-2 gap-4">
                <div>
                  <h3 className="font-semibold text-[#e8e0d4]">{product.name}</h3>
                  <p className="text-xs text-[#8a8279]">{product.subtitle}</p>
                </div>
                <span className="text-lg font-bold text-[#c9a96e]">{product.price.toLocaleString()} Ã.„</span>
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
                   ⁄œÌ·
                </button>
                <button onClick={() => void toggleProductVisibility(product.id)} className="p-2 rounded-xl bg-[#1a1a1a] hover:bg-[#252525] border border-[#2a2520] text-[#8a8279] transition-colors" title={product.visible ? "≈Œ›«¡" : "≈ŸÂ«—"}>
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
          <p className="text-[#8a8279]">·«  ÊÃœ „‰ Ã«  „ÿ«»ﬁ… ··›·« — «·Õ«·Ì…</p>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative bg-[#141414] border border-[#2a2520] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[#2a2520]">
              <h2 className="text-lg font-semibold text-[#e8e0d4]">{editingProduct ? " ⁄œÌ· «·„‰ Ã" : "≈÷«›… „‰ Ã ÃœÌœ"}</h2>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-[#2a2520] transition-colors"><X className="w-5 h-5 text-[#8a8279]" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-[#a0988e] mb-1.5">«”„ «·„‰ Ã</label>
                <input value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#2a2520] rounded-xl px-4 py-2.5 text-sm text-[#e8e0d4] outline-none focus:border-[#c9a96e]/50 transition-colors" />
              </div>
              <div>
                <label className="block text-sm text-[#a0988e] mb-1.5">«·⁄‰Ê«‰ «·›—⁄Ì</label>
                <input value={form.subtitle || ""} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#2a2520] rounded-xl px-4 py-2.5 text-sm text-[#e8e0d4] outline-none focus:border-[#c9a96e]/50 transition-colors" />
              </div>
              <div>
                <label className="block text-sm text-[#a0988e] mb-1.5">«·Ê’› «·„Œ ’—</label>
                <textarea rows={3} value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#2a2520] rounded-xl px-4 py-2.5 text-sm text-[#e8e0d4] outline-none focus:border-[#c9a96e]/50 transition-colors resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#a0988e] mb-1.5">«·”⁄—</label>
                  <input type="number" value={form.price || ""} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="w-full bg-[#1a1a1a] border border-[#2a2520] rounded-xl px-4 py-2.5 text-sm text-[#e8e0d4] outline-none focus:border-[#c9a96e]/50 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-[#a0988e] mb-1.5">«·ÕÃ„</label>
                  <input value={form.size || ""} onChange={(e) => setForm({ ...form, size: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#2a2520] rounded-xl px-4 py-2.5 text-sm text-[#e8e0d4] outline-none focus:border-[#c9a96e]/50 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-[#a0988e] mb-1.5">«·›∆…</label>
                <select value={form.category || ""} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full bg-[#1a1a1a] border border-[#2a2520] rounded-xl px-4 py-2.5 text-sm text-[#e8e0d4] outline-none focus:border-[#c9a96e]/50 transition-colors">
                  <option value="">«Œ — «·›∆…</option>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="space-y-3">
                <label className="block text-sm text-[#a0988e]">’Ê—… «·„‰ Ã</label>
                <div className="grid sm:grid-cols-[160px_1fr] gap-4 items-start">
                  <div className="h-40 rounded-2xl overflow-hidden border border-[#2a2520] bg-gradient-to-br from-[#181512] via-[#111111] to-[#1d1914] flex items-center justify-center">
                    {form.image ? (
                      <img src={form.image} alt={form.name || "„⁄«Ì‰… ’Ê—… «·„‰ Ã"} className="w-full h-full object-cover object-center" />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-[#8a8279]">
                        <ImageIcon className="w-7 h-7" />
                        <span className="text-xs">·«  ÊÃœ ’Ê—…</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full inline-flex items-center justify-center gap-2 bg-[#1a1a1a] hover:bg-[#222222] border border-[#2a2520] text-[#e8e0d4] rounded-xl px-4 py-3 text-sm transition-colors">
                      <Upload className="w-4 h-4 text-[#c9a96e]" />
                      «—›⁄ ’Ê—… „‰ «·ÃÂ«“
                    </button>
                    <p className="text-xs leading-6 text-[#8a8279]">Ì›÷· —›⁄ ’Ê—… Ê«÷Õ… »‰”»… ﬁ—Ì»… „‰ «·„—»⁄ Õ Ï  ŸÂ— »‘ﬂ· √‰Ìﬁ œ«Œ· »ÿ«ﬁ«  «·„ Ã— Ê«·œ«‘»Ê—œ.</p>
                    {form.image && form.image !== defaultProductImage && (
                      <button type="button" onClick={() => setForm((prev) => ({ ...prev, image: defaultProductImage }))} className="text-xs text-[#c9a96e] hover:text-[#dcc08b] transition-colors">
                        ≈⁄«œ… «·’Ê—… «·«› —«÷Ì…
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="visible" checked={!!form.visible} onChange={(e) => setForm({ ...form, visible: e.target.checked })} className="w-4 h-4 rounded border-[#2a2520] bg-[#1a1a1a] text-[#c9a96e] accent-[#c9a96e]" />
                <label htmlFor="visible" className="text-sm text-[#a0988e]">Ÿ«Â— œ«Œ· «·„ Ã—</label>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-[#2a2520]">
              <button onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl text-sm text-[#8a8279] hover:bg-[#1a1a1a] transition-colors">≈·€«¡</button>
              <button onClick={() => void handleSave()} className="px-5 py-2.5 rounded-xl text-sm bg-[#c9a96e] hover:bg-[#b8985e] text-[#0c0c0c] font-medium transition-colors">Õ›Ÿ «·„‰ Ã</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
