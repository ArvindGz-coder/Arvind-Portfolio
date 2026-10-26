import { motion } from "framer-motion";
import { Award, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";
import TiltCard from "./ui/TiltCard";

const certifications = [
  {
    title: "Google Cloud Foundations",
    issuer: "Google Cloud",
    year: "2026",
    link: "#",
    skills: ["Cloud Computing", "Infrastructure", "IAM & Security", "GCP Fundamentals"],
    glow: "border-cyan-500/30 text-cyan-400",
  },
  {
    title: "Full Stack Web Development Internship Credential",
    issuer: "Decodelabs",
    year: "2026",
    link: "#",
    skills: ["React & JavaScript", "RESTful APIs", "Full Stack Lifecycle", "Agile Sprints"],
    glow: "border-indigo-500/30 text-indigo-400",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="relative px-6 py-20 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs font-mono text-cyan-400">
            <Sparkles size={13} />
            <span>CREDENTIALS & HONORS</span>
          </div>

          <h2 className="mt-4 font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Industry credentials & certifications.
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {certifications.map((certificate, index) => (
            <motion.div
              key={certificate.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TiltCard className="rounded-3xl border border-white/10 bg-white/[0.025] p-7 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/[0.04]">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.05]">
                    <Award size={22} className={certificate.glow} />
                  </div>

                  <span className="font-mono text-xs text-zinc-500">
                    {certificate.year}
                  </span>
                </div>

                <h3 className="mt-6 font-heading text-xl font-bold text-white">
                  {certificate.title}
                </h3>

                <p className="mt-1 text-sm text-cyan-300 font-medium">
                  {certificate.issuer}
                </p>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                  {certificate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-white/10 bg-black/40 px-2.5 py-1 text-xs font-mono text-zinc-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}