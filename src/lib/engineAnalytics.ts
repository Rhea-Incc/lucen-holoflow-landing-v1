import { supabase } from '@/integrations/supabase/client';

const SESSION_KEY = 'lucen_engine_session';

function getSessionId(): string {
  if (typeof window === 'undefined') return 'ssr';
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = (crypto.randomUUID?.() ?? `s_${Date.now()}_${Math.random().toString(36).slice(2)}`);
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return 'no-session';
  }
}

export type EngineEvent = {
  event_type: 'cta_click' | 'conversion' | 'page_view';
  integration_slug?: string | null;
  source?: string | null;
  metadata?: Record<string, unknown> | null;
};

export async function trackEngineEvent(evt: EngineEvent): Promise<void> {
  if (typeof window === 'undefined') return;
  const payload = {
    event_type: evt.event_type,
    integration_slug: evt.integration_slug ?? null,
    source: evt.source ?? null,
    path: window.location.pathname + window.location.search,
    referrer: document.referrer || null,
    user_agent: navigator.userAgent,
    session_id: getSessionId(),
    metadata: (evt.metadata ?? null) as never,
  };
  // Fire-and-forget; do not block UI.
  void supabase.from('engine_events').insert(payload).then(({ error }) => {
    if (error && import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn('[engine] track failed', error.message);
    }
  });
}
