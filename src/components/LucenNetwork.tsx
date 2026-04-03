import { motion } from 'framer-motion';

const networkNodes = ['Malls', 'Airports', 'Banks', 'Retail', 'Events', 'Corporate'];

export default function LucenNetwork() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="text-sm font-display tracking-[0.3em] uppercase text-primary mb-4">Spatial Network</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6">
            Public Space Infrastructure
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
            Lucen builds and monetizes physical media networks in high-footfall environments.
          </p>
        </motion.div>

        {/* Abstract city grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel-elevated glow-edge p-10 sm:p-16"
        >
          <div className="relative flex flex-wrap justify-center gap-8">
            {networkNodes.map((node, i) => (
              <motion.div
                key={node}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col items-center"
              >
                <div
                  className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center mb-3"
                  style={{ boxShadow: '0 0 30px -8px hsl(192 95% 60% / 0.3)' }}
                >
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                </div>
                <span className="font-display text-xs tracking-wider text-muted-foreground uppercase">{node}</span>
              </motion.div>
            ))}
            {/* Light connections (decorative) */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="10" y1="50" x2="90" y2="50" stroke="hsl(192 95% 60%)" strokeWidth="0.3" />
                <line x1="30" y1="20" x2="70" y2="80" stroke="hsl(192 95% 60%)" strokeWidth="0.2" />
                <line x1="50" y1="10" x2="50" y2="90" stroke="hsl(260 80% 65%)" strokeWidth="0.2" />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
