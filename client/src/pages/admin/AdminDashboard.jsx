import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminApi from "../../services/adminApi";

function AdminDashboard() {
  const navigate = useNavigate();

  const adminUser = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const [stats, setStats] = useState({
    projects: 0,
    messages: 0,
    unreadMessages: 0,
  });

  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log("Fetching admin stats...");

        const response = await adminApi.get("/admin/stats");

        console.log("Admin stats response:", response.data);

        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (error) {
        console.error(
          "Failed to fetch admin stats:",
          error.response?.data || error.message
        );
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <p className="text-sm text-white/40">
              Admin
            </p>

            <h1 className="mt-1 text-xl font-semibold">
              Portfolio Dashboard
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/60 transition hover:border-white/30 hover:text-white"
          >
            Logout
          </button>

        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-6 py-12">

        <p className="text-white/40">
          Welcome back,{" "}
          <span className="text-white">
            {adminUser?.username || "Admin"}
          </span>
        </p>

        {/* Stats */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">

          {/* Projects */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

            <p className="text-sm text-white/40">
              Projects
            </p>

            <p className="mt-3 text-4xl font-bold">
              {loadingStats ? "..." : stats.projects}
            </p>

            <button
              onClick={() => navigate("/admin/projects")}
              className="mt-5 text-sm text-white/50 transition hover:text-white"
            >
              Manage Projects →
            </button>

          </div>

          {/* Messages */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

            <p className="text-sm text-white/40">
              Messages
            </p>

            <p className="mt-3 text-4xl font-bold">
              {loadingStats ? "..." : stats.messages}
            </p>

            <button
              onClick={() => navigate("/admin/messages")}
              className="mt-5 text-sm text-white/50 transition hover:text-white"
            >
              View Messages →
            </button>

          </div>

          {/* Unread */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

            <p className="text-sm text-white/40">
              Unread Messages
            </p>

            <p className="mt-3 text-4xl font-bold">
              {loadingStats ? "..." : stats.unreadMessages}
            </p>

            <button
              onClick={() => navigate("/admin/messages")}
              className="mt-5 text-sm text-white/50 transition hover:text-white"
            >
              View Messages →
            </button>

          </div>

        </div>

      </main>
    </div>
  );
}

export default AdminDashboard;