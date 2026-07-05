interface NewsCardProps {
  article: any;
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition">
      <img
        src={article.image}
        alt={article.title}
        className="h-44 w-full object-cover"
      />

      <div className="p-4">
        <p className="text-xs text-iocl-orange font-semibold">
          {article.source?.name}
        </p>

        <h3 className="mt-2 text-lg font-bold text-iocl-navy line-clamp-2">
          {article.title}
        </h3>

        <p className="mt-2 text-sm text-slate-500 line-clamp-3">
          {article.description}
        </p>

        <p className="mt-3 text-xs text-slate-400">
          {new Date(article.publishedAt).toLocaleDateString()}
        </p>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-lg bg-iocl-orange px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
        >
          Read More
        </a>
      </div>
    </div>
  );
}