import React from "react";

export function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-border">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-start gap-8">

        {/* Left: Brand */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Mishti AI" className="h-10 w-auto" />
            </div>
          <p className="text-sm text-muted-foreground">
            Governed Intelligence Infrastructure
          </p>
        </div>

        {/* Center: Links */}
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#architecture" className="hover:text-primary">Architecture</a>
          <a href="#roadmap" className="hover:text-primary">Roadmap</a>
          <a href="#access" className="hover:text-primary">Access</a>
        </div>

        {/* Right: Copyright */}
        <div className="text-sm text-muted-foreground">
          © 2026 Mishti AI. All rights reserved.
        </div>

      </div>
    </footer>
  );
}


