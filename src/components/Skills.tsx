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
    },
    {
      icon: Palette,
      title: "Design",
      description: "Creating beautiful, user-centered interfaces",
    },
    {
      icon: Rocket,
      title: "Performance",
      description: "Optimizing for speed and scalability",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working effectively in agile teams",
    },
  ];

  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif font-bold mb-4">Skills & Expertise</h2>
          <p className="text-xl text-muted-foreground">
            What I bring to the{" "}
            <ClickableWord value={2500} onEarn={onEarn} wordId="skills-table" onTriggerHeader={() => {}}>
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
                className="bg-white dark:bg-card p-6 rounded-xl border border-border"
              >
                <Icon className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-serif font-bold mb-2">{skill.title}</h3>
                <p className="text-muted-foreground">{skill.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
