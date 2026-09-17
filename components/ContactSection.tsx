'use client';

import { useState } from 'react';
import { Copy, Check, Calendar, MessageSquare, Send, Sparkles } from 'lucide-react';

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
                <span className="text-xs">Copy</span>
              </>
            )}
          </button>
        </p>

        <p className="flex items-center flex-wrap gap-2">
          <span>Or schedule a strategic session on</span>
          <button
            type="button"
            onClick={onOpenMessageModal}
            className="group/text-link inline-flex items-center gap-1 font-medium text-foreground cursor-pointer"
          >
            <span className="relative inline-block group-hover/text-link:after:h-0.5 after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-primary after:transition-all">
              Cal.com / Instant Message
            </span>
          </button>
        </p>

        {/* Quick collaboration banner */}
        <div className="rounded-lg border border-border/80 bg-card/60 p-4 sm:p-5 text-sm text-muted-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
          <div className="flex items-start gap-3">
            <Sparkles className="size-4.5 text-primary shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-foreground">Have an ambitious project or engineering need?</span>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground">Available for full stack contracts, architecture advisory, and technical leadership.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenMessageModal}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-3.5 py-2 text-xs sm:text-sm font-medium text-primary-foreground hover:brightness-105 transition-all self-start sm:self-center shrink-0 shadow-xs cursor-pointer"
          >
            <Send className="size-3.5" />
            <span>Send Quick Note</span>
          </button>
        </div>
      </div>
    </section>
  );
}
