import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-black/50 px-5 py-3 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="text-lg font-bold tracking-tight"
            onClick={() => setIsOpen(false)}
          >
            ARVIND<span className="text-white/40">.</span>
          </a>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm text-white/60 transition hover:text-white"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop contact button */}
          <a
            href="#contact"
            className="hidden rounded-full border border-white/15 bg-white px-4 py-2 text-sm font-medium !text-black transition hover:bg-white/90 md:block"
          >
            Let's Talk
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-white md:hidden"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden md:hidden"
            >
              <div className="flex flex-col gap-4 border-t border-white/10 pt-5 mt-4 pb-2">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-sm text-white/60 transition hover:text-white"
                  >
                    {item.name}
                  </a>
                ))}

                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl bg-white px-4 py-3 text-center text-sm font-medium text-black"
                >
                  Let's Talk
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

export default Navbar;
