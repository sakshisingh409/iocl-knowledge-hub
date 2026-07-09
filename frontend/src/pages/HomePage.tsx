import { getIndustryNews } from "../services/newsService";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Bot,
  FileText,
  LayoutDashboard,
  Newspaper,
  User,
  ArrowRight,
  Search,
  Bookmark,
  TrendingUp,
  Sparkles,
  Clock,
  Building2,
  Download,
  Library,
  ShieldCheck
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { DASHBOARD_STATS, MAGAZINES } from "../data/mockData";
import Footer from "../components/ui/Footer";
import PublicationCard from "../components/ui/PublicationCard";
import NewsCard from "../components/ui/NewsCard";
import { gsap } from "gsap";

export default function HomePage() {
  const navigate = useNavigate();
const [liveNews, setLiveNews] = useState<any[]>([]);

useEffect(() => {
  async function loadNews() {
    try {
      const news = await getIndustryNews();
      setLiveNews(news.slice(0, 3));
    } catch (err) {
      console.error(err);
    }
  }

  loadNews();
}, []);

  const { user, publications, bookmarkedPublications, recentlyViewed, markAsViewed, toggleBookmark } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [timeOfDayGreeting, setTimeOfDayGreeting] = useState("Welcome");

  // Hello Greeting based on time of day
  useEffect(() => {
    const hrs = new Date().getHours();
    if (hrs < 12) setTimeOfDayGreeting("Good Morning");
    else if (hrs < 17) setTimeOfDayGreeting("Good Afternoon");
    else setTimeOfDayGreeting("Good Evening");
  }, []);

 

  // GSAP Animations
  useEffect(() => {
    // 1. Hero fade-up
    gsap.fromTo(
      ".hero-anim",
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.15 }
    );

    // 2. Stats stagger and count up
    const statsElements = document.querySelectorAll(".stat-counter");
    statsElements.forEach((el) => {
      const target = parseInt(el.getAttribute("data-target") || "0", 10);
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = Math.floor(obj.val).toLocaleString();
        },
      });
    });

    // 3. Section reveal scroll fade-in
    gsap.fromTo(
      ".section-reveal",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.1 }
    );
  }, []);

  // Employee Name details
  const employeeName = user?.full_name || "Guest Employee";
  const employeeId = user?.employee_id || "IOCL-Guest";
  const department = user?.department || "Refinery & Operations";

  // Filter publications based on search bar
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Set global search term and navigate to dashboard for results
      navigate(`/dashboard`);
    }
  };

  const quickAccessCards = [
    {
      title: "Interactive Dashboard",
      desc: "Explore document statistics and filters",
      icon: LayoutDashboard,
      route: "/dashboard",
      color: "from-blue-500/10 to-indigo-500/10 text-blue-600 hover:border-blue-300",
    },
    {
      title: "Magazine Repository",
      desc: "Browse corporate and technical magazines",
      icon: FileText,
      route: "/magazines",
      color: "from-orange-500/10 to-amber-500/10 text-iocl-orange hover:border-orange-300",
    },
    
    {
      title: "My Saved Library",
      desc: "Access your bookmarked resources",
      icon: Bookmark,
      route: "/bookmarks",
      color: "from-violet-500/10 to-purple-500/10 text-violet-600 hover:border-violet-300",
    },
    {
      title: "AI Knowledge Chatbot",
      desc: "Interact with our intelligent assistant",
      icon: Bot,
      route: "/chat",
      color: "from-pink-500/10 to-rose-500/10 text-pink-600 hover:border-pink-300",
    },
    {
      title: "My Account Details",
      desc: "View department mappings & logout controls",
      icon: User,
      route: "/profile",
      color: "from-slate-500/10 to-slate-600/10 text-slate-700 hover:border-slate-400",
    },
  ];

  // Check if admin to add Admin Console shortcut
  const isAdmin = user?.role === "admin" || user?.email === "admin@iocl.in";
  if (isAdmin) {
    quickAccessCards.push({
      title: "Admin Control Center",
      desc: "Manage publications, users, and audit logs",
      icon: ShieldCheck,
      route: "/admin/dashboard",
      color: "from-red-500/10 to-rose-700/10 text-red-600 hover:border-red-300 border-red-100",
    });
  }

  const featured = MAGAZINES[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between">
      
      {/* Home Navigation Top bar */}
      <nav className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200/60 bg-white/80 px-8 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-iocl-orange text-lg font-black text-white shadow-md shadow-iocl-orange/20">
            I
          </div>
          <div>
            <p className="text-sm font-extrabold leading-tight text-iocl-navy">Indian Oil Corporation</p>
            <p className="text-[10px] font-bold tracking-widest text-slate-400">KNOWLEDGE PORTAL</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-iocl-navy">{employeeName}</p>
            <p className="text-[10px] text-slate-400 font-semibold">{department}</p>
          </div>
          <button
            onClick={() => navigate(user ? "/profile" : "/login")}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 border border-slate-200 text-sm font-bold text-iocl-navy hover:bg-slate-200 hover:scale-105 transition"
          >
            {user ? employeeName.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Main Home Container */}
      <div className="flex-1 pb-16 space-y-12">

        {/* Hero Section */}
        <section
          className="relative overflow-hidden bg-cover bg-center py-20 px-8 border-b border-slate-200/40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1581092918056-0c4c3acd3782?w=1600')",
          }}
        >
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-iocl-navy/95 via-iocl-navy/70 to-slate-950/40" />

          {/* Glowing element inside Hero */}
          <div className="absolute top-1/2 left-1/3 h-64 w-64 rounded-full bg-iocl-orange/20 blur-[100px] pointer-events-none" />

          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-2xl text-white">
              <span className="hero-anim inline-flex items-center gap-1.5 rounded-full bg-iocl-orange/25 px-3 py-1 text-xs font-extrabold text-iocl-orange border border-iocl-orange/20 uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                {timeOfDayGreeting}, {employeeName.split(" ")[0]}
              </span>

              <h1 className="hero-anim mt-4 text-4xl sm:text-5xl font-black leading-tight">
                Welcome to the
              </h1>
              <h2 className="hero-anim text-4xl sm:text-5xl font-black text-iocl-orange leading-tight">
                IOCL Knowledge Hub.
              </h2>
              
              <p className="hero-anim mt-4 text-sm sm:text-base leading-relaxed text-slate-300">
                Empowering IndianOil employees with unified access to internal publications, refinery archives, technical journals, and safety bulletins — powered by advanced retrieval systems.
              </p>

              {/* Integrated Search Bar */}
              <form onSubmit={handleSearchSubmit} className="hero-anim mt-8 max-w-lg relative flex items-center group">
                <Search className="absolute left-4.5 text-slate-400 h-4.5 w-4.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search refinery specs, safety journals, newsletters..."
                  className="w-full rounded-2xl border border-slate-700/60 bg-slate-900/65 backdrop-blur-md py-4 pl-12 pr-28 text-sm text-white placeholder-slate-400 outline-none ring-1 ring-slate-800 transition focus:border-iocl-orange focus:ring-2 focus:ring-iocl-orange/20"
                />
                <button
                  type="submit"
                  className="absolute right-2.5 rounded-xl bg-iocl-orange hover:bg-orange-600 px-4 py-2 text-xs font-bold text-white transition hover:scale-[1.01] cursor-pointer"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Dynamic Statistics counters */}
        <section className="mx-auto max-w-7xl px-8 section-reveal">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-start text-slate-400">
                <span className="text-[10px] font-extrabold uppercase tracking-wider">Total Documents</span>
                <Library className="h-4 w-4 text-blue-500" />
              </div>
              <p className="stat-counter mt-2 text-2xl sm:text-3xl font-black text-iocl-navy" data-target={publications.length}>0</p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-start text-slate-400">
                <span className="text-[10px] font-extrabold uppercase tracking-wider">Magazines Available</span>
                <FileText className="h-4 w-4 text-iocl-orange" />
              </div>
              <p className="stat-counter mt-2 text-2xl sm:text-3xl font-black text-iocl-navy" data-target={DASHBOARD_STATS.magazines}>0</p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-start text-slate-400">
                <span className="text-[10px] font-extrabold uppercase tracking-wider">Newsbriefs Index</span>
                <Newspaper className="h-4 w-4 text-emerald-500" />
              </div>
              <p className="stat-counter mt-2 text-2xl sm:text-3xl font-black text-iocl-navy" data-target={DASHBOARD_STATS.newspapers}>0</p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-start text-slate-400">
                <span className="text-[10px] font-extrabold uppercase tracking-wider">Document Downloads</span>
                <Download className="h-4 w-4 text-violet-500" />
              </div>
              <p className="stat-counter mt-2 text-2xl sm:text-3xl font-black text-iocl-navy" data-target={DASHBOARD_STATS.downloads}>0</p>
            </div>

          </div>
        </section>

        {/* Quick Access Grid */}
        <section className="mx-auto max-w-7xl px-8 section-reveal">
          <h3 className="text-xl font-extrabold text-iocl-navy mb-6 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-iocl-orange" /> Quick Access Services
          </h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {quickAccessCards.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.title}
                  onClick={() => navigate(card.route)}
                  className={`rounded-2xl bg-white border border-slate-200/80 p-6 text-left shadow-sm hover:shadow-lg transition duration-300 hover:scale-[1.02] cursor-pointer flex flex-col justify-between h-44 group`}
                >
                  <div className={`rounded-xl bg-gradient-to-br ${card.color.split(" ")[0]} ${card.color.split(" ")[1]} p-2.5 max-w-max group-hover:scale-110 transition duration-200`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-iocl-navy mt-4">{card.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{card.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-7xl px-8">
  <div className="mb-6 flex items-center justify-between">
    <h2 className="text-3xl font-bold text-slate-900">
      Live Industry News
    </h2>

    <button
      onClick={() => navigate("/live-news")}
      className="rounded-xl bg-orange-500 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-600"
    >
      View All →
    </button>
  </div>

  <div className="grid gap-6 md:grid-cols-3">
  {liveNews.map((article, index) => (
    <div
      key={index}
      className="overflow-hidden rounded-3xl bg-white shadow-lg"
    >
      <img
        src={
          article.image ||
          "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800"
        }
        className="h-56 w-full object-cover"
        alt={article.title}
      />

      <div className="p-5">
        <p className="text-xs font-bold uppercase text-orange-500">
          {article.source?.name || "Industry News"}
        </p>

        <h3 className="mt-2 line-clamp-2 text-xl font-bold">
          {article.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm text-slate-600">
          {article.description}
        </p>

        <button
          onClick={() => navigate("/live-news")}
          className="mt-5 font-semibold text-orange-600"
        >
          Read More →
        </button>
      </div>
    </div>
  ))}
</div>

</section>

        {/* Featured Spotlight Banner */}
        <section className="mx-auto max-w-7xl px-8 section-reveal">
          <h3 className="text-xl font-extrabold text-iocl-navy mb-6">Featured Publication Spotlight</h3>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row hover:shadow-md transition">
            <img
              src={featured.image}
              alt={featured.title}
              className="h-56 md:w-64 w-full shrink-0 object-cover"
            />
            <div className="flex flex-col justify-center p-6 sm:p-8 flex-1">
              <div className="mb-2 flex gap-2">
                <span className="rounded-full bg-iocl-orange px-2.5 py-0.5 text-[9px] font-extrabold text-white uppercase tracking-wider border border-iocl-orange/10">
                  LATEST RELEASE
                </span>
                <span className="rounded-full bg-green-500 px-2.5 py-0.5 text-[9px] font-extrabold text-white uppercase tracking-wider">
                  NEW
                </span>
              </div>
              <h4 className="text-xl font-extrabold text-iocl-navy">{featured.title}</h4>
              <p className="mt-0.5 text-xs text-slate-400">
                Released: {featured.date} · {featured.pages} pages · {featured.size}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-slate-500 max-w-2xl">{featured.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={() => {
                  markAsViewed(featured.id);
                  navigate(`/dashboard`);
                }}
                className="mt-6 flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-3 max-w-max cursor-pointer transition hover:scale-[1.02]"
              >
                Access Publication
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* Split Section: Global News + Latest Magazines */}
        <section className="mx-auto max-w-7xl px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 section-reveal">
          
          {/* Latest magazines column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-iocl-navy">Latest Magazines</h3>
              <button
                onClick={() => navigate("/magazines")}
                className="text-xs font-bold text-iocl-orange hover:underline cursor-pointer flex items-center gap-0.5"
              >
                See all <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {publications
                .filter((p) => p.type === "magazine")
                .slice(0, 2)
                .map((pub) => (
                  <PublicationCard
                    key={pub.id}
                    item={pub}
                    onBookmark={toggleBookmark}
                    onOpen={(id) => {
                      markAsViewed(id);
                      navigate("/dashboard");
                    }}
                  />
                ))}
            </div>
          </div>

        
        </section>

        {/* Personalized Feeds: Bookmarks & Recently Viewed */}
        {(bookmarkedPublications.length > 0 || recentlyViewed.length > 0) && (
          <section className="mx-auto max-w-7xl px-8 grid grid-cols-1 md:grid-cols-2 gap-8 section-reveal">
            
            {/* Recently Viewed */}
            {recentlyViewed.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock className="h-4.5 w-4.5 text-iocl-navy" />
                  <h3 className="text-base font-extrabold text-iocl-navy">Recently Viewed</h3>
                </div>
                <div className="flex flex-col gap-3">
                  {recentlyViewed.slice(0, 2).map((pub) => (
                    <PublicationCard
                      key={pub.id}
                      item={pub}
                      variant="horizontal"
                      onBookmark={toggleBookmark}
                      onOpen={(id) => {
                        markAsViewed(id);
                        navigate("/dashboard");
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Bookmarks */}
            {bookmarkedPublications.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <Bookmark className="h-4.5 w-4.5 text-iocl-orange fill-iocl-orange" />
                  <h3 className="text-base font-extrabold text-iocl-navy">Your Saved Library</h3>
                </div>
                <div className="flex flex-col gap-3">
                  {bookmarkedPublications.slice(0, 2).map((pub) => (
                    <PublicationCard
                      key={pub.id}
                      item={pub}
                      variant="horizontal"
                      onBookmark={toggleBookmark}
                      onOpen={(id) => {
                        markAsViewed(id);
                        navigate("/dashboard");
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

          </section>
        )}

      </div>

      {/* Corporate Enterprise Footer */}
      <Footer />

    </div>
  );
}