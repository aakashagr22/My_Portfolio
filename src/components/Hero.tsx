import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { HERO_METRICS, LINKS, PROFILE } from '../data/portfolio'
import { ArrowUpRightIcon, DocumentIcon, GithubIcon, LeetcodeIcon, LinkedinIcon } from './Icons'
import { MagneticWrap } from './MagneticButton'
import { InteractiveTerminal } from './InteractiveTerminal'

type ArchNodeId = 'core' | 'ai' | 'cloud' | 'data'
type StudioTab = 'topology' | 'terminal'

const STUDIO_EASE = [0.22, 1, 0.36, 1] as const

const ARCH_NODES: Record<
  ArchNodeId,
  { code: string; title: string; subtitle: string; detail: string }
> = {
  core: {
    code: '00 // CORE',
    title: 'Java 21 & Spring Boot 3',
    subtitle: 'REST APIs · OpenFeign · Eureka · Resilience4j',
    detail:
      'Engineered NeoBank with 3 independent microservices and Resilience4j Circuit Breaker/Retry patterns for 99.9% inter-service reliability.',
  },
  ai: {
    code: '01 // AI & RAG',
    title: 'Spring AI, RAG & MCP',
    subtitle: 'pgvector · Apache Tika · Groq API',
    detail:
      'Built DocIntellect with Retrieval-Augmented Generation for verifiable citations and Model Context Protocol (MCP) tool calling.',
  },
  cloud: {
    code: '02 // CLOUD & OPS',
    title: 'Kafka, AWS EC2 & Observability',
    subtitle: 'Docker · Prometheus · Grafana · Loki · Tempo',
    detail:
      'Deployed event-driven Kafka services on AWS EC2 and orchestrated DRDO monitoring that reduced incident detection time by 30%.',
  },
  data: {
    code: '03 // DATA & AUTH',
    title: 'PostgreSQL, MongoDB & Security',
    subtitle: 'JWT · OAuth 2.0 · BCrypt · Flyway',
    detail:
      'Designed indexed MongoDB schemas for 30+ StayFinder APIs and secured full-stack platforms with OAuth 2.0, JWT, and Flyway migrations.',
  },
}

export function Hero({ onOpenQuickView }: { onOpenQuickView: () => void }) {
  const [activeNode, setActiveNode] = useState<ArchNodeId>('core')
  const [studioTab, setStudioTab] = useState<StudioTab>('topology')
  const active = ARCH_NODES[activeNode]

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 editorial-grid border-b border-border">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Asymmetric Editorial Column */}
          <div className="lg:col-span-7 space-y-7">
            {/* Status & Location Strip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: STUDIO_EASE }}
              className="flex flex-wrap items-center gap-3"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime text-[#141A27] font-mono text-[11px] font-semibold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#141A27]" />
                Open to SWE &amp; Backend Roles
              </span>
              <span className="font-mono text-xs text-muted">
                {PROFILE.location} · B.Tech IT &apos;27
              </span>
            </motion.div>

            {/* Expressive Editorial Headline */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.48, delay: 0.05, ease: STUDIO_EASE }}
              className="space-y-4"
            >
              <p className="editorial-eyebrow">00 / Software Engineer &amp; Backend Architect</p>
              <h1 className="text-4xl sm:text-6xl lg:text-[4.25rem] font-display font-bold tracking-tight leading-[1.04] text-ink">
                Engineering resilient{' '}
                <span className="text-accent">Java backends</span> &amp;{' '}
                <span className="underline decoration-lime decoration-4 underline-offset-8">
                  AI systems.
                </span>
              </h1>
            </motion.div>

            {/* Concise Bio */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.48, delay: 0.1, ease: STUDIO_EASE }}
              className="text-base sm:text-lg text-muted leading-relaxed max-w-2xl"
            >
              {PROFILE.summary}
            </motion.p>

            {/* Primary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.48, delay: 0.15, ease: STUDIO_EASE }}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <MagneticWrap>
                <button
                  type="button"
                  onClick={scrollToProjects}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-ink font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <span>Explore Selected Work</span>
                  <ArrowUpRightIcon className="w-4 h-4" />
                </button>
              </MagneticWrap>

              <a
                href={PROFILE.resumeUrl}
                download="Akash_Kumar_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-border bg-surface text-ink font-medium text-sm hover:border-accent/50 transition-colors"
              >
                <DocumentIcon className="w-4 h-4 text-accent" />
                <span>Download Resume</span>
              </a>

              <button
                type="button"
                onClick={onOpenQuickView}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-accent/40 bg-accent/10 text-accent font-mono text-xs font-medium hover:bg-accent hover:text-accent-ink transition-colors cursor-pointer"
              >
                <span>Recruiter Quick View</span>
              </button>

              <div className="flex items-center gap-2 pl-1">
                <a
                  href={LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-surface text-muted hover:text-accent hover:border-accent/50 transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-surface text-muted hover:text-ink hover:border-ink/40 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={LINKS.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LeetCode"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-surface text-muted hover:text-accent hover:border-accent/50 transition-colors"
                >
                  <LeetcodeIcon className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Studio Architecture & Interactive Terminal Panel */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: STUDIO_EASE }}
            className="lg:col-span-5"
          >
            <div className="studio-card rounded-2xl p-6 space-y-5">
              <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
                <div>
                  <span className="editorial-eyebrow block">Studio Console</span>
                  <h2 className="font-display font-semibold text-lg text-ink mt-0.5">
                    {studioTab === 'topology' ? 'System Stack Topology' : 'Interactive Terminal'}
                  </h2>
                </div>

                {/* Segmented Tab Switcher */}
                <div className="inline-flex p-1 rounded-lg bg-surface-alt border border-border">
                  <button
                    type="button"
                    onClick={() => setStudioTab('topology')}
                    className={`px-2.5 py-1 rounded-md font-mono text-[11px] transition-all cursor-pointer ${
                      studioTab === 'topology'
                        ? 'bg-surface text-ink font-medium shadow-xs'
                        : 'text-muted hover:text-ink'
                    }`}
                  >
                    Topology
                  </button>
                  <button
                    type="button"
                    onClick={() => setStudioTab('terminal')}
                    className={`px-2.5 py-1 rounded-md font-mono text-[11px] transition-all cursor-pointer ${
                      studioTab === 'terminal'
                        ? 'bg-surface text-ink font-medium shadow-xs'
                        : 'text-muted hover:text-ink'
                    }`}
                  >
                    Terminal &gt;_
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {studioTab === 'topology' ? (
                  <motion.div
                    key="topology"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2, ease: STUDIO_EASE }}
                    className="space-y-4"
                  >
                    {/* Interactive Node Selector Grid */}
                    <div className="grid grid-cols-2 gap-2.5" role="tablist" aria-label="Architecture layers">
                      {(Object.keys(ARCH_NODES) as ArchNodeId[]).map((nodeId) => {
                        const node = ARCH_NODES[nodeId]
                        const isSelected = activeNode === nodeId
                        return (
                          <button
                            key={nodeId}
                            type="button"
                            role="tab"
                            aria-selected={isSelected}
                            onClick={() => setActiveNode(nodeId)}
                            onMouseEnter={() => setActiveNode(nodeId)}
                            className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-accent text-accent-ink border-accent shadow-sm'
                                : 'bg-surface-alt/70 text-ink border-border hover:border-accent/40'
                            }`}
                          >
                            <div
                              className={`font-mono text-[10px] uppercase tracking-wider ${
                                isSelected ? 'opacity-85' : 'text-muted'
                              }`}
                            >
                              {node.code}
                            </div>
                            <div className="font-display font-semibold text-sm mt-1 leading-snug">
                              {node.title.split('&')[0].trim()}
                            </div>
                          </button>
                        )
                      })}
                    </div>

                    {/* Active Layer Details */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeNode}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18, ease: STUDIO_EASE }}
                        className="rounded-xl bg-surface-alt/70 border border-border p-4 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-xs font-semibold text-accent">{active.title}</span>
                          <span className="w-2 h-2 rounded-full bg-lime" />
                        </div>
                        <p className="font-mono text-[11px] text-muted">{active.subtitle}</p>
                        <p className="text-sm text-ink/90 leading-relaxed pt-1">{active.detail}</p>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    key="terminal"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2, ease: STUDIO_EASE }}
                  >
                    <InteractiveTerminal />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Bottom Editorial Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: STUDIO_EASE }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-14 pt-8 border-t border-border"
        >
          {HERO_METRICS.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="font-display font-bold text-3xl sm:text-4xl text-ink tracking-tight">
                {item.value}
              </div>
              <div className="font-medium text-sm text-ink">{item.label}</div>
              <div className="font-mono text-xs text-muted">{item.context}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
