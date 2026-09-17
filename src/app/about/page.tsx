import React from "react";
import Link from "next/link";
import {
  Cpu,
  Brain,
  Rocket,
  BookOpen,
  Mail,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Target,
  Wrench,
  Sparkles,
  ShieldCheck,
  HelpCircle,
  Code2,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";

export const metadata = {
  title: "Resource Guide & Engineering Philosophy | Robotics Lab",
  description:
    "An open-source educational guide explaining the engineering philosophy behind this platform: mastering hardware fundamentals from first principles before deploying edge AI and robotics.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 sm:py-20 bg-[#08080c]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header / Intro */}
        <div className="space-y-6 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Educational Philosophy & Guide
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Demystifying Hardware from First Principles
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed">
            This platform was built to bridge the critical gap between abstract software algorithms and physical electronic hardware — offering clear, working circuits, verified timing code, and honest explanations for beginners.
          </p>
        </div>

        {/* The Core Motivation: Why Hardware First? */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-sm space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-zinc-800">
            <Target className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Why Learn Physical Electronics Before High-Level Robotics?
            </h2>
          </div>

          <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
            <p>
              In pure software, code executes in an idealized environment of isolated sandboxes and infinite memory. But when building autonomous robotics, computer vision rovers, and edge systems, physics is unavoidable: signals drop voltage across long traces, inductive motors shoot back-EMF spikes into power rails, floating pins sample environmental radio noise, and semiconductors burn out if current isn't strictly limited.
            </p>
            <p>
              Many tutorials online give copy-paste code without explaining the math or showing accurate wiring. This resource provides complete Ohm's law derivations, pin current limits, bitwise binary logic, and physical breadboard diagrams so learners understand <em>why</em> a circuit works, not just <em>how</em> to plug it in.
            </p>
          </div>
        </section>

        {/* The Dual Pillars: Software + Hardware */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/10 p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-indigo-300 font-bold text-lg">
              <Brain className="w-5 h-5" />
              Algorithmic Logic & Edge AI
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Modern robotics relies on computer vision, sensor fusion (Kalman filters), and machine learning inference. Efficient edge computing requires deep respect for memory architectures and deterministic real-time loops.
            </p>
            <ul className="text-xs text-zinc-400 space-y-2 pt-2 font-mono">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" /> Real-time C++ & embedded algorithms
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" /> Deterministic timing without blocking delays
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" /> Bitwise register manipulation & telemetry
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/10 p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-cyan-300 font-bold text-lg">
              <Cpu className="w-5 h-5" />
              Physical Prototyping & Circuits
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Every circuit must be designed with physical constraints in mind: Ohm's law, diode forward voltage drops, pull-up/pull-down resistor stabilization, and motor driver isolation.
            </p>
            <ul className="text-xs text-zinc-400 space-y-2 pt-2 font-mono">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Solderless breadboard layout discipline
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Microcontroller GPIO limits (40mA max per pin)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Realistic Tinkercad models with physical wiring
              </li>
            </ul>
          </div>
        </div>

        {/* How to Use This Resource */}
        <section className="rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-6 sm:p-8 backdrop-blur-sm space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-emerald-500/20">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              How to Study Each Lab Module
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2">
              <span className="text-xs font-mono uppercase font-bold text-cyan-400">Step 1 • Inspect Circuit</span>
              <h4 className="font-bold text-white text-sm">Breadboard Wiring</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Click on the Tinkercad circuit diagram to view it full screen. Follow the numbered wire-by-wire connection table before powering on the board.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2">
              <span className="text-xs font-mono uppercase font-bold text-emerald-400">Step 2 • Understand Math</span>
              <h4 className="font-bold text-white text-sm">Theory & Calculations</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Review the formula breakdowns and truth tables. Never guess resistor values or pin polarities when simple math gives the exact answer.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2">
              <span className="text-xs font-mono uppercase font-bold text-indigo-400">Step 3 • Flash & Test</span>
              <h4 className="font-bold text-white text-sm">Firmware & Video Proof</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Copy the verified C++ sketch to the Arduino IDE, upload to the microcontroller, and compare physical behavior against the recorded video demo.
              </p>
            </div>
          </div>
        </section>

        {/* Recommended Starter Kit */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-sm space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-zinc-800">
            <Wrench className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Recommended Starter Hardware Kit
            </h2>
          </div>

          <p className="text-sm text-zinc-400 leading-relaxed">
            All tutorials in this curriculum are designed around accessible, low-cost standard components that any student or hobbyist can acquire:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
            <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800">
              <div className="text-sm font-bold text-white">Arduino Uno R3</div>
              <div className="text-xs text-zinc-400 mt-0.5">ATmega328P MCU</div>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800">
              <div className="text-sm font-bold text-white">Breadboard</div>
              <div className="text-xs text-zinc-400 mt-0.5">830 Tie-Points</div>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800">
              <div className="text-sm font-bold text-white">Resistor Pack</div>
              <div className="text-xs text-zinc-400 mt-0.5">220Ω, 1kΩ, 10kΩ</div>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800">
              <div className="text-sm font-bold text-white">Jumper Wires</div>
              <div className="text-xs text-zinc-400 mt-0.5">Male-to-Male Wires</div>
            </div>
          </div>
        </section>

        {/* Open Source Collaboration */}
        <section className="p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-950 space-y-6">
          <h3 className="text-xl font-bold text-white">Contribute & Explore the Code</h3>
          <p className="text-sm text-zinc-300 leading-relaxed">
            All circuit files, .ino firmware sketches, and technical write-ups are open-source. Found an issue or want to suggest an upcoming project? Visit the repository on GitHub:
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://github.com/A-941/arduino-robotics-journey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-sm transition-all border border-zinc-700"
            >
              <GithubIcon className="w-4 h-4 text-cyan-400" />
              <span>GitHub: arduino-robotics-journey</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            </a>

            <a
              href="mailto:dhruv.makwana.dev@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-medium text-sm transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Feedback & Questions</span>
            </a>
          </div>

          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
            >
              Return to Overview
            </Link>

            <Link
              href="/projects/led-blink"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-cyan-300"
            >
              Start Tutorial 01: LED Blink
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
