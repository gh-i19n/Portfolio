'use client';

import { useState } from 'react';
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

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('kinxly@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSendViaEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[${messageTopic}] Inquiry from ${senderName || 'Prospective Partner'}`);
    const body = encodeURIComponent(
      `Hello Kingsley,\n\n${messageBody || "I'd like to connect regarding an engineering opportunity."}\n\nBest regards,\n${senderName}\n${senderEmail}`
    );
    window.location.href = `mailto:kinxly@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
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
              onClick={onClose}
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

          <form onSubmit={handleSendViaEmail} className="space-y-3.5 text-xs">
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

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-[11px] text-muted-foreground">
                Opens in your default email client
              </span>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-2 text-xs sm:text-sm font-medium text-primary-foreground hover:brightness-105 transition-all shadow-xs cursor-pointer"
              >
                <Send className="size-3.5" />
                <span>Send Note</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
