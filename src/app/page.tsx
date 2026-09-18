"use client";

import React, { useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue } from "motion/react";
import { projectsData } from "@/data/projectsData";
import { SkillsSection } from "@/components/SkillsSection";
import { RoadmapSection } from "@/components/RoadmapSection";
import { GlowBackground } from "@/components/GlowBackground";
import { HeroOrbitalEffect } from "@/components/HeroOrbitalEffect";
import { ParticleCanvas } from "@/components/ParticleCanvas";
import { ScrollCircuitLab } from "@/components/ScrollCircuitLab";
import { CircuitSignalBridge } from "@/components/CircuitSignalBridge";
import { Cpu, Terminal, ArrowRight, Zap } from "lucide-react";

/* =============================================
   SCROLL REVEAL WRAPPER
   ============================================= */
const ScrollIn = ({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
}) => {
  const initial =
    direction === "up" ? { opacity: 0, y: 35 } :
    direction === "left" ? { opacity: 0, x: -35 } :
    { opacity: 0, x: 35 };
  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* =============================================
   CINEMATIC MISSION ROW
   ============================================= */
const ProjectRow = ({
  project,
  index,
}: {
  project: (typeof projectsData)[0];
  index: number;
}) => {
  const isEven = index % 2 === 0;
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  // Pointer-driven light sweep
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const glowX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(my, [0, 1], ["0%", "100%"]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width);
      my.set((e.clientY - rect.top) / rect.height);
    },
    [mx, my]
  );
  const handleMouseLeave = useCallback(() => {
    mx.set(0.5);
    my.set(0.5);
  }, [mx, my]);

  const missionCode = `MISSION_00${index + 1}`;

  return (
    <article ref={ref} className="relative group border-b border-purple-500/10">
      {/* Corner crosshairs */}
      <span className="absolute -top-2 left-4 text-[10px] font-mono text-purple-500/30 select-none">+</span>
      <span className="absolute -top-2 right-4 text-[10px] font-mono text-purple-500/30 select-none">+</span>

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[540px] overflow-hidden transition-colors duration-500 bg-transparent"
      >
        {/* Pointer-driven light sweep overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse 60% 60% at ${glowX.get()} ${glowY.get()}, rgba(168,85,247,0.08) 0%, transparent 70%)`,
          }}
        />

        {/* Image / Breadboard visual column */}
        <motion.div
          className={`relative overflow-hidden col-span-1 lg:col-span-7 ${isEven ? "" : "lg:order-2"}`}
          style={{ minHeight: "380px" }}
        >
          {/* Ghost mission ID */}
          <div
            className="ghost-number absolute select-none pointer-events-none z-0"
            style={{
              right: isEven ? "-0.02em" : "auto",
              left: isEven ? "auto" : "-0.02em",
              bottom: "-0.1em",
              color: "rgba(168,85,247,0.035)",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>

          <motion.div
            className="absolute inset-0"
            style={{ y: imageY }}
          >
            <Image
              src={project.circuitBreadboardImage || project.thumbnail}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 58vw"
            />
            {/* Deep Obsidian vignette overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, rgba(5,3,10,0.3) 0%, rgba(5,3,10,0.85) 100%)",
              }}
            />
            {/* Purple ambient light response on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: "linear-gradient(135deg, rgba(168,85,247,0.15) 0%, transparent 60%)",
              }}
            />
          </motion.div>

          {/* Mission Top Header Badge */}
          <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
            <span
              className="label px-3 py-1.5 flex items-center gap-1.5 rounded"
              style={{
                color: "#c084fc",
                border: "1px solid rgba(168,85,247,0.35)",
                backgroundColor: "rgba(6,4,13,0.88)",
                backdropFilter: "blur(12px)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              {missionCode}
            </span>

            <span
              className="label px-2.5 py-1.5 hidden sm:inline-block rounded"
              style={{
                color: "var(--text-subtle)",
                backgroundColor: "rgba(6,4,13,0.75)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              LEVEL: {project.badge}
            </span>
          </div>
        </motion.div>

        {/* Mission Dossier & Objective column */}
        <ScrollIn
          delay={0.1}
          className={`col-span-1 lg:col-span-5 flex flex-col justify-between px-8 py-10 lg:px-12 lg:py-14 relative z-10 ${isEven ? "lg:order-2" : "lg:order-1"}`}
        >
          <div>
            {/* Status metadata row */}
            <div className="flex items-center gap-3 mb-6">
              <span className="label text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                STATUS: READY
              </span>
              <div className="h-px flex-1" style={{ backgroundColor: "rgba(168,85,247,0.1)" }} />
              <span className="label" style={{ color: "var(--text-subtle)" }}>
                NODE: {project.category}
              </span>
            </div>

            {/* Mission Title */}
            <h2 className="display-md mb-4 text-white group-hover:text-purple-200 transition-colors">
              {project.title}
            </h2>

            {/* Objective box */}
            <div
              className="p-4 rounded-xl border mb-6"
              style={{
                backgroundColor: "rgba(12, 9, 24, 0.6)",
                borderColor: "rgba(168,85,247,0.15)",
              }}
            >
              <span className="label block mb-1.5" style={{ color: "var(--purple-bright)" }}>
                MISSION OBJECTIVE:
              </span>
              <p
                className="text-xs sm:text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {project.shortDescription}
              </p>
            </div>

            {/* Hardware Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="label px-2.5 py-1 rounded"
                  style={{
                    color: "var(--text-secondary)",
                    border: "1px solid rgba(168,85,247,0.14)",
                    backgroundColor: "rgba(168,85,247,0.04)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-6 pt-4 border-t border-purple-500/10">
            <Link
              href={`/projects/${project.id}`}
              className="btn-primary"
            >
              ENTER LAB →
            </Link>
            <a
              href={project.githubFolderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="label transition-colors hover:text-purple-300 flex items-center gap-1"
              style={{ color: "var(--text-subtle)" }}
            >
              FIRMWARE SRC ↗
            </a>
          </div>
        </ScrollIn>
      </div>
    </article>
  );
};

/* =============================================
   OLD vs NEW WAY — Scroll-driven story section
   ============================================= */
const OldVsNewSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const oldWords = ["WATCH", "READ", "MEMORIZE", "FORGET"];
  const newWords = ["TRY", "BREAK", "DEBUG", "UNDERSTAND", "PROVE"];

  // Progressive scroll transforms
  const oldOpacities = oldWords.map((_, i) =>
    useTransform(scrollYProgress, [0.06 + i * 0.06, 0.16 + i * 0.06], [0.6, 0.05])
  );

  const newOpacities = newWords.map((_, i) =>
    useTransform(scrollYProgress, [0.1 + i * 0.08, 0.22 + i * 0.08], [0.1, 1])
  );
  const newGlows = newWords.map((_, i) =>
    useTransform(
      scrollYProgress,
      [0.1 + i * 0.08, 0.22 + i * 0.08],
      ["rgba(168,85,247,0)", "rgba(168,85,247,0.5)"]
    )
  );

  return (
    <section
      ref={ref}
      className="relative min-h-[170vh] py-36 overflow-hidden"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <GlowBackground variant="section" />

      <div className="sticky top-0 h-screen flex items-center px-6 sm:px-10 lg:px-14">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">

          {/* Old Way */}
          <div className="flex flex-col gap-2">
            <p className="label mb-6 flex items-center gap-2" style={{ color: "rgba(168,85,247,0.3)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
              THE OLD WAY // OBSOLETE
            </p>
            {oldWords.map((word, i) => (
              <motion.div
                key={word}
                style={{ opacity: oldOpacities[i] }}
                className="overflow-hidden"
              >
                <span
                  className="display-lg block"
                  style={{
                    color: "var(--text-subtle)",
                    letterSpacing: "-0.03em",
                    textDecoration: "line-through",
                    textDecorationColor: "rgba(168,85,247,0.2)",
                  }}
                >
                  {word}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Divider line */}
          <div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(168,85,247,0.25) 30%, rgba(168,85,247,0.25) 70%, transparent)",
            }}
          />

          {/* Our Way */}
          <div className="flex flex-col gap-2">
            <p className="label mb-6 flex items-center gap-2" style={{ color: "var(--purple-bright)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              OUR WAY // FIRST-PRINCIPLES
            </p>
            {newWords.map((word, i) => {
              const isBreak = word === "BREAK";
              const isDebug = word === "DEBUG";
              const isProve = word === "PROVE";
              return (
                <motion.div
                  key={word}
                  style={{ opacity: newOpacities[i] }}
                  className="overflow-hidden"
                >
                  <motion.span
                    className={`display-lg block ${isBreak ? "text-glitch" : ""} ${isProve ? "text-surge" : ""}`}
                    style={{
                      color: isBreak ? "#f43f5e" : isDebug ? "#38bdf8" : isProve ? "#f0ebff" : "#c084fc",
                      letterSpacing: "-0.03em",
                      textShadow: newGlows[i] as unknown as string,
                    }}
                  >
                    {word}
                  </motion.span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* =============================================
   MAIN HOMEPAGE
   ============================================= */
export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(heroScroll, [0, 1], ["0%", "18%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  // Words separation on scroll (WOW Moment 1)
  const word1X = useTransform(heroScroll, [0, 0.7], ["0vw", "-4vw"]);
  const word2X = useTransform(heroScroll, [0, 0.7], ["0vw", "3vw"]);
  const word3X = useTransform(heroScroll, [0, 0.7], ["0vw", "7vw"]);

  const heroWords = [
    { text: "BUILD.", color: "#f0ebff", styleTransform: word1X, padding: "0" },
    { text: "BREAK.", color: "#c084fc", styleTransform: word2X, padding: "7vw" },
    { text: "UNDERSTAND.", color: "#a855f7", styleTransform: word3X, padding: "14vw" },
  ];

  return (
    <div className="flex flex-col" style={{ backgroundColor: "var(--bg)" }}>

      {/* ============= HERO (WOW MOMENT 1) ============= */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-12 pb-16"
      >
        {/* Background Atmosphere */}
        <GlowBackground variant="hero" />
        <ParticleCanvas count={55} className="z-0" />

        {/* 2.5D Orbital Particle Canvas */}
        <div className="absolute inset-0 z-0 opacity-70">
          <HeroOrbitalEffect />
        </div>

        {/* Ambient Scan Line */}
        <div
          className="absolute inset-x-0 h-px pointer-events-none z-10 opacity-25"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.7), transparent)",
            animation: "scan-line 7s linear infinite",
            animationDelay: "1.5s",
          }}
        />

        {/* Top-Right Technical Telemetry HUD */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="absolute top-20 right-6 sm:right-10 lg:right-14 flex flex-col items-end gap-1.5 z-20 pointer-events-none"
          aria-hidden="true"
        >
          <span className="label text-[11px] text-purple-400/60 font-bold">
            ECE // ROBOTICS LAB
          </span>
          <span className="label text-[10px] text-purple-400/40">
            PLATFORM_ID: ATmega328P
          </span>
          <span className="label text-[10px] flex items-center gap-1.5 text-emerald-400/90">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            SYS_BUS: 5.02V ACTIVE
          </span>
        </motion.div>

        {/* Left Accent Bar */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute left-0 top-20 bottom-20 w-px pointer-events-none z-10"
          style={{
            background: "linear-gradient(to bottom, transparent, rgba(168,85,247,0.4) 30%, rgba(168,85,247,0.4) 70%, transparent)",
            transformOrigin: "top",
          }}
          aria-hidden="true"
        />

        {/* Hero Content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative px-8 sm:px-12 lg:px-16 z-10 pt-16 sm:pt-20"
        >
          {/* Overline Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="flex items-center gap-3 mb-8 sm:mb-10"
          >
            <span className="label px-3 py-1 rounded border border-purple-500/30 bg-purple-500/10 text-purple-300">
              PHYSICAL COMPUTING // FIRST PRINCIPLES
            </span>
            <div className="h-px w-12 bg-purple-500/30 hidden sm:block" />
          </motion.div>

          {/* Giant Stacked Typography — WOW MOMENT 1 */}
          <div className="mb-10 sm:mb-14">
            {heroWords.map((item, i) => (
              <div key={item.text} className="overflow-hidden">
                <motion.h1
                  initial={{ y: "105%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.5 + i * 0.16,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  style={{
                    x: item.styleTransform,
                    color: item.color,
                    textShadow: i === 2 ? "0 0 60px rgba(168,85,247,0.4), 0 0 120px rgba(168,85,247,0.15)" : "none",
                    paddingLeft: item.padding,
                  }}
                  className="display-2xl tracking-tighter"
                >
                  {item.text}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* Supporting Row & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 max-w-5xl"
          >
            <p
              className="text-sm sm:text-base leading-relaxed max-w-md"
              style={{ color: "var(--text-secondary)" }}
            >
              An open, rigorous hardware laboratory. Real solderless breadboards, register-level C++ firmware, and exact circuit mathematics — without simulated shortcuts.
            </p>

            <div className="flex items-center gap-4 shrink-0">
              <Link href="/projects/led-blink" className="btn-primary">
                ENTER LAB WORKSPACE →
              </Link>
              <Link href="#circuit-bench" className="btn-ghost text-[0.65rem]">
                TEST BENCH
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
          aria-hidden="true"
        >
          <span className="label text-[10px]" style={{ color: "rgba(168,85,247,0.3)" }}>
            SCROLL TO ASSEMBLE
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="w-px h-10"
            style={{
              background: "linear-gradient(to bottom, rgba(168,85,247,0.6), transparent)",
            }}
          />
        </motion.div>
      </section>

      {/* ============= WOW MOMENT 2: SIGNAL CONDUIT BRIDGE ============= */}
      <CircuitSignalBridge />

      {/* ============= WOW MOMENT 3: OLD vs NEW WAY ============= */}
      <OldVsNewSection />

      {/* ============= WOW MOMENT 4: INTERACTIVE HARDWARE BENCH ============= */}
      <div id="circuit-bench">
        <ScrollCircuitLab />
      </div>

      {/* ============= LAB MISSIONS ============= */}
      <section id="projects" className="relative">
        {/* Section header */}
        <div
          className="px-6 sm:px-10 lg:px-14 py-16 flex items-end justify-between"
          style={{ borderBottom: "1px solid rgba(168,85,247,0.1)" }}
        >
          <ScrollIn>
            <div className="flex flex-col gap-3">
              <p className="label flex items-center gap-2" style={{ color: "var(--purple-bright)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                VERIFIED HARDWARE MISSIONS // REPOSITORY
              </p>
              <h2 className="display-md" style={{ color: "var(--text-primary)" }}>
                The Laboratory Modules
              </h2>
            </div>
          </ScrollIn>

          <ScrollIn delay={0.15} direction="right">
            <div className="hidden sm:flex flex-col items-end gap-1 font-mono text-xs text-zinc-400">
              <span className="text-purple-300 font-bold">{projectsData.length} ACTIVE EXPERIMENTS</span>
              <span className="text-zinc-600">100% SOLDERLESS VERIFIED</span>
            </div>
          </ScrollIn>
        </div>

        {/* Project rows */}
        <div>
          {projectsData.map((project, idx) => (
            <ProjectRow key={project.id} project={project} index={idx} />
          ))}
        </div>

        <div className="h-px" style={{ backgroundColor: "rgba(168,85,247,0.08)" }} />
      </section>

      {/* ============= SKILL CONSTELLATION GRAPH ============= */}
      <SkillsSection />

      {/* ============= ROADMAP ============= */}
      <RoadmapSection />

      {/* ============= CONTACT / CTA ============= */}
      <section
        className="relative px-6 sm:px-10 lg:px-14 py-32 sm:py-44 overflow-hidden"
        style={{ borderTop: "1px solid rgba(168,85,247,0.1)" }}
      >
        <GlowBackground variant="lab" />
        <ParticleCanvas count={35} className="z-0" />

        <ScrollIn className="relative z-10">
          <div className="max-w-3xl">
            <p className="label mb-6 flex items-center gap-2" style={{ color: "var(--purple-bright)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              OPEN HARDWARE PLATFORM
            </p>
            <h2 className="display-lg mb-8" style={{ color: "var(--text-primary)" }}>
              Have suggestions,{" "}
              <span className="gradient-text">feedback,</span>
              <br />
              or want to collaborate?
            </h2>
            <p
              className="text-sm sm:text-base leading-relaxed mb-12 max-w-md"
              style={{ color: "var(--text-secondary)" }}
            >
              Found a circuit bug? Want to contribute an experimental module? Reach out — this is an open educational lab built for aspiring roboticists.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/contact" className="btn-primary">
                GET IN TOUCH →
              </Link>
              <a
                href="https://github.com/A-941/arduino-robotics-journey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium transition-colors hover:text-purple-300 text-zinc-400"
              >
                Contribute on GitHub ↗
              </a>
            </div>
          </div>
        </ScrollIn>
      </section>
    </div>
  );
}
