interface SkillCardProps {
  skill: any
}
function SkillCard({ skill }: SkillCardProps) {
  return <div
    className="cursor-wait bg-black rounded-sm bg-opacity-30 p-6 relative h-[180px] w-[180px] bg-red"
    key={skill.name}
  >
    <figure>
      <i className={`text-6xl devicon-${skill.icon} colored`}></i>
    </figure>
    <div className="card-body">
      <h3 className="card-tile">{skill.name}</h3>
    </div>
  </div>;
}
export default SkillCard;
