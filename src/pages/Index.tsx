import { useState } from "react";
import { MoneyCounter } from "@/components/MoneyCounter";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { MarsParallaxBackground } from "@/components/MarsParallaxBackground";

const Index = () => {
  const [totalEarnings, setTotalEarnings] = useState(1000);

  const handleEarn = (amount: number) => {
    setTotalEarnings((prev) => prev + amount);
  };

  return (
    <div className="min-h-screen relative">
      <MarsParallaxBackground />
      <MoneyCounter amount={totalEarnings} />
      
      <main>
        <Hero onEarn={handleEarn} />
        <Projects onEarn={handleEarn} />
        <Skills onEarn={handleEarn} />
        <Contact onEarn={handleEarn} totalEarnings={totalEarnings} />
      </main>

      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2025 Your Name. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
