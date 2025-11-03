import { useEffect, useRef, useState } from "react";
import { MoneyCounter } from "@/components/MoneyCounter";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { MarsParallaxBackground } from "@/components/MarsParallaxBackground";

const Index = () => {
  const [totalEarnings, setTotalEarnings] = useState(1000);
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 0
  );
  const [scrollMetrics, setScrollMetrics] = useState({
    scroll: 0,
    sectionTop: Number.POSITIVE_INFINITY,
  });
  const secondSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollPosition = scrollMetrics.scroll;
  const sectionTop = scrollMetrics.sectionTop;

  const handleEarn = (amount: number) => {
    setTotalEarnings((prev) => prev + amount);
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
  const overlayStartRatio = 0.95; // Align with the visible top of the foreground terrain
  const baseTerrainTop = viewportHeight * overlayStartRatio;
  // const sectionTopInViewport = secondSectionRef.current
  //   ? secondSectionRef.current.getBoundingClientRect().top
  //   : Number.POSITIVE_INFINITY;
  // const baseTerrainTop = Math.min(
  //   viewportHeight,
  //   Math.max(0, sectionTopInViewport)
  // );
  const overlayTop = Math.max(0, baseTerrainTop - terrainOffset);
  const showOverlay = sectionTop < viewportHeight;

  return (
    <div className="min-h-screen relative">
      <MarsParallaxBackground />
      <div
        className="fixed inset-x-0 bottom-0 z-0 pointer-events-none transition-opacity duration-200 ease-out"
        style={{
          top: showOverlay ? `${overlayTop}px` : "100%",
          opacity: showOverlay ? 1 : 0,
          backgroundColor: "#d2691e",
        }}
        aria-hidden="true"
      />
      <MoneyCounter amount={totalEarnings} />
      
      <main className="relative z-10">
        <section>
          <Hero onEarn={handleEarn} />
        </section>

        <section
          ref={secondSectionRef}
          className="relative min-h-screen pt-16 md:pt-24"
        >
          <Projects onEarn={handleEarn} />
          <Skills onEarn={handleEarn} />
          <Contact onEarn={handleEarn} totalEarnings={totalEarnings} />
        </section>
      </main>

      <footer className="py-8 px-4 border-t border-border relative z-10 bg-[#d2691e]">
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
