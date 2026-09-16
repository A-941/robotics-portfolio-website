import React from "react";
import Link from "next/link";
import { Mail, Cpu, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";

export const Footer = () => {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 text-zinc-400 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Col 1: Bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-lg">Dhruv Makwana</span>
            </div>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
              2nd-year Computer Science student learning embedded systems and robotics from first principles alongside AI/ML studies. Focused on edge AI, sensor networks, and autonomous robotics.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Dual purpose: Personal journey + open learning reference for ECE beginners
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects/led-blink" className="hover:text-cyan-400 transition-colors">
                  Project 01: LED Blink
                </Link>
              </li>
              <li>
                <Link href="/projects/binary-counter" className="hover:text-cyan-400 transition-colors">
                  Project 02: 4-LED Binary Counter
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">
                  About Dhruv & Vision
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Connect */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
              Connect & Source
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/A-941"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <GithubIcon className="w-4 h-4 text-zinc-400" />
                  <span>GitHub (@A-941)</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/A-941/arduino-robotics-journey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>Arduino Repo</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:dhruv.makwana.dev@gmail.com"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>dhruv.makwana.dev@gmail.com</span>
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2 text-zinc-500 text-xs pt-1">
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn: [Add your LinkedIn here]</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Dhruv Makwana. Open-source educational hardware portfolio.</p>
          <p className="flex items-center gap-1">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};
