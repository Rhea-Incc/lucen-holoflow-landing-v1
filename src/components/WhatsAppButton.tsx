import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '254727750097';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Lucen%2C%20I'd%20like%20to%20learn%20more%20about%20your%20services.`;

export default function WhatsAppButton() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full glass-panel-elevated glow-edge flex items-center justify-center group cursor-pointer"
      style={{
        boxShadow: '0 0 25px -5px hsl(142 70% 45% / 0.3), var(--shadow-glow-sm)',
      }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-[hsl(142,70%,45%)] group-hover:text-foreground transition-colors duration-300" />
      <span className="absolute inset-0 rounded-full animate-pulse-glow opacity-30 border border-[hsl(142,70%,45%/0.3)]" />
    </motion.a>
  );
}
