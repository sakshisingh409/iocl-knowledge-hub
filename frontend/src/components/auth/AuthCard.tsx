import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthCard({
  title,
  subtitle,
  children,
}: Props) {
  return (
    <div className="w-full max-w-md">

      <h2 className="text-3xl font-extrabold text-iocl-navy">
        {title}
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        {subtitle}
      </p>

      <div className="mt-8">
        {children}
      </div>

    </div>
  );
}