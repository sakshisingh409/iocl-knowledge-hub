import { Link } from "react-router-dom";
import { BookOpen, ChevronRight, Clock, Download, LayoutGrid, TrendingUp } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { DASHBOARD_STATS, MAGAZINES, NEWSPAPERS, TRENDING_TOPICS } from "../data/mockData";
import PublicationCard from "../components/ui/PublicationCard";
import StatCard from "../components/ui/StatCard";

export default function DashboardPage() {
  const { user, globalSearch, toggleBookmark, markAsViewed, recentlyViewed } = useAuth();

  const firstName = user?.name.split(" ")[0] ?? "User";
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const lastLogin = new Date().toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const featured = MAGAZINES[0];
  const latestNewspapers = NEWSPAPERS.slice(0, 4);

  const filteredRecent = globalSearch
    ? recentlyViewed.filter(
        (p) =>
          p.title.toLowerCase().includes(globalSearch.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(globalSearch.toLowerCase())),
      )
    : recentlyViewed;

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-iocl-orange">
          {today}
        </p>
        <h1 className="mt-1 text-3xl font-extrabold text-iocl-navy">
          Welcome, {firstName}.
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          {DASHBOARD_STATS.newPublications} new publications this month · Last login {lastLogin}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          label="TOTAL DOCUMENTS"
          value={DASHBOARD_STATS.totalDocuments}
          icon={BookOpen}
          iconColor="text-iocl-orange"
          iconBg="bg-orange-50"
        />
        <StatCard
          label="MAGAZINES"
          value={DASHBOARD_STATS.magazines}
          icon={BookOpen}
        />
        <StatCard
          label="NEWSPAPERS"
          value={DASHBOARD_STATS.newspapers}
          icon={LayoutGrid}
        />
        <StatCard
          label="DOWNLOADS"
          value={DASHBOARD_STATS.downloads}
          icon={Download}
        />
      </div>

      {/* Recently viewed */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold tracking-widest text-slate-400">CONTINUE READING</p>
            <h2 className="text-xl font-extrabold text-iocl-navy">Recently viewed</h2>
          </div>
          <Clock className="h-5 w-5 text-slate-300" />
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {filteredRecent.map((item) => (
            <PublicationCard
              key={item.id}
              item={item}
              variant="compact"
              onOpen={markAsViewed}
            />
          ))}
        </div>
      </section>

      {/* Featured + Trending */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="flex">
            <img
              src={featured.image}
              alt={featured.title}
              className="h-52 w-52 shrink-0 object-cover"
            />
            <div className="flex flex-col justify-center p-6">
              <div className="mb-2 flex gap-2">
                <span className="rounded-full bg-iocl-orange px-2.5 py-0.5 text-[10px] font-bold text-white">
                  LATEST EDITION
                </span>
                <span className="rounded-full bg-green-500 px-2.5 py-0.5 text-[10px] font-bold text-white">
                  NEW
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-iocl-navy">{featured.title}</h3>
              <p className="mt-1 text-xs text-slate-400">
                {featured.date} · {featured.pages} pages · {featured.size}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">{featured.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-iocl-orange" />
            <h3 className="font-bold text-iocl-navy">Trending Topics</h3>
          </div>
          <ul className="space-y-3">
            {TRENDING_TOPICS.map(({ rank, label }) => (
              <li key={rank} className="flex items-center gap-3">
                <span className="w-8 text-xs font-bold text-slate-300">
                  #{String(rank).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold text-iocl-navy">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Latest newspapers */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold tracking-widest text-slate-400">DAILY BRIEFS</p>
            <h2 className="text-xl font-extrabold text-iocl-navy">Latest newspapers</h2>
          </div>
          <Link
            to="/newspapers"
            className="flex items-center gap-1 text-sm font-semibold text-iocl-orange hover:underline"
          >
            See all <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {latestNewspapers.map((item) => (
            <PublicationCard
              key={item.id}
              item={item}
              onBookmark={toggleBookmark}
              onOpen={markAsViewed}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
