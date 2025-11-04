import { Github, Linkedin } from "lucide-react";

interface ContactProps {
  onEarn: (amount: number) => void;
  totalEarnings: number;
}

export const Contact = ({ onEarn, totalEarnings }: ContactProps) => {
  const formatMoney = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100);
  };

  const socials = [
    { icon: Github, label: "GitHub", link: "https://github.com/aaronrhim", value: 1000 },
    { icon: Linkedin, label: "LinkedIn", link: "https://linkedin.com/in/aaronrhim", value: 1000 },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <a
          href="mailto:your.email@example.com"
          onClick={() => onEarn(5000)}
          className="text-5xl font-serif font-bold cursor-pointer transition-all duration-300 hover:scale-105 group inline-block"
        >
          <span className="inline-block">Want to </span>
          <span className="inline-block text-accent group-hover:text-accent transition-colors relative">
            Cash Out
            <span className="absolute bottom-0 left-0 w-full h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </span>
          <span className="inline-block">? Let's connect!</span>
        </a>
      </div>
    </section>
  );
};
