import { motion } from 'framer-motion';
import LucenHeader from '@/components/LucenHeader';
import ParticleField from '@/components/ParticleField';
import CursorGlow from '@/components/CursorGlow';
import WhatsAppButton from '@/components/WhatsAppButton';

const values = [
  { title: 'Innovation First', desc: 'We push the boundaries of what physical spaces can do with light, data, and real-time interaction.' },
  { title: 'Measurable Impact', desc: 'Every installation is designed to convert attention into actionable, trackable revenue.' },
  { title: 'Phygital Integration', desc: 'We bridge physical environments and digital intelligence into seamless experiences.' },
  { title: 'Partner Ecosystem', desc: 'We collaborate with technology, space, and brand partners to deploy at scale.' },
];

const fadeUp = {
  initial: { opacity: 0, y: 30, filter: 'blur(12px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

export default function About() {
  return (
    <div className="relative min-h-screen">
      <ParticleField />
      <CursorGlow />
      <LucenHeader />
      <WhatsAppButton />

      <div className="pt-28 pb-20 px-6 max-w-4xl mx-auto">
        {/* Hero */}
        <motion.div {...fadeUp} className="text-center mb-20">
          <p className="text-sm font-display tracking-[0.3em] uppercase text-primary mb-4">About</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">
            The Infrastructure for <span className="lucen-gradient-text">Phygital Attention</span>
          </h1>
          <p className="text-muted-foreground font-body text-lg leading-relaxed max-w-2xl mx-auto">
            Lucen builds intelligent environments where holographic light captures attention,
            data maps behavior, and systems convert engagement into measurable revenue.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div {...fadeUp} className="glass-panel-elevated glow-edge p-10 sm:p-14 mb-16">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Mission</h2>
          <p className="text-muted-foreground font-body leading-relaxed">
            We exist to transform how brands interact with people in physical spaces. Through holographic
            systems, real-time simulations, and our proprietary Lucen Brain analytics platform, we turn
            passive foot traffic into active, measurable engagement — making every square meter of physical
            space an intelligent media channel.
          </p>
        </motion.div>

        {/* Values */}
        <motion.div {...fadeUp} className="mb-16">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">What Drives Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-panel-elevated glow-edge p-6 group hover:border-primary/20 transition-colors duration-500"
              >
                <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                  {v.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Story */}
        <motion.div {...fadeUp} className="glass-panel-elevated glow-edge p-10 sm:p-14">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Story</h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-4">
            Born at the intersection of spatial computing, holographic display technology, and data science,
            Lucen was founded to solve a fundamental challenge: physical spaces generate massive attention
            but have no way to measure, optimize, or monetize it the way digital channels do.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed">
            Today, we deploy holographic systems, 3D simulations, and intelligent analytics across retail,
            real estate, automotive, airports, malls, and more — building the infrastructure layer for the
            next generation of physical media.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
