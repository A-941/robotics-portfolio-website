"use client";

import React, { useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight, Cpu, Film, ExternalLink, BookOpen } from "lucide-react";
import { Project } from "@/data/projectsData";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), { stiffness: 150, damping: 20 });
  const glareX = useTransform(mouseX, [0, 1], ["-60%", "160%"]);
  const glareY = useTransform(mouseY, [0, 1], ["-60%", "160%"]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 800,
        backgroundColor: "#080612",
        borderColor: "rgba(168, 85, 247, 0.15)",
      }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group relative rounded-2xl border flex flex-col overflow-hidden transition-all duration-300 cursor-pointer"
    >
      {/* Dynamic light sweep */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl overflow-hidden"
        style={{
          background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(168,85,247,0.08) 0%, transparent 65%)`,
        }}
      />

      {/* Top Accent Line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Thumbnail / Circuit Preview */}
      <div
        className="relative w-full aspect-[16/10] overflow-hidden border-b"
        style={{
          backgroundColor: "#040208",
          borderColor: "rgba(168, 85, 247, 0.12)",
        }}
      >
        <Image
          src={project.circuitBreadboardImage || project.thumbnail}
          alt={project.title}
          fill
          className="object-contain p-3.5 transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 550px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080612] via-transparent to-transparent pointer-events-none" />

        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span
            className="label px-2.5 py-1 rounded text-xs border"
            style={{
              backgroundColor: "rgba(6, 4, 13, 0.85)",
              borderColor: "rgba(168, 85, 247, 0.3)",
              color: "#c084fc",
            }}
          >
            {project.badge}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <span
            className="label px-2.5 py-1 rounded text-[10px] border flex items-center gap-1.5"
            style={{
              backgroundColor: "rgba(6, 4, 13, 0.85)",
              borderColor: "rgba(168, 85, 247, 0.2)",
              color: "var(--text-secondary)",
            }}
          >
            <Film className="w-3 h-3 text-purple-400" />
            LIVE VERIFIED
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 sm:p-7 flex flex-col flex-grow">
        <div className="flex items-center gap-2 label text-xs mb-2.5" style={{ color: "var(--purple-bright)" }}>
          <Cpu className="w-3.5 h-3.5 text-purple-400" />
          <span>{project.category}</span>
        </div>

        <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors mb-3 leading-snug">
          {project.title}
        </h3>

        <p className="text-sm leading-relaxed mb-5 flex-grow" style={{ color: "var(--text-secondary)" }}>
          {project.shortDescription}
        </p>

        {/* Technical Concepts Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.slice(0, 4).map((tag, idx) => (
            <span
              key={idx}
              className="label text-[10px] px-2 py-0.5 rounded border"
              style={{
                color: "var(--text-secondary)",
                borderColor: "rgba(168, 85, 247, 0.12)",
                backgroundColor: "rgba(168, 85, 247, 0.03)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div
          className="pt-4 border-t flex items-center justify-between mt-auto"
          style={{ borderColor: "rgba(168, 85, 247, 0.1)" }}
        >
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-purple-300 hover:text-white transition-all group-hover:translate-x-1"
          >
            <BookOpen className="w-4 h-4 text-purple-400" />
            Enter Mission Lab
            <ArrowRight className="w-4 h-4 text-purple-400" />
          </Link>

          <a
            href={project.githubFolderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="label text-xs hover:text-purple-300 flex items-center gap-1 transition-colors"
            style={{ color: "var(--text-subtle)" }}
            title="View sketch code on GitHub"
          >
            <span>CODE</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};
