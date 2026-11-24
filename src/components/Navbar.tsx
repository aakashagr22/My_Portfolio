import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { NAV_ITEMS, PROFILE, LINKS } from '../data/portfolio'
import {
  CloseIcon,
  DocumentIcon,
  GithubIcon,
  LinkedinIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
} from './Icons'

interface NavbarProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  onOpenPalette: () => void
  onOpenQuickView: () => void
}

const STUDIO_EASE = [0.22, 1, 0.36, 1] as const

export function Navbar({ theme, onToggleTheme, onOpenPalette, onOpenQuickView }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['hero', ...NAV_ITEMS.map((item) => item.id)]
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.1, 0.3, 0.6] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    setMobileOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: STUDIO_EASE }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg/90 backdrop-blur-md border-b border-border py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between gap-4">
        {/* Brand Monogram */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection('hero')
          }}
          className="inline-flex items-center gap-2.5 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded"
        >
          <span className="w-8 h-8 rounded-lg bg-ink text-bg flex items-center justify-center font-display font-bold text-sm tracking-tight transition-transform duration-200 group-hover:scale-105">
            {PROFILE.initials}
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold text-sm tracking-tight text-ink">
              {PROFILE.name}
            </span>
            <span className="font-mono text-[10px] text-muted tracking-wider uppercase mt-0.5">
              Backend &amp; AI Studio
            </span>
          </div>
        </a>

        {/* Desktop Navigation with Motion Active Indicator */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-1 bg-surface/75 backdrop-blur-sm border border-border rounded-xl p-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-accent-ink font-medium' : 'text-muted hover:text-ink'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavPill"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-lg bg-accent -z-0"
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenQuickView}
            className="hidden xl:inline-flex items-center gap-1.5 px-3 h-9 rounded-lg border border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-accent-ink font-mono text-[11px] font-medium transition-colors cursor-pointer"
          >
            <span>Quick View</span>
          </button>

          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open command palette"
            className="hidden lg:inline-flex items-center gap-1.5 px-2.5 h-9 rounded-lg border border-border bg-surface text-muted hover:text-ink hover:border-accent/50 font-mono text-[11px] transition-colors cursor-pointer"
          >
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-surface-alt border border-border text-[10px] text-ink">
              ⌘K
            </kbd>
          </button>

          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-surface text-muted hover:text-accent hover:border-accent/50 transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-surface text-muted hover:text-ink hover:border-ink/30 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-surface text-ink hover:border-accent/50 transition-all duration-200 active:scale-95 cursor-pointer"
          >
            {theme === 'dark' ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
          </button>

          <a
            href={PROFILE.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 h-9 rounded-lg bg-ink text-bg font-mono text-xs font-medium hover:bg-accent hover:text-accent-ink transition-colors"
          >
            <DocumentIcon className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-surface text-ink cursor-pointer"
          >
            {mobileOpen ? <CloseIcon className="w-4 h-4" /> : <MenuIcon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Animated Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: STUDIO_EASE }}
            className="md:hidden overflow-hidden border-t border-border bg-surface/95 backdrop-blur-md"
          >
            <div className="px-5 py-5 space-y-4">
              <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left font-mono text-sm uppercase tracking-wider py-2 border-b border-border/60 transition-colors cursor-pointer ${
                      activeSection === item.id ? 'text-accent font-semibold' : 'text-ink hover:text-accent'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="flex items-center gap-2 pt-2">
                <a
                  href={PROFILE.resumeUrl}
                  download="Akash_Kumar_Resume.pdf"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-accent text-accent-ink font-mono text-xs font-medium"
                >
                  <DocumentIcon className="w-4 h-4" />
                  <span>Download Resume</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false)
                    onOpenQuickView()
                  }}
                  className="px-3.5 py-2.5 rounded-lg border border-accent/40 bg-accent/10 font-mono text-xs text-accent cursor-pointer"
                >
                  Quick View
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
