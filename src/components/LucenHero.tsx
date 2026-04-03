import { motion } from 'framer-motion';

export default function LucenHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Radial light overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 40%, hsl(192 95% 60% / 0.06) 0%, transparent 70%),
            radial-gradient(ellipse 40% 30% at 30% 60%, hsl(260 80% 65% / 0.04) 0%, transparent 60%)
          `,
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(30px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-[0.9] mb-6">
            <span className="lucen-gradient-text">Lucen</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto font-body font-light leading-relaxed"
        >
          A real-time holographic interface where media, motion, and light form a continuous intelligent system.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex gap-4 justify-center"
        >
          <button className="glass-panel-elevated glow-edge px-8 py-3 font-display text-sm font-medium tracking-wide text-primary hover:text-foreground transition-colors duration-300">
            Enter System
          </button>
          <button className="glass-panel px-8 py-3 font-display text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300">
            Observe
          </button>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
