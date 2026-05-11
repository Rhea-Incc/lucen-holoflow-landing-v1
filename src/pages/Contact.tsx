import { motion } from 'framer-motion';
import { useState } from 'react';
import LucenHeader from '@/components/LucenHeader';
import ParticleField from '@/components/ParticleField';
import CursorGlow from '@/components/CursorGlow';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Phone, MessageCircle, PhoneCall, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { trackEngineEvent } from '@/lib/engineAnalytics';

export default function Contact() {
  const [mode, setMode] = useState<'message' | 'call' | 'callback'>('message');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [preferredTime, setPreferredTime] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { toast.error('Name is required'); return; }
    if (mode === 'message' && !email.trim()) { toast.error('Email is required'); return; }
    if (mode === 'callback' && !phone.trim()) { toast.error('Phone number is required'); return; }

    setLoading(true);
    const { error } = await supabase.from('contact_submissions').insert({
      name: name.trim(),
      email: email.trim() || null,
      phone: phone.trim() || null,
      message: message.trim() || null,
      mode,
      preferred_time: preferredTime || null,
    });
    setLoading(false);

    if (error) {
      toast.error('Failed to send. Please try again.');
      return;
    }

    setSubmitted(true);
    toast.success('Message sent successfully!');
    const integrationSlug = new URLSearchParams(window.location.search).get('integration');
    void trackEngineEvent({
      event_type: 'conversion',
      integration_slug: integrationSlug,
      source: 'contact_form',
      metadata: { mode },
    });
    setName(''); setEmail(''); setPhone(''); setMessage(''); setPreferredTime('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputClass = "w-full glass-panel px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30";

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
                onClick={() => { setMode(tab.key); setSubmitted(false); }}
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

          {submitted && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 space-y-3">
              <CheckCircle className="w-10 h-10 text-primary mx-auto" />
              <p className="font-display text-lg text-foreground">Thank you!</p>
              <p className="text-muted-foreground text-sm">We'll get back to you soon.</p>
            </motion.div>
          )}

          {!submitted && mode === 'call' && (
            <div className="text-center space-y-6">
              <p className="text-muted-foreground font-body text-sm">Speak directly with our team</p>
              <a href="tel:+254727750097" className="w-full glass-panel-elevated glow-edge px-8 py-4 font-display text-lg font-medium tracking-wide text-primary hover:text-foreground transition-colors duration-300 flex items-center justify-center gap-3">
                <Phone className="w-5 h-5" />
                +254 727 750 097
              </a>
              <p className="text-muted-foreground font-body text-xs">Available Mon–Fri, 8 AM – 6 PM EAT</p>
            </div>
          )}

          {!submitted && mode === 'message' && (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="font-display text-xs text-muted-foreground tracking-wide uppercase block mb-2">Name</label>
                <input className={inputClass} placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div>
                <label className="font-display text-xs text-muted-foreground tracking-wide uppercase block mb-2">Email</label>
                <input type="email" className={inputClass} placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div>
                <label className="font-display text-xs text-muted-foreground tracking-wide uppercase block mb-2">Message</label>
                <textarea rows={4} className={`${inputClass} resize-none`} placeholder="Tell us about your project..." value={message} onChange={e => setMessage(e.target.value)} />
              </div>
              <button disabled={loading} className="w-full glass-panel-elevated glow-edge px-8 py-3 font-display text-sm font-medium tracking-wide text-primary hover:text-foreground transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : 'Send Message'}
              </button>
            </form>
          )}

          {!submitted && mode === 'callback' && (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="font-display text-xs text-muted-foreground tracking-wide uppercase block mb-2">Name</label>
                <input className={inputClass} placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div>
                <label className="font-display text-xs text-muted-foreground tracking-wide uppercase block mb-2">Phone Number</label>
                <input type="tel" className={inputClass} placeholder="+254 7XX XXX XXX" value={phone} onChange={e => setPhone(e.target.value)} required />
              </div>
              <div>
                <label className="font-display text-xs text-muted-foreground tracking-wide uppercase block mb-2">Preferred Time</label>
                <select className={`${inputClass} bg-transparent appearance-none`} value={preferredTime} onChange={e => setPreferredTime(e.target.value)}>
                  <option value="" className="bg-card">Select a time</option>
                  <option value="morning" className="bg-card">Morning (8–12 PM)</option>
                  <option value="afternoon" className="bg-card">Afternoon (12–4 PM)</option>
                  <option value="evening" className="bg-card">Evening (4–6 PM)</option>
                </select>
              </div>
              <div>
                <label className="font-display text-xs text-muted-foreground tracking-wide uppercase block mb-2">Brief Note (optional)</label>
                <textarea rows={2} className={`${inputClass} resize-none`} placeholder="What's this about?" value={message} onChange={e => setMessage(e.target.value)} />
              </div>
              <button disabled={loading} className="w-full glass-panel-elevated glow-edge px-8 py-3 font-display text-sm font-medium tracking-wide text-primary hover:text-foreground transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : 'Request Callback'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
