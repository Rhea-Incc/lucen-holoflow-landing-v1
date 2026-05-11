import { motion } from 'framer-motion';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const metrics = [
  { label: 'Footfall', value: '2.4M', sub: 'Monthly impressions' },
  { label: 'Dwell Time', value: '47s', sub: 'Avg engagement' },
  { label: 'Conversion', value: '12.8%', sub: 'Interaction to action' },
  { label: 'ROI', value: '340%', sub: 'Campaign average' },
];

const analyticsSnapshot = [
  { metric: 'Footfall', value: 2400, suffix: 'K' },
  { metric: 'Dwell', value: 47, suffix: 's' },
  { metric: 'Leads', value: 128, suffix: '%' },
  { metric: 'ROI', value: 340, suffix: '%' },
];

const chartColors = [
  'hsl(var(--primary))',
  'hsl(var(--accent))',
  'hsl(var(--primary) / 0.85)',
  'hsl(var(--accent) / 0.85)',
];

export default function LucenEngine() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="text-sm font-display tracking-[0.3em] uppercase text-accent mb-4">Intelligence Layer</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-6">
            Lucen Engine
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
            Every interaction becomes measurable, optimizable, and monetizable.
          </p>
        </motion.div>

        {/* Dashboard simulation */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(20px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel-elevated glow-edge p-8 sm:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 glass-panel cursor-default"
              >
                <p className="font-display text-3xl sm:text-4xl font-bold lucen-gradient-text mb-1">{m.value}</p>
                <p className="font-display text-sm text-foreground mb-1">{m.label}</p>
                <p className="font-body text-xs text-muted-foreground">{m.sub}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-3">
              {['Zone A', 'Zone B', 'Zone C'].map((zone, i) => (
                <div key={zone} className="flex items-center gap-4">
                  <span className="font-display text-sm text-muted-foreground w-16">{zone}</span>
                  <div className="flex-1 h-2.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${85 - i * 20}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.5 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))',
                        boxShadow: '0 0 10px hsl(var(--primary) / 0.4)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-panel p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-display text-sm tracking-[0.25em] uppercase text-primary mb-1">Live Metrics</p>
                  <h3 className="font-display text-xl font-semibold text-foreground">Lucen Snapshot</h3>
                </div>
                <div className="flex items-center gap-2 text-xs font-display uppercase tracking-[0.2em] text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                  Live
                </div>
              </div>

              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsSnapshot} barGap={14}>
                    <CartesianGrid vertical={false} stroke="hsl(var(--border) / 0.45)" />
                    <XAxis
                      dataKey="metric"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      width={36}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    />
                    <Tooltip
                      cursor={{ fill: 'hsl(var(--muted) / 0.35)' }}
                      contentStyle={{
                        background: 'hsl(var(--surface-elevated) / 0.96)',
                        border: '1px solid hsl(var(--border) / 0.5)',
                        borderRadius: '12px',
                        color: 'hsl(var(--foreground))',
                      }}
                      formatter={(value: number, _name, item) => [`${value}${item.payload.suffix}`, 'Tracked']}
                    />
                    <Bar dataKey="value" radius={[12, 12, 4, 4]} animationDuration={1600}>
                      {analyticsSnapshot.map((entry, index) => (
                        <Cell key={entry.metric} fill={chartColors[index % chartColors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
