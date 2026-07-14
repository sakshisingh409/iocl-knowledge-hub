import { useNavigate } from "react-router-dom";
import { Building2, IdCard, LogOut, Mail, MapPin } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import PageHeader from "../components/ui/PageHeader";

export default function ProfilePage() {
  const { user, logout, bookmarkedPublications, recentlyViewed } = useAuth();
  console.log("USER FROM CONTEXT:", user);
  const navigate = useNavigate();

  if (!user) return null;

  const handleSignOut = async () => {
  await logout();
  navigate("/login");
};

  return (
    <div>
      <PageHeader eyebrow="MY ACCOUNT" title="Profile" />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-iocl-navy text-2xl font-bold text-white">
              {user.full_name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-iocl-navy">
                  {user.full_name}
                </h2>
                
              </div>
              <p className="text-sm text-slate-400">
                {user.designation}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InfoField icon={Mail} label="EMAIL" value={user.email} />
            <InfoField
              icon={IdCard}
              label="EMPLOYEE ID"
              value={user.employee_id ?? ""}
            />
            <InfoField
                icon={Building2}
                label="DEPARTMENT"
                value={user.department ?? ""}
                />
            <InfoField
                icon={MapPin}
                label="LOCATION"
                value={user.location ?? ""}
                />
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="mt-6 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-[11px] font-bold tracking-wider text-slate-400">BOOKMARKS</p>
            <p className="mt-2 text-4xl font-extrabold text-iocl-navy">
              {bookmarkedPublications.length}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-[11px] font-bold tracking-wider text-slate-400">RECENTLY READ</p>
            <p className="mt-2 text-4xl font-extrabold text-iocl-navy">{recentlyViewed.length}</p>
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
        <p className="text-[10px] font-bold tracking-wider text-slate-400">{label}</p>
      </div>
      <p className="text-sm font-semibold text-iocl-navy">{value}</p>
    </div>
  );
}
