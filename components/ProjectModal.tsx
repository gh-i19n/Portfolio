'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  X,
  ExternalLink,
  Check,
  Layers,
  Sparkles,
  Cpu,
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { trackEvent } from '@/lib/analytics'
import Image from 'next/image';

export interface ProjectItem {
  id: string
  title: string
  url: string
  displayUrl: string
  role: string
  status: string
  statusVariant: 'emerald' | 'amber' | 'blue' | 'purple' | 'zinc'
  logoText: string | any // Accepts string or imported image
  logoStyle: string
  statusDotColor: string
  isInDevelopment?: boolean
  summary: string
  category: string
  architectureOverview: string
  engineeringFeats: string[]
  stack: string[]
  metrics: string
}

interface ProjectModalProps {
  project: ProjectItem | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [project, onClose])

  if (!project) return null
  // Portals need document.body, which doesn't exist during prerender.
  if (typeof document === 'undefined') return null

  // Portaled to document.body so the dialog escapes the page container's
  // stacking context and always renders above the sticky header.
  return createPortal(
    <AnimatePresence>
      {project && (
        <div className='fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-6 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:pb-6'>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className='fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity'
          />

          {/* Modal Dialog */}
          <motion.div
            key={project.id}
            role='dialog'
            aria-modal='true'
            aria-label={project.title}
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className='relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-border/80 bg-card p-5 sm:p-8 shadow-2xl text-card-foreground max-h-[92dvh] sm:max-h-[90vh] flex flex-col'
          >
            {/* Header — compact on mobile, generous on desktop */}
            <div className='flex items-start gap-3 sm:gap-4 pb-4 sm:pb-5 border-b border-border/70 shrink-0'>
              <div className='flex items-start gap-2.5 sm:gap-4 min-w-0 flex-1'>
                <div
                  className={`shrink-0 size-11 sm:size-14 rounded-full border flex items-center justify-center font-mono text-sm font-bold tracking-tight select-none shadow-2xs mt-0.5 ${project.logoStyle}`}
                >
                  {project.logoText && (
                    <Image
                      alt={project.title}
                      src={project.logoText}
                      width={200}
                      height={200}
                      priority
                      className='size-full rounded-full object-cover'
                      referrerPolicy='no-referrer'
                    />
                  )}
                </div>
                <div className='min-w-0 flex-1'>
                  <h3 className='font-heading text-lg sm:text-2xl font-semibold text-foreground tracking-tight leading-tight text-balance'>
                    {project.title}
                  </h3>
                  <div className='flex items-center gap-1.5 sm:gap-2.5 mt-1.5 flex-wrap'>
                    <span className='inline-flex items-center rounded-md border border-primary/25 bg-primary/10 px-2 py-0.5 text-[11px] sm:px-2.5 sm:text-xs font-medium text-primary font-mono whitespace-nowrap'>
                      {project.role}
                    </span>
                    <span className='inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-secondary/70 px-2 py-0.5 text-[11px] sm:px-2.5 sm:text-xs font-medium text-muted-foreground whitespace-nowrap'>
                      <span
                        className={`size-1.5 rounded-full shrink-0 ${project.statusDotColor}`}
                      />
                      <span>{project.status}</span>
                    </span>
                  </div>
                  <p className='text-[11px] sm:text-sm font-mono text-muted-foreground/80 leading-relaxed break-words mt-1.5'>
                    {project.category}{' '}
                    <span className='text-muted-foreground/40'>•</span>{' '}
                    <span className='break-all'>{project.displayUrl}</span>
                  </p>
                </div>
              </div>
              <button
                type='button'
                onClick={onClose}
                className='rounded-full p-2.5 text-muted-foreground hover:bg-muted hover:text-foreground active:scale-95 transition-all cursor-pointer shrink-0 -mr-2 -mt-2 min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation'
                aria-label='Close modal'
              >
                <X className='size-5' />
              </button>
            </div>

            {/* Body — relaxed rhythm, no clipped text */}
            <div className='py-5 sm:py-6 space-y-5 sm:space-y-7 overflow-y-auto overscroll-contain flex-1 min-h-0 pr-0.5'>
              {/* Architecture Overview */}
              <div>
                <h4 className='text-[11px] sm:text-xs uppercase font-semibold tracking-wider text-muted-foreground mb-2 sm:mb-2.5 flex items-center gap-2'>
                  <Layers className='size-4 text-primary shrink-0' />
                  <span>Architecture &amp; System Purpose</span>
                </h4>
                <p className='text-[13.5px] sm:text-[14.5px] text-foreground/90 leading-[1.7] text-pretty break-words'>
                  {project.architectureOverview}
                </p>
              </div>

              {/* Key Engineering Highlights */}
              <div>
                <h4 className='text-[11px] sm:text-xs uppercase font-semibold tracking-wider text-muted-foreground mb-2.5 sm:mb-3 flex items-center gap-2'>
                  <Sparkles className='size-4 text-primary shrink-0' />
                  <span>Key Engineering Highlights</span>
                </h4>
                <ul className='space-y-3 sm:space-y-2.5'>
                  {project.engineeringFeats.map((feat, idx) => (
                    <li
                      key={idx}
                      className='flex items-start gap-2 sm:gap-2.5 text-[13.5px] sm:text-sm text-muted-foreground leading-[1.65]'
                    >
                      <Check className='size-4 text-primary shrink-0 mt-0.5' />
                      <span className='text-foreground/90 text-pretty break-words min-w-0'>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Metrics & Scale — stacks vertically on mobile */}
              {project.metrics && (
                <div className='rounded-xl border border-primary/20 bg-primary/5 p-3.5 sm:p-4 text-[13px] sm:text-sm text-foreground/90 flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-2.5 leading-relaxed'>
                  <span className='font-semibold text-primary shrink-0'>
                    Scale &amp; Impact:
                  </span>
                  <span className='text-muted-foreground text-pretty break-words'>
                    {project.metrics}
                  </span>
                </div>
              )}

              {/* Technical Stack */}
              <div>
                <h4 className='text-[11px] sm:text-xs uppercase font-semibold tracking-wider text-muted-foreground mb-2.5 sm:mb-3 flex items-center gap-2'>
                  <Cpu className='size-4 text-primary shrink-0' />
                  <span>Technical Stack &amp; Infrastructure</span>
                </h4>
                <div className='flex flex-wrap gap-1.5 sm:gap-2'>
                  {project.stack.map((tech, idx) => (
                    <span
                      key={idx}
                      className='inline-flex items-center rounded-md border border-border/80 bg-secondary/60 px-2 py-1 text-[11px] sm:px-2.5 sm:text-[13px] text-foreground/90 font-mono break-words'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer — full-width stacked CTAs on mobile */}
            <div className='flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-3 pt-4 sm:pt-5 border-t border-border/70 shrink-0'>
              {project.isInDevelopment ? (
                <div className='inline-flex items-center justify-center sm:justify-start gap-2 text-[13px] sm:text-sm font-medium text-amber-600 dark:text-amber-400 min-h-[44px] sm:min-h-0'>
                  <span className='size-2 rounded-full bg-amber-500 animate-pulse shrink-0' />
                  <span>Private Beta / In Active Development</span>
                </div>
              ) : (
                <a
                  href={project.url}
                  target='_blank'
                  rel='noreferrer'
                  onClick={() =>
                    trackEvent('project_demo_clicked', {
                      project_id: project.id,
                    })
                  }
                  className='inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 min-h-[44px] py-2.5 text-sm font-medium text-primary-foreground hover:brightness-105 active:scale-[0.98] transition-all shadow-xs cursor-pointer touch-manipulation w-full sm:w-auto'
                >
                  <span>Visit Live Platform</span>
                  <ExternalLink className='size-3.5 shrink-0' />
                </a>
              )}
              <button
                type='button'
                onClick={onClose}
                className='rounded-lg border border-border bg-secondary/80 px-4 min-h-[44px] py-2.5 text-sm font-medium text-secondary-foreground hover:bg-muted active:scale-[0.98] transition-all cursor-pointer touch-manipulation w-full sm:w-auto'
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
