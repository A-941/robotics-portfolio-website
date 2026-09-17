"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  ArrowRight,
  Cpu,
  Sparkles,
  CircuitBoard,
  BookOpen,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Activity,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { projectsData } from "@/data/projectsData";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillsSection } from "@/components/SkillsSection";
import { RoadmapSection } from "@/components/RoadmapSection";
import { HeroOrbitalEffect } from "@/components/HeroOrbitalEffect";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 21st.dev Inspired Hero Section with Black-Hole Orbital Canvas */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-24 md:pb-36 border-b border-zinc-800/80 bg-[#07070a]">
        {/* Interactive Gravitational Canvas & Orbital Particle Field */}
        <HeroOrbitalEffect />

        {/* Ambient atmospheric glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-indigo-500/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Col: Hero Copy */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              {/* Category Pill */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-medium backdrop-blur-md shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>Open Educational Engineering Resource</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]"
              >
                Learn Arduino & Robotics from Scratch —{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
                  Real Circuits, Real Code, Real Explanations
                </span>
              </motion.h1>

              {/* Mission Statement / Description */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed mx-auto lg:mx-0"
              >
                An open, first-principles learning hub for beginners in ECE, computer science, and robotics. Master microcontroller architecture, GPIO pin physics, Ohm's law, and sensor interfacing through fully tested breadboard builds without skipping the mathematics.
              </motion.p>

              {/* Micro feature pills */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-zinc-400 pt-1"
              >
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Tinkercad Breadboards
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  Verified C++ Firmware
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  Video Hardware Proofs
                </span>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3"
              >
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/25 transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  Explore Tutorials
                  <ArrowRight className="w-4 h-4" />
                </motion.a>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 transition-all hover:border-zinc-500"
                  >
                    Resource Guide & Philosophy
                  </Link>
                </motion.div>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://github.com/A-941/arduino-robotics-journey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3" />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right Col: Interactive Hardware Telemetry & Banner Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-md rounded-2xl border border-zinc-800/90 bg-zinc-900/60 p-4 sm:p-5 backdrop-blur-xl shadow-2xl shadow-cyan-500/10 group">
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
                  <Image
                    src="/images/banner.jpg"
                    alt="Arduino & Robotics Educational Workbench"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />

                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-zinc-950/90 border border-zinc-800/80 backdrop-blur-md">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-cyan-300 font-semibold flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-cyan-400" />
                        Microcontroller Workbench
                      </span>
                      <span className="text-zinc-400 font-mono text-[11px]">ATmega328P</span>
                    </div>
                    <p className="text-[11px] text-zinc-300 mt-1 font-mono">
                      16 MHz • 5V Digital Logic • 14 GPIO Pins • PWM Timers
                    </p>
                  </div>
                </div>

                {/* Educational Verification Metrics */}
                <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800">
                    <div className="text-2xl font-extrabold text-white">2 Modules</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">Complete Tutorials</div>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800">
                    <div className="text-2xl font-extrabold text-cyan-400">100% Verified</div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">Physical Circuit Runs</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects / Tutorials Section */}
      <section id="projects" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 mb-3 inline-block">
              Interactive Lab Modules
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Hands-On Hardware Tutorials
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-xl leading-relaxed">
              Every project includes realistic breadboard schematics, line-by-line firmware explanations, physical video runs, and practical troubleshooting advice.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs text-zinc-400 font-mono flex items-center gap-2 self-start sm:self-end bg-zinc-900/80 px-3 py-2 rounded-lg border border-zinc-800"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Scalable curriculum — new builds regularly added
          </motion.div>
        </div>

        {/* Scalable Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projectsData.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </section>

      {/* Curriculum & Foundations Section */}
      <SkillsSection />

      {/* Curriculum Sequence Roadmap Section */}
      <RoadmapSection />
    </div>
  );
}
