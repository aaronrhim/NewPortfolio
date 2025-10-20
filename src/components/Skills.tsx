import { ClickableWord } from "./ClickableWord";
import { Code2, Palette, Rocket, Users } from "lucide-react";

interface SkillsProps {
  onEarn: (amount: number) => void;
}

export const Skills = ({ onEarn }: SkillsProps) => {
  const skills = [
    {
      icon: Code2,
      title: "Development",
      description: "Expert in React, TypeScript, and modern web technologies",
      value: 2500,
    },
    {
      icon: Palette,
      title: "Design",
      description: "Creating beautiful, user-centered interfaces",
      value: 2000,
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Optimizing for speed and scalability",
      value: 1800,
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working effectively in agile teams",
      value: 1500,
    },
  ];

  return (
    <section className="py-20 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif font-bold mb-4">Skills & Expertise</h2>
          <p className="text-xl text-muted-foreground">
            What I bring to the{" "}
            <ClickableWord value={2500} onEarn={onEarn}>
              table
            </ClickableWord>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={index}
                onClick={() => onEarn(skill.value)}
                className="bg-card p-6 rounded-xl border border-border card-hover cursor-pointer group"
              >
                <Icon className="h-12 w-12 text-accent mb-4 transition-transform group-hover:scale-110" />
                <h3 className="text-xl font-serif font-bold mb-2">{skill.title}</h3>
                <p className="text-muted-foreground">{skill.description}</p>
                <p className="text-sm text-accent font-semibold mt-3">+${(skill.value / 100).toFixed(2)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
