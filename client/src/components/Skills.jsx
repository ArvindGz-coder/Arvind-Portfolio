import { motion } from "framer-motion";
import { Code2, Database, GitBranch, Server } from "lucide-react";
const categories = [
  {
    title: "Frontend",
    icon: Code2,
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React",
      "Tailwind CSS",
      "React Router",
    ],
  },
  {
    title: "Backend",
    icon: Server,
    technologies: ["Node.js", "Express.js", "REST APIs", "Mongoose"],
  },
  {
    title: "Database",
    icon: Database,
    technologies: ["MongoDB", "MongoDB Atlas", "MySQL"],
  },
  {
    title: "Tools & Languages",
    icon: GitBranch,
    technologies: ["Git", "GitHub", "VS Code", "Python", "C", "C++"],
  },
];

function Skills() {
  return (
    <section id="skills" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-white/30">
            Skills
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            My technical toolkit.
          </h2>

          <p className="mt-5 max-w-2xl text-white/40">
            Technologies I use to design, build and deploy modern web
            applications.
          </p>
        </motion.div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.05]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Icon size={20} className="text-white/70" />
                  </div>

                  <h3 className="text-lg font-semibold">{category.title}</h3>
                </div>

                <div className="mt-7 flex flex-wrap gap-2">
                  {category.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/50 transition group-hover:text-white/70"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Skills;