import React from "react";
import Link from "next/link";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative px-6 sm:px-10 lg:px-14 py-10 overflow-hidden"
      style={{ borderTop: "1px solid rgba(168,85,247,0.1)" }}
    >
      {/* Subtle top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.3) 30%, rgba(168,85,247,0.3) 70%, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Left: Wordmark + credit */}
        <div className="flex flex-col gap-1.5">
          <span
            className="text-sm font-semibold"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}
          >
            ROBOTICS<span style={{ color: "#a855f7" }}>_</span>LAB
          </span>
          <span className="label" style={{ color: "rgba(168,85,247,0.3)" }}>
            Curated by Dhruv · Open Source · {year}
          </span>
        </div>

        {/* Right: minimal links */}
        <nav
          className="flex items-center gap-6"
          aria-label="Footer navigation"
        >
          {[
            { label: "Work", href: "/#projects" },
            { label: "Guide", href: "/about" },
            { label: "Contact", href: "/contact" },
            {
              label: "GitHub ↗",
              href: "https://github.com/A-941/arduino-robotics-journey",
              external: true,
            },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="label transition-colors duration-200"
              style={{ color: "rgba(168,85,247,0.3)" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};
