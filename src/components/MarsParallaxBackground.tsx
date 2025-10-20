import { useEffect, useState } from "react";

export const MarsParallaxBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate positions based on scroll - creating planet rotation effect
  const scrollProgress = Math.min(scrollY / 1500, 1); // Normalize to 0-1 over 1500px (faster movement)
  const rotationAngle = scrollProgress * 360; // Full rotation over scroll range
  
  // Parallax offsets for terrain layers
  const starsOffset = scrollY * 0.15;
  const distantMountainsOffset = scrollY * 0.35;
  const terrainOffset = scrollY * 0.5;
  const colonyOffset = scrollY * 0.45;
  const terrainFold1Offset = scrollY * 0.6;
  const terrainFold2Offset = scrollY * 0.7;
  const terrainFold3Offset = scrollY * 0.8;
  
  // Earth arcs across screen while moving UP (stays above terrain)
  const earthX = -20 + (scrollProgress * 140); // Move from -20% to 120%
  // Arc: starts at 45vh (low), peaks at 8vh (high) at center, ends at 20vh (higher than start)
  const earthY = 45 - (scrollProgress * 25) - Math.sin(scrollProgress * Math.PI) * 17;
  const earthRotation = rotationAngle * 0.3; // Slower rotation for Earth
  
  // Rover behavior: grows and moves right until threshold, then moves down the terrain
  const roverThreshold = 0.35; // At 35% scroll, rover stops moving right and starts moving down
  const isRoverTraversing = scrollProgress > roverThreshold;
  
  const roverX = isRoverTraversing ? 55 : -10 + (scrollProgress / roverThreshold * 65); // Move from -10% to 55%, then stop
  const roverScale = isRoverTraversing ? 1.2 : 0.4 + (scrollProgress / roverThreshold * 0.8); // Grow to 1.2x, then stop
  
  // When traversing, move down the page following terrain
  const traverseProgress = isRoverTraversing ? (scrollProgress - roverThreshold) / (1 - roverThreshold) : 0;
  const roverY = isRoverTraversing ? 18 + (traverseProgress * 150) : 18; // Moves down 150vh

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

      {/* Earth planet - arcing movement with rotation */}
      <div
        className="absolute transition-all duration-100 ease-out"
        style={{
          left: `${earthX}%`,
          top: `${earthY}vh`,
          transform: `rotate(${earthRotation}deg)`,
          width: '200px',
          height: '200px',
        }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_40px_rgba(100,149,237,0.6)]">
          <defs>
            <radialGradient id="earthGradient" cx="35%" cy="35%">
              <stop offset="0%" stopColor="#6495ED" />
              <stop offset="50%" stopColor="#4169E1" />
              <stop offset="100%" stopColor="#1E3A5F" />
            </radialGradient>
            <radialGradient id="earthHighlight" cx="30%" cy="30%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>
          {/* Main sphere */}
          <circle cx="100" cy="100" r="90" fill="url(#earthGradient)" />
          {/* Continents */}
          <path d="M60,50 Q80,45 100,50 T140,55 Q145,65 140,75 L120,80 Q110,85 95,80 L70,70 Z" fill="#228B22" opacity="0.7" />
          <path d="M130,90 Q150,85 160,95 L165,120 Q160,135 145,130 L125,125 Q120,115 125,105 Z" fill="#228B22" opacity="0.6" />
          <path d="M40,110 Q50,105 65,110 L70,130 Q65,145 50,140 L35,130 Z" fill="#228B22" opacity="0.65" />
          <ellipse cx="85" cy="140" rx="25" ry="15" fill="#228B22" opacity="0.55" />
          {/* Clouds */}
          <ellipse cx="70" cy="60" rx="15" ry="8" fill="white" opacity="0.4" />
          <ellipse cx="150" cy="110" rx="20" ry="10" fill="white" opacity="0.35" />
          <ellipse cx="55" cy="150" rx="12" ry="6" fill="white" opacity="0.3" />
          {/* Highlight */}
          <circle cx="100" cy="100" r="90" fill="url(#earthHighlight)" />
        </svg>
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

      {/* Mars Colony - gets hidden by terrain when scrolling up */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          transform: `translateY(${-colonyOffset}px)`,
        }}
      >
        {/* Dome habitats */}
        <div className="absolute bottom-[24vh] left-[15%]">
          <div className="w-24 h-12 bg-gradient-to-b from-[#C0C0C0]/40 to-[#808080]/30 rounded-t-full border-2 border-[#606060]/50" />
          <div className="w-24 h-2 bg-[#505050]" />
        </div>
        
        <div className="absolute bottom-[26vh] left-[35%]">
          <div className="w-32 h-16 bg-gradient-to-b from-[#C0C0C0]/40 to-[#808080]/30 rounded-t-full border-2 border-[#606060]/50" />
          <div className="w-32 h-2 bg-[#505050]" />
        </div>
        
        <div className="absolute bottom-[23vh] left-[58%]">
          <div className="w-20 h-10 bg-gradient-to-b from-[#C0C0C0]/40 to-[#808080]/30 rounded-t-full border-2 border-[#606060]/50" />
          <div className="w-20 h-2 bg-[#505050]" />
        </div>
        
        {/* Rectangular buildings */}
        <div className="absolute bottom-[22vh] left-[25%] w-16 h-20 bg-gradient-to-b from-[#A0A0A0] to-[#707070] border-2 border-[#505050]">
          <div className="absolute top-2 left-2 w-3 h-3 bg-[#4a9eff]/60" />
          <div className="absolute top-2 right-2 w-3 h-3 bg-[#4a9eff]/60" />
          <div className="absolute top-8 left-2 w-3 h-3 bg-[#4a9eff]/60" />
          <div className="absolute top-8 right-2 w-3 h-3 bg-[#4a9eff]/60" />
        </div>
        
        <div className="absolute bottom-[24vh] left-[48%] w-12 h-24 bg-gradient-to-b from-[#A0A0A0] to-[#707070] border-2 border-[#505050]">
          <div className="absolute top-2 left-2 w-2 h-2 bg-[#4a9eff]/60" />
          <div className="absolute top-2 right-2 w-2 h-2 bg-[#4a9eff]/60" />
          <div className="absolute top-7 left-2 w-2 h-2 bg-[#4a9eff]/60" />
          <div className="absolute top-7 right-2 w-2 h-2 bg-[#4a9eff]/60" />
        </div>
        
        <div className="absolute bottom-[21vh] left-[70%] w-14 h-16 bg-gradient-to-b from-[#A0A0A0] to-[#707070] border-2 border-[#505050]">
          <div className="absolute top-2 left-2 w-2 h-2 bg-[#4a9eff]/60" />
          <div className="absolute top-2 right-2 w-2 h-2 bg-[#4a9eff]/60" />
        </div>
        
        {/* Communication tower */}
        <div className="absolute bottom-[22vh] left-[80%]">
          <div className="w-2 h-32 bg-gradient-to-t from-[#606060] to-[#808080] mx-auto" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#C0C0C0] rounded-full border-2 border-[#707070]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#ff4444] rounded-full animate-pulse" />
          </div>
        </div>
        
        {/* Solar panel arrays */}
        <div className="absolute bottom-[20vh] left-[20%] w-12 h-8 bg-gradient-to-br from-[#1a1a2e] to-[#2a2a3e] border border-[#4a4a5e] opacity-80 transform -rotate-12" />
        <div className="absolute bottom-[21vh] left-[52%] w-16 h-10 bg-gradient-to-br from-[#1a1a2e] to-[#2a2a3e] border border-[#4a4a5e] opacity-80 transform rotate-6" />
        <div className="absolute bottom-[19vh] left-[75%] w-10 h-6 bg-gradient-to-br from-[#1a1a2e] to-[#2a2a3e] border border-[#4a4a5e] opacity-80 transform -rotate-6" />
      </div>

      {/* Mars Rover - moves across terrain and approaches camera (grows) */}
      <div
        className="absolute transition-all duration-100 ease-out"
        style={{
          left: `${roverX}%`,
          bottom: `${roverY}vh`,
          transform: `scale(${roverScale})`,
          width: '280px',
          transformOrigin: 'center bottom',
        }}
      >
        <svg viewBox="0 0 280 180" className="w-full h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]">
          <defs>
            <linearGradient id="roverBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#B8B8B8" />
              <stop offset="100%" stopColor="#707070" />
            </linearGradient>
            <linearGradient id="roverPanel" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1a1a2e" />
              <stop offset="50%" stopColor="#2a2a3e" />
              <stop offset="100%" stopColor="#1a1a2e" />
            </linearGradient>
          </defs>
          
          {/* Wheels */}
          <g>
            {/* Left wheels */}
            <circle cx="60" cy="155" r="22" fill="#3a3a3a" stroke="#1a1a1a" strokeWidth="3" />
            <circle cx="60" cy="155" r="14" fill="#2a2a2a" />
            <circle cx="140" cy="155" r="22" fill="#3a3a3a" stroke="#1a1a1a" strokeWidth="3" />
            <circle cx="140" cy="155" r="14" fill="#2a2a2a" />
            <circle cx="220" cy="155" r="22" fill="#3a3a3a" stroke="#1a1a1a" strokeWidth="3" />
            <circle cx="220" cy="155" r="14" fill="#2a2a2a" />
            
            {/* Wheel spokes */}
            <line x1="60" y1="145" x2="60" y2="165" stroke="#555" strokeWidth="2" />
            <line x1="50" y1="155" x2="70" y2="155" stroke="#555" strokeWidth="2" />
            <line x1="140" y1="145" x2="140" y2="165" stroke="#555" strokeWidth="2" />
            <line x1="130" y1="155" x2="150" y2="155" stroke="#555" strokeWidth="2" />
            <line x1="220" y1="145" x2="220" y2="165" stroke="#555" strokeWidth="2" />
            <line x1="210" y1="155" x2="230" y2="155" stroke="#555" strokeWidth="2" />
          </g>
          
          {/* Suspension */}
          <rect x="50" y="140" width="180" height="8" fill="#505050" rx="2" />
          <rect x="45" y="135" width="10" height="15" fill="#606060" rx="2" />
          <rect x="135" y="135" width="10" height="15" fill="#606060" rx="2" />
          <rect x="225" y="135" width="10" height="15" fill="#606060" rx="2" />
          
          {/* Main body */}
          <rect x="40" y="80" width="200" height="60" fill="url(#roverBody)" rx="8" />
          <rect x="45" y="85" width="190" height="50" fill="#909090" opacity="0.3" rx="6" />
          
          {/* Solar panels */}
          <rect x="25" y="55" width="230" height="20" fill="url(#roverPanel)" rx="3" />
          <g opacity="0.6">
            <line x1="35" y1="57" x2="35" y2="73" stroke="#4a4a5e" strokeWidth="1.5" />
            <line x1="55" y1="57" x2="55" y2="73" stroke="#4a4a5e" strokeWidth="1.5" />
            <line x1="75" y1="57" x2="75" y2="73" stroke="#4a4a5e" strokeWidth="1.5" />
            <line x1="95" y1="57" x2="95" y2="73" stroke="#4a4a5e" strokeWidth="1.5" />
            <line x1="115" y1="57" x2="115" y2="73" stroke="#4a4a5e" strokeWidth="1.5" />
            <line x1="135" y1="57" x2="135" y2="73" stroke="#4a4a5e" strokeWidth="1.5" />
            <line x1="155" y1="57" x2="155" y2="73" stroke="#4a4a5e" strokeWidth="1.5" />
            <line x1="175" y1="57" x2="175" y2="73" stroke="#4a4a5e" strokeWidth="1.5" />
            <line x1="195" y1="57" x2="195" y2="73" stroke="#4a4a5e" strokeWidth="1.5" />
            <line x1="215" y1="57" x2="215" y2="73" stroke="#4a4a5e" strokeWidth="1.5" />
            <line x1="235" y1="57" x2="235" y2="73" stroke="#4a4a5e" strokeWidth="1.5" />
          </g>
          
          {/* Camera mast */}
          <rect x="130" y="35" width="20" height="45" fill="#808080" rx="3" />
          <rect x="125" y="30" width="30" height="12" fill="#606060" rx="4" />
          
          {/* Cameras */}
          <circle cx="133" cy="36" r="4" fill="#2a2a3e" />
          <circle cx="147" cy="36" r="4" fill="#2a2a3e" />
          <circle cx="133" cy="36" r="2" fill="#4a9eff" opacity="0.8" />
          <circle cx="147" cy="36" r="2" fill="#4a9eff" opacity="0.8" />
          
          {/* Antenna */}
          <line x1="140" y1="30" x2="140" y2="15" stroke="#707070" strokeWidth="2" />
          <circle cx="140" cy="12" r="5" fill="#C0C0C0" />
          
          {/* Details on body */}
          <rect x="60" y="95" width="35" height="25" fill="#505050" rx="3" />
          <rect x="185" y="95" width="35" height="25" fill="#505050" rx="3" />
          <circle cx="140" cy="107" r="12" fill="#404040" />
          <circle cx="140" cy="107" r="8" fill="#2a2a3e" />
        </svg>
        
        {/* Dust trail effect */}
        {scrollY > 50 && (
          <div 
            className="absolute -bottom-2 left-0 w-16 h-4 bg-[#CD853F] rounded-full blur-md opacity-30"
            style={{
              transform: `translateX(-${scrollProgress * 20}px)`,
            }}
          />
        )}
      </div>

      {/* Extended terrain folds - parallax layers going down the page */}
      {/* Terrain fold 1 */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: '100vh',
          transform: `translateY(${-terrainFold1Offset}px)`,
          height: '40vh',
        }}
      >
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1200 300"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="marsGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ff6347', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#d2691e', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path
            d="M0,100 Q200,80 400,90 T800,85 T1200,95 L1200,300 L0,300 Z"
            fill="url(#marsGradient2)"
            opacity="0.7"
          />
          <path
            d="M0,150 Q150,130 300,140 T600,135 T900,145 T1200,140 L1200,300 L0,300 Z"
            fill="#cd853f"
          />
        </svg>
      </div>

      {/* Terrain fold 2 */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: '160vh',
          transform: `translateY(${-terrainFold2Offset}px)`,
          height: '45vh',
        }}
      >
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1200 300"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,120 Q250,90 500,110 T1000,105 T1200,115 L1200,300 L0,300 Z"
            fill="#a0522d"
            opacity="0.6"
          />
          <path
            d="M0,170 Q200,140 400,160 T800,150 T1200,165 L1200,300 L0,300 Z"
            fill="#d2691e"
          />
        </svg>
      </div>

      {/* Terrain fold 3 */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: '230vh',
          transform: `translateY(${-terrainFold3Offset}px)`,
          height: '50vh',
        }}
      >
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1200 300"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,140 Q180,110 360,130 T720,120 T1200,135 L1200,300 L0,300 Z"
            fill="#8b4513"
            opacity="0.5"
          />
          <path
            d="M0,190 Q220,160 440,180 T880,170 T1200,185 L1200,300 L0,300 Z"
            fill="#cd853f"
          />
        </svg>
      </div>
    </div>
  );
};