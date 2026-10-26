import { useState } from "react";
import {
  Settings,
  Shield,
  Key,
  Download,
  Database,
  Server,
  Cpu,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Lock,
} from "lucide-react";
import adminApi from "../../services/adminApi";

export default function AdminSettings({ projects, messages }) {
  const adminUser = JSON.parse(localStorage.getItem("user") || "null");
  const [exporting, setExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleExportData = () => {
    setExporting(true);
    try {
      const backupData = {
        exportedAt: new Date().toISOString(),
        version: "2.6.0",
        adminUser: adminUser?.username || "admin",
        projectsCount: projects.length,
        messagesCount: messages.length,
        projects: projects,
        messages: messages,
      };

      const dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(backupData, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute(
        "download",
        `arvind-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`
      );
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (e) {
      console.error("Export error:", e);
    } finally {
      setTimeout(() => setExporting(false), 500);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-300">
            <Settings size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold font-heading text-white">
              System Settings & Architecture
            </h2>
            <p className="text-xs font-mono text-slate-400">
              Manage database snapshots, authentication tokens, and infrastructure configurations
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Admin Identity & Database Backup */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Admin Identity Card */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-2 border-b border-slate-800/80 pb-4">
            <Shield size={18} className="text-cyan-400" />
            <h3 className="font-bold font-heading text-white text-base">
              Authenticated Admin Credentials
            </h3>
          </div>

          <div className="mt-5 space-y-4 text-xs font-mono">
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <span className="text-slate-500 uppercase">Primary Administrator</span>
              <p className="mt-1 text-sm font-bold text-white flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {adminUser?.username || "arvindadmin"}
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <span className="text-slate-500 uppercase">Token Cryptography</span>
              <p className="mt-1 text-xs text-cyan-300 font-mono">
                HMAC-SHA256 with JWT_SECRET (Active Session)
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <span className="text-slate-500 uppercase">Password Security Notice</span>
              <p className="mt-1 text-xs text-slate-400 font-sans">
                Admin credentials are encrypted via bcrypt (12 salt rounds) in MongoDB. To cycle your password, use the server-side seed script <code className="text-cyan-400 font-mono">node createAdmin.js</code>.
              </p>
            </div>
          </div>
        </div>

        {/* Database & Data Snapshot Export */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-2 border-b border-slate-800/80 pb-4">
            <Database size={18} className="text-violet-400" />
            <h3 className="font-bold font-heading text-white text-base">
              Portfolio Mainframe Backup
            </h3>
          </div>

          <div className="mt-5 space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              Export an instantaneous snapshot of all project records, descriptions, links, and received contact leads directly to a structured JSON payload for local archiving or migration.
            </p>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Projects In Snapshot:</span>
                <span className="text-white font-bold">{projects.length} documents</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Messages In Snapshot:</span>
                <span className="text-white font-bold">{messages.length} inquiries</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Compression / Format:</span>
                <span className="text-emerald-400 font-bold">Standard UTF-8 JSON</span>
              </div>
            </div>

            <button
              onClick={handleExportData}
              disabled={exporting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 px-5 py-3 text-xs font-mono font-bold text-white shadow-[0_0_20px_rgba(139,92,246,0.25)] transition hover:from-violet-500 hover:to-cyan-500 disabled:opacity-50"
            >
              <Download size={15} />
              {exporting ? "Generating Snapshot..." : "Download Full Database JSON"}
            </button>
          </div>
        </div>
      </div>

      {/* Cluster Environment Telemetry */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-2 border-b border-slate-800/80 pb-4">
          <Server size={18} className="text-emerald-400" />
          <h3 className="font-bold font-heading text-white text-base">
            Cluster Environment Specifications
          </h3>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 font-mono text-xs">
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <span className="text-slate-500">API HOST</span>
            <p className="mt-1 font-bold text-white">http://localhost:5000/api</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <span className="text-slate-500">CLIENT RUNTIME</span>
            <p className="mt-1 font-bold text-cyan-300">Vite 8 • React 19</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <span className="text-slate-500">DATABASE POOL</span>
            <p className="mt-1 font-bold text-emerald-400">MongoDB Atlas v7.0</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <span className="text-slate-500">MOTION ENGINE</span>
            <p className="mt-1 font-bold text-violet-300">Framer Motion + Lenis</p>
          </div>
        </div>
      </div>
    </div>
  );
}
