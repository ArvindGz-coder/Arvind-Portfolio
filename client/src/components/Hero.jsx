import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Download, Terminal, Code2, Sparkles, Layers, Cpu } from "lucide-react";
import MagneticButton from "./ui/MagneticButton";
import { useSmoothScroll } from "../context/SmoothScroll";

const techBadges = [
  { name: "React 19", color: "from-cyan-500/20 to-blue-500/20", border: "border-cyan-500/40", text: "text-cyan-300", floatDuration: 3.8, delay: 0 },
  { name: "Node.js", color: "from-emerald-500/20 to-green-500/20", border: "border-emerald-500/40", text: "text-emerald-300", floatDuration: 4.4, delay: 0.3 },
  { name: "TypeScript", color: "from-blue-500/20 to-indigo-500/20", border: "border-blue-500/40", text: "text-blue-300", floatDuration: 3.5, delay: 0.6 },
  { name: "MongoDB", color: "from-green-500/20 to-teal-500/20", border: "border-green-500/40", text: "text-green-300", floatDuration: 4.8, delay: 0.2 },
  { name: "Tailwind CSS", color: "from-sky-500/20 to-cyan-500/20", border: "border-sky-500/40", text: "text-sky-300", floatDuration: 4.0, delay: 0.5 },
  { name: "Express.js", color: "from-indigo-500/20 to-violet-500/20", border: "border-indigo-500/40", text: "text-indigo-300", floatDuration: 3.9, delay: 0.4 },
];

export default function Hero() {
  const { scrollTo } = useSmoothScroll();

  const handleExploreClick = (e) => {
    e.preventDefault();
    scrollTo("#projects", { offset: -60 });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-32 pb-20"
    >
      {/* Radiant ambient glow orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Core Electric Indigo Radial Glow */}
        <div className="absolute left-1/2 top-1/4 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-transparent blur-[140px]" />

        {/* Neon Cyan Accent Glow */}
        <div className="absolute right-[-10%] top-[30%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[130px]" />

        {/* Deep Violet Base Glow */}
        <div className="absolute left-[-10%] bottom-[10%] h-[450px] w-[450px] rounded-full bg-indigo-700/10 blur-[150px]" />

        {/* Subtle Cyber Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="flex flex-col items-center text-center">
          {/* Availability Pill */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 shadow-[0_0_20px_rgba(99,102,241,0.15)] backdrop-blur-md transition-all duration-300 hover:border-cyan-500/40 hover:bg-white/[0.06]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4]" />
            </span>
            <span className="font-mono text-xs font-semibold tracking-wide text-zinc-300">
              AVAILABLE FOR HIGH-IMPACT ROLES
            </span>
            <span className="hidden sm:inline-block h-3.5 w-[1px] bg-white/20" />
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-zinc-400">
              <Sparkles size={11} className="text-cyan-400" /> Full Stack Architecture
            </span>
          </motion.div>

          {/* Kinetic Typography Title */}
          <div className="max-w-5xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-4xl font-black tracking-tight sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05]"
            >
              Hi, I'm{" "}
              <span className="relative inline-block text-white">
                Arvind Gupta
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
                  className="absolute bottom-1 left-0 h-[3px] bg-gradient-to-r from-indigo-500 via-cyan-400 to-transparent rounded-full"
                />
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-white bg-clip-text text-transparent">
                Full Stack Engineer
              </span>{" "}
              <span className="text-zinc-400 font-light">&</span>{" "}
              <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                Software Architect.
              </span>
            </motion.h1>
          </div>

          {/* Dynamic Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-3xl text-base sm:text-lg md:text-xl font-normal leading-relaxed text-zinc-300/80"
          >
            Engineering resilient, scalable distributed backends paired with silky-smooth,
            award-winning frontend experiences. Driven by clean code, high-throughput microservices,
            and cutting-edge full-stack mastery across{" "}
            <span className="font-semibold text-white">React, Node.js, Express, MongoDB,</span> and{" "}
            <span className="font-semibold text-cyan-300">Tailwind CSS</span>.
          </motion.p>

          {/* Dual Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5"
          >
            {/* Primary CTA - Magnetic Explore Projects */}
            <MagneticButton strength={0.2} onClick={handleExploreClick}>
              <div
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 p-[1.5px] shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.6)]"
                data-cursor="pointer"
              >
                <div className="flex items-center gap-2.5 rounded-full bg-[#030712] px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 group-hover:bg-transparent">
                  <span>Explore Projects</span>
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </div>
            </MagneticButton>

            {/* Secondary CTA - Download Resume with subtle animated border-glow */}
            <a
              href="/Arvind-Gupta-Resume.pdf"
              download="Arvind-Gupta-Resume.pdf"
              className="group relative inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-zinc-200 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50 hover:bg-white/[0.09] hover:text-white hover:shadow-[0_0_25px_rgba(6,182,212,0.25)]"
              data-cursor="pointer"
            >
              <Download size={16} className="text-cyan-400 transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span>Download Resume</span>
            </a>
          </motion.div>

          {/* Floating Interactive Tech-Stack Badge Pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-14 w-full"
          >
            <p className="mb-4 text-xs uppercase font-mono tracking-[0.25em] text-zinc-300">
              CORE ARCHITECTURAL TOOLKIT
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
              {techBadges.map((badge) => (
                <motion.div
                  key={badge.name}
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: badge.floatDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: badge.delay,
                  }}
                  whileHover={{
                    scale: 1.08,
                    y: -12,
                    transition: { duration: 0.2 },
                  }}
                  className={`group flex items-center gap-2 rounded-xl border ${badge.border} bg-gradient-to-r ${badge.color} px-4 py-2 backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]`}
                  data-cursor="pointer"
                >
                  <Cpu size={14} className={badge.text} />
                  <span className={`text-xs font-semibold ${badge.text}`}>
                    {badge.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Scroll Down Cue */}
          <motion.button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#about", { offset: -60 });
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-16 flex flex-col items-center gap-2 text-zinc-300 hover:text-cyan-400 transition-colors"
            data-cursor="pointer"
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
              Scroll To Explore
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-8 w-5 items-start justify-center rounded-full border border-white/20 p-1"
            >
              <span className="h-1.5 w-1 rounded-full bg-cyan-400" />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
