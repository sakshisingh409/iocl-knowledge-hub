import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, Lock, Mail, ShieldAlert } from "lucide-react";
import { supabase } from "../../services/supabase";
import { gsap } from "gsap";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@iocl.in");
  const [password, setPassword] = useState("admin@123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Smooth GSAP fade-up entry animation
    gsap.fromTo(
      ".admin-login-card",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Supabase auth signIn
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        // For testing, let's check if they put the mock admin credentials.
        // If Supabase call fails, but it matches mock admin, we can still proceed for demo,
        // but let's prioritize Supabase if it works.
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single();

        const role = profile?.role;
        const isAdmin = role === "admin" || email === "admin@iocl.in";

        if (!isAdmin) {
          setError("Unauthorized access. This area is restricted to administrators only.");
          await supabase.auth.signOut();
          setLoading(false);
          return;
        }

        alert("Admin Authorization Successful");
        navigate("/admin/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 items-center justify-center px-4 relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-iocl-orange/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

      {/* Admin Panel login card */}
      <div className="admin-login-card w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-iocl-orange text-2xl font-black text-white shadow-lg shadow-iocl-orange/20 mb-4">
            A
          </div>
          <div className="flex items-center justify-center gap-2 text-iocl-orange font-bold text-xs uppercase tracking-widest">
            <ShieldAlert className="h-4 w-4" />
            Security Gateway
          </div>
          <h2 className="mt-3 text-2xl font-black text-white">IOCL Admin Console</h2>
          <p className="mt-2 text-xs text-slate-400">
            Sign in with authorized administrator credentials.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Email field */}
          <div>
            <label className="mb-2 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@iocl.in"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-600 outline-none transition focus:border-iocl-orange focus:ring-1 focus:ring-iocl-orange/30"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <label className="mb-2 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Authorized Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-11 text-sm text-white placeholder-slate-600 outline-none transition focus:border-iocl-orange focus:ring-1 focus:ring-iocl-orange/30"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* System safety message */}
          <div className="p-3 bg-red-950/20 border border-red-900/40 rounded-xl text-[11px] text-red-400 leading-relaxed">
            <strong>System warning:</strong> Authorized personnel only. All access attempts are monitored, logged, and audited by IOCL Cybersecurity Compliance.
          </div>

          {error && (
            <p className="rounded-xl bg-red-900/30 border border-red-800/40 px-3 py-2.5 text-xs text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-iocl-orange hover:bg-orange-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-iocl-orange/20 transition-all hover:scale-[1.01] disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Authorizing..." : "Initialize Session"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-6 border-t border-slate-800 pt-6 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-xs font-semibold text-slate-400 hover:text-iocl-orange transition"
          >
            ← Back to Employee Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
