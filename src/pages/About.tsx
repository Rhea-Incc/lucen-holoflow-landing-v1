import { motion } from 'framer-motion';
import LucenHeader from '@/components/LucenHeader';
import ParticleField from '@/components/ParticleField';
import CursorGlow from '@/components/CursorGlow';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Link } from 'react-router-dom';
import { Lightbulb, Eye, Target, Zap } from 'lucide-react';

const values = [
  { icon: Lightbulb, title: 'Innovation First', text: 'We pioneer holographic and immersive media experiences that redefine how brands communicate in physical spaces.' },
  { icon: Eye, title: 'Audience-Centric', text: 'Every deployment is designed around real human behavior — capturing attention naturally and driving measurable engagement.' },
  { icon: Target, title: 'Precision Delivery', text: 'From venue mapping to content scheduling, our AI-driven pipeline ensures the right message reaches the right audience at the right moment.' },
  { icon: Zap, title: 'Measurable Impact', text: 'Our Lucen Engine analytics engine tracks impressions, dwell time, and ROI in real-time — making every campaign accountable.' },
];

const fadeUp = {
  initial: { opacity: 0, y: 30, filter: 'blur(12px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

export default function About() {
  return (
    <div className="relative min-h-screen">
      <ParticleField />
      <CursorGlow />
      <LucenHeader />
      <WhatsAppButton />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 max-w-5xl mx-auto text-center">
        <motion.p {...fadeUp} className="text-sm font-display tracking-[0.3em] uppercase text-primary mb-4">
          About Lucen
        </motion.p>
        <motion.h1 {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }} className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
          The Future of <span className="lucen-gradient-text">Physical Media</span>
        </motion.h1>
        <motion.p {...fadeUp} transition={{ duration: 0.7, delay: 0.2 }} className="text-muted-foreground text-lg max-w-2xl mx-auto font-body leading-relaxed">
          Lucen is a spatial media company that deploys holographic displays, immersive content, and AI-powered analytics across high-footfall environments worldwide. We transform physical spaces into intelligent, engaging media surfaces.
        </motion.p>
      </section>

      {/* Mission & Vision */}
      <section className="px-6 pb-20 max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        <motion.div {...fadeUp} className="glass-panel-elevated glow-edge p-8 sm:p-10">
          <p className="text-xs font-display tracking-[0.3em] uppercase text-primary mb-3">Our Mission</p>
          <p className="font-body text-muted-foreground leading-relaxed">
            To make physical spaces intelligent media environments — bridging the gap between digital advertising and real-world engagement through cutting-edge holographic technology and data-driven content delivery.
          </p>
        </motion.div>
        <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="glass-panel-elevated glow-edge p-8 sm:p-10">
          <p className="text-xs font-display tracking-[0.3em] uppercase text-accent mb-3">Our Vision</p>
          <p className="font-body text-muted-foreground leading-relaxed">
            A world where every high-traffic space is a canvas for immersive, measurable, and meaningful brand experiences — powered by light, driven by data.
          </p>
        </motion.div>
      </section>

      {/* Values */}
      <section className="px-6 pb-24 max-w-5xl mx-auto">
        <motion.p {...fadeUp} className="text-sm font-display tracking-[0.3em] uppercase text-primary mb-10 text-center">
          What Drives Us
        </motion.p>
        <div className="grid sm:grid-cols-2 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-panel p-6 flex gap-4 items-start group hover:border-primary/20 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-lg glass-panel-elevated flex items-center justify-center shrink-0">
                <v.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-sm font-semibold text-foreground mb-1">{v.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{v.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 text-center">
        <motion.div {...fadeUp}>
          <Link
            to="/get-started"
            className="glass-panel-elevated glow-edge px-8 py-3 font-display text-sm font-medium tracking-wide text-primary hover:text-foreground transition-colors duration-300 inline-block"
          >
            Partner With Lucen
          </Link>
        </motion.div>
      </section>

      <footer className="relative py-16 px-6 text-center">
        <p className="text-muted-foreground text-xs font-display tracking-[0.2em] uppercase">
          Lucen Interface System
        </p>
      </footer>
    </div>
  );
}
