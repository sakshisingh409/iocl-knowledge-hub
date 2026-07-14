import { supabase } from "../services/supabase";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import PublicationCard from "../components/ui/PublicationCard";

const CATEGORIES = ["All", "INDUSTRY BRIEFING", "SECTOR NEWS", "REFINERY OPERATIONS", "MARKET ANALYSIS", "CORPORATE NEWS"];

export default function NewspapersPage() {
  const { globalSearch, toggleBookmark, markAsViewed } = useAuth();
  const [localSearch, setLocalSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

 const [dbNewspapers, setDbNewspapers] = useState<any[]>([]);

useEffect(() => {
  async function fetchNewspapers() {
    const { data, error } = await supabase
      .from("publications")
      .select("*")
      .eq("type", "newspaper")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setDbNewspapers(data || []);
  }

  fetchNewspapers();
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

  return dbNewspapers
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
        p.description.toLowerCase().includes(query) ||
        p.tags.some((t: string) => t.toLowerCase().includes(query))
    );
}, [dbNewspapers, localSearch, globalSearch, activeCategory]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50">
      

      <div className="mb-4 flex flex-wrap gap-2">
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
            </div>

      <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-iocl-navy via-slate-900 to-iocl-orange p-8 text-white shadow-2xl">

  <div className="max-w-3xl">

    <span className="rounded-full bg-white/20 px-4 py-1 text-xs font-bold uppercase tracking-widest">
      🔥 Breaking Energy News
    </span>

    <h1 className="mt-5 text-4xl font-extrabold leading-tight">
      Stay Updated with the Latest Oil & Energy Industry News
    </h1>

    <p className="mt-4 text-base text-white/80 leading-7">
      Explore real-time updates from Indian Oil, global energy markets,
      refinery operations, petroleum industry trends and corporate announcements.
    </p>

      <div className="mt-8 grid max-w-2xl grid-cols-3 gap-4">

  <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
    <p className="text-3xl font-bold text-white">120+</p>
    <p className="mt-1 text-sm text-white/70">
      Live Articles
    </p>
  </div>

  <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
    <p className="text-3xl font-bold text-white">15+</p>
    <p className="mt-1 text-sm text-white/70">
      News Sources
    </p>
  </div>

  <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
    <p className="text-3xl font-bold text-white">24×7</p>
    <p className="mt-1 text-sm text-white/70">
      Live Updates
    </p>
  </div>

</div>

  </div>

</div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-iocl-orange" />
        <input
          type="search"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Search newspapers by title, topic, tag..."
          className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-5 text-sm shadow-md transition-all duration-300 outline-none focus:border-iocl-orange focus:ring-4 focus:ring-iocl-orange/20"
        />
      </div>

      <div className="mb-8">
  <h2 className="mb-3 text-sm font-bold text-slate-500 uppercase">
    Trending Topics
  </h2>

  <div className="flex flex-wrap gap-3">
    <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
      #IndianOil
    </span>

    <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
      #Refinery
    </span>

    <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
      #Energy
    </span>

    <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
      #Safety
    </span>

    <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
      #Pipeline
    </span>
  </div>
</div>

<div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
  {newspapers.map((item) => (
    <PublicationCard
      key={item.id}
      item={item}
      onBookmark={toggleBookmark}
      onOpen={markAsViewed}
    />
  ))}
</div>

      {newspapers.length === 0 && (
        <p className="py-12 text-center text-slate-400">No newspapers match your search.</p>
      )}
    </div>
  );
}
