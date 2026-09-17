'use client';

import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="sticky top-[100vh] border-t border-border/60 mt-16 transition-colors">
      <div
        data-slot="container"
        data-variant="fluid"
        className="mx-auto w-full px-4 sm:px-8 flex flex-col items-center justify-center gap-4 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between max-w-5xl"
      >
        <p className="group flex items-center gap-2">
          <span>© {currentYear} Built with</span>
          {/* Heart icon with hover scale exact matching hudovich */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            color="currentColor"
            className="size-3.5 shrink-0 fill-destructive text-destructive transition-transform will-change-transform group-hover:scale-125"
            strokeWidth={1.85}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              d="M10.4107 19.9677C7.58942 17.858 2 13.0348 2 8.69444C2 5.82563 4.10526 3.5 7 3.5C8.5 3.5 10 4 12 6C14 4 15.5 3.5 17 3.5C19.8947 3.5 22 5.82563 22 8.69444C22 13.0348 16.4106 17.858 13.5893 19.9677C12.6399 20.6776 11.3601 20.6776 10.4107 19.9677Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.85}
            />
          </svg>
          <span>by Kingsley Solomon</span>
        </p>

        <p className="inline-flex items-center flex-wrap gap-x-2 gap-y-1 text-muted-foreground">
          <span>Design inspired by</span>
          <a
            className="group/text-link inline-flex items-center gap-0.5 font-medium text-foreground hover:text-primary transition-colors"
            target="_blank"
            rel="noreferrer"
            href="https://hudovich.com/"
          >
            <span className="relative inline-block group-hover/text-link:after:h-0.5 after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-primary after:transition-all">
              Andrei Hudovich
            </span>
            <ArrowUpRight className="size-3 text-muted-foreground group-hover/text-link:text-primary transition-colors" />
          </a>
          {/* Open source section commented out for now
          <span className="text-muted-foreground/40">•</span>
          <a
            className="group/text-link inline-flex items-center gap-1 font-medium text-foreground hover:text-primary transition-colors"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/gh-i19n"
          >
            <span className="relative inline-block group-hover/text-link:after:h-0.5 after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-primary after:transition-all">
              Open source
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              color="currentColor"
              className="size-3.5 shrink-0 text-foreground"
              strokeWidth={1.85}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                d="M6 8C7.10457 8 8 7.10457 8 6C8 4.89543 7.10457 4 6 4C4.89543 4 4 4.89543 4 6C4 7.10457 4.89543 8 6 8Z"
                stroke="currentColor"
                strokeWidth={1.85}
              />
              <path
                d="M12 20C13.1046 20 14 19.1046 14 18C14 16.8954 13.1046 16 12 16C10.8954 16 10 16.8954 10 18C10 19.1046 10.8954 20 12 20Z"
                stroke="currentColor"
                strokeWidth={1.85}
              />
              <path
                d="M18 8C19.1046 8 20 7.10457 20 6C20 4.89543 19.1046 4 18 4C16.8954 4 16 4.89543 16 6C16 7.10457 16.8954 8 18 8Z"
                stroke="currentColor"
                strokeWidth={1.85}
              />
              <path
                d="M6.01734 8.74067C6.01734 10.4142 5.77537 12.1995 9.22051 11.9855H12.0053M17.9929 8.57617C18.1259 11.9855 16.9199 11.7648 15.7861 11.9855H12.0053M12.0053 15.7001V11.9855"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.85}
              />
            </svg>
          </a>
          */}
        </p>
      </div>
    </footer>
  );
}
