import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import LucenHeader from '@/components/LucenHeader';
import ParticleField from '@/components/ParticleField';
import CursorGlow from '@/components/CursorGlow';
import NotFound from '@/pages/NotFound';
import { getIntegration, integrations } from '@/data/integrations';
import { trackEngineEvent } from '@/lib/engineAnalytics';
import { motionFor, useMotionPreset } from '@/lib/motionPreset';

export default function IntegrationPage() {
  const { slug } = useParams<{ slug: string }>();
  const integration = getIntegration(slug);
  const preset = useMotionPreset();

  useEffect(() => {
    if (integration) {
      trackEngineEvent({
        event_type: 'page_view',
        integration_slug: integration.slug,
        source: 'integration_detail',
      });
      document.title = `${integration.title} · Lucen Engine`;
    }
  }, [integration]);

  if (!integration) return <NotFound />;

  const Icon = integration.icon;

  const onPrimaryCta = () => {
    trackEngineEvent({
      event_type: 'cta_click',
      integration_slug: integration.slug,
      source: 'integration_detail_primary',
      metadata: { label: integration.cta },
    });
  };

  return (
    <div className="relative min-h-screen">
      <ParticleField />
      <CursorGlow />
      <LucenHeader />

      <main className="pt-24 sm:pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/#integrations"
            className="inline-flex items-center gap-2 font-display text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All Integrations
          </Link>

          <motion.header
            {...motionFor(preset, { y: 24, blur: 8, duration: 0.7 })}
            className="glass-panel-elevated glow-edge p-6 sm:p-10 mb-8"
          >
            <div className="flex items-start gap-4 mb-6">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 text-primary border border-primary/20 shrink-0">
                <Icon className="w-6 h-6" strokeWidth={1.6} />
              </span>
              <div>
                <p className="text-xs font-display tracking-[0.3em] uppercase text-primary mb-2">
                  Lucen Ecosystem
                </p>
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                  {integration.title}
                </h1>
                <p className="font-body text-base sm:text-lg text-accent mt-2">{integration.tagline}</p>
              </div>
            </div>
            <p className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {integration.longDesc}
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                to={`/get-started?integration=${integration.slug}`}
                onClick={onPrimaryCta}
                className="glass-panel-elevated glow-edge px-6 py-3 font-display text-sm tracking-[0.2em] uppercase text-primary hover:text-foreground transition-colors inline-flex items-center gap-2"
              >
                {integration.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={`/contact?integration=${integration.slug}`}
                onClick={() =>
                  trackEngineEvent({
                    event_type: 'cta_click',
                    integration_slug: integration.slug,
                    source: 'integration_detail_secondary',
                    metadata: { label: 'talk_to_lucen' },
                  })
                }
                className="px-6 py-3 font-display text-sm tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                Talk to Lucen
              </Link>
            </div>
          </motion.header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
            <Section title="What's included" preset={preset}>
              {integration.highlights.map((h) => (
                <Bullet key={h}>{h}</Bullet>
              ))}
            </Section>
            <Section title="Requirements" preset={preset}>
              {integration.requirements.map((r) => (
                <Bullet key={r}>{r}</Bullet>
              ))}
            </Section>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
            <Section title="Next steps" preset={preset}>
              <ol className="space-y-3">
                {integration.nextSteps.map((step, i) => (
                  <li key={step} className="flex gap-3 font-body text-sm text-muted-foreground">
                    <span className="font-display text-xs tracking-[0.25em] text-primary shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </Section>
            <Section title="At a glance" preset={preset}>
              <Detail label="Typical timeline" value={integration.timeline} />
              <Detail
                label="Best for"
                value={
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {integration.bestFor.map((b) => (
                      <span
                        key={b}
                        className="px-2 py-1 rounded-md border border-primary/20 bg-primary/5 text-xs font-display text-primary"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                }
              />
            </Section>
          </div>

          <motion.div
            {...motionFor(preset, { y: 16, duration: 0.6 })}
            className="glass-panel-elevated glow-edge p-6 sm:p-8 text-center"
          >
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-2">
              Ready to move on {integration.title.toLowerCase()}?
            </h3>
            <p className="font-body text-sm text-muted-foreground mb-5 max-w-xl mx-auto">
              Share a few details and a Lucen specialist will respond within one business day.
            </p>
            <Link
              to={`/get-started?integration=${integration.slug}`}
              onClick={onPrimaryCta}
              className="glass-panel-elevated glow-edge inline-flex items-center gap-2 px-7 py-3 font-display text-sm tracking-[0.2em] uppercase text-primary hover:text-foreground transition-colors"
            >
              {integration.cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="mt-12">
            <p className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Other ways to engage
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {integrations
                .filter((i) => i.slug !== integration.slug)
                .map((i) => (
                  <Link
                    key={i.slug}
                    to={`/integrations/${i.slug}`}
                    className="glass-panel p-3 sm:p-4 font-display text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {i.title}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Section({
  title,
  children,
  preset,
}: {
  title: string;
  children: React.ReactNode;
  preset: ReturnType<typeof useMotionPreset>;
}) {
  return (
    <motion.section
      {...motionFor(preset, { y: 20, duration: 0.55 })}
      className="glass-panel-elevated p-6 sm:p-7"
    >
      <h2 className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-4">{title}</h2>
      <div className="space-y-3">{children}</div>
    </motion.section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 font-body text-sm text-muted-foreground">
      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={2.2} />
      <span>{children}</span>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="mb-4 last:mb-0">
      <p className="font-display text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-1">
        {label}
      </p>
      <div className="font-body text-sm text-foreground">{value}</div>
    </div>
  );
}
