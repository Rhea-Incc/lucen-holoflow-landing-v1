import { motion } from 'framer-motion';

export default function LucenDefinition() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background holographic loop */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/media/Track-overlay_1.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -60, filter: 'blur(20px)' }}
          whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel-elevated glow-edge p-10 sm:p-14 max-w-2xl"
        >
          <p className="text-sm font-display tracking-[0.3em] uppercase text-primary mb-6">What Is Lucen</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight mb-6">
            We Turn Physical Attention Into Measurable Revenue
          </h2>
          <p className="text-muted-foreground font-body text-base sm:text-lg leading-relaxed">
            Lucen builds intelligent environments where light captures attention, data maps behavior, and systems convert engagement into sales.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
