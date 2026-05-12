import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OptimizedImage, OptimizedVideo } from './OptimizedMedia';

interface MediaGalleryProps {
  images: string[];
  videos: string[];
  title: string;
}

export default function MediaGallery({ images, videos, title }: MediaGalleryProps) {
  const allMedia = [
    ...videos.map((src) => ({ type: 'video' as const, src })),
    ...images.map((src) => ({ type: 'image' as const, src })),
  ];
  const [current, setCurrent] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const next = useCallback(() => setCurrent((p) => (p + 1) % allMedia.length), [allMedia.length]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + allMedia.length) % allMedia.length), [allMedia.length]);

  // For images, auto-advance after 6s. For videos, advance when video ends.
  useEffect(() => {
    if (allMedia.length <= 1) return;
    const item = allMedia[current];
    if (item.type === 'video') {
      // Video: listen for ended event (handled via onEnded prop)
      return;
    }
    const timer = setTimeout(next, 5000);
    return () => clearTimeout(timer);
  }, [next, allMedia.length, current, allMedia]);

  if (allMedia.length === 0) return null;

  const item = allMedia[current];

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-black/60">
      {/*
        Per-breakpoint aspect ratios keep immersive displays oriented correctly:
          mobile  → 4/3  (taller, avoids letterbox bars on portrait viewports)
          tablet  → 3/2  (balanced cinematic crop)
          desktop → 16/9 (full immersive widescreen)
        `object-contain` + a max-scale cap on the inner <img>/<video> guarantees
        we never upscale past the source resolution (sharpness-safe threshold).
      */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] lg:aspect-[16/9] xl:aspect-[16/9] 2xl:aspect-[21/9]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {item.type === 'video' ? (
              <OptimizedVideo
                src={item.src}
                className="max-w-full max-h-full w-auto h-auto object-contain"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                priority
                loop={allMedia.length <= 1}
                onEnded={allMedia.length > 1 ? next : undefined}
              />
            ) : (
              <OptimizedImage
                src={item.src}
                alt={title}
                className="max-w-full max-h-full w-auto h-auto [&_img]:object-contain [&_img]:max-w-full [&_img]:max-h-full [&_img]:w-auto [&_img]:h-auto"
                priority
              />
            )}
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
      </div>

      {allMedia.length > 1 && (
        <>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {allMedia.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-primary w-6' : 'bg-foreground/30'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
