import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Sparkles, Cpu, CheckCircle2 } from "lucide-react";

const steps = [
  { threshold: 20, text: "INITIALIZING PORTFOLIO ENGINE..." },
  { threshold: 45, text: "HYDRATING REACT & FULL STACK ARCHITECTURE..." },
  { threshold: 75, text: "SYNCHRONIZING GSAP MOTION PIPELINES..." },
  { threshold: 95, text: "PRE-RENDERING PRODUCTION EXPERIENCES..." },
  { threshold: 100, text: "SYSTEMS ONLINE. WELCOME." },
];

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentStepText, setCurrentStepText] = useState(steps[0].text);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Smooth progress increment
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(() => onComplete?.(), 800);
          }, 300);
          return 100;
        }

        // Variable speed for high-tech realistic feel
        const diff = Math.floor(Math.random() * 8) + 3;
        const next = Math.min(prev + diff, 100);

        // Update step text
        const matched = steps.find((s) => next <= s.threshold) || steps[steps.length - 1];
        setCurrentStepText(matched.text);

        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.85, ease: [0.77, 0, 0.175, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#030712] text-white overflow-hidden select-none"
        >
          {/* Subtle Ambient Grid Background */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Glowing Radial Core */}
          <div className="pointer-events-none absolute h-[400px] w-[400px] rounded-full bg-gradient-to-r from-indigo-600/20 via-cyan-500/20 to-purple-600/20 blur-[120px]" />

          <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center">
            {/* Glowing Logo Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative mb-8"
            >
              <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-cyan-400 p-[2px] shadow-[0_0_40px_rgba(99,102,241,0.5)]">
                <div className="flex h-full w-full items-center justify-center rounded-[22px] bg-[#030712]">
                  <span className="font-heading text-2xl font-black tracking-wider text-white">
                    AG
                  </span>
                </div>
              </div>

              {/* Pulsing Aura Rings */}
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 -z-10 rounded-3xl bg-cyan-400/20 blur-xl"
              />
            </motion.div>

            {/* Name & Title */}
            <h1 className="font-heading text-lg font-bold tracking-tight text-white">
              Arvind Gupta
            </h1>
            <p className="text-xs font-mono tracking-widest text-zinc-400 uppercase mt-0.5">
              Full Stack Engineer & Software Architect
            </p>

            {/* Live Telemetry Progress Bar */}
            <div className="mt-8 w-full">
              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 shadow-[0_0_15px_#06b6d4]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Counter & Status Display */}
              <div className="mt-4 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5 text-cyan-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span className="text-[11px] text-zinc-300 truncate max-w-[220px] text-left">
                    {currentStepText}
                  </span>
                </div>

                <span className="font-bold text-white text-sm">
                  {progress}%
                </span>
              </div>
            </div>
          </div>

          {/* Bottom subtle watermark */}
          <div className="absolute bottom-6 font-mono text-[10px] tracking-[0.25em] text-zinc-600 uppercase">
            EST. 2026 // FAST & RESPONSIVE ARCHITECTURE
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
