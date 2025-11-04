import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { getSessionId } from "@/lib/sessionManager";

const Index = () => {
  const [totalEarnings, setTotalEarnings] = useState(1000);
  const [lastEarned, setLastEarned] = useState(0);
  const [pendingEarnings, setPendingEarnings] = useState(0);
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

  const handleEarn = (amount: number) => {
    setPendingEarnings(amount);
    setLastEarned(amount);
  };

  const handleAnimationComplete = () => {
    if (pendingEarnings > 0) {
      setTotalEarnings((prev) => prev + pendingEarnings);
      setPendingEarnings(0);
    }
    setLastEarned(0);
  };

  // Load initial total earnings from database
  useEffect(() => {
    const loadTotalEarnings = async () => {
      const sessionId = getSessionId();
      
      const { data, error } = await supabase
        .from('clicked_words')
        .select('value')
        .eq('session_id', sessionId);

      if (!error && data) {
        const total = data.reduce((sum, item) => sum + item.value, 1000); // Start with base 1000
        setTotalEarnings(total);
      }
    };

    loadTotalEarnings();
  }, []);

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
      <div
        className="fixed inset-x-0 bottom-0 z-0 pointer-events-none"
        style={{
          top: `${overlayTop}px`,
          backgroundColor: "hsl(var(--terrain))",
        }}
        aria-hidden="true"
      />
      <Header amount={totalEarnings} earnedAmount={lastEarned} onAnimationComplete={handleAnimationComplete} />
      
      <main className="relative z-10 pt-24 animate-fade-in">
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

      <Footer />
    </div>
  );
};

export default Index;
