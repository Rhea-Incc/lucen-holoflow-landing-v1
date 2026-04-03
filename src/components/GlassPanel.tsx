import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export default function GlassPanel({ children, className = '', delay = 0, hover = true }: GlassPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hover ? { y: -6, boxShadow: '0 0 40px -8px hsl(192 95% 60% / 0.2)' } : undefined}
      className={`glass-panel-elevated glow-edge transition-all duration-500 ${className}`}
    >
      {children}
    </motion.div>
  );
}
