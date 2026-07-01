import { NavLink, useNavigate } from "react-router-dom";
import {
  Bookmark,
  BookOpen,
  Home,
  LogOut,
  MessageSquare,
  Newspaper,
  User,
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

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-56 flex-col border-r border-slate-200 bg-white">
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-iocl-orange text-lg font-black text-white">
          I
        </div>
        <div>
          <p className="text-sm font-extrabold leading-tight text-iocl-navy">IOCL</p>
          <p className="text-[10px] font-semibold tracking-wider text-slate-400">
            KNOWLEDGE HUB
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-l-[3px] border-iocl-orange bg-iocl-orange-light pl-[9px] text-iocl-orange"
                  : "border-l-[3px] border-transparent text-slate-600 hover:bg-slate-50 hover:text-iocl-navy"
              }`
            }
          >
            <Icon className="h-[18px] w-[18px] shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {user && (
        <div className="border-t border-slate-100 p-4">
          <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-iocl-navy text-sm font-bold text-white">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-iocl-navy">{user.name}</p>
              <p className="truncate text-[11px] text-slate-400">{user.employeeId}</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white hover:text-red-500"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
