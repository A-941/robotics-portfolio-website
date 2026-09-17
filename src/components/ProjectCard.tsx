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

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 150, damping: 20 });
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
      }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group relative rounded-2xl border border-zinc-800/90 bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col overflow-hidden backdrop-blur-md transition-colors duration-300 cursor-pointer"
    >
      {/* Dynamic glare effect */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl overflow-hidden"
        style={{
          background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.04) 0%, transparent 65%)`,
        }}
      />

      {/* Top Accent Line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Thumbnail / Circuit Preview */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-950 border-b border-zinc-800/80">
        <Image
          src={project.circuitBreadboardImage || project.thumbnail}
          alt={project.title}
          fill
          className="object-contain p-3.5 transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 550px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent pointer-events-none" />

        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 backdrop-blur-md shadow-sm">
            {project.badge}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-black/75 text-emerald-300 border border-emerald-500/30 backdrop-blur-md flex items-center gap-1.5 shadow-sm">
            <Film className="w-3 h-3 text-emerald-400" />
            Verified Hardware Run
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 sm:p-7 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400/90 mb-2.5">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>{project.category}</span>
        </div>

        <h3 className="text-xl font-bold text-zinc-100 group-hover:text-cyan-300 transition-colors mb-3 leading-snug">
          {project.title}
        </h3>

        <p className="text-zinc-400 text-sm leading-relaxed mb-5 flex-grow">
          {project.shortDescription}
        </p>

        {/* Technical Concepts Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.slice(0, 4).map((tag, idx) => (
            <motion.span
              key={idx}
              whileHover={{ scale: 1.06 }}
              className="text-[11px] font-mono text-zinc-300 bg-zinc-800/70 border border-zinc-700/50 px-2.5 py-0.5 rounded-md"
            >
              {tag}
            </motion.span>
          ))}
          {project.tags.length > 4 && (
            <span className="text-[11px] font-mono text-zinc-500 px-1.5 py-0.5">
              +{project.tags.length - 4} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between mt-auto">
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-all group-hover:translate-x-1"
          >
            <BookOpen className="w-4 h-4" />
            Step-by-Step Tutorial
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={project.githubFolderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-zinc-800/50"
            title="View sketch code on GitHub"
          >
            <span>Code</span>
            <ExternalLink className="w-3 h-3 text-zinc-500" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};
