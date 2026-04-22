import { Package, ShoppingBag, Clock, TrendingUp, Plus, ArrowLeft, Eye } from "lucide-react";
import { statusLabels, statusColors } from "../data/mockData";
import { Link } from "react-router-dom";
import { useStore } from "../../store/StoreProvider";

export default function Dashboard() {
  const { adminProducts, orders } = useStore();

  const stats = [
    { label: "عدد المنتجات", value: adminProducts.length.toString(), icon: Package, color: "text-[#c9a96e]" },
    { label: "الطلبات الجديدة", value: orders.filter((o) => o.status === "new").length.toString(), icon: ShoppingBag, color: "text-amber-400" },
    { label: "بانتظار التأكيد", value: orders.filter((o) => ["contacted", "pending_payment"].includes(o.status)).length.toString(), icon: Clock, color: "text-sky-400" },
    { label: "إجمالي الطلبات", value: orders.length.toString(), icon: TrendingUp, color: "text-emerald-400" },
  ];

  const recentOrders = orders.slice(0, 5);
  const highlightedProducts = adminProducts.filter((p) => p.visible).slice(0, 4);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#e8e0d4] font-['Amiri']">نظرة عامة</h1>
          <p className="text-sm text-[#8a8279] mt-1">ملخص سريع عن المنتجات والطلبات</p>
        </div>
        <div className="text-left text-xs text-[#5a524a]">
          {new Date().toLocaleDateString("ar-EG", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-[#141414] border border-[#2a2520] rounded-2xl p-6 hover:border-[#c9a96e]/20 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#2a2520] flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-bold text-[#e8e0d4] mb-1">{stat.value}</p>
              <p className="text-sm text-[#8a8279]">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link to="/admin/products" className="inline-flex items-center gap-2 bg-[#c9a96e] hover:bg-[#b8985e] text-[#0c0c0c] font-medium rounded-xl px-5 py-2.5 text-sm transition-colors">
          <Plus className="w-4 h-4" />
          إضافة منتج
        </Link>
        <Link to="/admin/orders" className="inline-flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#252525] border border-[#2a2520] text-[#e8e0d4] font-medium rounded-xl px-5 py-2.5 text-sm transition-colors">
          <Eye className="w-4 h-4" />
          مراجعة الطلبات
        </Link>
        <Link to="/admin/settings" className="inline-flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#252525] border border-[#2a2520] text-[#e8e0d4] font-medium rounded-xl px-5 py-2.5 text-sm transition-colors">
          تعديل الإعدادات
        </Link>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-[#141414] border border-[#2a2520] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-[#2a2520]">
            <h2 className="text-lg font-semibold text-[#e8e0d4]">آخر الطلبات</h2>
            <Link to="/admin/orders" className="text-sm text-[#c9a96e] hover:text-[#b8985e] flex items-center gap-1 transition-colors">
              عرض الكل
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2a2520] text-[#8a8279]">
                  <th className="text-right px-6 py-3 font-medium">رقم الطلب</th>
                  <th className="text-right px-6 py-3 font-medium">العميل</th>
                  <th className="text-right px-6 py-3 font-medium">الحالة</th>
                  <th className="text-right px-6 py-3 font-medium">الإجمالي</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-[#2a2520]/50 hover:bg-[#1a1a1a]/50 transition-colors">
                    <td className="px-6 py-4 text-[#e8e0d4] font-medium">{order.id}</td>
                    <td className="px-6 py-4 text-[#a0988e]">{order.customerName}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${statusColors[order.status]}`}>
                        {statusLabels[order.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#c9a96e] font-semibold">{order.total.toLocaleString()} ج.م</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#141414] border border-[#2a2520] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-[#2a2520]">
            <h2 className="text-lg font-semibold text-[#e8e0d4]">المنتجات المميزة</h2>
            <Link to="/admin/products" className="text-sm text-[#c9a96e] hover:text-[#b8985e] flex items-center gap-1 transition-colors">
              عرض الكل
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-[#2a2520]/50">
            {highlightedProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-4 p-4 hover:bg-[#1a1a1a]/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-[#2a2520] overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#e8e0d4] truncate">{product.name}</p>
                  <p className="text-xs text-[#8a8279]">{product.category}</p>
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-[#c9a96e]">{product.price.toLocaleString()} ج.م</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
