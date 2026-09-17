"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { projectsData } from "@/data/projectsData";
import { SkillsSection } from "@/components/SkillsSection";
import { RoadmapSection } from "@/components/RoadmapSection";

/* =============================================
   STAGGER REVEAL COMPONENT
   ============================================= */
const Reveal = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* =============================================
   SCROLL REVEAL (viewport)
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
    direction === "up" ? { opacity: 0, y: 40 } :
    direction === "left" ? { opacity: 0, x: -40 } :
    { opacity: 0, x: 40 };
  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* =============================================
   PROJECT ROW — editorial alternating layout
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <article ref={ref} className="relative">
      {/* Horizontal rule */}
      <div
        className="h-px w-full"
        style={{ backgroundColor: "var(--border)" }}
      />

      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[520px] ${
          isEven ? "" : "lg:flex-row-reverse"
        }`}
      >
        {/* Image column */}
        <motion.div
          className={`relative overflow-hidden col-span-1 lg:col-span-7 ${
            isEven ? "" : "lg:order-2"
          }`}
          style={{ minHeight: "360px" }}
        >
          {/* Ghost number */}
          <div
            className="ghost-number absolute select-none pointer-events-none z-0"
            style={{
              right: isEven ? "-0.02em" : "auto",
              left: isEven ? "auto" : "-0.02em",
              bottom: "-0.1em",
              opacity: 0.03,
              fontSize: "clamp(5rem, 14vw, 12rem)",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>

          <motion.div
            className="absolute inset-0 cursor-explore"
            style={{ y: imageY }}
          >
            <Image
              src={project.circuitBreadboardImage || project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 58vw"
            />
            {/* Subtle overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, rgba(8,8,8,0.15) 0%, rgba(8,8,8,0.5) 100%)",
              }}
            />
          </motion.div>

          {/* Hover reveal: VIEW label */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          />
        </motion.div>

        {/* Text column */}
        <ScrollIn
          delay={0.1}
          className={`col-span-1 lg:col-span-5 flex flex-col justify-between px-8 py-10 lg:px-12 lg:py-14 ${
            isEven ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div>
            {/* Meta row */}
            <div className="flex items-center gap-4 mb-8">
              <span className="label" style={{ color: "var(--text-subtle)" }}>
                {String(index + 1).padStart(2, "0")} / {String(projectsData.length).padStart(2, "0")}
              </span>
              <div className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
              <span className="label" style={{ color: "var(--text-subtle)" }}>
                {project.date}
              </span>
            </div>

            {/* Category */}
            <p
              className="label mb-3"
              style={{ color: "var(--accent)" }}
            >
              {project.category}
            </p>

            {/* Title */}
            <h2
              className="display-md mb-6"
              style={{ color: "var(--text-primary)" }}
            >
              {project.title}
            </h2>

            {/* Description */}
            <p
              className="text-sm leading-relaxed mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              {project.shortDescription}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="label px-2.5 py-1.5 border"
                  style={{
                    color: "var(--text-subtle)",
                    borderColor: "var(--border)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-8">
            <Link
              href={`/projects/${project.id}`}
              className="group flex items-center gap-3"
            >
              <motion.span
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-sm font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                View Tutorial
              </motion.span>
              <motion.span
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ color: "var(--accent)", fontSize: "1.1em" }}
              >
                →
              </motion.span>
            </Link>
            <a
              href={project.githubFolderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="label transition-colors"
              style={{ color: "var(--text-subtle)" }}
            >
              Source ↗
            </a>
          </div>
        </ScrollIn>
      </div>
    </article>
  );
};

/* =============================================
   HOMEPAGE
   ============================================= */
export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  return (
    <div
      className="flex flex-col"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* ============= HERO ============= */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-end overflow-hidden"
        style={{ paddingBottom: "10vh" }}
      >
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
          aria-hidden="true"
        />

        {/* Top-right metadata block */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="absolute top-20 right-6 sm:right-10 lg:right-14 flex flex-col items-end gap-1"
          aria-hidden="true"
        >
          <span className="label" style={{ color: "var(--text-subtle)" }}>ECE / Embedded</span>
          <span className="label" style={{ color: "var(--text-subtle)" }}>Est. 2026</span>
          <span className="label flex items-center gap-1.5" style={{ color: "var(--text-subtle)" }}>
            <span
              className="w-1.5 h-1.5 rounded-full inline-block"
              style={{ backgroundColor: "#4ade80", animation: "pulse 2s infinite" }}
            />
            Open Source
          </span>
        </motion.div>

        {/* Accent dot — decorative */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5, ease: "backOut" }}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: "#e8ff00",
            top: "50%",
            left: "6px",
            transform: "translateY(-50%)",
          }}
          aria-hidden="true"
        />

        {/* Main hero content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative px-6 sm:px-10 lg:px-14 z-10"
        >
          {/* Overline label */}
          <Reveal delay={0.4}>
            <p className="label mb-6 sm:mb-8" style={{ color: "var(--text-subtle)" }}>
              Open Educational Resource — Arduino &amp; Embedded Systems
            </p>
          </Reveal>

          {/* Display headline — editorial, left-aligned */}
          <div className="overflow-hidden mb-2">
            <Reveal delay={0.7}>
              <h1
                className="display-xl"
                style={{
                  color: "var(--text-primary)",
                  maxWidth: "16ch",
                }}
              >
                Hardware,
              </h1>
            </Reveal>
          </div>
          <div className="overflow-hidden mb-8 sm:mb-12">
            <Reveal delay={0.9}>
              <h1
                className="display-xl pl-[12vw] sm:pl-[18vw]"
                style={{
                  color: "var(--accent)",
                  maxWidth: "100%",
                }}
              >
                From First Principles.
              </h1>
            </Reveal>
          </div>

          {/* Supporting text + CTA in a row */}
          <Reveal delay={1.4}>
            <div className="flex flex-col sm:flex-row sm:items-end gap-8 sm:gap-16 max-w-4xl">
              <p
                className="text-sm sm:text-base leading-relaxed max-w-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                An open, first-principles learning hub. Real breadboards, verified firmware, 
                exact resistor math — without skipping steps.
              </p>

              <div className="flex flex-col gap-4 sm:gap-3 shrink-0">
                <a
                  href="#projects"
                  className="flex items-center gap-3 group"
                >
                  <motion.div
                    className="w-10 h-10 rounded-full border flex items-center justify-center shrink-0"
                    style={{ borderColor: "var(--accent)" }}
                    whileHover={{ scale: 1.1, backgroundColor: "var(--accent)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <span style={{ color: "#000", fontSize: "1rem" }}>↓</span>
                  </motion.div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Explore tutorials
                  </span>
                </a>

                <a
                  href="https://github.com/A-941/arduino-robotics-journey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <div
                    className="w-10 h-10 rounded-full border flex items-center justify-center shrink-0"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </div>
                  <span
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    View source
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        </motion.div>

        {/* Bottom scroll indicator */}
        <Reveal delay={2.0}>
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            aria-hidden="true"
          >
            <span className="label" style={{ color: "var(--text-subtle)" }}>
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-px h-10"
              style={{ backgroundColor: "var(--text-subtle)" }}
            />
          </div>
        </Reveal>
      </section>

      {/* ============= SELECTED WORK ============= */}
      <section id="projects">
        {/* Section header */}
        <div
          className="px-6 sm:px-10 lg:px-14 py-16 flex items-end justify-between border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <ScrollIn>
            <div className="flex flex-col gap-2">
              <p className="label" style={{ color: "var(--text-subtle)" }}>
                Selected Work
              </p>
              <h2
                className="display-md"
                style={{ color: "var(--text-primary)" }}
              >
                Lab Modules
              </h2>
            </div>
          </ScrollIn>

          <ScrollIn delay={0.15} direction="right">
            <p
              className="label hidden sm:block text-right"
              style={{ color: "var(--text-subtle)" }}
            >
              {projectsData.length} Active Tutorials
              <br />
              100% Verified Hardware
            </p>
          </ScrollIn>
        </div>

        {/* Project rows */}
        <div>
          {projectsData.map((project, idx) => (
            <ProjectRow key={project.id} project={project} index={idx} />
          ))}
        </div>

        {/* Final rule */}
        <div className="h-px" style={{ backgroundColor: "var(--border)" }} />
      </section>

      {/* ============= CURRICULUM ============= */}
      <SkillsSection />

      {/* ============= ROADMAP ============= */}
      <RoadmapSection />

      {/* ============= CONTACT CTA ============= */}
      <section
        className="relative px-6 sm:px-10 lg:px-14 py-32 sm:py-40 overflow-hidden"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        {/* Ghost text background */}
        <div
          className="ghost-number absolute bottom-0 right-0 leading-none select-none pointer-events-none"
          aria-hidden="true"
          style={{ opacity: 0.025 }}
        >
          ↗
        </div>

        <ScrollIn>
          <div className="max-w-3xl">
            <p className="label mb-6" style={{ color: "var(--text-subtle)" }}>
              Get in touch
            </p>
            <h2
              className="display-lg mb-8"
              style={{ color: "var(--text-primary)" }}
            >
              Questions, feedback,
              <br />
              or collaboration?
            </h2>
            <p
              className="text-sm sm:text-base leading-relaxed mb-12 max-w-md"
              style={{ color: "var(--text-secondary)" }}
            >
              Found a circuit error? Want to contribute a module? Just curious?
              Reach out — this is an open resource built for learners.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 group"
              >
                <motion.div
                  className="px-6 py-3 font-semibold text-sm"
                  style={{
                    backgroundColor: "#e8ff00",
                    color: "#000",
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  Get in touch →
                </motion.div>
              </Link>
              <a
                href="https://github.com/A-941/arduino-robotics-journey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium transition-colors"
                style={{ color: "var(--text-secondary)" }}
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
