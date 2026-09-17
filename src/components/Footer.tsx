import React from "react";
import Link from "next/link";
import { Mail, Cpu, ArrowUpRight, BookOpen, GitBranch } from "lucide-react";
import { GithubIcon } from "@/components/Icons";

export const Footer = () => {
  return (
    <footer className="border-t border-zinc-800/80 bg-[#060609] text-zinc-400 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Col 1: Platform Purpose */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight">
                Robotics Learning Lab
              </span>
            </div>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
              An open-source educational platform dedicated to teaching practical electrical engineering, Arduino firmware, and embedded robotics with working circuits, verified timing code, and zero guesswork.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Open educational hardware reference • MIT Licensed
            </div>
          </div>

          {/* Col 2: Tutorials & Pages */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
              Tutorials & Modules
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/projects/led-blink" className="hover:text-cyan-400 transition-colors">
                  01: LED Blink & Ohm's Law
                </Link>
              </li>
              <li>
                <Link href="/projects/binary-counter" className="hover:text-cyan-400 transition-colors">
                  02: 4-LED Binary Counter
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">
                  Resource Guide & Philosophy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hardware Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
              Source & Hardware Lab
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/A-941/arduino-robotics-journey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <GithubIcon className="w-4 h-4 text-cyan-400" />
                  <span>Arduino Firmware Repo</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/A-941"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <GitBranch className="w-4 h-4 text-zinc-400" />
                  <span>GitHub Organization (@A-941)</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:dhruv.makwana.dev@gmail.com"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>Contact / Collaboration</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom subtle bar: the ONLY place the name appears, subtle and small */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            Curated and maintained by <span className="text-zinc-400">Dhruv</span> • Open-source educational hardware resource.
          </p>
          <p className="flex items-center gap-1 text-zinc-500">
            Powered by Next.js, Motion & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};
