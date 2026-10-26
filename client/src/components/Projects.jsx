import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  Code2,
  Layers,
  CheckCircle2,
  AlertCircle,
  Laptop,
} from "lucide-react";
import { GithubIcon } from "./ui/Icons";
import axios from "axios";
import TiltCard from "./ui/TiltCard";
import MagneticButton from "./ui/MagneticButton";
import { ProjectSkeletonCard } from "./ui/SkeletonUI";

const fallbackProjects = [
  {
    _id: "p1",
    number: "01",
    title: "CareerGenie — AI Career Intelligence OS",
    category: "Full Stack & Generative AI Platform",
    featured: true,
    problem:
      "Students and job seekers struggle with fragmented job applications, sub-optimal ATS resume scores, and a lack of real-time personalized interview coaching.",
    solution:
      "Architected an end-to-end AI career suite integrating Google Gemini AI for automated resume scoring, tailored job match recommendations, and interactive mock interview simulations with live feedback.",
    technologies: ["React 19", "Node.js", "Express.js", "MongoDB Atlas", "Google Gemini AI", "Tailwind CSS"],
    github: "https://github.com/ArvindGz-coder/CareerGenie",
    demo: "https://careergenie-ai.vercel.app",
    gradient: "from-cyan-500/20 via-indigo-500/10 to-transparent",
    borderGlow: "group-hover:border-cyan-500/50",
    accentColor: "text-cyan-400",
    mockupType: "ai-suite",
  },
  {
    _id: "p2",
    number: "02",
    title: "Student Career OS",
    category: "Centralized Academic & Career Management System",
    featured: true,
    problem:
      "Tracking internships, professional certifications, hackathon deliverables, and resumes across scattered spreadsheets causes missed deadlines and lost opportunities.",
    solution:
      "Designed a unified, role-based career OS featuring encrypted document vaults, deadline calendar synchronization, automated resume versioning, and credential verification.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT Auth", "REST APIs", "Tailwind CSS"],
    github: "https://github.com/ArvindGz-coder",
    demo: "#",
    gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
    borderGlow: "group-hover:border-indigo-500/50",
    accentColor: "text-indigo-400",
    mockupType: "dashboard",
  },
  {
    _id: "p3",
    number: "03",
    title: "JECRC ERP Modern Frontend",
    category: "High-Performance Academic Enterprise Portal",
    featured: false,
    problem:
      "Legacy campus ERP platforms suffer from slow page load times, non-responsive mobile layouts, and convoluted grade calculation workflows.",
    solution:
      "Built a modern, ultra-responsive single-page ERP interface with client-side caching, fluid timetable visualization, attendance alerts, and instant GPA projection calculation.",
    technologies: ["React", "Vite", "JavaScript (ES6+)", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/ArvindGz-coder",
    demo: "#",
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    borderGlow: "group-hover:border-purple-500/50",
    accentColor: "text-purple-400",
    mockupType: "erp",
  },
  {
    _id: "p4",
    number: "04",
    title: "CyberGuard — Password Security & Entropy Analyzer",
    category: "Client-Side Cryptography & Security Tool",
    featured: false,
    problem:
      "Users frequently rely on weak, predictable passwords vulnerable to dictionary attacks and rainbow table lookups without understanding mathematical entropy.",
    solution:
      "Developed a real-time password strength analyzer utilizing mathematical Shannon entropy metrics, pattern dictionary matching, and instant algorithmic crack-time estimation.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Web Cryptography API", "Tailwind CSS"],
    github: "https://github.com/ArvindGz-coder",
    demo: "#",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    borderGlow: "group-hover:border-emerald-500/50",
    accentColor: "text-emerald-400",
    mockupType: "security",
  },
];

export default function Projects() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
        const response = await axios.get(`${apiUrl}/projects`, { timeout: 2500 });
        if (response.data.success && response.data.data && response.data.data.length > 0) {
          const merged = response.data.data.map((apiProj, idx) => {
            const fallback = fallbackProjects[idx] || fallbackProjects[0];
            return {
              ...fallback,
              ...apiProj,
              technologies: apiProj.technologies || fallback.technologies,
              problem: apiProj.problem || fallback.problem,
              solution: apiProj.description || fallback.solution,
            };
          });
          setProjects(merged);
        }
      } catch (err) {
        // Maintain fallback data
      } finally {
        setTimeout(() => setLoading(false), 600);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects =
    activeFilter === "featured"
      ? projects.filter((p) => p.featured)
      : projects;

  return (
    <section id="projects" className="relative px-6 py-28 sm:py-36 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute left-1/3 top-1/4 -z-10 h-[600px] w-[600px] bg-indigo-600/5 blur-[160px]" />

      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs font-mono text-cyan-400">
              <Sparkles size={13} />
              <span>03 // SELECTED PORTFOLIO WORKS</span>
            </div>

            <h2 className="mt-4 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white">
              Featured projects & <br />
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-white bg-clip-text text-transparent">
                production systems.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
                activeFilter === "all"
                  ? "bg-white text-black font-semibold shadow-lg"
                  : "border border-white/10 text-zinc-400 hover:text-white"
              }`}
              data-cursor="pointer"
            >
              All Works ({projects.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter("featured")}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
                activeFilter === "featured"
                  ? "bg-white text-black font-semibold shadow-lg"
                  : "border border-white/10 text-zinc-400 hover:text-white"
              }`}
              data-cursor="pointer"
            >
              Featured Only
            </button>
          </div>
        </motion.div>

        {/* Staggered Project Cards or Skeleton Cards */}
        {loading ? (
          <div className="space-y-10 sm:space-y-12">
            <ProjectSkeletonCard />
            <ProjectSkeletonCard />
          </div>
        ) : (
          <div className="space-y-10 sm:space-y-12">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id || index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
              <TiltCard
                maxTilt={4}
                className={`group relative rounded-3xl border border-white/10 bg-[#030712]/70 p-6 sm:p-9 lg:p-10 backdrop-blur-xl transition-all duration-500 hover:border-white/25 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] ${
                  project.featured ? "border-indigo-500/30" : ""
                }`}
              >
                {/* Accent Ambient Gradient inside card */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${
                    project.gradient || "from-indigo-500/10 via-transparent to-transparent"
                  } opacity-30 group-hover:opacity-60 transition-opacity duration-500 rounded-3xl`}
                />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Project Details (7 cols) */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    {/* Top Meta Pill & Number */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs tracking-widest text-zinc-500">
                          {String(project.number || index + 1).padStart(2, "0")}
                        </span>
                        <span className="h-3 w-[1px] bg-white/20" />
                        <span className="text-xs uppercase font-mono tracking-wider text-cyan-400">
                          {project.category}
                        </span>
                      </div>

                      {project.featured && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-3 py-1 font-mono text-[10px] text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.25)]">
                          <Sparkles size={11} /> FEATURED
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="mt-4 font-heading text-2xl sm:text-3xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>

                    {/* Problem & Solution Breakdown */}
                    <div className="mt-5 space-y-3 rounded-2xl border border-white/10 bg-black/40 p-4 sm:p-5">
                      <div className="flex items-start gap-3">
                        <AlertCircle size={16} className="mt-1 text-amber-400 shrink-0" />
                        <div>
                          <span className="text-xs font-mono font-bold text-amber-300">
                            THE CHALLENGE
                          </span>
                          <p className="mt-0.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                            {project.problem}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 border-t border-white/10 pt-3">
                        <CheckCircle2 size={16} className="mt-1 text-cyan-400 shrink-0" />
                        <div>
                          <span className="text-xs font-mono font-bold text-cyan-300">
                            ENGINEERING SOLUTION
                          </span>
                          <p className="mt-0.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                            {project.solution}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Glowing Tech Stack Tags */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.technologies?.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs font-mono text-zinc-300 transition-all duration-200 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/5 group-hover:text-white"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      {project.demo && project.demo !== "#" && (
                        <MagneticButton strength={0.25}>
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold !text-black transition-all duration-300 hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                            data-cursor="pointer"
                          >
                            <span>Live Demo</span>
                            <ArrowUpRight size={15} />
                          </a>
                        </MagneticButton>
                      )}

                      {project.github && project.github !== "#" && (
                        <MagneticButton strength={0.2}>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold text-zinc-200 transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
                            data-cursor="pointer"
                          >
                            <GithubIcon size={15} />
                            <span>Source Code</span>
                          </a>
                        </MagneticButton>
                      )}
                    </div>
                  </div>

                  {/* Right Column: High-End Mockup Container with Zoom-on-Hover (5 cols) */}
                  <div className="lg:col-span-5">
                    <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#030712] p-1.5 shadow-2xl transition-all duration-500 group-hover:border-cyan-500/40 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                      {/* Browser Window Header */}
                      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2.5 rounded-t-xl">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                        </div>
                        <div className="flex items-center gap-1.5 rounded-md border border-white/5 bg-black/40 px-3 py-0.5 text-[10px] font-mono text-zinc-500">
                          <span>https://{project.title.toLowerCase().split(" ")[0]}.app</span>
                        </div>
                        <div className="w-8" />
                      </div>

                      {/* Mockup Screen Viewport with smooth zoom-on-hover */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-b-xl bg-gradient-to-br from-zinc-900 to-[#030712] p-5 flex flex-col justify-between">
                        {/* Interactive UI wireframe / mockup visualization */}
                        <div className="space-y-3 transition-transform duration-700 ease-out group-hover:scale-105">
                          {/* Mock header bar */}
                          <div className="flex items-center justify-between border-b border-white/10 pb-3">
                            <div className="flex items-center gap-2">
                              <div className="h-6 w-6 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400" />
                              <div className="h-3 w-20 rounded bg-white/20" />
                            </div>
                            <div className="flex gap-1.5">
                              <div className="h-2.5 w-10 rounded bg-white/10" />
                              <div className="h-2.5 w-10 rounded bg-white/10" />
                            </div>
                          </div>

                          {/* Mock dashboard grid */}
                          <div className="grid grid-cols-3 gap-2 pt-1">
                            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
                              <div className="text-[9px] font-mono text-cyan-400">LATENCY</div>
                              <div className="text-sm font-bold text-white">42ms</div>
                            </div>
                            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
                              <div className="text-[9px] font-mono text-emerald-400">UPTIME</div>
                              <div className="text-sm font-bold text-white">99.9%</div>
                            </div>
                            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5">
                              <div className="text-[9px] font-mono text-indigo-400">SECURITY</div>
                              <div className="text-sm font-bold text-white">TLS/JWT</div>
                            </div>
                          </div>

                          {/* Mock content panel */}
                          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="h-3 w-28 rounded bg-white/20" />
                              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                            </div>
                            <div className="space-y-1.5">
                              <div className="h-2 w-full rounded bg-white/10" />
                              <div className="h-2 w-4/5 rounded bg-white/10" />
                              <div className="h-2 w-2/3 rounded bg-white/10" />
                            </div>
                          </div>
                        </div>

                        {/* Hover Overlay Vignette */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
