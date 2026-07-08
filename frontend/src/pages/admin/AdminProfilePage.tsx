import { useNavigate } from "react-router-dom";
import {
  Building2,
  IdCard,
  LogOut,
  Mail,
  MapPin,
  ShieldCheck,
  Database,
  Terminal
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AdminProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  // Use the admin credentials info or default fallback
  const adminName = user.full_name || "Admin User";
  const employeeId = user.employee_id || "IOCL-10001";
  const department = user.department || "Corporate IT";
  const location = user.location || "New Delhi";
  const designation = user.designation || "Executive Director - IT";

  const handleSignOut = async () => {
    await logout();
    navigate("/admin/login");
  };

  const securityLogs = [
    { event: "Admin Console Session initialized", IP: "10.24.12.87", date: "Today, 10:58 AM" },
    { event: "Global search database re-indexed", IP: "System Scheduler", date: "Today, 04:00 AM" },
    { event: "Supabase authentication policy verified", IP: "Supabase Guard", date: "Yesterday, 09:12 PM" },
    { event: "Publications index backup completed", IP: "Backup Node B", date: "Yesterday, 02:00 AM" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-[11px] font-bold tracking-widest text-iocl-orange uppercase">
          CONSOLE MAPPING
        </p>
        <h1 className="mt-1 text-3xl font-extrabold text-iocl-navy">Admin Profile & Settings</h1>
        <p className="mt-1 text-sm text-slate-500 font-medium">
          Manage system preferences, credential authorizations, and view network access logs.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Core Admin Card */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-2xl font-black text-iocl-orange shadow-md">
              {adminName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-iocl-navy">{adminName}</h2>
                <span className="rounded-full bg-red-50 px-2 py-0.5 text-[9px] font-extrabold text-red-700 border border-red-100 uppercase tracking-wide">
                  Console Admin
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">{designation}</p>
            </div>
          </div>

          {/* Details fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoField icon={Mail} label="AUTHENTICATED EMAIL" value={user.email} />
            <InfoField icon={IdCard} label="ADMINISTRATOR ID" value={employeeId} />
            <InfoField icon={Building2} label="DEPARTMENT DIVISION" value={department} />
            <InfoField icon={MapPin} label="GEOGRAPHIC LOCATION" value={location} />
          </div>

          <div className="pt-4 flex justify-between items-center">
            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 px-4 py-2.5 text-xs font-bold text-red-600 transition cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Sign out of Admin Console
            </button>
            <p className="text-[10px] text-slate-400 font-medium">Session token expires in 12 hours</p>
          </div>
        </div>

        {/* Security Logs / API config */}
        <div className="space-y-6 lg:col-span-1">
          {/* Security Log widget */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-extrabold text-iocl-navy mb-4 flex items-center gap-1.5">
              <ShieldCheck className="h-4.5 w-4.5 text-emerald-600 animate-pulse" />
              Access Audit Log
            </h3>
            <div className="space-y-4">
              {securityLogs.map((log, index) => (
                <div key={index} className="text-xs border-b border-slate-50 pb-2.5 last:border-0 last:pb-0">
                  <p className="font-bold text-slate-700">{log.event}</p>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1 font-medium">
                    <span>IP: {log.IP}</span>
                    <span>{log.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Infrastructure Metrics */}
          <div className="rounded-2xl border border-slate-200 bg-slate-900 p-6 shadow-sm text-slate-400 text-xs space-y-3">
            <h3 className="text-white font-extrabold text-sm flex items-center gap-1.5">
              <Terminal className="h-4 w-4 text-iocl-orange" />
              API Environment
            </h3>
            <div className="space-y-2 font-mono text-[10px]">
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span>DATABASE STATUS</span>
                <span className="text-emerald-500 font-bold flex items-center gap-1">
                  <Database className="h-3 w-3" /> CONNECTED
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span>AI MODEL NODE</span>
                <span className="text-emerald-500 font-bold">READY</span>
              </div>
              <div className="flex justify-between">
                <span>ENCRYPTION SYSTEM</span>
                <span className="text-slate-200 font-bold">AES-256-GCM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoField({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
      <div className="mb-1 flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-slate-400" />
        <p className="text-[9px] font-extrabold tracking-wider text-slate-400">{label}</p>
      </div>
      <p className="text-sm font-bold text-iocl-navy truncate">{value}</p>
    </div>
  );
}
