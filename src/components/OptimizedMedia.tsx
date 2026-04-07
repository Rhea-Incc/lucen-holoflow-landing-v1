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
    if (imgRef.current?.complete) {
      setLoaded(true);
      return;
    }

    // Preconnect + prefetch for priority images
    if (priority) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
      return () => { document.head.removeChild(link); };
    }

    // Lazy images: use IntersectionObserver with generous rootMargin
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          img.src = src;
          observer.disconnect();
        }
      },
      { rootMargin: '500px' }
    );
    // Set a placeholder initially for non-priority
    img.removeAttribute('src');
    observer.observe(img);
    return () => observer.disconnect();
  }, [src, priority]);

  return (
    <img
      ref={imgRef}
      src={priority ? src : undefined}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onLoad={() => setLoaded(true)}
      className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      style={style}
    />
  );
}

interface OptimizedVideoProps {
  src: string;
  sources?: Array<{ src: string; media?: string; type?: string }>;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  loop?: boolean;
  onEnded?: () => void;
  poster?: string;
}

export function OptimizedVideo({ src, sources, className = '', style, priority = false, loop = true, onEnded, poster }: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      video.preload = 'auto';
      video.load();
      video.play().catch(() => {});
    };

    if (priority) {
      // Start loading immediately for hero videos
      video.preload = 'auto';
      playVideo();
    } else {
      video.preload = 'metadata'; // Load metadata so poster/dimensions are ready
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            playVideo();
            observer.disconnect();
          }
        },
        { rootMargin: '600px' } // Start loading 600px before visible
      );
      observer.observe(video);
      return () => observer.disconnect();
    }
  }, [priority, src, sources]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop={loop}
      playsInline
      poster={poster}
      preload={priority ? 'auto' : 'metadata'}
      onCanPlay={() => setLoaded(true)}
      onEnded={onEnded}
      className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      style={style}
    >
      {sources?.length
        ? sources.map((source) => (
            <source key={`${source.src}-${source.media ?? 'all'}`} src={source.src} media={source.media} type={source.type ?? 'video/mp4'} />
          ))
        : <source src={src} type="video/mp4" />}
    </video>
  );
}
