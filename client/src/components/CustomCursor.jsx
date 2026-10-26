import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Smooth springs for lagging outer ring
  const mouseX = useSpring(0, { stiffness: 450, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 450, damping: 28 });

  // Direct dot position
  const [dotPos, setDotPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    // Check if touch device
    if (
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window)
    ) {
      setIsTouchDevice(true);
      return;
    }

    document.body.classList.add("has-custom-cursor");

    const onMouseMove = (e) => {
      setDotPos({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if target is interactive
      const target = e.target;
      const isInteractive = Boolean(
        target.closest("a, button, input, textarea, select, [role='button'], [data-cursor='pointer'], [data-magnetic]")
      );
      setIsHovered(isInteractive);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Outer Glowing Fluid Aura Ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          width: isHovered ? 56 : isClicking ? 28 : 36,
          height: isHovered ? 56 : isClicking ? 28 : 36,
          borderColor: isHovered
            ? "rgba(6, 182, 212, 0.75)"
            : "rgba(99, 102, 241, 0.45)",
          backgroundColor: isHovered
            ? "rgba(6, 182, 212, 0.12)"
            : "rgba(99, 102, 241, 0.04)",
          boxShadow: isHovered
            ? "0 0 25px rgba(6, 182, 212, 0.4)"
            : "0 0 15px rgba(99, 102, 241, 0.2)",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
      />

      {/* Inner Pinpoint Glowing Core Dot */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4]"
        style={{
          transform: `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%)`,
          transition: "transform 0.05s ease-out, opacity 0.2s ease",
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
