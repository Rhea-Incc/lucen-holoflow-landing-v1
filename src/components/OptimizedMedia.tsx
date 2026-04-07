import { useState, useRef, useEffect } from 'react';
import { cdnUrl } from '@/lib/media';

/** Resolve a media path: if it starts with /media/, use CDN; otherwise pass through */
function resolveUrl(src: string): string {
  if (src.startsWith('/media/')) return cdnUrl(src);
  return src;
}

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
}

export function OptimizedImage({ src, alt, className = '', style, priority = false }: OptimizedImageProps) {
  const resolvedSrc = resolveUrl(src);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
      return;
    }

    if (priority) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = resolvedSrc;
      document.head.appendChild(link);
      return () => { document.head.removeChild(link); };
    }

    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          img.src = resolvedSrc;
          observer.disconnect();
        }
      },
      { rootMargin: '500px' }
    );
    img.removeAttribute('src');
    observer.observe(img);
    return () => observer.disconnect();
  }, [resolvedSrc, priority]);

  return (
    <img
      ref={imgRef}
      src={priority ? resolvedSrc : undefined}
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

  const resolvedSrc = resolveUrl(src);
  const resolvedSources = sources?.map(s => ({ ...s, src: resolveUrl(s.src) }));
  const resolvedPoster = poster ? resolveUrl(poster) : undefined;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      video.preload = 'auto';
      video.load();
      video.play().catch(() => {});
    };

    if (priority) {
      video.preload = 'auto';
      playVideo();
    } else {
      video.preload = 'metadata';
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            playVideo();
            observer.disconnect();
          }
        },
        { rootMargin: '600px' }
      );
      observer.observe(video);
      return () => observer.disconnect();
    }
  }, [priority, resolvedSrc, resolvedSources]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop={loop}
      playsInline
      poster={resolvedPoster}
      preload={priority ? 'auto' : 'metadata'}
      onCanPlay={() => setLoaded(true)}
      onEnded={onEnded}
      className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      style={style}
    >
      {resolvedSources?.length
        ? resolvedSources.map((source) => (
            <source key={`${source.src}-${source.media ?? 'all'}`} src={source.src} media={source.media} type={source.type ?? 'video/mp4'} />
          ))
        : <source src={resolvedSrc} type="video/mp4" />}
    </video>
  );
}
