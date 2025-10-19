import { ProjectCard } from "./ProjectCard";
import { ClickableWord } from "./ClickableWord";

interface ProjectsProps {
  onEarn: (amount: number) => void;
}

export const Projects = ({ onEarn }: ProjectsProps) => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A modern e-commerce solution built with React and Node.js, featuring real-time inventory management and seamless checkout experience.",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
    },
    {
      title: "Portfolio Website",
      description: "Interactive portfolio showcasing creative projects with smooth animations and engaging user experience.",
      tags: ["React", "Tailwind CSS", "Framer Motion"],
    },
    {
      title: "Task Management App",
      description: "Collaborative task manager with real-time updates, team collaboration features, and intuitive drag-and-drop interface.",
      tags: ["TypeScript", "Firebase", "React DnD"],
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif font-bold mb-4">My Projects</h2>
          <p className="text-xl text-muted-foreground">
            A collection of my{" "}
            <ClickableWord value={3000} onEarn={onEarn}>
              recent work
            </ClickableWord>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};
