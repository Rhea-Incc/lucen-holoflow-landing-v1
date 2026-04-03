import ParticleField from '@/components/ParticleField';
import CursorGlow from '@/components/CursorGlow';
import LucenHero from '@/components/LucenHero';
import LucenPanels from '@/components/LucenPanels';
import LucenShowcase from '@/components/LucenShowcase';

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <ParticleField />
      <CursorGlow />
      <LucenHero />
      <LucenPanels />
      <LucenShowcase />

      {/* Footer */}
      <footer className="relative py-16 px-6 text-center">
        <p className="text-muted-foreground text-xs font-display tracking-[0.2em] uppercase">
          Lucen Interface System
        </p>
      </footer>
    </div>
  );
};

export default Index;
