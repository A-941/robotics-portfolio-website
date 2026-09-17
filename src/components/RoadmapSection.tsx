"use client";

import React from "react";
import { motion } from "motion/react";
import { CheckCircle2, Clock, Compass } from "lucide-react";
import { roadmapMilestones } from "@/data/projectsData";

export const RoadmapSection = () => {
  return (
    <section id="roadmap" className="py-20 sm:py-28 border-t border-zinc-800/80 bg-zinc-950/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 mb-4 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            Curriculum Sequence
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Robotics & Embedded AI Roadmap
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            A structured, step-by-step engineering progression from fundamental digital electronics to autonomous robotic agents.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmapMilestones.map((phase, idx) => {
            const isCompleted = phase.status === "completed";
            const isInProgress = phase.status === "in-progress";

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -4 }}
                className={`relative rounded-2xl border p-6 flex flex-col transition-all duration-300 ${
                  isCompleted
                    ? "border-emerald-500/40 bg-emerald-950/15 shadow-lg shadow-emerald-500/5"
                    : isInProgress
                    ? "border-cyan-500/50 bg-cyan-950/20 shadow-xl shadow-cyan-500/10"
                    : "border-zinc-800 bg-zinc-900/30 opacity-80 hover:opacity-100 hover:border-zinc-700"
                }`}
              >
                {/* Header with status badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                    Phase 0{idx + 1}
                  </span>
                  {isCompleted && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" />
                      Completed
                    </span>
                  )}
                  {isInProgress && (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-cyan-300 bg-cyan-500/15 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                      In Progress
                    </span>
                  )}
                  {!isCompleted && !isInProgress && (
                    <span className="inline-flex items-center text-[11px] font-medium text-zinc-400 bg-zinc-800/80 px-2.5 py-0.5 rounded-full border border-zinc-700/50">
                      Upcoming
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-zinc-100 mb-4 pb-3 border-b border-zinc-800/80">
                  {phase.phase}
                </h3>

                {/* Sub-projects */}
                <ul className="space-y-3.5 flex-grow">
                  {phase.projects.map((proj, pIdx) => (
                    <li key={pIdx} className="space-y-1">
                      <div className="text-xs sm:text-sm font-semibold text-zinc-200 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"></span>
                        {proj.title}
                      </div>
                      <p className="text-[11px] text-zinc-400 pl-3 leading-relaxed">
                        {proj.desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
