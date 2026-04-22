import { useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useStore } from "../../store/StoreProvider";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { isAdmin, authLoading, logout } = useStore();

  if (authLoading) {
    return <div className="min-h-screen bg-[#0c0c0c]" />;
  }

  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-[#e8e0d4]" dir="rtl">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={async () => {
          await logout();
          navigate("/admin/login", { replace: true });
        }}
      />
      <div className="lg:mr-72 transition-all duration-300">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 md:p-8 pt-24">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
