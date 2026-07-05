import NewsCard from "../components/ui/NewsCard";
import { useEffect, useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import { getIndustryNews } from "../services/newsService";
import { useAuth } from "../context/AuthContext";
import PageHeader from "../components/ui/PageHeader";
import PublicationCard from "../components/ui/PublicationCard";

const CATEGORIES = ["All", "INDUSTRY BRIEFING", "SECTOR NEWS", "REFINERY OPERATIONS", "MARKET ANALYSIS", "CORPORATE NEWS"];

export default function NewspapersPage() {
  const { publications, globalSearch, toggleBookmark, markAsViewed } = useAuth();
  const [localSearch, setLocalSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function fetchNews() {
    try {
      const data = await getIndustryNews();
      console.log("NEWS:", data);
      setNews(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  fetchNews();
}, []);

  // const newspapers = useMemo(() => {
  //   const query = (localSearch || globalSearch).toLowerCase();
  //   return publications
  //     .filter((p) => p.type === "newspaper")
  //     .filter((p) => activeCategory === "All" || p.category === activeCategory)
  //     .filter(
  //       (p) =>
  //         !query ||
  //         p.title.toLowerCase().includes(query) ||
  //         p.description.toLowerCase().includes(query) ||
  //         p.tags.some((t) => t.toLowerCase().includes(query)),
  //     );
  // }, [publications, localSearch, globalSearch, activeCategory]);


  const newspapers = useMemo(() => {
  const query = (localSearch || globalSearch).toLowerCase();

  return news.filter(
    (item) =>
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
  );
}, [news, localSearch, globalSearch]);


  return (
    <div>
      <PageHeader
        eyebrow="DAILY EDITIONS"
        title="Newspaper Repository"
        subtitle={`${newspapers.length} Global News Articles`}
        action={
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition ${
              showFilters
                ? "border-iocl-orange bg-iocl-orange-light text-iocl-orange"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
        }
      />

      {showFilters && (
        <div className="mb-4 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                activeCategory === cat
                  ? "bg-iocl-orange text-white"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-iocl-orange"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Search newspapers by title, topic, tag..."
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-iocl-orange focus:ring-2 focus:ring-iocl-orange/20"
        />
      </div>

     <div className="grid grid-cols-4 gap-5">
  {loading ? (
    <p>Loading latest news...</p>
  ) : (
    newspapers.map((article, index) => (
      <NewsCard
        key={article.id || index}
        article={article}
      />
    ))
  )}
</div>

      {newspapers.length === 0 && (
        <p className="py-12 text-center text-slate-400">No newspapers match your search.</p>
      )}
    </div>
  );
}
