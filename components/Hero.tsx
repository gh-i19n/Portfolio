'use client'

import Image from 'next/image'
import avatarPic from '@/public/profile-pic.png'
import { Mail, Send } from 'lucide-react'
import { motion } from 'motion/react'
import DesignQuotes from './DesignQuotes'

interface HeroProps {
  onOpenContact: () => void
}

export default function Hero({ onOpenContact }: HeroProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className='pt-2 sm:pt-4'
    >
      {/* Top Row: Avatar on the left, subtle italic quote at top right corner */}
      <div className='flex items-start justify-between gap-4 mb-6 sm:mb-8'>
        <div className='relative inline-block shrink-0'>
          <div className='relative size-20 sm:size-22 overflow-hidden rounded-full border-2 border-border/80 bg-muted shadow-sm'>
            <Image
              alt='Kingsley Solomon'
              src={avatarPic}
              width={88}
              height={88}
              priority
              className='size-full rounded-full object-cover'
              referrerPolicy='no-referrer'
            />
          </div>
          <span
            className='absolute bottom-0 right-0 flex size-5 items-center justify-center rounded-full bg-background border-2 border-background shadow-xs'
            title='Active & Available'
          >
            <span className='size-2.5 rounded-full bg-emerald-500 animate-pulse' />
          </span>
        </div>

        {/* Minimalist Design & Architecture Quote at top right corner */}
        <DesignQuotes />
      </div>

      {/* Primary heading with improved hierarchy */}
      <h1 className='font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground mb-5 sm:mb-6 tracking-tight'>
        Hey, I&apos;m{' '}
        <span className='border-b-2 border-primary pb-0.5'>
          Kingsley Solomon
        </span>
        !
      </h1>

      {/* Description text with relaxed leading, generous spacing, and readable font sizing */}
      <div className='mb-8 sm:mb-10 space-y-4 sm:space-y-5 text-foreground/90'>
        <p className='flex items-center flex-wrap gap-2 text-base sm:text-lg text-foreground font-medium'>
          <span>
            A full stack software engineer based in Lagos,&nbsp;Nigeria
          </span>
          {/* Nigeria Flag SVG */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 12 8'
            className='inline-block h-3.5 w-5 shrink-0 rounded-xs shadow-xs overflow-hidden'
            aria-label='Nigeria Flag'
          >
            <rect width='4' height='8' fill='#008751' />
            <rect x='4' width='4' height='8' fill='#FFFFFF' />
            <rect x='8' width='4' height='8' fill='#008751' />
          </svg>
        </p>

        <p className='text-sm sm:text-base leading-relaxed text-muted-foreground max-w-2xl'>
          Specializing in scalable distributed systems with{' '}
          <span className='text-foreground font-medium'>
            Java / Spring Boot
          </span>{' '}
          &amp; <span className='text-foreground font-medium'>Node.js</span>,
          responsive frontend architectures using{' '}
          <span className='text-foreground font-medium'>
            React &amp; Next.js
          </span>
          , and modern agentic AI integration.
        </p>

        <div className='pt-1'>
          <span className='inline-flex items-center gap-2 rounded-full border border-border/80 bg-secondary/60 px-3.5 py-1.5 text-xs sm:text-sm text-muted-foreground'>
            <span className='size-2 rounded-full bg-emerald-500 shrink-0 animate-pulse' />
            <span>
              Open for high-impact software engineering roles &amp; technical
              consulting.
            </span>
          </span>
        </div>
      </div>

      {/* Action buttons with comfortable touch targets and spacing */}
      <div className='flex flex-wrap items-center gap-3 sm:gap-4'>
        <a
          href='mailto:kinxly@gmail.com'
          className='group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 bg-primary text-primary-foreground h-10 gap-2 px-4.5 shadow-xs hover:brightness-105 active:scale-98'
        >
          <Mail className='size-4' />
          <span>Send email</span>
        </a>

        <button
          type='button'
          onClick={onOpenContact}
          className='group/button inline-flex shrink-0 items-center justify-center rounded-md border border-border text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 bg-secondary text-secondary-foreground h-10 gap-2 px-4.5 hover:bg-muted active:scale-98 cursor-pointer'
        >
          <Send className='size-4' />
          <span>Send quick note</span>
        </button>
      </div>
    </motion.section>
  )
}
