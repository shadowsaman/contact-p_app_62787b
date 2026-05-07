import React from 'react';
import { Globe, Mail, ExternalLink } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-accent-foreground font-black text-sm">C</span>
            </div>
            <span className="font-bold text-primary-foreground font-heading text-lg">Contaqt</span>
          </div>

          <p className="text-primary-foreground/60 text-sm text-center max-w-sm">
            Building meaningful connections between people and businesses around the world.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:hello@contaqt.io"
              aria-label="Email"
              className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/60 hover:text-primary-foreground hover:border-primary-foreground/50 transition-all"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Website"
              className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/60 hover:text-primary-foreground hover:border-primary-foreground/50 transition-all"
            >
              <Globe className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="External link"
              className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/60 hover:text-primary-foreground hover:border-primary-foreground/50 transition-all"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="w-full border-t border-primary-foreground/10 pt-6">
            <p className="text-center text-primary-foreground/40 text-xs">
              &copy; {currentYear} Contaqt. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
