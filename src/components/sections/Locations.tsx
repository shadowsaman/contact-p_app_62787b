import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import apiClient from '@/lib/api';

interface OfficeLocation {
  guid: string;
  city: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  map_embed_url: string | null;
  is_headquarters: boolean | null;
}

function extractLocations(data: unknown): OfficeLocation[] {
  if (
    data &&
    typeof data === 'object' &&
    'data' in data &&
    (data as Record<string, unknown>).data &&
    typeof (data as Record<string, unknown>).data === 'object' &&
    'response' in ((data as Record<string, unknown>).data as Record<string, unknown>)
  ) {
    const response = ((data as Record<string, unknown>).data as Record<string, unknown>).response;
    if (Array.isArray(response)) return response as OfficeLocation[];
  }
  return [];
}

const fallbackLocations: OfficeLocation[] = [
  {
    guid: '1',
    city: 'New York',
    address: '350 Fifth Avenue, Suite 4100, New York, NY 10118',
    phone: '+1 (212) 555-0192',
    email: 'nyc@contaqt.io',
    map_embed_url: null,
    is_headquarters: true,
  },
  {
    guid: '2',
    city: 'London',
    address: '30 St Mary Axe, London EC3A 8EP, United Kingdom',
    phone: '+44 20 7946 0321',
    email: 'london@contaqt.io',
    map_embed_url: null,
    is_headquarters: false,
  },
  {
    guid: '3',
    city: 'Singapore',
    address: '1 Raffles Place, #40-02, Singapore 048616',
    phone: '+65 6321 0912',
    email: 'sg@contaqt.io',
    map_embed_url: null,
    is_headquarters: false,
  },
];

export function Locations() {
  const { data, isLoading } = useQuery<unknown>({
    queryKey: ['office_locations'],
    queryFn: () => apiClient.get('/v2/items/office_locations').then((r) => r.data),
  });

  const rawLocations = extractLocations(data);
  const locations = rawLocations.length > 0 ? rawLocations : fallbackLocations;
  const hqLocation = locations.find((l) => l.is_headquarters) ?? locations[0];
  const mapUrl = hqLocation?.map_embed_url ?? null;

  return (
    <section id="locations" className="py-20 bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">Where to find us</span>
          <h2 className="mt-3 font-heading font-black text-foreground" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Our Offices
          </h2>
          <p className="mt-4 text-muted-foreground text-base max-w-xl mx-auto">
            With offices across three continents, we&apos;re never far from where you need us.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="h-48 rounded-[var(--radius)] bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
            {/* Location cards */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {locations.map((loc, idx) => (
                <motion.div
                  key={loc.guid}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-background rounded-[var(--radius)] border border-border/50 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-4 w-4 text-accent" />
                      </div>
                      <h3 className="font-heading font-bold text-foreground text-base">{loc.city ?? '—'}</h3>
                    </div>
                    {loc.is_headquarters && (
                      <Badge variant="accent" className="text-xs shrink-0">HQ</Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">{loc.address ?? '—'}</p>
                  <div className="flex flex-col gap-1.5">
                    {loc.phone && (
                      <a
                        href={`tel:${loc.phone}`}
                        className="flex items-center gap-2 text-xs text-muted-foreground hover:text-accent transition-colors"
                      >
                        <Phone className="h-3 w-3" />
                        {loc.phone}
                      </a>
                    )}
                    {loc.email && (
                      <a
                        href={`mailto:${loc.email}`}
                        className="flex items-center gap-2 text-xs text-muted-foreground hover:text-accent transition-colors"
                      >
                        <Mail className="h-3 w-3" />
                        {loc.email}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map area */}
            <motion.div
              className="lg:col-span-3 rounded-[var(--radius)] overflow-hidden border border-border/50 shadow-sm"
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{ minHeight: '380px' }}
            >
              {mapUrl ? (
                <iframe
                  src={mapUrl}
                  title="Office Location Map"
                  className="w-full h-full"
                  style={{ minHeight: '380px', border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                <div className="relative w-full" style={{ minHeight: '380px' }}>
                  <img
                    src="https://images.unsplash.com/photo-1544196538-6b0c1a2cd488?ixid=M3w5Mzk5NTF8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjBjaXR5JTIwc2t5bGluZSUyMGNpbmVtYXRpY3xlbnwxfDB8fHwxNzc4MDM5Nzg3fDA&ixlib=rb-4.1.0&w=800&h=600&fit=crop&auto=format&q=80"
                    alt="Aerial city view"
                    loading="lazy"
                    className="w-full h-full object-cover"
                    style={{ minHeight: '380px' }}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.parentElement) {
                        e.currentTarget.parentElement.style.background = 'linear-gradient(135deg,hsl(var(--muted)),hsl(var(--accent)/0.2))';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent flex items-end p-6">
                    <div className="bg-background/90 backdrop-blur-sm rounded-xl px-4 py-3 border border-border/50">
                      <p className="text-xs font-semibold text-foreground">{hqLocation?.city ?? 'Headquarters'}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{hqLocation?.address ?? 'Global HQ'}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
