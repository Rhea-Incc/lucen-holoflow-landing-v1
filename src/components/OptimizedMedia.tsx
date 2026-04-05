import { useState, useRef, useEffect, memo } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
}

export const OptimizedImage = memo(function OptimizedImage({ src, alt, className = '', style, priority = false }: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onLoad={() => setLoaded(true)}
      className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      style={{ ...style, willChange: 'opacity' }}
    />
  );
});

interface OptimizedVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  loop?: boolean;
  onEnded?: () => void;
}

export const OptimizedVideo = memo(function OptimizedVideo({ src, className = '', style, priority = false, loop = true, onEnded }: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (priority) {
      video.preload = 'auto';
      video.play().catch(() => {});
    } else {
      video.preload = 'none';
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            video.preload = 'auto';
            video.play().catch(() => {});
            observer.disconnect();
          } else {
            video.pause();
          }
        },
        { rootMargin: '300px' }
      );
      observer.observe(video);
      return () => observer.disconnect();
    }
  }, [priority]);

  return (
    <video
      ref={videoRef}
      autoPlay={priority}
      muted
      loop={loop}
      playsInline
      onCanPlayThrough={() => setLoaded(true)}
      onEnded={onEnded}
      className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      style={{ ...style, willChange: 'opacity' }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
});
