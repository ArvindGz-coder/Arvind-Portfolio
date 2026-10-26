import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Check,
  Trash2,
  Reply,
  Copy,
  Search,
  Filter,
  Clock,
  Sparkles,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  User,
} from "lucide-react";
import adminApi from "../../services/adminApi";

export default function MessagesManager({ onRefreshStats, standalone = false }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all"); // 'all' | 'unread' | 'read'
  const [copiedId, setCopiedId] = useState(null);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await adminApi.get("/messages");
      if (res.data.success) {
        setMessages(res.data.data);
      }
    } catch (err) {
      console.error("Failed to load messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // Mark as Read
  const handleMarkAsRead = async (id, e) => {
    if (e) e.stopPropagation();
    try {
      await adminApi.patch(`/messages/${id}/read`);
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, read: true } : m))
      );
      triggerToast("Message marked as read.");
      if (onRefreshStats) onRefreshStats();
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  // Delete message
  const confirmDelete = async () => {
    if (!messageToDelete) return;
    try {
      await adminApi.delete(`/messages/${messageToDelete._id}`);
      setMessages((prev) => prev.filter((m) => m._id !== messageToDelete._id));
      triggerToast("Inquiry lead removed from database.");
      setMessageToDelete(null);
      if (onRefreshStats) onRefreshStats();
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  // Copy email
  const handleCopyEmail = (email, id, e) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    triggerToast(`Copied ${email} to clipboard!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter messages
  const filteredMessages = messages.filter((msg) => {
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "unread" && !msg.read) ||
      (activeFilter === "read" && msg.read);

    const matchesSearch =
      searchQuery.trim() === "" ||
      msg.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl border border-emerald-500/40 bg-slate-950/95 px-5 py-3.5 text-sm font-mono text-emerald-300 shadow-[0_0_30px_rgba(16,185,129,0.3)] backdrop-blur-2xl"
          >
            <CheckCircle2 size={18} className="text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-xl shadow-2xl sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-xs font-mono uppercase tracking-widest text-emerald-400">
              COMMUNICATIONS HUB
            </p>
          </div>
          <h2 className="mt-1 text-2xl font-bold font-heading text-white">
            Inbound Inquiries & Client Leads
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Messages transmitted via your portfolio's "Let's Talk" modal and Contact section.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 font-mono text-xs text-slate-300">
            <span>Total Leads:</span>
            <span className="font-bold text-white">{messages.length}</span>
            {unreadCount > 0 && (
              <span className="ml-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-emerald-400 font-bold border border-emerald-500/30">
                {unreadCount} NEW
              </span>
            )}
          </div>

          <button
            onClick={fetchMessages}
            title="Refresh Inbound Feed"
            className="rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-slate-400 transition hover:border-slate-700 hover:text-white"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by sender name, email, or message keyword..."
            className="w-full rounded-xl border border-slate-800 bg-slate-950/70 py-2 pl-10 pr-4 text-xs font-sans text-white placeholder-slate-500 outline-none transition focus:border-emerald-500/50"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {[
            { id: "all", label: `All (${messages.length})` },
            { id: "unread", label: `Unread (${unreadCount})` },
            { id: "read", label: `Archived (${messages.length - unreadCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`rounded-xl px-3 py-1.5 text-xs font-mono transition-all ${
                activeFilter === tab.id
                  ? "border border-emerald-500/40 bg-emerald-500/20 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                  : "border border-slate-800 bg-slate-950/50 text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Feed */}
      {loading ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/40">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
          <p className="mt-3 font-mono text-xs text-slate-400">
            Fetching inbound communication logs...
          </p>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/20 py-16 text-center">
          <MessageSquare size={40} className="text-slate-600 mb-3" />
          <h3 className="font-heading text-lg font-bold text-white">
            No inquiries in this view
          </h3>
          <p className="mt-1 text-xs text-slate-400 max-w-sm">
            {searchQuery
              ? `No messages matched "${searchQuery}". Try modifying search filters.`
              : "No inbound messages detected. All client inquiries will appear here automatically."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((msg, index) => {
            const isUnread = !msg.read;
            const initialLetter = msg.name ? msg.name.charAt(0).toUpperCase() : "U";

            return (
              <motion.div
                key={msg._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className={`relative overflow-hidden rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 ${
                  isUnread
                    ? "border-emerald-500/50 bg-slate-900/70 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
                    : "border-slate-800/80 bg-slate-900/40 hover:border-slate-700"
                }`}
              >
                {/* Cyber accent bar for unread message */}
                {isUnread && (
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-cyan-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                )}

                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  {/* Sender Profile Header */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-bold font-mono text-base shadow-lg ${
                        isUnread
                          ? "bg-gradient-to-br from-emerald-400 to-cyan-600 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                          : "border border-slate-700 bg-slate-800 text-slate-300"
                      }`}
                    >
                      {initialLetter}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-bold font-heading text-white text-base">
                          {msg.name}
                        </h4>
                        {isUnread ? (
                          <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                            UNREAD INQUIRY
                          </span>
                        ) : (
                          <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-400">
                            Reviewed
                          </span>
                        )}
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                        <span className="text-cyan-300">{msg.email}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-slate-500">
                          <Clock size={12} />
                          {new Date(msg.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Trigger Buttons */}
                  <div className="flex items-center gap-2">
                    {/* Copy email */}
                    <button
                      onClick={(e) => handleCopyEmail(msg.email, msg._id, e)}
                      title="Copy email address"
                      className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-1.5 text-xs font-mono text-slate-300 transition hover:border-slate-700 hover:text-white"
                    >
                      {copiedId === msg._id ? (
                        <>
                          <Check size={13} className="text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>Copy Email</span>
                        </>
                      )}
                    </button>

                    {/* Direct Mailto Reply */}
                    <a
                      href={`mailto:${msg.email}?subject=Regarding%20your%20inquiry%20to%20Arvind%20Gupta&body=Hi%20${encodeURIComponent(
                        msg.name
                      )},%0D%0A%0D%0AThank%20you%20for%20reaching%20out!`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 px-3 py-1.5 text-xs font-mono font-bold text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)] transition hover:bg-cyan-500/30"
                    >
                      <Reply size={13} />
                      Reply
                    </a>

                    {/* Mark Read Toggle */}
                    {isUnread && (
                      <button
                        onClick={(e) => handleMarkAsRead(msg._id, e)}
                        title="Mark inquiry as read"
                        className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2 text-emerald-400 transition hover:bg-emerald-500/20"
                      >
                        <Check size={15} />
                      </button>
                    )}

                    {/* Delete Inquiry */}
                    <button
                      onClick={() => setMessageToDelete(msg)}
                      title="Delete inquiry"
                      className="rounded-xl border border-slate-800 bg-slate-950/80 p-2 text-slate-400 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Message Body Content */}
                <div className="mt-4 rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 font-sans text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {msg.message}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {messageToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMessageToDelete(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-md rounded-2xl border border-red-500/40 bg-slate-950 p-6 shadow-[0_0_50px_rgba(239,68,68,0.25)] backdrop-blur-2xl"
            >
              <div className="flex items-center gap-3 text-red-400">
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-2.5">
                  <AlertTriangle size={20} />
                </div>
                <h3 className="text-lg font-bold font-heading text-white">
                  Delete Client Inquiry?
                </h3>
              </div>

              <p className="mt-3 text-sm text-slate-300">
                Are you sure you want to delete message from{" "}
                <span className="font-bold text-white">
                  "{messageToDelete.name}" ({messageToDelete.email})
                </span>
                ? This action cannot be reversed.
              </p>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setMessageToDelete(null)}
                  className="rounded-xl border border-slate-800 px-4 py-2 text-xs font-mono text-slate-400 hover:bg-slate-900 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="rounded-xl bg-red-600 px-4 py-2 text-xs font-mono font-bold text-white shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:bg-red-500"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}