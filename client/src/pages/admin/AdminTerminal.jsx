import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Terminal as TerminalIcon,
  Play,
  Trash2,
  Cpu,
  Wifi,
  Database,
  Radio,
  Sliders,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import adminApi from "../../services/adminApi";

const INITIAL_LOGS = [
  { time: "00:00:01", type: "system", text: "ARVIND // OS kernel boot sequence initiated..." },
  { time: "00:00:02", type: "success", text: "Vite HMR module mounted at 60fps (port 5173)." },
  { time: "00:00:03", type: "info", text: "MongoDB Atlas connection pool established: cluster0.waon0fu." },
  { time: "00:00:04", type: "info", text: "JWT Secret verified with RS256 algorithm." },
  { time: "00:00:05", type: "success", text: "Lenis smooth scroll engine synchronised with GSAP ticker." },
  { time: "00:00:06", type: "system", text: "Vercel production webhook listener listening on /api/webhooks." },
];

export default function AdminTerminal() {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [command, setCommand] = useState("");
  const [isLiveTelemetry, setIsLiveTelemetry] = useState(true);
  const terminalEndRef = useRef(null);

  // Environment Toggles
  const [toggles, setToggles] = useState({
    maintenanceMode: false,
    autoEmailNotifier: true,
    smoothScrollEngine: true,
    highPerformanceMode: true,
    corsAllowAll: true,
  });

  // Live Simulated Telemetry Stream
  useEffect(() => {
    if (!isLiveTelemetry) return;
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];
      const randomEvents = [
        { type: "info", text: `GET /api/projects - 200 OK (${Math.floor(Math.random() * 25 + 10)}ms)` },
        { type: "system", text: `Memory footprint nominal: ${(process?.memoryUsage?.()?.heapUsed / 1024 / 1024 || 38.4).toFixed(1)}MB active.` },
        { type: "success", text: `Telemetry beacon acknowledged by client session #${Math.floor(Math.random() * 9000 + 1000)}` },
        { type: "info", text: `MongoDB ping response: ${Math.floor(Math.random() * 18 + 12)}ms` },
      ];
      const randomEvent = randomEvents[Math.floor(Math.random() * randomEvents.length)];

      setLogs((prev) => [
        ...prev.slice(-40),
        { time: timeStr, ...randomEvent },
      ]);
    }, 4500);

    return () => clearInterval(interval);
  }, [isLiveTelemetry]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleRunCommand = async (e) => {
    e.preventDefault();
    if (!command.trim()) return;

    const trimmed = command.trim();
    const now = new Date().toTimeString().split(" ")[0];
    const userLog = { time: now, type: "user", text: `$ ${trimmed}` };

    const cmd = trimmed.toLowerCase();
    let responseLog = null;

    if (cmd === "help") {
      responseLog = {
        time: now,
        type: "system",
        text: "Available commands: 'help', 'status', 'ping', 'projects', 'stats', 'clear', 'toggle <flag>', 'sysinfo'",
      };
    } else if (cmd === "clear") {
      setLogs([]);
      setCommand("");
      return;
    } else if (cmd === "ping") {
      try {
        const t0 = performance.now();
        await adminApi.get("/health");
        const t1 = performance.now();
        responseLog = {
          time: now,
          type: "success",
          text: `PONG! Backend API response latency: ${(t1 - t0).toFixed(1)}ms.`,
        };
      } catch (err) {
        responseLog = {
          time: now,
          type: "error",
          text: `Ping failed: ${err.message}`,
        };
      }
    } else if (cmd === "status" || cmd === "sysinfo") {
      responseLog = {
        time: now,
        type: "info",
        text: `NODE_ENV: development | Uptime: 99.98% | DB: Connected | Engine: React 19 + Vite 8`,
      };
    } else if (cmd === "projects") {
      try {
        const res = await adminApi.get("/projects");
        responseLog = {
          time: now,
          type: "success",
          text: `Total indexed projects in MongoDB: ${res.data.count || res.data.data?.length || 0}`,
        };
      } catch (err) {
        responseLog = { time: now, type: "error", text: "Failed to query /api/projects" };
      }
    } else {
      responseLog = {
        time: now,
        type: "error",
        text: `Command not recognized: "${trimmed}". Type 'help' for command manual.`,
      };
    }

    setLogs((prev) => [...prev, userLog, responseLog]);
    setCommand("");
  };

  const handleToggle = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
    const now = new Date().toTimeString().split(" ")[0];
    setLogs((prev) => [
      ...prev,
      {
        time: now,
        type: "system",
        text: `Flag altered: [${key}] set to ${!toggles[key] ? "ENABLED" : "DISABLED"}`,
      },
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Environment Switches */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              <Sliders size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading text-white">
                Core Runtime Environment Controls
              </h3>
              <p className="text-xs font-mono text-slate-400">
                Hot-swappable production parameters & deployment flags
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLiveTelemetry(!isLiveTelemetry)}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-mono transition ${
                isLiveTelemetry
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                  : "border-slate-800 bg-slate-950 text-slate-500"
              }`}
            >
              <Radio size={14} className={isLiveTelemetry ? "animate-pulse" : ""} />
              {isLiveTelemetry ? "Telemetry: STREAMING" : "Telemetry: PAUSED"}
            </button>
          </div>
        </div>

        {/* Toggle Switches */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              key: "autoEmailNotifier",
              label: "Auto-Dispatch Recipient Mail",
              desc: "Forward portfolio contact leads directly via Nodemailer SMTP",
            },
            {
              key: "smoothScrollEngine",
              label: "Lenis Virtual Momentum Engine",
              desc: "Enforce buttery smooth 60fps momentum scroll damping",
            },
            {
              key: "highPerformanceMode",
              label: "GPU Hardware Acceleration",
              desc: "Force CSS will-change & composite layers for Framer Motion",
            },
            {
              key: "maintenanceMode",
              label: "Portfolio Maintenance Curtain",
              desc: "Temporarily display cyber preloader lock on public index",
            },
            {
              key: "corsAllowAll",
              label: "Dynamic CORS Origin Header",
              desc: "Permit localhost and staging dev ports to communicate",
            },
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-start justify-between gap-4 rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5 transition hover:border-slate-700"
            >
              <div>
                <p className="text-xs font-bold font-mono text-white">
                  {item.label}
                </p>
                <p className="mt-1 text-[11px] text-slate-400 leading-tight">
                  {item.desc}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle(item.key)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  toggles[item.key] ? "bg-cyan-500" : "bg-slate-800"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    toggles[item.key] ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Futuristic Developer Terminal Widget */}
      <div className="overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-950/95 shadow-[0_0_40px_rgba(6,182,212,0.15)] backdrop-blur-2xl">
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/60 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="ml-2 font-mono text-xs text-slate-400">
              arvind@portfolio-mainframe: ~ (zsh / reactive-cli)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLogs([])}
              title="Clear Terminal Output"
              className="flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-mono text-slate-500 transition hover:bg-slate-800 hover:text-slate-300"
            >
              <Trash2 size={12} />
              Clear
            </button>
            <span className="flex items-center gap-1 text-[11px] font-mono text-cyan-400">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              ONLINE
            </span>
          </div>
        </div>

        {/* Terminal Screen & Logs */}
        <div className="h-[340px] overflow-y-auto p-4 font-mono text-xs">
          {logs.map((l, index) => {
            let color = "text-slate-300";
            if (l.type === "success") color = "text-emerald-400";
            if (l.type === "error") color = "text-red-400";
            if (l.type === "system") color = "text-cyan-400";
            if (l.type === "info") color = "text-violet-400";
            if (l.type === "user") color = "text-amber-300 font-bold";

            return (
              <div key={index} className="flex items-start gap-3 py-1">
                <span className="text-slate-600 select-none">[{l.time}]</span>
                <span className={`${color} leading-relaxed`}>{l.text}</span>
              </div>
            );
          })}
          <div ref={terminalEndRef} />
        </div>

        {/* Command Input Prompt */}
        <form
          onSubmit={handleRunCommand}
          className="flex items-center border-t border-slate-800/80 bg-slate-900/40 px-4 py-2.5"
        >
          <span className="mr-2 font-mono text-xs text-cyan-400 font-bold">
            arvind@core:~$
          </span>
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Type 'help', 'ping', 'projects', 'status'..."
            className="flex-1 bg-transparent font-mono text-xs text-white placeholder-slate-600 outline-none"
          />
          <button
            type="submit"
            className="flex items-center gap-1 rounded-md border border-cyan-500/40 bg-cyan-500/20 px-2.5 py-1 text-xs font-mono text-cyan-300 hover:bg-cyan-500/30"
          >
            <Play size={10} /> Run
          </button>
        </form>
      </div>
    </div>
  );
}
