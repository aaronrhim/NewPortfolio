import { DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

interface HeaderProps {
  amount: number;
  earnedAmount?: number;
  onAnimationComplete?: () => void;
}

export const Header = ({ amount, earnedAmount, onAnimationComplete }: HeaderProps) => {
  const [displayAmount, setDisplayAmount] = useState(amount);
  const [isVisible, setIsVisible] = useState(true);
  const [showEarning, setShowEarning] = useState(false);
  const lastScrollY = useRef(0);
  const animationTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setDisplayAmount(amount);
  }, [amount]);

  // Handle scroll to show/hide header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Don't hide if showing earning animation
      if (showEarning) return;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showEarning]);

  // Handle earning animation
  useEffect(() => {
    if (earnedAmount && earnedAmount > 0) {
      // Clear any existing timeout
      if (animationTimeout.current) {
        clearTimeout(animationTimeout.current);
      }
      
      // Show header and earning
      setIsVisible(true);
      setShowEarning(true);
      
      // Hide earning after animation
      animationTimeout.current = setTimeout(() => {
        setShowEarning(false);
        onAnimationComplete?.();
      }, 1500);
    }
  }, [earnedAmount, onAnimationComplete]);

  const formatMoney = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 px-4 transition-transform duration-300 ${
        isVisible ? "translate-y-8" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto bg-black/40 backdrop-blur-sm rounded-3xl border border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1 relative overflow-hidden">
            <span className="text-sm text-accent uppercase tracking-wider">Your Earnings:</span>
            <div className="relative h-8 overflow-hidden">
              <div 
                className={`absolute inset-0 transition-transform duration-500 ${
                  showEarning ? '-translate-y-full' : 'translate-y-0'
                }`}
              >
                <span className="text-2xl font-bold text-white block">
                  ${(displayAmount / 100).toFixed(2)}
                </span>
              </div>
              <div 
                className={`absolute inset-0 transition-transform duration-500 ${
                  showEarning ? 'translate-y-0' : 'translate-y-full'
                }`}
              >
                <span className="text-2xl font-bold block" style={{ color: '#22c55e' }}>
                  +${(earnedAmount ? earnedAmount / 100 : 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          
          <nav className="flex items-center gap-2">
            <Link 
              to="/" 
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm font-medium text-white transition-all duration-300"
            >
              Home
            </Link>
            <span className="text-white/50">|</span>
            <Link 
              to="/projects" 
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm font-medium text-white transition-all duration-300"
            >
              Projects
            </Link>
            <span className="text-white/50">|</span>
            <Link 
              to="/about" 
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm font-medium text-white transition-all duration-300"
            >
              About Me
            </Link>
            <span className="text-white/50">|</span>
            <a 
              href="https://drive.google.com/file/d/10ep7k9FxkevmyLvNVe8t2HCa_Fd2GVAZ/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm font-medium text-white transition-all duration-300"
            >
              Resume
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};
