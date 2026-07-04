import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { supabase } from "../services/supabase";

export default function UpdatePasswordPage() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password updated successfully.");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        <h2 className="text-3xl font-extrabold text-iocl-navy">
          Reset Password
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Enter your new password.
        </p>

        <div className="relative mt-6">
          <Lock className="absolute left-3 top-4 h-4 w-4 text-slate-400" />

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border py-3 pl-10"
          />
        </div>

        <div className="relative mt-4">
          <Lock className="absolute left-3 top-4 h-4 w-4 text-slate-400" />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-xl border py-3 pl-10"
          />
        </div>

        <button
          onClick={handleUpdate}
          className="mt-6 w-full rounded-xl bg-iocl-orange py-3 font-bold text-white"
        >
          Update Password
        </button>

        {message && (
          <p className="mt-4 text-center text-green-600">
            {message}
          </p>
        )}

        {error && (
          <p className="mt-4 text-center text-red-600">
            {error}
          </p>
        )}

      </div>
    </div>
  );
}