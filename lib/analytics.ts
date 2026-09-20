/**
 * ARCHIVED (GA4) — preserved for educational/reference purposes, currently disabled.
 * Original minimal typed gtag wrapper kept intact below; GA4_ENABLED=false makes trackEvent a no-op.
 * No-ops when GA isn't loaded (dev, no ID, or consent declined).
 */
const GA4_ENABLED = false;

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (!GA4_ENABLED) return;
  if (typeof window === 'undefined') return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void })
    .gtag;
  if (typeof gtag !== 'function') return;
  gtag('event', name, params);
}
