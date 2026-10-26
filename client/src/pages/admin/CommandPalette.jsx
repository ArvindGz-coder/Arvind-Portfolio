import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  LayoutDashboard,
  FolderGit2,
  Mail,
  BarChart3,
  Terminal,
  Settings,
  Plus,
  ExternalLink,
  LogOut,
  Sparkles,
  Command,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

export default function CommandPalette({
  isOpen,
  onClose,
  onSelectTab,
  onOpenAddProject,
  onRefreshStats,
  onLogout,
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const actions = [
    {
      id: "tab-overview",
      title: "Overview Command Hub",
      category: "Navigation",
      icon: LayoutDashboard,
      color: "text-cyan-400",
      shortcut: "G O",
      action: () => {
        onSelectTab("overview");
        onClose();
      },
    },
    {
      id: "tab-projects",
      title: "Projects & Content Manager",
      category: "Navigation",
      icon: FolderGit2,
      color: "text-violet-400",
      shortcut: "G P",
      action: () => {
        onSelectTab("projects");
        onClose();
      },
    },
    {
      id: "tab-messages",
      title: "Inbound Leads & Messages",
      category: "Navigation",
      icon: Mail,
      color: "text-emerald-400",
      shortcut: "G M",
      action: () => {
        onSelectTab("messages");
        onClose();
      },
    },
    {
      id: "tab-analytics",
      title: "Telemetry & Traffic Analytics",
      category: "Navigation",
      icon: BarChart3,
      color: "text-pink-400",
      shortcut: "G A",
      action: () => {
        onSelectTab("analytics");
        onClose();
      },
    },
    {
      id: "tab-terminal",
      title: "Developer Diagnostics Terminal",
      category: "System",
      icon: Terminal,
      color: "text-amber-400",
      shortcut: "G T",
      action: () => {
        onSelectTab("terminal");
        onClose();
      },
    },
    {
      id: "tab-settings",
      title: "Control Center Settings",
      category: "System",
      icon: Settings,
      color: "text-slate-400",
      shortcut: "G S",
      action: () => {
        onSelectTab("settings");
        onClose();
      },
    },
    {
      id: "action-add-project",
      title: "Deploy New Project (Add)",
      category: "Quick Actions",
      icon: Plus,
      color: "text-cyan-400",
      shortcut: "N P",
      action: () => {
        onClose();
        onOpenAddProject();
      },
    },
    {
      id: "action-refresh",
      title: "Refresh Telemetry & Stats",
      category: "Quick Actions",
      icon: RefreshCw,
      color: "text-emerald-400",
      shortcut: "R",
      action: () => {
        onClose();
        if (onRefreshStats) onRefreshStats();
      },
    },
    {
      id: "action-live-portfolio",
      title: "Launch Live Portfolio Tab",
      category: "Quick Actions",
      icon: ExternalLink,
      color: "text-blue-400",
      shortcut: "P",
      action: () => {
        window.open("/", "_blank");
        onClose();
      },
    },
    {
      id: "action-logout",
      title: "Terminate Session (Logout)",
      category: "Authentication",
      icon: LogOut,
      color: "text-red-400",
      shortcut: "ESC",
      action: () => {
        onClose();
        onLogout();
      },
    },
  ];

  const filteredActions = actions.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard navigation inside palette
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredActions.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % (filteredActions.length || 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredActions[selectedIndex]) {
        filteredActions[selectedIndex].action();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:pt-28">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-950/95 shadow-[0_0_50px_rgba(6,182,212,0.25)] backdrop-blur-2xl"
          onKeyDown={handleKeyDown}
        >
          {/* Cyber scanline effect */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(6,182,212,0.03)_51%)] bg-[length:100%_4px]" />

          {/* Top Search Bar */}
          <div className="relative flex items-center border-b border-slate-800/80 px-4 py-3.5">
            <Search size={18} className="text-cyan-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Type a command, jump to section, or search..."
              className="w-full bg-transparent px-3 text-sm font-sans text-white placeholder-slate-500 outline-none"
            />
            <span className="flex items-center gap-1 rounded border border-slate-700/80 bg-slate-900 px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
              ESC
            </span>
          </div>

          {/* Command List */}
          <div className="max-h-[360px] overflow-y-auto p-2">
            {filteredActions.length === 0 ? (
              <div className="py-12 text-center">
                <Sparkles size={24} className="mx-auto text-slate-600 mb-2" />
                <p className="text-sm text-slate-400 font-mono">
                  No matching command in terminal catalog
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  Try typing "projects", "messages", or "add"
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredActions.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm transition-all ${
                        isSelected
                          ? "bg-gradient-to-r from-cyan-500/20 via-violet-500/10 to-transparent text-white border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                          : "text-slate-300 hover:bg-slate-900/60 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 ${item.color}`}
                        >
                          <Icon size={16} />
                        </div>
                        <div>
                          <p className="font-medium text-white">{item.title}</p>
                          <p className="text-[11px] font-mono text-slate-500">
                            {item.category}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.shortcut && (
                          <span className="rounded border border-slate-800 bg-slate-900/80 px-2 py-0.5 font-mono text-[10px] text-slate-400">
                            {item.shortcut}
                          </span>
                        )}
                        {isSelected && (
                          <ArrowRight size={14} className="text-cyan-400" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Navigation Hints */}
          <div className="flex items-center justify-between border-t border-slate-800/80 bg-slate-950 px-4 py-2 text-[11px] font-mono text-slate-500">
            <div className="flex items-center gap-3">
              <span>↑↓ to navigate</span>
              <span>↵ to execute</span>
              <span>esc to close</span>
            </div>
            <span className="text-cyan-500/80">ARVIND // OS COMMAND PALETTE</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
