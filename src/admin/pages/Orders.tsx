import { useMemo, useState } from "react";
import { Search, Filter, MessageCircle, X, ChevronLeft } from "lucide-react";
import { statusLabels, statusColors } from "../data/mockData";
import type { AdminOrder } from "../data/mockData";
import { useStore } from "../../store/StoreProvider";

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

  const filtered = useMemo(() => orders.filter((o) => {
    const matchesSearch = o.customerName.includes(search) || o.id.includes(search) || o.phone.includes(search);
    const matchesStatus = !statusFilter || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  }), [orders, search, statusFilter]);

  const openOrder = (order: AdminOrder) => {
    setSelectedOrder(order);
    setInternalNote(order.internalNotes);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#e8e0d4] font-['Amiri']">الطلبات</h1>
        <p className="text-sm text-[#8a8279] mt-1">متابعة الطلبات الواردة وتحديث حالتها</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a524a]" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ابحث باسم العميل أو رقم الطلب أو الهاتف" className="w-full bg-[#141414] border border-[#2a2520] rounded-xl pr-10 pl-4 py-2.5 text-sm text-[#e8e0d4] placeholder-[#5a524a] outline-none focus:border-[#c9a96e]/50 transition-colors" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-[#141414] border border-[#2a2520] rounded-xl px-4 py-2.5 text-sm text-[#e8e0d4] outline-none focus:border-[#c9a96e]/50 transition-colors">
          {statusOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>

      <div className="bg-[#141414] border border-[#2a2520] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2a2520] text-[#8a8279]">
                <th className="text-right px-6 py-3 font-medium">رقم الطلب</th>
                <th className="text-right px-6 py-3 font-medium">العميل</th>
                <th className="text-right px-6 py-3 font-medium">المدينة</th>
                <th className="text-right px-6 py-3 font-medium">طريقة الدفع</th>
                <th className="text-right px-6 py-3 font-medium">الإجمالي</th>
                <th className="text-right px-6 py-3 font-medium">الحالة</th>
                <th className="text-right px-6 py-3 font-medium">التاريخ</th>
                <th className="text-right px-6 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id} className="border-b border-[#2a2520]/50 hover:bg-[#1a1a1a]/50 transition-colors cursor-pointer" onClick={() => openOrder(order)}>
                  <td className="px-6 py-4 text-[#e8e0d4] font-medium">{order.id}</td>
                  <td className="px-6 py-4">
                    <p className="text-[#e8e0d4]">{order.customerName}</p>
                    <p className="text-xs text-[#8a8279]" dir="ltr">{order.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-[#a0988e]">{order.city}</td>
                  <td className="px-6 py-4 text-[#a0988e]">{order.paymentMethod}</td>
                  <td className="px-6 py-4 text-[#c9a96e] font-semibold">{order.total.toLocaleString()} ج.م</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#8a8279]">{order.date}</td>
                  <td className="px-6 py-4"><ChevronLeft className="w-4 h-4 text-[#5a524a]" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Filter className="w-12 h-12 text-[#2a2520] mx-auto mb-4" />
            <p className="text-[#8a8279]">لا توجد طلبات مطابقة للبحث الحالي</p>
          </div>
        )}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          <div className="relative bg-[#141414] border-l border-[#2a2520] w-full max-w-md h-full overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-[#2a2520]">
              <div>
                <h2 className="text-lg font-semibold text-[#e8e0d4]">{selectedOrder.id}</h2>
                <p className="text-xs text-[#8a8279]">{selectedOrder.date}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-2 rounded-lg hover:bg-[#2a2520] transition-colors"><X className="w-5 h-5 text-[#8a8279]" /></button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm text-[#a0988e] mb-2">حالة الطلب</label>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.filter((s) => s.value).map((s) => (
                    <button
                      key={s.value}
                      onClick={() => {
                        void updateOrderStatus(selectedOrder.id, s.value as AdminOrder["status"]);
                        setSelectedOrder({ ...selectedOrder, status: s.value as AdminOrder["status"] });
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${selectedOrder.status === s.value ? statusColors[s.value] : "bg-[#1a1a1a] border-[#2a2520] text-[#8a8279] hover:text-[#e8e0d4]"}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#1a1a1a] border border-[#2a2520] rounded-xl p-4 space-y-3">
                <h3 className="text-sm font-medium text-[#e8e0d4]">بيانات العميل</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><p className="text-xs text-[#8a8279]">الاسم</p><p className="text-[#e8e0d4]">{selectedOrder.customerName}</p></div>
                  <div><p className="text-xs text-[#8a8279]">المدينة</p><p className="text-[#e8e0d4]">{selectedOrder.city}</p></div>
                  <div><p className="text-xs text-[#8a8279]">الهاتف</p><p className="text-[#e8e0d4]" dir="ltr">{selectedOrder.phone}</p></div>
                  <div><p className="text-xs text-[#8a8279]">الدفع</p><p className="text-[#e8e0d4]">{selectedOrder.paymentMethod}</p></div>
                </div>
                <a href={`https://wa.me/${selectedOrder.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl px-4 py-2 text-sm transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  تواصل عبر واتساب
                </a>
              </div>

              <div>
                <h3 className="text-sm font-medium text-[#e8e0d4] mb-3">المنتجات</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between bg-[#1a1a1a] border border-[#2a2520] rounded-xl px-4 py-3">
                      <div>
                        <p className="text-sm text-[#e8e0d4]">{item.name}</p>
                        <p className="text-xs text-[#8a8279]">الكمية: {item.qty}</p>
                      </div>
                      <p className="text-sm font-semibold text-[#c9a96e]">{item.price.toLocaleString()} ج.م</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#2a2520]">
                  <p className="text-sm text-[#e8e0d4]">الإجمالي</p>
                  <p className="text-lg font-bold text-[#c9a96e]">{selectedOrder.total.toLocaleString()} ج.م</p>
                </div>
              </div>

              {selectedOrder.notes && (
                <div className="bg-[#1a1a1a] border border-[#2a2520] rounded-xl p-4">
                  <p className="text-xs text-[#8a8279] mb-1">ملاحظات العميل</p>
                  <p className="text-sm text-[#e8e0d4]">{selectedOrder.notes}</p>
                </div>
              )}

              <div>
                <label className="block text-sm text-[#a0988e] mb-2">ملاحظات داخلية</label>
                <textarea rows={3} value={internalNote} onChange={(e) => setInternalNote(e.target.value)} placeholder="أضف ملاحظة خاصة بمتابعة الطلب" className="w-full bg-[#1a1a1a] border border-[#2a2520] rounded-xl px-4 py-2.5 text-sm text-[#e8e0d4] placeholder-[#5a524a] outline-none focus:border-[#c9a96e]/50 transition-colors resize-none" />
                <button onClick={() => { void saveOrderInternalNote(selectedOrder.id, internalNote); setSelectedOrder({ ...selectedOrder, internalNotes: internalNote }); }} className="mt-2 text-xs bg-[#c9a96e] hover:bg-[#b8985e] text-[#0c0c0c] font-medium rounded-lg px-4 py-2 transition-colors">
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
