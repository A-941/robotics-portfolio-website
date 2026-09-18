"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Zap, Play, Activity, Cpu } from "lucide-react";

export const ScrollCircuitLab: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const labReveal = useTransform(scrollYProgress, [0.15, 0.4], [0.4, 1]);

  // Interactive circuit state
  const [isPowered, setIsPowered] = useState(true);
  const [frequency, setFrequency] = useState<1 | 4 | 8>(1);
  const [pulseCount, setPulseCount] = useState(0);
  const [activeSignal, setActiveSignal] = useState(true);

  // Trigger pulse effect
  const handleInjectPulse = () => {
    setActiveSignal(false);
    setTimeout(() => {
      setActiveSignal(true);
      setPulseCount((c) => c + 1);
    }, 50);
  };

  // Oscilloscope wave rendering loop
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let offset = 0;

    const render = () => {
      const width = (canvas.width = canvas.parentElement?.clientWidth || 300);
      const height = (canvas.height = 70);

      ctx.clearRect(0, 0, width, height);

      // Grid lines
      ctx.strokeStyle = "rgba(168, 85, 247, 0.08)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 24) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 18) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (!isPowered) {
        // Flat 0V line
        ctx.strokeStyle = "rgba(124, 111, 160, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, height - 12);
        ctx.lineTo(width, height - 12);
        ctx.stroke();
        return;
      }

      // Square pulse wave
      ctx.strokeStyle = "#c084fc";
      ctx.lineWidth = 2;
      ctx.shadowColor = "rgba(168, 85, 247, 0.8)";
      ctx.shadowBlur = 8;
      ctx.beginPath();

      const period = 60 / frequency;
      const highY = 14;
      const lowY = height - 14;

      offset += frequency * 0.8;

      let prevHigh = false;
      for (let x = 0; x < width; x++) {
        const cyclePos = (x + offset) % period;
        const isHigh = cyclePos < period / 2;
        const currentY = isHigh ? highY : lowY;

        if (x === 0) {
          ctx.moveTo(x, currentY);
        } else {
          if (isHigh !== prevHigh) {
            ctx.lineTo(x, currentY);
          } else {
            ctx.lineTo(x, currentY);
          }
        }
        prevHigh = isHigh;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPowered, frequency, pulseCount]);

  return (
    <section
      ref={containerRef}
      className="relative py-28 sm:py-36 overflow-hidden border-t border-b"
      style={{
        backgroundColor: "var(--bg)",
        borderColor: "rgba(168, 85, 247, 0.08)",
      }}
    >
      {/* Deep purple light & grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(168,85,247,0.09) 0%, rgba(59,130,246,0.04) 50%, transparent 80%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 tech-grid opacity-60" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
              <span className="label" style={{ color: "var(--purple-bright)" }}>
                INTERACTIVE TEST BENCH // V0.9
              </span>
            </div>
            <h2 className="display-md text-white">
              Watch Electricity <span className="gradient-text">Obey Code</span>
            </h2>
          </div>

          <p
            className="text-sm max-w-md leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Real circuits aren't static diagrams. Click the pulse injector to push a
            5V electric wavefront through the virtual MCU pin into the resistor &amp; diode.
          </p>
        </div>

        {/* The Laboratory Workstation Canvas */}
        <motion.div
          className="relative rounded-2xl border overflow-hidden p-6 sm:p-10"
          style={{
            opacity: labReveal,
            backgroundColor: "#080612",
            borderColor: "rgba(168, 85, 247, 0.18)",
            boxShadow:
              "0 20px 60px -15px rgba(0,0,0,0.8), 0 0 50px -10px rgba(168,85,247,0.08)",
          }}
        >
          {/* Top telemetry bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-purple-500/10 mb-8 font-mono text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2 text-purple-300">
                <Cpu className="w-4 h-4 text-purple-400" />
                <span>ATmega328P // 16MHz</span>
              </span>
              <span className="text-zinc-600 hidden sm:inline">|</span>
              <span className="text-zinc-400 hidden sm:inline">
                VOLTAGE: <strong className="text-purple-300">5.02 VDC</strong>
              </span>
              <span className="text-zinc-600 hidden md:inline">|</span>
              <span className="text-zinc-400 hidden md:inline">
                CURRENT: <strong className="text-emerald-400">14.2 mA</strong>
              </span>
            </div>

            {/* Bench Controls */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPowered(!isPowered)}
                className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                  isPowered
                    ? "bg-purple-950/80 text-purple-200 border border-purple-500/40 shadow-sm"
                    : "bg-zinc-900 text-zinc-500 border border-zinc-800"
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-purple-400" />
                {isPowered ? "PWR: ON" : "PWR: OFF"}
              </button>

              <button
                type="button"
                onClick={handleInjectPulse}
                disabled={!isPowered}
                className="px-3.5 py-1.5 rounded text-xs font-mono font-bold uppercase tracking-wider bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1.5 shadow-lg shadow-purple-600/30 active:scale-95 transition-all disabled:opacity-40"
              >
                <Play className="w-3 h-3 fill-current" />
                INJECT 5V PULSE
              </button>
            </div>
          </div>

          {/* SVG Schematic + Breadboard Physical Simulation Layout */}
          <div className="relative min-h-[340px] sm:min-h-[400px] w-full flex items-center justify-center">
            <svg
              className="w-full h-full max-w-4xl overflow-visible"
              viewBox="0 0 800 360"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="circuit-purple-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="circuitTraceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="50%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
                <radialGradient id="circuitLedGlow">
                  <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#a855f7" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Breadboard Matrix Outline */}
              <rect
                x="320"
                y="50"
                width="440"
                height="260"
                rx="10"
                fill="#0a0718"
                stroke="rgba(168, 85, 247, 0.15)"
                strokeWidth="1.5"
              />
              {/* Breadboard central groove */}
              <line
                x1="320"
                y1="180"
                x2="760"
                y2="180"
                stroke="rgba(168, 85, 247, 0.2)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              {/* Breadboard tie points */}
              {Array.from({ length: 14 }).map((_, col) => (
                <g key={col}>
                  <circle cx={360 + col * 28} cy={90} r="2" fill="rgba(168, 85, 247, 0.3)" />
                  <circle cx={360 + col * 28} cy={120} r="2" fill="rgba(168, 85, 247, 0.3)" />
                  <circle cx={360 + col * 28} cy={150} r="2" fill="rgba(168, 85, 247, 0.3)" />
                  <circle cx={360 + col * 28} cy={210} r="2" fill="rgba(168, 85, 247, 0.3)" />
                  <circle cx={360 + col * 28} cy={240} r="2" fill="rgba(168, 85, 247, 0.3)" />
                  <circle cx={360 + col * 28} cy={270} r="2" fill="rgba(168, 85, 247, 0.3)" />
                </g>
              ))}

              {/* ARDUINO MCU BOARD (Left) */}
              <g id="arduino-mcu">
                <rect
                  x="40"
                  y="60"
                  width="200"
                  height="240"
                  rx="8"
                  fill="#0c081e"
                  stroke="#a855f7"
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                />
                <text
                  x="60"
                  y="95"
                  fill="#f0ebff"
                  fontSize="12"
                  fontWeight="bold"
                  fontFamily="monospace"
                  letterSpacing="1"
                >
                  ARDUINO UNO
                </text>
                <text
                  x="60"
                  y="115"
                  fill="#7c6fa0"
                  fontSize="9"
                  fontFamily="monospace"
                >
                  DIGITAL I/O INTERFACE
                </text>

                {/* MCU Chip Center */}
                <rect
                  x="80"
                  y="140"
                  width="120"
                  height="50"
                  rx="4"
                  fill="#05030a"
                  stroke="#6b21a8"
                  strokeWidth="1"
                />
                <text
                  x="100"
                  y="170"
                  fill="#c084fc"
                  fontSize="10"
                  fontFamily="monospace"
                >
                  ATmega328P
                </text>

                {/* Pin D13 Header */}
                <circle cx="230" cy="115" r="5" fill="#a855f7" />
                <text x="175" y="119" fill="#f0ebff" fontSize="10" fontFamily="monospace">
                  PIN 13 [5V]
                </text>

                {/* GND Header */}
                <circle cx="230" cy="255" r="5" fill="#38bdf8" />
                <text x="195" y="259" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                  GND
                </text>
              </g>

              {/* WIRE 1: Pin 13 to Resistor (Purple Electric Flow) */}
              <path
                d="M 230 115 C 290 115, 320 120, 420 120"
                stroke="rgba(168, 85, 247, 0.2)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M 230 115 C 290 115, 320 120, 420 120"
                stroke="url(#circuitTraceGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#circuit-purple-glow)"
                strokeDasharray={isPowered ? "10 6" : "none"}
              />

              {/* RESISTOR (220 Ohm) */}
              <g id="resistor" transform="translate(420, 120)">
                <line x1="0" y1="0" x2="25" y2="0" stroke="#a855f7" strokeWidth="2.5" />
                {/* Resistor Body */}
                <rect
                  x="25"
                  y="-8"
                  width="56"
                  height="16"
                  rx="3"
                  fill="#c89666"
                  stroke="#a855f7"
                  strokeWidth="1"
                />
                {/* Color Bands (Red, Red, Brown, Gold = 220 Ohm) */}
                <rect x="33" y="-8" width="4" height="16" fill="#ef4444" />
                <rect x="42" y="-8" width="4" height="16" fill="#ef4444" />
                <rect x="52" y="-8" width="4" height="16" fill="#78350f" />
                <rect x="65" y="-8" width="4" height="16" fill="#eab308" />
                <line x1="81" y1="0" x2="110" y2="0" stroke="#a855f7" strokeWidth="2.5" />
                <text x="36" y="24" fill="#a855f7" fontSize="9" fontFamily="monospace">
                  220Ω
                </text>
              </g>

              {/* WIRE 2: Resistor to LED Anode */}
              <path
                d="M 530 120 L 590 120"
                stroke="#c084fc"
                strokeWidth="2.5"
                filter="url(#circuit-purple-glow)"
              />

              {/* LED COMPONENT */}
              <g id="led-lamp" transform="translate(590, 120)">
                <line x1="0" y1="0" x2="20" y2="20" stroke="#c084fc" strokeWidth="2" />
                <line x1="20" y1="50" x2="0" y2="90" stroke="#38bdf8" strokeWidth="2" />

                {/* LED Bulb */}
                <circle
                  cx="25"
                  cy="35"
                  r="18"
                  fill={isPowered ? "#c084fc" : "#2e1850"}
                  stroke="#f0ebff"
                  strokeWidth="1.5"
                />

                {/* Dynamic Radiance Glow when powered */}
                {isPowered && (
                  <circle
                    cx="25"
                    cy="35"
                    r="40"
                    fill="url(#circuitLedGlow)"
                    opacity="0.85"
                  />
                )}

                <text
                  x="55"
                  y="40"
                  fill={isPowered ? "#f0ebff" : "#7c6fa0"}
                  fontSize="11"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {isPowered ? "5mm VIOLET LED [ACTIVE]" : "5mm LED [OFF]"}
                </text>
              </g>

              {/* WIRE 3: LED Cathode to Ground Rail (Blue Flow) */}
              <path
                d="M 590 210 C 500 230, 360 255, 230 255"
                stroke="rgba(56, 189, 248, 0.2)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M 590 210 C 500 230, 360 255, 230 255"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={isPowered ? "8 6" : "none"}
              />

              {/* Moving Energy Signal Packet */}
              {isPowered && activeSignal && (
                <circle r="4" fill="#ffffff" filter="url(#circuit-purple-glow)">
                  <animateMotion
                    path="M 230 115 C 290 115, 320 120, 420 120 L 530 120 L 590 120"
                    dur="1.2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </svg>
          </div>

          {/* Real-Time Logic Analyzer Viewport */}
          <div className="mt-6 pt-5 border-t border-purple-500/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-400" />
                <span className="label" style={{ color: "var(--purple-bright)" }}>
                  LOGIC ANALYZER // PIN 13 OUTPUT
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Square wave frequency toggles MCU clock state:
              </p>
              <div className="flex gap-2 mt-2">
                {([1, 4, 8] as const).map((hz) => (
                  <button
                    key={hz}
                    type="button"
                    onClick={() => setFrequency(hz)}
                    className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors ${
                      frequency === hz
                        ? "bg-purple-600/30 text-purple-200 border-purple-500/60"
                        : "bg-zinc-950 text-zinc-500 border-zinc-800 hover:text-zinc-300"
                    }`}
                  >
                    {hz} Hz
                  </button>
                ))}
              </div>
            </div>

            {/* Canvas Oscilloscope Wave */}
            <div className="md:col-span-8 bg-black/60 rounded-lg p-2.5 border border-purple-500/20 relative overflow-hidden">
              <div className="absolute top-2 right-3 font-mono text-[10px] text-purple-400/70 z-10">
                CH1: 5.0V/DIV | TIMEBASE: {250 / frequency}ms
              </div>
              <canvas ref={canvasRef} className="w-full h-[65px] block" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
