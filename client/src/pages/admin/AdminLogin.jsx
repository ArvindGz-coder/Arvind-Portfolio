import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Lock, User, LogIn, Eye, EyeOff, ShieldCheck, Zap, ArrowLeft } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

    try {
      const response = await axios.post(`${apiUrl}/auth/login`, formData);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.admin)
        );

        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.error("Admin login error:", err);
      setError(
        err.response?.data?.message ||
          "Authentication failed. Please verify credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020617] px-6 py-12 text-white selection:bg-cyan-500/30 selection:text-white flex items-center justify-center">
      {/* Ambient background glow & cyber grid */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="h-full w-full opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] bg-gradient-to-br from-cyan-500/15 via-violet-500/10 to-transparent blur-[140px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="relative overflow-hidden rounded-3xl border border-slate-800/90 bg-slate-900/40 p-8 shadow-[0_0_50px_rgba(6,182,212,0.15)] backdrop-blur-2xl">
          {/* Cyber scanline */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(6,182,212,0.02)_51%)] bg-[length:100%_4px]" />

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-[10px] text-cyan-400">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                SECURITY PROTOCOL // 256-BIT
              </span>
              <span className="font-mono text-xs text-slate-500">v2.6.0</span>
            </div>

            <h1 className="mt-4 text-2xl font-extrabold font-heading text-white">
              Mainframe Sign-In
            </h1>
            <p className="mt-1 text-xs text-slate-400">
              Access the developer content management console.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="mb-2 block text-xs font-mono uppercase tracking-wider text-slate-400">
                Administrator Username
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="e.g. arvindadmin"
                  required
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/70 py-3 pl-11 pr-4 text-sm text-white placeholder-slate-600 outline-none transition focus:border-cyan-500/60 focus:bg-slate-950"
                />
              </div>
            </div>

            {/* Password with reveal toggle */}
            <div>
              <label className="mb-2 block text-xs font-mono uppercase tracking-wider text-slate-400">
                Master Security Key (Password)
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter passphrase"
                  required
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/70 py-3 pl-11 pr-11 text-sm text-white placeholder-slate-600 outline-none transition focus:border-cyan-500/60 focus:bg-slate-950"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error banner */}
            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs font-mono text-red-400">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-violet-600 py-3 text-xs font-bold font-mono uppercase tracking-wider text-white shadow-[0_0_25px_rgba(6,182,212,0.3)] transition hover:from-cyan-400 hover:to-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Verifying Token...</span>
                </>
              ) : (
                <>
                  <span>Authenticate Access</span>
                  <LogIn size={15} />
                </>
              )}
            </button>
          </form>

          {/* Footer Back Link */}
          <div className="mt-6 border-t border-slate-800/80 pt-4 text-center">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 transition hover:text-cyan-400"
            >
              <ArrowLeft size={13} />
              Return to Public Portfolio
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}