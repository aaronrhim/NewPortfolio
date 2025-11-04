import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const NotFound = () => {
  const location = useLocation();
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

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

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
    <div className="relative min-h-screen">
      <div
        className="fixed inset-x-0 bottom-0 z-0 pointer-events-none"
        style={{
          top: `${overlayTop}px`,
          backgroundColor: "hsl(var(--terrain))",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 flex min-h-screen items-center justify-center bg-gray-100 animate-fade-in">
        <div ref={secondSectionRef} className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
          <a href="/" className="text-blue-500 underline hover:text-blue-700">
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
