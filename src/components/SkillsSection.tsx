"use client";

import React from "react";
import { motion } from "motion/react";
import { skillsList } from "@/data/projectsData";

export const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="relative py-24 sm:py-32"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="px-6 sm:px-10 lg:px-14">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16 sm:mb-20"
        >
          <div>
            <p className="label mb-4" style={{ color: "var(--accent)" }}>
              Curriculum
            </p>
            <h2
              className="display-md"
              style={{ color: "var(--text-primary)" }}
            >
              Core Competencies
            </h2>
          </div>
          <p
            className="text-sm max-w-xs leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Engineering foundations taught through hands-on breadboard builds
            and verified firmware.
          </p>
        </motion.div>

        {/* Skills as editorial list — each category is a row */}
        <div className="space-y-0">
          {skillsList.map((group, gIdx) => (
            <motion.div
              key={gIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: gIdx * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="border-b"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-0">
                {/* Category name */}
                <div className="md:col-span-3 flex items-start gap-4">
                  <span
                    className="label mt-0.5"
                    style={{ color: "var(--text-subtle)", minWidth: "2ch" }}
                  >
                    {String(gIdx + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {group.category}
                  </span>
                </div>

                {/* Skills tags */}
                <div className="md:col-span-9 flex flex-wrap gap-3">
                  {group.items.map((item, iIdx) => (
                    <motion.div
                      key={iIdx}
                      whileHover={{ borderColor: "#e8ff00" }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-3 border px-4 py-2.5"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <span
                        className="text-xs font-medium"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {item.name}
                      </span>
                      <span
                        className="label"
                        style={{ color: "var(--text-subtle)" }}
                      >
                        {item.level}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
