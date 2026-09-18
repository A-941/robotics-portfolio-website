"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Cpu, Zap, Activity, Radio } from "lucide-react";

interface CircuitSignalBridgeProps {
  className?: string;
}

const NODES = [
  {
    id: "NODE_01",
    label: "ATmega328P CORE",
    sub: "16MHz CLOCK BUS",
    icon: Cpu,
    voltage: "5.02V",
    status: "SYNCED",
    color: "#c084fc",
  },
  {
    id: "NODE_02",
    label: "GPIO PIN 13",
    sub: "SQUARE WAVE DRIVER",
    icon: Zap,
    voltage: "0-5V PULSE",
    status: "ACTIVE",
    color: "#a855f7",
  },
  {
    id: "NODE_03",
    label: "OHMIC LIMITER",
    sub: "220Ω PRECISION",
    icon: Activity,
    voltage: "3.00V DROP",
    status: "PROTECTED",
    color: "#38bdf8",
  },
  {
    id: "NODE_04",
    label: "PHOTON EMITTER",
    sub: "5mm VIOLET SEMICONDUCTOR",
    icon: Radio,
    voltage: "2.02V FORWARD",
    status: "RADIATING",
    color: "#e879f9",
  },
];

export const CircuitSignalBridge: React.FC<CircuitSignalBridgeProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Animated line progress as user scrolls
  const pathLength = useTransform(scrollYProgress, [0.15, 0.75], [0, 1]);
  const signalGlow = useTransform(
    scrollYProgress,
    [0.15, 0.45, 0.75],
    ["rgba(168,85,247,0.1)", "rgba(168,85,247,0.7)", "rgba(56,189,248,0.8)"]
  );

  return (
    <section
      ref={containerRef}
      className={`relative py-28 sm:py-36 overflow-hidden ${className}`}
      style={{
        backgroundColor: "var(--bg)",
        borderTop: "1px solid rgba(168, 85, 247, 0.08)",
        borderBottom: "1px solid rgba(168, 85, 247, 0.08)",
      }}
    >
      {/* Deep atmospheric purple glow behind line */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(168,85,247,0.08) 0%, rgba(59,130,246,0.04) 50%, transparent 80%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 tech-grid opacity-50" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
              <span className="label" style={{ color: "var(--purple-bright)" }}>
                CIRCUIT TOPOLOGY // SIGNAL CONDUIT
              </span>
            </div>
            <h2 className="display-md text-white">
              Signal Travels <span className="gradient-text">Through Silicon</span>
            </h2>
          </div>
          <p
            className="text-xs sm:text-sm max-w-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            From raw register bits inside the ATmega328P MCU to physical photon emission. Every nano-second accounted for.
          </p>
        </div>

        {/* The Interactive Signal Pipeline */}
        <div className="relative">
          {/* Connecting SVG Trace (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 h-16 pointer-events-none z-0">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 1000 64"
              fill="none"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="bridgeTraceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="85%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#e879f9" />
                </linearGradient>
                <filter id="bridgeGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Passive dimmed trace */}
              <line
                x1="40"
                y1="32"
                x2="960"
                y2="32"
                stroke="rgba(168, 85, 247, 0.12)"
                strokeWidth="2"
                strokeDasharray="4 6"
              />

              {/* Scroll-driven energetic line */}
              <motion.line
                x1="40"
                y1="32"
                x2="960"
                y2="32"
                stroke="url(#bridgeTraceGrad)"
                strokeWidth="2.5"
                filter="url(#bridgeGlow)"
                style={{
                  pathLength,
                }}
              />
            </svg>
          </div>

          {/* Node Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {NODES.map((node, i) => {
              const IconComp = node.icon;
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative p-6 rounded-2xl border transition-all duration-300 corner-crosshairs"
                  style={{
                    backgroundColor: "rgba(8, 6, 18, 0.85)",
                    borderColor: "rgba(168, 85, 247, 0.16)",
                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.7)",
                  }}
                >
                  {/* Subtle hover gradient sweep */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse 80% 80% at 50% 20%, ${node.color}15 0%, transparent 70%)`,
                    }}
                  />

                  {/* Header Row */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span
                      className="label font-bold"
                      style={{ color: node.color, fontSize: "0.65rem" }}
                    >
                      {node.id}
                    </span>
                    <span
                      className="label px-2 py-0.5 rounded border text-[9px]"
                      style={{
                        borderColor: `${node.color}40`,
                        backgroundColor: `${node.color}10`,
                        color: node.color,
                      }}
                    >
                      {node.status}
                    </span>
                  </div>

                  {/* Icon Socket */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: "rgba(16, 11, 32, 0.9)",
                      borderColor: `${node.color}35`,
                      boxShadow: `0 0 20px -5px ${node.color}30`,
                    }}
                  >
                    <IconComp className="w-5 h-5" style={{ color: node.color }} />
                  </div>

                  {/* Node Title & Subtitle */}
                  <h3 className="text-sm font-bold text-white tracking-tight mb-1 font-mono">
                    {node.label}
                  </h3>
                  <p
                    className="text-xs mb-4"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {node.sub}
                  </p>

                  {/* Telemetry Metric Foot */}
                  <div className="pt-3 border-t border-purple-500/10 flex items-center justify-between text-xs font-mono">
                    <span style={{ color: "var(--text-subtle)" }}>VALUE:</span>
                    <span className="font-bold text-white">{node.voltage}</span>
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
