import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollTotal > 0 ? (window.scrollY / scrollTotal) * 100 : 0);
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', update);
    return () => window.removeEventListener('scroll', update);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Locations', href: '#locations' },
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 h-0.5 z-[60] bg-gradient-to-r from-accent to-blue-400 transition-all duration-100"
        style={{ width: `${progress}%` }}
      />

      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'backdrop-blur-xl bg-background/80 border-b border-border/40 shadow-sm'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-black text-sm">C</span>
              </div>
              <span className="font-bold text-foreground font-heading text-lg">Contact</span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <a
              href="#contact"
              className="hidden md:inline-flex items-center h-9 px-5 rounded-[var(--radius)] bg-accent text-accent-foreground text-sm font-semibold hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
            >
              Get in Touch
            </a>

            {/* Hamburger */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border/40 shadow-lg md:hidden">
            <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors min-h-[44px] flex items-center"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center h-11 px-5 rounded-[var(--radius)] bg-accent text-accent-foreground text-sm font-semibold"
              >
                Get in Touch
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
