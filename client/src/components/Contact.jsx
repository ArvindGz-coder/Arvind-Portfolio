import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Send,
  MapPin,
  Copy,
  Check,
  Sparkles,
  ArrowUpRight,
  MessageSquare,
  AlertCircle,
  Clock,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./ui/Icons";
import axios from "axios";
import TiltCard from "./ui/TiltCard";
import MagneticButton from "./ui/MagneticButton";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // null, 'success', 'error'
  const [statusMessage, setStatusMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("arvindgupta.webdev@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name";
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Please include a message";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setStatus(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await axios.post(`${apiUrl}/contact`, formData, {
        timeout: 8000,
      });

      if (response.data.success) {
        setStatus("success");
        setStatusMessage("Message delivered straight to Arvind's inbox (arvindgupta.webdev@gmail.com)! Expect a response within 24 hours.");
        setFormData({ name: "", email: "", subject: "", message: "" });
        return;
      }
      throw new Error(response.data.message || "Failed to deliver");
    } catch (err) {
      console.warn("Contact form fallback:", err.message);

      // Launch mailto fallback so Arvind guaranteed receives the message
      const mailtoUrl = `mailto:arvindgupta.webdev@gmail.com?subject=${encodeURIComponent(
        formData.subject || `Portfolio Message from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      window.location.href = mailtoUrl;

      setStatus("success");
      setStatusMessage(
        "Redirecting to your mail client to transmit directly to arvindgupta.webdev@gmail.com. Thank you!"
      );
      setFormData({ name: "", email: "", subject: "", message: "" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative px-6 py-28 sm:py-36 overflow-hidden">
      {/* Background Glows */}
      <div className="pointer-events-none absolute left-1/4 bottom-1/4 -z-10 h-[500px] w-[500px] bg-cyan-500/5 blur-[160px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-10 -z-10 h-[500px] w-[500px] bg-indigo-600/5 blur-[160px]" />

      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs font-mono text-cyan-400">
            <Sparkles size={13} />
            <span>05 // GET IN TOUCH</span>
          </div>

          <h2 className="mt-4 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white">
            Let's build something <br />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-white bg-clip-text text-transparent">
              extraordinary together.
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-zinc-400">
            Whether you have an ambitious product to engineer, an internship opportunity,
            or just want to talk software architecture, my inbox is always open.
          </p>
        </motion.div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Direct Contact Info (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-6"
          >
            {/* Direct Email Card with One-Click Copy */}
            <TiltCard className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500">DIRECT EMAIL</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.05] px-2.5 py-1 text-xs text-zinc-300 hover:border-cyan-400/40 hover:text-white transition-all"
                  data-cursor="pointer"
                >
                  {copied ? (
                    <>
                      <Check size={13} className="text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
                  <Mail size={20} />
                </div>
                <a
                  href="mailto:arvindgupta.webdev@gmail.com"
                  className="text-base font-semibold text-white hover:text-cyan-300 transition-colors break-all"
                  data-cursor="pointer"
                >
                  arvindgupta.webdev@gmail.com
                </a>
              </div>
            </TiltCard>

            {/* Social Channels Card */}
            <TiltCard className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 backdrop-blur-xl">
              <span className="text-xs font-mono text-zinc-500">PROFESSIONAL CHANNELS</span>

              <div className="mt-4 space-y-3">
                <a
                  href="https://github.com/ArvindGz-coder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] p-3.5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                  data-cursor="pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05] text-zinc-300 group-hover:text-white">
                      <GithubIcon size={18} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">GitHub</div>
                      <div className="text-xs text-zinc-500">@ArvindGz-coder</div>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-zinc-500 group-hover:text-white transition-colors" />
                </a>

                <a
                  href="https://www.linkedin.com/in/arvind-gupta-5117b8279/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] p-3.5 transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/[0.06]"
                  data-cursor="pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                      <LinkedinIcon size={18} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">LinkedIn</div>
                      <div className="text-xs text-zinc-500">Arvind Gupta</div>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-zinc-500 group-hover:text-cyan-300 transition-colors" />
                </a>
              </div>
            </TiltCard>

            {/* Location & Timezone Card */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-cyan-400">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-xs font-mono text-zinc-500">LOCATION & TIMEZONE</div>
                  <div className="text-sm font-semibold text-white">
                    Jaipur, India · IST (UTC +5:30)
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for global remote collaboration & relocation</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean, Validated Interactive Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <TiltCard
              maxTilt={3}
              className="rounded-3xl border border-white/15 bg-[#030712]/80 p-7 sm:p-9 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
                <div className="flex items-center gap-2.5">
                  <MessageSquare size={18} className="text-cyan-400" />
                  <span className="font-heading text-lg font-bold text-white">
                    Send a Message
                  </span>
                </div>
                <span className="font-mono text-xs text-zinc-500">RESPONSE TIME &lt; 24H</span>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-zinc-400"
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Sarah Connor"
                      className={`w-full rounded-xl border bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all duration-300 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 ${
                        errors.name ? "border-rose-500/80" : "border-white/10"
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-rose-400">
                        <AlertCircle size={12} /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-zinc-400"
                    >
                      Your Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. sarah@company.com"
                      className={`w-full rounded-xl border bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all duration-300 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 ${
                        errors.email ? "border-rose-500/80" : "border-white/10"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-rose-400">
                        <AlertCircle size={12} /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-zinc-400"
                  >
                    Subject / Project Type
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Full Stack Engineering Role / Project Inquiry"
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all duration-300 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-zinc-400"
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about the project goals, tech stack, or opportunity..."
                    className={`w-full resize-none rounded-xl border bg-black/40 px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all duration-300 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 ${
                      errors.message ? "border-rose-500/80" : "border-white/10"
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-rose-400">
                      <AlertCircle size={12} /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Status Notice */}
                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs sm:text-sm text-emerald-300 flex items-center gap-2.5"
                    >
                      <Check size={18} className="shrink-0 text-emerald-400" />
                      <span>{statusMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <div className="pt-2">
                  <MagneticButton strength={0.2} className="w-full sm:w-auto">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_25px_rgba(99,102,241,0.35)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(6,182,212,0.55)] disabled:opacity-60 disabled:cursor-not-allowed"
                      data-cursor="pointer"
                    >
                      {submitting ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span>Transmitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send size={15} />
                        </>
                      )}
                    </button>
                  </MagneticButton>
                </div>
              </form>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
