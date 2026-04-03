import { motion } from 'framer-motion';

const industries = [
  { name: 'Retail & Luxury', value: 'Drives in-store engagement and sales', icon: '◇' },
  { name: 'Real Estate', value: 'Accelerates property sales', icon: '⬡' },
  { name: 'Automotive', value: 'Enhances product discovery', icon: '◎' },
  { name: 'Universities', value: 'Boosts student acquisition', icon: '◈' },
  { name: 'Telecom', value: 'Simplifies complex offerings', icon: '◉' },
  { name: 'Banking', value: 'Turns waiting into interaction', icon: '◆' },
  { name: 'Airports & Malls', value: 'Monetizes high footfall', icon: '◇' },
  { name: 'Healthcare', value: 'Improves training precision', icon: '⬡' },
  { name: 'Events & Exhibitions', value: 'Creates unforgettable experiences', icon: '◎' },
  { name: 'Industrial', value: 'Simplifies complex systems', icon: '◈' },
];

export default function LucenIndustries() {
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
          <p className="text-sm font-display tracking-[0.3em] uppercase text-primary mb-4">Spatial Coverage</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Industries We Transform
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, boxShadow: '0 0 30px -8px hsl(192 95% 60% / 0.2)' }}
              className="glass-panel-elevated glow-edge p-5 text-center group cursor-default"
            >
              <div className="text-2xl text-primary text-glow mb-3 group-hover:text-accent group-hover:text-glow-accent transition-all duration-500">
                {ind.icon}
              </div>
              <h4 className="font-display text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                {ind.name}
              </h4>
              <p className="text-muted-foreground font-body text-xs leading-relaxed">{ind.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
