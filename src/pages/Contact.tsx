import { motion } from 'framer-motion';
import { useState } from 'react';
import LucenHeader from '@/components/LucenHeader';
import ParticleField from '@/components/ParticleField';
import CursorGlow from '@/components/CursorGlow';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Phone, MessageCircle, PhoneCall } from 'lucide-react';

export default function Contact() {
  const [mode, setMode] = useState<'message' | 'call' | 'callback'>('message');

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
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">Contact Us</h1>

          {/* Mode Tabs */}
          <div className="flex gap-2 mb-8">
            {[
              { key: 'message' as const, label: 'Send Message', icon: MessageCircle },
              { key: 'call' as const, label: 'Call Us', icon: Phone },
              { key: 'callback' as const, label: 'Request Callback', icon: PhoneCall },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setMode(tab.key)}
                className={`flex-1 glass-panel px-3 py-2.5 font-display text-xs tracking-wide flex items-center justify-center gap-1.5 transition-all duration-300 ${
                  mode === tab.key
                    ? 'text-primary border-primary/30 glow-edge'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          {mode === 'call' && (
            <div className="text-center space-y-6">
              <p className="text-muted-foreground font-body text-sm">Speak directly with our team</p>
              <a
                href="tel:+254727750097"
                className="w-full glass-panel-elevated glow-edge px-8 py-4 font-display text-lg font-medium tracking-wide text-primary hover:text-foreground transition-colors duration-300 flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5" />
                +254 727 750 097
              </a>
              <p className="text-muted-foreground font-body text-xs">Available Mon–Fri, 8 AM – 6 PM EAT</p>
            </div>
          )}

          {mode === 'message' && (
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
                <label className="font-display text-xs text-muted-foreground tracking-wide uppercase block mb-2">Message</label>
                <textarea rows={4} className="w-full glass-panel px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30 resize-none" placeholder="Tell us about your project..." />
              </div>
              <button className="w-full glass-panel-elevated glow-edge px-8 py-3 font-display text-sm font-medium tracking-wide text-primary hover:text-foreground transition-colors duration-300">
                Send Message
              </button>
            </form>
          )}

          {mode === 'callback' && (
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="font-display text-xs text-muted-foreground tracking-wide uppercase block mb-2">Name</label>
                <input className="w-full glass-panel px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30" placeholder="Your name" />
              </div>
              <div>
                <label className="font-display text-xs text-muted-foreground tracking-wide uppercase block mb-2">Phone Number</label>
                <input type="tel" className="w-full glass-panel px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30" placeholder="+254 7XX XXX XXX" />
              </div>
              <div>
                <label className="font-display text-xs text-muted-foreground tracking-wide uppercase block mb-2">Preferred Time</label>
                <select className="w-full glass-panel px-4 py-3 font-body text-sm text-foreground bg-transparent focus:outline-none focus:ring-1 focus:ring-primary/30 appearance-none">
                  <option value="" className="bg-card">Select a time</option>
                  <option value="morning" className="bg-card">Morning (8–12 PM)</option>
                  <option value="afternoon" className="bg-card">Afternoon (12–4 PM)</option>
                  <option value="evening" className="bg-card">Evening (4–6 PM)</option>
                </select>
              </div>
              <div>
                <label className="font-display text-xs text-muted-foreground tracking-wide uppercase block mb-2">Brief Note (optional)</label>
                <textarea rows={2} className="w-full glass-panel px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30 resize-none" placeholder="What's this about?" />
              </div>
              <button className="w-full glass-panel-elevated glow-edge px-8 py-3 font-display text-sm font-medium tracking-wide text-primary hover:text-foreground transition-colors duration-300">
                Request Callback
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
