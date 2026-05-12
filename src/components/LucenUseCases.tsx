import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useCases } from '@/data/usecases';
import { useIsMobile } from '@/hooks/use-mobile';
import { OptimizedImage } from './OptimizedMedia';

export default function LucenUseCases() {
  const isMobile = useIsMobile();
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const next = useCallback(() => setCurrentSlide((p) => (p + 1) % useCases.length), []);
  const prev = useCallback(() => setCurrentSlide((p) => (p - 1 + useCases.length) % useCases.length), []);

  // Auto-scroll on mobile every 6s
  useEffect(() => {
    if (!isMobile) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isMobile, next]);

  // Sync scroll position on mobile (without hijacking page scroll)
  useEffect(() => {
    if (!isMobile || !scrollRef.current) return;
    const child = scrollRef.current.children[currentSlide] as HTMLElement;
    if (child) {
      scrollRef.current.scrollTo({ left: child.offsetLeft - scrollRef.current.offsetLeft, behavior: 'smooth' });
    }
  }, [currentSlide, isMobile]);

  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-sm font-display tracking-[0.3em] uppercase text-primary mb-4">Deployments</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Use Cases
          </h2>
        </motion.div>

        {/* Mobile: horizontal scrollable with arrows */}
        {isMobile ? (
          <div className="relative">
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
            >
              <style>{`div::-webkit-scrollbar { display: none; }`}</style>
              {useCases.map((c) => (
                <Link
                  key={c.slug}
                  to={`/use-cases/${c.slug}`}
                  className="snap-start flex-shrink-0 w-[85vw] glass-panel-elevated glow-edge overflow-hidden group block"
                >
                  <div className="relative bg-black/40" style={{ height: '80vh' }}>
                    <OptimizedImage
                      src={c.image}
                      alt={c.title}
                      className={`w-full h-full ${c.imageFit === 'contain' ? '[&_img]:object-contain' : 'object-cover'} opacity-70 group-hover:opacity-90 transition-opacity duration-700`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {c.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Scroll arrows */}
            <button
              onClick={prev}
              className="absolute left-1 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-panel-elevated flex items-center justify-center text-foreground hover:text-primary transition-colors z-10"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-panel-elevated flex items-center justify-center text-foreground hover:text-primary transition-colors z-10"
              aria-label="Next"
            >
              ›
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {useCases.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === currentSlide ? 'bg-primary w-6' : 'bg-foreground/20'}`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Desktop: alternating layout */
          <div className="space-y-16">
            {useCases.map((c, i) => {
              const isReversed = i % 2 === 1;
              return (
                <motion.div
                  key={c.slug}
                  initial={{ opacity: 0, y: 40, filter: 'blur(15px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                >
                  <Link
                    to={`/use-cases/${c.slug}`}
                    className={`glass-panel-elevated glow-edge overflow-hidden group block ${isReversed ? 'lg:order-2' : ''}`}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <OptimizedImage
                        src={c.image}
                        alt={c.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                    </div>
                  </Link>

                  <div className={`${isReversed ? 'lg:order-1 lg:text-right' : ''}`}>
                    <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
                      {c.title}
                    </h3>
                    <p className="text-muted-foreground font-body leading-relaxed mb-6">
                      {c.description}
                    </p>
                    <Link
                      to={`/use-cases/${c.slug}`}
                      className="glass-panel-elevated glow-edge px-6 py-2.5 font-display text-sm font-medium tracking-wide text-primary hover:text-foreground transition-colors duration-300 inline-block"
                    >
                      Explore Case
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
