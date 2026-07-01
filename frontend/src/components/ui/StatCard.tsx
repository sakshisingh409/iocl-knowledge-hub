import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  iconColor = "text-iocl-blue",
  iconBg = "bg-blue-50",
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] font-bold tracking-wider text-slate-400">{label}</p>
        <div className={`rounded-lg p-2 ${iconBg}`}>
          <Icon className={`h-4 w-4 ${iconColor}`} />
        </div>
      </div>
      <p className="text-3xl font-extrabold text-iocl-navy">{value.toLocaleString()}</p>
    </div>
  );
}
