import { motion } from 'framer-motion';

export default function LucenClosing() {
  return (
    <section className="relative py-40 px-6 overflow-hidden">
      {/* Light convergence background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 50%, hsl(192 95% 60% / 0.06) 0%, transparent 60%),
            radial-gradient(ellipse 40% 30% at 50% 50%, hsl(260 80% 65% / 0.04) 0%, transparent 50%)
          `,
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-20 h-20 mx-auto mb-10 rounded-full border border-primary/20 flex items-center justify-center"
            style={{ boxShadow: '0 0 60px -10px hsl(192 95% 60% / 0.3), inset 0 0 30px -10px hsl(192 95% 60% / 0.1)' }}
          >
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
          </motion.div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            <span className="lucen-gradient-text">Lucen is the infrastructure</span>
            <br />
            <span className="text-foreground">for phygital attention.</span>
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex gap-4 justify-center"
          >
            <button className="glass-panel-elevated glow-edge px-10 py-4 font-display text-sm font-medium tracking-wide text-primary hover:text-foreground transition-colors duration-300">
              Get Started
            </button>
            <button className="glass-panel px-10 py-4 font-display text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300">
              Contact Us
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
