import { NavLink, useNavigate } from "react-router-dom";
import {
  Bookmark,
  BookOpen,
  Home,
  LogOut,
  MessageSquare,
  Newspaper,
  User,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/magazines", label: "Magazines", icon: BookOpen },
  { to: "/newspapers", label: "Newspapers", icon: Newspaper },
  { to: "/bookmarks", label: "Bookmarks", icon: Bookmark },
  { to: "/chat", label: "AI Assistant", icon: MessageSquare },
  { to: "/profile", label: "Profile", icon: User },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isAdmin = user?.role === "admin" || user?.email === "admin@iocl.in";

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-56 flex-col border-r border-slate-200 bg-white">
      {/* Sidebar Brand Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-5 bg-slate-50/20">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-iocl-orange text-lg font-black text-white shadow-md shadow-iocl-orange/20">
          I
        </div>
        <div>
          <p className="text-sm font-extrabold leading-tight text-iocl-navy">IOCL</p>
          <p className="text-[10px] font-semibold tracking-wider text-slate-400">
            KNOWLEDGE HUB
          </p>
        </div>
      </div>

      {/* Navigation list */}
      <nav className="flex-1 space-y-1.5 px-3 py-6">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all duration-200 hover:scale-[1.01] ${
                isActive
                  ? "bg-orange-50/70 text-iocl-orange border-l-[3px] border-iocl-orange pl-[11px]"
                  : "text-slate-500 hover:bg-slate-50 hover:text-iocl-navy border-l-[3px] border-transparent"
              }`
            }
          >
            <div className="flex items-center gap-3">
              <Icon className="h-[16px] w-[16px] shrink-0 transition-transform group-hover:scale-110 duration-200" />
              <span>{label}</span>
            </div>
            <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-slate-400" />
          </NavLink>
        ))}
      </nav>

      {/* Conditional Admin shortcut link */}
      {isAdmin && (
        <div className="px-3 py-2">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="flex w-full items-center gap-3 rounded-xl bg-orange-500/10 hover:bg-orange-500/25 border border-orange-200/50 px-3.5 py-2.5 text-xs font-bold text-iocl-orange transition hover:scale-[1.01] cursor-pointer"
          >
            <ShieldCheck className="h-4 w-4 shrink-0" />
            Admin Console
          </button>
        </div>
      )}

      {/* User Footer widget */}
      {user && (
        <div className="border-t border-slate-100 p-4 bg-slate-50/20">
          <div className="flex items-center gap-3 rounded-xl border border-slate-150 bg-slate-50/40 p-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-iocl-navy text-xs font-bold text-white shadow-sm">
              {(user.full_name || user.email).charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-iocl-navy">
                {user.full_name || "User"}
              </p>
              <p className="truncate text-[10px] text-slate-400 font-medium">
                {user.employee_id || user.email}
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-red-500 transition shadow-sm border border-transparent hover:border-slate-100"
              title="Sign out account"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
