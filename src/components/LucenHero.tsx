import { motion } from 'framer-motion';

export default function LucenHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Full-bleed video environment */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.7) saturate(1.2)' }}
        >
          <source src="/media/desktop091224.mp4" type="video/mp4" />
        </video>
        {/* Light overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 40%, hsl(192 95% 60% / 0.08) 0%, transparent 70%),
              radial-gradient(ellipse 50% 40% at 30% 60%, hsl(260 80% 65% / 0.06) 0%, transparent 60%),
              linear-gradient(180deg, transparent 60%, hsl(var(--background)) 100%)
            `,
          }}
        />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(30px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="/media/Lucene-logo.png"
            alt="Lucen"
            className="w-40 sm:w-52 md:w-64 mx-auto mb-8"
            style={{ filter: 'drop-shadow(0 0 40px hsl(192 95% 60% / 0.4))' }}
          />
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[0.9] mb-6">
            <span className="lucen-gradient-text">Lucen</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto font-body font-light leading-relaxed"
        >
          The infrastructure for phygital attention.
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
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />
    </section>
  );
}
