interface PageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function PageHeader({ eyebrow, title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <p className="text-[11px] font-bold tracking-widest text-iocl-orange">{eyebrow}</p>
        <h1 className="mt-1 text-3xl font-extrabold text-iocl-navy">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
