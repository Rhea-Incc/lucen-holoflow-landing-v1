import { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
}

export function OptimizedImage({ src, alt, className = '', style, priority = false }: OptimizedImageProps) {
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
      onLoad={() => setLoaded(true)}
      className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      style={style}
    />
  );
}

interface OptimizedVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  loop?: boolean;
  onEnded?: () => void;
}

export function OptimizedVideo({ src, className = '', style, priority = false }: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    if (priority) {
      video.preload = 'auto';
    } else {
      video.preload = 'metadata';
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            video.preload = 'auto';
            video.play().catch(() => {});
            observer.disconnect();
          }
        },
        { rootMargin: '200px' }
      );
      observer.observe(video);
      return () => observer.disconnect();
    }
  }, [priority]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      onCanPlay={() => setLoaded(true)}
      className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      style={style}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
