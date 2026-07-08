import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileEdit,
  Users,
  User,
  LogOut,
  ArrowLeftRight,
  ShieldAlert
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const adminNavItems = [
  { to: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },

  {
    to: "/admin/upload-magazine",
    label: "Upload Magazine",
    icon: FileEdit,
  },

  {
    to: "/admin/upload-newspaper",
    label: "Upload Newspaper",
    icon: FileEdit,
  },

  { to: "/admin/publications", label: "Publications", icon: FileEdit },

  { to: "/admin/users", label: "User Accounts", icon: Users },

  { to: "/admin/profile", label: "Admin Profile", icon: User },
];

export default function AdminSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-60 flex-col border-r border-slate-200 bg-slate-900 text-slate-300">
      {/* Admin Logo Block */}
      <div className="flex items-center gap-3 border-b border-slate-800 px-5 py-5 bg-slate-950/40">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-iocl-orange text-lg font-black text-white shadow-md shadow-iocl-orange/20">
          A
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-extrabold leading-tight text-white">IOCL Admin</p>
            <ShieldAlert className="h-3.5 w-3.5 text-iocl-orange animate-pulse" />
          </div>
          <p className="text-[10px] font-bold tracking-wider text-slate-500">CONTROL CENTER</p>
        </div>
      </div>

      {/* Nav list */}
      <nav className="flex-1 space-y-1 px-3 py-6">
        {adminNavItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-semibold transition-all duration-200 hover:scale-[1.02] ${
                isActive
                  ? "bg-iocl-orange text-white shadow-lg shadow-iocl-orange/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <Icon className="h-[16px] w-[16px] shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Admin Quick Portal Swap */}
      <div className="px-3 py-2">
        <button
          onClick={() => navigate("/home")}
          className="flex w-full items-center gap-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 px-4 py-3 text-xs font-bold text-slate-300 hover:text-white transition hover:scale-[1.02] border border-slate-800"
        >
          <ArrowLeftRight className="h-4 w-4 text-iocl-orange" />
          Employee Portal
        </button>
      </div>

      {/* Admin Profile Area */}
      {user && (
        <div className="border-t border-slate-800 p-4 bg-slate-950/20">
          <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-800/30 p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-iocl-orange text-sm font-bold text-white shadow-sm">
              {(user.full_name || user.email).charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-white">
                {user.full_name || "Admin"}
              </p>
              <p className="truncate text-[10px] text-slate-500">
                {user.email}
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-800 hover:text-red-400 transition"
              title="Sign out Admin"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
