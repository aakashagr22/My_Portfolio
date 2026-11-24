import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  CERTIFICATES,
  EDUCATION,
  EXPERIENCE,
  LINKS,
  PROFILE,
  PROJECTS,
  type ProjectItem,
} from '../data/portfolio'
import {
  ArrowUpRightIcon,
  CheckIcon,
  CloseIcon,
  CopyIcon,
  DocumentIcon,
  GithubIcon,
  LeetcodeIcon,
  LinkedinIcon,
} from './Icons'

const STUDIO_EASE = [0.22, 1, 0.36, 1] as const

const CORE_TECH = [
  'Java 21',
  'Spring Boot 3',
  'Spring AI',
  'Microservices',
  'Apache Kafka',
  'Resilience4j',
  'PostgreSQL',
  'MongoDB',
  'Docker',
  'AWS EC2',
  'React.js',
  'Prometheus & Grafana',
]

interface RecruiterQuickViewProps {
  open: boolean
  onClose: () => void
  onOpenCaseStudy: (project: ProjectItem) => void
}

export function RecruiterQuickView({
  open,
  onClose,
  onOpenCaseStudy,
}: RecruiterQuickViewProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      window.location.href = `mailto:${PROFILE.email}`
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Recruiter Quick View"
          className="fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B1220]/65 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.25, ease: STUDIO_EASE }}
            className="relative z-10 w-full max-w-4xl studio-card rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border pb-5">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-lime text-[#141A27] font-semibold">
                    Recruiter Quick View
                  </span>
                  <span className="font-mono text-xs text-muted">
                    {PROFILE.location}
                  </span>
                </div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink pt-1">
                  {PROFILE.name}
                </h2>
                <p className="font-mono text-xs text-accent">
                  Target Roles: Software Development Engineer · Java Backend Developer · Full-Stack Engineer
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={PROFILE.resumeUrl}
                  download="Akash_Kumar_Resume.pdf"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent text-accent-ink font-medium text-xs hover:opacity-90 transition-opacity"
                >
                  <DocumentIcon className="w-3.5 h-3.5" />
                  <span>Download Resume</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close Recruiter Quick View"
                  className="p-2 rounded-lg border border-border bg-surface-alt/60 text-muted hover:text-ink transition-colors cursor-pointer"
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Professional Introduction */}
            <div className="rounded-2xl bg-surface-alt/60 border border-border p-4 sm:p-5 space-y-1.5">
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-accent">
                Executive Summary
              </h3>
              <p className="text-sm text-ink/90 leading-relaxed">{PROFILE.summary}</p>
            </div>

            {/* Core Technologies */}
            <div className="space-y-2.5">
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-accent">
                Core Technologies
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {CORE_TECH.map((tech) => (
                  <span key={tech} className="tech-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience & Education */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border bg-surface-alt/40 p-4 space-y-3">
                <h3 className="font-mono text-[11px] uppercase tracking-wider text-accent">
                  Experience ({EXPERIENCE.length} Internships)
                </h3>
                <div className="space-y-3">
                  {EXPERIENCE.map((exp) => (
                    <div key={exp.company} className="border-l-2 border-accent/50 pl-3 space-y-0.5">
                      <div className="font-display font-semibold text-sm text-ink">
                        {exp.role}
                      </div>
                      <div className="text-xs text-accent font-medium">{exp.company}</div>
                      <div className="font-mono text-[11px] text-muted">
                        {exp.period} · {exp.impactBadge}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface-alt/40 p-4 space-y-3">
                <h3 className="font-mono text-[11px] uppercase tracking-wider text-accent">
                  Education &amp; Certifications
                </h3>
                <div className="border-l-2 border-lime pl-3 space-y-0.5">
                  <div className="font-display font-semibold text-sm text-ink">
                    {EDUCATION.institution}
                  </div>
                  <div className="text-xs text-muted">{EDUCATION.degree}</div>
                  <div className="font-mono text-[11px] text-ink font-medium">
                    {EDUCATION.period} · {EDUCATION.grade}
                  </div>
                </div>
                <div className="pt-2 border-t border-border/70 space-y-1">
                  {CERTIFICATES.map((c) => (
                    <div key={c.title} className="text-xs text-muted">
                      <span className="text-ink font-medium">{c.title}</span> · {c.issuer}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured Projects */}
            <div className="space-y-3">
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-accent">
                Featured Projects
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PROJECTS.map((proj) => (
                  <div
                    key={proj.id}
                    className="rounded-xl border border-border bg-surface-alt/50 p-3.5 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="font-display font-bold text-base text-ink">
                        {proj.title}
                      </div>
                      <div className="font-mono text-[11px] text-accent mt-0.5">
                        {proj.metrics[0]?.value} · {proj.metrics[0]?.label}
                      </div>
                      <p className="text-xs text-muted mt-1.5 line-clamp-2">
                        {proj.tagline}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t border-border/70">
                      <button
                        type="button"
                        onClick={() => {
                          onClose()
                          onOpenCaseStudy(proj)
                        }}
                        className="font-mono text-[11px] text-accent hover:underline cursor-pointer"
                      >
                        Case Study →
                      </button>
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[11px] text-muted hover:text-ink ml-auto inline-flex items-center gap-0.5"
                        >
                          Live <ArrowUpRightIcon className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Contact Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface-alt border border-border text-xs font-mono text-ink hover:border-accent/50 cursor-pointer"
                >
                  {copied ? <CheckIcon className="w-3.5 h-3.5 text-accent" /> : <CopyIcon className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Email Copied!' : PROFILE.email}</span>
                </button>
                <a
                  href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center px-3.5 py-2 rounded-lg bg-surface-alt border border-border text-xs font-mono text-muted hover:text-ink"
                >
                  {PROFILE.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-surface text-xs text-ink hover:border-accent/50"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-accent" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-surface text-xs text-ink hover:border-accent/50"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={LINKS.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LeetCode"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-surface text-xs text-ink hover:border-accent/50"
                >
                  <LeetcodeIcon className="w-3.5 h-3.5 text-accent" />
                  <span>LeetCode</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
