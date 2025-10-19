import { ClickableWord } from "./ClickableWord";

interface HeroProps {
  onEarn: (amount: number) => void;
}

export const Hero = ({ onEarn }: HeroProps) => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-block">
          <h1 className="text-7xl md:text-8xl font-serif font-bold mb-2 tracking-tight">
            Your Name
          </h1>
          <div className="h-1 w-32 bg-accent mx-auto rounded-full"></div>
        </div>
        
        <p className="text-2xl md:text-3xl leading-relaxed text-foreground max-w-3xl mx-auto">
          Hi, I'm a{" "}
          <ClickableWord value={1000} onEarn={onEarn}>
            creative
          </ClickableWord>{" "}
          developer passionate about building{" "}
          <ClickableWord value={1500} onEarn={onEarn}>
            beautiful
          </ClickableWord>{" "}
          and{" "}
          <ClickableWord value={2000} onEarn={onEarn}>
            functional
          </ClickableWord>{" "}
          web experiences.
        </p>

        <p className="text-lg text-muted-foreground italic max-w-2xl mx-auto">
          Welcome to my portfolio! Try clicking on the{" "}
          <ClickableWord value={500} onEarn={onEarn}>
            red words
          </ClickableWord>{" "}
          throughout the site to increase your earnings. Scroll down to explore my work and skills!
        </p>
      </div>
    </section>
  );
};
