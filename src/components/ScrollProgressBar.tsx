"use client";

import { useScroll, useSpring, motion } from "motion/react";

export const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(to right, #06b6d4, #6366f1, #8b5cf6)",
        boxShadow: "0 0 8px rgba(6,182,212,0.7)",
      }}
    />
  );
};
