import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Settings,
  FileText,
  X,
  LogOut,
  Sparkles,
} from "lucide-react";

const navItems = [
  { path: "/admin", label: "الرئيسية", icon: LayoutDashboard },
  { path: "/admin/products", label: "المنتجات", icon: Package },
  { path: "/admin/orders", label: "الطلبات", icon: ShoppingBag },
  { path: "/admin/content", label: "المحتوى", icon: FileText },
  { path: "/admin/settings", label: "الإعدادات", icon: Settings },
];

export default function Sidebar({
  isOpen,
  onClose,
  onLogout,
}: {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void | Promise<void>;
}) {
  const location = useLocation();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 right-0 h-full w-72 bg-[#141414] border-l border-[#2a2520] z-50
          transform transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-[#2a2520]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#c9a96e]/10 border border-[#c9a96e]/30 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#c9a96e]" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#c9a96e] font-['Amiri']">أثر</h1>
                <p className="text-xs text-[#8a8279]">لوحة الإدارة</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-[#2a2520] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive
                      ? "bg-[#c9a96e]/10 text-[#c9a96e] border border-[#c9a96e]/30"
                      : "text-[#a0988e] hover:bg-[#1e1e1e] hover:text-[#e8e0d4]"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="p-4 border-t border-[#2a2520]">
            <button onClick={onLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm text-[#8a8279] hover:bg-[#1e1e1e] hover:text-red-400 transition-all">
              <LogOut className="w-5 h-5" />
              تسجيل الخروج
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
