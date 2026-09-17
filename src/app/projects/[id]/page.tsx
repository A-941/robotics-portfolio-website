import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Layers,
  Calculator,
  Binary,
  Code,
  Film,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { projectsData, Project } from "@/data/projectsData";
import { CodeBlock } from "@/components/CodeBlock";
import { CircuitViewer } from "@/components/CircuitViewer";
import { VideoPlayer } from "@/components/VideoPlayer";
import { ScrollReveal } from "@/components/ScrollReveal";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Robotics & Arduino Lab Guide`,
    description: project.shortDescription,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  // Find other projects for next/prev navigation
  const currentIndex = projectsData.findIndex((p) => p.id === id);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between gap-4 border-b border-zinc-800 pb-4 text-xs sm:text-sm text-zinc-400">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Projects
          </Link>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-zinc-500">Projects</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-zinc-300">{project.badge}</span>
          </div>
        </div>

        {/* Project Header */}
        <ScrollReveal>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              {project.badge}
            </span>
            <span className="text-xs text-zinc-400">•</span>
            <span className="text-xs text-zinc-400">{project.category}</span>
            <span className="text-xs text-zinc-400">•</span>
            <span className="text-xs text-zinc-500">{project.date}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-3xl">
            {project.fullDescription}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-md text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        </ScrollReveal>

        {/* Section 1: Components Used */}
        <ScrollReveal delay={0.05}>
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-sm">
          <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-zinc-800/80">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Bill of Materials &amp; Components</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs text-zinc-400 uppercase bg-zinc-950/60 border-b border-zinc-800">
                <tr>
                  <th className="py-3 px-4 rounded-l-lg">Component</th>
                  <th className="py-3 px-4">Qty</th>
                  <th className="py-3 px-4 rounded-r-lg">Circuit Role / Specification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {project.components.map((comp, idx) => (
                  <tr key={idx} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-zinc-200">{comp.name}</td>
                    <td className="py-3.5 px-4 font-mono text-cyan-400 font-medium">{comp.quantity}</td>
                    <td className="py-3.5 px-4 text-zinc-400">{comp.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        </ScrollReveal>

        {/* Section 2: Colorful Breadboard Circuit Diagram */}
        <ScrollReveal delay={0.08}>
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Physical Breadboard Layout</h2>
          </div>
          <p className="text-sm text-zinc-400">
            Rendered in full-color Tinkercad visual style. Shows the physical breadboard orientation, jumper wire paths, and pin connections. Click the image to view in high resolution.
          </p>

          <CircuitViewer
            breadboardImage={project.circuitBreadboardImage}
            schematicImage={project.circuitImage}
            title={project.title}
            caption={`Tinkercad-style physical layout for ${project.title}. Red/colored wires represent digital pin signals, black wires represent GND return paths.`}
          />
        </section>
        </ScrollReveal>

        {/* Section 3: Step-by-Step Wiring Explanation */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-sm space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-800/80">
            <Cpu className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Step-by-Step Wiring Guide</h2>
          </div>

          <p className="text-sm text-zinc-300">
            Follow these connections in order on your solderless breadboard. Ensure the Arduino is unplugged from power while seating components.
          </p>

          <div className="grid grid-cols-1 gap-4">
            {project.wiringSteps.map((step) => (
              <div
                key={step.step}
                className="flex items-start gap-4 p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 hover:border-zinc-700 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                  {step.step}
                </div>
                <div className="space-y-1 flex-grow">
                  <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold">
                    <span className="text-white">{step.from}</span>
                    <span className="text-zinc-500">⟶</span>
                    <span className="text-cyan-300">{step.to}</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 ml-auto">
                      {step.wireColor}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Relevant Calculation / Logic Explanation */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-sm space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-800/80">
            {project.theoryContent.truthTable ? (
              <Binary className="w-5 h-5 text-amber-400" />
            ) : (
              <Calculator className="w-5 h-5 text-amber-400" />
            )}
            <h2 className="text-xl sm:text-2xl font-bold text-white">{project.theoryTitle}</h2>
          </div>

          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-zinc-100">
              {project.theoryContent.heading}
            </h3>

            {project.theoryContent.body.map((para, idx) => (
              <p key={idx} className="text-sm text-zinc-300 leading-relaxed">
                {para}
              </p>
            ))}

            {/* Formula Block if applicable */}
            {project.theoryContent.formula && (
              <div className="p-4 sm:p-5 rounded-xl bg-zinc-950 border border-amber-500/30 shadow-inner">
                <div className="text-xs uppercase tracking-wider font-semibold text-amber-400 mb-1">
                  Core Formula
                </div>
                <div className="font-mono text-base sm:text-lg font-bold text-white">
                  {project.theoryContent.formula}
                </div>
              </div>
            )}

            {/* Formula Breakdown Table */}
            {project.theoryContent.formulaBreakdown && (
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-zinc-950/60 border-b border-zinc-800 text-zinc-400 uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-3">Variable</th>
                      <th className="py-2.5 px-3">Description</th>
                      <th className="py-2.5 px-3">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/50 font-mono">
                    {project.theoryContent.formulaBreakdown.map((item, idx) => (
                      <tr key={idx} className="hover:bg-zinc-800/20">
                        <td className="py-2.5 px-3 font-semibold text-amber-300">{item.symbol}</td>
                        <td className="py-2.5 px-3 text-zinc-300 font-sans">{item.meaning}</td>
                        <td className="py-2.5 px-3 text-cyan-300">{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Truth Table for Binary Counter */}
            {project.theoryContent.truthTable && (
              <div className="pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-zinc-200">
                    4-Bit Binary Truth Table & Pin State Mapping (0 to 15)
                  </h4>
                  <span className="text-xs text-zinc-400 font-mono">2⁴ = 16 States</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/80">
                  <table className="w-full text-center text-xs">
                    <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-300 uppercase font-mono">
                      <tr>
                        {project.theoryContent.truthTable.headers.map((h, idx) => (
                          <th key={idx} className="py-2.5 px-3 text-xs">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 font-mono">
                      {project.theoryContent.truthTable.rows.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          className={`hover:bg-zinc-800/30 transition-colors ${
                            rIdx % 2 === 0 ? "bg-zinc-950/30" : "bg-zinc-900/10"
                          }`}
                        >
                          <td className="py-2 px-3 font-bold text-zinc-100">{row[0]}</td>
                          <td className="py-2 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] ${
                                row[1] === 1 ? "bg-emerald-500/20 text-emerald-300 font-bold" : "text-zinc-600"
                              }`}
                            >
                              {row[1]}
                            </span>
                          </td>
                          <td className="py-2 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] ${
                                row[2] === 1 ? "bg-emerald-500/20 text-emerald-300 font-bold" : "text-zinc-600"
                              }`}
                            >
                              {row[2]}
                            </span>
                          </td>
                          <td className="py-2 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] ${
                                row[3] === 1 ? "bg-emerald-500/20 text-emerald-300 font-bold" : "text-zinc-600"
                              }`}
                            >
                              {row[3]}
                            </span>
                          </td>
                          <td className="py-2 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] ${
                                row[4] === 1 ? "bg-emerald-500/20 text-emerald-300 font-bold" : "text-zinc-600"
                              }`}
                            >
                              {row[4]}
                            </span>
                          </td>
                          <td className="py-2 px-3 font-bold text-cyan-400">{row[5]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Section 5: Syntax Highlighted Source Code Block */}
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-2.5">
              <Code className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">Arduino C++ Source Code</h2>
            </div>
            <a
              href={project.githubFolderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              View on GitHub
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-sm text-zinc-400">
            Production firmware running on the ATmega328P. Fully documented with pin declarations, logic comments, and setup routines.
          </p>

          <CodeBlock
            fileName={project.codeFileName}
            code={project.code}
            language="Arduino C++"
          />
        </section>

        {/* Section 6: Video Demo Embed */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2">
            <Film className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Hardware Execution Demo</h2>
          </div>
          <p className="text-sm text-zinc-400">
            Uncut recording of the physical circuit running live on the breadboard. Plays inline with mobile optimizations.
          </p>

          <VideoPlayer
            src={project.videoSrc}
            title={`${project.title} — Real Breadboard Demo`}
            caption="Recorded from the physical hardware setup powered via USB. Demonstrates accurate clock cycle delays and clean LED transitions."
          />
        </section>

        {/* Section 7: Key Engineering Takeaways & Circuit Insights */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-sm space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-800/80">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Key Engineering Takeaways & Circuit Insights</h2>
          </div>

          <div className="space-y-3">
            {project.whatILearned.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                <p className="leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: Common Mistakes / Tips for Beginners Callout Box */}
        <section className="rounded-2xl border border-amber-500/40 bg-amber-950/10 p-6 sm:p-8 backdrop-blur-sm space-y-5 shadow-lg shadow-amber-500/5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-amber-500/20">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-amber-200">
              Common Mistakes & Tips for Beginners
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-amber-300/80">
            Practical insights to save fellow engineering students hours of troubleshooting when wiring this circuit for the first time:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.beginnerTips.map((tip, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-zinc-950/80 border border-amber-500/20 space-y-2"
              >
                <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
                  <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>{tip.title}</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {tip.tip}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Project Switcher */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/#projects"
            className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            ← View All Projects
          </Link>

          {nextProject && (
            <Link
              href={`/projects/${nextProject.id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-zinc-900 hover:bg-zinc-800 text-cyan-400 hover:text-cyan-300 border border-zinc-700/80 transition-all hover:scale-102"
            >
              Next Project: {nextProject.title}
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
