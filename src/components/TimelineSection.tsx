import { useEffect, useRef, useState } from 'react'
import { CERTIFICATES, EDUCATION, EXPERIENCE, HIGHLIGHTS_GALLERY } from '../data/portfolio'
import { Reveal } from './Reveal'

export function TimelineSection() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let rafId = 0

    const updateProgress = () => {
      const el = timelineRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const viewportH = window.innerHeight
      const start = viewportH * 0.78
      const total = rect.height
      const covered = start - rect.top
      const ratio = Math.max(0, Math.min(1, covered / Math.max(1, total)))
      setProgress(ratio)
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <>
      {/* ── EXPERIENCE & EDUCATION TIMELINE ── */}
      <section id="experience" className="py-20 md:py-28 border-t border-border max-w-7xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="space-y-3 max-w-2xl mb-14">
            <span className="editorial-eyebrow">03 / Career &amp; Academic Trajectory</span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight text-ink">
              Experience &amp; Education
            </h2>
            <p className="text-muted text-base leading-relaxed">
              Industry internships building distributed banking microservices on AWS and real-time observability stacks, paired with B.Tech studies in Information Technology.
            </p>
          </div>
        </Reveal>

        <div ref={timelineRef} className="relative pl-6 sm:pl-10 space-y-10">
          {/* Background Rail */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-2 bottom-2 w-[2px] bg-border rounded-full"
          />
          {/* Scroll-Animated Progress Rail */}
          <div
            aria-hidden="true"
            style={{
              transform: `scaleY(${progress})`,
              transformOrigin: 'top',
            }}
            className="absolute left-0 top-2 bottom-2 w-[2px] bg-accent rounded-full transition-transform duration-100 ease-out"
          />

          {EXPERIENCE.map((exp, idx) => (
            <Reveal key={exp.company} delayMs={idx * 90}>
              <div className="relative">
                {/* Timeline Marker */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[30px] sm:-left-[46px] top-6 w-3.5 h-3.5 rounded-full bg-accent ring-4 ring-bg"
                />

                <article className="studio-card studio-card-hover rounded-2xl p-6 sm:p-8 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-border pb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                        <span className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded bg-lime text-[#141A27] font-semibold">
                          {exp.type}
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded bg-surface-alt border border-border text-accent font-medium">
                          {exp.impactBadge}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-ink">
                        {exp.role}
                      </h3>
                      <p className="font-medium text-sm text-accent mt-0.5">{exp.company}</p>
                    </div>

                    <div className="sm:text-right font-mono text-xs text-muted space-y-0.5 shrink-0">
                      <div className="text-ink font-medium">{exp.period}</div>
                      <div>{exp.location}</div>
                    </div>
                  </div>

                  <ul className="space-y-2.5">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
                        <span
                          aria-hidden="true"
                          className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.tech.map((t) => (
                      <span key={t} className="tech-pill">
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              </div>
            </Reveal>
          ))}

          {/* Education Node */}
          <Reveal delayMs={180}>
            <div className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[30px] sm:-left-[46px] top-6 w-3.5 h-3.5 rounded-full bg-lime ring-4 ring-bg border border-ink/20"
              />

              <article className="studio-card studio-card-hover rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-medium">
                      Education
                    </span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-ink">
                      {EDUCATION.institution}
                    </h3>
                    <p className="text-sm text-muted">{EDUCATION.degree}</p>
                  </div>

                  <div className="sm:text-right space-y-1 shrink-0">
                    <div className="inline-block font-mono font-bold text-base px-3 py-1 rounded-lg bg-lime text-[#141A27]">
                      {EDUCATION.grade}
                    </div>
                    <div className="font-mono text-xs text-muted">
                      {EDUCATION.period} · {EDUCATION.location}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CERTIFICATION & ACHIEVEMENT GALLERY ── */}
      <section id="credentials" className="py-20 md:py-24 border-t border-border bg-surface-alt/35">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="space-y-3 max-w-2xl mb-12">
              <span className="editorial-eyebrow">04 / Credentials &amp; Verified Outcomes</span>
              <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight text-ink">
                Certifications &amp; Impact Gallery
              </h2>
              <p className="text-muted text-base leading-relaxed">
                Completed engineering coursework alongside measurable outcomes delivered across internships and projects.
              </p>
            </div>
          </Reveal>

          {/* Verified Engineering Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {HIGHLIGHTS_GALLERY.map((item, idx) => (
              <Reveal key={item.title} delayMs={idx * 70}>
                <div className="studio-card studio-card-hover rounded-2xl p-6 h-full flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="font-display font-bold text-4xl text-accent tracking-tight">
                      {item.metric}
                    </div>
                    <h3 className="font-display font-bold text-lg text-ink">{item.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{item.detail}</p>
                  </div>
                  <div className="pt-3 border-t border-border font-mono text-[11px] uppercase tracking-wider text-muted">
                    {item.source}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Certificates Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CERTIFICATES.map((cert, idx) => (
              <Reveal key={cert.title} delayMs={idx * 80}>
                <div className="studio-card studio-card-hover rounded-2xl p-6 flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded bg-surface-alt border border-border text-accent">
                        {cert.issuer}
                      </span>
                      <span className="font-mono text-[11px] text-muted">{cert.category}</span>
                    </div>
                    <h3 className="font-display font-bold text-xl text-ink pt-1">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed">{cert.detail}</p>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-lime shrink-0 mt-2" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
