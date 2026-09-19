'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Moon, Sun, Clock } from 'lucide-react'
import Image from 'next/image'
import logoLight from '@/public/header-logo.png'
import logoDark from '@/public/header-logo-dark.png'

export default function Header() {
  const [isDark, setIsDark] = useState(false)
  const [lagosTime, setLagosTime] = useState('')

  useEffect(() => {
    // Sync theme status after mount
    const updateThemeState = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    updateThemeState()

    // Update Lagos, Nigeria time (UTC+1)
    const updateTime = () => {
      try {
        const now = new Date()
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Africa/Lagos',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
        setLagosTime(formatter.format(now))
      } catch {
        setLagosTime('WAT (UTC+1)')
      }
    }

    updateTime()
    const interval = setInterval(updateTime, 30000)
    return () => clearInterval(interval)
  }, [])

  const toggleTheme = () => {
    const nextDark = !isDark
    setIsDark(nextDark)
    if (nextDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <header className='sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border/40 transition-colors'>
      <div className='mx-auto w-full px-4 sm:px-8 flex h-18 items-center gap-3 sm:gap-10 max-w-5xl'>
        <Link
          aria-label='Home'
          href='/'
          className='group/button inline-flex shrink-0 items-center justify-center rounded border border-transparent text-sm font-medium whitespace-nowrap transition-all outline-none select-none h-16 px-2.5 -ml-2.5 gap-1.5 hover:bg-transparent'
        >
          <Image
            alt='i19n - Kingsley Solomon'
            src={logoLight}
            width={180}
            height={129}
            priority
            className='block h-9 w-auto bg-transparent dark:hidden'
            referrerPolicy='no-referrer'
          />
          <Image
            alt='i19n - Kingsley Solomon'
            src={logoDark}
            width={180}
            height={129}
            priority
            className='hidden h-9 w-auto bg-transparent dark:block'
            referrerPolicy='no-referrer'
          />
        </Link>

        {/* Lagos Time & Availability Badge */}
        <div className='hidden sm:inline-flex items-center gap-2 rounded-full border border-border bg-secondary/70 px-3 py-1 text-xs text-muted-foreground'>
          <span className='relative flex size-2'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75'></span>
            <span className='relative inline-flex size-2 rounded-full bg-emerald-500'></span>
          </span>
          <span className='font-medium text-foreground/90'>Lagos, NG</span>
          <span className='text-muted-foreground/60'>•</span>
          <Clock className='size-3 text-muted-foreground' />
          <span className='font-mono'>{lagosTime || 'WAT (UTC+1)'}</span>
        </div>

        {/* Right side: Theme toggle */}
        <div className='-mr-2 ml-auto flex items-center gap-2'>
          <button
            type='button'
            onClick={toggleTheme}
            aria-label='Toggle theme'
            className='group/button inline-flex shrink-0 items-center justify-center rounded border border-transparent text-sm font-medium whitespace-nowrap transition-all outline-none hover:bg-muted size-8 text-foreground'
          >
            {isDark ? (
              <Sun className='size-4 text-primary transition-transform hover:rotate-45' />
            ) : (
              <Moon className='size-4 text-foreground transition-transform hover:-rotate-12' />
            )}
            <span className='sr-only'>Toggle theme</span>
          </button>
        </div>
      </div>
    </header>
  )
}
