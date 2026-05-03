import React from "react";
import Link from "next/link";

const socialLinks = [
  { label: "GitHub", url: "https://github.com/munezerobagira" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/sostene" },
  { label: "Twitter", url: "https://twitter.com/SosteneMunezero" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="glass-panel mt-24 px-6 py-10"
      style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <Link
          href="/"
          className="font-display font-semibold tracking-widest text-sm uppercase"
          style={{ color: "#00F0FF" }}
        >
          MBAGS
        </Link>

        {/* Social links */}
        <ul className="flex gap-8">
          {socialLinks.map((s) => (
            <li key={s.url} className="list-none">
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-widest text-white/50 hover:text-[#00F0FF] transition-colors duration-200"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Copyright */}
        <p className="font-mono text-xs text-white/30">
          © {year} Munezero Bagira Sostene
        </p>
      </div>
    </footer>
  );
}

