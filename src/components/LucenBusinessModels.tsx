import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Boxes, CalendarRange, CalendarClock, LineChart, Megaphone, Sparkles } from 'lucide-react';

const integrations = [
  {
    icon: Boxes,
    title: 'Hardware Purchase',
    desc: 'Own the full Lucen holographic stack — displays, controllers, and the Lucen Engine analytics suite — deployed and calibrated for your space.',
    cta: 'Request a quote',
  },
  {
    icon: CalendarRange,
    title: 'Long-Term Rentals',
    desc: 'Scale into holographic retail without the capex. Multi-month and multi-year deployment plans with maintenance, content updates, and analytics included.',
    cta: 'Plan a rollout',
  },
  {
    icon: CalendarClock,
    title: 'Short-Term Rentals',
    desc: 'Plug-and-play holographic units for launches, pop-ups, and seasonal moments. Delivered, installed, and supported on event timelines.',
    cta: 'Book a unit',
  },
  {
    icon: LineChart,
    title: 'Lucen Engine for DOOH',
    desc: 'Subscribe the Lucen Engine analytics layer onto your existing DOOH network — footfall, dwell time, attention, and conversion intelligence on screens you already operate.',
    cta: 'Connect a network',
  },
  {
    icon: Megaphone,
    title: 'Campaign Deployments',
    desc: 'Turnkey holographic campaigns across the Lucen network — creative, media planning, deployment, and live performance reporting in one engagement.',
    cta: 'Launch a campaign',
  },
  {
    icon: Sparkles,
    title: 'Product Activations',
    desc: 'Premium product reveal experiences engineered around your brand — bespoke holographic content, choreography, and on-site capture.',
    cta: 'Activate a product',
  },
];

export default function LucenBusinessModels() {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-xs sm:text-sm font-display tracking-[0.3em] uppercase text-primary mb-3 sm:mb-4">
            Ways to Engage
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Integrate with the Lucen Ecosystem
          </h2>
          <p className="text-muted-foreground font-body text-base sm:text-lg max-w-2xl mx-auto">
            Choose how you plug into Lucen — buy the hardware, rent it, subscribe the intelligence, or
            commission a full campaign.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {integrations.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="glass-panel-elevated glow-edge p-6 sm:p-7 flex flex-col h-full group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary/15 transition-colors">
                    <Icon className="w-5 h-5" strokeWidth={1.6} />
                  </span>
                  <span className="font-display text-xs tracking-[0.25em] uppercase text-muted-foreground">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                  {item.desc}
                </p>
                <Link
                  to="/get-started"
                  className="font-display text-xs tracking-[0.2em] uppercase text-primary/90 hover:text-primary transition-colors inline-flex items-center gap-2"
                >
                  {item.cta}
                  <span aria-hidden="true">→</span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 sm:mt-14 text-center"
        >
          <Link
            to="/contact"
            className="glass-panel-elevated glow-edge inline-block px-7 py-3 font-display text-sm tracking-[0.2em] uppercase text-primary hover:text-foreground transition-colors"
          >
            Talk to Lucen
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
