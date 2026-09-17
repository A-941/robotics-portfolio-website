"use client";

import React from "react";
import { motion } from "motion/react";
import type { Mission } from "@/data/missionsData";

interface StageContextProps {
  mission: Pick<Mission, "situation" | "context" | "estimatedMinutes">;
  onContinue: () => void;
}

export const StageContext: React.FC<StageContextProps> = ({ mission, onContinue }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-8 py-2">
        {/* Situation hook */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="label mb-3" style={{ color: "var(--accent)" }}>
            The situation
          </p>
          <p
            className="text-xl sm:text-2xl font-semibold leading-snug"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            "{mission.situation}"
          </p>
        </motion.div>

        {/* Context paragraphs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="space-y-4"
        >
          {mission.context.map((para, i) => (
            <p
              key={i}
              className="text-sm sm:text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {para}
            </p>
          ))}
        </motion.div>

        {/* Time estimate */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3 pt-2"
        >
          <div
            className="h-px flex-1"
            style={{ backgroundColor: "var(--border)" }}
          />
          <span className="label" style={{ color: "var(--text-subtle)" }}>
            ~{mission.estimatedMinutes} min to complete
          </span>
          <div
            className="h-px flex-1"
            style={{ backgroundColor: "var(--border)" }}
          />
        </motion.div>
      </div>

      {/* Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="pt-6"
      >
        <button
          onClick={onContinue}
          className="w-full sm:w-auto px-6 py-3 text-sm font-bold transition-transform active:scale-95"
          style={{ backgroundColor: "var(--accent)", color: "#000" }}
        >
          I understand the situation →
        </button>
      </motion.div>
    </div>
  );
};
