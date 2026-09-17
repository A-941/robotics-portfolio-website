import React from "react";
import Link from "next/link";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="px-6 sm:px-10 lg:px-14 py-8"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left: Wordmark + credit */}
        <div className="flex flex-col gap-1">
          <span
            className="text-sm font-semibold"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}
          >
            Robotics Learning Lab
          </span>
          <span className="label" style={{ color: "var(--text-subtle)" }}>
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
              className="label transition-colors hover:text-white"
              style={{ color: "var(--text-subtle)" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};
