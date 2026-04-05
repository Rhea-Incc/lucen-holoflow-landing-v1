import ParticleField from '@/components/ParticleField';
import CursorGlow from '@/components/CursorGlow';
import LucenHeader from '@/components/LucenHeader';
import LucenHero from '@/components/LucenHero';
import LucenDefinition from '@/components/LucenDefinition';
import LucenOfferings from '@/components/LucenOfferings';
import LucenPipeline from '@/components/LucenPipeline';
import LucenIndustries from '@/components/LucenIndustries';
import LucenUseCases from '@/components/LucenUseCases';
import LucenBusinessModels from '@/components/LucenBusinessModels';
import LucenNetwork from '@/components/LucenNetwork';
import LucenBrain from '@/components/LucenBrain';
import LucenPartners from '@/components/LucenPartners';
import LucenClosing from '@/components/LucenClosing';

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <ParticleField />
      <CursorGlow />
      <LucenHeader />
      <LucenHero />
      <LucenDefinition />
      <LucenOfferings />
      <LucenPipeline />
      <LucenIndustries />
      <LucenUseCases />
      <LucenBusinessModels />
      <LucenNetwork />
      <LucenBrain />
      <LucenPartners />
      <LucenClosing />

      <footer className="relative py-16 px-6 text-center">
        <p className="text-muted-foreground text-xs font-display tracking-[0.2em] uppercase">
          Lucen Interface System
        </p>
      </footer>
    </div>
  );
};

export default Index;
