import { useEffect, useState } from "react";
import marsRoverImg from "@/assets/mars-rover.png";
import earthPlanetImg from "@/assets/earth-planet.png";

export const MarsParallaxBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate positions based on scroll with different parallax speeds
  const starsOffset = scrollY * 0.2;
  const planetOffset = scrollY * 0.3;
  const distantMountainsOffset = scrollY * 0.35;
  const terrainOffset = scrollY * 0.5;
  const rocksOffset = scrollY * 0.55;
  const roverOffset = scrollY * 0.6;
  
  // Rover follows a curved path across the screen
  const scrollProgress = Math.min(scrollY / 2000, 1); // Normalize to 0-1 over 2000px
  const roverX = 5 + (scrollProgress * 80); // Move from 5% to 85%
  const roverY = 25 - Math.sin(scrollProgress * Math.PI * 2) * 5; // Wave motion
  const roverRotation = Math.sin(scrollProgress * Math.PI * 4) * 3; // Slight tilt

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Space background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460]" />
      
      {/* Stars layer - slowest parallax */}
      <div 
        className="absolute inset-0"
        style={{ transform: `translateY(${starsOffset}px)` }}
      >
        {/* Generate multiple stars */}
        {Array.from({ length: 80 }).map((_, i) => {
          const size = Math.random() * 3 + 1;
          const left = Math.random() * 100;
          const top = (Math.random() * 200) - 20; // Extended range for scrolling
          const opacity = Math.random() * 0.5 + 0.3;
          
          return (
            <div
              key={`star-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}vh`,
                opacity,
                boxShadow: `0 0 ${size * 2}px rgba(255, 255, 255, ${opacity})`,
              }}
            />
          );
        })}
      </div>

      {/* Earth planet - medium parallax */}
      <div
        className="absolute"
        style={{
          left: '8%',
          top: '15vh',
          transform: `translateY(${planetOffset}px)`,
          width: '120px',
          height: '120px',
        }}
      >
        <img
          src={earthPlanetImg}
          alt=""
          className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(100,149,237,0.5)]"
        />
      </div>

      {/* Distant mountains layer */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          transform: `translateY(${-distantMountainsOffset}px)`,
          height: '45vh',
        }}
      >
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,250 L200,200 L350,220 L500,180 L650,210 L800,170 L950,200 L1200,190 L1200,400 L0,400 Z"
            fill="#8B4513"
            opacity="0.3"
          />
          <path
            d="M0,280 L150,240 L300,260 L450,230 L600,250 L750,220 L900,245 L1200,235 L1200,400 L0,400 Z"
            fill="#A0522D"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Mars terrain - faster parallax */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          transform: `translateY(${-terrainOffset}px)`,
          height: '35vh',
        }}
      >
        {/* Orange Mars terrain with hills */}
        <div className="absolute bottom-0 left-0 right-0 h-full">
          {/* Background hills */}
          <svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 1200 300"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="marsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#ff7f50', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#ff6347', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            {/* Wavy Mars terrain */}
            <path
              d="M0,150 Q150,120 300,140 T600,130 T900,145 T1200,135 L1200,300 L0,300 Z"
              fill="url(#marsGradient)"
              opacity="0.6"
            />
            <path
              d="M0,180 Q200,160 400,175 T800,170 T1200,180 L1200,300 L0,300 Z"
              fill="url(#marsGradient)"
              opacity="0.8"
            />
            <path
              d="M0,220 Q150,200 300,210 T600,205 T900,215 T1200,210 L1200,300 L0,300 Z"
              fill="#d2691e"
            />
          </svg>

          {/* Terrain details - rocks and shadows */}
          <div className="absolute bottom-16 left-[15%] w-20 h-8 rounded-full bg-[#a0522d] opacity-40" />
          <div className="absolute bottom-20 left-[45%] w-16 h-6 rounded-full bg-[#a0522d] opacity-30" />
          <div className="absolute bottom-12 left-[70%] w-24 h-10 rounded-full bg-[#a0522d] opacity-35" />
          <div className="absolute bottom-24 left-[85%] w-12 h-5 rounded-full bg-[#a0522d] opacity-25" />
        </div>
      </div>

      {/* Rocks and craters layer - parallax between terrain and rover */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          transform: `translateY(${-rocksOffset}px)`,
        }}
      >
        {/* Craters */}
        <div className="absolute bottom-[22vh] left-[10%] w-16 h-8 rounded-[50%] bg-[#8B4513] opacity-50 border-2 border-[#654321]" />
        <div className="absolute bottom-[28vh] left-[35%] w-24 h-12 rounded-[50%] bg-[#8B4513] opacity-40 border-2 border-[#654321]" />
        <div className="absolute bottom-[25vh] left-[65%] w-20 h-10 rounded-[50%] bg-[#8B4513] opacity-45 border-2 border-[#654321]" />
        
        {/* Rocks */}
        <div className="absolute bottom-[20vh] left-[25%] w-8 h-12 bg-[#654321] opacity-70" 
          style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
        <div className="absolute bottom-[23vh] left-[50%] w-10 h-14 bg-[#654321] opacity-60"
          style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)' }} />
        <div className="absolute bottom-[21vh] left-[80%] w-12 h-16 bg-[#654321] opacity-65"
          style={{ clipPath: 'polygon(50% 0%, 80% 30%, 100% 100%, 0% 100%, 20% 30%)' }} />
        
        {/* Small scattered rocks */}
        <div className="absolute bottom-[19vh] left-[18%] w-4 h-6 bg-[#8B4513] rounded-sm opacity-50" />
        <div className="absolute bottom-[24vh] left-[42%] w-5 h-7 bg-[#8B4513] rounded-sm opacity-55" />
        <div className="absolute bottom-[20vh] left-[58%] w-3 h-5 bg-[#8B4513] rounded-sm opacity-45" />
        <div className="absolute bottom-[26vh] left-[72%] w-6 h-8 bg-[#8B4513] rounded-sm opacity-60" />
        <div className="absolute bottom-[22vh] left-[90%] w-4 h-6 bg-[#8B4513] rounded-sm opacity-50" />
      </div>

      {/* Mars Rover - fastest parallax with curved path */}
      <div
        className="absolute transition-all duration-100 ease-out"
        style={{
          left: `${roverX}%`,
          bottom: `${roverY}vh`,
          transform: `translateY(${-roverOffset}px) rotate(${roverRotation}deg)`,
          width: '180px',
        }}
      >
        <img
          src={marsRoverImg}
          alt=""
          className="w-full h-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
        />
        {/* Dust trail effect */}
        {scrollY > 50 && (
          <div 
            className="absolute -bottom-2 left-0 w-12 h-3 bg-[#CD853F] rounded-full blur-sm opacity-30"
            style={{
              transform: `translateX(-${scrollProgress * 20}px)`,
            }}
          />
        )}
      </div>
    </div>
  );
};