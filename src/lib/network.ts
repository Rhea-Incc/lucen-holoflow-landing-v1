/**
 * Network/bandwidth-aware loading helpers.
 *
 * Provides a single `networkProfile()` that estimates connection tier and
 * derives sensible per-viewport download budgets, plus a quality scaling
 * multiplier so images stay sharp on fast links and shrink on slow ones.
 */

export type NetworkTier = 'slow' | 'low' | 'mid' | 'high';

export interface NetworkProfile {
  tier: NetworkTier;
  saveData: boolean;
  /** Multiplier applied to quality presets (1 = full quality). */
  qualityScale: number;
  /** Multiplier applied to requested image widths. */
  widthScale: number;
  /** Soft per-image byte budget for the current viewport. */
  maxImageBytes: number;
  /** Preferred max video vertical resolution in pixels. */
  maxVideoHeight: number;
  /** Downlink estimate in Mbps (best-effort). */
  downlinkMbps: number;
}

interface NetworkInfo {
  saveData?: boolean;
  effectiveType?: string;
  downlink?: number;
}

function readConnection(): NetworkInfo {
  if (typeof navigator === 'undefined') return {};
  const c = (navigator as Navigator & { connection?: NetworkInfo }).connection;
  return c ?? {};
}

function viewportArea(): number {
  if (typeof window === 'undefined') return 1280 * 720;
  const w = window.innerWidth || 1280;
  const h = window.innerHeight || 720;
  return w * h;
}

export function networkProfile(): NetworkProfile {
  const conn = readConnection();
  const saveData = !!conn.saveData;
  const et = conn.effectiveType || '4g';
  const downlink = typeof conn.downlink === 'number' ? conn.downlink : 10;

  let tier: NetworkTier = 'high';
  if (saveData || et === 'slow-2g' || et === '2g') tier = 'slow';
  else if (et === '3g' || downlink < 1.5) tier = 'low';
  else if (downlink < 5) tier = 'mid';

  const matrix: Record<NetworkTier, Omit<NetworkProfile, 'tier' | 'saveData' | 'downlinkMbps'>> = {
    slow: { qualityScale: 0.65, widthScale: 0.55, maxImageBytes: 60_000, maxVideoHeight: 360 },
    low: { qualityScale: 0.78, widthScale: 0.7, maxImageBytes: 140_000, maxVideoHeight: 540 },
    mid: { qualityScale: 0.92, widthScale: 0.9, maxImageBytes: 320_000, maxVideoHeight: 720 },
    high: { qualityScale: 1, widthScale: 1, maxImageBytes: 900_000, maxVideoHeight: 1080 },
  };

  // Scale image budget by viewport area so larger screens get more headroom.
  const areaFactor = Math.min(2.5, Math.max(0.5, viewportArea() / (1280 * 720)));
  const base = matrix[tier];

  return {
    tier,
    saveData,
    downlinkMbps: downlink,
    ...base,
    maxImageBytes: Math.round(base.maxImageBytes * areaFactor),
  };
}

/** Clamp a requested width against the profile's width scale and a hard max. */
export function clampWidth(width: number, profile: NetworkProfile, hardMax = 2560): number {
  return Math.min(hardMax, Math.max(160, Math.round(width * profile.widthScale)));
}

/** Clamp a quality preset by the profile's quality scale (kept within 35..98). */
export function clampQuality(quality: number, profile: NetworkProfile): number {
  return Math.min(98, Math.max(35, Math.round(quality * profile.qualityScale)));
}
