import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User, Building2 } from "lucide-react";

export default function SignupPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const [password, setPassword] = useState("");

const [confirmPassword, setConfirmPassword] = useState("");

const [department, setDepartment] = useState("");

const [designation, setDesignation] = useState("");

const [location, setLocation] = useState("");

const [phone, setPhone] = useState("");

const [agree, setAgree] = useState(false);

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  if (!agree) {
    alert("Please accept the IOCL Internal Usage Policy.");
    return;
  }

  alert("Account Created Successfully!");

  navigate("/login");
};

  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-[55%] overflow-hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3782?w=1200&h=900&fit=crop"
          alt="IOCL"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-iocl-navy/90 via-iocl-navy/70 to-iocl-navy/50" />

        <div className="relative flex h-full flex-col justify-center px-14">
          <h1 className="text-5xl font-extrabold text-white">
            Create your
          </h1>

          <h1 className="text-5xl font-extrabold text-iocl-orange">
            IOCL Account
          </h1>

          <p className="mt-6 max-w-md text-white/80">
            Register to access magazines, newspapers,
            AI chatbot and all internal knowledge resources.
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-12">

        <div className="w-full max-w-md">

          <h2 className="text-3xl font-extrabold text-iocl-navy">
            Create Account
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-4"
          >

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">

  {/* Full Name */}
  <div className="relative">
    <User className="absolute left-3 top-4 h-4 w-4 text-slate-400" />
    <input
      placeholder="Full Name"
      className="w-full rounded-xl border py-3 pl-10 pr-4"
      required
    />
  </div>

  {/* Employee ID */}
  <div className="relative">
    <Building2 className="absolute left-3 top-4 h-4 w-4 text-slate-400" />
    <input
      placeholder="Employee ID"
      className="w-full rounded-xl border py-3 pl-10 pr-4"
      required
    />
  </div>

  {/* Email */}
  <div className="relative">
    <Mail className="absolute left-3 top-4 h-4 w-4 text-slate-400" />
    <input
      type="email"
      placeholder="Official Email"
      className="w-full rounded-xl border py-3 pl-10 pr-4"
      required
    />
  </div>

  {/* Phone */}
  <input
    type="tel"
    placeholder="Mobile Number"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    className="w-full rounded-xl border py-3 px-4"
    required
  />

  {/* Department */}
  <select
    value={department}
    onChange={(e) => setDepartment(e.target.value)}
    className="w-full rounded-xl border py-3 px-4"
    required
  >
    <option value="">Select Department</option>
    <option>IT</option>
    <option>HR</option>
    <option>Finance</option>
    <option>Operations</option>
    <option>Marketing</option>
    <option>Safety</option>
    <option>Refinery</option>
    <option>Pipeline</option>
  </select>

  {/* Designation */}
  <select
    value={designation}
    onChange={(e) => setDesignation(e.target.value)}
    className="w-full rounded-xl border py-3 px-4"
    required
  >
    <option value="">Select Designation</option>
    <option>Intern</option>
    <option>Graduate Engineer Trainee</option>
    <option>Officer</option>
    <option>Senior Officer</option>
    <option>Manager</option>
    <option>Senior Manager</option>
  </select>

  {/* Location */}
  <select
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    className="w-full rounded-xl border py-3 px-4"
    required
  >
    <option value="">Select Location</option>
    <option>Barauni Refinery</option>
    <option>Haldia Refinery</option>
    <option>Mathura Refinery</option>
    <option>Panipat Refinery</option>
    <option>Digboi Refinery</option>
    <option>Corporate Office</option>
  </select>

  {/* Password */}
  <div className="relative">
    <Lock className="absolute left-3 top-4 h-4 w-4 text-slate-400" />

    <input
      type={showPassword ? "text" : "password"}
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full rounded-xl border py-3 pl-10 pr-10"
      required
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-4"
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>

  {/* Confirm Password */}
  <div className="relative">
    <Lock className="absolute left-3 top-4 h-4 w-4 text-slate-400" />

    <input
      type={showConfirmPassword ? "text" : "password"}
      placeholder="Confirm Password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      className="w-full rounded-xl border py-3 pl-10 pr-10"
      required
    />

    <button
      type="button"
      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
      className="absolute right-3 top-4"
    >
      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>

  {/* Password Strength */}
  <div>
    <p className="mb-2 text-xs font-medium text-slate-500">
      Password Strength
    </p>

    <div className="h-2 rounded-full bg-slate-200">
      <div
        className={`h-2 rounded-full ${
          password.length < 4
            ? "w-1/4 bg-red-500"
            : password.length < 8
            ? "w-2/4 bg-yellow-500"
            : "w-full bg-green-500"
        }`}
      />
    </div>
  </div>

  {/* Terms */}
  <label className="flex items-start gap-3">
    <input
      type="checkbox"
      checked={agree}
      onChange={(e) => setAgree(e.target.checked)}
      className="mt-1"
    />

    <span className="text-sm text-slate-600">
      I agree to the{" "}
      <span className="font-semibold text-iocl-orange">
        IOCL Internal Usage Policy
      </span>
    </span>
  </label>

  <button
    type="submit"
    className="flex w-full items-center justify-center gap-2 rounded-xl bg-iocl-orange py-3 font-bold text-white hover:bg-orange-600"
  >
    Create Account
    <ArrowRight size={18} />
  </button>

</form>

          </form>

          <p className="mt-6 text-center text-sm">

            Already have an account?

            <Link
              to="/login"
              className="ml-2 font-bold text-iocl-orange"
            >
              Sign In
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}