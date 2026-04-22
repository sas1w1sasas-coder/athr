import { Menu, Bell, Search } from "lucide-react";

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="fixed top-0 right-0 left-0 lg:right-72 z-30 bg-[#141414]/80 backdrop-blur-xl border-b border-[#2a2520]">
      <div className="flex items-center justify-between h-16 px-4 md:px-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-[#2a2520] transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden md:flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2520] rounded-xl px-4 py-2 w-72">
            <Search className="w-4 h-4 text-[#5a524a]" />
            <input
              type="text"
              placeholder="ابحث داخل اللوحة"
              className="bg-transparent text-sm text-[#e8e0d4] placeholder-[#5a524a] outline-none w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-xl hover:bg-[#2a2520] transition-colors">
            <Bell className="w-5 h-5 text-[#8a8279]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#c9a96e] rounded-full" />
          </button>
          <div className="flex items-center gap-3 mr-2">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-[#e8e0d4]">مدير المتجر</p>
              <p className="text-xs text-[#5a524a]">admin@atharperfume.com</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#c9a96e]/10 border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e] font-bold text-sm">
              أ
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

