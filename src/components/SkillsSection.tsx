import React from "react";
import { Cpu, Code2, Zap, Compass, CheckCircle2 } from "lucide-react";
import { skillsList } from "@/data/projectsData";

export const SkillsSection = () => {
  const getCategoryIcon = (category: string) => {
    if (category.includes("Embedded")) return <Cpu className="w-5 h-5 text-cyan-400" />;
    if (category.includes("Software")) return <Code2 className="w-5 h-5 text-purple-400" />;
    return <Zap className="w-5 h-5 text-amber-400" />;
  };

  return (
    <section id="skills" className="py-16 sm:py-24 border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30 mb-3">
            Core Competencies & Stack
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skills Demonstrated So Far
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-2xl">
            Practical hardware, digital logic, and embedded software skills acquired through hands-on breadboard prototyping and code implementation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {skillsList.map((skillGroup, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-sm hover:border-zinc-700 transition-all flex flex-col"
            >
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-zinc-800/80">
                {getCategoryIcon(skillGroup.category)}
                <h3 className="text-lg font-bold text-zinc-100">
                  {skillGroup.category}
                </h3>
              </div>

              <ul className="space-y-4 flex-grow">
                {skillGroup.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="group">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-sm font-semibold text-zinc-200 group-hover:text-cyan-300 transition-colors">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 shrink-0">
                        {item.level}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 pl-6 leading-relaxed">
                      {item.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
