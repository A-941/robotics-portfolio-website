import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cpu, Sparkles, Code, CircuitBoard, Layers, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { projectsData } from "@/data/projectsData";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillsSection } from "@/components/SkillsSection";
import { RoadmapSection } from "@/components/RoadmapSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-zinc-800/80">
        {/* Glow background effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-purple-500/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Hero copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-medium backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                <span>Hardware & Robotics Learning Journey</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Bridging <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">AI & Embedded Hardware</span> from Scratch
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Hi, I'm <strong className="text-white font-semibold">Dhruv</strong> — a 2nd-year Computer Science student learning electronics and physical computing from the ground up. My long-term mission is merging computer vision and edge AI with autonomous physical robotics.
              </p>

              <p className="text-sm text-zinc-400 max-w-xl mx-auto lg:mx-0">
                This platform documents every step with verified breadboard diagrams, genuine timing code, real video captures, and clear explanations designed for beginner engineers.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
                >
                  Explore Projects
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 transition-all hover:border-zinc-500"
                >
                  About My Path & Vision
                </Link>

                <a
                  href="https://github.com/A-941/arduino-robotics-journey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  GitHub Repository
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Right Col: Interactive Visual Badge / Banner */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 backdrop-blur-md shadow-2xl shadow-cyan-500/5 group">
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800/80">
                  <Image
                    src="/images/banner.jpg"
                    alt="Arduino & Robotics Portfolio Banner"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-zinc-950/90 border border-zinc-800 backdrop-blur-md">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-cyan-400 font-medium">Arduino Uno R3</span>
                      <span className="text-zinc-400">Atmel ATmega328P</span>
                    </div>
                    <p className="text-[11px] text-zinc-300 mt-1">
                      16 MHz Clock • 5V Logic • 14 Digital I/O Pins • Physical Prototyping
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                  <div className="p-2.5 rounded-lg bg-zinc-950/70 border border-zinc-800/80">
                    <div className="text-xl font-extrabold text-white">2</div>
                    <div className="text-[11px] text-zinc-400">Verified Projects</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-950/70 border border-zinc-800/80">
                    <div className="text-xl font-extrabold text-cyan-400">100%</div>
                    <div className="text-[11px] text-zinc-400">Real Hardware Demos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 mb-2 inline-block">
              Hands-On Projects
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Documented Hardware Builds
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              Each project features verified physical breadboard wiring, video recordings, mathematical derivations, and battle-tested C++ firmware.
            </p>
          </div>

          <div className="text-xs text-zinc-400 font-mono flex items-center gap-1.5 self-start sm:self-end">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Scalable repository — new projects added regularly
          </div>
        </div>

        {/* Scalable Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <SkillsSection />

      {/* Roadmap Section */}
      <RoadmapSection />
    </div>
  );
}
