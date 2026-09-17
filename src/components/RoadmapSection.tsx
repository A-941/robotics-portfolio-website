"use client";

import React from "react";
import { motion } from "motion/react";
import { roadmapMilestones } from "@/data/projectsData";

const STATUS_COLOR: Record<string, string> = {
  completed: "#4ade80",
  "in-progress": "#e8ff00",
  upcoming: "#333",
};

const STATUS_LABEL: Record<string, string> = {
  completed: "Completed",
  "in-progress": "In Progress",
  upcoming: "Upcoming",
};

export const RoadmapSection = () => {
  return (
    <section
      id="roadmap"
      className="relative py-24 sm:py-32"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="px-6 sm:px-10 lg:px-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16 sm:mb-20"
        >
          <p className="label mb-4" style={{ color: "var(--text-subtle)" }}>
            Curriculum Sequence
          </p>
          <h2
            className="display-md max-w-lg"
            style={{ color: "var(--text-primary)" }}
          >
            Robotics & Embedded
            <br />
            AI Roadmap
          </h2>
        </motion.div>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute top-0 bottom-0 w-px hidden md:block"
            style={{
              left: "calc(25% - 0.5px)",
              backgroundColor: "var(--border)",
            }}
            aria-hidden="true"
          />

          <div className="space-y-0">
            {roadmapMilestones.map((phase, idx) => {
              const status = phase.status ?? "upcoming";
              const accentColor = STATUS_COLOR[status] ?? "#333";

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
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 py-10 gap-6 md:gap-0">
                    {/* Phase label + status */}
                    <div className="md:col-span-3 flex items-start gap-4 relative">
                      {/* Timeline dot */}
                      <div
                        className="absolute w-3 h-3 rounded-full border-2 hidden md:block"
                        style={{
                          backgroundColor: accentColor === "#333" ? "var(--bg)" : accentColor,
                          borderColor: accentColor,
                          right: "-6px",
                          top: "6px",
                        }}
                        aria-hidden="true"
                      />

                      <div className="flex flex-col gap-2">
                        <span
                          className="label"
                          style={{ color: "var(--text-subtle)" }}
                        >
                          Phase {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: accentColor }}
                          />
                          <span
                            className="label"
                            style={{ color: accentColor }}
                          >
                            {STATUS_LABEL[status]}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-9 md:pl-14">
                      <h3
                        className="text-lg font-semibold mb-5"
                        style={{
                          color:
                            status === "upcoming"
                              ? "var(--text-subtle)"
                              : "var(--text-primary)",
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
                                    status === "completed" ? "#4ade80" :
                                    status === "in-progress" ? "#e8ff00" : "#333",
                                }}
                              />
                              <span
                                className="text-sm font-medium"
                                style={{
                                  color:
                                    status === "upcoming"
                                      ? "var(--text-subtle)"
                                      : "var(--text-primary)",
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
