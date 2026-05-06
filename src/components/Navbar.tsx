"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Advantage", href: "#advantage" },
  { label: "Research", href: "#research" },
  { label: "Deployments", href: "#deployments" },
  { label: "Academy", href: "#academy" },
  { label: "Vault", href: "/vault" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50">
      <nav
        className="glass-panel mx-auto mt-4 flex items-center justify-between px-6 py-3"
        style={{
          maxWidth: "900px",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-display font-semibold tracking-widest text-sm uppercase"
          style={{ color: "#00ff55", letterSpacing: "0.15em" }}
        >
          MBAGS
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-mono text-xs uppercase tracking-widest text-white/60 hover:text-[#00ff55] transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="mailto:hi@mbags.space"
          className="navbar-contact hidden md:inline-flex items-center gap-2 font-mono text-xs px-4 py-2 transition-all duration-200"
        >
          CONTACT
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/60 hover:text-white focus:outline-none"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="font-mono text-lg">{open ? "✕" : "☰"}</span>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="glass-panel mx-auto mt-1 px-6 py-4 flex flex-col gap-4"
          style={{ maxWidth: "900px" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-widest text-white/60 hover:text-[#00ff55] transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

