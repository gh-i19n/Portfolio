'use client';

import { Mail } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function SocialLinks() {
  return (
    <section>
      <div className="mb-5">
        <h2 className="font-heading text-xs font-semibold tracking-wider text-foreground uppercase">
          Find me on
        </h2>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground">
          Connect, explore codebases, or review my technical profiles:
        </p>
      </div>

      <ul className="flex flex-wrap items-center gap-3">
        {/* GitHub */}
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            data-slot="badge"
            data-variant="secondary"
            className="group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/80 font-medium whitespace-nowrap outline-0 transition-all focus-visible:ring-3 focus-visible:ring-ring/50 bg-secondary text-secondary-foreground h-8 gap-2 px-3.5 text-xs sm:text-sm hover:border-primary/50 hover:bg-muted"
            href="https://github.com/gh-i19n"
            onClick={() => trackEvent('social_clicked', { network: 'github' })}
          >
            {/* Exact GitHub SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              color="currentColor"
              className="size-4 text-foreground"
              strokeWidth={1.85}
              stroke="currentColor"
            >
              <path
                d="M10 20.5675C6.57143 21.7248 3.71429 20.5675 2 17"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.85}
              />
              <path
                d="M10 22V18.7579C10 18.1596 10.1839 17.6396 10.4804 17.1699C10.6838 16.8476 10.5445 16.3904 10.1771 16.2894C7.13394 15.4528 5 14.1077 5 9.64606C5 8.48611 5.38005 7.39556 6.04811 6.4464C6.21437 6.21018 6.29749 6.09208 6.31748 5.9851C6.33746 5.87813 6.30272 5.73852 6.23322 5.45932C5.95038 4.32292 5.96871 3.11619 6.39322 2.02823C6.39322 2.02823 7.27042 1.74242 9.26698 2.98969C9.72282 3.27447 9.95075 3.41686 10.1515 3.44871C10.3522 3.48056 10.6206 3.41384 11.1573 3.28041C11.8913 3.09795 12.6476 3 13.5 3C14.3524 3 15.1087 3.09795 15.8427 3.28041C16.3794 3.41384 16.6478 3.48056 16.8485 3.44871C17.0493 3.41686 17.2772 3.27447 17.733 2.98969C19.7296 1.74242 20.6068 2.02823 20.6068 2.02823C21.0313 3.11619 21.0496 4.32292 20.7668 5.45932C20.6973 5.73852 20.6625 5.87813 20.6825 5.9851C20.7025 6.09207 20.7856 6.21019 20.9519 6.4464C21.6199 7.39556 22 8.48611 22 9.64606C22 14.1077 19.8661 15.4528 16.8229 16.2894C16.4555 16.3904 16.3162 16.8476 16.5196 17.1699C16.8161 17.6396 17 18.1596 17 18.7579V22"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.85}
              />
            </svg>
            <span>GitHub</span>
          </a>
        </li>

        {/* LinkedIn */}
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            data-slot="badge"
            data-variant="secondary"
            className="group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/80 font-medium whitespace-nowrap outline-0 transition-all focus-visible:ring-3 focus-visible:ring-ring/50 bg-secondary text-secondary-foreground h-8 gap-2 px-3.5 text-xs sm:text-sm hover:border-primary/50 hover:bg-muted"
            href="https://linkedin.com/in/i19n"
            onClick={() => trackEvent('social_clicked', { network: 'linkedin' })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              color="currentColor"
              className="size-4 text-[#0a66c2]"
              strokeWidth={1.85}
              stroke="currentColor"
            >
              <path
                d="M7 10V17"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.85}
              />
              <path
                d="M11 13V17M11 13C11 11.3431 12.3431 10 14 10C15.6569 10 17 11.3431 17 13V17M11 13V10"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.85}
              />
              <path
                d="M7.00801 7L6.99902 7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.85}
              />
              <path
                d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth={1.85}
              />
            </svg>
            <span>LinkedIn</span>
          </a>
        </li>

        {/* Twitter / X */}
        <li>
          <a
            target="_blank"
            rel="noreferrer"
            data-slot="badge"
            data-variant="secondary"
            className="group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/80 font-medium whitespace-nowrap outline-0 transition-all focus-visible:ring-3 focus-visible:ring-ring/50 bg-secondary text-secondary-foreground h-8 gap-2 px-3.5 text-xs sm:text-sm hover:border-primary/50 hover:bg-muted"
            href="https://x.com/i19n_dev"
            onClick={() => trackEvent('social_clicked', { network: 'x' })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-3.5 text-foreground"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>Twitter / X</span>
          </a>
        </li>

        {/* Email */}
        <li>
          <a
            data-slot="badge"
            data-variant="secondary"
            className="group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/80 font-medium whitespace-nowrap outline-0 transition-all focus-visible:ring-3 focus-visible:ring-ring/50 bg-secondary text-secondary-foreground h-8 gap-2 px-3.5 text-xs sm:text-sm hover:border-primary/50 hover:bg-muted"
            href="mailto:kinxly@gmail.com"
            onClick={() => trackEvent('social_clicked', { network: 'email' })}
          >
            <Mail className="size-4 text-primary" />
            <span>kinxly@gmail.com</span>
          </a>
        </li>
      </ul>
    </section>
  );
}
