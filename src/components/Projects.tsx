import { ProjectCard } from "./ProjectCard";
import { ClickableWord } from "./ClickableWord";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import rememberMeImg from "@/assets/remember-me.png";
import getSwoleImg from "@/assets/get-swole.png";
import portfolioImg from "@/assets/portfolio-website.png";
import roverImg from "@/assets/rover-model.png";

interface ProjectsProps {
  onEarn: (amount: number) => void;
}

export const Projects = ({ onEarn }: ProjectsProps) => {
  const [isOnDarkBackground, setIsOnDarkBackground] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Check if the section is in the upper part of the viewport (still on dark background)
        const titlePosition = rect.top + 100; // Approximate position of title within section
        const isDark = titlePosition < viewportHeight * 0.7;
        
        setIsOnDarkBackground(isDark);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const projects = [
    {
      title: "Remember Me",
      description: "An Alzheimer's assistance camera that uses facial recognition to help loved ones remember people they meet. Built with AWS Rekognition, DynamoDB, and ElevenLabs TTS.",
      tags: ["Python", "OpenCV", "AWS", "React Native"],
      link: "/project/alzheimer-camera",
      image: rememberMeImg,
    },
    {
      title: "Get Swole",
      description: "A fullstack web application that boosts gym performance by analyzing your form in real-time using MediaPipe for pose detection and custom ML models for rep verification.",
      tags: ["Python", "MediaPipe", "React", "Machine Learning"],
      link: "/project/get-swole",
      image: getSwoleImg,
    },
    {
      title: "Website Portfolio",
      description: "Interactive Mars-themed portfolio with gamified click-for-cash mechanics, persistent cloud storage, and smooth parallax animations featuring a Mars rover and Earth.",
      tags: ["React", "TypeScript", "Tailwind CSS", "AWS Amplify", "Supabase"],
      link: "/project/website-portfolio",
      image: portfolioImg,
    },
    {
      title: "Rover",
      description: "UBC Rover team's reinforcement learning framework for autonomous navigation and decision-making. A collection of interconnected projects advancing rover capabilities through machine learning.",
      tags: ["Python", "Reinforcement Learning", "ROS", "Robotics"],
      link: "/project/rover",
      image: roverImg,
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-5xl font-serif font-bold mb-4 transition-colors duration-300 ${
            isOnDarkBackground ? "text-white" : "text-foreground"
          }`}>
            My Projects
          </h2>
          <p className={`text-xl transition-colors duration-300 ${
            isOnDarkBackground ? "text-white/80" : "text-muted-foreground"
          }`}>
            A collection of my{" "}
            <ClickableWord value={3000} onEarn={onEarn} wordId="projects-recent-work" onTriggerHeader={() => {}}>
              recent work
            </ClickableWord>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/projects">
            <Button variant="outline" size="lg">
              View More Projects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
