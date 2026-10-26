import { ArrowUp, Mail, FileText, Heart, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./ui/Icons";
import MagneticButton from "./ui/MagneticButton";
import { useSmoothScroll } from "../context/SmoothScroll";

export default function Footer() {
  const { scrollTo } = useSmoothScroll();

  const handleBackToTop = (e) => {
    e.preventDefault();
    scrollTo("#home", { offset: 0 });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#030712] px-6 py-12 overflow-hidden">
      {/* Subtle top glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[1px] w-3/4 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand & Tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 p-[1px] shadow-lg">
              <span className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#030712] text-xs font-black text-white">
                AG
              </span>
            </div>

            <div>
              <p className="font-heading text-sm font-bold text-white">
                Arvind Gupta · Full Stack Engineer
              </p>
              <p className="text-xs text-zinc-300 mt-0.5">
                © {new Date().getFullYear()} All rights reserved. Crafted with React, GSAP & Tailwind.
              </p>
            </div>
          </div>

          {/* Social Quick Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/ArvindGz-coder"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/30 hover:text-white transition-all"
              aria-label="GitHub Profile"
              data-cursor="pointer"
            >
              <GithubIcon size={16} />
            </a>

            <a
              href="https://www.linkedin.com/in/arvind-gupta-5117b8279/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 hover:border-cyan-400/40 hover:text-cyan-400 transition-all"
              aria-label="LinkedIn Profile"
              data-cursor="pointer"
            >
              <LinkedinIcon size={16} />
            </a>

            <a
              href="mailto:arvindgupta.webdev@gmail.com"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 hover:border-indigo-400/40 hover:text-indigo-400 transition-all"
              aria-label="Email Me"
              data-cursor="pointer"
            >
              <Mail size={16} />
            </a>

            <a
              href="/Arvind-Gupta-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 hover:border-emerald-400/40 hover:text-emerald-400 transition-all"
              aria-label="Resume PDF"
              data-cursor="pointer"
            >
              <FileText size={16} />
            </a>
          </div>

          {/* Back to Top Smooth Trigger */}
          <MagneticButton strength={0.3} onClick={handleBackToTop}>
            <div
              className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-mono text-zinc-300 hover:border-cyan-400/40 hover:bg-white/[0.08] hover:text-white transition-all shadow-sm"
              data-cursor="pointer"
            >
              <span>BACK TO TOP</span>
              <ArrowUp size={14} className="text-cyan-400 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </div>
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}