import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { TrustBadges } from '@/components/sections/TrustBadges';
import { Locations } from '@/components/sections/Locations';
import { Team } from '@/components/sections/Team';
import { ContactForm } from '@/components/sections/ContactForm';

export default function LandingPage() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: Trust / Stats */}
        <TrustBadges />

        {/* Section 3: Office Locations & Map */}
        <Locations />

        {/* Section 4: Meet the Team */}
        <Team />

        {/* Section 5: Contact Form */}
        <ContactForm />
      </main>

      <Footer />

      {/* Scroll to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-primary text-primary-foreground w-11 h-11 rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:bg-accent transition-all duration-200 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
