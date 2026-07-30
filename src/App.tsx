import { useState, useEffect } from 'react'

const LINKS = {
  github: 'https://github.com/aakashagr22',
  leetcode: 'https://leetcode.com/u/akashagr22/',
  rentease: 'https://rentease-kr3s.onrender.com/',
  aiSummarizer: 'https://ai-summarizer-3fga.onrender.com/',
  email: 'mailto:akashkumargupta9918@gmail.com',
  phone: 'tel:+919984757701',
}

const NAV_LINKS = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

const SKILLS = [
  { name: 'Java 21', level: 92, cat: 'Language', color: '#F97316' },
  { name: 'Spring Boot 3', level: 90, cat: 'Framework', color: '#10B981' },
  { name: 'Spring Security / JWT', level: 85, cat: 'Security', color: '#3B82F6' },
  { name: 'Spring AI', level: 78, cat: 'AI / LLM', color: '#8B5CF6' },
  { name: 'RESTful API Architecture', level: 92, cat: 'Architecture', color: '#06B6D4' },
  { name: 'Microservices & Feign', level: 86, cat: 'Distributed Sys', color: '#6366F1' },
  { name: 'MongoDB', level: 82, cat: 'NoSQL DB', color: '#10B981' },
  { name: 'MySQL / PostgreSQL', level: 80, cat: 'Relational DB', color: '#3B82F6' },
  { name: 'Docker & Containers', level: 82, cat: 'DevOps', color: '#0284C7' },
  { name: 'Prometheus & Grafana', level: 78, cat: 'Observability', color: '#F59E0B' },
  { name: 'React.js & Tailwind', level: 72, cat: 'Frontend', color: '#38BDF8' },
  { name: 'Git & GitHub Actions', level: 88, cat: 'CI/CD', color: '#64748B' },
]

const PROJECTS = [
  {
    title: 'RentEase',
    subtitle: 'Enterprise Rental Marketplace & Geospatial Platform',
    year: '2025 — Present',
    desc: 'Engineered 30+ secure backend endpoints featuring JWT authentication and Bcrypt hashing. Achieved a 40% query performance optimization through strategic MongoDB indexing. Deployed on Render with Google Maps API integration for geospatial property discovery.',
    tech: ['Java 21', 'Spring Boot', 'MongoDB', 'JWT Auth', 'Google Maps API', 'Render'],
    glowColor: 'rgba(59, 130, 246, 0.35)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
    accentColor: '#3B82F6',
    badgeColor: '#1E40AF',
    stat: '40%',
    statLabel: 'Query Perf. Boost',
    stat2: '30+',
    stat2Label: 'REST Endpoints',
    liveUrl: LINKS.rentease,
    githubUrl: LINKS.github,
    isFeatured: true,
  },
  {
    title: 'AI Summarizer',
    subtitle: 'Intelligent Document Summarization Platform',
    year: '2026 — Present',
    desc: 'Production-ready document intelligence engine powered by OpenAI GPT-4o-mini and Spring AI. Supports PDF, Word, and text parsing via Apache Tika. Containerized with Docker and featuring automated CI/CD deployment workflows via GitHub Actions.',
    tech: ['Java 21', 'Spring Boot', 'Spring AI', 'OpenAI API', 'Apache Tika', 'Docker', 'GitHub Actions'],
    glowColor: 'rgba(139, 92, 246, 0.35)',
    borderColor: 'rgba(139, 92, 246, 0.3)',
    accentColor: '#8B5CF6',
    badgeColor: '#5B21B6',
    stat: 'GPT-4o',
    statLabel: 'AI Model Core',
    stat2: 'CI/CD',
    stat2Label: 'Automated Pipeline',
    liveUrl: LINKS.aiSummarizer,
    githubUrl: LINKS.github,
    isFeatured: true,
  },
]

const EXPERIENCE = [
  {
    role: 'Full Stack Web Development Intern',
    company: 'Khabai Tech',
    period: 'Aug 2025 — Jan 2026',
    location: 'Remote · Patna, Bihar',
    bullets: [
      'Engineered NeoBank — a distributed microservices banking architecture featuring 3 isolated services (Account, Transaction, Fund Transfer) with Spring Boot.',
      'Configured resilient inter-service communication using Feign Client and Eureka Service Registry.',
      'Implemented API Gateway rate-limiting and Resilience4j circuit breakers to guarantee fault tolerance during high traffic bursts.',
    ],
    tech: ['Spring Boot', 'Feign Client', 'Eureka', 'Resilience4j', 'API Gateway'],
    color: '#3B82F6',
  },
  {
    role: 'Software Development Intern',
    company: 'Defence Research and Development Organisation (DRDO)',
    period: 'Jun 2025 — Jul 2025',
    location: 'On-site · New Delhi, India',
    bullets: [
      'Architected a comprehensive microservices observability platform using Docker and Prometheus for real-time telemetry across 3 live backend services.',
      'Achieved a 30% reduction in MTTR (Mean Time to Resolution) by constructing centralized monitoring dashboards in Grafana, Loki, and Tempo.',
      'Authored RESTful endpoints and Swagger API documentation to streamline cross-functional engineering collaboration.',
    ],
    tech: ['Docker', 'Prometheus', 'Grafana', 'Loki', 'Tempo', 'Spring Boot', 'Swagger'],
    color: '#10B981',
  },
]

const EDUCATION = [
  {
    degree: 'Bachelor of Technology — Information Technology',
    institution: 'Bhagwan Parshuram Institute of Technology (BPIT)',
    location: 'New Delhi, India',
    period: 'Aug 2024 — May 2027',
    grade: 'CGPA 8.41 / 10',
    color: '#8B5CF6',
  },
  {
    degree: 'Diploma — Computer Science & Engineering',
    institution: 'Government Polytechnic Unnao',
    location: 'Unnao, UP, India',
    period: 'Aug 2020 — May 2023',
    grade: '70.68%',
    color: '#10B981',
  },
]

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function LeetcodeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226a1.374 1.374 0 0 0-.416.947c0 .367.14.718.416.994l5.406 5.788a1.374 1.374 0 0 0 .961.438c.367 0 .718-.14.994-.416l5.788-5.406a1.374 1.374 0 0 0 .416-.961 1.374 1.374 0 0 0-.416-.994L14.477.438A1.374 1.374 0 0 0 13.483 0zm-7.66 9.387a1.374 1.374 0 0 0-.96.438L.437 14.25a1.374 1.374 0 0 0 0 1.954l4.426 4.425a1.374 1.374 0 0 0 1.954 0l4.426-4.425a1.374 1.374 0 0 0 0-1.954L6.816 9.825a1.374 1.374 0 0 0-.993-.438zM16.14 13.91a1.374 1.374 0 0 0-.96.438l-4.426 4.426a1.374 1.374 0 0 0 0 1.954l4.426 4.425a1.374 1.374 0 0 0 1.954 0l4.425-4.425a1.374 1.374 0 0 0 0-1.954l-4.425-4.426a1.374 1.374 0 0 0-.994-.438z"/>
    </svg>
  )
}

function ExternalIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  )
}

function AmbientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dark Slate Base */}
      <div className="absolute inset-0" style={{ backgroundColor: '#070913' }} />

      {/* Subtle Blue Glow top-left */}
      <div className="absolute rounded-full" style={{
        width: '70vw', height: '70vw',
        background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, rgba(30,58,138,0.04) 50%, transparent 70%)',
        top: '-20%', left: '-15%',
        filter: 'blur(100px)',
      }} />

      {/* Subtle Purple Glow right */}
      <div className="absolute rounded-full" style={{
        width: '60vw', height: '60vw',
        background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, rgba(76,29,149,0.03) 50%, transparent 70%)',
        top: '30%', right: '-20%',
        filter: 'blur(120px)',
      }} />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
      }} />
    </div>
  )
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.7rem',
        color: '#60A5FA',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        fontWeight: 600,
      }}>{children}</span>
      <div className="h-px flex-1 max-w-20" style={{ background: 'linear-gradient(90deg, rgba(96,165,250,0.4), transparent)' }} />
    </div>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-200" style={{ backgroundColor: '#070913', color: '#e2e8f0' }}>
      <AmbientBackground />

      {/* ── RECRUITER TOP NAVIGATION BAR ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          padding: scrolled ? '12px 0' : '20px 0',
          background: scrolled ? 'rgba(7,9,19,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
          boxShadow: scrolled ? '0 10px 30px -10px rgba(0,0,0,0.5)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => scrollTo('hero')}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            }}
          >
            <span style={{ color: '#3B82F6' }}>Akash</span>
            <span style={{ color: '#F8FAFC' }}>.Kumar</span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.72rem', color: '#94A3B8',
                  letterSpacing: '0.08em', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
                  transition: 'color 0.2s',
                  fontWeight: 500,
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#3B82F6')}
                onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}
              >
                {link}
              </button>
            ))}
          </div>

          {/* Quick Recruiter Links */}
          <div className="flex items-center gap-3">
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Profile"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem',
                color: '#CBD5E1', background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                padding: '6px 12px', borderRadius: '8px',
                textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                e.currentTarget.style.color = '#FFFFFF'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.color = '#CBD5E1'
              }}
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>

            <a
              href={LINKS.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              title="LeetCode Profile"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem',
                color: '#F59E0B', background: 'rgba(245,158,11,0.1)',
                border: '1px solid rgba(245,158,11,0.25)',
                padding: '6px 12px', borderRadius: '8px',
                textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(245,158,11,0.2)'
                e.currentTarget.style.borderColor = 'rgba(245,158,11,0.45)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(245,158,11,0.1)'
                e.currentTarget.style.borderColor = 'rgba(245,158,11,0.25)'
              }}
            >
              <LeetcodeIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">LeetCode</span>
            </a>

            <a
              href={LINKS.email}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.75rem', fontWeight: 600,
                color: '#FFFFFF', background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                padding: '7px 16px', borderRadius: '8px',
                textDecoration: 'none', boxShadow: '0 4px 14px rgba(37,99,235,0.3)',
                transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: '5px',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,99,235,0.45)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(37,99,235,0.3)'
              }}
            >
              Contact Me
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section id="hero" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto w-full text-center">

          {/* Recruiter Status Badge */}
          <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full" style={{
            border: '1px solid rgba(16,185,129,0.3)',
            background: 'rgba(16,185,129,0.08)',
            backdropFilter: 'blur(10px)',
          }}>
            <span className="w-2 h-2 rounded-full" style={{ background: '#10B981', boxShadow: '0 0 10px #10B981' }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', color: '#34D399', letterSpacing: '0.12em', fontWeight: 600 }}>
              AVAILABLE FOR RECRUITMENT · JAVA BACKEND DEVELOPER
            </span>
          </div>

          {/* Name Header */}
          <div className="mb-8">
            <h1 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(3rem, 7.5vw, 5.5rem)',
              fontWeight: 900, lineHeight: 1.1,
              letterSpacing: '-0.03em', color: '#F8FAFC',
              marginBottom: '0.75rem',
            }}>
              Akash Kumar
            </h1>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(2rem, 5vw, 3.8rem)',
              fontWeight: 800, lineHeight: 1.2,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #60A5FA 0%, #818CF8 50%, #34D399 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              display: 'inline-block',
            }}>
              Backend & AI Engineer
            </h2>
          </div>

          {/* Subtitle Tech Specs */}
          <div className="flex items-center justify-center flex-wrap gap-2 mb-6">
            {['Java 21', 'Spring Boot 3', 'Microservices', 'Spring AI', 'MongoDB / SQL'].map((tag) => (
              <span key={tag} style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.72rem', color: '#94A3B8',
                background: 'rgba(15,23,42,0.8)',
                border: '1px solid rgba(255,255,250,0.08)',
                padding: '4px 12px', borderRadius: '6px',
                fontWeight: 500,
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Bio Executive Summary */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
            color: '#94A3B8', maxWidth: '640px', margin: '0 auto 2.5rem',
            lineHeight: 1.75, fontWeight: 400,
          }}>
            High-impact Backend Developer with proven internship experience at <strong className="text-emerald-400 font-semibold">DRDO</strong> & <strong className="text-blue-400 font-semibold">Khabai Tech</strong>. Specialized in building high-concurrency microservices, distributed system observability, and Spring AI document processing engines.
          </p>

          {/* RECRUITER DIRECT ACTION BAR */}
          <div className="flex items-center justify-center gap-4 flex-wrap mb-12">
            <button
              onClick={() => scrollTo('projects')}
              style={{
                fontFamily: "'Outfit', sans-serif", fontSize: '0.9rem', fontWeight: 700,
                color: '#FFFFFF',
                background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                border: 'none', padding: '14px 32px', borderRadius: '10px', cursor: 'pointer',
                boxShadow: '0 10px 25px -5px rgba(37,99,235,0.4)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 15px 30px -5px rgba(37,99,235,0.6)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(37,99,235,0.4)'
              }}
            >
              Explore Live Projects ↓
            </button>

            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Outfit', sans-serif", fontSize: '0.9rem', fontWeight: 600,
                color: '#E2E8F0', background: 'rgba(30,41,59,0.7)',
                border: '1px solid rgba(255,255,255,0.12)',
                padding: '14px 28px', borderRadius: '10px', cursor: 'pointer',
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(51,65,85,0.8)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(30,41,59,0.7)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <GithubIcon className="w-4 h-4" />
              GitHub Repositories
            </a>

            <a
              href={LINKS.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Outfit', sans-serif", fontSize: '0.9rem', fontWeight: 600,
                color: '#F59E0B', background: 'rgba(245,158,11,0.08)',
                border: '1px solid rgba(245,158,11,0.3)',
                padding: '14px 28px', borderRadius: '10px', cursor: 'pointer',
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(245,158,11,0.18)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(245,158,11,0.08)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <LeetcodeIcon className="w-4 h-4" />
              LeetCode Profile
            </a>
          </div>

          {/* Quick Metrics Bar for Recruiters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16 text-left">
            {[
              { val: '8.41 / 10', label: 'B.Tech CGPA', detail: 'BPIT New Delhi', color: '#3B82F6' },
              { val: '2 Internships', label: 'DRDO & Khabai Tech', detail: 'Microservices & Observability', color: '#10B981' },
              { val: '2 Live Apps', label: 'Deployed on Render', detail: 'Full Stack & AI', color: '#8B5CF6' },
              { val: '30+ APIs', label: 'Production Endpoints', detail: 'JWT Auth & Indexing', color: '#F59E0B' },
            ].map(m => (
              <div key={m.label} style={{
                background: 'rgba(15,23,42,0.65)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px', padding: '16px 20px',
                backdropFilter: 'blur(12px)',
              }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.25rem', fontWeight: 800, color: m.color, lineHeight: 1 }}>{m.val}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.78rem', fontWeight: 600, color: '#E2E8F0', marginTop: '6px' }}>{m.label}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: '#64748B', marginTop: '2px' }}>{m.detail}</div>
              </div>
            ))}
          </div>

          {/* Terminal Code Preview */}
          <div style={{
            maxWidth: '560px', margin: '0 auto',
            background: '#0B0F19',
            border: '1px solid rgba(59,130,246,0.2)',
            borderRadius: '14px', padding: '1.25rem 1.5rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(59,130,246,0.08)',
            textAlign: 'left',
          }}>
            <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-2.5">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: '#EF4444' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#F59E0B' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#10B981' }} />
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#64748B' }}>
                Spring Boot Microservices / AccountController.java
              </span>
            </div>
            <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', lineHeight: 1.7, margin: 0, color: '#CBD5E1', overflowX: 'auto' }}>
              <span style={{ color: '#8B5CF6' }}>@RestController</span>{'\n'}
              <span style={{ color: '#8B5CF6' }}>@RequestMapping</span><span style={{ color: '#94A3B8' }}>(</span><span style={{ color: '#10B981' }}>"/api/v1/accounts"</span><span style={{ color: '#94A3B8' }}>)</span>{'\n'}
              <span style={{ color: '#3B82F6' }}>public class </span><span style={{ color: '#F8FAFC' }}>AccountController </span><span style={{ color: '#94A3B8' }}>{'{'}</span>{'\n'}
              {'  '}<span style={{ color: '#8B5CF6' }}>@CircuitBreaker</span><span style={{ color: '#94A3B8' }}>(name = </span><span style={{ color: '#10B981' }}>"bankService"</span><span style={{ color: '#94A3B8' }}>)</span>{'\n'}
              {'  '}<span style={{ color: '#8B5CF6' }}>@PostMapping</span><span style={{ color: '#94A3B8' }}>(</span><span style={{ color: '#10B981' }}>"/transfer"</span><span style={{ color: '#94A3B8' }}>)</span>{'\n'}
              {'  '}<span style={{ color: '#3B82F6' }}>public </span><span style={{ color: '#06B6D4' }}>ResponseEntity</span><span style={{ color: '#94A3B8' }}>{'<'}</span><span style={{ color: '#F8FAFC' }}>TransferResult</span><span style={{ color: '#94A3B8' }}>{'>'}</span> <span style={{ color: '#60A5FA' }}>processTransfer</span><span style={{ color: '#94A3B8' }}>(</span>{'\n'}
              {'    '}<span style={{ color: '#8B5CF6' }}>@Valid @RequestBody </span><span style={{ color: '#F8FAFC' }}>TransferRequest </span><span style={{ color: '#94A3B8' }}>request</span>{'\n'}
              {'  '}<span style={{ color: '#94A3B8' }}>) {'{'} </span><span style={{ color: '#64748B' }}>/* 30+ endpoints & Resilience4j fault isolation */</span><span style={{ color: '#94A3B8' }}> {'}'}</span>{'\n'}
              <span style={{ color: '#94A3B8' }}>{'}'}</span>
            </pre>
          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section id="about" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* Left Visual Card */}
          <div className="relative">
            <div style={{
              width: '100%', maxWidth: '380px', aspectRatio: '4/5', margin: '0 auto',
              background: 'linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(124,58,237,0.12) 100%)',
              border: '1px solid rgba(255,255,255,0.12)', borderRadius: '20px',
              position: 'relative', overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            }}>
              <img
                src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=600&h=750&fit=crop&auto=format"
                alt="Akash Kumar Profile"
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, transparent 40%, rgba(7,9,19,0.9) 100%)',
              }} />
              <div style={{ position: 'absolute', bottom: '24px', left: '24px' }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>Akash Kumar</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#60A5FA', letterSpacing: '0.1em', marginTop: '2px' }}>Java & Backend Engineer</div>
              </div>
            </div>

            {/* CGPA Badge overlay */}
            <div style={{
              position: 'absolute', bottom: '16px', right: '12px',
              background: 'rgba(15,23,42,0.92)',
              border: '1px solid rgba(139,92,246,0.3)',
              borderRadius: '14px', padding: '14px 20px',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            }}>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.8rem', fontWeight: 900, color: '#8B5CF6', lineHeight: 1 }}>8.41</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.6rem', color: '#94A3B8', letterSpacing: '0.08em', marginTop: '4px' }}>B.TECH CGPA</div>
            </div>
          </div>

          {/* Right Text Bio */}
          <div>
            <SectionLabel>01 — Profile & Summary</SectionLabel>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15,
              marginBottom: '1.25rem', color: '#F8FAFC',
            }}>
              Engineering high-scale backends with{' '}
              <span style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Java & Spring Boot
              </span>
            </h2>

            <div className="space-y-4" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: '#94A3B8', lineHeight: 1.8 }}>
              <p>
                I am an Information Technology undergraduate at <strong className="text-slate-200">Bhagwan Parshuram Institute of Technology (BPIT), New Delhi</strong>. My core expertise centers around architecting scalable microservices, RESTful API design, and distributed observability.
              </p>
              <p>
                During my internship at <strong className="text-slate-200">DRDO</strong>, I constructed a full telemetry monitoring stack with Prometheus, Grafana, and Loki across 3 active services. At <strong className="text-slate-200">Khabai Tech</strong>, I built NeoBank — a multi-service banking engine with Feign Client communication and Resilience4j circuit breakers.
              </p>
              <p>
                I actively combine backend architecture with cutting-edge AI technologies, leveraging Spring AI and OpenAI APIs to deliver production applications like <strong className="text-slate-200">RentEase</strong> and <strong className="text-slate-200">AI Summarizer</strong>.
              </p>
            </div>

            {/* Recruiter Quick Link Buttons */}
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
                style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem',
                  color: '#60A5FA', background: 'rgba(37,99,235,0.1)',
                  border: '1px solid rgba(59,130,246,0.3)',
                  padding: '8px 16px', borderRadius: '8px',
                  textDecoration: 'none', fontWeight: 600,
                  transition: 'all 0.2s',
                }}
              >
                <GithubIcon className="w-4 h-4" />
                GitHub Repositories ↗
              </a>

              <a
                href={LINKS.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
                style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem',
                  color: '#F59E0B', background: 'rgba(245,158,11,0.1)',
                  border: '1px solid rgba(245,158,11,0.3)',
                  padding: '8px 16px', borderRadius: '8px',
                  textDecoration: 'none', fontWeight: 600,
                  transition: 'all 0.2s',
                }}
              >
                <LeetcodeIcon className="w-4 h-4" />
                LeetCode Profile ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS SECTION (RECRUITER HIGHLIGHT) ── */}
      <section id="projects" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 max-w-xl">
            <SectionLabel>02 — Featured Live Projects</SectionLabel>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#F8FAFC',
            }}>
              Production Applications{' '}
              <span style={{
                background: 'linear-gradient(135deg, #3B82F6, #10B981)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Deployed Live</span>
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: '#94A3B8', marginTop: '8px' }}>
              Click any project below to launch the live application hosted on Render.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {PROJECTS.map((proj, i) => (
              <div
                key={proj.title}
                onMouseEnter={() => setHoveredProject(i)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{
                  background: hoveredProject === i ? 'rgba(15,23,42,0.95)' : 'rgba(15,23,42,0.65)',
                  border: `1px solid ${hoveredProject === i ? proj.borderColor : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '20px', padding: '2.25rem',
                  backdropFilter: 'blur(20px)',
                  transition: 'all 0.35s ease',
                  boxShadow: hoveredProject === i ? `0 20px 50px -10px ${proj.glowColor}` : '0 10px 30px -10px rgba(0,0,0,0.5)',
                  transform: hoveredProject === i ? 'translateY(-4px)' : 'none',
                  display: 'flex', flexDirection: 'column',
                }}
              >
                {/* Card Top Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md" style={{
                    background: `${proj.accentColor}18`,
                    border: `1px solid ${proj.accentColor}35`,
                  }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: proj.accentColor }} />
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: proj.accentColor, fontWeight: 600, letterSpacing: '0.08em' }}>
                      FEATURED PROJECT
                    </span>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', color: '#64748B' }}>{proj.year}</span>
                </div>

                <h3 style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: '1.6rem', fontWeight: 800,
                  letterSpacing: '-0.02em', color: '#F8FAFC', marginBottom: '4px',
                }}>{proj.title}</h3>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: proj.accentColor, letterSpacing: '0.04em', marginBottom: '1rem', fontWeight: 500 }}>
                  {proj.subtitle}
                </p>

                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.75, marginBottom: '1.75rem', flex: 1 }}>
                  {proj.desc}
                </p>

                {/* Key Metric Badges */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { val: proj.stat, lbl: proj.statLabel },
                    { val: proj.stat2, lbl: proj.stat2Label },
                  ].map(s => (
                    <div key={s.lbl} style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '10px', padding: '12px 16px',
                    }}>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.3rem', fontWeight: 800, color: proj.accentColor, lineHeight: 1 }}>{s.val}</div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: '#64748B', marginTop: '4px' }}>{s.lbl}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {proj.tech.map(t => (
                    <span key={t} style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#CBD5E1',
                      background: 'rgba(30,41,59,0.7)', padding: '5px 10px', borderRadius: '6px',
                      border: '1px solid rgba(255,255,255,0.08)', fontWeight: 500,
                    }}>{t}</span>
                  ))}
                </div>

                {/* RECRUITER ACTION BUTTONS */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem', fontWeight: 700,
                      color: '#FFFFFF', background: `linear-gradient(135deg, ${proj.accentColor} 0%, #1D4ED8 100%)`,
                      padding: '11px 18px', borderRadius: '10px',
                      textDecoration: 'none', boxShadow: `0 8px 20px -4px ${proj.accentColor}50`,
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                  >
                    <span>Launch Live App</span>
                    <ExternalIcon className="w-4 h-4" />
                  </a>

                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                      fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem', fontWeight: 600,
                      color: '#CBD5E1', background: 'rgba(30,41,59,0.8)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      padding: '11px 18px', borderRadius: '10px',
                      textDecoration: 'none', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(51,65,85,0.9)'
                      e.currentTarget.style.color = '#FFFFFF'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(30,41,59,0.8)'
                      e.currentTarget.style.color = '#CBD5E1'
                    }}
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Source</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS & COMPETENCIES ── */}
      <section id="skills" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 max-w-xl">
            <SectionLabel>03 — Technical Matrix</SectionLabel>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#F8FAFC',
            }}>
              Core Technologies &{' '}
              <span style={{
                background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Proficiencies</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SKILLS.map((skill, i) => (
              <div
                key={skill.name}
                onMouseEnter={() => setHoveredSkill(i)}
                onMouseLeave={() => setHoveredSkill(null)}
                style={{
                  background: hoveredSkill === i ? 'rgba(15,23,42,0.95)' : 'rgba(15,23,42,0.6)',
                  border: `1px solid ${hoveredSkill === i ? `${skill.color}40` : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: '14px', padding: '1.25rem 1.5rem',
                  backdropFilter: 'blur(12px)',
                  transition: 'all 0.25s ease',
                  transform: hoveredSkill === i ? 'translateY(-3px)' : 'none',
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem', fontWeight: 700, color: '#F8FAFC' }}>{skill.name}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.62rem', color: skill.color, fontWeight: 600 }}>{skill.cat}</span>
                </div>
                <div style={{ height: '3px', background: 'rgba(30,41,59,0.8)', borderRadius: '100px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                  <div style={{
                    height: '100%', width: `${skill.level}%`,
                    background: `linear-gradient(90deg, ${skill.color}90, ${skill.color})`,
                    borderRadius: '100px',
                  }} />
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#64748B', textAlign: 'right' }}>
                  Proficiency: {skill.level}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE SECTION ── */}
      <section id="experience" className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <SectionLabel>04 — Work Experience</SectionLabel>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#F8FAFC',
            }}>
              Internships &{' '}
              <span style={{
                background: 'linear-gradient(135deg, #10B981, #3B82F6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Track Record</span>
            </h2>
          </div>

          <div className="relative pl-4 md:pl-0">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {EXPERIENCE.map(exp => (
                <div key={exp.company} className="relative">
                  <div style={{
                    background: 'rgba(15,23,42,0.65)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '18px', padding: '2rem',
                    backdropFilter: 'blur(16px)',
                    transition: 'border-color 0.3s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${exp.color}40`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4 border-b border-slate-800/80 pb-4">
                      <div>
                        <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.25rem', fontWeight: 800, color: '#F8FAFC', marginBottom: '2px' }}>
                          {exp.role}
                        </h3>
                        <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1rem', fontWeight: 700, color: exp.color }}>
                          {exp.company}
                        </span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: '#94A3B8', fontWeight: 600 }}>{exp.period}</div>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#64748B', marginTop: '2px' }}>{exp.location}</div>
                      </div>
                    </div>

                    <ul className="space-y-2.5 mb-6" style={{ listStyle: 'none', padding: 0 }}>
                      {exp.bullets.map(b => (
                        <li key={b} className="flex items-start gap-3">
                          <span style={{ color: exp.color, marginTop: '6px', flexShrink: 0, width: '6px', height: '6px', borderRadius: '50%', background: exp.color }} />
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.7 }}>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map(t => (
                        <span key={t} style={{
                          fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#CBD5E1',
                          background: 'rgba(30,41,59,0.6)', padding: '4px 10px', borderRadius: '6px',
                          border: '1px solid rgba(255,255,255,0.06)', fontWeight: 500,
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Card */}
          <div className="mt-16">
            <SectionLabel>04b — Education</SectionLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {EDUCATION.map(edu => (
                <div
                  key={edu.institution}
                  style={{
                    background: 'rgba(15,23,42,0.65)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px', padding: '1.5rem 1.75rem',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.05rem', fontWeight: 800, color: '#F8FAFC' }}>{edu.institution}</span>
                    <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem', fontWeight: 800, color: edu.color }}>{edu.grade}</span>
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#94A3B8', fontWeight: 500 }}>{edu.degree}</div>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-800/80">
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#64748B' }}>{edu.location}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#64748B' }}>{edu.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT & RECRUITER CTA ── */}
      <section id="contact" className="relative z-10 py-24 px-6 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <SectionLabel>05 — Direct Contact</SectionLabel>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1,
            color: '#F8FAFC', marginBottom: '1.25rem',
          }}>
            Ready to contribute to your engineering team
          </h2>

          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', color: '#94A3B8',
            lineHeight: 1.75, maxWidth: '540px', margin: '0 auto 2.5rem',
          }}>
            Actively open for Backend Software Development Engineer (SDE) roles, Spring Boot internships, and technical opportunities.
          </p>

          {/* Contact Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto">
            <a
              href={LINKS.email}
              style={{
                background: 'rgba(15,23,42,0.7)',
                border: '1px solid rgba(59,130,246,0.3)',
                borderRadius: '14px', padding: '1.5rem',
                textDecoration: 'none', transition: 'all 0.25s ease', display: 'block',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#3B82F6', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '6px' }}>EMAIL</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.82rem', color: '#F8FAFC', fontWeight: 600, wordBreak: 'break-all' }}>akashkumargupta9918@gmail.com</div>
            </a>

            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'rgba(15,23,42,0.7)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '14px', padding: '1.5rem',
                textDecoration: 'none', transition: 'all 0.25s ease', display: 'block',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#CBD5E1', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '6px' }}>GITHUB</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#F8FAFC', fontWeight: 600 }}>github.com/aakashagr22</div>
            </a>

            <a
              href={LINKS.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'rgba(15,23,42,0.7)',
                border: '1px solid rgba(245,158,11,0.3)',
                borderRadius: '14px', padding: '1.5rem',
                textDecoration: 'none', transition: 'all 0.25s ease', display: 'block',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#F59E0B', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '6px' }}>LEETCODE</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#F8FAFC', fontWeight: 600 }}>leetcode.com/u/akashagr22</div>
            </a>
          </div>

          <a
            href={LINKS.email}
            style={{
              fontFamily: "'Outfit', sans-serif", fontSize: '1rem', fontWeight: 700,
              color: '#FFFFFF', background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
              border: 'none', padding: '16px 44px', borderRadius: '12px', cursor: 'pointer',
              letterSpacing: '-0.01em', boxShadow: '0 10px 30px rgba(37,99,235,0.4)',
              display: 'inline-block', textDecoration: 'none',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(37,99,235,0.6)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(37,99,235,0.4)'
            }}
          >
            Send Direct Message
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 py-8 px-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: '#64748B' }}>
            &copy; {new Date().getFullYear()} Akash Kumar · Java Backend Developer
          </span>
          <div className="flex gap-6">
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: '#94A3B8', textDecoration: 'none' }}>GitHub</a>
            <a href={LINKS.leetcode} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: '#F59E0B', textDecoration: 'none' }}>LeetCode</a>
            <a href={LINKS.rentease} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: '#3B82F6', textDecoration: 'none' }}>RentEase Live</a>
            <a href={LINKS.aiSummarizer} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: '#8B5CF6', textDecoration: 'none' }}>AI Summarizer Live</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
