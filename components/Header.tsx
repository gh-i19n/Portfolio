'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Moon, Sun, Clock } from 'lucide-react';

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [lagosTime, setLagosTime] = useState('');

  useEffect(() => {
    // Sync theme status after mount
    const updateThemeState = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    updateThemeState();

    // Update Lagos, Nigeria time (UTC+1)
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Africa/Lagos',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });
        setLagosTime(formatter.format(now));
      } catch {
        setLagosTime('WAT (UTC+1)');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border/40 transition-colors">
      <div className="mx-auto w-full px-4 sm:px-8 flex h-18 items-center gap-3 sm:gap-10 max-w-5xl">
        <Link
          aria-label="Home"
          href="/"
          className="group/button inline-flex shrink-0 items-center justify-center rounded border border-transparent text-sm font-medium whitespace-nowrap transition-all outline-none select-none h-8 px-2.5 -ml-2.5 gap-1.5 hover:bg-transparent"
        >
          {/* Exact hudovich double slash symbol in primary color */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5.5 shrink-0 text-primary transition-transform group-hover:rotate-6"
          >
            <path d="m9.942 18.25 4.126-16.5h3.201l-4.125 16.5zm-7.212 0 4.125-16.5h3.202l-4.125 16.5z" />
          </svg>
          <span className="translate-y-px text-lg leading-none font-bold tracking-wider text-foreground">
            KS
          </span>
        </Link>


        {/* Lagos Time & Availability Badge */}
        <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-border bg-secondary/70 px-3 py-1 text-xs text-muted-foreground">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
          </span>
          <span className="font-medium text-foreground/90">Lagos, NG</span>
          <span className="text-muted-foreground/60">•</span>
          <Clock className="size-3 text-muted-foreground" />
          <span className="font-mono">{lagosTime || 'WAT (UTC+1)'}</span>
        </div>

        {/* Right side: Theme toggle */}
        <div className="-mr-2 ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="group/button inline-flex shrink-0 items-center justify-center rounded border border-transparent text-sm font-medium whitespace-nowrap transition-all outline-none hover:bg-muted size-8 text-foreground"
          >
            {isDark ? (
              <Sun className="size-4 text-primary transition-transform hover:rotate-45" />
            ) : (
              <Moon className="size-4 text-foreground transition-transform hover:-rotate-12" />
            )}
            <span className="sr-only">Toggle theme</span>
          </button>
        </div>
      </div>
    </header>
  );
}
