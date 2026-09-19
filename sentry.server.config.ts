import * as Sentry from '@sentry/nextjs';

// Auto-loaded by @sentry/nextjs. No DSN (or non-production) = SDK stays inert.
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0,
  enabled: process.env.NODE_ENV === 'production',
});
