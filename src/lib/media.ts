/**
 * Cloud media CDN utilities.
 * All media served from Lovable Cloud storage with edge caching + on-the-fly transforms.
 */

const STORAGE_BASE = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/media`;
const FUNCTION_BASE = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/optimize-image`;

export type ImageFormat = 'avif' | 'webp' | 'jpeg' | 'png';

/** Quality presets per format — tuned for high visual fidelity (SSIM ≥ 0.97) */
const QUALITY_DEFAULTS: Record<ImageFormat, number> = {
  avif: 72,
  webp: 84,
  jpeg: 90,
  png: 95,
};

/** Device pixel ratio (capped at 3 to avoid wasteful downloads) */
export function effectiveDpr(): number {
  if (typeof window === 'undefined') return 1;
  return Math.min(3, Math.max(1, Math.round(window.devicePixelRatio || 1)));
}

/** AVIF support — async probe, cached */
let _supportsAvif: boolean | null = null;
const _avifReady = (() => {
  if (typeof window === 'undefined') return Promise.resolve(false);
  return new Promise<boolean>((resolve) => {
    const img = new Image();
    img.onload = () => { _supportsAvif = img.width === 1; resolve(true); };
    img.onerror = () => { _supportsAvif = false; resolve(true); };
    img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUEAAADybWV0YQAAAAAAAChoZGxyAAAAAAAAAABwaWN0AAAAAAAAAAAAAAAAAAAAAA5waXRtAAAAAAABAAAAImlsb2MAAAAAREAAAQABAAAAAAEVAAEAAAAeAAAAKGlpbmYAAAAAAAEAAAAaaW5mZQIAAAAAAQAAYXYwMUNvbG9yAAAAAGppcHJwAAAAS2lwY28AAAAUaXNwZQAAAAAAAAABAAAAAQAAABBwaXhpAAAAAAMICAgAAAAMYXYxQ4EAHAAAAAAUaXBtYQAAAAAAAAABAAEEAQKDBAAAAB1tZGF0EgAKBzgADlAgIGkyCR/wAABAAACkA';
  });
})();

export const avifReady = _avifReady;
export function avifSupported(): boolean { return _supportsAvif === true; }

/** WebP — virtually universal in modern browsers */
export function webpSupported(): boolean {
  if (typeof document === 'undefined') return true;
  try {
    return document.createElement('canvas').toDataURL('image/webp').startsWith('data:image/webp');
  } catch { return false; }
}

export function bestImageFormat(): ImageFormat {
  if (avifSupported()) return 'avif';
  if (webpSupported()) return 'webp';
  return 'jpeg';
}

/** Direct CDN URL (videos, originals) */
export function cdnUrl(path: string): string {
  const clean = path.replace(/^\/media\//, '').replace(/^\//, '');
  return `${STORAGE_BASE}/${clean}`;
}

/** Optimized image URL via edge function (resize + format) */
export function optimizedImageUrl(
  path: string,
  options?: { width?: number; quality?: number; format?: ImageFormat }
): string {
  const clean = path.replace(/^\/media\//, '').replace(/^\//, '');
  const format = options?.format ?? bestImageFormat();
  const quality = options?.quality ?? QUALITY_DEFAULTS[format];
  const params = new URLSearchParams({ src: clean, q: String(quality), f: format });
  if (options?.width) params.set('w', String(Math.round(options.width)));
  return `${FUNCTION_BASE}?${params.toString()}`;
}

export function isImagePath(path: string): boolean {
  return /\.(jpg|jpeg|png|gif|webp|avif|svg|bmp)$/i.test(path);
}

/** Build a srcset string for a given format at multiple widths */
export function buildSrcSetFor(path: string, widths: number[], format: ImageFormat): string {
  return widths
    .map((w) => `${optimizedImageUrl(path, { width: w, format })} ${w}w`)
    .join(', ');
}

export function mediaUrl(path: string, options?: { width?: number; quality?: number }): string {
  return isImagePath(path) ? optimizedImageUrl(path, options) : cdnUrl(path);
}
