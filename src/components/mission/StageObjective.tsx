"use client";

import React from "react";
import { motion } from "motion/react";
import type { Mission } from "@/data/missionsData";

interface StageObjectiveProps {
  mission: Pick<Mission, "objective" | "testItems" | "concepts">;
  onContinue: () => void;
}

export const StageObjective: React.FC<StageObjectiveProps> = ({
  mission,
  onContinue,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow space-y-8 py-2">
        {/* Objective */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="border-l-2 pl-5"
          style={{ borderColor: "var(--accent)" }}
        >
          <p className="label mb-2" style={{ color: "var(--accent)" }}>
            Your objective
          </p>
          <p
            className="text-base sm:text-lg font-semibold leading-relaxed"
            style={{ color: "var(--text-primary)" }}
          >
            {mission.objective}
          </p>
        </motion.div>

        {/* How you'll know you're done */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-3"
        >
          <p className="label" style={{ color: "var(--text-subtle)" }}>
            How you'll know you succeeded
          </p>
          {mission.testItems.map((item, i) => (
            <div key={item.id} className="flex items-start gap-3">
              <div
                className="w-5 h-5 shrink-0 border flex items-center justify-center mt-0.5"
                style={{ borderColor: "var(--border)" }}
              >
                <span
                  className="label"
                  style={{ color: "var(--text-subtle)", fontSize: "10px" }}
                >
                  {i + 1}
                </span>
              </div>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Concepts you'll learn */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <p className="label" style={{ color: "var(--text-subtle)" }}>
            Concepts in this mission
          </p>
          <div className="flex flex-wrap gap-2">
            {mission.concepts.map((c) => (
              <span
                key={c}
                className="label px-2.5 py-1 border"
                style={{ color: "var(--text-secondary)", borderColor: "var(--border)" }}
              >
                {c}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Important reminder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="p-4 border"
          style={{
            borderColor: "var(--accent-border)",
            backgroundColor: "var(--accent-dim)",
          }}
        >
          <p className="label mb-1" style={{ color: "var(--accent)" }}>
            Important
          </p>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Don't look for the solution first. Try to build it using the objective above and the circuit reference on the right. If you get stuck, use progressive hints — not the full solution immediately.
          </p>
        </motion.div>
      </div>

      {/* Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="pt-6"
      >
        <button
          onClick={onContinue}
          className="w-full sm:w-auto px-6 py-3 text-sm font-bold transition-transform active:scale-95"
          style={{ backgroundColor: "var(--accent)", color: "#000" }}
        >
          Let me try it →
        </button>
      </motion.div>
    </div>
  );
};
