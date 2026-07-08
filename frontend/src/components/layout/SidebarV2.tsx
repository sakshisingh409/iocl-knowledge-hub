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

    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-2xl font-black text-white shadow-lg shadow-orange-300/40">
      I
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

      {/* Search */}

      <div className="p-5">

        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">

          <Search className="h-4 w-4 text-slate-400" />

          <input
            placeholder="Search menu..."
            className="w-full bg-transparent text-sm outline-none"
          />

        </div>

      </div>

    </aside>
  );
}