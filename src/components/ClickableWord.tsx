import { useState } from "react";

interface ClickableWordProps {
  children: React.ReactNode;
  value: number;
  onEarn: (amount: number) => void;
}

export const ClickableWord = ({ children, value, onEarn }: ClickableWordProps) => {
  const [clicked, setClicked] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleClick = (e: React.MouseEvent) => {
    if (clicked) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    
    setClicked(true);
    onEarn(value);
    
    setTimeout(() => setClicked(false), 800);
  };

  return (
    <span className="relative inline-block">
      <span
        onClick={handleClick}
        className={`clickable-word ${clicked ? "opacity-50" : ""}`}
      >
        {children}
      </span>
      {clicked && (
        <span
          className="absolute pointer-events-none text-accent font-bold money-animation"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          +${(value / 100).toFixed(2)}
        </span>
      )}
    </span>
  );
};
