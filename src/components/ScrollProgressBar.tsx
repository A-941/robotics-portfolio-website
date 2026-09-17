"use client";

import { useScroll, useSpring, motion } from "motion/react";

export const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[100] h-[1px] origin-left"
      style={{
        scaleX,
        backgroundColor: "#e8ff00",
      }}
    />
  );
};
