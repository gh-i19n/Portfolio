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
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-lg overflow-hidden rounded-lg border border-border bg-card p-5 sm:p-6 shadow-xl text-card-foreground max-h-[85vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-border">
            <div className="flex items-start gap-3">
              <div
                className={`shrink-0 size-9 rounded-md border flex items-center justify-center font-mono text-xs font-bold tracking-tight select-none ${project.logoStyle}`}
              >
                {project.logoText}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <span className="inline-flex items-center rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary font-mono">
                    {project.role}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-secondary/60 px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    <span className={`size-1.5 rounded-full ${project.statusDotColor}`} />
                    <span>{project.status}</span>
                  </span>
                </div>
                <p className="text-xs font-mono text-muted-foreground">
                  {project.category} • {project.displayUrl}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Body */}
          <div className="py-4 space-y-4 text-sm leading-relaxed">
            <div>
              <h4 className="text-xs uppercase font-semibold tracking-wider text-foreground mb-1.5 flex items-center gap-1.5">
                <Layers className="size-3.5 text-primary" />
                <span>Architecture &amp; System Purpose</span>
              </h4>
              <p className="text-muted-foreground">{project.architectureOverview}</p>
            </div>

            <div>
              <h4 className="text-xs uppercase font-semibold tracking-wider text-foreground mb-2 flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-primary" />
                <span>Key Engineering Highlights</span>
              </h4>
              <ul className="space-y-1.5">
                {project.engineeringFeats.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Check className="size-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {project.metrics && (
              <div className="rounded border border-primary/20 bg-primary/5 p-3 text-xs text-foreground/90">
                <span className="font-semibold text-primary">Performance &amp; Scale Metric: </span>
                {project.metrics}
              </div>
            )}

            <div>
              <h4 className="text-xs uppercase font-semibold tracking-wider text-foreground mb-2 flex items-center gap-1.5">
                <Cpu className="size-3.5 text-primary" />
                <span>Technical Stack</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center rounded border border-border bg-secondary/80 px-2 py-0.5 text-xs text-foreground font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
            {project.isInDevelopment ? (
              <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-600 dark:text-amber-400">
                <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
                <span>Private Beta / In Active Development</span>
              </div>
            ) : (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:brightness-105 transition-all shadow-xs"
              >
                <span>Visit Live Platform</span>
                <ExternalLink className="size-3.5" />
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="rounded border border-border bg-secondary px-3.5 py-1.5 text-xs font-medium text-secondary-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
