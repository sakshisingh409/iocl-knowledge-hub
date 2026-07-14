import { Bell, FileText, Newspaper, Bot, LogOut, User, ShieldCheck, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close menus on clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Safety Bulletin Uploaded",
      icon: FileText,
      time: "10 mins ago",
      route: "/magazines",
      unread: true,
    },
    {
      id: 2,
      title: "Today's Newspaper Available",
      icon: Newspaper,
      time: "1 hour ago",
      route: "/newspapers",
      unread: true,
    },
    {
      id: 3,
      title: "AI Chatbot Updated",
      icon: Bot,
      time: "Yesterday",
      route: "/chat",
      unread: false,
    },
  ]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleNotificationClick = (item: any) => {
    // mark as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, unread: false } : n))
    );
    navigate(item.route);
    setShowNotifications(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // User details
  const userName = user?.full_name || "User";
  const userRole = user?.role || "employee";
  const userInitials = userName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200/60 bg-white/80 px-8 py-4 backdrop-blur-md">
      

      {/* Access buttons (Notifications and Profile menu) */}
      <div className="flex items-center gap-4">
        
        {/* Notifications Popover */}
        <div className="relative" ref={notificationRef}>
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-2xl border border-slate-200/80 p-2.5 text-slate-500 hover:bg-slate-50 hover:text-iocl-navy transition cursor-pointer"
          >
            <Bell className="h-4.5 w-4.5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-iocl-orange animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden py-1 z-30">
              <div className="border-b border-slate-100 px-5 py-3.5 flex items-center justify-between">
                <h3 className="font-bold text-sm text-iocl-navy">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[10px] font-bold text-iocl-orange hover:underline cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto">
                {notifications.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleNotificationClick(item)}
                      className={`flex cursor-pointer items-start gap-3.5 border-b border-slate-50 px-5 py-3.5 transition hover:bg-slate-50 last:border-0 ${
                        item.unread ? "bg-orange-50/10" : ""
                      }`}
                    >
                      <div className={`rounded-xl p-2 shrink-0 ${item.unread ? "bg-orange-100/60 text-iocl-orange" : "bg-slate-100 text-slate-400"}`}>
                        <Icon size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`text-xs leading-normal ${item.unread ? "font-bold text-slate-800" : "font-medium text-slate-600"}`}>
                          {item.title}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1 font-medium">{item.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* User Account Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 rounded-2xl border border-slate-200/80 p-1.5 pr-3 text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition cursor-pointer"
          >
            <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-xl bg-iocl-navy text-xs font-black text-white">
              {userInitials}
            </div>
            <span className="text-xs font-bold hidden sm:inline truncate max-w-[100px]">
              {userName.split(" ")[0]}
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 hidden sm:inline" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden py-1.5 z-30">
              {/* Profile overview */}
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-xs font-black text-iocl-navy truncate">{userName}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{userRole}</p>
              </div>

              {/* Actions */}
              <div className="py-1">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setShowProfileMenu(false);
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-iocl-navy cursor-pointer transition"
                >
                  <User className="h-4 w-4" />
                  My Account
                </button>

                {/* Show Admin console shortcut if role is admin */}
                {(userRole === "admin" || user?.email === "admin@iocl.in") && (
                  <button
                    onClick={() => {
                      navigate("/admin/dashboard");
                      setShowProfileMenu(false);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2 text-xs font-bold text-iocl-orange hover:bg-orange-50/20 cursor-pointer transition"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Admin Portal
                  </button>
                )}
              </div>

              <div className="border-t border-slate-100 pt-1.5">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 cursor-pointer transition"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
