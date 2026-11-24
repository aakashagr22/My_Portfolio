import { useEffect, useState } from 'react'
import { MotionConfig } from 'motion/react'
import { type ProjectItem } from './data/portfolio'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { ProjectsSection } from './components/ProjectsSection'
import { SkillsSection } from './components/SkillsSection'
import { TimelineSection } from './components/TimelineSection'
import { ContactSection } from './components/ContactSection'
import { CommandPalette } from './components/CommandPalette'
import { RecruiterQuickView } from './components/RecruiterQuickView'

type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const saved = window.localStorage.getItem('portfolio-theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [quickViewOpen, setQuickViewOpen] = useState(false)
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectItem | null>(null)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-bg text-ink selection:bg-accent/20 selection:text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-accent focus:text-accent-ink focus:font-mono focus:text-xs"
        >
          Skip to content
        </a>

        <Navbar
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenPalette={() => setPaletteOpen(true)}
          onOpenQuickView={() => setQuickViewOpen(true)}
        />

        <main id="main-content">
          <Hero onOpenQuickView={() => setQuickViewOpen(true)} />
          <ProjectsSection
            selectedCaseStudy={selectedCaseStudy}
            onSelectCaseStudy={setSelectedCaseStudy}
          />
          <SkillsSection />
          <TimelineSection />
          <ContactSection />
        </main>

        <RecruiterQuickView
          open={quickViewOpen}
          onClose={() => setQuickViewOpen(false)}
          onOpenCaseStudy={(project) => setSelectedCaseStudy(project)}
        />

        <CommandPalette
          open={paletteOpen}
          onClose={() => setPaletteOpen(false)}
          theme={theme}
          onToggleTheme={toggleTheme}
          onSelectProject={(project) => setSelectedCaseStudy(project)}
          onOpenQuickView={() => setQuickViewOpen(true)}
        />
      </div>
    </MotionConfig>
  )
}
