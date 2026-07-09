import { useEffect, useState } from "react";
import { getIndustryNews } from "../services/newsService";
import NewsCard from "../components/ui/NewsCard";

export default function LiveNewsPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  async function fetchNews() {
  setLoading(true);

  try {
    const news = await getIndustryNews(category);
    setArticles(news);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}

useEffect(() => {
  fetchNews();
}, [category]);

  return (
    <div className="p-8">
      <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-iocl-navy via-slate-900 to-iocl-orange p-8 text-white shadow-2xl">

  <div className="flex items-center justify-between">

    <div>

      <span className="rounded-full bg-white/20 px-4 py-1 text-xs font-bold uppercase tracking-widest">
        🟢 Live Industry Feed
      </span>

      <h1 className="mt-5 text-5xl font-extrabold leading-tight">
        Live Oil & Energy News
      </h1>

      <p className="mt-4 max-w-3xl text-lg leading-8 text-white/80">
        Stay updated with the latest Indian Oil, petroleum, refinery,
        crude oil, pipeline and global energy market developments
        from trusted news agencies.
      </p>

    </div>

    <button
  onClick={fetchNews}
  className="rounded-2xl bg-white px-6 py-3 font-bold text-iocl-navy transition hover:scale-105"
>
  🔄 Refresh
</button>

  </div>

</div>


{/* Category Buttons */}

<div className="mb-8 flex flex-wrap gap-3">

  <button
    onClick={() => setCategory("all")}
    className={`rounded-full px-5 py-2 font-semibold ${
      category === "all"
        ? "bg-orange-500 text-white"
        : "bg-white border"
    }`}
  >
    All
  </button>

  <button
    onClick={() => setCategory("iocl")}
    className={`rounded-full px-5 py-2 font-semibold ${
      category === "iocl"
        ? "bg-orange-500 text-white"
        : "bg-white border"
    }`}
  >
    IOCL
  </button>

  <button
    onClick={() => setCategory("refinery")}
    className={`rounded-full px-5 py-2 font-semibold ${
      category === "refinery"
        ? "bg-orange-500 text-white"
        : "bg-white border"
    }`}
  >
    Refinery
  </button>

  <button
    onClick={() => setCategory("crude")}
    className={`rounded-full px-5 py-2 font-semibold ${
      category === "crude"
        ? "bg-orange-500 text-white"
        : "bg-white border"
    }`}
  >
    Crude Oil
  </button>

  <button
    onClick={() => setCategory("government")}
    className={`rounded-full px-5 py-2 font-semibold ${
      category === "government"
        ? "bg-orange-500 text-white"
        : "bg-white border"
    }`}
  >
    Government
  </button>

</div>


<div className="relative mb-8">
  <input
    type="text"
    placeholder="Search live news..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm outline-none transition focus:border-orange-500"
  />
</div>



      {loading ? (
        <p className="text-lg">Loading latest news...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {articles
  .filter((article) =>
    article.title.toLowerCase().includes(search.toLowerCase())
  )
  .map((article, index) => (
            <NewsCard
              key={index}
              article={article}
            />
          ))}
        </div>
      )}
    </div>
  );
}