import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { integrations } from '@/data/integrations';
import { trackEngineEvent } from '@/lib/engineAnalytics';
import { motionFor, useMotionPreset } from '@/lib/motionPreset';

export default function LucenBusinessModels() {
  const preset = useMotionPreset();

  return (
    <section id="integrations" className="relative py-24 sm:py-32 px-4 sm:px-6 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          {...motionFor(preset, { y: 20, duration: 0.7 })}
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
            const onClick = () =>
              trackEngineEvent({
                event_type: 'cta_click',
                integration_slug: item.slug,
                source: 'business_models_grid',
                metadata: { position: i, label: item.cta },
              });

            const cardMotion = motionFor(preset, {
              y: 24,
              blur: 8,
              duration: 0.55,
              delay: i * 0.05,
            });

            return (
              <motion.div
                key={item.slug}
                {...cardMotion}
                whileHover={preset.lite ? undefined : { y: -4 }}
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
                  {item.shortDesc}
                </p>
                <div className="flex items-center justify-between gap-3">
                  <Link
                    to={`/integrations/${item.slug}`}
                    onClick={onClick}
                    className="font-display text-xs tracking-[0.2em] uppercase text-primary/90 hover:text-primary transition-colors inline-flex items-center gap-2"
                  >
                    Learn more
                    <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    to={`/get-started?integration=${item.slug}`}
                    onClick={() =>
                      trackEngineEvent({
                        event_type: 'cta_click',
                        integration_slug: item.slug,
                        source: 'business_models_grid_cta',
                        metadata: { label: item.cta },
                      })
                    }
                    className="font-display text-[11px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.cta}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          {...motionFor(preset, { y: 16, duration: 0.6, delay: 0.15 })}
          className="mt-10 sm:mt-14 text-center"
        >
          <Link
            to="/contact"
            onClick={() =>
              trackEngineEvent({
                event_type: 'cta_click',
                source: 'business_models_footer',
                metadata: { label: 'talk_to_lucen' },
              })
            }
            className="glass-panel-elevated glow-edge inline-block px-7 py-3 font-display text-sm tracking-[0.2em] uppercase text-primary hover:text-foreground transition-colors"
          >
            Talk to Lucen
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
