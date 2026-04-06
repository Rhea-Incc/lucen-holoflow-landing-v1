import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/254727750097"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 glass-panel-elevated glow-edge flex items-center justify-center w-14 h-14 rounded-full cursor-pointer group"
      style={{
        boxShadow: '0 0 24px -4px hsl(142 70% 49% / 0.35), var(--shadow-glow-sm)',
      }}
    >
      <MessageCircle className="w-6 h-6 text-[hsl(142,70%,49%)] group-hover:text-foreground transition-colors duration-300" />
      <span className="absolute inset-0 rounded-full animate-pulse-glow opacity-30 border border-[hsl(142,70%,49%)] pointer-events-none" />
    </motion.a>
  );
}
