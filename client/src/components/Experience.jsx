import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Award,
  Sparkles,
  CheckCircle2,
  Calendar,
  Building2,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltCard from "./ui/TiltCard";

gsap.registerPlugin(ScrollTrigger);

const timelineItems = [
  {
    period: "2026 — Present",
    type: "INDUSTRY EXPERIENCE",
    role: "Full Stack Web Development Intern",
    organization: "Decodelabs",
    badgeColor: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
    icon: Briefcase,
    description:
      "Contributed to core production web applications, collaborating on responsive frontend components, backend RESTful API integration, and performance optimization.",
    achievements: [
      "Built performant UI components using React and modern CSS systems",
      "Integrated secure REST API endpoints with robust error handling",
      "Collaborated in agile sprint cycles using Git and code review workflows",
    ],
  },
  {
    period: "2024 — Present",
    type: "HIGHER EDUCATION",
    role: "B.Tech in Computer Science & Engineering",
    organization: "JECRC University",
    badgeColor: "border-indigo-500/40 bg-indigo-500/10 text-indigo-300",
    icon: GraduationCap,
    description:
      "Undergraduate engineering program with a dedicated focus on software engineering, algorithms, system architecture, and modern full-stack web technologies.",
    achievements: [
      "Rigorous coursework in Data Structures, Algorithms, DBMS, and OS",
      "Developed multiple end-to-end full stack web platforms",
      "Active participant in technical hackathons and competitive problem solving",
    ],
  },
  {
    period: "2026",
    type: "CERTIFICATION",
    role: "Google Cloud Foundations Certified",
    organization: "Google Cloud Platform",
    badgeColor: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    icon: Award,
    description:
      "Demonstrated understanding of cloud infrastructure, IAM security, container orchestration, scalable storage, and networking on Google Cloud.",
    achievements: [
      "Cloud architecture principles, compute engines & serverless execution",
      "Data storage solutions, IAM role-based access control, and monitoring",
      "Practical deployment strategies and cloud cost optimization",
    ],
  },
];

export default function Experience() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 70%",
            scrub: 0.8,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative px-6 py-28 sm:py-36 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute right-1/3 top-1/2 -z-10 h-[500px] w-[500px] bg-indigo-500/5 blur-[160px]" />

      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs font-mono text-cyan-400">
            <Sparkles size={13} />
            <span>04 // CAREER & ACADEMIC TIMELINE</span>
          </div>

          <h2 className="mt-4 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white">
            Milestones & <br />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-white bg-clip-text text-transparent">
              engineering journey.
            </span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-base text-zinc-400">
            A chronological timeline of hands-on experience, university academics,
            and professional cloud credentials.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Background Track Line */}
          <div className="absolute left-4 sm:left-8 top-3 bottom-3 w-[2px] bg-white/10" />

          {/* GSAP Scroll-Triggered Drawing Gradient Line */}
          <div
            ref={lineRef}
            className="absolute left-4 sm:left-8 top-3 bottom-3 w-[2px] bg-gradient-to-b from-cyan-400 via-indigo-500 to-purple-500 origin-top shadow-[0_0_15px_#06b6d4]"
          />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {timelineItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.role}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative pl-12 sm:pl-20"
                >
                  {/* Glowing Node Icon on Track */}
                  <div className="absolute left-1.5 sm:left-5 top-1.5 flex h-7 w-7 sm:h-8 sm:w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-cyan-400 bg-[#030712] shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                    <Icon size={14} className="text-cyan-300" />
                  </div>

                  {/* Timeline Card */}
                  <TiltCard
                    maxTilt={4}
                    className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className={`rounded-full border px-3 py-1 font-mono text-[10px] tracking-wider ${item.badgeColor}`}>
                        {item.type}
                      </span>

                      <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                        <Calendar size={13} className="text-zinc-500" />
                        <span>{item.period}</span>
                      </div>
                    </div>

                    <h3 className="mt-4 font-heading text-xl sm:text-2xl font-bold text-white">
                      {item.role}
                    </h3>

                    <div className="mt-1 flex items-center gap-2 text-sm text-cyan-300 font-medium">
                      <Building2 size={15} />
                      <span>{item.organization}</span>
                    </div>

                    <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Achievements List */}
                    <div className="mt-5 space-y-2 border-t border-white/10 pt-4">
                      {item.achievements.map((point) => (
                        <div key={point} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-400">
                          <CheckCircle2 size={15} className="text-emerald-400 mt-0.5 shrink-0" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}