import { useMemo, useState } from "react";
import { Search, Filter, MessageCircle, X, ChevronLeft, Phone, Copy } from "lucide-react";
import { statusLabels, statusColors } from "../data/mockData";
import type { AdminOrder } from "../data/mockData";
import { useStore } from "../../store/StoreProvider";
import AdminToast, { type AdminToastItem } from "../components/AdminToast";

const statusOptions = [
  { value: "", label: "كل الحالات" },
  { value: "new", label: "جديد" },
  { value: "contacted", label: "تم التواصل" },
  { value: "pending_payment", label: "بانتظار التحويل" },
  { value: "confirmed", label: "تم التأكيد" },
  { value: "shipped", label: "تم الشحن" },
  { value: "completed", label: "مكتمل" },
  { value: "cancelled", label: "ملغي" },
];

export default function Orders() {
  const { orders, updateOrderStatus, saveOrderInternalNote } = useStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [internalNote, setInternalNote] = useState("");
  const [toasts, setToasts] = useState<AdminToastItem[]>([]);

  const pushToast = (message: string, tone: "success" | "info" = "success") => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((prev) => [...prev, { id, message, tone }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 2600);
  };

  const filtered = useMemo(
    () =>
      orders.filter((order) => {
        const matchesSearch = order.customerName.includes(search) || order.id.includes(search) || order.phone.includes(search);
        const matchesStatus = !statusFilter || order.status === statusFilter;
        return matchesSearch && matchesStatus;
      }),
    [orders, search, statusFilter],
  );

  const openOrder = (order: AdminOrder) => {
    setSelectedOrder(order);
    setInternalNote(order.internalNotes);
  };

  const whatsappLink = (phone: string) => `https://wa.me/${phone.replace(/\D/g, "")}`;

  return (
    <div className="space-y-6">
      <AdminToast toasts={toasts} removeToast={(id) => setToasts((prev) => prev.filter((toast) => toast.id !== id))} />

      <div>
        <h1 className="text-2xl font-bold text-[#e8e0d4] font-['Amiri']">الطلبات</h1>
        <p className="mt-1 text-sm text-[#8a8279]">متابعة الطلبات الواردة وتحديث حالتها</p>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5a524a]" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ابحث باسم العميل أو رقم الطلب أو الهاتف" className="w-full rounded-xl border border-[#2a2520] bg-[#141414] py-2.5 pl-4 pr-10 text-sm text-[#e8e0d4] placeholder-[#5a524a] outline-none transition-colors focus:border-[#c9a96e]/50" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full rounded-xl border border-[#2a2520] bg-[#141414] px-4 py-2.5 text-sm text-[#e8e0d4] outline-none transition-colors focus:border-[#c9a96e]/50 lg:w-56">
          {statusOptions.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
        </select>
      </div>

      <div className="space-y-4 md:hidden">
        {filtered.map((order) => (
          <button key={order.id} type="button" onClick={() => openOrder(order)} className="w-full rounded-2xl border border-[#2a2520] bg-[#141414] p-4 text-right transition-colors hover:border-[#c9a96e]/25">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#e8e0d4]">{order.customerName}</p>
                <p className="mt-1 text-xs text-[#8a8279]">{order.id}</p>
              </div>
              <span className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-medium ${statusColors[order.status]}`}>
                {statusLabels[order.status]}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-[#8a8279]">الهاتف</p>
                <p className="text-[#e8e0d4]" dir="ltr">{order.phone}</p>
              </div>
              <div>
                <p className="text-xs text-[#8a8279]">الإجمالي</p>
                <p className="font-semibold text-[#c9a96e]">{order.total.toLocaleString()} ج.م</p>
              </div>
              <div>
                <p className="text-xs text-[#8a8279]">المدينة</p>
                <p className="text-[#a0988e]">{order.city}</p>
              </div>
              <div>
                <p className="text-xs text-[#8a8279]">الدفع</p>
                <p className="text-[#a0988e]">{order.paymentMethod}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <a href={whatsappLink(order.phone)} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500/10 px-3 py-2.5 text-sm text-emerald-400 border border-emerald-500/25">
                <MessageCircle className="h-4 w-4" />
                واتساب
              </a>
              <button type="button" onClick={(event) => { event.stopPropagation(); void navigator.clipboard.writeText(order.phone); pushToast("تم نسخ رقم العميل."); }} className="inline-flex items-center justify-center rounded-xl border border-[#2a2520] bg-[#1a1a1a] px-3 py-2.5 text-[#a0988e]">
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </button>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-2xl border border-[#2a2520] bg-[#141414] md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2a2520] text-[#8a8279]">
                <th className="px-6 py-3 text-right font-medium">رقم الطلب</th>
                <th className="px-6 py-3 text-right font-medium">العميل</th>
                <th className="px-6 py-3 text-right font-medium">المدينة</th>
                <th className="px-6 py-3 text-right font-medium">طريقة الدفع</th>
                <th className="px-6 py-3 text-right font-medium">الإجمالي</th>
                <th className="px-6 py-3 text-right font-medium">الحالة</th>
                <th className="px-6 py-3 text-right font-medium">التاريخ</th>
                <th className="px-6 py-3 text-right font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id} className="cursor-pointer border-b border-[#2a2520]/50 transition-colors hover:bg-[#1a1a1a]/50" onClick={() => openOrder(order)}>
                  <td className="px-6 py-4 font-medium text-[#e8e0d4]">{order.id}</td>
                  <td className="px-6 py-4">
                    <p className="text-[#e8e0d4]">{order.customerName}</p>
                    <p className="text-xs text-[#8a8279]" dir="ltr">{order.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-[#a0988e]">{order.city}</td>
                  <td className="px-6 py-4 text-[#a0988e]">{order.paymentMethod}</td>
                  <td className="px-6 py-4 font-semibold text-[#c9a96e]">{order.total.toLocaleString()} ج.م</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-medium ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#8a8279]">{order.date}</td>
                  <td className="px-6 py-4"><ChevronLeft className="h-4 w-4 text-[#5a524a]" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <Filter className="mx-auto mb-4 h-12 w-12 text-[#2a2520]" />
          <p className="text-[#8a8279]">لا توجد طلبات مطابقة للبحث الحالي</p>
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          <div className="relative h-full w-full max-w-md overflow-y-auto border-l border-[#2a2520] bg-[#141414]">
            <div className="flex items-center justify-between border-b border-[#2a2520] p-5 sm:p-6">
              <div>
                <h2 className="text-lg font-semibold text-[#e8e0d4]">{selectedOrder.id}</h2>
                <p className="text-xs text-[#8a8279]">{selectedOrder.date}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="rounded-lg p-2 transition-colors hover:bg-[#2a2520]"><X className="h-5 w-5 text-[#8a8279]" /></button>
            </div>

            <div className="space-y-6 p-5 sm:p-6">
              <div>
                <label className="mb-2 block text-sm text-[#a0988e]">حالة الطلب</label>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.filter((status) => status.value).map((status) => (
                    <button
                      key={status.value}
                      onClick={() => {
                        void updateOrderStatus(selectedOrder.id, status.value as AdminOrder["status"]);
                        setSelectedOrder({ ...selectedOrder, status: status.value as AdminOrder["status"] });
                        pushToast("تم تحديث حالة الطلب.");
                      }}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${selectedOrder.status === status.value ? statusColors[status.value] : "bg-[#1a1a1a] border-[#2a2520] text-[#8a8279] hover:text-[#e8e0d4]"}`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 rounded-xl border border-[#2a2520] bg-[#1a1a1a] p-4">
                <h3 className="text-sm font-medium text-[#e8e0d4]">بيانات العميل</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><p className="text-xs text-[#8a8279]">الاسم</p><p className="text-[#e8e0d4]">{selectedOrder.customerName}</p></div>
                  <div><p className="text-xs text-[#8a8279]">المدينة</p><p className="text-[#e8e0d4]">{selectedOrder.city}</p></div>
                  <div><p className="text-xs text-[#8a8279]">الهاتف</p><p className="text-[#e8e0d4]" dir="ltr">{selectedOrder.phone}</p></div>
                  <div><p className="text-xs text-[#8a8279]">الدفع</p><p className="text-[#e8e0d4]">{selectedOrder.paymentMethod}</p></div>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <a href={whatsappLink(selectedOrder.phone)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-400 transition-colors hover:bg-emerald-500/20">
                    <MessageCircle className="h-4 w-4" />
                    تواصل عبر واتساب
                  </a>
                  <button type="button" onClick={() => { void navigator.clipboard.writeText(selectedOrder.phone); pushToast("تم نسخ رقم العميل."); }} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#2a2520] bg-[#141414] px-4 py-2.5 text-sm text-[#e8e0d4] transition-colors hover:bg-[#202020]">
                    <Copy className="h-4 w-4" />
                    نسخ الرقم
                  </button>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-medium text-[#e8e0d4]">المنتجات</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between rounded-xl border border-[#2a2520] bg-[#1a1a1a] px-4 py-3">
                      <div>
                        <p className="text-sm text-[#e8e0d4]">{item.name}</p>
                        <p className="text-xs text-[#8a8279]">الكمية: {item.qty}</p>
                      </div>
                      <p className="text-sm font-semibold text-[#c9a96e]">{item.price.toLocaleString()} ج.م</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-[#2a2520] pt-3">
                  <p className="text-sm text-[#e8e0d4]">الإجمالي</p>
                  <p className="text-lg font-bold text-[#c9a96e]">{selectedOrder.total.toLocaleString()} ج.م</p>
                </div>
              </div>

              {selectedOrder.notes && (
                <div className="rounded-xl border border-[#2a2520] bg-[#1a1a1a] p-4">
                  <p className="mb-1 text-xs text-[#8a8279]">ملاحظات العميل</p>
                  <p className="text-sm text-[#e8e0d4]">{selectedOrder.notes}</p>
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm text-[#a0988e]">ملاحظات داخلية</label>
                <textarea rows={3} value={internalNote} onChange={(e) => setInternalNote(e.target.value)} placeholder="أضف ملاحظة خاصة بمتابعة الطلب" className="w-full resize-none rounded-xl border border-[#2a2520] bg-[#1a1a1a] px-4 py-2.5 text-sm text-[#e8e0d4] placeholder-[#5a524a] outline-none transition-colors focus:border-[#c9a96e]/50" />
                <button onClick={() => { void saveOrderInternalNote(selectedOrder.id, internalNote); setSelectedOrder({ ...selectedOrder, internalNotes: internalNote }); pushToast("تم حفظ الملاحظة الداخلية."); }} className="mt-2 rounded-lg bg-[#c9a96e] px-4 py-2 text-xs font-medium text-[#0c0c0c] transition-colors hover:bg-[#b8985e]">
                  حفظ الملاحظة
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
