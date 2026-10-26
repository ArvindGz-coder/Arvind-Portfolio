import { motion } from "framer-motion";
import { 
    ArrowDown, 
    ArrowRight, 
    // GitHub, 
    // Linkedin, 
    Mail } from "lucide-react";

function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="max-w-4xl">
          {/* Availability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2"
          >
            <span className="h-2 w-2 rounded-full bg-green-400" />

            <span className="text-sm text-white/60">
              Available for opportunities
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl font-bold leading-[0.95] tracking-[-0.04em] sm:text-7xl md:text-8xl"
          >
            Hi, I'm
            <br />
            <span className="bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
              Arvind Gupta.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 max-w-2xl text-base leading-7 text-white/50 sm:text-lg"
          >
            Full Stack Web Developer focused on building modern, scalable and
            user-friendly web applications using React, Node.js, Express and
            MongoDB.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold !text-black transition hover:bg-white/90"
            >
              View My Work
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Contact Me
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-10 flex items-center gap-3"
          >
            <a
              href="#"
              aria-label="GitHub"
              className="rounded-full border border-white/10 p-3 text-white/50 transition hover:border-white/20 hover:text-white"
            >
              <span className="text-xs font-bold">GH</span>
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              className="rounded-full border border-white/10 p-3 text-white/50 transition hover:border-white/20 hover:text-white"
            >
              <span className="text-xs font-bold">in</span>
            </a>

            <a
              href="mailto:your-email@example.com"
              aria-label="Email"
              className="rounded-full border border-white/10 p-3 text-white/50 transition hover:border-white/20 hover:text-white"
            >
              <Mail size={18} />
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/30 sm:flex"
        >
          <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
          <ArrowDown size={16} />
        </motion.a>
      </div>
    </section>
  );
}

export default Hero;