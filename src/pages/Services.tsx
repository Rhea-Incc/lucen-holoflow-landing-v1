import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LucenHeader from '@/components/LucenHeader';
import ParticleField from '@/components/ParticleField';
import CursorGlow from '@/components/CursorGlow';
import { OptimizedVideo } from '@/components/OptimizedMedia';

const offerings = [
  {
    title: 'Holographic Systems',
    description: 'Retail-ready holographic displays that stop people in their tracks and drive instant engagement.',
    video: '/media/Comp-1_10-2.mp4',
    icon: '◇',
  },
  {
    title: 'Simulation & 3D Environments',
    description: 'Real-time building simulations and 3D environments with volumetric depth and interactive control.',
    video: '/media/4.mp4',
    icon: '⬡',
  },
  {
    title: 'Lucen Engine',
    description: 'AI-powered analytics engine that captures footfall, dwell time, and converts interaction data into actionable intelligence.',
    video: '/media/2.mp4',
    icon: '◎',
  },
  {
    title: 'Content & Experience Design',
    description: 'From 3D modeling to holographic content pipelines — we design experiences that feel alive.',
    video: '/media/Track-overlay_1.mp4',
    icon: '◈',
  },
];

export default function Services() {
  return (
    <div className="relative min-h-screen">
      <ParticleField />
      <CursorGlow />
      <LucenHeader />

      <div className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="text-sm font-display tracking-[0.3em] uppercase text-primary mb-4">What We Build</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              System Capabilities
            </h1>
          </motion.div>

          <div className="space-y-12">
            {offerings.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? 'lg:direction-rtl' : ''}`}
              >
                <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="glass-panel-elevated glow-edge overflow-hidden rounded-lg aspect-video">
                    <OptimizedVideo src={item.video} className="w-full h-full object-cover opacity-70" />
                  </div>
                </div>
                <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <span className="text-3xl text-primary text-glow mb-4 block">{item.icon}</span>
                  <h2 className="font-display text-2xl font-semibold text-foreground mb-4">{item.title}</h2>
                  <p className="text-muted-foreground font-body leading-relaxed mb-6">{item.description}</p>
                  <Link
                    to="/get-started"
                    className="glass-panel-elevated glow-edge px-6 py-2 font-display text-sm text-primary hover:text-foreground transition-colors inline-block"
                  >
                    Learn More
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
