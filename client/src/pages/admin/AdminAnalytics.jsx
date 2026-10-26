import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Globe,
  Smartphone,
  Monitor,
  Zap,
  TrendingUp,
  Clock,
  Compass,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState("30D");

  const countries = [
    { name: "United States", code: "US", visitors: "11,420", share: "46%", color: "bg-cyan-500" },
    { name: "India", code: "IN", visitors: "6,890", share: "28%", color: "bg-violet-500" },
    { name: "Germany", code: "DE", visitors: "2,410", share: "10%", color: "bg-emerald-500" },
    { name: "United Kingdom", code: "UK", visitors: "1,980", share: "8%", color: "bg-pink-500" },
    { name: "Canada", code: "CA", visitors: "1,120", share: "5%", color: "bg-amber-500" },
    { name: "Other Countries", code: "GL", visitors: "780", share: "3%", color: "bg-slate-600" },
  ];

  const projectRanks = [
    { title: "Personal Portfolio & Command Center", views: "14,890", time: "3m 42s", ctr: "18.2%" },
    { title: "AI Full Stack SaaS Application", views: "6,420", time: "2m 15s", ctr: "14.6%" },
    { title: "Realtime Collaborative Workspace", views: "4,190", time: "1m 58s", ctr: "11.3%" },
    { title: "Cloud Microservices Orchestrator", views: "2,840", time: "2m 04s", ctr: "9.8%" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-pink-500/30 bg-pink-500/10 text-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.2)]">
            <BarChart3 size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold font-heading text-white">
              Telemetry & Visitor Intelligence
            </h2>
            <p className="text-xs font-mono text-slate-400">
              Audience acquisition, geo-distribution & Core Web Vitals
            </p>
          </div>
        </div>

        <div className="flex rounded-xl border border-slate-800 bg-slate-950/80 p-1 font-mono text-xs">
          {["7D", "30D", "YTD"].map((t) => (
            <button
              key={t}
              onClick={() => setTimeRange(t)}
              className={`rounded-lg px-3 py-1 transition ${
                timeRange === t
                  ? "bg-gradient-to-r from-pink-500/20 to-violet-500/20 text-pink-300 border border-pink-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Core Web Vitals Bento Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Largest Contentful Paint (LCP)", val: "0.68s", status: "Optimal", color: "text-emerald-400" },
          { label: "Interaction to Next Paint (INP)", val: "14ms", status: "Optimal", color: "text-emerald-400" },
          { label: "Cumulative Layout Shift (CLS)", val: "0.000", status: "Zero Shift", color: "text-cyan-400" },
          { label: "Avg Session Duration", val: "3m 12s", status: "+42s vs benchmark", color: "text-violet-400" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 backdrop-blur-xl shadow-xl"
          >
            <p className="text-xs font-mono uppercase text-slate-400">{item.label}</p>
            <p className="mt-3 text-2xl font-bold font-mono text-white">{item.val}</p>
            <p className={`mt-1 text-xs font-mono ${item.color}`}>✓ {item.status}</p>
          </div>
        ))}
      </div>

      {/* Middle Grid: Geographic Demographics & Device Split */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Geographic Breakdown (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-2">
              <Globe size={18} className="text-cyan-400" />
              <h3 className="font-bold font-heading text-white text-base">
                Geographic Traffic Distribution
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">Global CDN Nodes</span>
          </div>

          <div className="mt-5 space-y-4">
            {countries.map((c) => (
              <div key={c.code} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-white">
                    <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-cyan-300">
                      {c.code}
                    </span>
                    <span>{c.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400">{c.visitors} visitors</span>
                    <span className="font-bold text-white w-10 text-right">{c.share}</span>
                  </div>
                </div>
                {/* Visual Share Bar */}
                <div className="h-1.5 w-full rounded-full bg-slate-800/90 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${c.color}`}
                    style={{ width: c.share }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device & Hardware Telemetry (1 col) */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl shadow-2xl">
          <div className="border-b border-slate-800/80 pb-4">
            <h3 className="font-bold font-heading text-white text-base flex items-center gap-2">
              <Monitor size={18} className="text-violet-400" />
              Platform & Hardware
            </h3>
          </div>

          <div className="mt-5 space-y-4">
            {[
              { label: "Desktop (Mac / Linux / Win)", pct: "74%", count: "18,380 sessions", icon: Monitor },
              { label: "Mobile (iOS / Android)", pct: "22%", count: "5,460 sessions", icon: Smartphone },
              { label: "Tablets / Touch Viewports", pct: "4%", count: "990 sessions", icon: Compass },
            ].map((d, i) => {
              const Icon = d.icon;
              return (
                <div key={i} className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Icon size={16} className="text-violet-400" />
                      <p className="text-xs font-bold font-mono text-white">{d.label}</p>
                    </div>
                    <span className="text-sm font-extrabold font-mono text-violet-300">
                      {d.pct}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] font-mono text-slate-500">{d.count}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Project Showcase Rankings */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl shadow-2xl">
        <h3 className="font-bold font-heading text-white text-base border-b border-slate-800/80 pb-4">
          Most Engaged Portfolio Projects
        </h3>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm font-sans">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-mono uppercase text-slate-400">
                <th className="pb-3">Project Title</th>
                <th className="pb-3 text-right">Unique Views</th>
                <th className="pb-3 text-right">Avg Dwell Time</th>
                <th className="pb-3 text-right">Outbound CTR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
              {projectRanks.map((p, idx) => (
                <tr key={idx} className="transition hover:bg-slate-900/40">
                  <td className="py-3 text-white font-sans font-medium flex items-center gap-2">
                    <span className="text-slate-500 font-mono">0{idx + 1}.</span>
                    {p.title}
                  </td>
                  <td className="py-3 text-right text-cyan-400 font-bold">{p.views}</td>
                  <td className="py-3 text-right text-slate-300">{p.time}</td>
                  <td className="py-3 text-right text-emerald-400">{p.ctr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
