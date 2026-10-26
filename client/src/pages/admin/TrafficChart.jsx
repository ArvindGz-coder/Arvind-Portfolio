import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Users, Eye, ArrowUpRight, Calendar } from "lucide-react";

// Mock realistic traffic datasets
const DATASETS = {
  "7D": [
    { label: "Mon", visitors: 420, views: 1120, bounce: "24%" },
    { label: "Tue", visitors: 580, views: 1540, bounce: "21%" },
    { label: "Wed", visitors: 710, views: 1980, bounce: "19%" },
    { label: "Thu", visitors: 890, views: 2430, bounce: "18%" },
    { label: "Fri", visitors: 1150, views: 3200, bounce: "16%" },
    { label: "Sat", visitors: 940, views: 2610, bounce: "22%" },
    { label: "Sun", visitors: 1280, views: 3840, bounce: "15%" },
  ],
  "30D": [
    { label: "W1", visitors: 3420, views: 9800, bounce: "22%" },
    { label: "W2", visitors: 4890, views: 14200, bounce: "19%" },
    { label: "W3", visitors: 6100, views: 18400, bounce: "17%" },
    { label: "W4", visitors: 7940, views: 24800, bounce: "15%" },
  ],
  "90D": [
    { label: "Jan", visitors: 14200, views: 42100, bounce: "23%" },
    { label: "Feb", visitors: 18900, views: 58300, bounce: "19%" },
    { label: "Mar", visitors: 26400, views: 82500, bounce: "16%" },
  ],
};

export default function TrafficChart() {
  const [timeframe, setTimeframe] = useState("7D");
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const data = DATASETS[timeframe];
  const maxVisitors = useMemo(
    () => Math.max(...data.map((d) => d.visitors)) * 1.15,
    [data]
  );

  // SVG dimensions
  const width = 640;
  const height = 220;
  const paddingX = 40;
  const paddingY = 30;

  // Calculate coordinates for SVG path
  const points = useMemo(() => {
    return data.map((d, index) => {
      const x =
        paddingX +
        (index / (data.length - 1)) * (width - paddingX * 2);
      const y =
        height -
        paddingY -
        (d.visitors / maxVisitors) * (height - paddingY * 2);
      return { ...d, x, y, index };
    });
  }, [data, maxVisitors]);

  // Generate smooth SVG curve path (Catmull-Rom or Bezier curve)
  const pathD = useMemo(() => {
    if (points.length === 0) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? 0 : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  }, [points]);

  // Closed area path for gradient fill
  const areaD = useMemo(() => {
    if (!pathD || points.length === 0) return "";
    const last = points[points.length - 1];
    const first = points[0];
    const bottom = height - paddingY;
    return `${pathD} L ${last.x} ${bottom} L ${first.x} ${bottom} Z`;
  }, [pathD, points]);

  const totalPeriodVisitors = useMemo(
    () => data.reduce((acc, curr) => acc + curr.visitors, 0),
    [data]
  );

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl shadow-2xl transition hover:border-cyan-500/30">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-[90px]" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-violet-500/10 blur-[90px]" />

      {/* Header & Controls */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <p className="text-xs font-mono tracking-widest uppercase text-cyan-400">
              Live Visitor Telemetry
            </p>
          </div>
          <div className="mt-2 flex items-baseline gap-3">
            <h3 className="text-2xl font-bold font-heading text-white">
              {totalPeriodVisitors.toLocaleString()}
            </h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400 border border-emerald-500/20">
              <TrendingUp size={12} />
              +28.4%
            </span>
            <span className="text-xs text-slate-400">unique portfolio sessions</span>
          </div>
        </div>

        {/* Timeframe Pill Selector */}
        <div className="flex items-center gap-1 rounded-xl border border-slate-800/90 bg-slate-950/60 p-1 backdrop-blur-md">
          {["7D", "30D", "90D"].map((t) => (
            <button
              key={t}
              onClick={() => {
                setTimeframe(t);
                setHoveredPoint(null);
              }}
              className={`rounded-lg px-3 py-1 text-xs font-mono transition-all ${
                timeframe === t
                  ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Interactive Chart Canvas */}
      <div className="relative mt-6 w-full">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full overflow-visible"
        >
          <defs>
            {/* Area Linear Gradient */}
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0" />
            </linearGradient>

            {/* Stroke Neon Gradient */}
            <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Horizontal Grid lines */}
          {[0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = height - paddingY - ratio * (height - paddingY * 2);
            return (
              <g key={ratio}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#334155"
                  strokeOpacity="0.25"
                  strokeDasharray="4 4"
                />
              </g>
            );
          })}

          {/* Filled Area with Entrance Animation */}
          <motion.path
            key={`area-${timeframe}`}
            d={areaD}
            fill="url(#areaGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />

          {/* Glowing Neon Line */}
          <motion.path
            key={`line-${timeframe}`}
            d={pathD}
            fill="none"
            stroke="url(#strokeGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {/* Vertical Guide Line on Hover */}
          {hoveredPoint && (
            <motion.line
              x1={hoveredPoint.x}
              y1={paddingY}
              x2={hoveredPoint.x}
              y2={height - paddingY}
              stroke="#06b6d4"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              strokeOpacity="0.8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}

          {/* Interactive Data Nodes */}
          {points.map((pt, i) => (
            <g
              key={i}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredPoint(pt)}
            >
              {/* Invisible large target for easy hovering */}
              <circle cx={pt.x} cy={pt.y} r="18" fill="transparent" />

              {/* Outer Pulse Circle */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredPoint?.index === i ? "8" : "4"}
                fill={hoveredPoint?.index === i ? "#06b6d4" : "#8b5cf6"}
                fillOpacity={hoveredPoint?.index === i ? "0.3" : "0.2"}
                className="transition-all duration-300"
              />

              {/* Core Node */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredPoint?.index === i ? "5" : "3"}
                fill="#ffffff"
                stroke={hoveredPoint?.index === i ? "#06b6d4" : "#8b5cf6"}
                strokeWidth="2"
                className="transition-all duration-200"
              />

              {/* X Axis Label */}
              <text
                x={pt.x}
                y={height - 8}
                textAnchor="middle"
                className={`text-[11px] font-mono transition-colors ${
                  hoveredPoint?.index === i
                    ? "fill-cyan-400 font-bold"
                    : "fill-slate-500"
                }`}
              >
                {pt.label}
              </text>
            </g>
          ))}
        </svg>

        {/* Floating Glowing Tooltip Card */}
        <AnimatePresence>
          {hoveredPoint && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.15 }}
              className="pointer-events-none absolute -top-4 rounded-xl border border-cyan-500/40 bg-slate-950/90 p-3 shadow-[0_0_30px_rgba(6,182,212,0.25)] backdrop-blur-xl"
              style={{
                left: `${(hoveredPoint.x / width) * 100}%`,
                transform: "translateX(-50%) translateY(-100%)",
              }}
            >
              <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-1.5">
                <span className="text-[11px] font-mono uppercase text-slate-400">
                  {hoveredPoint.label} Telemetry
                </span>
                <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Live
                </span>
              </div>
              <div className="mt-2 space-y-1">
                <div className="flex items-center justify-between gap-5 text-xs">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Users size={12} className="text-cyan-400" /> Visitors:
                  </span>
                  <span className="font-mono font-bold text-white">
                    {hoveredPoint.visitors.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-5 text-xs">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Eye size={12} className="text-violet-400" /> Pageviews:
                  </span>
                  <span className="font-mono font-bold text-white">
                    {hoveredPoint.views.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-5 text-xs">
                  <span className="text-slate-400">Bounce Rate:</span>
                  <span className="font-mono text-cyan-300">
                    {hoveredPoint.bounce}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Traffic Distribution Breakdown Bar */}
      <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-800/80 pt-4 sm:grid-cols-4">
        {[
          { source: "Direct Traffic", pct: "46%", color: "text-cyan-400", dot: "bg-cyan-400" },
          { source: "GitHub Portfolio", pct: "31%", color: "text-violet-400", dot: "bg-violet-400" },
          { source: "LinkedIn Inbound", pct: "15%", color: "text-emerald-400", dot: "bg-emerald-400" },
          { source: "X / Dev.to", pct: "8%", color: "text-pink-400", dot: "bg-pink-400" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${item.dot}`} />
            <div>
              <p className="text-[11px] text-slate-400">{item.source}</p>
              <p className={`text-sm font-bold font-mono ${item.color}`}>{item.pct}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
