import { lazy, Suspense } from 'react';
import ParticleField from '@/components/ParticleField';
import CursorGlow from '@/components/CursorGlow';
import LucenHeader from '@/components/LucenHeader';
import LucenHero from '@/components/LucenHero';

const LucenDefinition = lazy(() => import('@/components/LucenDefinition'));
const LucenOfferings = lazy(() => import('@/components/LucenOfferings'));
const LucenPipeline = lazy(() => import('@/components/LucenPipeline'));
const LucenIndustries = lazy(() => import('@/components/LucenIndustries'));
const LucenUseCases = lazy(() => import('@/components/LucenUseCases'));
const LucenBusinessModels = lazy(() => import('@/components/LucenBusinessModels'));
const LucenNetwork = lazy(() => import('@/components/LucenNetwork'));
const LucenBrain = lazy(() => import('@/components/LucenBrain'));
const LucenPartners = lazy(() => import('@/components/LucenPartners'));
const LucenClosing = lazy(() => import('@/components/LucenClosing'));

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <ParticleField />
      <CursorGlow />
      <LucenHeader />
      <LucenHero />
      <Suspense fallback={null}>
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
      </Suspense>

      <footer className="relative py-16 px-6 text-center">
        <p className="text-muted-foreground text-xs font-display tracking-[0.2em] uppercase">
          Lucen Interface System
        </p>
      </footer>
    </div>
  );
};

export default Index;
