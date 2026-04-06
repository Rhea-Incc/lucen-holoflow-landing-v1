import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Industries', path: '/industries' },
  { label: 'Contact', path: '/contact' },
];

export default function LucenHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'linear-gradient(180deg, hsl(220 20% 4% / 0.92) 0%, hsl(220 20% 4% / 0.75) 100%)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid hsl(var(--surface-glass-border) / 0.1)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo + Name */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/media/Lucene-logo.png"
            alt="Lucen"
            className="w-8 h-8 object-contain"
            style={{ filter: 'drop-shadow(0 0 12px hsl(192 95% 60% / 0.4))' }}
            loading="eager"
          />
          <span className="font-display text-lg font-bold tracking-tight lucen-gradient-text group-hover:opacity-80 transition-opacity">
            Lucen
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 font-display text-sm tracking-wide transition-all duration-300 rounded-md ${
                location.pathname.startsWith(item.path)
                  ? 'text-primary text-glow'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/get-started"
            className="ml-3 glass-panel-elevated glow-edge px-5 py-2 font-display text-sm font-medium tracking-wide text-primary hover:text-foreground transition-colors duration-300"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="w-5 h-0.5 bg-foreground block"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-5 h-0.5 bg-foreground block"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="w-5 h-0.5 bg-foreground block"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={menuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden"
        style={{
          background: 'hsl(220 20% 4% / 0.97)',
          backdropFilter: 'blur(32px)',
        }}
      >
        <nav className="flex flex-col px-6 py-4 gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="py-3 font-display text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors border-b border-border/30"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/get-started"
            onClick={() => setMenuOpen(false)}
            className="mt-2 glass-panel-elevated glow-edge px-5 py-3 text-center font-display text-sm font-medium tracking-wide text-primary"
          >
            Get Started
          </Link>
        </nav>
      </motion.div>
    </motion.header>
  );
}
