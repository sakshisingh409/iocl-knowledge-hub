import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Bot,
  FileText,
  LayoutDashboard,
  Newspaper,
  User,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      route: "/dashboard",
    },
    {
      title: "Repository",
      icon: BookOpen,
      route: "/repository",
    },
    {
      title: "Magazines",
      icon: FileText,
      route: "/magazines",
    },
    {
      title: "Newspapers",
      icon: Newspaper,
      route: "/newspapers",
    },
    {
      title: "AI Chatbot",
      icon: Bot,
      route: "/chat",
    },
    {
      title: "Profile",
      icon: User,
      route: "/profile",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Hero */}

      <div
        className="relative h-[360px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1581092918056-0c4c3acd3782?w=1600')",
        }}
      >

        <div className="absolute inset-0 bg-gradient-to-r from-iocl-navy/90 to-black/50" />

        <div className="relative mx-auto flex h-full max-w-7xl items-center px-10">

          <div>

            <p className="text-lg text-white/80">
              Welcome,
            </p>

            <h1 className="mt-2 text-5xl font-extrabold text-white">
              Employee
            </h1>

            <h2 className="mt-3 text-2xl font-semibold text-iocl-orange">
              IOCL Knowledge Hub
            </h2>

            <p className="mt-6 max-w-xl text-white/80">
              Access magazines, newspapers, technical documents,
              AI-powered search and internal knowledge resources
              from one intelligent platform.
            </p>

            <button
              onClick={() => navigate("/dashboard")}
              className="mt-8 flex items-center gap-2 rounded-xl bg-iocl-orange px-8 py-4 font-bold text-white hover:bg-orange-600"
            >
              Enter Knowledge Hub
              <ArrowRight size={18} />
            </button>

          </div>

        </div>

      </div>

      {/* Quick Access */}

      <div className="mx-auto max-w-7xl px-10 py-12">

        <h2 className="mb-8 text-3xl font-bold text-iocl-navy">
          Quick Access
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <button
                key={card.title}
                onClick={() => navigate(card.route)}
                className="rounded-2xl bg-white p-8 text-left shadow transition hover:-translate-y-2 hover:shadow-xl"
              >
                <Icon
                  className="mb-5 text-iocl-orange"
                  size={40}
                />

                <h3 className="text-xl font-bold text-iocl-navy">
                  {card.title}
                </h3>

                <p className="mt-2 text-slate-500">
                  Open {card.title}
                </p>

              </button>
            );
          })}

        </div>

      </div>

    </div>
  );
}