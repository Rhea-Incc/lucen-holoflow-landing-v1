/**
 * Media cache service worker.
 *
 * Strategy:
 *  - Images (optimize-image function + storage objects) → stale-while-revalidate
 *  - Adaptive video segments (.ts/.m4s/.mp4/.m3u8/.mpd) → cache-first with
 *    background revalidation, honoring ETag / Last-Modified for 304s.
 *  - Everything else → bypass.
 *
 * Repeated visits replay already downloaded adaptive renditions from cache,
 * even when offline, while still revalidating with the origin in the
 * background so cache-busted assets refresh quickly.
 */

const VERSION = 'media-v1';
const IMG_CACHE = `${VERSION}-img`;
const VID_CACHE = `${VERSION}-vid`;
const MAX_IMG_ENTRIES = 240;
const MAX_VID_ENTRIES = 80;

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

function isImage(url) {
  return url.pathname.includes('/functions/v1/optimize-image')
    || /\/storage\/v1\/(object|render)\/public\/media\/.+\.(jpe?g|png|webp|avif|gif|svg)$/i.test(url.pathname);
}
function isVideo(url) {
  return /\.(m3u8|mpd|m4s|ts|mp4|webm|mov)(\?|$)/i.test(url.pathname);
}

async function trimCache(name, max) {
  const cache = await caches.open(name);
  const keys = await cache.keys();
  if (keys.length <= max) return;
  for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i]);
}

async function staleWhileRevalidate(request, cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request, { ignoreVary: true });

  const fetchAndUpdate = (async () => {
    const init = { cache: 'no-cache' };
    // Conditional revalidation using stored validators
    if (cached) {
      const headers = new Headers();
      const etag = cached.headers.get('etag');
      const lm = cached.headers.get('last-modified');
      if (etag) headers.set('If-None-Match', etag);
      if (lm) headers.set('If-Modified-Since', lm);
      init.headers = headers;
    }
    try {
      const network = await fetch(request, init);
      if (network.status === 304 && cached) return cached;
      if (network.ok && (network.type === 'basic' || network.type === 'cors' || network.type === 'default')) {
        cache.put(request, network.clone()).then(() => trimCache(cacheName, maxEntries));
      }
      return network;
    } catch (err) {
      if (cached) return cached;
      throw err;
    }
  })();

  return cached || fetchAndUpdate;
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  // Range requests (video seeking) — bypass to let the browser handle byte ranges
  if (req.headers.has('range')) return;

  let url;
  try { url = new URL(req.url); } catch { return; }

  if (isImage(url)) {
    event.respondWith(staleWhileRevalidate(req, IMG_CACHE, MAX_IMG_ENTRIES));
  } else if (isVideo(url)) {
    event.respondWith(staleWhileRevalidate(req, VID_CACHE, MAX_VID_ENTRIES));
  }
});
