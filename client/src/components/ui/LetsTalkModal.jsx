import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Mail,
  MessageCircle,
  Copy,
  Check,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import axios from "axios";
import { useLetsTalk } from "../../context/LetsTalkContext";
import MagneticButton from "./MagneticButton";

export default function LetsTalkModal() {
  const { isOpen, closeModal } = useLetsTalk();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [statusMsg, setStatusMsg] = useState("");
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("arvindgupta.webdev@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Your name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Your email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Please write a brief message";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setStatus(null);

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

    try {
      const response = await axios.post(`${apiUrl}/contact`, formData, {
        timeout: 8000,
      });

      if (response.data.success) {
        setStatus("success");
        setStatusMsg("Message delivered directly to Arvind's inbox! Expect a response within 24 hours.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(response.data.message || "Failed to deliver");
      }
    } catch (err) {
      console.warn("Backend API dispatch notice:", err.message);

      // Even if network or API has issues, provide a seamless direct mailto fallback link
      const mailtoUrl = `mailto:arvindgupta.webdev@gmail.com?subject=${encodeURIComponent(
        formData.subject || `Portfolio Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      // Open mail client as fallback
      window.location.href = mailtoUrl;

      setStatus("success");
      setStatusMsg("Connecting to your mail client to dispatch directly to arvindgupta.webdev@gmail.com!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-[#030712]/85 backdrop-blur-xl transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative z-10 w-full max-w-xl rounded-3xl border border-white/15 bg-[#030712]/95 p-6 sm:p-8 text-white shadow-[0_25px_70px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="font-mono text-xs text-emerald-400 font-semibold tracking-wide">
                    DIRECT CONTACT CHANNEL
                  </span>
                </div>

                <h3 className="mt-1 font-heading text-2xl sm:text-3xl font-extrabold text-white">
                  Let's Talk Directly.
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                  Send a message straight to Arvind's inbox or connect via instant channels.
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
                data-cursor="pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Action Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-4">
              {/* Copy Email */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.02] py-2 px-3 text-xs text-zinc-300 hover:border-cyan-400/40 hover:text-white transition-all"
                data-cursor="pointer"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? "Copied!" : "Copy Email"}</span>
              </button>

              {/* Direct Mailto */}
              <a
                href="mailto:arvindgupta.webdev@gmail.com?subject=Let's%20Talk%20%E2%80%94%20Opportunity%20Inquiry"
                className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.02] py-2 px-3 text-xs text-zinc-300 hover:border-indigo-400/40 hover:text-white transition-all"
                data-cursor="pointer"
              >
                <Mail size={14} className="text-indigo-400" />
                <span>Open Email</span>
              </a>

              {/* Direct WhatsApp */}
              <a
                href="https://wa.me/?text=Hi%20Arvind,%20I%20came%20across%20your%20full%20stack%20portfolio%20and%20would%20love%20to%20connect!"
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.02] py-2 px-3 text-xs text-zinc-300 hover:border-emerald-400/40 hover:text-white transition-all"
                data-cursor="pointer"
              >
                <MessageCircle size={14} className="text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Direct Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="modal-name" className="mb-1 block text-[11px] font-mono uppercase text-zinc-400">
                    Your Name *
                  </label>
                  <input
                    id="modal-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Mercer"
                    className={`w-full rounded-xl border bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 transition-all outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 ${
                      errors.name ? "border-rose-500" : "border-white/10"
                    }`}
                  />
                  {errors.name && <p className="mt-1 text-[10px] text-rose-400">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="modal-email" className="mb-1 block text-[11px] font-mono uppercase text-zinc-400">
                    Your Email *
                  </label>
                  <input
                    id="modal-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex@company.com"
                    className={`w-full rounded-xl border bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 transition-all outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 ${
                      errors.email ? "border-rose-500" : "border-white/10"
                    }`}
                  />
                  {errors.email && <p className="mt-1 text-[10px] text-rose-400">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="modal-subject" className="mb-1 block text-[11px] font-mono uppercase text-zinc-400">
                  Topic / Opportunity
                </label>
                <input
                  id="modal-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Full Stack Engineering Role / Project Collaboration"
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 transition-all outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>

              <div>
                <label htmlFor="modal-message" className="mb-1 block text-[11px] font-mono uppercase text-zinc-400">
                  Your Message *
                </label>
                <textarea
                  id="modal-message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi Arvind, I'd like to discuss an opportunity..."
                  className={`w-full resize-none rounded-xl border bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder-zinc-600 transition-all outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 ${
                    errors.message ? "border-rose-500" : "border-white/10"
                  }`}
                />
                {errors.message && <p className="mt-1 text-[10px] text-rose-400">{errors.message}</p>}
              </div>

              {/* Status Alert */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300"
                  >
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>{statusMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
                  TO: arvindgupta.webdev@gmail.com
                </span>

                <MagneticButton strength={0.2} className="w-full sm:w-auto">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 px-6 py-2.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(99,102,241,0.35)] transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.55)] disabled:opacity-60"
                    data-cursor="pointer"
                  >
                    {submitting ? (
                      <>
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Sending to Arvind...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message Now</span>
                        <Send size={13} />
                      </>
                    )}
                  </button>
                </MagneticButton>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
