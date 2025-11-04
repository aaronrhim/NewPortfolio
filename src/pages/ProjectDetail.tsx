import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ClickableWord } from "@/components/ClickableWord";
import { Header } from "@/components/Header";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { getSessionId } from "@/lib/sessionManager";

interface SubProject {
  title: string;
  description: string;
  tech: string[];
  github: string;
}

interface ProjectData {
  id: string;
  title: string;
  tagline: string;
  description: string[];
  tech: string[];
  github?: string;
  devpost?: string;
  subProjects?: SubProject[];
}

const projectsData: Record<string, ProjectData> = {
  "alzheimer-camera": {
    id: "alzheimer-camera",
    title: "Remember Me",
    tagline: "'helping loved ones when memory falters'",
    description: [
      "Remember Me gives ones family a calm and affordable way to help loved ones when their memory falters. By pairing a friendly camera with a mobile app, we turn everyday moments into reassuring reminders so families can stay connected, even when names are hard to recall.",
      "The camera easily attaches to clothing and whenever you pass by someone you've previously met, it announces the name of that person, their relationship with you, and a short note.",
      "Built during Stormhacks 2025, this project uses Amazon Rekognition for facial recognition, DynamoDB for profile storage, and ElevenLabs for natural text-to-speech announcements."
    ],
    tech: ["Python", "Flask", "OpenCV", "Amazon Rekognition", "DynamoDB", "S3", "ElevenLabs", "React Native", "Expo"],
    github: "https://github.com/LeCruitUsPls/AlzheimerCamera",
    devpost: "https://devpost.com/software/remember-me-e6pyuv"
  },
  "get-swole": {
    id: "get-swole",
    title: "Get Swole",
    tagline: "'an absolute need when gymming'",
    description: [
      "Get Swole is a fullstack web application that boosts gym performance by analyzing your form in real-time. It leverages MediaPipe for pose landmark detection and a custom machine learning model to verify full exercise repetitions.",
      "The application uses advanced computer vision to extract pose landmarks from your camera feed, calculating joint angles and movement patterns to ensure proper form during exercises.",
      "By combining real-time pose estimation with a separately trained model, Get Swole provides instant feedback on your workout technique, helping you maximize results while minimizing injury risk."
    ],
    tech: ["Python", "MediaPipe", "React", "Node.js", "Machine Learning", "Computer Vision"],
    github: "https://github.com/aaronrhim/HackathonCS6"
  },
  "website-portfolio": {
    id: "website-portfolio",
    title: "Website Portfolio",
    tagline: "'beautiful, aesthetic, and reflective'",
    description: [
      "This portfolio website features a unique gamified experience where visitors can click highlighted words throughout the site to earn virtual currency. Each interaction is tracked persistently using cloud storage, ensuring progress is maintained across sessions and devices.",
      "The site showcases an immersive Mars parallax background with animated elements including a roving Mars rover, rotating Earth, distant mountains, and a futuristic Mars colony. The rover autonomously travels across the terrain, reversing direction at screen edges while maintaining smooth animations.",
      "Built with modern web technologies, the portfolio demonstrates advanced React patterns, TypeScript type safety, Tailwind CSS design system, and full-stack capabilities with Supabase for persistent data storage and AWS Amplify for real-time synchronization."
    ],
    tech: ["Next.js", "React", "Tailwind", "TypeScript", "Supabase"],
    github: "https://github.com/aaronrhim/NewPortfolio"
  },
  "rover": {
    id: "rover",
    title: "Rover",
    tagline: "'so cool'",
    description: [
      "The UBC Rover team's reinforcement learning framework designed to push the boundaries of autonomous navigation and intelligent decision-making in challenging terrain. This project serves as the foundation for teaching our rover to learn from its environment and make complex decisions in real-time.",
      "The framework integrates with the rover's ROS-based control systems, enabling seamless deployment of trained models directly onto the physical hardware. Through iterative training in both simulated and real-world environments, the rover continuously improves its ability to navigate obstacles, optimize path planning, and adapt to unexpected conditions.",
      "As part of the broader UBC Rover initiative, this project coordinates multiple specialized components that each tackle different aspects of rover intelligence, from low-level control systems to high-level mission planning. The modular architecture allows individual components to be developed, tested, and integrated independently while maintaining system-wide coherence."
    ],
    tech: ["Python", "Reinforcement Learning", "ROS", "PyTorch", "OpenAI Gym", "Robotics"],
    github: "https://github.com/UBC-Snowbots/LearnFlake",
    subProjects: [
      {
        title: "URDF to MJCF Converter",
        description: "A robust tool for converting URDF robot models to MuJoCo XML format. Built to address incompatibilities in existing converters, this utility enables seamless integration of robot models into MuJoCo physics simulation environments for reinforcement learning training.",
        tech: ["Python", "URDF", "MuJoCo", "XML Processing"],
        github: "https://github.com/aaronrhim/URDF-to-MJCF-Converter"
      }
    ]
  },
  "lecruiter": {
    id: "lecruiter",
    title: "LeCruiter",
    tagline: "'LeBron everything'",
    description: [
      "LeCruiter is an AI-powered recruiter that streamlines the hiring process using advanced language models and automation. This system analyzes resumes, conducts initial candidate screenings, and matches applicants with job requirements efficiently.",
      "Built during a GenAI hackathon, LeCruiter leverages natural language processing to understand job descriptions and candidate profiles, providing intelligent recommendations and insights to hiring managers.",
      "The platform automates repetitive recruitment tasks while maintaining a human touch, allowing recruiters to focus on meaningful candidate interactions and strategic hiring decisions."
    ],
    tech: ["Python", "Natural Language Processing", "AI/ML", "LangChain", "OpenAI"],
    github: "https://github.com/R0yZh3ng/CIC-GenAI-Hackathon"
  },
  "fact": {
    id: "fact",
    title: "F.A.C.T",
    tagline: "'try on clothes with AI'",
    description: [
      "F.A.C.T (Fashion App Computer Try-on) is an innovative fashion application that uses computer vision, MediaPipe, and real-time pose detection to virtually map clothing onto your body using just a webcam.",
      "The application employs the same advanced computer vision principles as Get Swole, utilizing MediaPipe for precise body landmark detection and tracking. This enables accurate clothing overlay that moves naturally with your body movements.",
      "By combining pose estimation with image processing, F.A.C.T creates an immersive virtual try-on experience, allowing users to see how different outfits look on them without physical changing, revolutionizing online shopping and fashion exploration."
    ],
    tech: ["Python", "MediaPipe", "Computer Vision", "OpenCV", "Fashion Tech"],
    github: "https://github.com/aaronrhim/F.A.C.T"
  },
  "arrc": {
    id: "arrc",
    title: "ARRC",
    tagline: "'Aerial Robotics and Rocketry Club'",
    description: [
      "ARRC is the UBC Aerial Robotics and Rocketry Club's autonomous unmanned aerial system (UAS) project for the 2025 UAS Competition. This comprehensive system implements advanced flight control, computer vision, and mission planning capabilities.",
      "The project integrates multiple subsystems including autonomous navigation, object detection and tracking, precision landing, and payload delivery mechanisms. Using ROS for system coordination, the drone can execute complex mission profiles with minimal human intervention.",
      "Developed by a multidisciplinary team, ARRC pushes the boundaries of autonomous flight, incorporating cutting-edge algorithms for SLAM, path planning, and real-time decision making in dynamic environments."
    ],
    tech: ["Python", "ROS", "Computer Vision", "Autonomous Systems", "ArduPilot"],
    github: "https://github.com/UBCOAerospaceClub/UAS-Competition-2025-Task-1",
    subProjects: [
      {
        title: "Denoiser",
        description: "Machine learning model for removing noise from sensor data and images, significantly improving signal quality for autonomous systems. The denoiser preprocesses camera feeds and sensor readings, enabling more accurate object detection and navigation.",
        tech: ["Python", "TensorFlow", "Deep Learning", "Signal Processing"],
        github: "https://colab.research.google.com/drive/16mnHpR647QeGAPwdqLImC3z9wOWOLcxw"
      },
      {
        title: "ZeroMQ Integration",
        description: "High-performance asynchronous messaging library implementation for distributed systems communication. ZeroMQ enables efficient, low-latency message passing between drone subsystems, providing real-time communication critical for autonomous flight operations.",
        tech: ["Python", "ZeroMQ", "Distributed Systems", "Networking"],
        github: "https://github.com/UBCOAerospaceClub/UAS-Competition-2025-Task-1/tree/zeromq"
      }
    ]
  },
  "image-classification": {
    id: "image-classification",
    title: "Image Classification",
    tagline: "'my first project'",
    description: [
      "This deep learning project implements a robust image classification system using convolutional neural networks. The model is trained on diverse datasets to accurately recognize and categorize objects across multiple classes.",
      "The classifier employs transfer learning techniques, building upon pre-trained models like ResNet and VGG, then fine-tuning them on specific datasets to achieve high accuracy while reducing training time and computational requirements.",
      "With applications in autonomous systems, quality control, and content moderation, this project demonstrates the power of modern computer vision techniques in solving real-world classification problems."
    ],
    tech: ["Python", "TensorFlow", "Keras", "Deep Learning", "Computer Vision"],
    github: "https://github.com/aaronrhim/image-classification"
  },
  "custom-cnn": {
    id: "custom-cnn",
    title: "Custom CNN Model",
    tagline: "'my second project'",
    description: [
      "This project features a custom-built convolutional neural network architecture designed from scratch for specialized image processing tasks. Unlike using pre-trained models, this CNN is architected specifically for target use cases.",
      "The model implements various CNN building blocks including convolutional layers with custom kernel sizes, pooling operations, batch normalization, dropout for regularization, and fully connected layers for classification.",
      "By building the architecture from the ground up, this project provides deep insights into how CNNs learn hierarchical features, from low-level edges and textures to high-level semantic representations."
    ],
    tech: ["Python", "PyTorch", "Neural Networks", "Deep Learning", "NumPy"],
    github: "https://github.com/aaronrhim/custom-CNN"
  },
  "stock-predictor": {
    id: "stock-predictor",
    title: "Stock Market Predictor",
    tagline: "'invest wisely'",
    description: [
      "This machine learning project analyzes historical stock market data to predict future price trends using advanced time series analysis and neural network architectures. The system processes multiple financial indicators and market signals.",
      "The predictor employs LSTM (Long Short-Term Memory) networks specifically designed for sequential data, capturing temporal dependencies and patterns in stock price movements. It incorporates technical indicators like moving averages, RSI, and MACD.",
      "While financial markets are inherently unpredictable, this project demonstrates the application of machine learning to quantitative finance, providing insights into trend analysis, risk assessment, and algorithmic trading strategies."
    ],
    tech: ["Python", "TensorFlow", "LSTM", "Time Series Analysis", "Pandas"],
    github: "https://github.com/aaronrhim/Stock-Market-Prediction"
  },
  "gmail-extension": {
    id: "gmail-extension",
    title: "Gmail Extension",
    tagline: "'stupid gmail extension got no hair' - Marcus",
    description: [
      "This Chrome extension enhances Gmail functionality with custom features designed to improve email management and productivity. The extension integrates seamlessly with Gmail's interface, adding new capabilities without disrupting the user experience.",
      "Features include automated email organization, quick reply templates, enhanced search capabilities, and custom keyboard shortcuts. The extension uses Gmail's API and Chrome's extension APIs to provide powerful functionality.",
      "Built with vanilla JavaScript and modern web technologies, this project demonstrates proficiency in browser extension development, DOM manipulation, and working with external APIs in a sandboxed environment."
    ],
    tech: ["JavaScript", "Chrome Extension API", "Gmail API", "HTML/CSS"],
    github: "https://github.com/aaronrhim/stupid-gmail-extension"
  },
  "docker-pipeline": {
    id: "docker-pipeline",
    title: "Docker Pipeline CLI",
    tagline: "'practicing my devops skills :)'",
    description: [
      "This command-line tool automates Docker workflows and container management, streamlining development and deployment processes. The CLI provides intuitive commands for common Docker operations and complex multi-container orchestration.",
      "The tool includes features for automated image building, container lifecycle management, environment configuration, log aggregation, and deployment automation. It simplifies repetitive Docker commands into single, memorable CLI instructions.",
      "Perfect for DevOps workflows, this pipeline tool integrates with CI/CD systems and supports custom scripts, making containerized application development more efficient and reducing the likelihood of deployment errors."
    ],
    tech: ["Python", "Docker", "CLI Development", "DevOps", "Bash"],
    github: "https://github.com/aaronrhim/personal-cli"
  },
  "old-website": {
    id: "old-website",
    title: "Old Portfolio Website",
    tagline: "'took me 40 hours to deploy'",
    description: [
      "This is my previous personal portfolio website, showcasing earlier projects and demonstrating web development skills with traditional HTML, CSS, and JavaScript. The site served as a digital resume and project showcase before the current Mars-themed portfolio.",
      "The website featured a clean, professional design with sections for projects, skills, experience, and contact information. It was built with responsive design principles to ensure compatibility across devices and browsers.",
      "While simpler than the current portfolio, this site represents an important step in my web development journey, showcasing fundamental front-end skills and design sensibilities that have evolved into more complex, interactive experiences."
    ],
    tech: ["HTML", "CSS", "JavaScript", "GitHub Pages", "Responsive Design"],
    github: "https://github.com/aaronrhim/aaronrhim.github.io"
  }
};

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [lastEarned, setLastEarned] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 1000
  );
  const [scrollMetrics, setScrollMetrics] = useState({
    scroll: 0,
    sectionTop: Number.POSITIVE_INFINITY,
  });
  const secondSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollPosition = scrollMetrics.scroll;
  const sectionTop = scrollMetrics.sectionTop;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load initial total earnings from database
  useEffect(() => {
    const loadTotalEarnings = async () => {
      const sessionId = getSessionId();
      
      const { data, error } = await supabase
        .from('clicked_words')
        .select('value')
        .eq('session_id', sessionId);

      if (!error && data) {
        const total = data.reduce((sum, item) => sum + item.value, 1000);
        setTotalEarnings(total);
      }
    };

    loadTotalEarnings();
  }, []);

  const handleEarn = (amount: number) => {
    setTotalEarnings((prev) => prev + amount);
    setLastEarned(amount);
  };

  const handleAnimationComplete = () => {
    setLastEarned(0);
  };

  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const updateScroll = () => {
      const nextScroll = window.scrollY;
      const nextSectionTop = secondSectionRef.current
        ? secondSectionRef.current.getBoundingClientRect().top
        : Number.POSITIVE_INFINITY;

      setScrollMetrics((prev) => {
        if (
          prev.scroll === nextScroll &&
          prev.sectionTop === nextSectionTop
        ) {
          return prev;
        }

        return {
          scroll: nextScroll,
          sectionTop: nextSectionTop,
        };
      });
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  // Match the orange overlay with the foreground terrain's parallax motion
  const terrainOffset = scrollPosition * 0.5;
  const overlayStartRatio = 0.95;
  const baseTerrainTop = viewportHeight * overlayStartRatio;
  const overlayTop = Math.max(0, baseTerrainTop - terrainOffset);
  const showOverlay = sectionTop < viewportHeight;

  const project = projectId ? projectsData[projectId] : null;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Button variant="outline" className="bg-white text-foreground hover:bg-white/90" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div
        className="fixed inset-x-0 bottom-0 z-0 pointer-events-none"
        style={{
          top: `${overlayTop}px`,
          backgroundColor: "hsl(var(--terrain))",
        }}
        aria-hidden="true"
      />
      <Header amount={totalEarnings} earnedAmount={lastEarned} onAnimationComplete={handleAnimationComplete} />
      
      <main className="relative z-10 min-h-screen animate-fade-in">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <Button variant="outline" className="mt-20 mb-8 bg-white text-foreground hover:bg-white/90" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <article ref={secondSectionRef} className="bg-card/80 backdrop-blur-sm rounded-xl p-8 border border-border">
            <header className="mb-8">
              <h1 className="text-5xl font-serif font-bold mb-4">{project.title}</h1>
              <p className="text-xl text-muted-foreground italic">
                {project.tagline}
              </p>
            </header>

            <section className="space-y-6 mb-8">
              <h2 className="text-3xl font-serif font-bold">About the Project</h2>
              {project.description.map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed text-muted-foreground">
                  {project.id === "alzheimer-camera" && index === 0 ? (
                    <>
                      Remember Me gives ones family a{" "}
                      <ClickableWord value={1500} onEarn={handleEarn} wordId="project-calm-affordable" onTriggerHeader={() => {}}>
                        calm and affordable way
                      </ClickableWord>{" "}
                      to help loved ones when their{" "}
                      <ClickableWord value={1800} onEarn={handleEarn} wordId="project-memory-falters" onTriggerHeader={() => {}}>
                        memory falters
                      </ClickableWord>
                      . By pairing a friendly camera with a mobile app, we turn everyday moments into{" "}
                      <ClickableWord value={1600} onEarn={handleEarn} wordId="project-reassuring-reminders" onTriggerHeader={() => {}}>
                        reassuring reminders
                      </ClickableWord>{" "}
                      so families can stay connected, even when names are hard to recall.
                    </>
                  ) : project.id === "alzheimer-camera" && index === 1 ? (
                    <>
                      The camera easily attaches to clothing and whenever you pass by someone you've previously met, it{" "}
                      <ClickableWord value={2000} onEarn={handleEarn} wordId="project-announces-name">
                        announces the name
                      </ClickableWord>{" "}
                      of that person, their relationship with you, and a short note.
                    </>
                  ) : project.id === "alzheimer-camera" && index === 2 ? (
                    <>
                      Built during{" "}
                      <ClickableWord value={1200} onEarn={handleEarn} wordId="project-stormhacks">
                        Stormhacks 2025
                      </ClickableWord>
                      , this project uses Amazon Rekognition for{" "}
                      <ClickableWord value={2200} onEarn={handleEarn} wordId="project-facial-recognition">
                        facial recognition
                      </ClickableWord>
                      , DynamoDB for profile storage, and ElevenLabs for natural{" "}
                      <ClickableWord value={1400} onEarn={handleEarn} wordId="project-text-to-speech">
                        text-to-speech
                      </ClickableWord>{" "}
                      announcements.
                    </>
                  ) : project.id === "get-swole" && index === 0 ? (
                    <>
                      Get Swole is a fullstack web application that boosts{" "}
                      <ClickableWord value={1600} onEarn={handleEarn} wordId="swole-gym-performance">
                        gym performance
                      </ClickableWord>{" "}
                      by analyzing your form in{" "}
                      <ClickableWord value={1800} onEarn={handleEarn} wordId="swole-real-time">
                        real-time
                      </ClickableWord>
                      . It leverages MediaPipe for{" "}
                      <ClickableWord value={2000} onEarn={handleEarn} wordId="swole-pose-detection">
                        pose landmark detection
                      </ClickableWord>{" "}
                      and a custom machine learning model to verify full exercise repetitions.
                    </>
                  ) : project.id === "get-swole" && index === 1 ? (
                    <>
                      The application uses advanced{" "}
                      <ClickableWord value={2200} onEarn={handleEarn} wordId="swole-computer-vision">
                        computer vision
                      </ClickableWord>{" "}
                      to extract pose landmarks from your camera feed, calculating{" "}
                      <ClickableWord value={1500} onEarn={handleEarn} wordId="swole-joint-angles">
                        joint angles
                      </ClickableWord>{" "}
                      and movement patterns to ensure proper form during exercises.
                    </>
                  ) : project.id === "get-swole" && index === 2 ? (
                    <>
                      By combining real-time pose estimation with a separately trained model, Get Swole provides{" "}
                      <ClickableWord value={1700} onEarn={handleEarn} wordId="swole-instant-feedback">
                        instant feedback
                      </ClickableWord>{" "}
                      on your workout technique, helping you maximize results while minimizing{" "}
                      <ClickableWord value={1400} onEarn={handleEarn} wordId="swole-injury-risk">
                        injury risk
                      </ClickableWord>
                      .
                    </>
                  ) : project.id === "website-portfolio" && index === 0 ? (
                    <>
                      This portfolio website features a unique{" "}
                      <ClickableWord value={1800} onEarn={handleEarn} wordId="portfolio-gamified">
                        gamified experience
                      </ClickableWord>{" "}
                      where visitors can click highlighted words throughout the site to earn{" "}
                      <ClickableWord value={1600} onEarn={handleEarn} wordId="portfolio-virtual-currency">
                        virtual currency
                      </ClickableWord>
                      . Each interaction is tracked persistently using{" "}
                      <ClickableWord value={2000} onEarn={handleEarn} wordId="portfolio-cloud-storage">
                        cloud storage
                      </ClickableWord>
                      , ensuring progress is maintained across sessions and devices.
                    </>
                  ) : project.id === "website-portfolio" && index === 1 ? (
                    <>
                      The site showcases an immersive{" "}
                      <ClickableWord value={2200} onEarn={handleEarn} wordId="portfolio-mars-parallax">
                        Mars parallax background
                      </ClickableWord>{" "}
                      with animated elements including a roving{" "}
                      <ClickableWord value={1500} onEarn={handleEarn} wordId="portfolio-mars-rover">
                        Mars rover
                      </ClickableWord>
                      , rotating Earth, distant mountains, and a futuristic Mars colony. The rover autonomously travels across the terrain, reversing direction at screen edges while maintaining smooth animations.
                    </>
                  ) : project.id === "website-portfolio" && index === 2 ? (
                    <>
                      Built with{" "}
                      <ClickableWord value={1700} onEarn={handleEarn} wordId="portfolio-modern-tech">
                        modern web technologies
                      </ClickableWord>
                      , the portfolio demonstrates advanced React patterns, TypeScript type safety, Tailwind CSS design system, and{" "}
                      <ClickableWord value={1900} onEarn={handleEarn} wordId="portfolio-fullstack">
                        full-stack capabilities
                      </ClickableWord>{" "}
                      with Lovable Cloud for persistent data storage and real-time synchronization.
                    </>
                   ) : project.id === "rover" && index === 0 ? (
                    <>
                      The UBC Rover team's{" "}
                      <ClickableWord value={2000} onEarn={handleEarn} wordId="rover-rl-framework">
                        reinforcement learning framework
                      </ClickableWord>{" "}
                      designed to push the boundaries of{" "}
                      <ClickableWord value={1800} onEarn={handleEarn} wordId="rover-autonomous-navigation">
                        autonomous navigation
                      </ClickableWord>{" "}
                      and intelligent decision-making in challenging terrain. This project serves as the foundation for teaching our rover to{" "}
                      <ClickableWord value={1600} onEarn={handleEarn} wordId="rover-learn-environment">
                        learn from its environment
                      </ClickableWord>{" "}
                      and make complex decisions in real-time.
                    </>
                  ) : project.id === "rover" && index === 1 ? (
                    <>
                      The framework integrates with the rover's{" "}
                      <ClickableWord value={1500} onEarn={handleEarn} wordId="rover-ros-systems">
                        ROS-based control systems
                      </ClickableWord>
                      , enabling seamless deployment of trained models directly onto the physical hardware. Through iterative training in both simulated and real-world environments, the rover continuously improves its ability to{" "}
                      <ClickableWord value={1700} onEarn={handleEarn} wordId="rover-navigate-obstacles">
                        navigate obstacles
                      </ClickableWord>
                      , optimize path planning, and adapt to unexpected conditions.
                    </>
                  ) : project.id === "rover" && index === 2 ? (
                    <>
                      As part of the broader UBC Rover initiative, this project coordinates{" "}
                      <ClickableWord value={1900} onEarn={handleEarn} wordId="rover-specialized-components">
                        multiple specialized components
                      </ClickableWord>{" "}
                      that each tackle different aspects of rover intelligence, from{" "}
                      <ClickableWord value={1400} onEarn={handleEarn} wordId="rover-low-level-control">
                        low-level control systems
                      </ClickableWord>{" "}
                      to high-level mission planning. The{" "}
                      <ClickableWord value={2100} onEarn={handleEarn} wordId="rover-modular-architecture">
                        modular architecture
                      </ClickableWord>{" "}
                      allows individual components to be developed, tested, and integrated independently while maintaining system-wide coherence.
                    </>
                  ) : (
                    paragraph
                  )}
                </p>
              ))}
            </section>

            {project.subProjects && project.subProjects.length > 0 && (
              <section className="mb-8">
                <h2 className="text-3xl font-serif font-bold mb-6">Related Projects</h2>
                <div className="grid grid-cols-1 gap-6">
                  {project.subProjects.map((subProject, index) => (
                    <div
                      key={index}
                      className="bg-secondary/30 backdrop-blur-sm rounded-lg p-6 border border-border hover:border-primary/50 transition-colors"
                    >
                      <h3 className="text-2xl font-serif font-bold mb-3">{subProject.title}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {subProject.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {subProject.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <a href={subProject.github} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          View Repository
                        </Button>
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="mb-8">
              <h2 className="text-3xl font-serif font-bold mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {(project.github || project.devpost) && (
              <section className="flex gap-4">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Button variant="default">
                      View on GitHub
                    </Button>
                  </a>
                )}
                {project.devpost && (
                  <a href={project.devpost} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline">
                      View on DevPost
                    </Button>
                  </a>
                )}
              </section>
            )}
          </article>
        </div>
      </main>
    </div>
  );
}
