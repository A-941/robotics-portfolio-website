"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import type { Mission } from "@/data/missionsData";
import { useMissionState } from "@/hooks/useMissionState";

import { MissionHeader } from "./MissionHeader";
import { StageContext } from "./StageContext";
import { StageComponents } from "./StageComponents";
import { StageObjective } from "./StageObjective";
import { StageWorkspace } from "./StageWorkspace";
import { StageTest } from "./StageTest";
import { StageWhy } from "./StageWhy";
import { StageProof } from "./StageProof";
import { StageComplete } from "./StageComplete";
import { CircuitReference } from "./CircuitReference";

interface MissionRunnerProps {
  mission: Mission;
}

export const MissionRunner: React.FC<MissionRunnerProps> = ({ mission }) => {
  const ms = useMissionState(mission.id);

  // Mobile: track which panel is visible
  const [mobilePanel, setMobilePanel] = useState<"mission" | "circuit">("mission");

  if (!ms.isLoaded) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg)" }}
      >
        <p className="label" style={{ color: "var(--text-subtle)" }}>
          Loading mission...
        </p>
      </div>
    );
  }

  const { state } = ms;

  // ---------------------------------------------------------------
  // Stage rendering
  // ---------------------------------------------------------------
  const renderStage = () => {
    const commonProps = { key: state.stage };
    switch (state.stage) {
      case "context":
        return (
          <StageContext
            {...commonProps}
            mission={mission}
            onContinue={ms.advanceStage}
          />
        );
      case "components":
        return (
          <StageComponents
            {...commonProps}
            components={mission.components}
            onContinue={ms.advanceStage}
          />
        );
      case "objective":
        return (
          <StageObjective
            {...commonProps}
            mission={mission}
            onContinue={ms.advanceStage}
          />
        );
      case "workspace":
        return (
          <StageWorkspace
            {...commonProps}
            wiringSteps={mission.wiringSteps}
            completedSteps={state.completedSteps}
            onToggleStep={ms.toggleStep}
            hints={mission.hints}
            highestHintRevealed={ms.highestHintRevealed}
            hintsRevealed={state.hintsRevealed}
            onRevealNextHint={ms.revealNextHint}
            onReadyToTest={ms.advanceStage}
            attempts={state.attempts}
          />
        );
      case "test":
        return (
          <StageTest
            {...commonProps}
            testItems={mission.testItems}
            attempts={state.attempts}
            hintsRevealed={state.hintsRevealed}
            missionId={mission.id}
            completedSteps={state.completedSteps}
            totalSteps={mission.wiringSteps.length}
            onSubmit={ms.submitAttempt}
            onBackToWorkspace={() => ms.goToStage("workspace")}
          />
        );
      case "why":
        return (
          <StageWhy
            {...commonProps}
            whyQuestion={mission.whyQuestion}
            missionId={mission.id}
            hintsRevealed={state.hintsRevealed}
            attemptCount={state.attempts.length}
            onAnswered={ms.answerWhy}
          />
        );
      case "proof":
        return (
          <StageProof
            {...commonProps}
            proofTask={mission.proofTask}
            checkedItems={state.proofCheckedItems}
            onToggleItem={ms.toggleProofItem}
            onSubmit={ms.submitProof}
          />
        );
      case "complete":
        return (
          <StageComplete
            {...commonProps}
            mission={mission}
            attempts={state.attempts}
            hintsRevealed={state.hintsRevealed}
            whyAnsweredCorrectly={
              state.whyAnsweredIndex !== null &&
              !!mission.whyQuestion.options[state.whyAnsweredIndex]?.isCorrect
            }
            onRestart={ms.resetMission}
          />
        );
      default:
        return null;
    }
  };

  // ---------------------------------------------------------------
  // LAYOUT
  // ---------------------------------------------------------------
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Header */}
      <MissionHeader
        badge={mission.badge}
        title={mission.title}
        type={mission.type}
        difficulty={mission.difficulty}
        estimatedMinutes={mission.estimatedMinutes}
        currentStage={state.stage}
        progressPercent={ms.progressPercent}
        stageIndex={ms.stageIndex}
        totalStages={ms.totalStages}
        onReset={ms.resetMission}
      />

      {/* Mobile panel switcher */}
      <div
        className="lg:hidden flex border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <button
          onClick={() => setMobilePanel("mission")}
          className="flex-1 py-2.5 label"
          style={{
            color: mobilePanel === "mission" ? "var(--accent)" : "var(--text-subtle)",
            borderBottom: mobilePanel === "mission" ? "1px solid var(--accent)" : "none",
          }}
        >
          Mission
        </button>
        <button
          onClick={() => setMobilePanel("circuit")}
          className="flex-1 py-2.5 label"
          style={{
            color: mobilePanel === "circuit" ? "var(--accent)" : "var(--text-subtle)",
            borderBottom: mobilePanel === "circuit" ? "1px solid var(--accent)" : "none",
          }}
        >
          Circuit & Code
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT: Stage content */}
        <div
          className={`flex flex-col overflow-y-auto p-5 sm:p-8 lg:p-10 lg:w-[55%] lg:border-r ${
            mobilePanel === "mission" ? "flex" : "hidden lg:flex"
          }`}
          style={{ borderColor: "var(--border)" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={state.stage}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col h-full"
            >
              {renderStage()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT: Circuit reference */}
        <div
          className={`overflow-y-auto lg:w-[45%] ${
            mobilePanel === "circuit" ? "flex flex-col" : "hidden lg:flex lg:flex-col"
          }`}
        >
          <CircuitReference mission={mission} />
        </div>
      </div>
    </div>
  );
};
