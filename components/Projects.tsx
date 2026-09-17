'use client';

import { useState } from 'react';
import ProjectModal, { ProjectItem } from './ProjectModal';
import { ArrowUpRight, Info, Sparkles } from 'lucide-react';

const PROJECTS: ProjectItem[] = [
  {
    id: 'techstudio-hris',
    title: 'Techstudio HRIS',
    url: 'https://techstudiohr.com',
    displayUrl: 'techstudiohr.com',
    role: 'Lead',
    status: 'Production',
    statusVariant: 'emerald',
    logoText: 'TS',
    logoStyle: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    statusDotColor: 'bg-emerald-500',
    isInDevelopment: false,
    category: 'Enterprise Workforce Architecture',
    summary: 'Human Resources Information System managing employee records, payroll automation, and enterprise workforce workflows.',
    architectureOverview:
      'A multi-tenant corporate HR operating platform engineered with Next.js frontend interfaces and Java/Spring Boot & Node.js backend services. Handles end-to-end employee lifecycle, role-based workflows, and sensitive payroll operations.',
    engineeringFeats: [
      'Engineered granular Role-Based Access Control (RBAC) supporting executives, managers, and cross-department personnel.',
      'Constructed database-backed transactional workflows reducing manual administrative paperwork by over 60%.',
      'Optimized backend queries and cached lookup layers, slashing core dashboard loading times by ~30%.',
    ],
    stack: ['Next.js', 'React', 'Java', 'Spring Boot', 'PostgreSQL', 'JWT/RBAC', 'Docker'],
    metrics: '~30% latency reduction across core analytical queries',
  },
  {
    id: 'bytealley',
    title: 'ByteAlley',
    url: 'https://trybytealley.com',
    displayUrl: 'trybytealley.com',
    role: 'Lead',
    status: 'Production',
    statusVariant: 'emerald',
    logoText: 'BA',
    logoStyle: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    statusDotColor: 'bg-emerald-500',
    isInDevelopment: false,
    category: 'Creator Economy & Digital Commerce',
    summary: 'Creator-focused digital marketplace enabling creators to showcase, distribute, and monetize software, templates, and digital assets.',
    architectureOverview:
      'A high-conversion storefront and creator analytics dashboard engineered for instant digital fulfillment, multi-currency checkout, and granular creator payouts.',
    engineeringFeats: [
      'Built reusable UI component design system optimizing buyer checkout flow and creator store customization.',
      'Integrated payment gateways and automated webhook reconciliation for immediate licensed asset delivery.',
      'Designed performant RESTful API layer with PostgreSQL relational schemas for order histories and dispute tracking.',
    ],
    stack: ['React', 'Next.js', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS', 'Payment Webhooks'],
    metrics: 'Sub-second checkout flow with zero lost checkout webhook events',
  },
  {
    id: 'clapmi',
    title: 'ClapMi',
    url: 'https://clapmi.com',
    displayUrl: 'clapmi.com',
    role: 'Contributor & Consultant',
    status: 'Production',
    statusVariant: 'emerald',
    logoText: 'CM',
    logoStyle: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    statusDotColor: 'bg-emerald-500',
    isInDevelopment: false,
    category: 'Live Streaming & Interactive SocialFi',
    summary: 'High-concurrency live streaming and SocialFi platform where content creators engage live audiences and monetize attention in real time.',
    architectureOverview:
      'A distributed media streaming and SocialFi web application built to handle low-latency video streaming, synchronized live chat rooms, and micro-transaction tipping mechanics.',
    engineeringFeats: [
      'Implemented real-time bidirectional WebSocket communication clusters under strict latency budgets and rapid delivery deadlines.',
      'Engineered instant tip and social interaction feeds with optimistic client state updates for lag-free mobile UX.',
      'Maintained high system resilience under bursty traffic surges during live celebrity and creator broadcasts.',
    ],
    stack: ['Next.js', 'React', 'Node.js', 'WebSockets', 'SocialFi Integrations', 'Tailwind CSS'],
    metrics: 'Low-latency real-time bidirectional chat & tip synchronization',
  },
  {
    id: 'techstudio-academy',
    title: 'Techstudio Academy',
    url: 'https://techstudioacademy.com',
    displayUrl: 'techstudioacademy.com',
    role: 'Lead',
    status: 'Production',
    statusVariant: 'emerald',
    logoText: 'TA',
    logoStyle: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    statusDotColor: 'bg-emerald-500',
    isInDevelopment: false,
    category: 'EdTech & Learning Management',
    summary: 'Technology training platform focused on practical, industry-relevant software engineering and development education.',
    architectureOverview:
      'Interactive learning management system providing technical curriculum tracks, syllabus roadmaps, student admission workflows, and project assessment tracking.',
    engineeringFeats: [
      'Created structured onboarding and admissions pipelines connecting prospective learners with mentors and class cohorts.',
      'Built responsive learning portals with progressive course tracking, assignment submissions, and instructor feedback loops.',
      'Optimized asset delivery and SEO parameters, increasing inbound organic enrollments.',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'SEO Optimization'],
    metrics: 'Trained and empowered hundreds of emerging software developers across Africa',
  },
  {
    id: 'alumni-portal',
    title: 'Alumni Network',
    url: 'https://bcc007-group.org',
    displayUrl: 'bcc007-group.org',
    role: 'Consultant',
    status: 'Production',
    statusVariant: 'emerald',
    logoText: 'AN',
    logoStyle: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    statusDotColor: 'bg-emerald-500',
    isInDevelopment: false,
    category: 'Private Community & Endowment Governance',
    summary: 'Invite-only institutional alumni platform for managing membership directories, dues, endowment donations, and RSVP events.',
    architectureOverview:
      'A private governance and philanthropic portal ensuring financial accountability, member credential validation, and seamless event coordination for an executive alumni society.',
    engineeringFeats: [
      'Implemented secure multi-factor authentication and member verification to prevent unauthorized directory access.',
      'Engineered automated dues collection, endowment donation ledgers, and downloadable receipt generation.',
      'Built real-time RSVP management with automated notifications and member transfer tracking.',
    ],
    stack: ['Next.js', 'React', 'Java', 'Spring Security', 'PostgreSQL', 'JWT'],
    metrics: '100% automated accounting audit trail for dues & member contributions',
  },
  {
    id: 'eventorch',
    title: 'Eventorch',
    url: '#',
    displayUrl: 'eventorch.app',
    role: 'Lead',
    status: 'In Development',
    statusVariant: 'amber',
    logoText: 'EO',
    logoStyle: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25',
    statusDotColor: 'bg-amber-500 animate-pulse',
    isInDevelopment: true,
    category: 'Corporate Event Orchestration',
    summary: 'Corporate event planning platform managing multi-track conference agendas, vendor RFP workflows, and real-time attendee registration.',
    architectureOverview:
      'A dedicated enterprise event planning and orchestration platform designed to coordinate large-scale corporate summits, vendor contracts, speaker schedules, and real-time attendee badge registration.',
    engineeringFeats: [
      'Architecting multi-track conference scheduling engine with automated room capacity conflict resolution.',
      'Constructing vendor procurement portal managing RFPs, budget allocation, and milestone sign-offs.',
      'Designing attendee registration workflows with QR-code mobile check-in and dynamic schedule bookmarks.',
      'Implementing role-based stakeholder access control for event organizers, venue staff, and corporate sponsors.',
    ],
    stack: ['Next.js 15', 'React', 'Node.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'Docker'],
    metrics: 'Active development phase • Alpha release scheduled for Q4',
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section className="@container/projects">
      <div className="mb-6">
        <h2 className="font-heading text-xs font-semibold tracking-wider text-foreground uppercase">
          Projects
        </h2>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground">
          Flagship production platforms, scalable products, and distributed systems I&apos;ve engineered:
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        {PROJECTS.map((project) => {
          const isDev = project.isInDevelopment;
          return (
            <article
              key={project.id}
              data-slot="card"
              onClick={isDev ? () => setSelectedProject(project) : undefined}
              className={`group/card relative flex flex-col justify-between gap-3.5 overflow-hidden p-5 text-sm text-card-foreground rounded-xl border transition-all duration-200 ${
                isDev
                  ? 'border-dashed border-border/90 bg-card/70 hover:border-amber-500/60 hover:bg-card hover:shadow-xs cursor-pointer'
                  : 'border-border bg-card hover:border-primary/50 hover:shadow-xs'
              }`}
            >
              {/* Header: Logo placeholder + Title & Role + Minimalist Status Tag */}
              <div className="flex items-start justify-between gap-3 min-w-0" data-slot="card-header">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  {/* Brand Logo Placeholder */}
                  <div
                    className={`shrink-0 size-9 rounded-md border flex items-center justify-center font-mono text-xs font-bold tracking-tight select-none shadow-2xs mt-0.5 ${project.logoStyle}`}
                    title={`${project.title} logo`}
                  >
                    {project.logoText}
                  </div>

                  {/* Title & Role */}
                  <div className="min-w-0 flex-1">
                    <h3
                      data-slot="card-title"
                      className="font-heading text-base font-semibold text-foreground group-hover/card:text-primary transition-colors whitespace-nowrap truncate min-w-0"
                    >
                      {isDev ? (
                        <span className="flex items-center gap-1.5">
                          <span>{project.title}</span>
                        </span>
                      ) : (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                          className="after:absolute after:inset-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                        >
                          {project.title}
                        </a>
                      )}
                    </h3>

                    {/* Role badge and domain */}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5 font-mono">
                      <span className="inline-flex items-center font-medium text-foreground/90 bg-secondary/80 px-1.5 py-0.5 rounded border border-border/70 text-[10.5px] leading-none">
                        {project.role}
                      </span>
                      <span className="text-muted-foreground/40">•</span>
                      <span className="truncate text-muted-foreground/75 text-[11px]">{project.displayUrl}</span>
                    </div>
                  </div>
                </div>

                {/* Sleek status badge & indicator */}
                <div className="flex items-center gap-2 shrink-0 pt-0.5">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium whitespace-nowrap ${
                      isDev
                        ? 'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        : 'border-border/70 bg-secondary/50 text-muted-foreground'
                    }`}
                  >
                    <span className={`size-1.5 rounded-full ${project.statusDotColor}`} />
                    <span>{project.status}</span>
                  </span>

                  {isDev ? (
                    <Sparkles className="size-4 text-amber-500/70 transition-transform group-hover/card:scale-110" />
                  ) : (
                    <ArrowUpRight className="size-4 text-muted-foreground/50 transition-all duration-200 group-hover/card:text-primary group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
                  )}
                </div>
              </div>

              {/* Project Summary */}
              <div className="text-sm leading-relaxed text-muted-foreground" data-slot="card-content">
                <p>{project.summary}</p>
              </div>

              {/* Footer with Tech Stack and Architecture details trigger */}
              <div className="pt-3 flex items-center justify-between border-t border-border/50 text-xs text-muted-foreground">
                <span className="font-mono text-muted-foreground/80 truncate max-w-[210px] sm:max-w-[240px]">
                  {project.stack.slice(0, 3).join(' • ')}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setSelectedProject(project);
                  }}
                  className={`relative z-10 inline-flex items-center gap-1 text-xs font-medium transition-colors cursor-pointer px-2 py-1 rounded ${
                    isDev
                      ? 'text-amber-600 dark:text-amber-400 hover:bg-amber-500/15'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  title={isDev ? 'View Dev Specs & Architecture' : 'View Architecture Details'}
                >
                  <Info className="size-3.5" />
                  <span>{isDev ? 'Dev Specs' : 'Architecture'}</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
