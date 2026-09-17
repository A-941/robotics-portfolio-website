"use client";

import React, { useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import type { Mission } from "@/data/missionsData";
import type { Attempt } from "@/hooks/useMissionState";
import { recordMissionComplete } from "@/hooks/useMissionState";

interface StageCompleteProps {
  mission: Pick<Mission, "id" | "title" | "badge" | "skillMappings" | "concepts">;
  attempts: Attempt[];
  hintsRevealed: number[];
  whyAnsweredCorrectly: boolean;
  onRestart: () => void;
}

export const StageComplete: React.FC<StageCompleteProps> = ({
  mission,
  attempts,
  hintsRevealed,
  whyAnsweredCorrectly,
  onRestart,
}) => {
  const totalAttempts = attempts.length;
  const firstTrySuccess = totalAttempts === 1;
  const hintsUsed = hintsRevealed.length;

  // Record to lab progress
  useEffect(() => {
    recordMissionComplete(mission.id, mission.skillMappings, mission.concepts);
  }, [mission.id, mission.skillMappings, mission.concepts]);

  // Performance summary
  const getPerformanceLabel = () => {
    if (firstTrySuccess && hintsUsed === 0) return "First attempt, no hints. Clean.";
    if (firstTrySuccess) return `First attempt. Used ${hintsUsed} hint${hintsUsed !== 1 ? "s" : ""}.`;
    if (hintsUsed === 0) return `${totalAttempts} attempts. Figured it out independently.`;
    return `${totalAttempts} attempts, ${hintsUsed} hint${hintsUsed !== 1 ? "s" : ""}. You improved.`;
  };

  return (
    <div className="flex flex-col h-full gap-8">
      {/* Success header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-3"
      >
        <div
          className="w-12 h-12 flex items-center justify-center text-xl font-bold"
          style={{ backgroundColor: "var(--accent)", color: "#000" }}
        >
          ✓
        </div>
        <div>
          <p className="label mb-1" style={{ color: "var(--accent)" }}>
            {mission.badge} — Complete
          </p>
          <h2
            className="text-xl sm:text-2xl font-bold"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            {mission.title}
          </h2>
        </div>
        <p className="label" style={{ color: "var(--text-subtle)" }}>
          {getPerformanceLabel()}
        </p>
      </motion.div>

      {/* Attempt history */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <p className="label mb-3" style={{ color: "var(--text-subtle)" }}>
          Your attempt history
        </p>
        {attempts.map((attempt, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-4 py-3 border"
            style={{
              borderColor: attempt.passed ? "rgba(232,255,0,0.35)" : "var(--border)",
              backgroundColor: attempt.passed ? "var(--accent-dim)" : "var(--surface)",
            }}
          >
            <div className="space-y-0.5">
              <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                Attempt {i + 1}
              </p>
              {attempt.failedItems.length > 0 && (
                <p className="label" style={{ color: "var(--text-subtle)" }}>
                  {attempt.failedItems.length} item{attempt.failedItems.length !== 1 ? "s" : ""} to fix
                </p>
              )}
              {attempt.hintsUsedBefore > 0 && (
                <p className="label" style={{ color: "var(--text-subtle)" }}>
                  {attempt.hintsUsedBefore} hint{attempt.hintsUsedBefore !== 1 ? "s" : ""} used
                </p>
              )}
            </div>
            <span
              className="label px-2 py-1 border"
              style={{
                color: attempt.passed ? "var(--accent)" : "var(--text-subtle)",
                borderColor: attempt.passed ? "var(--accent-border)" : "var(--border)",
              }}
            >
              {attempt.passed ? "Passed" : "Retry"}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Skills demonstrated */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="space-y-2"
      >
        <p className="label" style={{ color: "var(--text-subtle)" }}>
          Skills demonstrated
        </p>
        <div className="flex flex-wrap gap-2">
          {mission.skillMappings.map((skill) => (
            <span
              key={skill}
              className="label px-3 py-1.5 border"
              style={{ color: "var(--accent)", borderColor: "var(--accent-border)" }}
            >
              ✓ {skill.replace(/-/g, " ")}
            </span>
          ))}
        </div>
      </motion.div>

      {/* WHY result */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="border p-4 space-y-1"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
      >
        <p className="label" style={{ color: "var(--text-subtle)" }}>
          Conceptual understanding
        </p>
        <p className="text-sm" style={{ color: "var(--text-primary)" }}>
          {whyAnsweredCorrectly
            ? "✓ Why question answered correctly — you understand the concept, not just the steps."
            : "The 'Why' question showed there's more to understand. Review the explanation and try again next time."}
        </p>
      </motion.div>

      {/* What next */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="border p-4 space-y-3"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
      >
        <p className="label" style={{ color: "var(--accent)" }}>
          What next?
        </p>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          {firstTrySuccess && hintsUsed === 0
            ? "You're ready for a harder challenge. Debug a broken LED circuit — something's wrong and you need to find it."
            : totalAttempts <= 2
            ? "Solid work. Try the next mission to build on these skills."
            : "You pushed through it. Practice with the proof task variation a second time to make it stick."}
        </p>
        {/* Future: link to next mission when it exists */}
        <p className="label" style={{ color: "var(--text-subtle)" }}>
          More missions coming soon.
        </p>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        className="flex flex-wrap gap-3 pt-2"
      >
        <Link
          href="/"
          className="px-6 py-3 text-sm font-bold transition-transform active:scale-95"
          style={{ backgroundColor: "var(--accent)", color: "#000" }}
        >
          Back to Lab →
        </Link>
        <button
          onClick={onRestart}
          className="px-6 py-3 text-sm border transition-colors"
          style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
        >
          Restart mission
        </button>
      </motion.div>
    </div>
  );
};
