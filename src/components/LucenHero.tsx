import { useRef, useEffect, useState } from 'react';

export default function LucenHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.preload = 'auto';
    // Force immediate load & play
    const tryPlay = () => {
      v.play().catch(() => {});
      setReady(true);
    };
    if (v.readyState >= 3) {
      tryPlay();
    } else {
      v.addEventListener('canplay', tryPlay, { once: true });
      v.load();
    }
    return () => v.removeEventListener('canplay', tryPlay);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`w-full h-full object-cover transition-opacity duration-300 ${ready ? 'opacity-100' : 'opacity-0'}`}
          style={{ filter: 'brightness(0.7) saturate(1.2)' }}
        >
          <source src="/media/desktop091224.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 40%, hsl(192 95% 60% / 0.08) 0%, transparent 70%),
              radial-gradient(ellipse 50% 40% at 30% 60%, hsl(260 80% 65% / 0.06) 0%, transparent 60%),
              linear-gradient(180deg, transparent 60%, hsl(var(--background)) 100%)
            `,
          }}
        />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-20" />
    </section>
  );
}
