import { motion } from "framer-motion";
import {
  Code2,
  Terminal,
  Cpu,
  Globe,
  GitCommit,
  CheckCircle2,
  Flame,
  Layers,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import TiltCard from "./ui/TiltCard";
import AnimatedCounter from "./ui/AnimatedCounter";

const metrics = [
  {
    number: "12",
    suffix: "+",
    label: "Full Stack Apps Built",
    description: "Production web applications & full-stack systems",
    icon: Code2,
    glow: "text-cyan-400",
  },
  {
    number: "650",
    suffix: "+",
    label: "Git Commits & Pushes",
    description: "Consistent daily engineering & shipping",
    icon: GitCommit,
    glow: "text-indigo-400",
  },
  {
    number: "250",
    suffix: "+",
    label: "DSA Problems Solved",
    description: "Data structures, algorithms & optimization",
    icon: Flame,
    glow: "text-amber-400",
  },
  {
    number: "100",
    suffix: "%",
    label: "Commitment to Clean Code",
    description: "Modular architecture & scalable patterns",
    icon: ShieldCheck,
    glow: "text-emerald-400",
  },
];

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 sm:py-36 overflow-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 bg-indigo-500/5 blur-[160px]" />

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
            <span>01 // ABOUT & PHILOSOPHY</span>
          </div>

          <h2 className="mt-4 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white">
            Architecture first. <br />
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-white bg-clip-text text-transparent">
              Clean code always.
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-zinc-400">
            A developer's craft lives at the intersection of robust backend engineering,
            thoughtful system design, and frictionless user experiences.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: Core Engineering Philosophy (Large 2x2 Bento) */}
          <TiltCard
            className="md:col-span-2 lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.025] p-7 sm:p-9 backdrop-blur-xl hover:border-cyan-500/30 transition-colors"
          >
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.25)]">
                    <Terminal size={22} />
                  </div>
                  <span className="font-mono text-xs text-zinc-300">CORE ETHOS</span>
                </div>

                <h3 className="mt-6 font-heading text-2xl sm:text-3xl font-bold text-white">
                  Engineering Resilient, Scalable Systems
                </h3>

                <p className="mt-4 text-sm sm:text-base leading-relaxed text-zinc-300">
                  I am a Computer Science & Engineering student specializing in Full Stack
                  Web Development. My philosophy is rooted in building software that doesn't just
                  look sleek, but handles real-world scale with high concurrency, reliable database
                  modeling, and security best practices.
                </p>

                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  From RESTful API architectures with Node.js and Express to sub-millisecond client
                  renderings powered by React and modern state patterns, I engineer solutions with
                  uncompromising attention to detail.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-2 border-t border-white/10 pt-6">
                {["RESTful APIs", "JWT Security", "Database Modeling", "Sub-100ms UX", "Component Systems"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-white/10 bg-black/40 px-3 py-1 font-mono text-xs text-zinc-300"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </TiltCard>

          {/* Card 2: Location & Availability Bento Card */}
          <TiltCard
            className="rounded-3xl border border-white/10 bg-white/[0.025] p-7 backdrop-blur-xl hover:border-indigo-500/30 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                  <Globe size={22} />
                </div>
                <span className="flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
              </div>

              <h3 className="mt-6 font-heading text-xl font-bold text-white">
                Global Remote & Hybrid
              </h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                Based in <span className="text-white font-medium">Jaipur, India</span> (IST),
                collaborating seamlessly with teams across North America, Europe, and Asia.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500">STATUS</span>
                <span className="text-emerald-400 font-semibold">Active & Responsive</span>
              </div>
              <div className="mt-2 text-xs text-zinc-400">
                Open to Full-Time, Internship & Contract Roles
              </div>
            </div>
          </TiltCard>

          {/* Card 3: Continuous Learning & CS Foundation */}
          <TiltCard
            className="rounded-3xl border border-white/10 bg-white/[0.025] p-7 backdrop-blur-xl hover:border-purple-500/30 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-500/10 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                <Layers size={22} />
              </div>

              <h3 className="mt-6 font-heading text-xl font-bold text-white">
                Computer Science Rigor
              </h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                Pursuing B.Tech in CSE at JECRC University. Focused on Data Structures,
                Operating Systems, Database Management Systems, and Object-Oriented Design.
              </p>
            </div>

            <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>EST. GRADUATION</span>
              <span className="text-white font-semibold">2027</span>
            </div>
          </TiltCard>

          {/* Metric Counters Banner (Full Width Bento Row) */}
          <div className="col-span-1 md:col-span-3 lg:col-span-4 mt-2">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-950/20 via-[#030712] to-cyan-950/20 p-6 sm:p-8 backdrop-blur-xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                {metrics.map((metric, idx) => {
                  const Icon = metric.icon;
                  return (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="group flex flex-col items-center text-center p-3 rounded-2xl hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-400 group-hover:text-cyan-400 group-hover:border-cyan-500/40 transition-colors">
                        <Icon size={18} />
                      </div>

                      <div className={`mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${metric.glow}`}>
                        <AnimatedCounter value={metric.number} suffix={metric.suffix} />
                      </div>

                      <p className="mt-2 text-xs sm:text-sm font-semibold text-white">
                        {metric.label}
                      </p>
                      <p className="mt-1 text-[11px] text-zinc-300 leading-tight">
                        {metric.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}