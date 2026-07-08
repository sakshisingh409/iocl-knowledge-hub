import { Bell, PlusCircle, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/80 px-8 py-4 backdrop-blur-md">
      {/* Page Title & Status */}
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-800">Admin Control Panel</h2>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Service Operations: Online
            </span>
          </div>
        </div>
      </div>

      {/* Quick Controls */}
      <div className="flex items-center gap-4">
        {/* Quick Upload Button */}
        <button
  onClick={() => navigate("/admin/upload-magazine")}
          className="flex items-center gap-2 rounded-xl bg-iocl-orange hover:bg-orange-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-iocl-orange/15 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <PlusCircle className="h-4 w-4" />
          Add Publication
        </button>

        {/* Notifications */}
        <div className="relative">
          <button className="relative rounded-xl border border-slate-200/80 p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-iocl-orange" />
          </button>
        </div>

        {/* Security Indicator */}
        <div className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50/60 px-3 py-1.5 text-xs font-semibold text-emerald-700">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span className="hidden sm:inline">Secure Console</span>
        </div>
      </div>
    </header>
  );
}
