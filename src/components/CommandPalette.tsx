import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { LINKS, NAV_ITEMS, PROFILE, PROJECTS, type ProjectItem } from '../data/portfolio'
import { ArrowUpRightIcon, CloseIcon } from './Icons'

interface CommandAction {
  id: string
  group: string
  label: string
  hint: string
  perform: () => void
}

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  onSelectProject: (project: ProjectItem) => void
  onOpenQuickView: () => void
}

const STUDIO_EASE = [0.22, 1, 0.36, 1] as const

export function CommandPalette({
  open,
  onClose,
  theme,
  onToggleTheme,
  onSelectProject,
  onOpenQuickView,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const actions = useMemo<CommandAction[]>(() => {
    const navActions: CommandAction[] = NAV_ITEMS.map((item) => ({
      id: `nav-${item.id}`,
      group: 'Navigation',
      label: `Go to ${item.label}`,
      hint: `#${item.id}`,
      perform: () => {
        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
        onClose()
      },
    }))

    const projectActions: CommandAction[] = PROJECTS.map((proj) => ({
      id: `proj-${proj.id}`,
      group: 'Case Studies',
      label: `Inspect ${proj.title}`,
      hint: proj.tagline,
      perform: () => {
        onSelectProject(proj)
        onClose()
      },
    }))

    const utilityActions: CommandAction[] = [
      {
        id: 'act-quickview',
        group: 'Recruiter',
        label: 'Open Recruiter Quick View',
        hint: 'Executive brief',
        perform: () => {
          onClose()
          onOpenQuickView()
        },
      },
      {
        id: 'act-resume',
        group: 'Actions',
        label: 'Open Resume PDF',
        hint: 'Akash_Kumar_Resume.pdf',
        perform: () => {
          window.open(PROFILE.resumeUrl, '_blank', 'noopener,noreferrer')
          onClose()
        },
      },
      {
        id: 'act-email',
        group: 'Actions',
        label: 'Copy Email Address',
        hint: PROFILE.email,
        perform: () => {
          navigator.clipboard?.writeText(PROFILE.email)
          onClose()
        },
      },
      {
        id: 'act-theme',
        group: 'Actions',
        label: theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme',
        hint: 'Theme',
        perform: () => {
          onToggleTheme()
          onClose()
        },
      },
      {
        id: 'soc-linkedin',
        group: 'Links',
        label: 'Open LinkedIn Profile',
        hint: 'External',
        perform: () => {
          window.open(LINKS.linkedin, '_blank', 'noopener,noreferrer')
          onClose()
        },
      },
      {
        id: 'soc-github',
        group: 'Links',
        label: 'Open GitHub Profile',
        hint: 'github.com/aakashagr22',
        perform: () => {
          window.open(LINKS.github, '_blank', 'noopener,noreferrer')
          onClose()
        },
      },
      {
        id: 'soc-leetcode',
        group: 'Links',
        label: 'Open LeetCode Profile',
        hint: 'leetcode.com/u/akashagr22',
        perform: () => {
          window.open(LINKS.leetcode, '_blank', 'noopener,noreferrer')
          onClose()
        },
      },
    ]

    return [...navActions, ...projectActions, ...utilityActions]
  }, [onClose, onOpenQuickView, onSelectProject, onToggleTheme, theme])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return actions
    return actions.filter(
      (a) =>
        a.label.toLowerCase().includes(q) ||
        a.group.toLowerCase().includes(q) ||
        a.hint.toLowerCase().includes(q),
    )
  }, [actions, query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((prev) => (filtered.length ? (prev + 1) % filtered.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) => (filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0))
    } else if (e.key === 'Enter' && filtered[activeIndex]) {
      e.preventDefault()
      filtered[activeIndex].perform()
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          onKeyDown={handleKeyDown}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B1220]/55 backdrop-blur-sm"
          />

          {/* Palette Dialog */}
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: STUDIO_EASE }}
            className="relative z-10 w-full max-w-xl studio-card rounded-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
              <span className="font-mono text-xs text-accent font-semibold">⌘K</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections, case studies, resume, or actions..."
                aria-label="Search commands"
                className="flex-1 bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close command palette"
                className="p-1 rounded-md text-muted hover:text-ink cursor-pointer"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="py-8 text-center font-mono text-xs text-muted">
                  No matching commands found.
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const isActive = idx === activeIndex
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={item.perform}
                      className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-accent text-accent-ink'
                          : 'text-ink hover:bg-surface-alt'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded shrink-0 ${
                            isActive
                              ? 'bg-accent-ink/15 text-accent-ink'
                              : 'bg-surface-alt text-muted border border-border'
                          }`}
                        >
                          {item.group}
                        </span>
                        <span className="text-sm font-medium truncate">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`font-mono text-[11px] hidden sm:inline ${isActive ? 'opacity-85' : 'text-muted'}`}>
                          {item.hint}
                        </span>
                        <ArrowUpRightIcon className="w-3.5 h-3.5 opacity-75" />
                      </div>
                    </button>
                  )
                })
              )}
            </div>

            <div className="px-4 py-2.5 border-t border-border bg-surface-alt/50 flex items-center justify-between font-mono text-[11px] text-muted">
              <span>↑↓ Navigate · Enter Select</span>
              <span>Esc Close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
