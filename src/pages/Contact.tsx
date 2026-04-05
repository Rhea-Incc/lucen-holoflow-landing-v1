import { motion } from 'framer-motion';
import { Phone, PhoneCall, MessageCircle } from 'lucide-react';
import LucenHeader from '@/components/LucenHeader';
import ParticleField from '@/components/ParticleField';
import CursorGlow from '@/components/CursorGlow';
import WhatsAppButton from '@/components/WhatsAppButton';
import { useState } from 'react';

const PHONE_NUMBER = '+254727750097';
const WHATSAPP_URL = `https://wa.me/254727750097?text=Hi%20Lucen%2C%20I'd%20like%20to%20learn%20more%20about%20your%20services.`;

export default function Contact() {
  const [callbackSent, setCallbackSent] = useState(false);

  return (
    <div className="relative min-h-screen">
      <ParticleField />
      <CursorGlow />
      <LucenHeader />
      <WhatsAppButton />

      <div className="pt-28 pb-20 px-6 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8 }}
          className="glass-panel-elevated glow-edge p-10 sm:p-14 max-w-xl w-full"
        >
          <p className="text-sm font-display tracking-[0.3em] uppercase text-primary mb-4">Reach Out</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">Contact Us</h1>

          {/* Quick actions */}
          <div className="flex flex-wrap gap-3 mb-8">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="glass-panel glow-edge px-4 py-2.5 font-display text-xs tracking-wide text-primary hover:text-foreground transition-colors duration-300 flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> Call Us
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel glow-edge px-4 py-2.5 font-display text-xs tracking-wide text-primary hover:text-foreground transition-colors duration-300 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <button
              onClick={() => setCallbackSent(true)}
              disabled={callbackSent}
              className="glass-panel glow-edge px-4 py-2.5 font-display text-xs tracking-wide text-primary hover:text-foreground transition-colors duration-300 flex items-center gap-2 disabled:opacity-50"
            >
              <PhoneCall className="w-4 h-4" /> {callbackSent ? 'Callback Requested' : 'Request Callback'}
            </button>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="font-display text-xs text-muted-foreground tracking-wide uppercase block mb-2">Name</label>
              <input className="w-full glass-panel px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30" placeholder="Your name" />
            </div>
            <div>
              <label className="font-display text-xs text-muted-foreground tracking-wide uppercase block mb-2">Email</label>
              <input type="email" className="w-full glass-panel px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30" placeholder="your@email.com" />
            </div>
            <div>
              <label className="font-display text-xs text-muted-foreground tracking-wide uppercase block mb-2">Phone</label>
              <input type="tel" className="w-full glass-panel px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30" placeholder="+254 7XX XXX XXX" />
            </div>
            <div>
              <label className="font-display text-xs text-muted-foreground tracking-wide uppercase block mb-2">Message</label>
              <textarea rows={4} className="w-full glass-panel px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30 resize-none" placeholder="Tell us about your project..." />
            </div>
            <button className="w-full glass-panel-elevated glow-edge px-8 py-3 font-display text-sm font-medium tracking-wide text-primary hover:text-foreground transition-colors duration-300">
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
