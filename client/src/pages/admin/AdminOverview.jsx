import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FolderGit2,
  Mail,
  Eye,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  GitBranch,
  ShieldCheck,
  Zap,
  Clock,
  Plus,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";
import TrafficChart from "./TrafficChart";

// Smooth animated counter component
function AnimatedNumber({ value, prefix = "", suffix = "" }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value, 10) || 0;
    if (end === 0) {
      setDisplayValue(0);
      return;
    }
    const duration = 1200; // ms
    const stepTime = 25;
    const totalSteps = duration / stepTime;
    const increment = (end - start) / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function AdminOverview({
  stats,
  projects,
  messages,
  loadingStats,
  onNavigate,
  onOpenAddProject,
  onRefresh,
}) {
  const adminUser = JSON.parse(localStorage.getItem("user") || "null");

  const unreadCount = stats.unreadMessages || 0;

  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-slate-950/80 p-8 backdrop-blur-2xl shadow-2xl">
        {/* Subtle radial ambient lights */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-cyan-500/15 blur-[100px]" />
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-violet-500/15 blur-[100px]" />

        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono tracking-widest uppercase text-emerald-400">
                SYSTEM OPERATIONAL // MAIN CLUSTER ONLINE
              </span>
            </div>

            <h1 className="mt-2 text-3xl font-extrabold font-heading text-white sm:text-4xl">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                {adminUser?.username || "Arvind"}
              </span>
            </h1>

            <p className="mt-2 text-sm text-slate-300 max-w-xl leading-relaxed">
              Real-time portfolio command hub is streaming live telemetry. You have{" "}
              <span className="text-cyan-400 font-bold">{unreadCount} unread client inquiry</span> and{" "}
              <span className="text-violet-400 font-bold">{stats.projects || 0} active builds</span> in production.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onRefresh}
              className="flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/60 px-4 py-2.5 text-xs font-mono text-slate-300 transition hover:border-slate-500 hover:text-white"
            >
              <RefreshCw size={14} className={loadingStats ? "animate-spin" : ""} />
              Sync DB
            </button>

            <button
              onClick={onOpenAddProject}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-5 py-2.5 text-xs font-semibold font-mono text-white shadow-[0_0_25px_rgba(6,182,212,0.3)] transition hover:from-cyan-400 hover:to-violet-500"
            >
              <Plus size={15} />
              + New Project
            </button>
          </div>
        </div>
      </div>

      {/* Metric Bento Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1: Portfolio Traffic */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl shadow-xl transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">
              Total Portfolio Reach
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
              <Eye size={18} />
            </div>
          </div>

          <div className="mt-4">
            <div className="text-3xl font-extrabold font-heading text-white">
              <AnimatedNumber value={24840} />
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-0.5 font-mono text-emerald-400 font-bold">
                <TrendingUp size={13} /> +19.4%
              </span>
              <span className="text-slate-500 font-mono">vs last week</span>
            </div>
          </div>

          {/* Mini Sparkline SVG */}
          <div className="mt-4 h-6 w-full">
            <svg viewBox="0 0 100 24" className="h-full w-full overflow-visible">
              <path
                d="M0 20 Q 20 18, 40 10 T 70 8 T 100 2"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2"
                className="opacity-80"
              />
            </svg>
          </div>
        </motion.div>

        {/* Metric 2: Live Projects */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          onClick={() => onNavigate("projects")}
          className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl shadow-xl transition-all duration-300 hover:border-violet-500/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">
              Live Showcase Builds
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-500/10 text-violet-400">
              <FolderGit2 size={18} />
            </div>
          </div>

          <div className="mt-4">
            <div className="text-3xl font-extrabold font-heading text-white">
              <AnimatedNumber value={stats.projects || projects.length || 0} />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-violet-400 font-mono">100% Production Ready</span>
              <span className="font-mono text-slate-500 group-hover:text-violet-400 transition">
                Manage →
              </span>
            </div>
          </div>

          {/* Mini Progress Bar */}
          <div className="mt-4 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-violet-500 to-pink-500" />
          </div>
        </motion.div>

        {/* Metric 3: Inbound Client Leads */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          onClick={() => onNavigate("messages")}
          className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl shadow-xl transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">
              Inbound Contact Leads
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              <Mail size={18} />
            </div>
          </div>

          <div className="mt-4">
            <div className="text-3xl font-extrabold font-heading text-white flex items-center gap-3">
              <AnimatedNumber value={stats.messages || messages.length || 0} />
              {unreadCount > 0 && (
                <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 text-xs font-mono font-bold text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                  {unreadCount} NEW
                </span>
              )}
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-mono">
                {unreadCount > 0 ? "Requires Review" : "All Leads Handled"}
              </span>
              <span className="font-mono text-slate-500 group-hover:text-emerald-400 transition">
                Inbox →
              </span>
            </div>
          </div>

          <div className="mt-4 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
          </div>
        </motion.div>

        {/* Metric 4: CI/CD & GitHub Activity */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl shadow-xl transition-all duration-300 hover:border-pink-500/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">
              GitHub Pipeline Health
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-pink-500/30 bg-pink-500/10 text-pink-400">
              <GitBranch size={18} />
            </div>
          </div>

          <div className="mt-4">
            <div className="text-3xl font-extrabold font-heading text-white">
              <AnimatedNumber value={846} suffix="+" />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-pink-400 font-mono">99.98% Deploy Uptime</span>
              <span className="font-mono text-slate-500">Auto Sync</span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
            <ShieldCheck size={13} className="text-emerald-400" />
            <span>SSL Secured • Vercel CDN</span>
          </div>
        </motion.div>
      </div>

      {/* Interactive Traffic Chart Section */}
      <TrafficChart />

      {/* Bottom Dual Grid: Recent Inquiries & Live Project Previews */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left: Inbound Inquiries Feed */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-2">
              <MessageSquare size={16} className="text-emerald-400" />
              <h3 className="font-bold font-heading text-white text-base">
                Recent Inbound Inquiries
              </h3>
            </div>
            <button
              onClick={() => onNavigate("messages")}
              className="text-xs font-mono text-cyan-400 hover:underline"
            >
              View All ({messages.length}) →
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {messages.length === 0 ? (
              <div className="py-8 text-center text-sm font-mono text-slate-500">
                No recent inquiries received yet.
              </div>
            ) : (
              messages.slice(0, 4).map((msg) => (
                <div
                  key={msg._id}
                  onClick={() => onNavigate("messages")}
                  className={`group cursor-pointer rounded-xl border p-3.5 transition-all ${
                    !msg.read
                      ? "border-emerald-500/40 bg-emerald-500/[0.04] hover:bg-emerald-500/[0.08]"
                      : "border-slate-800/80 bg-slate-950/40 hover:bg-slate-900/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">
                        {msg.name}
                      </span>
                      {!msg.read && (
                        <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-mono text-emerald-400 font-bold">
                          NEW
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400 line-clamp-1">
                    {msg.message}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>{msg.email}</span>
                    <span className="text-cyan-400 group-hover:underline">
                      Open inquiry →
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Featured Projects Feed */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-2">
              <FolderGit2 size={16} className="text-violet-400" />
              <h3 className="font-bold font-heading text-white text-base">
                Portfolio Builds Catalog
              </h3>
            </div>
            <button
              onClick={() => onNavigate("projects")}
              className="text-xs font-mono text-violet-400 hover:underline"
            >
              Manage Catalog ({projects.length}) →
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {projects.length === 0 ? (
              <div className="py-8 text-center text-sm font-mono text-slate-500">
                No projects indexed in MongoDB. Click "+ New Project" to add.
              </div>
            ) : (
              projects.slice(0, 4).map((p) => (
                <div
                  key={p._id}
                  className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/40 p-3.5 transition hover:border-slate-700 hover:bg-slate-900/60"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.title}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center font-mono text-xs text-slate-600">
                          #{p.number}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-sm text-white">
                          {p.title}
                        </p>
                        {p.featured && (
                          <span className="rounded bg-amber-500/20 px-1.5 py-0.2 text-[9px] font-mono text-amber-300 font-bold border border-amber-500/30">
                            ★ FEATURED
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] font-mono text-slate-400">
                        {p.category} • {p.technologies?.slice(0, 2).join(", ")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer"
                        title="View Live Demo"
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-cyan-400 transition"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
