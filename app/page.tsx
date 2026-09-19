'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import SocialLinks from '@/components/SocialLinks';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import QuickMessageModal from '@/components/QuickMessageModal';

export default function Page() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between overflow-x-clip bg-background text-foreground transition-colors selection:bg-primary/20 selection:text-primary">
      {/* Top sticky navigation bar */}
      <Header />

      {/* Main Content container with spacious rhythm */}
      <main className="pt-10 pb-16 sm:pt-14 sm:pb-24 flex-1">
        <div
          data-slot="container"
          data-variant="default"
          className="mx-auto w-full px-4 sm:px-8 max-w-5xl space-y-16 sm:space-y-20 relative z-0"
        >
          {/* Hero Section (includes top-right italic quote) */}
          <Hero
            onOpenContact={() => setIsContactOpen(true)}
          />

          {/* Projects Section */}
          <Projects />

          {/* Social Platforms */}
          <SocialLinks />

          {/* Contact & Scheduling Section */}
          <ContactSection onOpenMessageModal={() => setIsContactOpen(true)} />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Contact Modal */}
      <QuickMessageModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
