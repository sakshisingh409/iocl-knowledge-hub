import { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon: LucideIcon;
}

export default function AuthInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon: Icon,
}: Props) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-bold tracking-wider text-slate-500">
        {label}
      </label>

      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-iocl-orange focus:ring-2 focus:ring-iocl-orange/20"
        />
      </div>
    </div>
  );
}