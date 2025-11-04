import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getSessionId } from "@/lib/sessionManager";

export default function AboutMe() {
  const [totalEarnings, setTotalEarnings] = useState(1000);
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
      <div className="relative z-10 pt-32 px-4 pb-20 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
          <h1 className="text-6xl font-serif font-bold text-white mb-8">
            Who is Aaron Rhim?
          </h1>
          
          {/* Photo Placeholder */}
          <div className="flex justify-center mb-12">
            <div className="w-64 h-64 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <span className="text-white/60 text-lg">Photo Coming Soon</span>
            </div>
          </div>
        </div>

        {/* Main Info Cards - Creative Grid Layout */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 card-hover">
            <p className="text-white text-xl leading-relaxed">
              I'm a <span className="text-accent font-semibold">Computer Science student</span> at the University of British Columbia!
            </p>
          </Card>

          <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 card-hover">
            <p className="text-white text-xl leading-relaxed">
              I take pride in my ability to <span className="text-accent font-semibold">design, develop, and lead</span> high quality solutions for software engineering systems!
            </p>
          </Card>
        </div>

        {/* Full Width Card */}
        <Card className="p-8 mb-16 bg-white/10 backdrop-blur-sm border-white/20 card-hover">
          <p className="text-white text-xl leading-relaxed text-center">
            I'm passionate about taking my skills to the next level and making an <span className="text-accent font-semibold">impact on the greater community</span>.
          </p>
        </Card>

          {/* You Can Also Find Me Section */}
          <div ref={secondSectionRef} className="mt-20">
            <h2 className="text-5xl font-serif font-bold text-white text-center mb-12">
              You can also find me...
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
            {/* Playing Sports */}
            <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 card-hover">
              <div className="mb-4">
                <div className="text-6xl mb-4">🎾</div>
                <h3 className="text-2xl font-serif font-bold text-white mb-4">
                  Playing Sports
                </h3>
              </div>
              <p className="text-white/80 text-lg">
                Tennis is my main one right now!
              </p>
            </Card>

            {/* Playing Piano */}
            <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 card-hover">
              <div className="mb-4">
                <div className="text-6xl mb-4">🎹</div>
                <h3 className="text-2xl font-serif font-bold text-white mb-4">
                  Playing Piano
                </h3>
              </div>
              <p className="text-white/80 text-lg mb-4">
                La Campanella is my greatest masterpiece!
              </p>
              <a
                href="https://youtu.be/JRo3_ib7wmE?si=7Aw_zm1kf4raj2_v"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-semibold"
              >
                Watch my performance
                <ExternalLink className="w-4 h-4" />
              </a>
            </Card>

            {/* Eating Food */}
            <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 card-hover">
              <div className="mb-4">
                <div className="text-6xl mb-4">🍜</div>
                <h3 className="text-2xl font-serif font-bold text-white mb-4">
                  Eating Food
                </h3>
              </div>
              <p className="text-white/80 text-lg">
                There are 105 restaurants on campus at UBC!
              </p>
            </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
