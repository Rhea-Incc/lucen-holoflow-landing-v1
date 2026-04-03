import { motion } from 'framer-motion';

const clients = [
  'Retail Brands', 'Developers', 'Automotive', 'Universities',
  'Telecom', 'Banks', 'Agencies', 'Mall Operators', 'Airports', 'Event Organizers',
];

const partnerGroups = [
  { title: 'Technology Partners', desc: 'Hardware, AI, and platform integrations', color: 'primary' },
  { title: 'Space Partners', desc: 'Venues, malls, airports, and public spaces', color: 'accent' },
  { title: 'Brand Partners', desc: 'Agencies, retailers, and enterprise clients', color: 'primary' },
];

export default function LucenPartners() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Who we work with */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="text-sm font-display tracking-[0.3em] uppercase text-primary mb-4">Ecosystem</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Who We Work With
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-24">
          {clients.map((client, i) => (
            <motion.div
              key={client}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px -5px hsl(192 95% 60% / 0.3)' }}
              className="glass-panel glow-edge px-5 py-3 cursor-default"
            >
              <span className="font-display text-sm text-foreground">{client}</span>
            </motion.div>
          ))}
        </div>

        {/* Partnerships triad */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-display tracking-[0.3em] uppercase text-accent mb-4">Partnership Model</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partnerGroups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 30, filter: 'blur(15px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, boxShadow: `0 0 40px -8px hsl(${g.color === 'accent' ? '260 80% 65%' : '192 95% 60%'} / 0.25)` }}
              className="glass-panel-elevated glow-edge p-8 text-center cursor-default"
            >
              <div
                className="w-12 h-12 mx-auto mb-4 rounded-full border flex items-center justify-center"
                style={{
                  borderColor: `hsl(${g.color === 'accent' ? '260 80% 65%' : '192 95% 60%'} / 0.3)`,
                  boxShadow: `0 0 25px -8px hsl(${g.color === 'accent' ? '260 80% 65%' : '192 95% 60%'} / 0.3)`,
                }}
              >
                <div className={`w-2 h-2 rounded-full ${g.color === 'accent' ? 'bg-accent' : 'bg-primary'} animate-pulse-glow`} />
              </div>
              <h4 className="font-display text-lg font-semibold text-foreground mb-2">{g.title}</h4>
              <p className="text-muted-foreground font-body text-sm">{g.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
