"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const STAGES = [
  { label: "SYSTEM_INIT", detail: "Booting lab environment..." },
  { label: "LOADING_MODULES", detail: "Compiling circuit data..." },
  { label: "CALIBRATING", detail: "Aligning signal paths..." },
  { label: "READY", detail: null },
];

export const LoadingScreen = () => {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);
  const [stageIdx, setStageIdx] = useState(0);

  useEffect(() => {
    const duration = 1300;
    const step = 16;
    const increment = 100 / (duration / step);
    let start = 0;

    const interval = setInterval(() => {
      start += increment;
      if (start >= 100) {
        setCount(100);
        setStageIdx(3);
        clearInterval(interval);
        setTimeout(() => setVisible(false), 350);
      } else {
        setCount(Math.floor(start));
        setStageIdx(
          start < 30 ? 0 : start < 60 ? 1 : start < 85 ? 2 : 3
        );
      }
    }, step);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col overflow-hidden"
          style={{ backgroundColor: "#06040d" }}
          aria-hidden="true"
        >
          {/* Grid background */}
          <div className="absolute inset-0 tech-grid opacity-60" />

          {/* Purple glow center */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 50% 60%, rgba(168,85,247,0.12) 0%, transparent 70%)",
              animation: "glow-breathe 2s ease-in-out infinite",
            }}
          />

          {/* Top-left system label */}
          <div className="absolute top-6 left-8 flex flex-col gap-1">
            <span
              className="label"
              style={{ color: "rgba(168,85,247,0.6)", fontSize: "0.6rem" }}
            >
              ROBOTICS_LAB // v2.0
            </span>
            <span
              className="label"
              style={{ color: "rgba(168,85,247,0.25)", fontSize: "0.55rem" }}
            >
              ECE_PLATFORM
            </span>
          </div>

          {/* Top-right coords */}
          <div className="absolute top-6 right-8">
            <span
              className="label"
              style={{ color: "rgba(168,85,247,0.3)", fontSize: "0.55rem" }}
            >
              NODE_STATUS: ACTIVE
            </span>
          </div>

          {/* Main content — bottom */}
          <div className="absolute bottom-10 left-8 right-8 sm:left-12 sm:right-12">
            {/* Current stage */}
            <motion.div
              key={stageIdx}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <span
                className="label"
                style={{ color: "rgba(168,85,247,0.55)", fontSize: "0.65rem" }}
              >
                {STAGES[stageIdx].label}
              </span>
              {STAGES[stageIdx].detail && (
                <p
                  className="mt-1 label"
                  style={{ color: "rgba(168,85,247,0.25)", letterSpacing: "0.08em" }}
                >
                  {STAGES[stageIdx].detail}
                </p>
              )}
            </motion.div>

            {/* Counter */}
            <div className="flex items-end gap-3 mb-5">
              <span
                className="font-bold leading-none tabular-nums"
                style={{
                  fontSize: "clamp(4rem, 14vw, 10rem)",
                  color: count === 100 ? "#c084fc" : "#f0ebff",
                  fontFamily: "var(--font-space-mono)",
                  letterSpacing: "-0.04em",
                  transition: "color 0.3s",
                  textShadow: count === 100 ? "0 0 40px rgba(168,85,247,0.5)" : "none",
                }}
              >
                {String(count).padStart(3, "0")}
              </span>
              <span
                className="mb-3 label"
                style={{ color: "rgba(168,85,247,0.4)" }}
              >
                %
              </span>
            </div>

            {/* Progress bar */}
            <div
              className="h-px w-full overflow-hidden"
              style={{ backgroundColor: "rgba(168,85,247,0.1)" }}
            >
              <motion.div
                initial={{ scaleX: 0, transformOrigin: "left" }}
                animate={{ scaleX: count / 100 }}
                transition={{ ease: "linear" }}
                className="h-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(168,85,247,0.4) 0%, rgba(168,85,247,0.9) 50%, rgba(192,132,252,1) 100%)",
                  boxShadow: "0 0 12px rgba(168,85,247,0.6)",
                }}
              />
            </div>

            {/* Segment dots */}
            <div className="flex gap-1.5 mt-3">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-0.5 transition-colors duration-300"
                  style={{
                    backgroundColor:
                      (i + 1) * 5 <= count
                        ? "rgba(168,85,247,0.7)"
                        : "rgba(168,85,247,0.08)",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
