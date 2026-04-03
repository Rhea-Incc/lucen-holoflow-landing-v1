import { motion } from 'framer-motion';

export default function LucenShowcase() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(20px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel-elevated glow-edge overflow-hidden rounded-2xl"
        >
          <div className="relative aspect-video flex items-center justify-center">
            {/* Simulated viewport environment */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse 80% 60% at 50% 50%, hsl(192 95% 60% / 0.05) 0%, transparent 60%),
                  radial-gradient(ellipse 50% 40% at 70% 30%, hsl(260 80% 65% / 0.04) 0%, transparent 50%),
                  linear-gradient(180deg, hsl(220 20% 6%) 0%, hsl(220 20% 4%) 100%)
                `,
              }}
            />
            <div className="relative z-10 text-center">
              <motion.div
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-24 h-24 mx-auto mb-6 rounded-full border border-primary/20 flex items-center justify-center"
                style={{
                  boxShadow: '0 0 60px -10px hsl(192 95% 60% / 0.3), inset 0 0 30px -10px hsl(192 95% 60% / 0.1)',
                }}
              >
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
              </motion.div>
              <p className="text-muted-foreground text-sm font-display tracking-widest uppercase">
                Simulation Active
              </p>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-8 text-muted-foreground text-sm font-body"
        >
          Every interaction emits light. This is not a website — it is Lucen.
        </motion.p>
      </div>
    </section>
  );
}
