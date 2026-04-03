import { motion } from 'framer-motion';

const metrics = [
  { label: 'Footfall', value: '2.4M', sub: 'Monthly impressions' },
  { label: 'Dwell Time', value: '47s', sub: 'Avg engagement' },
  { label: 'Conversion', value: '12.8%', sub: 'Interaction to action' },
  { label: 'ROI', value: '340%', sub: 'Campaign average' },
];

export default function LucenBrain() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="text-sm font-display tracking-[0.3em] uppercase text-accent mb-4">Intelligence Layer</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6">
            Lucen Brain
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
            Every interaction becomes measurable, optimizable, and monetizable.
          </p>
        </motion.div>

        {/* Dashboard simulation */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(20px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel-elevated glow-edge p-8 sm:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 glass-panel cursor-default"
              >
                <p className="font-display text-3xl sm:text-4xl font-bold lucen-gradient-text mb-1">{m.value}</p>
                <p className="font-display text-sm text-foreground mb-1">{m.label}</p>
                <p className="font-body text-xs text-muted-foreground">{m.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Simulated heatmap bars */}
          <div className="space-y-3">
            {['Zone A', 'Zone B', 'Zone C'].map((zone, i) => (
              <div key={zone} className="flex items-center gap-4">
                <span className="font-display text-xs text-muted-foreground w-14">{zone}</span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${85 - i * 20}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.5 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, hsl(192 95% 60%), hsl(260 80% 65%))`,
                      boxShadow: '0 0 10px hsl(192 95% 60% / 0.4)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
