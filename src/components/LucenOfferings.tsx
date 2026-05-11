import { motion } from 'framer-motion';
import { OptimizedVideo } from './OptimizedMedia';
import GlassPanel from './GlassPanel';

const offerings = [
  {
    title: 'Holographic Systems',
    description: 'Retail-ready holographic displays that stop people in their tracks and drive instant engagement.',
    video: '/media/Comp-1_10-2.mp4',
    glow: 'primary' as const,
    icon: '◇',
  },
  {
    title: 'Simulation & 3D Environments',
    description: 'Real-time building simulations and 3D environments with volumetric depth and interactive control.',
    video: '/media/4.mp4',
    glow: 'accent' as const,
    icon: '⬡',
  },
  {
    title: 'Lucen Engine',
    description: 'AI-powered analytics engine that captures footfall, dwell time, and converts interaction data into actionable intelligence.',
    video: '/media/2.mp4',
    glow: 'primary' as const,
    icon: '◎',
  },
  {
    title: 'Content & Experience Design',
    description: 'From 3D modeling to holographic content pipelines — we design experiences that feel alive.',
    video: '/media/Track-overlay_1.mp4',
    glow: 'accent' as const,
    icon: '◈',
  },
];

export default function LucenOfferings() {
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
          <p className="text-sm font-display tracking-[0.3em] uppercase text-primary mb-4">What We Build</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            System Capabilities
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offerings.map((item, i) => (
            <GlassPanel key={item.title} delay={i * 0.1} className="p-0 overflow-hidden group cursor-default">
              <div className="relative aspect-video overflow-hidden">
                <OptimizedVideo
                  src={item.video}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              </div>
              <div className="p-8 -mt-12 relative z-10">
                <div className={`text-3xl mb-3 ${item.glow === 'accent' ? 'text-accent text-glow-accent' : 'text-primary text-glow'} transition-all duration-500`}>
                  {item.icon}
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
