import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  onRequestAccess?: () => void;
}

export function Header({ onRequestAccess }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-primary/5" : "bg-background/70 backdrop-blur-md border-b border-border/30"
    }`}>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[72px]">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Mishti AI" className="h-10 w-auto" />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("architecture")} className="text-foreground/70 hover:text-primary transition-colors font-medium">Architecture</button>
            <button onClick={() => scrollToSection("roadmap")} className="text-foreground/70 hover:text-primary transition-colors font-medium">Roadmap</button>
            <button onClick={() => scrollToSection("access")} className="text-foreground/70 hover:text-primary transition-colors font-medium">Access</button>
          </nav>

          <button onClick={onRequestAccess} className="hidden md:block px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40">
            Request Early Access
          </button>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden w-10 h-10 rounded-lg bg-card/50 backdrop-blur-md border border-border flex items-center justify-center hover:border-primary/40 transition-colors">
            {isMobileMenuOpen ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
          <nav className="px-6 py-6 space-y-4">
            <button onClick={() => scrollToSection("architecture")} className="block w-full text-left px-4 py-3 rounded-lg text-foreground/70 hover:text-primary hover:bg-card/50 transition-all font-medium">Architecture</button>
            <button onClick={() => scrollToSection("roadmap")} className="block w-full text-left px-4 py-3 rounded-lg text-foreground/70 hover:text-primary hover:bg-card/50 transition-all font-medium">Roadmap</button>
            <button onClick={() => scrollToSection("access")} className="block w-full text-left px-4 py-3 rounded-lg text-foreground/70 hover:text-primary hover:bg-card/50 transition-all font-medium">Access</button>
            <button onClick={() => { onRequestAccess?.(); setIsMobileMenuOpen(false); }} className="block w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25">Request Early Access</button>
          </nav>
        </div>
      )}
    </header>
  );
}
