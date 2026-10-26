import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FolderGit2,
  Mail,
  BarChart3,
  Terminal as TerminalIcon,
  Settings,
  Search,
  Bell,
  LogOut,
  ExternalLink,
  Plus,
  ChevronLeft,
  ChevronRight,
  Shield,
  Zap,
  Activity,
  Cpu,
  RefreshCw,
  Check,
  User,
  Sliders,
  Sparkles,
} from "lucide-react";
import adminApi from "../../services/adminApi";
import AdminOverview from "./AdminOverview";
import ProjectsManager from "./ProjectsManager";
import MessagesManager from "./MessagesManager";
import AdminAnalytics from "./AdminAnalytics";
import AdminTerminal from "./AdminTerminal";
import AdminSettings from "./AdminSettings";
import CommandPalette from "./CommandPalette";
import ProjectDrawer from "./ProjectDrawer";
import SmoothScrollProvider from "../../context/SmoothScroll";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active tab based on route URL or default to overview
  const getInitialTab = () => {
    if (location.pathname.includes("/admin/projects")) return "projects";
    if (location.pathname.includes("/admin/messages")) return "messages";
    return "overview";
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [quickDrawerOpen, setQuickDrawerOpen] = useState(false);

  // Telemetry & DB state
  const [stats, setStats] = useState({
    projects: 0,
    messages: 0,
    unreadMessages: 0,
  });
  const [projectsList, setProjectsList] = useState([]);
  const [messagesList, setMessagesList] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [apiLatency, setApiLatency] = useState(18);

  const adminUser = JSON.parse(localStorage.getItem("user") || "null");

  // Sync tab with URL
  useEffect(() => {
    if (location.pathname.includes("/admin/projects")) setActiveTab("projects");
    else if (location.pathname.includes("/admin/messages")) setActiveTab("messages");
    else if (location.pathname.includes("/admin/dashboard")) setActiveTab("overview");
  }, [location.pathname]);

  // Fetch Telemetry & Core Data
  const fetchData = async () => {
    try {
      setLoadingStats(true);
      const t0 = performance.now();

      const [statsRes, projectsRes, messagesRes] = await Promise.allSettled([
        adminApi.get("/admin/stats"),
        adminApi.get("/projects"),
        adminApi.get("/messages"),
      ]);

      const t1 = performance.now();
      setApiLatency(Math.round(t1 - t0));

      if (statsRes.status === "fulfilled" && statsRes.value.data.success) {
        setStats(statsRes.value.data.data);
      }
      if (projectsRes.status === "fulfilled" && projectsRes.value.data.success) {
        setProjectsList(projectsRes.value.data.data);
      }
      if (messagesRes.status === "fulfilled" && messagesRes.value.data.success) {
        setMessagesList(messagesRes.value.data.data);
      }
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Global Ctrl + K / Cmd + K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "projects") {
      window.history.pushState(null, "", "/admin/projects");
    } else if (tabId === "messages") {
      window.history.pushState(null, "", "/admin/messages");
    } else if (tabId === "overview") {
      window.history.pushState(null, "", "/admin/dashboard");
    }
  };

  // Quick save new project from global top CTA
  const handleQuickSaveProject = async (formData) => {
    const payload = {
      number: Number(formData.number) || 1,
      title: formData.title.trim(),
      description: formData.description.trim(),
      technologies: formData.technologies
        ? formData.technologies.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
      category: formData.category,
      github: formData.github.trim(),
      demo: formData.demo.trim(),
      featured: Boolean(formData.featured),
      image: formData.image.trim(),
    };
    await adminApi.post("/projects", payload);
    setQuickDrawerOpen(false);
    fetchData();
    handleTabChange("projects");
  };

  const unreadCount = stats.unreadMessages || 0;

  const navItems = [
    { id: "overview", label: "Overview Hub", icon: LayoutDashboard, color: "text-cyan-400" },
    { id: "projects", label: "Projects CRUD", icon: FolderGit2, color: "text-violet-400" },
    { id: "analytics", label: "Telemetry & Traffic", icon: BarChart3, color: "text-pink-400" },
    {
      id: "messages",
      label: "Inbound Leads",
      icon: Mail,
      color: "text-emerald-400",
      badge: unreadCount > 0 ? unreadCount : null,
    },
    { id: "terminal", label: "Developer CLI", icon: TerminalIcon, color: "text-amber-400" },
    { id: "settings", label: "Settings & Config", icon: Settings, color: "text-slate-400" },
  ];

  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30 selection:text-white">
        {/* Subtle Cyber Grid Texture Background */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div
            className="h-full w-full opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute top-0 left-1/4 h-[600px] w-[600px] bg-gradient-to-b from-cyan-900/10 via-violet-900/5 to-transparent blur-[140px]" />
          <div className="absolute bottom-0 right-1/4 h-[600px] w-[600px] bg-gradient-to-t from-violet-900/10 via-pink-900/5 to-transparent blur-[140px]" />
        </div>

        {/* Command Palette Overlay */}
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          onSelectTab={handleTabChange}
          onOpenAddProject={() => setQuickDrawerOpen(true)}
          onRefreshStats={fetchData}
          onLogout={handleLogout}
        />

        {/* Global Quick Add Project Drawer */}
        <ProjectDrawer
          isOpen={quickDrawerOpen}
          onClose={() => setQuickDrawerOpen(false)}
          onSave={handleQuickSaveProject}
          editingProject={null}
          saving={false}
          error=""
        />

        <div className="flex min-h-screen">
          {/* 1. COLLAPSIBLE GLASS SIDEBAR */}
          <aside
            className={`sticky top-0 z-40 flex h-screen flex-col border-r border-slate-800/80 bg-slate-950/90 backdrop-blur-2xl transition-all duration-300 ${
              sidebarCollapsed ? "w-20" : "w-64"
            }`}
          >
            {/* Brand Logo & System Status */}
            <div className="flex items-center justify-between border-b border-slate-800/80 px-5 py-5">
              {!sidebarCollapsed ? (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/40 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
                    <Zap size={20} />
                  </div>
                  <div>
                    <h1 className="font-heading font-extrabold text-sm tracking-wider text-white">
                      ARVIND // OS
                    </h1>
                    <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400 font-bold">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      v2.6 NOMINAL
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  <Zap size={20} />
                </div>
              )}

              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-900 hover:text-white md:block"
                title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              </button>
            </div>

            {/* Quick Action Button */}
            <div className="p-4">
              <button
                onClick={() => setQuickDrawerOpen(true)}
                className={`flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 py-2.5 font-mono text-xs font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.25)] transition hover:from-cyan-400 hover:to-violet-500 ${
                  sidebarCollapsed ? "px-0" : "px-4"
                }`}
                title="Deploy New Project"
              >
                <Plus size={16} />
                {!sidebarCollapsed && <span>Deploy Project</span>}
              </button>
            </div>

            {/* Navigation Menu List */}
            <nav className="flex-1 space-y-1.5 overflow-y-auto px-3 py-2 font-mono text-xs">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    title={sidebarCollapsed ? item.label : ""}
                    className={`group relative flex w-full items-center gap-3 rounded-xl px-3.5 py-3 transition-all ${
                      isActive
                        ? "border border-cyan-500/40 bg-gradient-to-r from-cyan-500/15 via-violet-500/10 to-transparent text-white shadow-[0_0_20px_rgba(6,182,212,0.15)] font-bold"
                        : "border border-transparent text-slate-400 hover:bg-slate-900/60 hover:text-white"
                    }`}
                  >
                    {/* Active Indicator Bar */}
                    {isActive && (
                      <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                    )}

                    <Icon
                      size={18}
                      className={isActive ? item.color : "text-slate-500 group-hover:text-slate-300"}
                    />

                    {!sidebarCollapsed && (
                      <span className="flex-1 text-left font-sans text-xs">
                        {item.label}
                      </span>
                    )}

                    {/* Unread Message Badge */}
                    {item.badge && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-[10px] font-bold text-emerald-400 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Sidebar Bottom: Return to Portfolio & User Badge */}
            <div className="border-t border-slate-800/80 p-3 space-y-2">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className={`flex w-full items-center gap-2.5 rounded-xl border border-slate-800/80 bg-slate-900/40 px-3 py-2.5 text-xs font-mono text-slate-400 transition hover:border-cyan-500/30 hover:text-cyan-300 ${
                  sidebarCollapsed ? "justify-center px-0" : ""
                }`}
                title="Launch Live Portfolio"
              >
                <ExternalLink size={15} />
                {!sidebarCollapsed && <span>View Live Site</span>}
              </a>

              {/* Admin Profile Chip */}
              <div
                className={`flex items-center gap-3 rounded-xl border border-slate-800/80 bg-slate-950 p-2.5 ${
                  sidebarCollapsed ? "justify-center" : ""
                }`}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 font-bold font-mono text-xs text-white">
                  AG
                </div>
                {!sidebarCollapsed && (
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-xs font-bold text-white">
                      {adminUser?.username || "arvindadmin"}
                    </p>
                    <p className="truncate text-[10px] font-mono text-slate-500">
                      Lead Architect
                    </p>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* 2. MAIN VIEW AREA */}
          <div className="flex flex-1 flex-col overflow-x-hidden">
            {/* TOP CONTROL BAR */}
            <header className="sticky top-0 z-30 flex h-18 items-center justify-between border-b border-slate-800/80 bg-slate-950/80 px-6 backdrop-blur-2xl">
              {/* Telemetry Live Signals */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-1.5 font-mono text-xs">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-slate-400 hidden sm:inline">DB CLUSTER:</span>
                  <span className="font-bold text-emerald-400">ONLINE</span>
                </div>

                <div className="hidden lg:flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-1.5 font-mono text-xs">
                  <Activity size={13} className="text-cyan-400" />
                  <span className="text-slate-400">LATENCY:</span>
                  <span className="font-bold text-cyan-300">{apiLatency}ms</span>
                </div>

                <div className="hidden xl:flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-1.5 font-mono text-xs text-slate-400">
                  <Cpu size={13} className="text-violet-400" />
                  <span>FRAMEWORK: REACT 19 + VITE</span>
                </div>
              </div>

              {/* Center/Right Control Widgets */}
              <div className="flex items-center gap-3">
                {/* Command Palette Trigger Button (Ctrl + K) */}
                <button
                  onClick={() => setCommandPaletteOpen(true)}
                  className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2 text-xs font-mono text-slate-400 transition hover:border-cyan-500/40 hover:text-white shadow-sm"
                >
                  <Search size={14} className="text-cyan-400" />
                  <span className="hidden md:inline">Command Palette...</span>
                  <span className="rounded border border-slate-700 bg-slate-950 px-1.5 py-0.5 text-[10px] text-cyan-300">
                    ⌘K
                  </span>
                </button>

                {/* Notifications Center Bell */}
                <div className="relative">
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="relative rounded-xl border border-slate-800 bg-slate-900/60 p-2 text-slate-400 transition hover:border-slate-700 hover:text-white"
                  >
                    <Bell size={18} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-black shadow-[0_0_10px_rgba(16,185,129,0.8)]">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notifications Dropdown Window */}
                  <AnimatePresence>
                    {notificationsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-80 rounded-2xl border border-slate-800 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-2xl z-50"
                      >
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <h4 className="font-heading font-bold text-sm text-white">
                            Activity Stream
                          </h4>
                          <span className="font-mono text-[11px] text-cyan-400">
                            {unreadCount} pending
                          </span>
                        </div>

                        <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
                          {messagesList.slice(0, 3).map((m) => (
                            <div
                              key={m._id}
                              onClick={() => {
                                handleTabChange("messages");
                                setNotificationsOpen(false);
                              }}
                              className="cursor-pointer rounded-xl border border-slate-800/80 bg-slate-900/50 p-2.5 transition hover:bg-slate-900"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-xs text-white">
                                  {m.name}
                                </span>
                                {!m.read && (
                                  <span className="rounded bg-emerald-500/20 px-1.5 py-0.2 text-[9px] font-mono text-emerald-400 font-bold">
                                    NEW
                                  </span>
                                )}
                              </div>
                              <p className="mt-1 text-[11px] text-slate-400 line-clamp-1 font-sans">
                                {m.message}
                              </p>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() => {
                            handleTabChange("messages");
                            setNotificationsOpen(false);
                          }}
                          className="mt-3 w-full rounded-xl border border-slate-800 py-2 text-center text-xs font-mono text-cyan-400 hover:bg-slate-900"
                        >
                          View all leads in inbox →
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/60 p-1.5 pr-3 transition hover:border-slate-700"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 font-bold font-mono text-xs text-white">
                      AG
                    </div>
                    <span className="hidden sm:inline text-xs font-bold text-white">
                      {adminUser?.username || "Admin"}
                    </span>
                  </button>

                  <AnimatePresence>
                    {profileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-56 rounded-2xl border border-slate-800 bg-slate-950/95 p-2 shadow-2xl backdrop-blur-2xl z-50 font-mono text-xs"
                      >
                        <div className="border-b border-slate-800 px-3 py-2.5">
                          <p className="font-bold text-white font-sans text-sm">
                            {adminUser?.username || "arvindadmin"}
                          </p>
                          <p className="text-[11px] text-cyan-400">
                            Superadministrator
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            handleTabChange("settings");
                            setProfileDropdownOpen(false);
                          }}
                          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-slate-300 hover:bg-slate-900 hover:text-white"
                        >
                          <Settings size={14} />
                          <span>System Settings</span>
                        </button>

                        <button
                          onClick={() => {
                            handleTabChange("terminal");
                            setProfileDropdownOpen(false);
                          }}
                          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-slate-300 hover:bg-slate-900 hover:text-white"
                        >
                          <TerminalIcon size={14} />
                          <span>Interactive CLI</span>
                        </button>

                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-red-400 hover:bg-red-500/10"
                        >
                          <LogOut size={14} />
                          <span>Logout & Terminate</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </header>

            {/* MAIN CONTENT WORKSPACE */}
            <main className="flex-1 px-6 py-8 md:px-10">
              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AdminOverview
                      stats={stats}
                      projects={projectsList}
                      messages={messagesList}
                      loadingStats={loadingStats}
                      onNavigate={handleTabChange}
                      onOpenAddProject={() => setQuickDrawerOpen(true)}
                      onRefresh={fetchData}
                    />
                  </motion.div>
                )}

                {activeTab === "projects" && (
                  <motion.div
                    key="projects"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProjectsManager
                      onRefreshStats={fetchData}
                      standalone={false}
                      onNavigateHome={() => handleTabChange("overview")}
                    />
                  </motion.div>
                )}

                {activeTab === "messages" && (
                  <motion.div
                    key="messages"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MessagesManager
                      onRefreshStats={fetchData}
                      standalone={false}
                    />
                  </motion.div>
                )}

                {activeTab === "analytics" && (
                  <motion.div
                    key="analytics"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AdminAnalytics />
                  </motion.div>
                )}

                {activeTab === "terminal" && (
                  <motion.div
                    key="terminal"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AdminTerminal />
                  </motion.div>
                )}

                {activeTab === "settings" && (
                  <motion.div
                    key="settings"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AdminSettings
                      projects={projectsList}
                      messages={messagesList}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>
    </SmoothScrollProvider>
  );
}