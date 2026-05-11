import { motion } from 'framer-motion';

const pipelineNodes = [
  { label: 'Attention', detail: 'Holographic systems stop people instantly', icon: '◉' },
  { label: 'Interaction', detail: 'QR, NFC, gesture engagement', icon: '◎' },
  { label: 'Capture', detail: 'Cameras + sensors track behavior', icon: '◇' },
  { label: 'Analysis', detail: 'Lucen Engine processes patterns', icon: '⬡' },
  { label: 'Retargeting', detail: 'Users are re-engaged digitally', icon: '◈' },
  { label: 'Conversion', detail: 'Interaction becomes measurable revenue', icon: '◆' },
];

export default function LucenPipeline() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-sm font-display tracking-[0.3em] uppercase text-primary mb-4">System Flow</p>
          <h2 className="font-display text-5xl sm:text-6xl font-bold tracking-tight text-foreground">
            How It Works
          </h2>
        </motion.div>

        {/* Pipeline */}
        <div className="relative">
          {/* Connecting light line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2 hidden md:block" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {pipelineNodes.map((node, i) => (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, boxShadow: '0 0 40px -8px hsl(192 95% 60% / 0.3)' }}
                className="glass-panel-elevated glow-edge p-5 text-center group cursor-default relative"
              >
                <div className="text-3xl text-primary text-glow mb-4 group-hover:scale-110 transition-transform duration-300">
                  {node.icon}
                </div>
                <h4 className="font-display text-base sm:text-lg font-semibold text-foreground mb-2">{node.label}</h4>
                <p className="text-muted-foreground font-body text-sm leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  {node.detail}
                </p>
                {/* Light connector dot */}
                {i < pipelineNodes.length - 1 && (
                  <div className="absolute -right-2 top-1/2 w-1.5 h-1.5 rounded-full bg-primary/40 -translate-y-1/2 hidden lg:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
