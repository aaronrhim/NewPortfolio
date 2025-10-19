import { useEffect, useState } from "react";
import { DollarSign } from "lucide-react";

interface MoneyCounterProps {
  amount: number;
}

export const MoneyCounter = ({ amount }: MoneyCounterProps) => {
  const [displayAmount, setDisplayAmount] = useState(amount);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (amount !== displayAmount) {
      setIsAnimating(true);
      const duration = 500;
      const steps = 20;
      const increment = (amount - displayAmount) / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        if (currentStep === steps) {
          setDisplayAmount(amount);
          clearInterval(timer);
          setTimeout(() => setIsAnimating(false), 300);
        } else {
          setDisplayAmount((prev) => prev + increment);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [amount, displayAmount]);

  const formatMoney = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100);
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-card border-2 border-border rounded-full px-6 py-3 shadow-lg">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-muted-foreground">your earnings:</span>
        <div className="flex items-center gap-1">
          <DollarSign className={`h-5 w-5 text-accent transition-transform duration-300 ${isAnimating ? "scale-125" : ""}`} />
          <span className={`text-2xl font-bold font-serif text-accent transition-all duration-300 ${isAnimating ? "scale-110" : ""}`}>
            {formatMoney(displayAmount).replace("$", "")}
          </span>
        </div>
      </div>
    </div>
  );
};
