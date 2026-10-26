import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
const experiences = [
  {
    year: "2026",
    type: "Internship",
    title: "Full Stack Web Development Intern",
    organization: "Decodelabs",
    description:
      "Worked on web development projects while gaining practical experience with frontend and backend technologies.",
    icon: Briefcase,
  },
  {
    year: "2024-present",
    type: "Education",
    title: "B.Tech - Computer Science and Engineering",
    organization: "JECRC University",
    description:
      "Computer Science and Engineering student specializing in Full Stack Web Development.",
    icon: GraduationCap,
  },
];

function Experience() {
  return (
    <section id="experience" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-white/30">
            Experience
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            My journey.
          </h2>
        </motion.div>

        <div className="relative mt-14">
          {/* Timeline */}
          <div className="absolute left-[19px] top-0 h-full w-px bg-white/10" />
          <div className="space-y-10">
            {experiences.map((experience, index) => {
              const Icon = experience.icon;

              return (
                <motion.div
                  key={`${experience.title}-${experience.organization}`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="relative pl-14"
                >
                  {/* Timeline icon */}
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#050505]">
                    <Icon size={17} className="text-white/60" />
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition hover:bg-white/[0.05]">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-sm text-white/30">
                        {experience.year}
                      </span>

                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/40">
                        {experience.type}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-semibold">
                      {experience.title}
                    </h3>

                    <p className="mt-1 text-sm text-white/50">
                      {experience.organization}
                    </p>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-white/40">
                      {experience.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;