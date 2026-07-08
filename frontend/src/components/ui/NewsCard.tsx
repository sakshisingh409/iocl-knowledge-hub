interface NewsCardProps {
  article: any;
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover-lift-card transition duration-300 flex flex-col justify-between h-96">
      <div>
        <div className="relative overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="h-40 w-full object-cover transition-transform duration-350 hover:scale-105"
          />
          {article.source?.name && (
            <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-extrabold text-iocl-orange shadow-sm uppercase tracking-wider">
              {article.source.name}
            </span>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-sm font-bold text-iocl-navy line-clamp-2 leading-snug">
            {article.title}
          </h3>

          <p className="mt-2 text-xs text-slate-500 line-clamp-3 leading-relaxed">
            {article.description}
          </p>
        </div>
      </div>

      <div className="p-4 pt-0 flex items-center justify-between mt-auto">
        <span className="text-[10px] text-slate-400 font-semibold">
          {new Date(article.publishedAt).toLocaleDateString()}
        </span>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-iocl-orange hover:bg-orange-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:scale-[1.02] cursor-pointer"
        >
          Read Article
        </a>
      </div>
    </div>
  );
}