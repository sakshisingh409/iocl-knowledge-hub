import ioclLogo from "../../assets/iocl-logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  Newspaper,
  BookOpen,
  Bookmark,
  Bot,
  User,
  Settings,
  LogOut,
  Search,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const navItems = [
  {
    label: "Home",
    icon: Home,
    to: "/home",
  },
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    to: "/dashboard",
  },
  {
  label: "Live News",
  icon: Newspaper,
  to: "/live-news",
  },
  {
    label: "Newspapers",
    icon: Newspaper,
    to: "/newspapers",
  },
  {
    label: "Magazines",
    icon: BookOpen,
    to: "/magazines",
  },
  {
    label: "Bookmarks",
    icon: Bookmark,
    to: "/bookmarks",
  },
  {
    label: "AI Assistant",
    icon: Bot,
    to: "/chat",
  },
  {
    label: "Profile",
    icon: User,
    to: "/profile",
  },
];

export default function SidebarV2() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r border-slate-200 bg-white">
      
      {/* Enterprise Header */}

<div className="border-b border-slate-200 bg-gradient-to-b from-orange-50 to-white px-6 py-6">

  <div className="flex items-center gap-4">

   <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-white shadow-md">
  <img
    src={ioclLogo}
    alt="Indian Oil"
    className="h-14 w-14 object-contain"
  />
</div>

    <div>

      <h2 className="text-lg font-extrabold tracking-tight text-slate-800">
        Indian Oil Corporation
      </h2>

      <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
        Knowledge Hub
      </p>

      <div className="mt-2 flex items-center gap-2">

        <div className="h-2 w-2 rounded-full bg-green-500"></div>

        <span className="text-[11px] font-semibold text-green-600">
          Enterprise Portal
        </span>

      </div>

    </div>

  </div>

</div>

{/* Navigation */}

<nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
  {navItems.map((item) => {
    const Icon = item.icon;

    return (
      <NavLink
        key={item.label}
        to={item.to}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
            isActive
              ? "bg-orange-500 text-white shadow-lg"
              : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
          }`
        }
      >
        <Icon className="h-5 w-5" />
        <span>{item.label}</span>
      </NavLink>
    );
  })}
</nav>

{/* Bottom */}

<div className="border-t border-slate-200 p-4">
  <button
    onClick={() => {
      logout();
      navigate("/");
    }}
    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
  >
    <LogOut className="h-5 w-5" />
    Logout
  </button>
</div>

    </aside>
  );
}