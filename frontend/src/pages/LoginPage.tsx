import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("employee@iocl.in");
  const [password, setPassword] = useState("iocl@123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = login(email, password);
    if (err) {
      setError(err);
      return;
    }
    navigate("/dashboard");
  };

  const fillDemo = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError("");
  };

  return (
    <div className="flex min-h-screen">
      {/* Hero panel */}
      <div className="relative hidden w-[55%] overflow-hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3782?w=1200&h=900&fit=crop"
          alt="IOCL refinery"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-iocl-navy/90 via-iocl-navy/70 to-iocl-navy/50" />
        <div className="relative flex h-full flex-col justify-between p-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-iocl-orange text-xl font-black text-white">
              I
            </div>
            <div>
              <p className="text-lg font-extrabold text-white">Indian Oil Corporation</p>
              <p className="text-xs font-semibold tracking-widest text-white/60">
                KNOWLEDGE HUB
              </p>
            </div>
          </div>

          <div className="max-w-lg">
            <p className="text-xs font-bold tracking-widest text-white/60">
              ENTERPRISE KNOWLEDGE PLATFORM
            </p>
            <h1 className="mt-4 text-5xl font-extrabold leading-tight text-white">
              Every IOCL publication.
            </h1>
            <h1 className="text-5xl font-extrabold leading-tight text-iocl-orange">
              One intelligent hub.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              Search, read and ask questions across magazines, newspapers, safety bulletins and
              annual reports — accelerated by AI.
            </p>
          </div>

          <p className="text-xs text-white/40">© 2025 IOCL — Internal access only</p>
        </div>
      </div>

      {/* Login form */}
      <div className="flex flex-1 items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md">
          <p className="text-[11px] font-bold tracking-widest text-iocl-orange">
            EMPLOYEE SIGN IN
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-iocl-navy">Welcome back.</h2>
          <p className="mt-2 text-sm text-slate-500">
            Sign in with your IOCL employee credentials to continue.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-[11px] font-bold tracking-wider text-slate-500">
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@iocl.in"
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-iocl-orange focus:ring-2 focus:ring-iocl-orange/20"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-bold tracking-wider text-slate-500">
                PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-11 text-sm outline-none transition focus:border-iocl-orange focus:ring-2 focus:ring-iocl-orange/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-iocl-orange py-3.5 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              Sign in
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="mb-3 text-[11px] font-bold tracking-wider text-slate-400">
              DEMO CREDENTIALS
            </p>
            <button
              type="button"
              onClick={() => fillDemo("employee@iocl.in", "iocl@123")}
              className="mb-2 flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition hover:bg-white"
            >
              <span className="rounded bg-blue-100 px-2 py-0.5 font-bold text-blue-700">
                EMPLOYEE
              </span>
              <span className="font-mono text-slate-600">employee@iocl.in / iocl@123</span>
            </button>
            <button
              type="button"
              onClick={() => fillDemo("admin@iocl.in", "admin@123")}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition hover:bg-white"
            >
              <span className="rounded bg-orange-100 px-2 py-0.5 font-bold text-orange-700">
                ADMIN
              </span>
              <span className="font-mono text-slate-600">admin@iocl.in / admin@123</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
