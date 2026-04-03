import { motion } from 'framer-motion';

const models = [
  { title: 'Hardware Sales', desc: 'Direct holographic system purchases' },
  { title: 'Leasing', desc: 'Flexible long-term deployment plans' },
  { title: 'Short-Term Rentals', desc: 'Event and campaign activations' },
  { title: 'SaaS Analytics', desc: 'Lucen Brain subscription platform' },
  { title: 'DOOH Revenue Share', desc: 'Ad network monetization in public spaces' },
  { title: 'Campaign Deployments', desc: 'Full-service brand activations' },
];

export default function LucenBusinessModels() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-sm font-display tracking-[0.3em] uppercase text-primary mb-4">Revenue Architecture</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Business Models
          </h2>
        </motion.div>

        <div className="space-y-3">
          {models.map((model, i) => (
            <motion.div
              key={model.title}
              initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ x: 8, boxShadow: '0 0 30px -8px hsl(192 95% 60% / 0.2)' }}
              className="glass-panel-elevated glow-edge p-6 flex items-center justify-between group cursor-default"
            >
              <div className="flex items-center gap-4">
                <span className="text-primary text-glow font-display text-sm font-bold opacity-40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h4 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {model.title}
                </h4>
              </div>
              <p className="text-muted-foreground font-body text-sm hidden sm:block">{model.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
