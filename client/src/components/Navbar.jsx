import { useState, useEffect } from "react";
import { Menu, X, FileText, ArrowUpRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./ui/MagneticButton";
import { useSmoothScroll } from "../context/SmoothScroll";
import { useLetsTalk } from "../context/LetsTalkContext";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollTo } = useSmoothScroll();
  const { openModal: openLetsTalk } = useLetsTalk();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Simple active section detection
      const sections = ["home", "about", "skills", "projects", "experience", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    scrollTo(href, { offset: -70 });
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 sm:px-6 pt-4 transition-all duration-300">
      <nav
        className={`mx-auto max-w-6xl rounded-2xl border transition-all duration-500 ${
          scrolled
            ? "border-white/15 bg-[#030712]/80 py-3 px-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
            : "border-white/10 bg-[#030712]/50 py-4 px-6 backdrop-blur-xl"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="group flex items-center gap-3"
            data-cursor="pointer"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-cyan-400 p-[1px] transition-transform duration-300 group-hover:scale-105 shadow-[0_0_20px_rgba(99,102,241,0.35)]">
              <span className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#030712] text-xs font-black tracking-wider text-white">
                AG
              </span>
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#030712] bg-emerald-400" />
            </div>

            <div className="flex flex-col">
              <span className="font-heading text-sm font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                Arvind Gupta
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 flex items-center gap-1">
                Full Stack Architect
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-1 rounded-full border border-white/5 bg-white/[0.02] p-1.5 md:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-all duration-300 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                  data-cursor="pointer"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.25)]"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </a>
              );
            })}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-3 md:flex">
            {/* View Resume Button */}
            <a
              href="/Arvind-Gupta-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-semibold text-zinc-300 transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:text-white"
              data-cursor="pointer"
            >
              <FileText size={14} className="text-indigo-400 transition-transform group-hover:scale-110" />
              <span>Resume</span>
            </a>

            {/* Magnetic "Let's Talk" CTA */}
            <MagneticButton
              strength={0.25}
              onClick={() => openLetsTalk()}
            >
              <div
                className="relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 p-[1px] shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]"
                data-cursor="pointer"
              >
                <div className="flex items-center gap-2 rounded-[11px] bg-[#030712] px-4 py-2 text-xs font-bold text-white transition-all duration-300 hover:bg-transparent hover:text-white">
                  <span>Let's Talk</span>
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition hover:bg-white/10 md:hidden"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            data-cursor="pointer"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden md:hidden"
            >
              <div className="mt-4 border-t border-white/10 pt-4 pb-2">
                <div className="flex flex-col gap-1.5">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/[0.06] hover:text-white"
                    >
                      <span>{item.name}</span>
                      <ArrowUpRight size={14} className="text-zinc-500" />
                    </motion.a>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-4">
                  <a
                    href="/Arvind-Gupta-Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-xs font-semibold text-zinc-200"
                  >
                    <FileText size={14} />
                    Resume
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      openLetsTalk();
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 py-2.5 text-xs font-bold text-white shadow-lg"
                  >
                    <Sparkles size={14} />
                    Let's Talk
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
