import { Github, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-8 px-4 border-t border-white/10 relative z-10" style={{ backgroundColor: "hsl(var(--footer-bg))" }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <p className="text-black font-medium">© 2025 AARON RHIM. All rights reserved.</p>
          <p className="text-black/80 text-sm">Designed and developed by AARON RHIM.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/aaronrhim"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-black/70 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/aaron-rhim"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-black/70 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};
