"use client";

import React from "react";
import { motion } from "motion/react";
import { type MissionStage, STAGE_ORDER, STAGE_LABELS } from "@/hooks/useMissionState";

interface MissionHeaderProps {
  badge: string;
  title: string;
  type: string;
  difficulty: 1 | 2 | 3;
  estimatedMinutes: number;
  currentStage: MissionStage;
  progressPercent: number;
  stageIndex: number;
  totalStages: number;
  onReset: () => void;
}

const DIFFICULTY_LABEL = { 1: "Beginner", 2: "Intermediate", 3: "Advanced" };
const TYPE_COLOR: Record<string, string> = {
  BUILD: "var(--accent)",
  DEBUG: "#f97316",
  REVERSE: "#a78bfa",
  PREDICT: "#38bdf8",
  EXPLAIN: "#4ade80",
  PROVE: "#fb7185",
};

export const MissionHeader: React.FC<MissionHeaderProps> = ({
  badge,
  title,
  type,
  difficulty,
  estimatedMinutes,
  currentStage,
  progressPercent,
  stageIndex,
  totalStages,
  onReset,
}) => {
  return (
    <header
      className="border-b px-4 sm:px-6 lg:px-10 py-4"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
    >
      {/* Top row: badge + meta */}
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className="label px-2.5 py-1 border"
            style={{ color: TYPE_COLOR[type] || "var(--accent)", borderColor: TYPE_COLOR[type] || "var(--accent-border)" }}
          >
            {badge} — {type}
          </span>
          <span className="label" style={{ color: "var(--text-subtle)" }}>
            {DIFFICULTY_LABEL[difficulty]} · ~{estimatedMinutes} min
          </span>
        </div>
        <button
          onClick={onReset}
          className="label transition-colors"
          style={{ color: "var(--text-subtle)" }}
          title="Restart mission"
        >
          ↺ Restart
        </button>
      </div>

      {/* Mission title */}
      <h1
        className="text-lg sm:text-xl font-bold mb-4 tracking-tight"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h1>

      {/* Stage progress bar */}
      <div className="space-y-2">
        {/* Stage pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1">
          {STAGE_ORDER.map((s, i) => {
            const isPast = i < stageIndex;
            const isCurrent = s === currentStage;
            return (
              <div
                key={s}
                className="flex items-center gap-1 shrink-0"
              >
                <div
                  className="label px-2 py-1 text-[10px]"
                  style={{
                    color: isCurrent
                      ? "#000"
                      : isPast
                      ? "var(--text-secondary)"
                      : "var(--text-subtle)",
                    backgroundColor: isCurrent ? "var(--accent)" : "transparent",
                    borderBottom: isPast ? "1px solid var(--accent)" : "none",
                  }}
                >
                  {STAGE_LABELS[s]}
                </div>
                {i < STAGE_ORDER.length - 1 && (
                  <span style={{ color: "var(--text-subtle)", fontSize: "10px" }}>›</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div
          className="h-px w-full"
          style={{ backgroundColor: "var(--border)" }}
        >
          <motion.div
            className="h-full"
            style={{ backgroundColor: "var(--accent)" }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>
    </header>
  );
};
