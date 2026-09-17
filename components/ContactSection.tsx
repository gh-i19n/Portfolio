'use client';

import { useState } from 'react';
import { Copy, Check, Send, Sparkles } from 'lucide-react';

interface ContactSectionProps {
  onOpenMessageModal: () => void;
}

export default function ContactSection({ onOpenMessageModal }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('kinxly@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section>
      <div className="mb-5">
        <h2 className="font-heading text-xs font-semibold tracking-wider text-foreground uppercase">
          Get in touch
        </h2>
      </div>

      <div className="space-y-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
        <p className="flex items-center flex-wrap gap-2">
          <span>You can reach me anytime at</span>
          <a
            className="group/text-link inline-flex items-center gap-1 font-medium text-foreground"
            href="mailto:kinxly@gmail.com"
          >
            <span className="relative inline-block group-hover/text-link:after:h-0.5 after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-primary after:transition-all">
              kinxly@gmail.com
            </span>
          </a>
          <button
            type="button"
            onClick={copyEmail}
            title="Copy email address"
            className="inline-flex items-center gap-1 rounded border border-border bg-secondary px-2 py-1 text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-muted transition-colors ml-1 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-emerald-500" />
                <span className="text-emerald-500 text-xs">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
              </>
            )}
          </button>
        </p>

        {/* Quick collaboration banner - Inverted theme: dark in light mode, light in dark mode */}
        <div
          style={{
            backgroundColor: 'var(--inverted-banner-bg)',
            borderColor: 'var(--inverted-banner-border)',
          }}
          className="rounded-xl border p-4 sm:p-5 text-sm shadow-md transition-colors mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-3">
            <Sparkles className="size-4.5 text-primary shrink-0 mt-0.5" />
            <div>
              <span
                style={{ color: 'var(--inverted-banner-title)' }}
                className="font-semibold"
              >
                Have an ambitious project or engineering need?
              </span>
              <p
                style={{ color: 'var(--inverted-banner-desc)' }}
                className="mt-1 text-xs sm:text-sm"
              >
                Available for full stack contracts, architecture advisory, and technical leadership.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenMessageModal}
            style={{
              backgroundColor: 'var(--inverted-banner-btn-bg)',
              color: 'var(--inverted-banner-btn-text)',
            }}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold hover:opacity-90 active:scale-98 transition-all self-start sm:self-center shrink-0 shadow-xs cursor-pointer"
          >
            <Send className="size-3.5" />
            <span>Send Quick Note</span>
          </button>
        </div>
      </div>
    </section>
  );
}
