"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { name: "Work", href: "/#projects" },
  { name: "Curriculum", href: "/#skills" },
  { name: "Roadmap", href: "/#roadmap" },
  { name: "Guide", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-8 lg:px-12"
        style={{
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid transparent",
          backgroundColor: scrolled ? "rgba(8,8,8,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          transition: "border-color 0.4s, background-color 0.4s, backdrop-filter 0.4s",
        }}
      >
        <div className="flex h-16 sm:h-18 items-center justify-between">
          {/* Wordmark */}
          <Link
            href="/"
            className="flex flex-col group"
            aria-label="Robotics Learning Lab — Home"
          >
            <span
              className="text-sm font-semibold tracking-tight leading-tight transition-colors duration-200"
              style={{ color: "#f0f0f0" }}
            >
              Robotics Lab
            </span>
            <span
              className="label"
              style={{ color: "#444" }}
            >
              Open Hardware
            </span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href.split("#")[0]));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative group overflow-hidden"
                  aria-current={isActive ? "page" : undefined}
                >
                  <span
                    className="text-xs font-medium tracking-wide block transition-all duration-200"
                    style={{
                      color: isActive ? "#e8ff00" : "#888",
                      fontFamily: "var(--font-space-mono)",
                    }}
                  >
                    {link.name}
                  </span>
                  {/* Animated underline */}
                  <span
                    className="absolute bottom-0 left-0 h-px origin-left"
                    style={{
                      backgroundColor: "#e8ff00",
                      width: "100%",
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                  />
                  <style>{`
                    .group:hover span.nav-underline { transform: scaleX(1) !important; }
                  `}</style>
                </Link>
              );
            })}
          </nav>

          {/* GitHub + Menu */}
          <div className="flex items-center gap-5">
            {/* Subtle GitHub link desktop */}
            <a
              href="https://github.com/A-941/arduino-robotics-journey"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-xs font-medium transition-colors duration-200"
              style={{ color: "#555", fontFamily: "var(--font-space-mono)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              Source
            </a>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex flex-col gap-[5px] w-6 items-end"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <motion.span
                animate={isOpen ? { rotate: 45, y: 7.5, width: "100%" } : { rotate: 0, y: 0, width: "100%" }}
                transition={{ duration: 0.25 }}
                className="h-px bg-zinc-100 block"
                style={{ transformOrigin: "left" }}
              />
              <motion.span
                animate={isOpen ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="h-px bg-zinc-100 block w-4"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -7.5, width: "100%" } : { rotate: 0, y: 0, width: "75%" }}
                transition={{ duration: 0.25 }}
                className="h-px bg-zinc-100 block"
                style={{ transformOrigin: "left" }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col px-6 pt-24 pb-12"
            style={{ backgroundColor: "#080808" }}
          >
            {/* Nav links */}
            <nav className="flex flex-col gap-2 flex-grow" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between py-5 border-b"
                    style={{ borderColor: "rgba(255,255,255,0.07)" }}
                  >
                    <span
                      className="text-3xl font-semibold tracking-tight"
                      style={{ color: "#f0f0f0" }}
                    >
                      {link.name}
                    </span>
                    <span style={{ color: "#e8ff00" }}>→</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-1"
            >
              <span className="label" style={{ color: "#444" }}>Open Hardware</span>
              <a
                href="https://github.com/A-941/arduino-robotics-journey"
                target="_blank"
                rel="noopener noreferrer"
                className="label transition-colors"
                style={{ color: "#555" }}
              >
                GitHub ↗
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
