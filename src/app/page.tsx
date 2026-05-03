"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import "devicon/devicon.min.css";

import SpotlightCard from "@/components/SpotlightCard";
import AnimatedRow from "@/components/AnimatedRow";
import SkillCard from "@/components/SkillCard";
import CornerFrame from "@/components/CornerFrame";
import {
  data as siteData,
  advantageNodes,
  deployments,
  certifications,
  researchPapers,
} from "@/data";

/* Lazy-load the canvas so it doesn't block the initial render */
const SmokeCanvas = dynamic(() => import("@/components/SmokeCanvas"), {
  ssr: false,
  loading: () => (
    <div
      className="fixed inset-0 -z-10"
      style={{
        background:
          "radial-gradient(ellipse at 15% 80%, rgba(0,204,68,0.12) 0%, transparent 50%), radial-gradient(ellipse at 85% 20%, rgba(0,255,85,0.06) 0%, transparent 50%), #05050a",
      }}
    />
  ),
});


/* ── Contact form ───────────────────────────────────────────────────────── */
function ContactForm() {
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = fields;
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.open(
      `mailto:hi@mbags.space?subject=${subject}&body=${body}`,
      "_blank"
    );
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(0,255,85,0.18)",
    color: "#f8f8f8",
    outline: "none",
    width: "100%",
    padding: "0.75rem 1rem",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.8rem",
  };

  if (sent) {
    return (
      <CornerFrame color="rgba(0,255,85,0.35)" size={12}>
        <div
          className="glass-panel p-8 flex flex-col items-center justify-center gap-4 text-center"
          style={{ minHeight: "280px", borderColor: "rgba(0,255,85,0.12)" }}
        >
          <span
            className="font-mono text-3xl"
            style={{ color: "#00ff55" }}
          >
            ✓
          </span>
          <p className="font-display font-semibold text-lg">Message Drafted</p>
          <p className="font-prose text-white/50 text-sm">
            Your email client should have opened with a pre-filled message. Hit
            send when you&apos;re ready.
          </p>
          <button
            onClick={() => setSent(false)}
            className="font-mono text-xs text-white/40 hover:text-[#00ff55] transition-colors mt-2"
          >
            Send another →
          </button>
        </div>
      </CornerFrame>
    );
  }

  return (
    <CornerFrame color="rgba(0,255,85,0.35)" size={12}>
      <form
        onSubmit={handleSubmit}
        className="glass-panel p-6 flex flex-col gap-4"
        style={{ borderColor: "rgba(0,255,85,0.12)" }}
      >
        <div className="flex flex-col gap-1">
          <label className="font-mono text-[10px] uppercase tracking-widest text-white/30">
            Name
          </label>
          <input
            required
            type="text"
            placeholder="Your name"
            value={fields.name}
            onChange={(e) => setFields((f) => ({ ...f, name: e.target.value }))}
            style={inputStyle}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-mono text-[10px] uppercase tracking-widest text-white/30">
            Email
          </label>
          <input
            required
            type="email"
            placeholder="your@email.com"
            value={fields.email}
            onChange={(e) =>
              setFields((f) => ({ ...f, email: e.target.value }))
            }
            style={inputStyle}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-mono text-[10px] uppercase tracking-widest text-white/30">
            Message
          </label>
          <textarea
            required
            rows={5}
            placeholder="What would you like to discuss?"
            value={fields.message}
            onChange={(e) =>
              setFields((f) => ({ ...f, message: e.target.value }))
            }
            style={{ ...inputStyle, resize: "none" }}
          />
        </div>

        <button
          type="submit"
          className="cta-primary font-mono text-sm px-6 py-3 transition-all duration-200 w-full mt-2"
        >
          [ Send Message ]
        </button>
      </form>
    </CornerFrame>
  );
}

/* ── Tag chip ───────────────────────────────────────────────────────────── */
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-mono text-[10px] uppercase tracking-widest px-2 py-1"
      style={{
        border: "1px solid rgba(0,255,85,0.25)",
        color: "#00ff55",
        background: "rgba(0,255,85,0.05)",
      }}
    >
      {children}
    </span>
  );
}

/* ── Status badge ───────────────────────────────────────────────────────── */
function StatusBadge({ status }: { status: string }) {
  const color =
    status === "ACTIVE"
      ? "#00ff55"
      : status === "DEPLOYED"
        ? "#4ade80"
        : "rgba(255,255,255,0.4)";
  return (
    <span
      className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 flex items-center gap-1"
      style={{ color }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full inline-block"
        style={{
          background: color,
          boxShadow: `0 0 6px ${color}`,
          animation: status === "ACTIVE" ? "glow-pulse 2s infinite" : "none",
        }}
      />
      {status}
    </span>
  );
}

/* ── Paper status badge ─────────────────────────────────────────────────── */
function PaperStatus({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    Published: "#00ff55",
    "Under Review": "#4ade80",
    "In Progress": "#00cc44",
    Preprint: "#86efac",
  };
  const color = colorMap[status] ?? "#00ff55";
  return (
    <span
      className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5"
      style={{
        border: `1px solid ${color}40`,
        color,
        background: `${color}10`,
      }}
    >
      {status}
    </span>
  );
}

/* ── Section label ──────────────────────────────────────────────────────── */
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/30">
        {text}
      </span>
      <div
        className="flex-1"
        style={{ height: "1px", background: "rgba(255,255,255,0.08)" }}
      />
    </div>
  );
}

/* ── Main page ──────────────────────────────────────────────────────────── */
export default function HomePage() {
  const firstRowSkills = siteData.skills.filter((_, i) => i % 2 === 0);
  const secondRowSkills = siteData.skills.filter((_, i) => i % 2 !== 0);

  return (
    <>
      {/* ── WebGL Smoke Background ──────────────────────────────────────── */}
      <SmokeCanvas />

      {/* ── 2.1 APEX / HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-32 pb-20">
        <div className="max-w-6xl mx-auto w-full">
          <CornerFrame color="rgba(0,255,85,0.3)" size={18} className="py-10 px-8">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-px" style={{ background: "#00ff55" }} />
            <span
              className="font-mono text-xs uppercase tracking-[0.25em]"
              style={{ color: "#00ff55" }}
            >
              Kigali, Rwanda · Available for Hire
            </span>
          </div>

          {/* Primary headline */}
          <h1
            className="font-display font-bold leading-[1.02] mb-8"
            style={{
              fontSize: "clamp(3rem, 9vw, 8.5rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Architecting Secure
            <br />
            <span style={{ color: "#00ff55" }} className="glow-green">
              Ecosystems.
            </span>{" "}
            Advancing
            <br />
            Research.
          </h1>

          {/* Hook */}
          <p
            className="font-prose text-white/60 mb-12 max-w-2xl"
            style={{ fontSize: "clamp(1.05rem, 2.2vw, 1.3rem)", lineHeight: 1.7 }}
          >
            Cloud-Native Engineer, Researcher, and UI/UX Designer operating out
            of Kigali. I build platforms that scale without breaking, publish
            research that advances the field, and design experiences that matter.
          </p>

          {/* Action Matrix */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#research"
              className="cta-primary font-mono text-sm px-6 py-3 transition-all duration-200"
            >
              [ Research & Publications ]
            </a>
            <a
              href="#contact"
              className="cta-vault font-mono text-sm px-6 py-3 transition-all duration-200"
            >
              [ Get in Touch ]
            </a>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-12">
            {[
              "Cloud Engineering",
              "Security Research",
              "Product Architecture",
              "UI/UX Design",
            ].map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          </CornerFrame>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: 0.3 }}
        >
          <span className="font-mono text-[10px] uppercase tracking-widest">
            Scroll
          </span>
          <div
            className="w-px h-8"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,255,85,0.6), transparent)",
            }}
          />
        </div>
      </section>

      {/* ── 2.2 UNFAIR ADVANTAGE ────────────────────────────────────────── */}
      <section id="advantage" className="relative px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <CornerFrame color="rgba(0,255,85,0.2)" size={14} className="px-4 pb-4">
          <SectionLabel text="02 · The Unfair Advantage" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {advantageNodes.map((node) => (
              <SpotlightCard
                key={node.id}
                accentColor={node.accentColor}
                className="p-6 flex flex-col gap-4 h-full"
              >
                {/* Tag */}
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: "#00ff55" }}
                >
                  {node.tag}
                </span>

                {/* Headline */}
                <h3
                  className="font-display font-semibold leading-tight"
                  style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}
                >
                  {node.headline.split("\n").map((line, i, arr) => (
                    <span key={i}>
                      {line}
                      {i < arr.length - 1 && <br />}
                    </span>
                  ))}
                </h3>

                {/* Body */}
                <p className="font-prose text-white/55 text-sm leading-relaxed flex-1">
                  {node.body}
                </p>

                {/* Proof point */}
                <div
                  className="glass-panel p-3 mt-2"
                  style={{
                    borderColor: "rgba(0,255,85,0.12)",
                  }}
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/30 block mb-1">
                    Proof Point
                  </span>
                  <p className="font-mono text-xs text-white/70">
                    {node.proofPoint}
                  </p>
                </div>
              </SpotlightCard>
            ))}
          </div>
          </CornerFrame>
        </div>
      </section>

      {/* ── Arsenal / Tech Stack ────────────────────────────────────────── */}
      <section className="px-6 py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto mb-8">
          <SectionLabel text="Arsenal · Tech Stack" />
        </div>
        <div className="flex flex-col gap-4">
          <AnimatedRow
            elements={firstRowSkills}
            renderElement={(skill) => <SkillCard skill={skill} />}
          />
          <AnimatedRow
            elements={secondRowSkills}
            animationDirection="left"
            renderElement={(skill) => <SkillCard skill={skill} />}
          />
        </div>
      </section>

      {/* ── RESEARCH & PUBLICATIONS ─────────────────────────────────────── */}
      <section id="research" className="relative px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <SectionLabel text="04 · Research & Publications" />

          <p className="font-prose text-white/50 text-sm mb-10 max-w-xl">
            Academic work at the intersection of cloud security, AI systems, and
            resilient infrastructure engineering.
          </p>

          <div className="flex flex-col gap-px" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {researchPapers.map((paper) => (
              <div
                key={paper.id}
                className="group py-8 px-4 transition-all duration-200 hover:bg-white/[0.02]"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                {/* Top row: year + status */}
                <div className="flex items-center gap-4 mb-3">
                  <span className="font-mono text-[11px] text-white/30">{paper.year}</span>
                  <PaperStatus status={paper.status} />
                </div>

                {/* Title */}
                <h3
                  className="font-display font-semibold leading-snug mb-2"
                  style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
                >
                  {paper.title}
                </h3>

                {/* Venue */}
                <p
                  className="font-mono text-xs mb-3"
                  style={{ color: "#4ade80" }}
                >
                  {paper.venue}
                </p>

                {/* Abstract */}
                <p className="font-prose text-white/50 text-sm leading-relaxed max-w-3xl mb-4">
                  {paper.abstract}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {paper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2 py-0.5"
                      style={{
                        border: "1px solid rgba(0,255,85,0.15)",
                        color: "rgba(0,255,85,0.6)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* DOI/link if present */}
                {paper.doi && (
                  <a
                    href={`https://doi.org/${paper.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] uppercase tracking-widest mt-3 inline-flex items-center gap-1 transition-colors duration-200"
                    style={{ color: "#00ff55" }}
                  >
                    DOI: {paper.doi} →
                  </a>
                )}
                {paper.url && !paper.doi && (
                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] uppercase tracking-widest mt-3 inline-flex items-center gap-1 transition-colors duration-200"
                    style={{ color: "#00ff55" }}
                  >
                    Read Paper →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2.3 PROVING GROUNDS / CAMPAIGN MAP ──────────────────────────── */}
      <section id="deployments" className="relative px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <SectionLabel text="03 · The Proving Grounds" />

          <p className="font-prose text-white/50 text-sm mb-10 max-w-xl">
            Engineering deployments — reviewed as tactical mission reports.
          </p>

          <div className="timeline-track">
            {deployments.map((dep) => (
              <SpotlightCard
                key={dep.id}
                accentColor="cyan"
                className="timeline-card p-6 flex flex-col gap-4"
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                    {dep.classification}
                  </span>
                  <StatusBadge status={dep.status} />
                </div>

                {/* Codename */}
                <h3
                  className="font-display font-semibold"
                  style={{ fontSize: "1.15rem" }}
                >
                  {dep.codename}
                </h3>

                {/* Objective */}
                <p className="font-prose text-white/55 text-sm leading-relaxed flex-1">
                  {dep.objective}
                </p>

                {/* Tech stack chips */}
                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                  {dep.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] px-2 py-1"
                      style={{
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Outcome */}
                <div
                  className="glass-panel p-3 mt-2"
                  style={{ borderColor: "rgba(0,255,85,0.1)" }}
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/30 block mb-1">
                    Outcome
                  </span>
                  <p className="font-mono text-xs text-white/65">
                    {dep.outcome}
                  </p>
                </div>
              </SpotlightCard>
            ))}
          </div>

          <p className="font-mono text-[10px] text-white/20 mt-4 text-right">
            ← scroll to explore →
          </p>
        </div>
      </section>

      {/* ── 2.5 ACADEMY & CERTIFICATIONS ────────────────────────────────── */}
      <section id="academy" className="relative px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <SectionLabel text="05 · The Academy" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <SpotlightCard
              accentColor="cyan"
              className="p-6 flex flex-col gap-3"
            >
              <span
                className="font-mono text-[10px] uppercase tracking-widest"
                style={{ color: "#00ff55" }}
              >
                Current Enrollment
              </span>
              <h3 className="font-display font-semibold text-xl">
                M.S. Information Technology
              </h3>
              <p className="font-prose text-white/60 text-sm">
                Carnegie Mellon University Africa · Kigali
              </p>
              <p className="font-mono text-xs text-white/30 mt-auto">
                Expected graduation: 2025
              </p>
            </SpotlightCard>

            <SpotlightCard
              accentColor="green"
              className="p-6 flex flex-col gap-3"
            >
              <span
                className="font-mono text-[10px] uppercase tracking-widest"
                style={{ color: "#4ade80" }}
              >
                Foundation
              </span>
              <h3 className="font-display font-semibold text-xl">
                BSc (Hons) Computer Software Engineering
              </h3>
              <p className="font-prose text-white/60 text-sm">
                University of Rwanda · Kigali
              </p>
              <p className="font-mono text-xs text-white/30 mt-auto">
                First Class Honors
              </p>
            </SpotlightCard>
          </div>

          {/* Certification badges */}
          <div className="flex flex-wrap gap-6">
            {certifications.map((cert) => (
              <SpotlightCard
                key={cert.id}
                accentColor="cyan"
                className="p-6 flex flex-col items-center gap-3 text-center"
              >
                <div
                  className="w-20 h-20 flex items-center justify-center font-display font-bold text-sm"
                  style={{
                    border: `2px solid ${cert.color}`,
                    color: cert.color,
                    boxShadow: `0 0 20px ${cert.color}40, 0 0 40px ${cert.color}20`,
                    background: `${cert.color}08`,
                    letterSpacing: "0.05em",
                  }}
                >
                  {cert.acronym}
                </div>
                <div>
                  <p className="font-display font-semibold text-sm leading-tight">
                    {cert.name}
                  </p>
                  <p className="font-mono text-[10px] text-white/40 mt-1 uppercase tracking-widest">
                    {cert.issuer}
                  </p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

