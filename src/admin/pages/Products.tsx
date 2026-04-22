import { useMemo, useRef, useState } from "react";
import { Plus, Search, Pencil, Trash2, Eye, EyeOff, Filter, X, Upload, Image as ImageIcon } from "lucide-react";
import type { ChangeEvent } from "react";
import type { AdminProduct } from "../data/mockData";
import { useStore } from "../../store/StoreProvider";
import { categories } from "../../store/storeDefaults";
import AdminToast, { type AdminToastItem } from "../components/AdminToast";
import ConfirmDialog from "../components/ConfirmDialog";

const defaultProductImage = "/images/perfume-oud.jpg";

const ui = {
  pageTitle: "المنتجات",
  pageSubtitle: "إدارة تشكيلة العطور المعروضة داخل المتجر",
  addProduct: "إضافة منتج",
  searchPlaceholder: "ابحث باسم المنتج أو العنوان الفرعي",
  allCategories: "كل الفئات",
  allStates: "كل الحالات",
  visible: "ظاهر",
  hidden: "مخفي",
  noImage: "لا توجد صورة",
  hiddenFromStore: "مخفي عن المتجر",
  currency: "ج.م",
  edit: "تعديل",
  hide: "إخفاء",
  show: "إظهار",
  emptyFilter: "لا توجد منتجات مطابقة للفلاتر الحالية",
  editProduct: "تعديل المنتج",
  addNewProduct: "إضافة منتج جديد",
  productName: "اسم المنتج",
  productSubtitle: "العنوان الفرعي",
  productDescription: "الوصف المختصر",
  price: "السعر",
  size: "الحجم",
  category: "الفئة",
  selectCategory: "اختر الفئة",
  productImage: "صورة المنتج",
  imagePreviewAlt: "معاينة صورة المنتج",
  uploadFromDevice: "ارفع صورة من الجهاز",
  imageHint: "يفضل رفع صورة واضحة بنسبة قريبة من المربع حتى تظهر بشكل أنيق داخل بطاقات المتجر والداشبورد.",
  resetDefaultImage: "إعادة الصورة الافتراضية",
  visibleInStore: "ظاهر داخل المتجر",
  cancel: "إلغاء",
  saveProduct: "حفظ المنتج",
  saveSuccess: "تم حفظ المنتج بنجاح.",
  visibilityUpdated: "تم تحديث حالة ظهور المنتج.",
  deleteTitle: "حذف المنتج",
  deleteDescription: "سيتم حذف المنتج نهائيًا من الداشبورد والمتجر. هل تريد المتابعة؟",
  deleteConfirm: "نعم، احذف المنتج",
  deleteSuccess: "تم حذف المنتج بنجاح.",
};

export default function Products() {
  const { adminProducts, saveProduct, deleteProduct, toggleProductVisibility } = useStore();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState<"" | "visible" | "hidden">("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [productToDelete, setProductToDelete] = useState<AdminProduct | null>(null);
  const [toasts, setToasts] = useState<AdminToastItem[]>([]);
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

  const pushToast = (message: string, tone: "success" | "info" = "success") => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((prev) => [...prev, { id, message, tone }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 2600);
  };

  const filtered = useMemo(
    () =>
      adminProducts.filter((p) => {
        const matchesSearch = p.name.includes(search) || p.subtitle.includes(search);
        const matchesCategory = !categoryFilter || p.category === categoryFilter;
        const matchesVisibility = !visibilityFilter || (visibilityFilter === "visible" ? p.visible : !p.visible);
        return matchesSearch && matchesCategory && matchesVisibility;
      }),
    [adminProducts, search, categoryFilter, visibilityFilter],
  );

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
    pushToast(ui.saveSuccess);
  };

  const handleDelete = async () => {
    if (!productToDelete) return;
    await deleteProduct(productToDelete.id);
    setProductToDelete(null);
    pushToast(ui.deleteSuccess);
  };

  return (
    <div className="space-y-6">
      <AdminToast toasts={toasts} removeToast={(id) => setToasts((prev) => prev.filter((toast) => toast.id !== id))} />
      <ConfirmDialog
        open={Boolean(productToDelete)}
        title={ui.deleteTitle}
        description={ui.deleteDescription}
        confirmLabel={ui.deleteConfirm}
        onCancel={() => setProductToDelete(null)}
        onConfirm={() => void handleDelete()}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#e8e0d4] font-['Amiri']">{ui.pageTitle}</h1>
          <p className="mt-1 text-sm text-[#8a8279]">{ui.pageSubtitle}</p>
        </div>
        <button onClick={() => openForm()} className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#c9a96e] px-5 py-3 text-sm font-medium text-[#0c0c0c] transition-colors hover:bg-[#b8985e]">
          <Plus className="h-4 w-4" />
          {ui.addProduct}
        </button>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5a524a]" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={ui.searchPlaceholder} className="w-full rounded-xl border border-[#2a2520] bg-[#141414] py-2.5 pl-4 pr-10 text-sm text-[#e8e0d4] placeholder-[#5a524a] outline-none transition-colors focus:border-[#c9a96e]/50" />
        </div>
        <div className="grid grid-cols-2 gap-3 lg:flex lg:w-auto">
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="w-full rounded-xl border border-[#2a2520] bg-[#141414] px-4 py-2.5 text-sm text-[#e8e0d4] outline-none transition-colors focus:border-[#c9a96e]/50">
            <option value="">{ui.allCategories}</option>
            {categories.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
          <select value={visibilityFilter} onChange={(e) => setVisibilityFilter(e.target.value as "" | "visible" | "hidden")} className="w-full rounded-xl border border-[#2a2520] bg-[#141414] px-4 py-2.5 text-sm text-[#e8e0d4] outline-none transition-colors focus:border-[#c9a96e]/50">
            <option value="">{ui.allStates}</option>
            <option value="visible">{ui.visible}</option>
            <option value="hidden">{ui.hidden}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((product) => (
          <div key={product.id} className="group overflow-hidden rounded-2xl border border-[#2a2520] bg-[#141414] transition-all hover:border-[#c9a96e]/20">
            <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-[#181512] via-[#111111] to-[#1d1914]">
              {product.image ? (
                <img src={product.image} alt={product.name} className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]" />
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 text-[#8a8279]">
                  <ImageIcon className="h-8 w-8" />
                  <span className="text-sm">{ui.noImage}</span>
                </div>
              )}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 to-transparent" />
              {!product.visible && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/55">
                  <span className="rounded-full bg-black/70 px-3 py-1 text-xs text-[#e8e0d4]">{ui.hiddenFromStore}</span>
                </div>
              )}
            </div>
            <div className="p-5">
              <div className="mb-2 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-semibold text-[#e8e0d4]">{product.name}</h3>
                  <p className="text-xs text-[#8a8279]">{product.subtitle}</p>
                </div>
                <span className="text-base font-bold text-[#c9a96e] sm:text-lg">{product.price.toLocaleString()} {ui.currency}</span>
              </div>
              <p className="mb-3 line-clamp-2 text-xs text-[#8a8279]">{product.description}</p>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-lg border border-[#2a2520] bg-[#1a1a1a] px-2 py-1 text-xs text-[#a0988e]">{product.size}</span>
                <span className="rounded-lg border border-[#2a2520] bg-[#1a1a1a] px-2 py-1 text-xs text-[#a0988e]">{product.category}</span>
                {product.badges.map((badge) => <span key={badge} className="rounded-lg border border-[#c9a96e]/30 bg-[#c9a96e]/10 px-2 py-1 text-xs text-[#c9a96e]">{badge}</span>)}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button onClick={() => openForm(product)} className="col-span-3 sm:col-span-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#2a2520] bg-[#1a1a1a] py-2 text-xs text-[#e8e0d4] transition-colors hover:bg-[#252525]">
                  <Pencil className="h-3.5 w-3.5" />
                  {ui.edit}
                </button>
                <button onClick={() => { void toggleProductVisibility(product.id); pushToast(ui.visibilityUpdated); }} className="inline-flex items-center justify-center rounded-xl border border-[#2a2520] bg-[#1a1a1a] p-2 text-[#8a8279] transition-colors hover:bg-[#252525]" title={product.visible ? ui.hide : ui.show}>
                  {product.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
                <button onClick={() => setProductToDelete(product)} className="inline-flex items-center justify-center rounded-xl border border-[#2a2520] bg-[#1a1a1a] p-2 text-[#8a8279] transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <Filter className="mx-auto mb-4 h-12 w-12 text-[#2a2520]" />
          <p className="text-[#8a8279]">{ui.emptyFilter}</p>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#2a2520] bg-[#141414]">
            <div className="flex items-center justify-between border-b border-[#2a2520] p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-[#e8e0d4]">{editingProduct ? ui.editProduct : ui.addNewProduct}</h2>
              <button onClick={() => setShowForm(false)} className="rounded-lg p-2 transition-colors hover:bg-[#2a2520]"><X className="h-5 w-5 text-[#8a8279]" /></button>
            </div>
            <div className="space-y-4 p-5 sm:p-6">
              <div>
                <label className="mb-1.5 block text-sm text-[#a0988e]">{ui.productName}</label>
                <input value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-[#2a2520] bg-[#1a1a1a] px-4 py-2.5 text-sm text-[#e8e0d4] outline-none transition-colors focus:border-[#c9a96e]/50" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-[#a0988e]">{ui.productSubtitle}</label>
                <input value={form.subtitle || ""} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="w-full rounded-xl border border-[#2a2520] bg-[#1a1a1a] px-4 py-2.5 text-sm text-[#e8e0d4] outline-none transition-colors focus:border-[#c9a96e]/50" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-[#a0988e]">{ui.productDescription}</label>
                <textarea rows={3} value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full resize-none rounded-xl border border-[#2a2520] bg-[#1a1a1a] px-4 py-2.5 text-sm text-[#e8e0d4] outline-none transition-colors focus:border-[#c9a96e]/50" />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm text-[#a0988e]">{ui.price}</label>
                  <input type="number" value={form.price || ""} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="w-full rounded-xl border border-[#2a2520] bg-[#1a1a1a] px-4 py-2.5 text-sm text-[#e8e0d4] outline-none transition-colors focus:border-[#c9a96e]/50" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-[#a0988e]">{ui.size}</label>
                  <input value={form.size || ""} onChange={(e) => setForm({ ...form, size: e.target.value })} className="w-full rounded-xl border border-[#2a2520] bg-[#1a1a1a] px-4 py-2.5 text-sm text-[#e8e0d4] outline-none transition-colors focus:border-[#c9a96e]/50" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-[#a0988e]">{ui.category}</label>
                <select value={form.category || ""} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-xl border border-[#2a2520] bg-[#1a1a1a] px-4 py-2.5 text-sm text-[#e8e0d4] outline-none transition-colors focus:border-[#c9a96e]/50">
                  <option value="">{ui.selectCategory}</option>
                  {categories.map((category) => <option key={category} value={category}>{category}</option>)}
                </select>
              </div>
              <div className="space-y-3">
                <label className="block text-sm text-[#a0988e]">{ui.productImage}</label>
                <div className="grid items-start gap-4 sm:grid-cols-[160px_1fr]">
                  <div className="flex h-40 items-center justify-center overflow-hidden rounded-2xl border border-[#2a2520] bg-gradient-to-br from-[#181512] via-[#111111] to-[#1d1914]">
                    {form.image ? (
                      <img src={form.image} alt={form.name || ui.imagePreviewAlt} className="h-full w-full object-cover object-center" />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-[#8a8279]">
                        <ImageIcon className="h-7 w-7" />
                        <span className="text-xs">{ui.noImage}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#2a2520] bg-[#1a1a1a] px-4 py-3 text-sm text-[#e8e0d4] transition-colors hover:bg-[#222222]">
                      <Upload className="h-4 w-4 text-[#c9a96e]" />
                      {ui.uploadFromDevice}
                    </button>
                    <p className="text-xs leading-6 text-[#8a8279]">{ui.imageHint}</p>
                    {form.image && form.image !== defaultProductImage && (
                      <button type="button" onClick={() => setForm((prev) => ({ ...prev, image: defaultProductImage }))} className="text-xs text-[#c9a96e] transition-colors hover:text-[#dcc08b]">
                        {ui.resetDefaultImage}
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="visible" checked={!!form.visible} onChange={(e) => setForm({ ...form, visible: e.target.checked })} className="h-4 w-4 rounded border-[#2a2520] bg-[#1a1a1a] text-[#c9a96e] accent-[#c9a96e]" />
                <label htmlFor="visible" className="text-sm text-[#a0988e]">{ui.visibleInStore}</label>
              </div>
            </div>
            <div className="flex flex-col-reverse gap-3 border-t border-[#2a2520] p-5 sm:flex-row sm:items-center sm:justify-end sm:p-6">
              <button onClick={() => setShowForm(false)} className="rounded-xl px-5 py-2.5 text-sm text-[#8a8279] transition-colors hover:bg-[#1a1a1a]">{ui.cancel}</button>
              <button onClick={() => void handleSave()} className="rounded-xl bg-[#c9a96e] px-5 py-2.5 text-sm font-medium text-[#0c0c0c] transition-colors hover:bg-[#b8985e]">{ui.saveProduct}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
