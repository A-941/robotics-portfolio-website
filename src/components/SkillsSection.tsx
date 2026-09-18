"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Cpu, Zap, Binary, Activity, Layers, Eye, Compass, ShieldCheck } from "lucide-react";
import { GlowBackground } from "@/components/GlowBackground";

interface SkillNodeData {
  id: string;
  name: string;
  category: "Fundamentals" | "Firmware & CS" | "Advanced Robotics";
  level: "Active" | "Learning" | "Roadmap";
  x: number; // percentage in SVG coordinate space (0-100)
  y: number; // percentage in SVG coordinate space (0-100)
  icon: React.ElementType;
  description: string;
  metric: string;
}

const CONSTELLATION_NODES: SkillNodeData[] = [
  // Fundamentals (Left Cluster)
  {
    id: "mcu",
    name: "ATmega328P Architecture",
    category: "Fundamentals",
    level: "Active",
    x: 14,
    y: 48,
    icon: Cpu,
    description: "Hardware registers, 16MHz ceramic resonator timing, 5V/3.3V logic level architecture.",
    metric: "16MHz CLK // 32KB FLASH",
  },
  {
    id: "gpio",
    name: "Digital GPIO Control",
    category: "Fundamentals",
    level: "Active",
    x: 28,
    y: 26,
    icon: Zap,
    description: "Configuring high-impedance inputs vs low-impedance push-pull outputs safely under 40mA absolute max.",
    metric: "40mA ABS MAX // 5V LOGIC",
  },
  {
    id: "ohms_law",
    name: "Ohm's Law Derivation",
    category: "Fundamentals",
    level: "Active",
    x: 28,
    y: 72,
    icon: Activity,
    description: "Calculated current limiting (V_supply - V_f) / I_d to prevent semiconductor forward-bias thermal runaway.",
    metric: "R = (5V - 2V) / 0.014A",
  },
  {
    id: "breadboard",
    name: "Physical Prototyping",
    category: "Fundamentals",
    level: "Active",
    x: 42,
    y: 48,
    icon: Layers,
    description: "Solderless tie-point column topology, shared ground buses, and low-stray-capacitance jumper routing.",
    metric: "100% SOLDERLESS VERIFIED",
  },

  // Firmware & Computer Science (Center Cluster)
  {
    id: "cpp_firmware",
    name: "Bare-Metal Embedded C++",
    category: "Firmware & CS",
    level: "Active",
    x: 56,
    y: 26,
    icon: Binary,
    description: "Non-blocking millis() timing loops, hardware timers, and memory-conscious embedded programming.",
    metric: "ZERO COMPILER WARNINGS",
  },
  {
    id: "bitwise",
    name: "Bitwise Shift & Masking",
    category: "Firmware & CS",
    level: "Active",
    x: 56,
    y: 72,
    icon: Binary,
    description: "Direct bitwise operations ((val >> bit) & 1) for programmatic multi-pin state transitions in O(1) time.",
    metric: "O(1) DIRECT BIT EXTRACTION",
  },
  {
    id: "sensors",
    name: "Analog Telemetry & ADC",
    category: "Firmware & CS",
    level: "Learning",
    x: 70,
    y: 48,
    icon: Compass,
    description: "10-bit analog-to-digital conversion, voltage division, and continuous ultrasonic echo-pulse timing.",
    metric: "10-BIT ADC (1024 LEVELS)",
  },

  // Advanced & Edge AI (Right Cluster)
  {
    id: "pid",
    name: "Closed-Loop PID Control",
    category: "Advanced Robotics",
    level: "Roadmap",
    x: 84,
    y: 26,
    icon: Activity,
    description: "Proportional-Integral-Derivative feedback loops controlling H-bridge DC motors and steering geometry.",
    metric: "FEEDBACK CONTROL LOOP",
  },
  {
    id: "edge_ai",
    name: "Edge Computer Vision / TinyML",
    category: "Advanced Robotics",
    level: "Roadmap",
    x: 84,
    y: 72,
    icon: Eye,
    description: "Deploying quantized neural networks and visual landmark tracking on resource-constrained microcontrollers.",
    metric: "INT8 QUANTIZED MODELS",
  },
];

const CONNECTIONS: [string, string][] = [
  ["mcu", "gpio"],
  ["mcu", "ohms_law"],
  ["gpio", "breadboard"],
  ["ohms_law", "breadboard"],
  ["breadboard", "cpp_firmware"],
  ["breadboard", "bitwise"],
  ["cpp_firmware", "sensors"],
  ["bitwise", "sensors"],
  ["sensors", "pid"],
  ["sensors", "edge_ai"],
];

export const SkillsSection: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<SkillNodeData>(CONSTELLATION_NODES[0]);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const nodeMap = new Map(CONSTELLATION_NODES.map((n) => [n.id, n]));

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 sm:py-36 overflow-hidden border-t"
      style={{
        backgroundColor: "var(--bg)",
        borderColor: "rgba(168, 85, 247, 0.08)",
      }}
    >
      {/* Background Lighting System: Blue Depth Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 75% 45%, rgba(59,130,246,0.08) 0%, rgba(168,85,247,0.06) 50%, transparent 80%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 tech-grid-blue opacity-50" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="label" style={{ color: "var(--purple-bright)" }}>
                COMPETENCY MATRIX // V2.4
              </span>
            </div>
            <h2 className="display-md text-white">
              The Skill <span className="gradient-text">Constellation</span>
            </h2>
          </div>
          <p
            className="text-xs sm:text-sm max-w-md leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Not a static checklist. An interconnected graph of first-principles engineering competencies verified through working hardware.
          </p>
        </div>

        {/* The Constellation Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual Constellation Canvas (col-span-8) */}
          <div
            className="lg:col-span-8 relative rounded-2xl border p-4 sm:p-8 overflow-hidden"
            style={{
              backgroundColor: "rgba(8, 6, 18, 0.9)",
              borderColor: "rgba(168, 85, 247, 0.16)",
              boxShadow: "0 20px 50px -15px rgba(0,0,0,0.8), 0 0 30px -10px rgba(59,130,246,0.08)",
            }}
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-purple-500/10 font-mono text-[11px]">
              <span className="text-purple-300/70 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                NETWORK TOPOLOGY: 9 NODES LINKED
              </span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-purple-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  ACTIVE
                </span>
                <span className="flex items-center gap-1.5 text-blue-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  LEARNING
                </span>
                <span className="flex items-center gap-1.5 text-zinc-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                  ROADMAP
                </span>
              </div>
            </div>

            {/* Interactive SVG Network Graph */}
            <div className="relative w-full aspect-[16/10] min-h-[360px] sm:min-h-[460px]">
              <svg
                className="w-full h-full overflow-visible"
                viewBox="0 0 1000 600"
                fill="none"
              >
                <defs>
                  <linearGradient id="activeTrace" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                  <filter id="nodeGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* SVG Connections */}
                {CONNECTIONS.map(([fromId, toId], idx) => {
                  const from = nodeMap.get(fromId);
                  const to = nodeMap.get(toId);
                  if (!from || !to) return null;

                  const x1 = from.x * 10;
                  const y1 = from.y * 6;
                  const x2 = to.x * 10;
                  const y2 = to.y * 6;

                  const isActiveLine = from.level === "Active" && to.level === "Active";
                  const isLearningLine = from.level === "Active" && to.level === "Learning";

                  return (
                    <g key={idx}>
                      {/* Base line */}
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={
                          isActiveLine
                            ? "rgba(168, 85, 247, 0.3)"
                            : isLearningLine
                            ? "rgba(56, 189, 248, 0.25)"
                            : "rgba(255, 255, 255, 0.05)"
                        }
                        strokeWidth={isActiveLine ? 2 : 1.2}
                        strokeDasharray={isActiveLine ? "none" : "4 4"}
                      />

                      {/* Moving energy pulse along active connections */}
                      {isActiveLine && (
                        <circle r="3" fill="#c084fc" filter="url(#nodeGlow)">
                          <animateMotion
                            path={`M ${x1} ${y1} L ${x2} ${y2}`}
                            dur={`${2 + (idx % 3)}s`}
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}
                    </g>
                  );
                })}

                {/* Nodes on SVG */}
                {CONSTELLATION_NODES.map((node) => {
                  const cx = node.x * 10;
                  const cy = node.y * 6;
                  const isSelected = selectedNode.id === node.id;
                  const isActive = node.level === "Active";
                  const isLearning = node.level === "Learning";

                  const fillColor = isActive
                    ? "#a855f7"
                    : isLearning
                    ? "#38bdf8"
                    : "#221e35";

                  return (
                    <g
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className="cursor-pointer transition-transform duration-200"
                    >
                      {/* Pulse halo if selected or active */}
                      {isSelected && (
                        <circle
                          cx={cx}
                          cy={cy}
                          r="32"
                          fill="none"
                          stroke={fillColor}
                          strokeWidth="1.5"
                          opacity="0.4"
                          filter="url(#nodeGlow)"
                        >
                          <animate
                            attributeName="r"
                            values="24;36;24"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}

                      {/* Outer Ring */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isSelected ? "22" : "18"}
                        fill="#080612"
                        stroke={isSelected ? "#f0ebff" : fillColor}
                        strokeWidth={isSelected ? "2.5" : "1.8"}
                        filter={isActive ? "url(#nodeGlow)" : undefined}
                      />

                      {/* Inner Core Point */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r="6"
                        fill={fillColor}
                      />

                      {/* Node Label Text under the circle */}
                      <text
                        x={cx}
                        y={cy + 34}
                        textAnchor="middle"
                        fill={isSelected ? "#ffffff" : isActive ? "#e9d5ff" : "#7c6fa0"}
                        fontSize="11"
                        fontWeight={isSelected ? "bold" : "500"}
                        fontFamily="monospace"
                        letterSpacing="0.5"
                      >
                        {node.name.length > 20 ? node.name.slice(0, 18) + "..." : node.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Node Dossier Inspector Panel (col-span-4) */}
          <div
            className="lg:col-span-4 rounded-2xl border p-6 sm:p-8 space-y-6 relative overflow-hidden"
            style={{
              backgroundColor: "rgba(10, 8, 22, 0.95)",
              borderColor: "rgba(168, 85, 247, 0.2)",
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.8)",
            }}
          >
            {/* Header Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-purple-500/10">
              <span
                className="label px-2.5 py-1 rounded border text-[10px]"
                style={{
                  color:
                    selectedNode.level === "Active"
                      ? "#c084fc"
                      : selectedNode.level === "Learning"
                      ? "#38bdf8"
                      : "#7c6fa0",
                  borderColor: "rgba(168,85,247,0.25)",
                  backgroundColor: "rgba(168,85,247,0.08)",
                }}
              >
                STATUS: {selectedNode.level.toUpperCase()}
              </span>

              <span className="label" style={{ color: "var(--text-subtle)", fontSize: "0.6rem" }}>
                DOMAIN: {selectedNode.category}
              </span>
            </div>

            {/* Selected Node Title & Icon */}
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl border flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: "rgba(168,85,247,0.1)",
                  borderColor: "rgba(168,85,247,0.35)",
                }}
              >
                <selectedNode.icon className="w-6 h-6 text-purple-300" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {selectedNode.name}
                </h3>
                <span className="label font-mono text-[10px]" style={{ color: "var(--purple-bright)" }}>
                  {selectedNode.metric}
                </span>
              </div>
            </div>

            {/* Description */}
            <div
              className="p-4 rounded-xl border text-xs sm:text-sm leading-relaxed"
              style={{
                backgroundColor: "rgba(6, 4, 13, 0.8)",
                borderColor: "rgba(168, 85, 247, 0.12)",
                color: "var(--text-secondary)",
              }}
            >
              {selectedNode.description}
            </div>

            {/* Technical Verification Details */}
            <div className="space-y-2.5 pt-2">
              <span className="label block" style={{ color: "var(--text-subtle)", fontSize: "0.6rem" }}>
                LAB VERIFICATION CRITERIA
              </span>
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified in physical breadboard deployment</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>C++ Firmware benchmarked on ATmega328P</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Exact mathematical proof documented</span>
              </div>
            </div>

            {/* Footer Hint */}
            <div className="pt-4 border-t border-purple-500/10">
              <p className="text-[11px] font-mono text-zinc-500">
                Click any node in the constellation to inspect hardware parameters and firmware metrics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
