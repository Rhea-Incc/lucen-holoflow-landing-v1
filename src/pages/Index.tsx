import ParticleField from '@/components/ParticleField';
import CursorGlow from '@/components/CursorGlow';
import LucenHeader from '@/components/LucenHeader';
import LucenHero from '@/components/LucenHero';
import LucenDefinition from '@/components/LucenDefinition';
import LucenOfferings from '@/components/LucenOfferings';
import LucenPipeline from '@/components/LucenPipeline';
import LucenIndustries from '@/components/LucenIndustries';
import LucenUseCases from '@/components/LucenUseCases';
import LucenMediaGallery from '@/components/LucenMediaGallery';
import LucenBusinessModels from '@/components/LucenBusinessModels';
import LucenNetwork from '@/components/LucenNetwork';
import LucenBrain from '@/components/LucenBrain';
import LucenPartners from '@/components/LucenPartners';
import LucenClosing from '@/components/LucenClosing';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollSection from '@/components/ScrollSection';

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <ParticleField />
      <CursorGlow />
      <LucenHeader />
      <WhatsAppButton />
      <LucenHero />

      <ScrollSection y={100} delay={0}>
        <LucenDefinition />
      </ScrollSection>

      <ScrollSection y={80} delay={0.05}>
        <LucenOfferings />
      </ScrollSection>

      <ScrollSection y={90} delay={0}>
        <LucenPipeline />
      </ScrollSection>

      <ScrollSection y={80} delay={0.05}>
        <LucenIndustries />
      </ScrollSection>

      <ScrollSection y={70}>
        <LucenUseCases />
      </ScrollSection>

      <ScrollSection y={60} scale={0.95}>
        <LucenMediaGallery />
      </ScrollSection>

      <ScrollSection y={80}>
        <LucenBusinessModels />
      </ScrollSection>

      <ScrollSection y={90}>
        <LucenNetwork />
      </ScrollSection>

      <ScrollSection y={80} scale={0.97}>
        <LucenBrain />
      </ScrollSection>

      <ScrollSection y={60}>
        <LucenPartners />
      </ScrollSection>

      <ScrollSection y={100}>
        <LucenClosing />
      </ScrollSection>

      <footer className="relative py-16 px-6 text-center">
        <p className="text-muted-foreground text-xs font-display tracking-[0.2em] uppercase">
          Lucen Interface System
        </p>
      </footer>
    </div>
  );
};

export default Index;
