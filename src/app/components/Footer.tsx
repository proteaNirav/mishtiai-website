export function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-border">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          {/* Logo/Brand */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-[#14f195] flex items-center justify-center">
                <div className="w-4 h-4 bg-background rounded-sm" />
              </div>
              <span className="text-xl font-bold">Mishti AI</span>
            </div>
            <p className="text-sm text-muted-foreground">Governed Intelligence Platform</p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Documentation</a>
            <a href="#" className="hover:text-primary transition-colors">Architecture</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            © 2026 Mishti AI. All rights reserved.
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>
    </footer>
  );
}
