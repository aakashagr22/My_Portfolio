import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { PROJECTS, type ProjectCategory, type ProjectItem } from '../data/portfolio'
import { ArrowUpRightIcon, CloseIcon, GithubIcon } from './Icons'
import { Reveal } from './Reveal'

const FILTER_CATEGORIES: ('All' | ProjectCategory)[] = [
  'All',
  'Full Stack',
  'Backend',
  'Frontend',
  'AI & RAG',
]

const STUDIO_EASE = [0.22, 1, 0.36, 1] as const

interface ProjectsSectionProps {
  selectedCaseStudy: ProjectItem | null
  onSelectCaseStudy: (project: ProjectItem | null) => void
}

function ProductPreviewFrame({
  src,
  alt,
  title,
  index,
  badge,
}: {
  src: string
  alt: string
  title: string
  index: string
  badge: string
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-surface-alt/80 group/preview">
      {/* Minimal Studio Browser Bar */}
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-border bg-surface/90">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-2 h-2 rounded-full bg-border" />
          <span className="w-2 h-2 rounded-full bg-border" />
          <span className="w-2 h-2 rounded-full bg-border" />
        </div>
        <span className="font-mono text-[10px] text-muted truncate max-w-[180px]">
          {title.toLowerCase()} // {index}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-lime text-[#141A27] font-semibold">
          {badge}
        </span>
      </div>

      {/* Consistent 16:10 Image Ratio */}
      <div className="aspect-[16/10] w-full overflow-hidden bg-surface-alt">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover/preview:scale-[1.03]"
        />
      </div>
    </div>
  )
}

function CaseStudyModal({
  project,
  onClose,
}: {
  project: ProjectItem
  onClose: () => void
}) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
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
        transition={{ duration: 0.26, ease: STUDIO_EASE }}
        className="relative z-10 w-full max-w-4xl studio-card rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-7"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-border pb-5">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-lime text-[#141A27]">
                {project.index}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-accent">
                {project.categories.join(' · ')} · {project.year}
              </span>
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-4xl text-ink pt-1">
              {project.title}
            </h3>
            <p className="font-mono text-xs text-muted">
              {project.tagline} · Role: {project.role}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="p-2 rounded-lg border border-border bg-surface-alt/60 text-muted hover:text-ink transition-colors cursor-pointer shrink-0"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Screenshot */}
        <div className="space-y-2">
          <h4 className="font-mono text-xs uppercase tracking-wider text-accent">
            Product Preview / Screenshot
          </h4>
          <ProductPreviewFrame
            src={project.previewImage}
            alt={project.previewAlt}
            title={project.title}
            index={project.index}
            badge={project.category}
          />
        </div>

        {/* Overview & Contribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-2xl bg-surface-alt/60 border border-border p-5 space-y-2">
            <h4 className="font-mono text-xs uppercase tracking-wider text-accent">
              Overview
            </h4>
            <p className="text-sm text-ink/90 leading-relaxed">{project.summary}</p>
          </div>

          <div className="rounded-2xl bg-surface-alt/60 border border-border p-5 space-y-2">
            <h4 className="font-mono text-xs uppercase tracking-wider text-accent">
              My Specific Contribution
            </h4>
            <p className="text-sm text-ink/90 leading-relaxed">{project.contribution}</p>
          </div>
        </div>

        {/* Problem & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <h4 className="font-mono text-xs uppercase tracking-wider text-accent">
              Problem Statement
            </h4>
            <p className="text-sm text-muted leading-relaxed">{project.problemSolved}</p>
          </div>

          <div className="space-y-2">
            <h4 className="font-mono text-xs uppercase tracking-wider text-accent">
              Solution
            </h4>
            <p className="text-sm text-muted leading-relaxed">{project.solution}</p>
          </div>
        </div>

        {/* Architecture */}
        <div className="rounded-2xl border border-border bg-surface-alt/40 p-5 space-y-2">
          <h4 className="font-mono text-xs uppercase tracking-wider text-accent">
            System Architecture
          </h4>
          <p className="text-sm text-ink/90 leading-relaxed">{project.architecture}</p>
        </div>

        {/* Technology Decisions */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs uppercase tracking-wider text-accent">
            Technology Decisions
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.techDecisions.map((item) => (
              <div
                key={item.tech}
                className="rounded-xl border border-border bg-surface-alt/50 p-4 space-y-1"
              >
                <div className="font-mono text-xs font-semibold text-ink">{item.tech}</div>
                <p className="text-xs text-muted leading-relaxed">{item.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features & Challenges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-accent">
              Important Features
            </h4>
            <ul className="space-y-2 border-l-2 border-lime pl-4">
              {project.features.map((feat, i) => (
                <li key={i} className="text-sm text-muted leading-relaxed">
                  {feat}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-accent">
              Technical Challenges
            </h4>
            <ul className="space-y-2 border-l-2 border-accent/50 pl-4">
              {project.challenges.map((ch, i) => (
                <li key={i} className="text-sm text-muted leading-relaxed">
                  {ch}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actual Documented Outcomes */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs uppercase tracking-wider text-accent">
            Documented Outcomes
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.outcomes.map((out, i) => (
              <div
                key={i}
                className="rounded-xl bg-surface-alt/70 border border-border px-4 py-3 text-sm text-ink/90"
              >
                {out}
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="space-y-2.5">
          <h4 className="font-mono text-xs uppercase tracking-wider text-accent">
            Complete Stack
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span key={t} className="tech-pill">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-accent text-accent-ink font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <span>Launch Live Demo</span>
              <ArrowUpRightIcon className="w-4 h-4" />
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-border bg-surface-alt/70 text-ink font-medium text-sm hover:border-accent/50 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>View GitHub Repository</span>
          </a>
        </div>
      </motion.div>
    </div>
  )
}

function FeaturedProductCard({
  project,
  onOpenCaseStudy,
}: {
  project: ProjectItem
  onOpenCaseStudy: (project: ProjectItem) => void
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.32, ease: STUDIO_EASE }}
      className="studio-card rounded-3xl p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
    >
      {/* Large Product Preview */}
      <div className="lg:col-span-7">
        <ProductPreviewFrame
          src={project.previewImage}
          alt={project.previewAlt}
          title={project.title}
          index={project.index}
          badge="Featured"
        />
      </div>

      {/* Product Details */}
      <div className="lg:col-span-5 space-y-5">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-xs uppercase tracking-wider text-accent font-medium">
            {project.categories.join(' · ')}
          </span>
          <span className="font-mono text-xs text-muted">{project.year}</span>
        </div>

        <div>
          <h3 className="font-display font-bold text-3xl sm:text-4xl text-ink tracking-tight">
            {project.title}
          </h3>
          <p className="font-mono text-xs text-muted mt-1">
            {project.tagline} · {project.role}
          </p>
        </div>

        <p className="text-sm sm:text-base text-muted leading-relaxed">{project.summary}</p>

        {/* Contribution & Problem */}
        <div className="space-y-3 rounded-2xl bg-surface-alt/65 border border-border p-4 text-xs leading-relaxed">
          <div>
            <span className="font-mono uppercase tracking-wider text-accent block mb-0.5">
              My Contribution
            </span>
            <p className="text-ink/90">{project.contribution}</p>
          </div>
          <div className="pt-2 border-t border-border/70">
            <span className="font-mono uppercase tracking-wider text-accent block mb-0.5">
              Problem Solved
            </span>
            <p className="text-muted">{project.problemSolved}</p>
          </div>
        </div>

        {/* Actual Outcomes */}
        <div className="grid grid-cols-2 gap-2.5">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl bg-surface-alt/70 border border-border px-3.5 py-2.5"
            >
              <div className="font-display font-bold text-base text-ink">{m.value}</div>
              <div className="font-mono text-[11px] text-muted mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Expandable Implementation Details */}
        <div>
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            className="font-mono text-xs text-accent hover:underline cursor-pointer"
          >
            {expanded ? '− Hide implementation details' : '+ Expand implementation details'}
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22, ease: STUDIO_EASE }}
                className="overflow-hidden"
              >
                <div className="mt-3 space-y-2 border-l-2 border-accent/50 pl-3.5 text-xs text-muted leading-relaxed">
                  <p className="text-ink/90">{project.architecture}</p>
                  <ul className="space-y-1.5 pt-1">
                    {project.highlights.map((h, i) => (
                      <li key={i}>• {h}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 7).map((t) => (
            <span key={t} className="tech-pill">
              {t}
            </span>
          ))}
          {project.tech.length > 7 && (
            <span className="tech-pill">+{project.tech.length - 7}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2">
          <button
            type="button"
            onClick={() => onOpenCaseStudy(project)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-accent text-accent-ink font-medium text-xs hover:opacity-90 transition-opacity cursor-pointer"
          >
            <span>Read Case Study</span>
            <ArrowUpRightIcon className="w-3.5 h-3.5" />
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-border bg-surface text-ink font-medium text-xs hover:border-accent/50 transition-colors"
            >
              <span>Live Demo</span>
              <ArrowUpRightIcon className="w-3.5 h-3.5" />
            </a>
          )}

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-border bg-surface-alt/60 text-ink font-medium text-xs hover:border-accent/50 transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </motion.article>
  )
}

function ProductShowcaseCard({
  project,
  onOpenCaseStudy,
}: {
  project: ProjectItem
  onOpenCaseStudy: (project: ProjectItem) => void
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.28, ease: STUDIO_EASE }}
      className="studio-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between h-full group hover:border-accent/45"
    >
      <div className="space-y-5">
        <ProductPreviewFrame
          src={project.previewImage}
          alt={project.previewAlt}
          title={project.title}
          index={project.index}
          badge={project.category}
        />

        {/* Meta & Title */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-accent">
              {project.role}
            </span>
            <span className="font-mono text-xs text-muted">{project.year}</span>
          </div>
          <h3 className="font-display font-bold text-2xl text-ink tracking-tight group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="font-mono text-xs text-muted mt-0.5">{project.tagline}</p>
        </div>

        <p className="text-sm text-muted leading-relaxed">{project.summary}</p>

        {/* Contribution & Problem Solved */}
        <div className="space-y-2.5 rounded-xl bg-surface-alt/60 border border-border p-3.5 text-xs leading-relaxed">
          <div>
            <span className="font-mono uppercase tracking-wider text-accent block mb-0.5">
              Contribution
            </span>
            <p className="text-ink/90">{project.contribution}</p>
          </div>
          <div className="pt-2 border-t border-border/70">
            <span className="font-mono uppercase tracking-wider text-accent block mb-0.5">
              Problem Solved
            </span>
            <p className="text-muted">{project.problemSolved}</p>
          </div>
        </div>

        {/* Outcomes */}
        <div className="grid grid-cols-2 gap-2.5">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl bg-surface-alt/70 border border-border px-3 py-2"
            >
              <div className="font-display font-bold text-sm text-ink">{m.value}</div>
              <div className="font-mono text-[11px] text-muted mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Expandable Implementation Details */}
        <div>
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            className="font-mono text-xs text-accent hover:underline cursor-pointer"
          >
            {expanded ? '− Hide implementation details' : '+ Expand implementation details'}
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22, ease: STUDIO_EASE }}
                className="overflow-hidden"
              >
                <ul className="mt-2.5 space-y-1.5 border-l-2 border-accent/50 pl-3 text-xs text-muted leading-relaxed">
                  {project.highlights.map((h, i) => (
                    <li key={i}>• {h}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tech Pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 6).map((t) => (
            <span key={t} className="tech-pill">
              {t}
            </span>
          ))}
          {project.tech.length > 6 && (
            <span className="tech-pill">+{project.tech.length - 6}</span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="space-y-2.5 pt-5 mt-6 border-t border-border">
        <button
          type="button"
          onClick={() => onOpenCaseStudy(project)}
          className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-lg border border-border bg-surface-alt/60 text-ink font-mono text-xs hover:border-accent/60 hover:text-accent transition-colors cursor-pointer"
        >
          <span>Read Case Study</span>
          <ArrowUpRightIcon className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-2.5">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-accent text-accent-ink font-medium text-xs hover:opacity-90 transition-opacity"
            >
              <span>Live Demo</span>
              <ArrowUpRightIcon className="w-3.5 h-3.5" />
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${
              project.liveUrl ? '' : 'flex-1'
            } inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-border bg-surface text-ink font-medium text-xs hover:border-accent/50 transition-colors`}
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>{project.liveUrl ? 'Source' : 'GitHub'}</span>
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export function ProjectsSection({
  selectedCaseStudy,
  onSelectCaseStudy,
}: ProjectsSectionProps) {
  const [filter, setFilter] = useState<'All' | ProjectCategory>('All')

  const visibleProjects =
    filter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.categories.includes(filter))

  const [featuredProject, ...secondaryProjects] = visibleProjects

  return (
    <section id="projects" className="py-20 md:py-28 max-w-7xl mx-auto px-5 md:px-8">
      <Reveal>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="editorial-eyebrow">01 / Software Product Showcase</span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight text-ink">
              Featured Projects
            </h2>
            <p className="text-muted text-base leading-relaxed">
              Full-stack platforms, Spring AI RAG systems, and RESTful backends — engineered from schema design to containerized deployment.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="inline-flex flex-wrap gap-1.5 p-1 rounded-xl bg-surface-alt border border-border self-start">
            {FILTER_CATEGORIES.map((cat) => {
              const isSelected = filter === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={`relative px-3.5 py-2 rounded-lg font-mono text-xs transition-colors cursor-pointer ${
                    isSelected ? 'text-ink font-semibold' : 'text-muted hover:text-ink'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="projectFilterPill"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-lg bg-surface border border-border shadow-xs"
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              )
            })}
          </div>
        </div>
      </Reveal>

      {/* Product Showcase Layout */}
      <div className="space-y-8">
        <AnimatePresence mode="wait">
          {featuredProject && (
            <FeaturedProductCard
              key={`${filter}-${featuredProject.id}`}
              project={featuredProject}
              onOpenCaseStudy={onSelectCaseStudy}
            />
          )}
        </AnimatePresence>

        {secondaryProjects.length > 0 && (
          <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {secondaryProjects.map((project) => (
                <ProductShowcaseCard
                  key={project.id}
                  project={project}
                  onOpenCaseStudy={onSelectCaseStudy}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedCaseStudy && (
          <CaseStudyModal
            key={selectedCaseStudy.id}
            project={selectedCaseStudy}
            onClose={() => onSelectCaseStudy(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
