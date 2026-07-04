import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <h2 className="text-3xl font-extrabold text-iocl-navy">
          Forgot Password
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Enter your registered email.
        </p>

        <div className="relative mt-6">

          <Mail className="absolute left-3 top-4 h-4 w-4 text-slate-400"/>

          <input
            type="email"
            placeholder="employee@iocl.in"
            className="w-full rounded-xl border py-3 pl-10"
          />

        </div>

        <button
          className="mt-6 w-full rounded-xl bg-iocl-orange py-3 font-bold text-white"
        >
          Send Reset Link
        </button>

        <Link
          to="/login"
          className="mt-5 block text-center font-semibold text-iocl-orange"
        >
          Back to Login
        </Link>

      </div>

    </div>
  );
}