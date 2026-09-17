"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useState } from "react";

export const LoadingScreen = () => {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Count 0 → 100 over 1.1s
    let start = 0;
    const duration = 1100;
    const step = 16; // ~60fps
    const increment = 100 / (duration / step);

    const interval = setInterval(() => {
      start += increment;
      if (start >= 100) {
        setCount(100);
        clearInterval(interval);
        setTimeout(() => setVisible(false), 220);
      } else {
        setCount(Math.floor(start));
      }
    }, step);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-end justify-end p-8 sm:p-12"
          style={{ backgroundColor: "#080808" }}
          aria-hidden="true"
        >
          {/* Counter */}
          <div className="flex items-baseline gap-4">
            <span
              className="text-[clamp(4rem,14vw,12rem)] font-bold leading-none tracking-tight tabular-nums"
              style={{ color: "#f0f0f0", fontFamily: "var(--font-space-mono)" }}
            >
              {String(count).padStart(3, "0")}
            </span>
            <span
              className="text-sm mb-2"
              style={{ color: "#444", fontFamily: "var(--font-space-mono)" }}
            >
              %
            </span>
          </div>

          {/* Label */}
          <p
            className="label mb-1"
            style={{ color: "#444" }}
          >
            Initialising
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
