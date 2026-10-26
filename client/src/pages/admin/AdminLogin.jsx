import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Lock, User, LogIn } from "lucide-react";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.admin)
        );

        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error("Admin login error:", error);

      setError(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">
        <div className="w-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl">
          
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-white/30">
              Admin
            </p>

            <h1 className="mt-3 text-3xl font-bold">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-white/40">
              Sign in to manage your portfolio.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Username */}
            <div>
              <label className="mb-2 block text-sm text-white/50">
                Username
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                />

                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/30"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm text-white/50">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/30"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold !text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}

              {!loading && <LogIn size={17} />}
            </button>
          </form>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-6 w-full text-center text-sm text-white/30 transition hover:text-white"
          >
            ← Back to portfolio
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;