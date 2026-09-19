'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Send, Mail, Check, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuickMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickMessageModal({ isOpen, onClose }: QuickMessageModalProps) {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [messageTopic, setMessageTopic] = useState('Full Stack Engineering Role');
  const [messageBody, setMessageBody] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [companyField, setCompanyField] = useState(''); // honeypot — must stay empty
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('kinxly@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleClose = () => {
    onClose();
    // Reset the success view after the close animation so reopening starts fresh.
    setTimeout(() => {
      setStatus('idle');
      setErrorMessage('');
    }, 300);
  };

  const handleSendNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setErrorMessage('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: senderName,
          email: senderEmail,
          topic: messageTopic,
          message: messageBody,
          company: companyField,
        }),
      });
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        throw new Error(data?.error || 'Could not send the message. Please try again.');
      }
      setStatus('sent');
      setSenderName('');
      setSenderEmail('');
      setMessageBody('');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Could not send the message.');
    }
  };

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-lg rounded-xl border border-border bg-card p-5 sm:p-6 shadow-2xl text-card-foreground my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-border">
            <div>
              <h3 className="font-heading text-base font-semibold text-foreground">
                Send a Message to Kingsley Solomon
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Full Stack Software Engineer • Lagos, Nigeria (UTC+1)
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Quick email banner */}
          <div className="flex items-center justify-between p-3 rounded-lg border border-border/80 bg-secondary/50 my-4 text-xs">
            <div className="flex items-center gap-2">
              <Mail className="size-3.5 text-primary shrink-0" />
              <span className="font-mono text-muted-foreground">kinxly@gmail.com</span>
            </div>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-mono cursor-pointer"
            >
              {copiedEmail ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
              <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {status === 'sent' ? (
            <div className="py-8 text-center">
              <span className="mx-auto mb-3 flex size-10 items-center justify-center rounded-full bg-emerald-500/15">
                <Check className="size-5 text-emerald-500" />
              </span>
              <p className="text-sm font-medium text-foreground">Message sent</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Thanks for reaching out — I&apos;ll get back to you shortly.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-5 inline-flex items-center rounded-md border border-border bg-secondary px-3.5 py-2 text-xs sm:text-sm font-medium text-secondary-foreground hover:bg-muted transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          ) : (
          <form onSubmit={handleSendNote} className="space-y-3.5 text-xs">
            {/* Honeypot — invisible to humans, bots fill it and get silently accepted. */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={companyField}
              onChange={(e) => setCompanyField(e.target.value)}
              className="hidden"
            />
            <div>
              <label className="block text-foreground font-medium mb-1">Your Name</label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g. Jane Doe / Engineering Manager"
                className="w-full rounded border border-border bg-background px-3 py-2 text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div>
              <label className="block text-foreground font-medium mb-1">Your Email</label>
              <input
                type="email"
                required
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="jane@company.com"
                className="w-full rounded border border-border bg-background px-3 py-2 text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <div>
              <label className="block text-foreground font-medium mb-1">Subject / Interest</label>
              <select
                value={messageTopic}
                onChange={(e) => setMessageTopic(e.target.value)}
                className="w-full rounded border border-border bg-background px-3 py-2 text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="Full Stack Engineering Role">Full Stack Engineering Opportunity</option>
                <option value="Contract / Freelance Project">Contract / Freelance Software Project</option>
                <option value="System Architecture Advisory">System Architecture &amp; Advisory</option>
                <option value="Technical Mentorship">Technical Mentorship &amp; Community</option>
                <option value="General Engineering Chat">General Engineering Inquiry</option>
              </select>
            </div>

            <div>
              <label className="block text-foreground font-medium mb-1">Message</label>
              <textarea
                rows={4}
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                placeholder="Brief details regarding the scope, tech stack, or opportunity..."
                className="w-full rounded border border-border bg-background px-3 py-2 text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border gap-3">
              {status === 'error' && (
                <p className="text-xs text-destructive">{errorMessage}</p>
              )}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="ml-auto inline-flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-2 text-xs sm:text-sm font-medium text-primary-foreground hover:brightness-105 transition-all shadow-xs cursor-pointer disabled:opacity-60 disabled:cursor-default"
              >
                <Send className="size-3.5" />
                <span>{status === 'sending' ? 'Sending…' : 'Send Note'}</span>
              </button>
            </div>
          </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body,
  );
}
