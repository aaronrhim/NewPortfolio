import { ClickableWord } from "./ClickableWord";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "./ui/button";

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
    { icon: Github, label: "GitHub", link: "https://github.com", value: 1000 },
    { icon: Linkedin, label: "LinkedIn", link: "https://linkedin.com", value: 1000 },
    { icon: Twitter, label: "Twitter", link: "https://twitter.com", value: 1000 },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-serif font-bold mb-6">Ready to Cash Out?</h2>
        <p className="text-xl text-muted-foreground mb-8">
          You've earned{" "}
          <span className="text-accent font-bold font-serif text-2xl">
            {formatMoney(totalEarnings)}
          </span>{" "}
          exploring my portfolio!
        </p>
        <p className="text-lg text-muted-foreground mb-12">
          Let's turn those earnings into a real{" "}
          <ClickableWord value={5000} onEarn={onEarn}>
            collaboration
          </ClickableWord>
          . Reach out and let's build something amazing together.
        </p>

        <div className="flex flex-col items-center gap-6">
          <Button
            size="lg"
            className="text-lg px-8 py-6 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            asChild
          >
            <a href="mailto:your.email@example.com">
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
            </a>
          </Button>

          <div className="flex gap-4">
            {socials.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onEarn(social.value)}
                  className="p-3 rounded-full bg-card border border-border hover:border-accent transition-all duration-300 hover:scale-110 hover:shadow-md group"
                  aria-label={social.label}
                >
                  <Icon className="h-6 w-6 text-muted-foreground group-hover:text-accent transition-colors" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
