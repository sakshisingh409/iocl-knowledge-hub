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
      ? "bg-orange-50 text-orange-700"
      : "bg-blue-50 text-blue-700";
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${styles}`}>
      {type.toUpperCase()}
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
      <div className="flex gap-5 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md">
        <img
          src={item.image}
          alt={item.title}
          className="h-28 w-40 shrink-0 rounded-xl object-cover"
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-iocl-navy">{item.title}</h3>
              <p className="mt-0.5 text-xs text-slate-400">{item.date}</p>
            </div>
            <button
              type="button"
              onClick={() => onBookmark?.(item.id)}
              className="shrink-0 rounded-lg p-1.5 transition hover:bg-orange-50"
            >
              <Bookmark
                className={`h-4 w-4 ${item.bookmarked ? "fill-iocl-orange text-iocl-orange" : "text-slate-300"}`}
              />
            </button>
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-slate-500">{item.description}</p>
          <button
            type="button"
            onClick={() => onOpen?.(item.id)}
            className="mt-auto self-start pt-3 text-sm font-semibold text-iocl-orange hover:underline"
          >
            Open →
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
        className="w-52 shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-white text-left shadow-sm transition hover:shadow-md"
      >
        <img src={item.image} alt={item.title} className="h-32 w-full object-cover" />
        <div className="p-3">
          <div className="mb-2 flex flex-wrap gap-1">
            <TypeBadge type={item.type} />
            {item.isNew && (
              <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-700">
                NEW
              </span>
            )}
          </div>
          <h3 className="text-sm font-bold text-iocl-navy">{item.title}</h3>
          <p className="mt-1 text-xs text-slate-400">{item.date}</p>
        </div>
      </button>
    );
  }

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative">
        <img
          src={item.image}
          alt={item.title}
          className="h-44 w-full object-cover transition group-hover:scale-[1.02]"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-iocl-navy shadow-sm">
            {item.category}
          </span>
          {item.isNew && (
            <span className="rounded-full bg-green-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
              NEW
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-bold text-iocl-navy">{item.title}</h3>
            <p className="mt-1 text-xs text-slate-400">
              {item.date} · {item.pages}p · {item.size}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onBookmark?.(item.id)}
            className="shrink-0 rounded-lg p-1.5 transition hover:bg-orange-50"
          >
            <Bookmark
              className={`h-4 w-4 ${item.bookmarked ? "fill-iocl-orange text-iocl-orange" : "text-slate-300 hover:text-iocl-orange"}`}
            />
          </button>
        </div>
        {variant === "grid" && (
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}
