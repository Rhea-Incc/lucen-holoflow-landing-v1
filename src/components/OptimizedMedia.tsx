import { useState, useRef, useEffect } from 'react';
import { cdnUrl, optimizedImageUrl, isImagePath, buildSrcSetFor, avifReady, effectiveDpr } from '@/lib/media';

const RESPONSIVE_WIDTHS = [320, 480, 640, 828, 1080, 1280, 1600, 1920, 2560];

function resolveUrl(src: string): string {
  return src.startsWith('/media/') ? cdnUrl(src) : src;
}

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  width?: number;
  sizes?: string;
}

export function OptimizedImage({
  src, alt, className = '', style, priority = false, width, sizes,
}: OptimizedImageProps) {
  const isCloudImage = src.startsWith('/media/') && isImagePath(src);
  const [, force] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(priority);
  const containerRef = useRef<HTMLDivElement>(null);

  // Re-render once AVIF support is known so we pick the optimal format
  useEffect(() => { avifReady.then(() => force((n) => n + 1)); }, []);

  // Lazy-load via IntersectionObserver (with native fallback)
  useEffect(() => {
    if (priority || inView) return;
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setInView(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { rootMargin: '800px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [priority, inView]);

  const defaultSizes = sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
  const dpr = effectiveDpr();
  const fallbackWidth = Math.min(2560, (width || 1280) * dpr);
  const fallbackSrc = isCloudImage
    ? optimizedImageUrl(src, { width: fallbackWidth, format: 'jpeg' })
    : resolveUrl(src);
  const avifSet = isCloudImage ? buildSrcSetFor(src, RESPONSIVE_WIDTHS, 'avif') : undefined;
  const webpSet = isCloudImage ? buildSrcSetFor(src, RESPONSIVE_WIDTHS, 'webp') : undefined;
  const jpegSet = isCloudImage ? buildSrcSetFor(src, RESPONSIVE_WIDTHS, 'jpeg') : undefined;

  // Preload hint for priority images
  useEffect(() => {
    if (!priority) return;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = fallbackSrc;
    if (webpSet) {
      link.setAttribute('imagesrcset', webpSet);
      link.setAttribute('imagesizes', defaultSizes);
      link.setAttribute('type', 'image/webp');
    }
    link.setAttribute('fetchpriority', 'high');
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, [fallbackSrc, priority, webpSet, defaultSizes]);

  return (
    <div ref={containerRef} className={className} style={style}>
      {inView && (
        isCloudImage ? (
          <picture>
            {avifSet && <source type="image/avif" srcSet={avifSet} sizes={defaultSizes} />}
            {webpSet && <source type="image/webp" srcSet={webpSet} sizes={defaultSizes} />}
            <img
              src={fallbackSrc}
              srcSet={jpegSet}
              sizes={defaultSizes}
              alt={alt}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={priority ? 'high' : 'auto'}
              onLoad={() => setLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </picture>
        ) : (
          <img
            src={fallbackSrc}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={() => setLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        )
      )}
    </div>
  );
}

interface VideoSource {
  src: string;
  media?: string;
  type?: string;
  /** Optional vertical resolution (e.g. 720) for ABR ladder selection. */
  height?: number;
  /** Optional bitrate in kbps for ABR ladder selection. */
  bitrateKbps?: number;
}

interface OptimizedVideoProps {
  src: string;
  /** Progressive sources or an ABR ladder. Pass a `.m3u8` (HLS) or `.mpd` (DASH) src for adaptive streaming. */
  sources?: Array<VideoSource>;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  loop?: boolean;
  onEnded?: () => void;
  poster?: string;
}

function isHls(url: string) { return /\.m3u8(\?|$)/i.test(url); }
function isDash(url: string) { return /\.mpd(\?|$)/i.test(url); }

/** Pick the best progressive rendition that fits the active network profile. */
function pickRendition(sources: VideoSource[], maxHeight: number): VideoSource {
  const ranked = [...sources].sort((a, b) => (a.height ?? 0) - (b.height ?? 0));
  const fit = ranked.filter((s) => (s.height ?? Infinity) <= maxHeight);
  return (fit[fit.length - 1] ?? ranked[0]);
}

export function OptimizedVideo({
  src, sources, className = '', style, priority = false, loop = true, onEnded, poster,
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  const resolvedSrc = resolveUrl(src);
  const resolvedSources = sources?.map((s) => ({ ...s, src: resolveUrl(s.src) }));
  const resolvedPoster = poster ? resolveUrl(poster) : undefined;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Honor data-saver / reduced-motion → don't autoplay heavy video
    const reduced = typeof window !== 'undefined'
      && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string; downlink?: number } }).connection;
    const saveData = conn?.saveData;
    const lowBandwidth = saveData || /(^|-)2g$/.test(conn?.effectiveType || '');

    // Lazy-import network profile so we keep tree-shaking friendly
    let hlsInstance: { destroy: () => void } | null = null;

    const startLoad = async () => {
      const { networkProfile } = await import('@/lib/network');
      const profile = networkProfile();
      const adaptiveSrc = [resolvedSrc, ...(resolvedSources?.map((s) => s.src) ?? [])]
        .find((u) => isHls(u) || isDash(u));

      // 1. Adaptive bitrate (HLS/DASH) — highest fidelity at lowest sustainable bitrate
      if (adaptiveSrc && isHls(adaptiveSrc)) {
        if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = adaptiveSrc; // Safari native HLS
        } else {
          const Hls = (await import('hls.js')).default;
          if (Hls.isSupported()) {
            const hls = new Hls({
              capLevelToPlayerSize: true,
              maxMaxBufferLength: 30,
              startLevel: -1, // auto
              abrEwmaDefaultEstimate: (profile.downlinkMbps || 5) * 1_000_000,
            });
            hls.loadSource(adaptiveSrc);
            hls.attachMedia(video);
            hlsInstance = hls;
          } else if (resolvedSources?.length) {
            const pick = pickRendition(resolvedSources, profile.maxVideoHeight);
            video.src = pick.src;
          }
        }
      } else if (resolvedSources?.length && resolvedSources.some((s) => s.height)) {
        // 2. ABR ladder of progressive MP4s — pick a rendition matching network
        const pick = pickRendition(resolvedSources, profile.maxVideoHeight);
        video.src = pick.src;
      } // else: leave declarative <source> children as-is

      video.preload = 'auto';
      video.load();
      if (!reduced) video.play().catch(() => {});
    };

    if (priority && !lowBandwidth) {
      startLoad();
      return () => { hlsInstance?.destroy(); };
    }

    video.preload = 'none';
    if (lowBandwidth) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { startLoad(); observer.disconnect(); } },
      { rootMargin: '600px 0px' },
    );
    observer.observe(video);
    return () => { observer.disconnect(); hlsInstance?.destroy(); };
  }, [priority, resolvedSrc]);

  // Skip declarative sources when caller provided an HLS/DASH or ABR ladder
  // (we set `video.src` imperatively above to avoid double-loading).
  const hasAdaptive = !!resolvedSources?.some((s) => isHls(s.src) || isDash(s.src) || s.height)
    || isHls(resolvedSrc) || isDash(resolvedSrc);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop={loop}
      playsInline
      poster={resolvedPoster}
      preload={priority ? 'auto' : 'none'}
      onCanPlay={() => setLoaded(true)}
      onEnded={onEnded}
      className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      style={style}
    >
      {hasAdaptive ? null : resolvedSources?.length
        ? resolvedSources.map((source) => (
            <source key={`${source.src}-${source.media ?? 'all'}`} src={source.src} media={source.media} type={source.type ?? 'video/mp4'} />
          ))
        : <source src={resolvedSrc} type="video/mp4" />}
    </video>
  );
}

