import { ExternalLink, Clock } from "lucide-react";
interface NewsCardProps {
  article: any;
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col h-[430px]">
      <div>
        <div className="relative h-52 overflow-hidden">

  <img
    src={
      article.image ||
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200"
    }
    alt={article.title}
    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-bold text-iocl-orange shadow">
    {article.source?.name || "Energy News"}
  </span>

</div>

        <div className="p-4">
          <h3 className="text-lg font-bold leading-snug text-slate-900 line-clamp-2 group-hover:text-iocl-orange transition-colors duration-300">
            {article.title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-slate-600 line-clamp-3">
            {article.description}
          </p>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-slate-100 p-5">

  <div className="flex items-center gap-2 text-xs text-slate-500">
    <Clock className="h-4 w-4" />
    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
  </div>

  <a
    href={article.url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 rounded-xl bg-iocl-orange px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-orange-600 hover:scale-105"
  >
    Read
    <ExternalLink className="h-4 w-4" />
  </a>

</div>
    </div>
  );
}