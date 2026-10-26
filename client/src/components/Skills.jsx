import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Database,
  Cloud,
  Cpu,
  Layers,
  Sparkles,
  GitBranch,
  CheckCircle,
} from "lucide-react";
import TiltCard from "./ui/TiltCard";

const skillCategories = [
  {
    id: "frontend",
    title: "Frontend & Motion Engineering",
    category: "CLIENT ARCHITECTURE",
    description:
      "Crafting pixel-perfect, accessible, and high-performance interfaces with buttery 60fps micro-animations.",
    icon: Code2,
    badgeColor: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
    skills: [
      { name: "React 19", level: "Expert" },
      { name: "JavaScript (ESNext)", level: "Advanced" },
      { name: "Tailwind CSS v4", level: "Expert" },
      { name: "Framer Motion", level: "Advanced" },
      { name: "GSAP & ScrollTrigger", level: "Advanced" },
      { name: "Vite", level: "Expert" },
      { name: "Responsive UI/UX", level: "Expert" },
      { name: "HTML5 & Semantic Web", level: "Expert" },
      { name: "React Router", level: "Advanced" },
    ],
  },
  {
    id: "backend",
    title: "Backend & Distributed Systems",
    category: "SERVER ARCHITECTURE",
    description:
      "Building resilient RESTful APIs, scalable microservices, and secure authentication pipelines.",
    icon: Server,
    badgeColor: "border-indigo-500/40 bg-indigo-500/10 text-indigo-300",
    skills: [
      { name: "Node.js", level: "Advanced" },
      { name: "Express.js", level: "Advanced" },
      { name: "RESTful API Design", level: "Advanced" },
      { name: "JWT & Security Auth", level: "Advanced" },
      { name: "Middleware Pipelines", level: "Advanced" },
      { name: "Error Handling & Logging", level: "Advanced" },
      { name: "Async I/O Optimization", level: "Advanced" },
      { name: "Server Architecture", level: "Advanced" },
    ],
  },
  {
    id: "database",
    title: "Database Modeling & Storage",
    category: "DATA ARCHITECTURE",
    description:
      "Designing robust NoSQL and relational schemas with efficient indexing and aggregation pipelines.",
    icon: Database,
    badgeColor: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    skills: [
      { name: "MongoDB", level: "Advanced" },
      { name: "Mongoose ODM", level: "Advanced" },
      { name: "MongoDB Atlas", level: "Advanced" },
      { name: "MySQL", level: "Intermediate" },
      { name: "Schema Validation", level: "Advanced" },
      { name: "Aggregation Pipelines", level: "Advanced" },
      { name: "Data Modeling", level: "Advanced" },
    ],
  },
  {
    id: "devops",
    title: "DevOps, Cloud & Tooling",
    category: "INFRASTRUCTURE & WORKFLOW",
    description:
      "Automating deployment lifecycles, cloud deployments, version control, and API testing workflows.",
    icon: Cloud,
    badgeColor: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    skills: [
      { name: "Git & GitHub", level: "Advanced" },
      { name: "Google Cloud Platform", level: "Certified" },
      { name: "Postman API Testing", level: "Advanced" },
      { name: "VS Code & Debugging", level: "Advanced" },
      { name: "Vercel & Render Deployment", level: "Advanced" },
      { name: "Linux / CLI", level: "Intermediate" },
    ],
  },
  {
    id: "languages",
    title: "Programming Languages & Algorithms",
    category: "COMPUTATIONAL FOUNDATIONS",
    description:
      "Strong computer science foundations in data structures, algorithms, and multi-language development.",
    icon: Cpu,
    badgeColor: "border-purple-500/40 bg-purple-500/10 text-purple-300",
    skills: [
      { name: "JavaScript", level: "Core" },
      { name: "Python", level: "Academic" },
      { name: "C++", level: "DSA & OOP" },
      { name: "C Language", level: "Systems" },
      { name: "Data Structures", level: "Advanced" },
      { name: "Algorithm Design", level: "Advanced" },
    ],
  },
];

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredCategories =
    activeFilter === "all"
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === activeFilter);

  return (
    <section id="skills" className="relative px-6 py-28 sm:py-36 overflow-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none absolute right-1/4 top-1/3 -z-10 h-[500px] w-[500px] bg-cyan-500/5 blur-[150px]" />

      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs font-mono text-cyan-400">
              <Sparkles size={13} />
              <span>02 // TECHNICAL TOOLKIT</span>
            </div>

            <h2 className="mt-4 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white">
              Engineered for speed, <br />
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-white bg-clip-text text-transparent">
                scale & reliability.
              </span>
            </h2>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Skills" },
              { id: "frontend", label: "Frontend" },
              { id: "backend", label: "Backend" },
              { id: "database", label: "Database" },
              { id: "devops", label: "DevOps & Cloud" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 ${
                  activeFilter === tab.id
                    ? "bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                    : "border border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                }`}
                data-cursor="pointer"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Bento Grid of Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCategories.map((category, index) => {
            const Icon = category.icon;
            const isWide = index === 0 && activeFilter === "all";

            return (
              <TiltCard
                key={category.id}
                className={`rounded-3xl border border-white/10 bg-white/[0.025] p-7 backdrop-blur-xl hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between ${
                  isWide ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.05] text-white shadow-lg">
                        <Icon size={20} className="text-cyan-400" />
                      </div>
                      <div>
                        <span className="font-mono text-[10px] tracking-wider text-zinc-300">
                          {category.category}
                        </span>
                        <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
                          {category.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-white/10 pt-5">
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="group flex items-center gap-1.5 rounded-xl border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-zinc-200 transition-all duration-200 hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-white"
                        data-cursor="pointer"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/60 group-hover:bg-cyan-400" />
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-[10px] text-zinc-300 font-mono">
                          ({skill.level})
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}