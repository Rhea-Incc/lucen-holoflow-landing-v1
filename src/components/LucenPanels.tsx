import { motion } from 'framer-motion';
import GlassPanel from './GlassPanel';

const features = [
  {
    title: 'Spatial Rendering',
    description: 'Every pixel exists in a volumetric light field. UI elements float in depth, responding to your presence.',
    icon: '◇',
    glow: 'primary',
  },
  {
    title: 'Light Kinesis',
    description: 'Your cursor emits light. Elements bend, attract, and respond with gravitational precision.',
    icon: '◎',
    glow: 'accent',
  },
  {
    title: 'Glass Material',
    description: 'Frosted refraction panels with dynamic blur, edge glow, and environmental light wrapping.',
    icon: '⬡',
    glow: 'primary',
  },
  {
    title: 'Motion Intelligence',
    description: 'Motion is not animation—it is system behavior. Objects materialize from light and dissolve into particles.',
    icon: '◈',
    glow: 'accent',
  },
];

export default function LucenPanels() {
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
          <p className="text-sm font-display tracking-[0.3em] uppercase text-primary mb-4">System Architecture</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Built from light
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <GlassPanel key={feature.title} delay={i * 0.1} className="p-8 group cursor-default">
              <div className={`text-3xl mb-4 ${feature.glow === 'accent' ? 'text-accent text-glow-accent' : 'text-primary text-glow'} transition-all duration-500`}>
                {feature.icon}
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                {feature.description}
              </p>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
