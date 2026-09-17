'use client';

import { X, ExternalLink, Check, Layers, Sparkles, Shield, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface ProjectItem {
  id: string;
  title: string;
  url: string;
  displayUrl: string;
  role: string;
  status: string;
  statusVariant: 'emerald' | 'amber' | 'blue' | 'purple' | 'zinc';
  logoText: string;
  logoStyle: string;
  statusDotColor: string;
  isInDevelopment?: boolean;
  summary: string;
  category: string;
  architectureOverview: string;
  engineeringFeats: string[];
  stack: string[];
  metrics: string;
}

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-2xl text-card-foreground max-h-[90vh] flex flex-col"
        >
          {/* Header with generous spacing */}
          <div className="flex items-start justify-between gap-4 pb-5 border-b border-border/70 shrink-0">
            <div className="flex items-start gap-3.5 sm:gap-4 min-w-0">
              <div
                className={`shrink-0 size-11 rounded-xl border flex items-center justify-center font-mono text-sm font-bold tracking-tight select-none shadow-2xs mt-0.5 ${project.logoStyle}`}
              >
                {project.logoText}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                  <h3 className="font-heading text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
                    {project.title}
                  </h3>
                  <span className="inline-flex items-center rounded-md border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary font-mono">
                    {project.role}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-secondary/70 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    <span className={`size-1.5 rounded-full ${project.statusDotColor}`} />
                    <span>{project.status}</span>
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-mono text-muted-foreground/80">
                  {project.category} <span className="text-muted-foreground/40">•</span> {project.displayUrl}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer shrink-0 -mr-1 -mt-1"
              aria-label="Close modal"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Body: Accessible typography with comfortable reading scale */}
          <div className="py-6 space-y-6 sm:space-y-7 overflow-y-auto pr-1 flex-1">
            {/* Architecture Overview */}
            <div>
              <h4 className="text-xs uppercase font-semibold tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
                <Layers className="size-4 text-primary" />
                <span>Architecture &amp; System Purpose</span>
              </h4>
              <p className="text-sm sm:text-[14.5px] text-foreground/90 leading-relaxed max-w-prose">
                {project.architectureOverview}
              </p>
            </div>

            {/* Key Engineering Highlights */}
            <div>
              <h4 className="text-xs uppercase font-semibold tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />
                <span>Key Engineering Highlights</span>
              </h4>
              <ul className="space-y-2.5">
                {project.engineeringFeats.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                    <Check className="size-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Metrics & Scale */}
            {project.metrics && (
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/90 flex items-start gap-2.5">
                <span className="font-semibold text-primary shrink-0">Scale &amp; Impact:</span>
                <span className="text-muted-foreground">{project.metrics}</span>
              </div>
            )}

            {/* Technical Stack */}
            <div>
              <h4 className="text-xs uppercase font-semibold tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                <Cpu className="size-4 text-primary" />
                <span>Technical Stack &amp; Infrastructure</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center rounded-md border border-border/80 bg-secondary/60 px-2.5 py-1 text-xs sm:text-[13px] text-foreground/90 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions with generous padding */}
          <div className="flex items-center justify-between gap-3 pt-5 border-t border-border/70 shrink-0">
            {project.isInDevelopment ? (
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-amber-600 dark:text-amber-400">
                <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
                <span>Private Beta / In Active Development</span>
              </div>
            ) : (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs sm:text-sm font-medium text-primary-foreground hover:brightness-105 transition-all shadow-xs cursor-pointer"
              >
                <span>Visit Live Platform</span>
                <ExternalLink className="size-3.5" />
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border bg-secondary/80 px-4 py-2 text-xs sm:text-sm font-medium text-secondary-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
