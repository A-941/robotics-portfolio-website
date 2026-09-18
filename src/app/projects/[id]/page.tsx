import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Cpu,
  Calculator,
  Binary,
  Code,
  Film,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  Zap,
} from "lucide-react";
import { projectsData } from "@/data/projectsData";
import { CodeBlock } from "@/components/CodeBlock";
import { CircuitViewer } from "@/components/CircuitViewer";
import { VideoPlayer } from "@/components/VideoPlayer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GlowBackground } from "@/components/GlowBackground";

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
  if (!project) return { title: "Mission Not Found" };

  return {
    title: `${project.title} | Robotics Lab Workspace`,
    description: project.shortDescription,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const currentIndex = projectsData.findIndex((p) => p.id === id);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];
  const missionCode = `MISSION_00${currentIndex + 1}`;

  return (
    <div className="min-h-screen pt-24 pb-24 relative overflow-hidden" style={{ backgroundColor: "var(--bg)" }}>
      {/* Background Lighting & Grid */}
      <GlowBackground variant="lab" />

      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 space-y-16 relative z-10">
        {/* Mission Dossier Breadcrumb */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b"
          style={{ borderColor: "rgba(168, 85, 247, 0.12)" }}
        >
          <Link
            href="/#projects"
            className="label transition-colors hover:text-purple-300 flex items-center gap-1.5"
            style={{ color: "var(--text-secondary)" }}
          >
            ← ALL MISSIONS
          </Link>
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM_BUS: 5.0V ACTIVE
            </span>
            <span className="text-purple-500/30">|</span>
            <span className="text-purple-300/60">{missionCode}</span>
          </div>
        </div>

        {/* Mission Header */}
        <ScrollReveal>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="label px-3 py-1.5 border rounded flex items-center gap-2"
                style={{
                  color: "#c084fc",
                  borderColor: "rgba(168, 85, 247, 0.35)",
                  backgroundColor: "rgba(168, 85, 247, 0.08)",
                }}
              >
                <Zap className="w-3 h-3 text-purple-400" />
                {missionCode} // {project.badge}
              </span>
              <span className="label" style={{ color: "var(--text-subtle)" }}>
                DOMAIN: {project.category}
              </span>
              <span className="label text-purple-400/50">
                DATE: {project.date}
              </span>
            </div>

            <h1 className="display-lg text-white">
              {project.title}
            </h1>

            <p
              className="text-base sm:text-lg leading-relaxed max-w-3xl"
              style={{ color: "var(--text-secondary)" }}
            >
              {project.fullDescription}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="label px-3 py-1.5 border rounded"
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
          </div>
        </ScrollReveal>

        {/* Section 1: Bill of Materials */}
        <ScrollReveal delay={0.05}>
          <section
            className="rounded-2xl border p-6 sm:p-8 space-y-6 relative overflow-hidden"
            style={{
              backgroundColor: "#080612",
              borderColor: "rgba(168, 85, 247, 0.15)",
            }}
          >
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-purple-500/10">
              <div>
                <span className="label block mb-1" style={{ color: "var(--purple-bright)" }}>
                  HARDWARE INVENTORY
                </span>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Bill of Materials (BOM)
                </h2>
              </div>
              <span className="label" style={{ color: "var(--text-subtle)" }}>
                {project.components.length} ITEMS LOGGED
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-purple-500/10 font-mono text-xs text-purple-400/60 uppercase">
                  <tr>
                    <th className="py-3 px-2">Component Identifier</th>
                    <th className="py-3 px-4">Qty</th>
                    <th className="py-3 px-2">Role in Circuit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-500/10">
                  {project.components.map((comp, idx) => (
                    <tr key={idx} className="hover:bg-purple-950/20 transition-colors">
                      <td className="py-3.5 px-2 font-medium text-white flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50" />
                        {comp.name}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-purple-300">
                        {comp.quantity}
                      </td>
                      <td className="py-3.5 px-2 text-xs sm:text-sm" style={{ color: "var(--text-secondary)" }}>
                        {comp.purpose}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </ScrollReveal>

        {/* Section 2: Breadboard Physical Layout */}
        <ScrollReveal delay={0.08}>
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="label block mb-1" style={{ color: "var(--purple-bright)" }}>
                  PHYSICAL INSPECTION BENCH
                </span>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Breadboard &amp; Schematic Routing
                </h2>
              </div>
              <span className="label" style={{ color: "var(--text-subtle)" }}>
                TINKERCAD SPEC
              </span>
            </div>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Exact solderless breadboard orientation, jumper wire paths, and pin connection topology.
            </p>

            <CircuitViewer
              breadboardImage={project.circuitBreadboardImage}
              schematicImage={project.circuitImage}
              title={project.title}
              caption={`Physical hardware layout for ${project.title}. Red/purple traces = 5V digital logic signals; black/blue traces = ground return rails.`}
            />
          </section>
        </ScrollReveal>

        {/* Section 3: Step-by-Step Wiring Execution */}
        <section
          className="rounded-2xl border p-6 sm:p-8 space-y-6"
          style={{
            backgroundColor: "#080612",
            borderColor: "rgba(168, 85, 247, 0.15)",
          }}
        >
          <div className="flex items-center gap-2.5 pb-4 border-b border-purple-500/10">
            <Cpu className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              Wiring Execution Protocol
            </h2>
          </div>

          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Execute these connections sequentially. Verify that USB power is disconnected while inserting jumper wires into tie-point rows.
          </p>

          <div className="grid grid-cols-1 gap-3.5">
            {project.wiringSteps.map((step) => (
              <div
                key={step.step}
                className="flex items-start gap-4 p-4 rounded-xl border transition-all"
                style={{
                  backgroundColor: "rgba(12, 8, 26, 0.6)",
                  borderColor: "rgba(168, 85, 247, 0.12)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm shrink-0 mt-0.5 border"
                  style={{
                    backgroundColor: "rgba(168, 85, 247, 0.15)",
                    borderColor: "rgba(168, 85, 247, 0.35)",
                    color: "#f0ebff",
                  }}
                >
                  {step.step}
                </div>
                <div className="space-y-1.5 flex-grow">
                  <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold">
                    <span className="text-white">{step.from}</span>
                    <span className="text-purple-400">⟶</span>
                    <span className="text-purple-200">{step.to}</span>
                    <span
                      className="text-[11px] font-mono px-2 py-0.5 rounded border ml-auto"
                      style={{
                        backgroundColor: "rgba(168, 85, 247, 0.08)",
                        borderColor: "rgba(168, 85, 247, 0.2)",
                        color: "var(--purple-bright)",
                      }}
                    >
                      {step.wireColor}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Relevant Calculation / Scientific Explanation */}
        <section
          className="rounded-2xl border p-6 sm:p-8 space-y-6"
          style={{
            backgroundColor: "#080612",
            borderColor: "rgba(168, 85, 247, 0.15)",
          }}
        >
          <div className="flex items-center gap-2.5 pb-4 border-b border-purple-500/10">
            {project.theoryContent.truthTable ? (
              <Binary className="w-5 h-5 text-purple-400" />
            ) : (
              <Calculator className="w-5 h-5 text-purple-400" />
            )}
            <h2 className="text-xl font-bold text-white tracking-tight">
              {project.theoryTitle}
            </h2>
          </div>

          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-white">
              {project.theoryContent.heading}
            </h3>

            {project.theoryContent.body.map((para, idx) => (
              <p key={idx} className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {para}
              </p>
            ))}

            {/* Formula Block if applicable */}
            {project.theoryContent.formula && (
              <div
                className="p-5 rounded-xl border relative overflow-hidden"
                style={{
                  backgroundColor: "rgba(14, 10, 30, 0.8)",
                  borderColor: "rgba(168, 85, 247, 0.3)",
                }}
              >
                <div className="label text-[10px] mb-1.5" style={{ color: "var(--purple-bright)" }}>
                  MATHEMATICAL PRINCIPLE
                </div>
                <div className="font-mono text-lg sm:text-xl font-bold text-white">
                  {project.theoryContent.formula}
                </div>
              </div>
            )}

            {/* Formula Breakdown Table */}
            {project.theoryContent.formulaBreakdown && (
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="border-b border-purple-500/10 font-mono text-purple-400/60 uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-3">Symbol</th>
                      <th className="py-2.5 px-3">Physical Quantity</th>
                      <th className="py-2.5 px-3">Nominal Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-500/10 font-mono">
                    {project.theoryContent.formulaBreakdown.map((item, idx) => (
                      <tr key={idx} className="hover:bg-purple-950/20">
                        <td className="py-2.5 px-3 font-semibold text-purple-300">{item.symbol}</td>
                        <td className="py-2.5 px-3 font-sans" style={{ color: "var(--text-secondary)" }}>{item.meaning}</td>
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
                  <h4 className="text-sm font-semibold text-white">
                    4-Bit Binary Truth Table &amp; Pin State Mapping (0 to 15)
                  </h4>
                  <span className="label" style={{ color: "var(--purple-bright)" }}>2⁴ = 16 STATES</span>
                </div>
                <div
                  className="overflow-x-auto rounded-xl border"
                  style={{
                    backgroundColor: "#05030a",
                    borderColor: "rgba(168, 85, 247, 0.15)",
                  }}
                >
                  <table className="w-full text-center text-xs">
                    <thead className="border-b border-purple-500/10 font-mono text-purple-300 uppercase">
                      <tr>
                        {project.theoryContent.truthTable.headers.map((h, idx) => (
                          <th key={idx} className="py-2.5 px-3 text-xs">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-500/10 font-mono">
                      {project.theoryContent.truthTable.rows.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          className="hover:bg-purple-950/30 transition-colors"
                        >
                          <td className="py-2 px-3 font-bold text-white">{row[0]}</td>
                          <td className="py-2 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] ${
                                row[1] === 1 ? "bg-purple-500/25 text-purple-200 font-bold border border-purple-500/40" : "text-zinc-600"
                              }`}
                            >
                              {row[1]}
                            </span>
                          </td>
                          <td className="py-2 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] ${
                                row[2] === 1 ? "bg-purple-500/25 text-purple-200 font-bold border border-purple-500/40" : "text-zinc-600"
                              }`}
                            >
                              {row[2]}
                            </span>
                          </td>
                          <td className="py-2 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] ${
                                row[3] === 1 ? "bg-purple-500/25 text-purple-200 font-bold border border-purple-500/40" : "text-zinc-600"
                              }`}
                            >
                              {row[3]}
                            </span>
                          </td>
                          <td className="py-2 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] ${
                                row[4] === 1 ? "bg-purple-500/25 text-purple-200 font-bold border border-purple-500/40" : "text-zinc-600"
                              }`}
                            >
                              {row[4]}
                            </span>
                          </td>
                          <td className="py-2 px-3 font-bold text-cyan-300">{row[5]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Section 5: Firmware Source Code Block */}
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-2.5">
              <Code className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold text-white tracking-tight">
                Verified Firmware Source Code
              </h2>
            </div>
            <a
              href={project.githubFolderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="label transition-colors hover:text-purple-300 flex items-center gap-1.5"
              style={{ color: "var(--text-secondary)" }}
            >
              RAW SOURCE ON GITHUB
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Embedded C++ sketch verified on ATmega328P hardware with precise microsecond timing and register pin assignment.
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
            <Film className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              Physical Hardware Execution
            </h2>
          </div>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Continuous hardware run recorded directly from the breadboard test setup.
          </p>

          <VideoPlayer
            src={project.videoSrc}
            title={`${project.title} — Live Lab Run`}
            caption="Recorded from the physical hardware setup under USB power rail."
          />
        </section>

        {/* Section 7: Key Engineering Insights */}
        <section
          className="rounded-2xl border p-6 sm:p-8 space-y-5"
          style={{
            backgroundColor: "#080612",
            borderColor: "rgba(168, 85, 247, 0.15)",
          }}
        >
          <div className="flex items-center gap-2.5 pb-3 border-b border-purple-500/10">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              Key Engineering Insights
            </h2>
          </div>

          <div className="space-y-3.5">
            {project.whatILearned.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3.5 text-sm sm:text-base">
                <span className="w-2 h-2 rounded-full bg-purple-400 mt-2 shrink-0 shadow-sm shadow-purple-400" />
                <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 8: Hardware Pitfalls (Warm Orange Accent) */}
        <section
          className="rounded-2xl border p-6 sm:p-8 space-y-5"
          style={{
            backgroundColor: "rgba(20, 10, 8, 0.4)",
            borderColor: "rgba(249, 115, 22, 0.25)",
            boxShadow: "0 0 40px -10px rgba(249, 115, 22, 0.08)",
          }}
        >
          <div className="flex items-center gap-2.5 pb-3 border-b border-orange-500/20">
            <ShieldAlert className="w-5 h-5 text-orange-400" />
            <h2 className="text-xl font-bold text-orange-200 tracking-tight">
              Hardware Pitfalls &amp; Debugging Field Notes
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-orange-300/70">
            Critical hardware traps that cause component burnout or erratic logic states during physical assembly:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.beginnerTips.map((tip, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border space-y-2"
                style={{
                  backgroundColor: "rgba(10, 6, 8, 0.9)",
                  borderColor: "rgba(249, 115, 22, 0.2)",
                }}
              >
                <div className="flex items-center gap-2 text-sm font-bold text-orange-300 font-mono">
                  <span>{tip.title}</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {tip.tip}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Switcher */}
        <div
          className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(168, 85, 247, 0.12)" }}
        >
          <Link
            href="/#projects"
            className="label transition-colors hover:text-purple-300"
            style={{ color: "var(--text-secondary)" }}
          >
            ← RETURN TO LAB DIRECTORY
          </Link>

          {nextProject && (
            <Link
              href={`/projects/${nextProject.id}`}
              className="btn-primary"
            >
              NEXT MISSION: {nextProject.title}
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
