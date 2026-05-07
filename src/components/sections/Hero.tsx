import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section
      id="hero"
      className="hero-texture relative h-[70vh] min-h-[520px] flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?ixid=M3w5Mzk5NTF8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0ZWFtJTIwbWVldGluZyUyMGFlc3RoZXRpY3xlbnwxfDB8fHwxNzc4MDM5Nzg4fDA&ixlib=rb-4.1.0&w=1600&h=900&fit=crop&auto=format&q=80"
          alt="Modern professional office environment"
          loading="lazy"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.style.display = 'none';
            if (e.currentTarget.parentElement) {
              e.currentTarget.parentElement.style.background = 'linear-gradient(135deg,hsl(var(--primary)),hsl(var(--accent)/0.8))';
            }
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-primary/70" />
        {/* Subtle accent glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent-foreground text-xs font-semibold tracking-widest uppercase backdrop-blur-sm">
            We&apos;d love to hear from you
          </span>
        </motion.div>

        <motion.h1
          className="font-heading font-black tracking-tight text-primary-foreground leading-[1.05]"
          style={{ fontSize: 'clamp(40px, 8vw, 96px)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        >
          Get In{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-accent">
            Touch
          </span>
        </motion.h1>

        <motion.p
          className="mt-6 text-primary-foreground/70 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
        >
          Whether you have a question, feedback, or just want to say hello — we&apos;re here and ready to connect with you.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 h-12 px-8 rounded-[var(--radius)] bg-accent text-accent-foreground font-semibold text-sm hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 shadow-lg"
          >
            Send Us a Message
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#locations"
            className="inline-flex items-center gap-2 h-12 px-8 rounded-[var(--radius)] border-2 border-primary-foreground/30 text-primary-foreground font-semibold text-sm hover:border-primary-foreground/60 hover:bg-primary-foreground/10 transition-all duration-200"
          >
            View Locations
          </a>
        </motion.div>
      </div>
    </section>
  );
}
