/**
 * Minimal typed wrapper over gtag for portfolio funnel events.
 * No-ops when GA isn't loaded (dev, no ID, or consent declined).
 */
export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (typeof window === 'undefined') return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void })
    .gtag;
  if (typeof gtag !== 'function') return;
  gtag('event', name, params);
}
