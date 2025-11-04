import { ProjectCard } from "@/components/ProjectCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ClickableWord } from "@/components/ClickableWord";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getSessionId } from "@/lib/sessionManager";
import rememberMeImg from "@/assets/remember-me.png";
import getSwoleImg from "@/assets/get-swole.png";
import portfolioImg from "@/assets/portfolio-website.png";
import roverImg from "@/assets/rover-model.png";
import arrcImg from "@/assets/arrc.jpg";
import imageClassifierImg from "@/assets/image-classifier.png";
import customCnnImg from "@/assets/custom-cnn.png";
import stockPredictorImg from "@/assets/stock-predictor.png";
import gmailExtImg from "@/assets/gmail-extension.jpg";
import dockerImg from "@/assets/docker-pipeline.png";
import oldWebsiteImg from "@/assets/old-website.png";
import factImg from "@/assets/fact.png";
import leCruiterImg from "@/assets/LeCruiter.png";

export default function AllProjects() {
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

  useEffect(() => {
    const loadInitialEarnings = async () => {
      const sessionId = getSessionId();
      const { data, error } = await supabase
        .from("clicked_words")
        .select("value")
        .eq("session_id", sessionId);

      if (!error && data) {
        const total = data.reduce((sum, item) => sum + item.value, 1000);
        setTotalEarnings(total);
      }
    };

    loadInitialEarnings();
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

  const hackathonProjects = [
    {
      title: "Remember Me",
      description: "An Alzheimer's assistance camera that uses facial recognition to help loved ones remember people they meet. Built with AWS Rekognition, DynamoDB, and ElevenLabs TTS.",
      tags: ["Python", "AWS", "Cloud Storage", "Hardware", "React Native"],
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
      title: "LeCruiter",
      description: "AI-powered recruiter that streamlines the hiring process using advanced language models and automation.",
      tags: ["Chatbot", "Python", "AWS Bedrock", "AWS Lambda"],
      link: "/project/lecruiter",
      image: leCruiterImg,
    },
    {
      title: "F.A.C.T",
      description: "Fashion app that uses computer vision, MediaPipe, and maps clothing onto your body with a simple webcam.",
      tags: ["Python", "MediaPipe", "Computer Vision", "Fashion Tech", "Web Scraping"],
      link: "/project/fact",
      image: factImg,
    },
  ];

  const engineeringProjects = [
    {
      title: "Rover",
      description: "UBC Rover team's reinforcement learning framework for autonomous navigation and decision-making. A collection of interconnected projects advancing rover capabilities through machine learning.",
      tags: ["Python", "Reinforcement Learning", "ROS2", "Google Mujoco", "Docker"],
      link: "/project/rover",
      image: roverImg,
    },
    {
      title: "ARRC",
      description: "UBC Aerial Robotics and Rocketry Club's autonomous drone competition project for UAS Competition 2025, implementing advanced flight control and mission planning.",
      tags: ["Python", "Telemetry", "Computer Vision", "Docker"],
      link: "/project/arrc",
      image: arrcImg,
    },
  ];

  const softwareDevProjects = [
    {
      title: "Website Portfolio",
      description: "My full-stack portfolio site, powered by Next.js and Tailwind.",
      tags: ["Next.js", "Tailwind", "TypeScript", "Supabase"],
      link: "/project/website-portfolio",
      image: portfolioImg,
    },
    {
      title: "Old Website",
      description: "Previous personal portfolio website showcasing earlier projects and web development skills.",
      tags: ["HTML", "CSS", "JavaScript", "Jekyll"],
      link: "/project/old-website",
      image: oldWebsiteImg,
    },
    {
      title: "Gmail Extension",
      description: "Chrome extension that enhances Gmail functionality with custom features for improved email management and productivity.",
      tags: ["JavaScript", "Chrome API", "Web Extension", "Gmail"],
      link: "/project/gmail-extension",
      image: gmailExtImg,
    },
    {
      title: "Docker Pipeline",
      description: "Command-line tool for automating Docker workflows and container management, streamlining development and deployment processes.",
      tags: ["Docker", "CLI", "DevOps", "Automation"],
      link: "/project/docker-pipeline",
      image: dockerImg,
    },
  ];

  const aiProjects = [
    {
      title: "Image Classification",
      description: "Deep learning model for classifying images using convolutional neural networks, trained on diverse datasets for accurate object recognition.",
      tags: ["Python", "TensorFlow", "Deep Learning", "ResNet"],
      link: "/project/image-classification",
      image: imageClassifierImg,
    },
    {
      title: "Custom CNN Model",
      description: "Custom-built convolutional neural network architecture designed from scratch for specialized image processing tasks.",
      tags: ["Python", "PyTorch", "Neural Networks", "Deep Learning", "Keras"],
      link: "/project/custom-cnn",
      image: customCnnImg,
    },
    {
      title: "Stock Market Predictor",
      description: "Machine learning model that analyzes historical stock data to predict future market trends using time series analysis.",
      tags: ["Python", "Recurrent Neural Networks", "LSTM"],
      link: "/project/stock-predictor",
      image: stockPredictorImg,
    },
  ];

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
      <div className="relative z-10 py-32 px-4 animate-fade-in">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-serif font-normal mb-4 text-white">All Projects</h1>
            <p className="text-xl text-white">
              A comprehensive collection of my{" "}
              <ClickableWord value={5000} onEarn={handleEarn} wordId="all-projects-work" onTriggerHeader={() => {}}>
                work
              </ClickableWord>
            </p>
          </div>

          {/* Hackathons Section */}
          <section ref={secondSectionRef} className="-mx-4 px-4 py-12 mb-16">
            <h2 className="text-3xl font-serif font-normal text-white text-center mb-8">Hackathons</h2>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {hackathonProjects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </section>

          {/* Engineering Design Teams Section */}
          <section className="-mx-4 px-4 py-12 mb-16 bg-secondary/30">
            <h2 className="text-3xl font-serif font-normal text-white text-center mb-8">Engineering Design Teams</h2>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {engineeringProjects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </section>

          {/* Software Dev Projects Section */}
          <section className="-mx-4 px-4 py-12 mb-16 bg-secondary/30">
            <h2 className="text-3xl font-serif font-normal text-white text-center mb-8">Software Dev Projects</h2>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {softwareDevProjects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </section>

          {/* AI Projects Section */}
          <section className="-mx-4 px-4 py-12 mb-16">
            <h2 className="text-3xl font-serif font-normal text-white text-center mb-8">AI Projects</h2>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {aiProjects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
