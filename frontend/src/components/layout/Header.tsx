import { Bell, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { globalSearch, setGlobalSearch } = useAuth();

  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-slate-100 bg-white/90 px-8 py-4 backdrop-blur-sm">
      <div className="relative flex-1 max-w-2xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
          placeholder="Search magazines, newspapers, topics..."
          className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-iocl-orange focus:bg-white focus:ring-2 focus:ring-iocl-orange/20"
        />
      </div>
      <button
        type="button"
        className="relative rounded-full p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-iocl-navy"
        title="Notifications"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-iocl-orange" />
      </button>
    </header>
  );
}
