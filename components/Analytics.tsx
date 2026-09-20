'use client';

import { GoogleAnalytics } from '@next/third-parties/google';
import { useEffect, useState } from 'react';

const CONSENT_KEY = 'ga-consent';

// ARCHIVED (GA4): false disables all GA4 loading/sends while preserving code for reference.
const GA4_ENABLED = false;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * ARCHIVED (GA4) — preserved for educational/reference purposes, currently disabled.
 * GA4_ENABLED=false below prevents any GA script loading or gtag sends.
 * Original implementation kept intact for study; see NEXT_PUBLIC_GA_ID in .env.example.
 *
 * Original docs:
 * GA4 loader + first-party consent banner.
 * - Consent defaults to denied (cookieless pings only) until the visitor accepts.
 * - Nothing loads without NEXT_PUBLIC_GA_ID; the GA script itself loads in production only.
 */
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (!GA4_ENABLED || !gaId) return;
    const stored = localStorage.getItem(CONSENT_KEY);
    window.gtag?.('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: stored === 'granted' ? 'granted' : 'denied',
    });
    if (stored !== 'granted' && stored !== 'denied') {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot hydration read from localStorage on mount; cannot cascade.
      setShowBanner(true);
    }
  }, [gaId]);

  const choose = (granted: boolean) => {
    if (!GA4_ENABLED) {
      setShowBanner(false);
      return;
    }
    localStorage.setItem(CONSENT_KEY, granted ? 'granted' : 'denied');
    window.gtag?.('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
    });
    setShowBanner(false);
  };

  if (!GA4_ENABLED || !gaId) return null;

  return (
    <>
      {GA4_ENABLED && process.env.NODE_ENV === 'production' && <GoogleAnalytics gaId={gaId} />}
      {showBanner && (
        <div
          role='dialog'
          aria-live='polite'
          aria-label='Cookie consent'
          className='fixed bottom-4 inset-x-4 z-50 mx-auto max-w-lg rounded-xl border border-border bg-card p-4 shadow-2xl text-card-foreground'
        >
          <p className='text-xs sm:text-sm text-muted-foreground leading-relaxed'>
            This site uses privacy-friendly analytics to understand visits
            (page views, project clicks). No ads, no cross-site tracking.
          </p>
          <div className='mt-3 flex items-center justify-end gap-2'>
            <button
              type='button'
              onClick={() => choose(false)}
              className='rounded-md border border-border bg-secondary px-3.5 py-2 text-xs sm:text-sm font-medium text-secondary-foreground hover:bg-muted transition-colors cursor-pointer'
            >
              Decline
            </button>
            <button
              type='button'
              onClick={() => choose(true)}
              className='rounded-md bg-primary px-3.5 py-2 text-xs sm:text-sm font-medium text-primary-foreground hover:brightness-105 transition-all cursor-pointer'
            >
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
}
