"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cpu, Film, ExternalLink } from "lucide-react";
import { Project } from "@/data/projectsData";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900/80 transition-all duration-300 hover:border-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col overflow-hidden backdrop-blur-sm">
      {/* Thumbnail */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-950 border-b border-zinc-800/80">
        <Image
          src={project.circuitBreadboardImage || project.thumbnail}
          alt={project.title}
          fill
          className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
        />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 backdrop-blur-md">
            {project.badge}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <span className="px-2 py-1 rounded-md text-[11px] font-medium bg-black/70 text-emerald-300 border border-emerald-500/30 backdrop-blur-md flex items-center gap-1">
            <Film className="w-3 h-3 text-emerald-400" />
            Video Demo
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>{project.category}</span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-zinc-100 group-hover:text-cyan-300 transition-colors mb-2.5 line-clamp-1">
          {project.title}
        </h3>

        <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
          {project.shortDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.slice(0, 4).map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium text-zinc-300 bg-zinc-800/80 border border-zinc-700/60 px-2.5 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="text-[11px] font-medium text-zinc-500 px-1.5 py-0.5">
              +{project.tags.length - 4} more
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between mt-auto">
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-all group-hover:translate-x-1"
          >
            Explore Project
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={project.githubFolderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
            title="View source on GitHub"
          >
            GitHub
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
