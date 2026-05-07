import React from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, CheckCircle2, Clock } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '12,000+',
    label: 'Clients Worldwide',
  },
  {
    icon: Globe,
    value: '38',
    label: 'Countries Served',
  },
  {
    icon: CheckCircle2,
    value: '99.4%',
    label: 'Satisfaction Rate',
  },
  {
    icon: Clock,
    value: '<4h',
    label: 'Average Response Time',
  },
];

export function TrustBadges() {
  return (
    <section className="py-14 bg-background border-y border-border/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center gap-3 p-6 rounded-[var(--radius)] bg-card border border-border/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="font-heading font-black text-foreground text-3xl leading-none">{stat.value}</div>
                  <div className="text-muted-foreground text-sm mt-1">{stat.label}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
