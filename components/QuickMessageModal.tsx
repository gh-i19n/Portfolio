'use client';

import { useState } from 'react';
import { X, Send, Calendar, MessageSquare, Mail, Phone, Check, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuickMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickMessageModal({ isOpen, onClose }: QuickMessageModalProps) {
  const [activeTab, setActiveTab] = useState<'message' | 'call'>('call');
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
          className="relative z-10 w-full max-w-lg rounded-lg border border-border bg-card p-5 sm:p-6 shadow-2xl text-card-foreground my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-border">
            <div>
              <h3 className="font-heading text-base font-semibold text-foreground">
                Connect with Kingsley Solomon
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Full Stack Software Engineer • Lagos, Nigeria (UTC+1)
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="flex rounded border border-border bg-secondary/50 p-1 my-4 text-xs font-medium">
            <button
              type="button"
              onClick={() => setActiveTab('call')}
              className={`flex-1 py-1.5 rounded flex items-center justify-center gap-1.5 transition-colors ${
                activeTab === 'call'
                  ? 'bg-card text-foreground shadow-xs font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Calendar className="size-3.5 text-primary" />
              <span>Schedule Call / Chat</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('message')}
              className={`flex-1 py-1.5 rounded flex items-center justify-center gap-1.5 transition-colors ${
                activeTab === 'message'
                  ? 'bg-card text-foreground shadow-xs font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <MessageSquare className="size-3.5 text-primary" />
              <span>Compose Quick Note</span>
            </button>
          </div>

          {activeTab === 'call' ? (
            <div className="space-y-4 text-xs sm:text-sm text-muted-foreground">
              <div className="rounded border border-primary/20 bg-primary/5 p-3.5">
                <h4 className="font-semibold text-foreground flex items-center gap-1.5 mb-1 text-xs">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available for Engineering Roles &amp; Consultations</span>
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  I typically respond within 12–24 hours on West Africa Time (WAT • UTC+1). Whether it&apos;s full-time engineering roles, distributed systems design, or full stack feature delivery, let&apos;s connect.
                </p>
              </div>

              {/* Direct Booking Options */}
              <div className="space-y-2">
                <a
                  href="mailto:kinxly@gmail.com?subject=Schedule%20a%20Technical%20Call%20with%20Kingsley%20Solomon"
                  className="flex items-center justify-between p-3 rounded border border-border bg-card hover:border-primary/50 transition-all group/opt"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="size-8 rounded-sm bg-muted/60 flex items-center justify-center text-primary">
                      <Mail className="size-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-foreground text-xs block">
                        Schedule via Email Request
                      </span>
                      <span className="text-[11px] text-muted-foreground font-mono">kinxly@gmail.com</span>
                    </div>
                  </div>
                  <span className="text-xs text-primary font-medium group-hover/opt:translate-x-0.5 transition-transform">
                    Send &rarr;
                  </span>
                </a>

                <a
                  href="https://wa.me/2348100792853?text=Hi%20Kingsley,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect%20regarding%20an%20engineering%20opportunity."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded border border-border bg-card hover:border-primary/50 transition-all group/opt"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="size-8 rounded-sm bg-muted/60 flex items-center justify-center text-emerald-500">
                      <Phone className="size-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-foreground text-xs block">
                        Direct WhatsApp Instant Message
                      </span>
                      <span className="text-[11px] text-muted-foreground font-mono">+234 810 079 2853</span>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-500 font-medium group-hover/opt:translate-x-0.5 transition-transform">
                    Chat &rarr;
                  </span>
                </a>
              </div>

              {/* Copy Email quick strip */}
              <div className="flex items-center justify-between pt-2 text-xs border-t border-border">
                <span className="font-mono text-muted-foreground">kinxly@gmail.com</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-mono"
                >
                  {copiedEmail ? <Check className="size-3 text-emerald-500" /> : <Copy className="size-3" />}
                  <span>{copiedEmail ? 'Copied to clipboard' : 'Copy email'}</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSendViaEmail} className="space-y-3 text-xs">
              <div>
                <label className="block text-foreground font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Jane Doe / Engineering Manager"
                  className="w-full rounded border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
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
                  className="w-full rounded border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <label className="block text-foreground font-medium mb-1">Subject / Interest</label>
                <select
                  value={messageTopic}
                  onChange={(e) => setMessageTopic(e.target.value)}
                  className="w-full rounded border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
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
                  rows={3}
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  placeholder="Brief details regarding the scope, tech stack, or opportunity..."
                  className="w-full rounded border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-[11px] text-muted-foreground">
                  Opens in your default email client
                </span>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:brightness-105 transition-all shadow-xs"
                >
                  <Send className="size-3" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
