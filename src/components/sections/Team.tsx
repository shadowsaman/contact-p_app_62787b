import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Mail, ExternalLink } from 'lucide-react';
import apiClient from '@/lib/api';

interface TeamMember {
  guid: string;
  name: string | null;
  role: string | null;
  bio: string | null;
  photo: string | null;
  email: string | null;
  linkedin_url: string | null;
}

function extractTeam(data: unknown): TeamMember[] {
  if (
    data &&
    typeof data === 'object' &&
    'data' in data &&
    (data as Record<string, unknown>).data &&
    typeof (data as Record<string, unknown>).data === 'object' &&
    'response' in ((data as Record<string, unknown>).data as Record<string, unknown>)
  ) {
    const response = ((data as Record<string, unknown>).data as Record<string, unknown>).response;
    if (Array.isArray(response)) return response as TeamMember[];
  }
  return [];
}

function getInitials(name: string | null): string {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

const fallbackTeam: TeamMember[] = [
  {
    guid: '1',
    name: 'Olivia Bennett',
    role: 'Chief Executive Officer',
    bio: 'Olivia leads Contaqt with a passion for people and technology, building bridges between organizations and opportunities worldwide.',
    photo: 'https://images.unsplash.com/photo-1622675363311-3e1904dc1885?ixlib=rb-4.1.0&w=400&h=400&fit=crop&auto=format&q=80',
    email: 'olivia@contaqt.io',
    linkedin_url: '#',
  },
  {
    guid: '2',
    name: 'Marcus Lee',
    role: 'Head of Partnerships',
    bio: 'Marcus oversees global partnerships and strategic alliances, ensuring every client relationship delivers measurable, lasting value.',
    photo: 'https://images.unsplash.com/photo-1622675205169-901710ac8643?ixlib=rb-4.1.0&w=400&h=400&fit=crop&auto=format&q=80',
    email: 'marcus@contaqt.io',
    linkedin_url: '#',
  },
  {
    guid: '3',
    name: 'Priya Sharma',
    role: 'Director of Customer Success',
    bio: 'Priya ensures every client interaction is seamless, empathetic, and effective — from onboarding to long-term support.',
    photo: 'https://images.unsplash.com/photo-1758691737246-95bf8f09a997?ixlib=rb-4.1.0&w=400&h=400&fit=crop&auto=format&q=80',
    email: 'priya@contaqt.io',
    linkedin_url: '#',
  },
  {
    guid: '4',
    name: 'Daniel Osei',
    role: 'Lead Solutions Architect',
    bio: 'Daniel designs scalable solutions that align business goals with elegant technical architectures across multiple industries.',
    photo: 'https://images.unsplash.com/photo-1667837896876-012372133bbd?ixlib=rb-4.1.0&w=400&h=400&fit=crop&auto=format&q=80',
    email: 'daniel@contaqt.io',
    linkedin_url: '#',
  },
];

export function Team() {
  const { data, isLoading } = useQuery<unknown>({
    queryKey: ['team_members'],
    queryFn: () => apiClient.get('/v2/items/team_members').then((r) => r.data),
  });

  const rawTeam = extractTeam(data);
  const team = rawTeam.length > 0 ? rawTeam : fallbackTeam;

  return (
    <section id="team" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">The people behind Contaqt</span>
          <h2
            className="mt-3 font-heading font-black text-foreground"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
          >
            Meet Our Team
          </h2>
          <p className="mt-4 text-muted-foreground text-base max-w-xl mx-auto">
            Passionate professionals dedicated to helping you connect, grow, and succeed.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 rounded-[var(--radius)] bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <motion.div
                key={member.guid}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-card border border-border/50 rounded-[var(--radius)] p-6 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Avatar */}
                <div className="relative mb-4">
                  <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-background shadow-md">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name ?? 'Team member'}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.style.display = 'none';
                          if (e.currentTarget.parentElement) {
                            e.currentTarget.parentElement.style.background = 'linear-gradient(135deg,hsl(var(--accent)/0.3),hsl(var(--accent)/0.6))';
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-accent/20 flex items-center justify-center">
                        <span className="text-accent font-bold text-2xl">{getInitials(member.name)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info */}
                <h3 className="font-heading font-bold text-foreground text-base">{member.name ?? '—'}</h3>
                <p className="text-accent text-xs font-semibold mt-1 mb-3">{member.role ?? '—'}</p>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                  {member.bio ?? '—'}
                </p>

                {/* Links */}
                <div className="flex items-center gap-3 mt-auto">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      aria-label={`Email ${member.name ?? 'team member'}`}
                      className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-all"
                    >
                      <Mail className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {member.linkedin_url && (
                    <a
                      href={member.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`LinkedIn profile of ${member.name ?? 'team member'}`}
                      className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-all"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
