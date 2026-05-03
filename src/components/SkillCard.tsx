interface SkillCardProps {
  skill: { icon: string; name: string };
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <div
      className="skill-card flex flex-col items-center justify-center gap-3 p-5 cursor-default transition-all duration-200 group"
      style={{
        background: "rgba(5,5,10,0.6)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        width: "140px",
        height: "130px",
        flexShrink: 0,
      }}
    >
      <i
        className={`text-4xl devicon-${skill.icon} colored`}
        style={{ filter: "saturate(0.8)" }}
      />
      <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white/70 transition-colors duration-200 text-center">
        {skill.name}
      </span>
    </div>
  );
}

