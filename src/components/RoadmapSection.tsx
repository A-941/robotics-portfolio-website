import React from "react";
import { CheckCircle2, Clock, Sparkles, ArrowRight } from "lucide-react";
import { roadmapMilestones } from "@/data/projectsData";

export const RoadmapSection = () => {
  return (
    <section id="roadmap" className="py-16 sm:py-24 border-t border-zinc-800/80 bg-zinc-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-14">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            The Long-Term Trajectory
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Robotics & Embedded AI Roadmap
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-2xl">
            This portfolio is an active, continuously expanding chronicle. Here is the step-by-step roadmap from basic digital electronics to autonomous AI rovers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmapMilestones.map((phase, idx) => {
            const isCompleted = phase.status === "completed";
            const isInProgress = phase.status === "in-progress";

            return (
              <div
                key={idx}
                className={`relative rounded-2xl border p-6 flex flex-col transition-all duration-300 ${
                  isCompleted
                    ? "border-emerald-500/40 bg-emerald-950/10 shadow-lg shadow-emerald-500/5"
                    : isInProgress
                    ? "border-cyan-500/50 bg-cyan-950/15 shadow-xl shadow-cyan-500/10"
                    : "border-zinc-800 bg-zinc-900/30 opacity-80 hover:opacity-100"
                }`}
              >
                {/* Header with status badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                    Step 0{idx + 1}
                  </span>
                  {isCompleted && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" />
                      Completed
                    </span>
                  )}
                  {isInProgress && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/30">
                      <Clock className="w-3 h-3 animate-spin" />
                      In Progress
                    </span>
                  )}
                  {!isCompleted && !isInProgress && (
                    <span className="inline-flex items-center text-[11px] font-medium text-zinc-500 bg-zinc-800/60 px-2 py-0.5 rounded-full">
                      Upcoming
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-zinc-100 mb-4 pb-2 border-b border-zinc-800/80">
                  {phase.phase}
                </h3>

                {/* Sub-projects */}
                <ul className="space-y-3 flex-grow">
                  {phase.projects.map((proj, pIdx) => (
                    <li key={pIdx} className="space-y-0.5">
                      <div className="text-xs sm:text-sm font-semibold text-zinc-200 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                        {proj.title}
                      </div>
                      <p className="text-[11px] text-zinc-400 pl-3 leading-relaxed">
                        {proj.desc}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
