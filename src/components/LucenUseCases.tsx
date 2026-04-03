import { motion } from 'framer-motion';

const cases = [
  { title: 'Retail Product Launch', image: '/media/Innovative-Brands-and-Event-Organisers.jpg' },
  { title: 'Real Estate Sales Center', image: '/media/gizmo-holograms-rotator-4_1920x850.jpg' },
  { title: 'Automotive Showroom', image: '/media/Starbucks.jpg' },
  { title: 'Trade Show Immersive Booth', image: '/media/gizmo-holograms-events-3_1440x900.jpg' },
];

export default function LucenUseCases() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-sm font-display tracking-[0.3em] uppercase text-primary mb-4">Deployments</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Use Cases
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 40, filter: 'blur(15px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, boxShadow: '0 0 40px -8px hsl(192 95% 60% / 0.2)' }}
              className="glass-panel-elevated glow-edge overflow-hidden group cursor-default"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              </div>
              <div className="p-6 -mt-8 relative z-10">
                <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {c.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
