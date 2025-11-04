import { ClickableWord } from "./ClickableWord";

interface HeroProps {
  onEarn: (amount: number) => void;
}

export const Hero = ({ onEarn }: HeroProps) => {
  const handleTriggerHeader = () => {
    // This will be handled by the parent through onEarn
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-block bg-black/40 backdrop-blur-sm rounded-2xl px-8 py-6 md:px-12 md:py-8 border border-white/10">
          <div className="mb-6">
            <h1 className="text-7xl md:text-8xl font-sans font-thin mb-2 tracking-tight text-white" style={{ fontWeight: 100 }}>
              Aaron Rhim
            </h1>
            <div className="h-1 w-32 bg-accent mx-auto rounded-full"></div>
          </div>
          
          <p className="text-2xl md:text-3xl leading-relaxed text-white font-normal">
            Hi, I'm Aaron, an AI enthusiast who loves exploring the unknown... 🚀
          </p>
        </div>

        <p className="text-lg text-white/90 italic max-w-2xl mx-auto">
          Welcome to my portfolio! Try clicking on the{" "}
          <ClickableWord value={500} onEarn={onEarn} wordId="hero-red-words" onTriggerHeader={handleTriggerHeader}>
            red words
          </ClickableWord>{" "}
          throughout the site to increase your earnings. Scroll down to checkout some of my other work--and good luck exploring! :)
        </p>
      </div>
    </section>
  );
};
