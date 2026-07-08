import { Bookmark } from "lucide-react";
import type { Publication } from "../../types";

interface PublicationCardProps {
  item: Publication;
  onBookmark?: (id: string) => void;
  onOpen?: (id: string) => void;
  variant?: "grid" | "compact" | "horizontal";
}

function TypeBadge({ type }: { type: Publication["type"] }) {
  const styles =
    type === "magazine"
      ? "bg-orange-50 text-orange-700 border-orange-100"
      : "bg-blue-50 text-blue-700 border-blue-100";
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${styles}`}>
      {type}
    </span>
  );
}

export default function PublicationCard({
  item,
  onBookmark,
  onOpen,
  variant = "grid",
}: PublicationCardProps) {
  
  if (variant === "horizontal") {
    return (
      <div className="flex gap-5 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm hover-lift-card transition duration-300">
        <img
          src={item.image}
          alt={item.title}
          className="h-24 w-36 shrink-0 rounded-xl object-cover bg-slate-50"
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-extrabold text-iocl-navy truncate max-w-xs">{item.title}</h3>
                <TypeBadge type={item.type} />
              </div>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{item.date}</p>
            </div>
            <button
              type="button"
              onClick={() => onBookmark?.(item.id)}
              className="shrink-0 rounded-lg p-1.5 hover:bg-orange-50 text-slate-300 hover:text-iocl-orange transition cursor-pointer"
            >
              <Bookmark
                className={`h-4 w-4 ${item.bookmarked ? "fill-iocl-orange text-iocl-orange" : ""}`}
              />
            </button>
          </div>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500">{item.description}</p>
          <button
            type="button"
            onClick={() => onOpen?.(item.id)}
            className="mt-auto self-start pt-2 text-xs font-bold text-iocl-orange hover:underline cursor-pointer flex items-center gap-0.5"
          >
            Access Publication →
          </button>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={() => onOpen?.(item.id)}
        className="w-52 shrink-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white text-left shadow-sm hover-lift-card transition duration-300 cursor-pointer flex flex-col justify-between"
      >
        <img src={item.image} alt={item.title} className="h-32 w-full object-cover" />
        <div className="p-3.5 flex-1 flex flex-col justify-between">
          <div>
            <div className="mb-2 flex flex-wrap gap-1">
              <TypeBadge type={item.type} />
              {item.isNew && (
                <span className="rounded-full bg-green-50 px-2 py-0.5 text-[9px] font-bold text-green-700 border border-green-150 uppercase tracking-wider">
                  NEW
                </span>
              )}
            </div>
            <h3 className="text-xs font-bold text-iocl-navy line-clamp-2">{item.title}</h3>
          </div>
          <p className="mt-2 text-[10px] text-slate-400 font-semibold">{item.date}</p>
        </div>
      </button>
    );
  }

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm hover-lift-card transition duration-300 flex flex-col justify-between">
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-extrabold text-iocl-navy shadow-sm border border-slate-100 uppercase tracking-wider">
            {item.category}
          </span>
          {item.isNew && (
            <span className="rounded-full bg-green-500 px-2.5 py-1 text-[9px] font-extrabold text-white shadow-sm uppercase tracking-wider">
              NEW
            </span>
          )}
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-bold text-iocl-navy">{item.title}</h3>
              <p className="mt-0.5 text-[10px] text-slate-400 font-semibold">
                {item.date} · {item.pages}p · {item.size}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onBookmark?.(item.id)}
              className="shrink-0 rounded-lg p-1.5 hover:bg-orange-50 text-slate-300 hover:text-iocl-orange transition cursor-pointer"
            >
              <Bookmark
                className={`h-4 w-4 ${item.bookmarked ? "fill-iocl-orange text-iocl-orange" : ""}`}
              />
            </button>
          </div>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500">
            {item.description}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onOpen?.(item.id)}
          className="mt-4 self-start text-xs font-bold text-iocl-orange hover:underline cursor-pointer flex items-center gap-0.5"
        >
          Open Details →
        </button>
      </div>
    </div>
  );
}
