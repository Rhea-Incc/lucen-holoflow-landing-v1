/**
 * Cloud media CDN utilities.
 * All media served from Lovable Cloud storage with edge caching.
 */

const STORAGE_BASE = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/media`;
const FUNCTION_BASE = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/optimize-image`;

/**
 * Get a CDN URL for a media file in cloud storage.
 * For videos, returns direct storage URL.
 * For images, returns optimized URL via edge function.
 */
export function cdnUrl(path: string): string {
  // Strip leading /media/ or / if present
  const clean = path.replace(/^\/media\//, '').replace(/^\//, '');
  return `${STORAGE_BASE}/${clean}`;
}

/**
 * Get an optimized image URL via the edge function.
 * Supports on-the-fly resize and format conversion.
 */
export function optimizedImageUrl(
  path: string,
  options?: { width?: number; quality?: number; format?: 'webp' | 'avif' | 'jpeg' | 'png' }
): string {
  const clean = path.replace(/^\/media\//, '').replace(/^\//, '');
  const params = new URLSearchParams({ src: clean });
  if (options?.width) params.set('w', String(options.width));
  if (options?.quality) params.set('q', String(options.quality));
  if (options?.format) params.set('f', options.format);
  return `${FUNCTION_BASE}?${params.toString()}`;
}

/**
 * Convert a local /media/ path to CDN URL.
 * Detects if it's an image or video and returns appropriate URL.
 */
export function mediaUrl(path: string): string {
  return cdnUrl(path);
}
