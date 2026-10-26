import {motion} from "framer-motion";
import {Code2, GraduationCap, Rocket} from "lucide-react";
const stats = [
    {
        number:"10+",
        label:"Projects",
    },
    {
        number:"5+",
        label:"Technologies",
    },
    {
        number:"1+",
        label:"Internship",
    },
];
const highlights = [
    {
        icon: Code2,
        title: "Full Stack Development",
        description: "Building responsive interfaces and reliable backend systems.",
    },
    {
        icon: Rocket,
        title: "Problem Solving",
        description: "Turning ideas and real-world problems into useful applications.",
    },
    {
        icon: GraduationCap,
        title: "Continuous Learning",
        description: "Constantly improving my skills through projects and new technologies.",
    },
];
function About(){
    return(
        <section id="about" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-white/30">
            About Me
          </p>

          <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            I enjoy turning ideas into{" "}
            <span className="text-white/40">real products.</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* About text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-9"
          >
            <p className="text-lg leading-8 text-white/60">
              I'm a Computer Science student specializing in Full Stack
              Web Development. I enjoy creating web applications that
              combine clean interfaces with reliable backend systems.
            </p>

            <p className="mt-6 text-base leading-7 text-white/40">
              My current focus is on React, JavaScript, Node.js,
              Express, MongoDB and modern web development practices.
              I enjoy learning by building projects and solving
              practical problems.
            </p>

            <div className="mt-9 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold sm:text-3xl">
                    {stat.number}
                  </p>

                  <p className="mt-1 text-xs text-white/40 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Highlights */}
          <div className="space-y-4">
            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:bg-white/[0.05]"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Icon size={20} className="text-white/70" />
                  </div>

                  <h3 className="font-semibold">{item.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-white/40">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
    );
}
export default About;