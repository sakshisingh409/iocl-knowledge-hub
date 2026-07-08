import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Users,
  Download,
  Activity,
  PlusCircle,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  FileCheck2
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { DASHBOARD_STATS } from "../../data/mockData";
import { gsap } from "gsap";

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { publications } = useAuth();

  useEffect(() => {
    // Stagger layout animation
    gsap.fromTo(
      ".admin-widget",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );
  }, []);

  const stats = [
    {
      label: "Total Publications",
      value: publications.length,
      icon: FileText,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      label: "Active Employee Accounts",
      value: 142,
      icon: Users,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      label: "Document Access Count",
      value: DASHBOARD_STATS.downloads,
      icon: Download,
      color: "text-iocl-orange bg-orange-50 border-orange-100",
    },
    {
      label: "System Health Uptime",
      value: "99.98%",
      icon: Activity,
      color: "text-violet-600 bg-violet-50 border-violet-100",
    },
  ];

  const recentLogs = [
    {
      action: "New safety bulletin uploaded",
      target: "Safety First Q4 2024",
      user: "System Admin (IT)",
      time: "10 minutes ago",
    },
    {
      action: "Employee login approved",
      target: "employee@iocl.in",
      user: "Supabase Guard",
      time: "42 minutes ago",
    },
    {
      action: "Publication deleted",
      target: "Old Newsletter (ID: mag-6)",
      user: "System Admin (IT)",
      time: "3 hours ago",
    },
    {
      action: "New account registered",
      target: "manager_west@iocl.in",
      user: "Self Service",
      time: "5 hours ago",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Title section */}
      <div>
        <p className="text-[11px] font-bold tracking-widest text-iocl-orange uppercase">
          OPERATIONAL METRICS
        </p>
        <h1 className="mt-1 text-3xl font-extrabold text-iocl-navy">Overview Console</h1>
        <p className="mt-1 text-sm text-slate-500">
          Real-time status monitoring, activity streams, and administrative controls.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="admin-widget overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition duration-200"
            >
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  {stat.label}
                </p>
                <div className={`rounded-xl border p-2 ${stat.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-4 text-3xl font-black text-iocl-navy">{stat.value}</p>
              <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                <TrendingUp className="h-3 w-3" />
                <span>+4.2% since yesterday</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Quick Actions + Logs */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Quick Actions Panel */}
        <div className="admin-widget lg:col-span-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-extrabold text-iocl-navy mb-4">Quick Administrator Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => navigate("/admin/publications")}
                className="flex w-full items-center justify-between rounded-xl border border-slate-100 hover:border-iocl-orange bg-slate-50/50 hover:bg-orange-50/20 p-4 transition text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-orange-100 p-2 text-iocl-orange group-hover:scale-110 transition duration-200">
                    <PlusCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-700">Upload Publication</p>
                    <p className="text-[10px] text-slate-400">Register magazines or newspapers</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-iocl-orange group-hover:translate-x-1 transition" />
              </button>

              <button
                onClick={() => navigate("/admin/upload-magazine")}
                className="flex w-full items-center justify-between rounded-xl border border-slate-100 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/20 p-4 transition text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-100 p-2 text-blue-600 group-hover:scale-110 transition duration-200">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-700">Employee Accounts</p>
                    <p className="text-[10px] text-slate-400">Manage directory records</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition" />
              </button>

              <button
                onClick={() => navigate("/admin/profile")}
                className="flex w-full items-center justify-between rounded-xl border border-slate-100 hover:border-violet-500 bg-slate-50/50 hover:bg-violet-50/20 p-4 transition text-left cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-violet-100 p-2 text-violet-600 group-hover:scale-110 transition duration-200">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-700">Security Parameters</p>
                    <p className="text-[10px] text-slate-400">Audit logs and access keys</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-violet-500 group-hover:translate-x-1 transition" />
              </button>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-4 text-center">
            <p className="text-[10px] text-slate-400 font-medium">
              System Uptime: 99.98% · Version 1.0.0
            </p>
          </div>
        </div>

        {/* System Logs Feed */}
        <div className="admin-widget lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-extrabold text-iocl-navy">Recent Administrative Actions</h3>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-500 flex items-center gap-1">
              <FileCheck2 className="h-3 w-3" /> Live
            </span>
          </div>

          <div className="space-y-4">
            {recentLogs.map((log, index) => (
              <div
                key={index}
                className="flex items-start justify-between border-b border-slate-50 pb-3 last:border-0 last:pb-0"
              >
                <div className="flex gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-iocl-orange" />
                  <div>
                    <p className="text-xs font-bold text-slate-700">{log.action}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Target: <span className="font-semibold text-slate-500">{log.target}</span> · By {log.user}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0 font-medium">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
