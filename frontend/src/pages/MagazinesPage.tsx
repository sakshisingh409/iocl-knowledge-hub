import { useEffect, useMemo, useState } from "react";
import { supabase } from "../services/supabase";
import { Filter, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import PageHeader from "../components/ui/PageHeader";
import PublicationCard from "../components/ui/PublicationCard";

const CATEGORIES = ["All", "CORPORATE MAGAZINE", "TECHNICAL MAGAZINE", "HR NEWSLETTER", "SAFETY BULLETIN", "SUSTAINABILITY", "OPERATIONS"];

export default function MagazinesPage() {
  const { globalSearch, toggleBookmark, markAsViewed } = useAuth();
  const [dbMagazines, setDbMagazines] = useState<any[]>([]);
  useEffect(() => {
  async function fetchMagazines() {
    const { data, error } = await supabase
      .from("publications")
      .select("*")
      .eq("type", "magazine")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setDbMagazines(data || []);
  }

  fetchMagazines();
}, []);

  const [localSearch, setLocalSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const magazines = useMemo(() => {
    const query = (localSearch || globalSearch).toLowerCase();
    return dbMagazines
      .filter((p) => p.type === "magazine")
      .filter((p) => activeCategory === "All" || p.category === activeCategory)

      .map((item) => ({
  ...item,
  image: item.thumbnail,
  date: new Date(item.created_at).toLocaleDateString(),
  pages: "-",
  size: "-",
  bookmarked: false,
  isNew: true,
  tags: [],
}))

      .filter(
  (p) =>
    !query ||
    p.title.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query)
);
  }, [dbMagazines, localSearch, globalSearch, activeCategory]);

  return (
    <div>
      <PageHeader
        eyebrow="PERIODICALS"
        title="Magazine Repository"
        subtitle={`${magazines.length} magazines available`}
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
          placeholder="Search magazines by title, topic, tag..."
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-iocl-orange focus:ring-2 focus:ring-iocl-orange/20"
        />
      </div>

      <div className="grid grid-cols-4 gap-5">
        {magazines.map((item) => (
          <PublicationCard
            key={item.id}
            item={item}
            onBookmark={toggleBookmark}
            onOpen={markAsViewed}
          />
        ))}
      </div>

      {magazines.length === 0 && (
        <p className="py-12 text-center text-slate-400">No magazines match your search.</p>
      )}
    </div>
  );
}
