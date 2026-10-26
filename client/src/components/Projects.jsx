import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const projects = [
  {
    number: "01",
    title: "CareerGenie",
    description:
      "An AI-powered career platform designed to help students manage their resumes, job applications, career profiles and interview preparation.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Gemini AI"],
    githubLink: "#",
    demo: "#",
    featured: true,
  },
  {
    number: "02",
    title: "Student Career OS",
    description:
      "A centralized career management platform for students to manage internships, job applications, resumes, projects and certifications.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    github: "#",
    demo: "#",
    featured: false,
  },
  {
    number: "03",
    title: "Password Strength Checker",
    description:
      "A web application that evaluates password strength and provides useful feedback to help users create stronger passwords.",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "#",
    demo: "#",
    featured: false,
  },
  {
    number: "04",
    title: "Calculator",
    description:
      "A clean and responsive calculator application with an intuitive interface and standard arithmetic operations.",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "#",
    demo: "#",
    featured: false,
  },
];

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects");

        setProjects(response.data.data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setError("Unable to load projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
  return (
    <section id="projects" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-white/30">
            Projects
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Selected work.
          </h2>

          <p className="mt-5 max-w-2xl text-white/40">
            A selection of applications I've built while learning and working
            with modern web technologies.
          </p>
        </motion.div>

        {/* Projects */}
        <div className="mt-14 space-y-5">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
              }}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:border-white/20 hover:bg-white/[0.05] sm:p-9 ${
                project.featured ? "lg:p-10" : ""
              }`}
            >
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                {/* Project info */}
                <div className="max-w-3xl">
                  <div className="flex items-center gap-4">
                    <span className="text-xs tracking-[0.2em] text-white/25">
                      {project.number}
                    </span>

                    {project.featured && (
                      <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/50">
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
                    {project.title}
                  </h3>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-white/40 sm:text-base">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/50"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex shrink-0 items-center gap-3">
                  <a
                    href={project.github}
                    aria-label={`${project.title} GitHub`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-white/60 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                  >
                    <span className="text-xs font-bold">GH</span>
                  </a>

                  <a
                    href={project.demo}
                    aria-label={`${project.title} live demo`}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium !text-black transition hover:bg-white/90"
                  >
                    Live Demo
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>

              {/* Hover decoration */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/[0.03] blur-3xl transition duration-500 group-hover:bg-white/[0.07]" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
