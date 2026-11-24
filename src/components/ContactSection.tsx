import { useState } from 'react'
import { LINKS, PROFILE } from '../data/portfolio'
import {
  ArrowUpRightIcon,
  CheckIcon,
  CopyIcon,
  DocumentIcon,
  GithubIcon,
  LeetcodeIcon,
  LinkedinIcon,
} from './Icons'
import { MagneticWrap } from './MagneticButton'
import { Reveal } from './Reveal'

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

export function ContactSection() {
  const [copied, setCopied] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [inquiryType, setInquiryType] = useState('SDE / Backend Role')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [errorBanner, setErrorBanner] = useState('')

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      window.location.href = `mailto:${PROFILE.email}`
    }
  }

  const validate = (): FormErrors => {
    const next: FormErrors = {}
    if (name.trim().length < 2) {
      next.name = 'Please enter your name (at least 2 characters).'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'Please enter a valid work or personal email address.'
    }
    if (message.trim().length < 10) {
      next.message = 'Please include a brief message (at least 10 characters).'
    }
    return next
  }

  const buildMailtoHref = () => {
    const subject = encodeURIComponent(`[${inquiryType}] Inquiry from ${name.trim()}`)
    const body = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\nTopic: ${inquiryType}\n\n${message.trim()}`,
    )
    return `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorBanner('')
    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setStatus('error')
      setErrorBanner('Please fix the highlighted fields before sending.')
      return
    }

    setStatus('loading')
    try {
      await new Promise((resolve) => setTimeout(resolve, 450))
      window.location.href = buildMailtoHref()
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorBanner(
        `Could not open your email client automatically. Please email ${PROFILE.email} directly.`,
      )
    }
  }

  const handleResetForm = () => {
    setName('')
    setEmail('')
    setMessage('')
    setErrors({})
    setErrorBanner('')
    setStatus('idle')
  }

  return (
    <>
      <section id="contact" className="py-20 md:py-28 border-t border-border max-w-7xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="studio-card rounded-3xl p-7 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Editorial Info & Direct Channels */}
            <div className="lg:col-span-5 space-y-6">
              <span className="editorial-eyebrow">05 / Get In Touch</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-ink leading-[1.1]">
                Let&apos;s connect about engineering roles.
              </h2>
              <p className="text-muted text-sm sm:text-base leading-relaxed">
                Based in {PROFILE.location}. Actively open to Software Development Engineer, Java Backend, and Full-Stack opportunities.
              </p>

              {/* Quick Direct Actions */}
              <div className="flex flex-wrap items-center gap-2.5">
                <MagneticWrap>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-xs transition-all cursor-pointer ${
                      copied
                        ? 'bg-lime text-[#141A27]'
                        : 'bg-accent text-accent-ink hover:opacity-90'
                    }`}
                  >
                    {copied ? <CheckIcon className="w-3.5 h-3.5" /> : <CopyIcon className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Email Copied' : 'Copy Email'}</span>
                  </button>
                </MagneticWrap>

                <a
                  href={PROFILE.resumeUrl}
                  download="Akash_Kumar_Resume.pdf"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-surface-alt/70 text-ink font-medium text-xs hover:border-accent/50 transition-colors"
                >
                  <DocumentIcon className="w-3.5 h-3.5 text-accent" />
                  <span>Download Resume</span>
                </a>
              </div>

              <div aria-live="polite" className="sr-only">
                {copied ? `Copied ${PROFILE.email} to clipboard` : ''}
              </div>

              {/* Direct Contact Directory */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-surface-alt/50 hover:border-accent/50 transition-colors"
                >
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-muted">Email</div>
                    <div className="text-xs sm:text-sm font-medium text-ink break-all mt-0.5">{PROFILE.email}</div>
                  </div>
                  <ArrowUpRightIcon className="w-4 h-4 text-muted shrink-0" />
                </a>

                <a
                  href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-surface-alt/50 hover:border-accent/50 transition-colors"
                >
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-muted">Phone</div>
                    <div className="text-xs sm:text-sm font-medium text-ink mt-0.5">{PROFILE.phone}</div>
                  </div>
                  <ArrowUpRightIcon className="w-4 h-4 text-muted shrink-0" />
                </a>

                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  <a
                    href={LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-1 p-3 rounded-xl border border-border bg-surface-alt/50 hover:border-accent/50 text-ink transition-colors"
                  >
                    <LinkedinIcon className="w-4 h-4 text-accent" />
                    <span className="font-mono text-[11px]">LinkedIn</span>
                  </a>

                  <a
                    href={LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-1 p-3 rounded-xl border border-border bg-surface-alt/50 hover:border-accent/50 text-ink transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span className="font-mono text-[11px]">GitHub</span>
                  </a>

                  <a
                    href={LINKS.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-1 p-3 rounded-xl border border-border bg-surface-alt/50 hover:border-accent/50 text-ink transition-colors"
                  >
                    <LeetcodeIcon className="w-4 h-4 text-accent" />
                    <span className="font-mono text-[11px]">LeetCode</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Accessible Contact Form */}
            <div className="lg:col-span-7 rounded-2xl border border-border bg-surface-alt/40 p-6 sm:p-8">
              {status === 'success' ? (
                <div role="status" aria-live="polite" className="space-y-4 py-6">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-lime text-[#141A27]">
                    <CheckIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-ink">
                    Message Ready to Send
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    Your email draft has been prepared for <strong className="text-ink">{PROFILE.email}</strong>. If your mail app did not open automatically, use the button below or copy the email address.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href={buildMailtoHref()}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-accent-ink font-medium text-xs"
                    >
                      <span>Open Email Draft</span>
                      <ArrowUpRightIcon className="w-3.5 h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="px-4 py-2.5 rounded-lg border border-border bg-surface text-ink font-mono text-xs cursor-pointer hover:border-accent/50"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <h3 className="font-display font-bold text-lg text-ink">
                      Send a Direct Message
                    </h3>
                    <span className="font-mono text-[11px] text-muted">* Required</span>
                  </div>

                  {status === 'error' && errorBanner && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs text-red-600 dark:text-red-300"
                    >
                      {errorBanner}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="block font-mono text-xs text-ink">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value)
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }))
                        }}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        placeholder="Priya Sharma"
                        className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:border-accent"
                      />
                      {errors.name && (
                        <p id="contact-name-error" className="text-xs text-red-600 dark:text-red-400">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="block font-mono text-xs text-ink">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
                        }}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        placeholder="recruiter@company.com"
                        className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:border-accent"
                      />
                      {errors.email && (
                        <p id="contact-email-error" className="text-xs text-red-600 dark:text-red-400">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-topic" className="block font-mono text-xs text-ink">
                      Opportunity / Inquiry Type
                    </label>
                    <select
                      id="contact-topic"
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:border-accent"
                    >
                      <option value="SDE / Backend Role">SDE / Backend Engineering Role</option>
                      <option value="Software Engineering Internship">Software Engineering Internship</option>
                      <option value="Full-Stack / AI Collaboration">Full-Stack / AI Collaboration</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="block font-mono text-xs text-ink">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value)
                        if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }))
                      }}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      placeholder="Share details about the role, team, or interview timeline..."
                      className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:border-accent resize-y"
                    />
                    {errors.message && (
                      <p id="contact-message-error" className="text-xs text-red-600 dark:text-red-400">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent text-accent-ink font-medium text-sm hover:opacity-90 disabled:opacity-60 transition-opacity cursor-pointer"
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-accent-ink/30 border-t-accent-ink animate-spin" />
                        <span>Preparing Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowUpRightIcon className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted">
          <span>
            &copy; {new Date().getFullYear()} {PROFILE.name} · {PROFILE.location}
          </span>
          <div className="flex flex-wrap items-center gap-5">
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
              LinkedIn
            </a>
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
              GitHub
            </a>
            <a href={LINKS.leetcode} target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
              LeetCode
            </a>
            <a href={LINKS.careerForge} target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
              CareerForge
            </a>
            <a href={LINKS.docIntellect} target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
              DocIntellect
            </a>
            <a href={LINKS.stayFinder} target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
              StayFinder
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
