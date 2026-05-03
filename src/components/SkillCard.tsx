interface SkillCardProps {
  skill: { icon: string; name: string };
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 p-5 cursor-default transition-all duration-200 group"
      style={{
        background: "rgba(5,5,10,0.6)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        width: "140px",
        height: "130px",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(0,240,255,0.25)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 0 20px rgba(0,240,255,0.08)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(255,255,255,0.08)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
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

