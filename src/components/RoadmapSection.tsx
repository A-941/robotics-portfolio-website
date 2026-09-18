"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { roadmapMilestones } from "@/data/projectsData";
import { GlowBackground } from "@/components/GlowBackground";

const STATUS_DOT: Record<string, { color: string; glow: string; label: string }> = {
  completed: {
    color: "#a855f7",
    glow: "0 0 12px rgba(168,85,247,0.8), 0 0 24px rgba(168,85,247,0.3)",
    label: "COMPLETE",
  },
  "in-progress": {
    color: "#60a5fa",
    glow: "0 0 12px rgba(96,165,250,0.7), 0 0 24px rgba(96,165,250,0.2)",
    label: "IN_PROGRESS",
  },
  upcoming: {
    color: "rgba(168,85,247,0.15)",
    glow: "none",
    label: "UPCOMING",
  },
};

export const RoadmapSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Scroll-drawn purple timeline line
  const lineScaleY = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);

  return (
    <section
      id="roadmap"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ borderTop: "1px solid rgba(168,85,247,0.08)" }}
    >
      <GlowBackground variant="dark" />

      <div className="px-6 sm:px-10 lg:px-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16 sm:mb-20"
        >
          <p className="label mb-4" style={{ color: "rgba(168,85,247,0.35)" }}>
            CURRICULUM_SEQUENCE
          </p>
          <h2 className="display-md max-w-lg" style={{ color: "var(--text-primary)" }}>
            Robotics &amp; Embedded
            <br />
            <span className="gradient-text">AI Roadmap</span>
          </h2>
        </motion.div>

        {/* Timeline container */}
        <div className="relative">
          {/* Scroll-driven timeline line (desktop) */}
          <div
            className="absolute top-0 bottom-0 hidden md:block overflow-hidden"
            style={{
              left: "calc(25% - 0.5px)",
              width: "1px",
              backgroundColor: "rgba(168,85,247,0.05)",
            }}
          >
            <motion.div
              className="absolute top-0 left-0 right-0"
              style={{
                scaleY: lineScaleY,
                transformOrigin: "top",
                height: "100%",
                background: "linear-gradient(to bottom, rgba(168,85,247,0.6), rgba(168,85,247,0.2))",
                boxShadow: "0 0 8px rgba(168,85,247,0.4)",
              }}
            />
          </div>

          <div className="space-y-0">
            {roadmapMilestones.map((phase, idx) => {
              const status = phase.status ?? "upcoming";
              const dot = STATUS_DOT[status] ?? STATUS_DOT.upcoming;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.65,
                    delay: idx * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="relative border-b"
                  style={{ borderColor: "rgba(168,85,247,0.06)" }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 py-10 gap-6 md:gap-0">
                    {/* Phase label + status */}
                    <div className="md:col-span-3 flex items-start gap-4 relative">
                      {/* Timeline dot — on the line */}
                      <div
                        className="absolute hidden md:block w-3 h-3 rounded-full border-2"
                        style={{
                          backgroundColor: status === "upcoming" ? "var(--bg)" : dot.color,
                          borderColor: dot.color,
                          boxShadow: dot.glow,
                          right: "-6px",
                          top: "8px",
                          transition: "box-shadow 0.4s",
                          animation: status === "in-progress" ? "node-pulse 2s infinite" : "none",
                        }}
                        aria-hidden="true"
                      />

                      <div className="flex flex-col gap-2">
                        <span className="label" style={{ color: "var(--text-subtle)" }}>
                          Phase {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              backgroundColor: dot.color,
                              boxShadow: dot.glow !== "none" ? dot.glow : undefined,
                            }}
                          />
                          <span
                            className="label"
                            style={{ color: dot.color, fontSize: "0.58rem" }}
                          >
                            {dot.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-9 md:pl-14">
                      <h3
                        className="text-lg font-semibold mb-5"
                        style={{
                          color: status === "upcoming" ? "var(--text-subtle)" : "var(--text-primary)",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {phase.phase}
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                        {phase.projects.map((proj, pIdx) => (
                          <div key={pIdx} className="flex flex-col gap-1">
                            <div className="flex items-center gap-2.5">
                              <div
                                className="w-1 h-1 rounded-full shrink-0"
                                style={{
                                  backgroundColor:
                                    status === "completed" ? "#a855f7" :
                                    status === "in-progress" ? "#60a5fa" :
                                    "rgba(168,85,247,0.12)",
                                }}
                              />
                              <span
                                className="text-sm font-medium"
                                style={{
                                  color: status === "upcoming" ? "var(--text-subtle)" : "var(--text-primary)",
                                }}
                              >
                                {proj.title}
                              </span>
                            </div>
                            <p
                              className="text-xs leading-relaxed pl-[14px]"
                              style={{ color: "var(--text-subtle)" }}
                            >
                              {proj.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
