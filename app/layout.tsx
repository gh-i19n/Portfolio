import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kingsley Solomon - Full Stack Software Engineer',
  description: 'Portfolio of Ifijeh Kingsley Solomon, Full Stack Software Engineer specializing in React, Next.js, Java, Spring Boot, Node.js, and Agentic Systems.',
  openGraph: {
    title: 'Kingsley Solomon - Full Stack Software Engineer',
    description: 'Portfolio of Ifijeh Kingsley Solomon, Full Stack Software Engineer specializing in React, Next.js, Java, Spring Boot, Node.js, and Agentic Systems.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kingsley Solomon - Full Stack Software Engineer',
    description: 'Portfolio of Ifijeh Kingsley Solomon, Full Stack Software Engineer specializing in React, Next.js, Java, Spring Boot, Node.js, and Agentic Systems.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('theme');
                  const supportDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (stored === 'dark' || (!stored && supportDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-base text-base text-muted-foreground antialiased selection:bg-primary/20 selection:text-primary">
        {children}
      </body>
    </html>
  );
}

