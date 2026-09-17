'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface QuoteItem {
  quote: string;
  author: string;
}

const QUOTES: QuoteItem[] = [
  {
    quote: 'Good design is as little design as possible.',
    author: 'Dieter Rams',
  },
  {
    quote: 'Less, but better.',
    author: 'Dieter Rams',
  },
  {
    quote: 'Simplicity is the ultimate sophistication.',
    author: 'Leonardo da Vinci',
  },
  {
    quote:
      'Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.',
    author: 'Antoine de Saint-Exupéry',
  },
  {
    quote: 'Simplicity is prerequisite for reliability.',
    author: 'Edsger W. Dijkstra',
  },
  {
    quote:
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    author: 'Martin Fowler',
  },
  {
    quote: 'Controlling complexity is the essence of computer programming.',
    author: 'Brian Kernighan',
  },
];

export default function DesignQuotes() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextQuote = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % QUOTES.length);
  }, []);

  // 10-second comfortable reading interval (pauses cleanly on hover)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextQuote();
    }, 10000);

    return () => clearInterval(timer);
  }, [isPaused, nextQuote]);

  const activeQuote = QUOTES[currentIndex];

  return (
    <div
      data-slot="quote-ticker"
      className="text-right max-w-xs sm:max-w-sm md:max-w-md min-h-[3.75rem] flex flex-col justify-start select-none cursor-default group/quote"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      title="Design & architecture philosophy (pauses on hover)"
      role="note"
      aria-label="Design philosophy quote"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="text-right"
        >
          <p className="italic text-xs sm:text-[13px] text-muted-foreground/85 group-hover/quote:text-foreground leading-relaxed transition-colors duration-300">
            &ldquo;{activeQuote.quote}&rdquo;
          </p>
          <cite className="block text-[11px] font-mono text-muted-foreground/60 not-italic mt-1">
            — {activeQuote.author}
          </cite>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
