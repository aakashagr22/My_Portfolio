import { useState, useEffect } from 'react'

const LINKS = {
  github: 'https://github.com/aakashagr22',
  leetcode: 'https://leetcode.com/u/akashagr22/',
  rentease: 'https://rentease-kr3s.onrender.com/',
  aiSummarizer: 'https://ai-summarizer-3fga.onrender.com/',
  email: 'akashkumargupta9918@gmail.com',
  phone: '+91 99847 57701',
}

const NAV_LINKS = [
  { id: 'hero', label: '// system' },
  { id: 'tech-stack', label: '// toolkit' },
  { id: 'projects', label: '// projects' },
  { id: 'about', label: '// profile' },
  { id: 'experience', label: '// experience' },
  { id: 'contact', label: '// contact' },
]

const SKILLS = [
  {
    name: 'Java 21 Core',
    cat: 'Backend Core',
    badge: 'CORE LANGUAGE',
    color: '#f59e0b',
    tags: ['OOP', 'Streams API', 'Concurrency', 'JVM Tuning'],
    desc: 'Production OOP engineering, multithreaded backend services, and collection processing.'
  },
  {
    name: 'Spring Boot 3',
    cat: 'Backend Core',
    badge: 'FRAMEWORK',
    color: '#10b981',
    tags: ['REST APIs', 'Microservices', 'Dependency Injection'],
    desc: 'Architecting scalable microservices, REST controllers, and enterprise beans.'
  },
  {
    name: 'Spring Security & JWT',
    cat: 'Databases & Security',
    badge: 'SECURITY',
    color: '#3b82f6',
    tags: ['Stateless Auth', 'Bcrypt', 'Security Filters'],
    desc: 'JWT authentication pipelines, password encryption, and role-based endpoint security.'
  },
  {
    name: 'Spring AI & OpenAI API',
    cat: 'AI & Web',
    badge: 'AI INTELLIGENCE',
    color: '#8b5cf6',
    tags: ['GPT-4o-mini', 'Prompt Engineering', 'Apache Tika'],
    desc: 'LLM integration, automated PDF/document extraction, and AI summarization workflows.'
  },
  {
    name: 'RESTful Architecture',
    cat: 'Backend Core',
    badge: 'ARCHITECTURE',
    color: '#06b6d4',
    tags: ['Feign Client', 'Eureka Registry', 'Swagger Specs'],
    desc: 'Designing robust API contracts, inter-service HTTP communication, and documentation.'
  },
  {
    name: 'Resilience4j & Gateway',
    cat: 'Backend Core',
    badge: 'DISTRIBUTED SYS',
    color: '#f43f5e',
    tags: ['Circuit Breaker', 'Rate Limiting', 'Fault Isolation'],
    desc: 'Guaranteeing system fault tolerance, fallback mechanisms, and API routing.'
  },
  {
    name: 'MongoDB',
    cat: 'Databases & Security',
    badge: 'NOSQL DB',
    color: '#10b981',
    tags: ['Geospatial Queries', 'Compound Indexing', 'Aggregation'],
    desc: 'Achieved 40% query performance optimization via strategic indexes and document schema.'
  },
  {
    name: 'MySQL & PostgreSQL',
    cat: 'Databases & Security',
    badge: 'RELATIONAL DB',
    color: '#3b82f6',
    tags: ['JPA / Hibernate', 'Relational Schema', 'ACID Transactions'],
    desc: 'Designing relational schemas, entity mappings, and database transactions.'
  },
  {
    name: 'Docker & Containers',
    cat: 'DevOps & Observability',
    badge: 'CONTAINERIZATION',
    color: '#0284c7',
    tags: ['Multi-Stage Builds', 'Docker Compose', 'Isolation'],
    desc: 'Containerizing Spring Boot microservices for reproducible production deployments.'
  },
  {
    name: 'Prometheus & Grafana',
    cat: 'DevOps & Observability',
    badge: 'OBSERVABILITY',
    color: '#f59e0b',
    tags: ['Metrics Telemetry', 'Real-time Dashboards', 'Alerts'],
    desc: 'Real-time monitoring, CPU/Memory telemetry visualization, and alerting.'
  },
  {
    name: 'Loki & Tempo',
    cat: 'DevOps & Observability',
    badge: 'LOGGING & TRACING',
    color: '#8b5cf6',
    tags: ['Log Aggregation', 'Distributed Tracing', 'MTTR Reduction'],
    desc: 'Centralized log analysis and trace correlation across distributed microservices.'
  },
  {
    name: 'React.js & Tailwind CSS',
    cat: 'AI & Web',
    badge: 'FRONTEND UI',
    color: '#38bdf8',
    tags: ['Vite', 'Component SPA', 'Glassmorphism'],
    desc: 'Building responsive frontend interfaces, user dashboards, and SPA routing.'
  },
  {
    name: 'Git & GitHub Actions',
    cat: 'DevOps & Observability',
    badge: 'CI/CD PIPELINES',
    color: '#64748b',
    tags: ['Automated Builds', 'Version Control', 'Workflow Automation'],
    desc: 'Configuring automated CI/CD build, test, and release workflows on code push.'
  },
]

const PROJECTS = [
  {
    id: 'rentease',
    title: 'RentEase Marketplace',
    subtitle: 'Geospatial Rental Platform & Spring Boot Engine',
    category: 'Full-Stack Apps',
    year: '2025 — Present',
    desc: 'Engineered 30+ secure backend endpoints with JWT authentication and Bcrypt password hashing. Achieved a 40% query performance optimization through strategic MongoDB indexing. Deployed live on Render with Google Maps API for geospatial property discovery.',
    tech: ['Java 21', 'Spring Boot', 'MongoDB', 'JWT Auth', 'Google Maps API', 'Render'],
    glowColor: 'rgba(59, 130, 246, 0.35)',
    accentColor: '#3b82f6',
    stat: '40%',
    statLabel: 'Query Perf. Boost',
    stat2: '30+',
    stat2Label: 'REST Endpoints',
    liveUrl: LINKS.rentease,
    githubUrl: LINKS.github,
    isFeatured: true,
  },
  {
    id: 'ai-summarizer',
    title: 'AI Summarizer Platform',
    subtitle: 'Intelligent Document Summarization & Spring AI',
    category: 'Microservices & AI',
    year: '2026 — Present',
    desc: 'Enterprise document intelligence application leveraging OpenAI GPT-4o-mini and Spring AI. Enables PDF, Word, and text processing via Apache Tika. Containerized with Docker and features an automated CI/CD deployment pipeline via GitHub Actions.',
    tech: ['Java 21', 'Spring Boot', 'Spring AI', 'OpenAI GPT-4o', 'Apache Tika', 'Docker', 'GitHub Actions'],
    glowColor: 'rgba(139, 92, 246, 0.35)',
    accentColor: '#8b5cf6',
    stat: 'GPT-4o',
    statLabel: 'AI Model Engine',
    stat2: 'CI/CD',
    stat2Label: 'Automated Build',
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
      'Engineered NeoBank — a distributed microservices banking system featuring 3 isolated services (Account, Transaction, Fund Transfer) built with Spring Boot.',
      'Configured inter-service communication using Feign Client and Eureka Service Registry for high availability.',
      'Implemented API Gateway rate-limiting and Resilience4j circuit breakers to guarantee system fault tolerance under high traffic.',
    ],
    tech: ['Spring Boot', 'Feign Client', 'Eureka', 'Resilience4j', 'REST APIs'],
    color: '#3b82f6',
  },
  {
    role: 'Software Development Intern',
    company: 'Defence Research and Development Organisation (DRDO)',
    period: 'Jun 2025 — Jul 2025',
    location: 'On-site · New Delhi, India',
    bullets: [
      'Architected a microservices observability suite using Docker and Prometheus for real-time telemetry across 3 active services.',
      'Achieved a 30% reduction in incident detection time by developing centralized Grafana, Loki, and Tempo monitoring dashboards.',
      'Authored RESTful endpoints and Swagger API documentation to streamline cross-functional engineering collaboration.',
    ],
    tech: ['Docker', 'Prometheus', 'Grafana', 'Loki', 'Tempo', 'Spring Boot', 'Swagger'],
    color: '#10b981',
  },
]

const EDUCATION = [
  {
    degree: 'Bachelor of Technology — Information Technology',
    institution: 'Bhagwan Parshuram Institute of Technology (BPIT)',
    location: 'New Delhi, India',
    period: 'Aug 2024 — May 2027',
    grade: 'CGPA 8.41 / 10',
    color: '#8b5cf6',
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

function CopyIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v9.25c0 .621-.504 1.125-1.125 1.125z" />
    </svg>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [selectedTechCat, setSelectedTechCat] = useState<string>('All')
  const [selectedProjectFilter, setSelectedProjectFilter] = useState<string>('All Projects')
  const [activeDiagramNode, setActiveDiagramNode] = useState<string | null>(null)
  const [copiedEmail, setCopiedEmail] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(LINKS.email)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  const filteredSkills = selectedTechCat === 'All'
    ? SKILLS
    : SKILLS.filter(s => s.cat === selectedTechCat)

  const filteredProjects = selectedProjectFilter === 'All Projects'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedProjectFilter)

  return (
    <div className="min-h-screen mesh-bg dot-grid selection:bg-amber-400/20 selection:text-amber-300 relative text-foreground">

      {/* ── TOP NAV BAR ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          padding: scrolled ? '12px 0' : '20px 0',
          background: scrolled ? 'rgba(8, 9, 13, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
          boxShadow: scrolled ? '0 10px 30px -10px rgba(0,0,0,0.7)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2 font-mono text-sm font-bold tracking-wider hover:opacity-80 transition-opacity"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-400">AK</span>
            <span className="text-foreground/40">//</span>
            <span className="text-foreground/90 font-sans">core</span>
          </button>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-mono text-xs text-foreground/50 hover:text-amber-400 transition-colors tracking-wider uppercase"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2.5">
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-2 text-foreground/60 hover:text-amber-400 hover:border-amber-400/30 transition-all border border-white/10 rounded-md"
              title="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={LINKS.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-2 text-amber-400 hover:text-amber-300 hover:border-amber-400/40 transition-all border border-amber-400/20 rounded-md bg-amber-400/10"
              title="LeetCode Profile"
            >
              <LeetcodeIcon className="w-4 h-4" />
            </a>

            <button
              onClick={handleCopyEmail}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs bg-amber-400 text-[#1a1408] font-semibold hover:bg-amber-300 transition-all rounded-md cursor-pointer"
            >
              <CopyIcon className="w-3.5 h-3.5" />
              <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION WITH SYSTEM DIAGRAM ── */}
      <section id="hero" className="relative min-h-[100dvh] w-full flex items-center justify-center pt-28 pb-16">
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Column — Intro & Terminal Info */}
          <div className="space-y-6">
            {/* Status Pill */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 font-mono text-xs uppercase tracking-wider bg-amber-400/10 text-amber-300 border border-amber-400/20 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                AVAILABLE FOR RECRUITMENT · JAVA BACKEND DEVELOPER
              </span>
            </div>

            {/* Terminal Command Prompt */}
            <div className="space-y-2">
              <p className="font-mono text-foreground/50 text-sm flex items-center gap-1">
                <span className="text-amber-400">&gt;</span> whoami
              </p>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
                <span className="gradient-text">Akash</span><br />
                <span className="text-foreground/90">Kumar</span>
              </h1>
            </div>

            {/* Dynamic Role Tag line */}
            <div className="text-lg md:text-xl text-foreground/70 flex items-center gap-2 font-mono">
              <span className="text-amber-400 font-semibold">//</span>
              <span className="text-amber-300">Java Backend Developer &amp; AI Engineer</span>
            </div>

            {/* Paragraph Bio */}
            <p className="text-foreground/65 text-base leading-relaxed max-w-lg">
              Full-stack backend developer pursuing B.Tech in IT at <strong className="text-foreground/90">BPIT New Delhi</strong>. Proven internship track record at <strong className="text-amber-400">DRDO</strong> &amp; <strong className="text-blue-400">Khabai Tech</strong> building fault-tolerant microservices, Spring AI engines, and distributed observability stacks.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm bg-amber-400 text-[#1a1408] hover:bg-amber-300 transition-all duration-200 shadow-lg shadow-amber-400/20 rounded-md cursor-pointer"
              >
                <span>View Live Projects</span>
                <ExternalIcon className="h-4 w-4" />
              </button>

              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm glass border border-white/10 text-foreground/80 hover:text-foreground hover:border-amber-400/30 transition-all duration-200 rounded-md"
              >
                <GithubIcon className="h-4 w-4" />
                <span>GitHub Repos</span>
              </a>

              <a
                href={LINKS.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm glass border border-amber-400/20 text-amber-400 hover:bg-amber-400/10 transition-all duration-200 rounded-md"
              >
                <LeetcodeIcon className="h-4 w-4" />
                <span>LeetCode Profile</span>
              </a>
            </div>

            {/* Quick Find Links */}
            <div className="flex items-center gap-3 pt-4">
              <span className="font-mono text-xs text-foreground/40">Connect</span>
              <div className="h-px flex-1 max-w-[40px] bg-white/10" />
              <div className="flex gap-2">
                <a href={LINKS.rentease} target="_blank" rel="noopener noreferrer" className="font-mono text-xs px-2.5 py-1 glass text-blue-400 border border-blue-400/30 rounded hover:bg-blue-400/10 transition-all">RentEase Live ↗</a>
                <a href={LINKS.aiSummarizer} target="_blank" rel="noopener noreferrer" className="font-mono text-xs px-2.5 py-1 glass text-purple-400 border border-purple-400/30 rounded hover:bg-purple-400/10 transition-all">AI Summarizer Live ↗</a>
              </div>
            </div>
          </div>

          {/* Right Column — Interactive System Overview Diagram (fig. 01) */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-80 h-80 rounded-full bg-amber-500/10 blur-3xl animate-pulse-glow pointer-events-none" />

            <div className="plate-ticks relative w-full max-w-md p-6 rounded-xl">
              <div className="eyebrow mb-4">fig. 01 — system architecture</div>

              {/* Interactive SVG Diagram */}
              <svg viewBox="0 0 410 240" className="w-full h-auto">
                <line x1="70" y1="55" x2="205" y2="120" stroke="#f59e0b" strokeOpacity="0.5" strokeWidth="1.4" strokeDasharray="4 3" className="wire-draw" />
                <line x1="70" y1="185" x2="205" y2="120" stroke="#3b82f6" strokeOpacity="0.5" strokeWidth="1.4" strokeDasharray="4 3" className="wire-draw" />
                <line x1="340" y1="55" x2="205" y2="120" stroke="#10b981" strokeOpacity="0.5" strokeWidth="1.4" strokeDasharray="4 3" className="wire-draw" />
                <line x1="340" y1="185" x2="205" y2="120" stroke="#8b5cf6" strokeOpacity="0.5" strokeWidth="1.4" strokeDasharray="4 3" className="wire-draw" />

                <g className="cursor-pointer group" onMouseEnter={() => setActiveDiagramNode('frontend')} onMouseLeave={() => setActiveDiagramNode(null)}>
                  <circle cx="45" cy="55" r="22" fill="#0d111a" stroke="#f59e0b" strokeWidth="1.6" opacity="0.9" />
                  <text x="45" y="59" textAnchor="middle" className="font-mono" fontSize="9" fill="#f59e0b" fontWeight="700">FR</text>
                  <text x="75" y="48" textAnchor="start" className="font-mono" fontSize="9" fill="#f59e0b" fontWeight="600">FRONTEND</text>
                  <text x="75" y="60" textAnchor="start" fontSize="8" fill="#94a3b8">React · Vite · Tailwind</text>
                </g>

                <g className="cursor-pointer group" onMouseEnter={() => setActiveDiagramNode('database')} onMouseLeave={() => setActiveDiagramNode(null)}>
                  <circle cx="45" cy="185" r="22" fill="#0d111a" stroke="#3b82f6" strokeWidth="1.6" opacity="0.9" />
                  <text x="45" y="189" textAnchor="middle" className="font-mono" fontSize="9" fill="#3b82f6" fontWeight="700">DB</text>
                  <text x="75" y="178" textAnchor="start" className="font-mono" fontSize="9" fill="#3b82f6" fontWeight="600">DATABASE</text>
                  <text x="75" y="190" textAnchor="start" fontSize="8" fill="#94a3b8">MongoDB · JWT · SQL</text>
                </g>

                <g className="cursor-pointer group" onMouseEnter={() => setActiveDiagramNode('observability')} onMouseLeave={() => setActiveDiagramNode(null)}>
                  <circle cx="365" cy="55" r="22" fill="#0d111a" stroke="#10b981" strokeWidth="1.6" opacity="0.9" />
                  <text x="365" y="59" textAnchor="middle" className="font-mono" fontSize="9" fill="#10b981" fontWeight="700">OB</text>
                  <text x="335" y="48" textAnchor="end" className="font-mono" fontSize="9" fill="#10b981" fontWeight="600">OBSERVABILITY</text>
                  <text x="335" y="60" textAnchor="end" fontSize="8" fill="#94a3b8">Prometheus · Grafana · Loki</text>
                </g>

                <g className="cursor-pointer group" onMouseEnter={() => setActiveDiagramNode('ai')} onMouseLeave={() => setActiveDiagramNode(null)}>
                  <circle cx="365" cy="185" r="22" fill="#0d111a" stroke="#8b5cf6" strokeWidth="1.6" opacity="0.9" />
                  <text x="365" y="189" textAnchor="middle" className="font-mono" fontSize="9" fill="#8b5cf6" fontWeight="700">AI</text>
                  <text x="335" y="178" textAnchor="end" className="font-mono" fontSize="9" fill="#8b5cf6" fontWeight="600">SPRING AI</text>
                  <text x="335" y="190" textAnchor="end" fontSize="8" fill="#94a3b8">GPT-4o · Apache Tika</text>
                </g>

                <circle cx="205" cy="120" r="34" fill="#161c2b" stroke="#f59e0b" strokeWidth="2" />
                <text x="205" y="116" textAnchor="middle" className="font-mono" fontSize="13" fontWeight="800" fill="#f59e0b">AK</text>
                <text x="205" y="130" textAnchor="middle" className="font-mono" fontSize="7" fill="#94a3b8">Spring Boot 3</text>
              </svg>

              <div className="mt-3 p-3 bg-white/5 border border-white/10 rounded font-mono text-xs text-foreground/70">
                {activeDiagramNode === 'frontend' && '⚡ Frontend: Responsive SPA with React, Tailwind CSS, and Vite.'}
                {activeDiagramNode === 'database' && '🔒 Security & DB: MongoDB indexing, JWT auth, Bcrypt hashing, PostgreSQL.'}
                {activeDiagramNode === 'observability' && '📊 Observability: Real-time telemetry stack (Prometheus, Grafana, Loki, Tempo).'}
                {activeDiagramNode === 'ai' && '🤖 Spring AI: Document summarization pipelines powered by OpenAI GPT-4o.'}
                {!activeDiagramNode && '💡 Hover over nodes to inspect system architecture layers.'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK TOOLKIT SECTION (REDESIGNED: Sleek Badge Grid, No Progress Timelines) ── */}
      <section id="tech-stack" className="py-20 w-full max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="eyebrow mb-3">my toolkit</div>
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-4">Tech Stack &amp; Specs</h2>
          <p className="text-foreground/60 max-w-lg mx-auto text-sm">
            Technologies I engineer with daily — from Java backend microservices to cloud observability and AI.
          </p>
          <div className="h-px w-24 mx-auto mt-4 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {['All', 'Backend Core', 'Databases & Security', 'DevOps & Observability', 'AI & Web'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedTechCat(cat)}
              className={`px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-200 rounded ${
                selectedTechCat === cat
                  ? 'bg-amber-400 text-[#1a1408] font-bold'
                  : 'glass border border-white/10 text-foreground/60 hover:text-foreground hover:border-amber-400/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Impressive Sleek Tech Cards (Without Sliders / Timelines) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map(skill => (
            <div
              key={skill.name}
              className="plate-ticks glass-dark p-5 rounded-xl transition-all duration-300 hover:glow-amber-sm group flex flex-col justify-between border border-white/10 hover:border-amber-400/30"
            >
              <div>
                {/* Badge Top Bar */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded border border-white/10 text-amber-400 bg-amber-400/10">
                    {skill.badge}
                  </span>
                  <span className="flex h-2 w-2 rounded-full" style={{ backgroundColor: skill.color }} />
                </div>

                {/* Tech Title */}
                <h3 className="font-bold text-lg text-foreground/95 group-hover:text-amber-300 transition-colors mb-2">
                  {skill.name}
                </h3>

                {/* Capability Description */}
                <p className="text-xs text-foreground/60 leading-relaxed mb-4">
                  {skill.desc}
                </p>
              </div>

              {/* Skill Capability Tag Pills */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                {skill.tags.map(t => (
                  <span key={t} className="tag-mono">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS SECTION ── */}
      <section id="projects" className="py-20 max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="eyebrow mb-3">what i've built</div>
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-4">Featured Live Projects</h2>
          <p className="text-foreground/60 max-w-xl mx-auto text-sm leading-relaxed">
            Real-world backend &amp; full-stack applications deployed live on Render with complete documentation.
          </p>
          <div className="h-px w-24 mx-auto mt-4 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        </div>

        {/* Project Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {['All Projects', 'Full-Stack Apps', 'Microservices & AI'].map(filter => (
            <button
              key={filter}
              onClick={() => setSelectedProjectFilter(filter)}
              className={`px-5 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 rounded ${
                selectedProjectFilter === filter
                  ? 'bg-amber-400 text-[#1a1408] font-bold'
                  : 'glass border border-white/10 text-foreground/60 hover:text-foreground hover:border-amber-400/30'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map(proj => (
            <div
              key={proj.id}
              className="plate-ticks glass-dark rounded-xl overflow-hidden flex flex-col group transition-all duration-400 hover:glow-amber-sm border border-white/10"
            >
              {/* Project Top Bar */}
              <div className="p-6 pb-4 border-b border-white/10 flex items-center justify-between">
                <span className="font-mono text-xs font-semibold px-2.5 py-1 bg-amber-400/10 text-amber-300 border border-amber-400/20 rounded">
                  FEATURED PROJECT
                </span>
                <span className="font-mono text-xs text-foreground/40">{proj.year}</span>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-foreground/95 group-hover:text-amber-300 transition-colors mb-1">
                    {proj.title}
                  </h3>
                  <p className="font-mono text-xs text-amber-400 mb-4">{proj.subtitle}</p>
                  <p className="text-foreground/60 text-sm leading-relaxed mb-6">{proj.desc}</p>

                  {/* Impact Stats Row */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-3 bg-white/5 border border-white/10 rounded">
                      <div className="font-bold text-xl text-amber-400">{proj.stat}</div>
                      <div className="font-mono text-[10px] text-foreground/40 mt-1">{proj.statLabel}</div>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/10 rounded">
                      <div className="font-bold text-xl text-blue-400">{proj.stat2}</div>
                      <div className="font-mono text-[10px] text-foreground/40 mt-1">{proj.stat2Label}</div>
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {proj.tech.map(t => (
                      <span key={t} className="tag-mono">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 font-mono text-xs uppercase font-bold bg-amber-400 text-[#1a1408] hover:bg-amber-300 transition-all rounded cursor-pointer"
                  >
                    <span>Launch Live App</span>
                    <ExternalIcon className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 font-mono text-xs uppercase font-semibold glass border border-white/20 text-foreground/80 hover:text-foreground hover:border-amber-400/40 transition-all rounded"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Code</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT & SYSTEM STATS MATRIX ── */}
      <section id="about" className="py-20 max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="eyebrow mb-3">system stats &amp; bio</div>
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-4">About Me</h2>
          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Visual & Bio Card */}
          <div className="lg:col-span-3 space-y-6">
            <div className="plate-ticks glass-dark p-6 rounded-xl border border-white/10 space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                Architecting resilient Java backends &amp; intelligent systems
              </h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Currently pursuing a B.Tech in Information Technology at Bhagwan Parshuram Institute of Technology (BPIT), New Delhi. My hands-on specialization is in designing high-throughput REST APIs, Spring Boot microservices, and observability telemetry.
              </p>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Having interned at DRDO and Khabai Tech, I built full-stack microservices platforms featuring Prometheus/Grafana observability and Eureka/Feign/Resilience4j fault isolation.
              </p>

              {/* Direct Copy Email Toast Action */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-4 py-2 font-mono text-xs bg-amber-400/10 text-amber-400 border border-amber-400/30 rounded hover:bg-amber-400/20 transition-all cursor-pointer"
                >
                  <CopyIcon className="w-4 h-4" />
                  <span>{copiedEmail ? 'Copied to Clipboard!' : 'Copy akashkumargupta9918@gmail.com'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Stats Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            <div className="plate-ticks glass-dark p-5 text-center rounded-xl border border-white/10">
              <div className="text-3xl font-extrabold text-amber-400">8.41</div>
              <div className="text-xs text-foreground/50 mt-1 font-mono">B.Tech CGPA</div>
              <div className="text-[10px] text-foreground/30 mt-0.5">BPIT New Delhi</div>
            </div>

            <div className="plate-ticks glass-dark p-5 text-center rounded-xl border border-white/10">
              <div className="text-3xl font-extrabold text-blue-400">30+</div>
              <div className="text-xs text-foreground/50 mt-1 font-mono">REST Endpoints</div>
              <div className="text-[10px] text-foreground/30 mt-0.5">JWT &amp; MongoDB</div>
            </div>

            <div className="plate-ticks glass-dark p-5 text-center rounded-xl border border-white/10">
              <div className="text-3xl font-extrabold text-emerald-400">2</div>
              <div className="text-xs text-foreground/50 mt-1 font-mono">Live Render Apps</div>
              <div className="text-[10px] text-foreground/30 mt-0.5">RentEase &amp; AI Summarizer</div>
            </div>

            <div className="plate-ticks glass-dark p-5 text-center rounded-xl border border-white/10">
              <div className="text-3xl font-extrabold text-purple-400">2</div>
              <div className="text-xs text-foreground/50 mt-1 font-mono">SDE Internships</div>
              <div className="text-[10px] text-foreground/30 mt-0.5">DRDO &amp; Khabai Tech</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE & EDUCATION TIMELINE ── */}
      <section id="experience" className="py-20 max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="eyebrow mb-3">career trajectory</div>
          <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-4">Work Experience</h2>
          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        </div>

        <div className="space-y-6">
          {EXPERIENCE.map(exp => (
            <div key={exp.company} className="plate-ticks glass-dark p-6 rounded-xl border border-white/10">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-4 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                  <span className="font-mono text-sm font-semibold" style={{ color: exp.color }}>{exp.company}</span>
                </div>
                <div className="text-right font-mono text-xs">
                  <div className="text-foreground/70">{exp.period}</div>
                  <div className="text-foreground/40 mt-0.5">{exp.location}</div>
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {exp.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/70 leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: exp.color }} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5">
                {exp.tech.map(t => (
                  <span key={t} className="tag-mono">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Education Block (B.Tech BPIT Only) */}
        <div className="mt-16">
          <div className="eyebrow mb-6">education</div>
          <div className="grid grid-cols-1 gap-4">
            {EDUCATION.map(edu => (
              <div key={edu.institution} className="plate-ticks glass-dark p-6 rounded-xl border border-white/10">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-lg text-foreground">{edu.institution}</h4>
                    <p className="text-sm text-foreground/70 mt-0.5">{edu.degree}</p>
                  </div>
                  <span className="font-mono font-extrabold text-base" style={{ color: edu.color }}>{edu.grade}</span>
                </div>
                <div className="flex justify-between items-center font-mono text-xs text-foreground/40 pt-3 mt-3 border-t border-white/10">
                  <span>{edu.location}</span>
                  <span>{edu.period}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECRUITER CONTACT COMMAND DECK ── */}
      <section id="contact" className="py-24 max-w-4xl mx-auto px-4 md:px-6 text-center">
        <div className="eyebrow mb-3">get in touch</div>
        <h2 className="text-4xl lg:text-6xl font-bold gradient-text mb-4">Let's Build Together</h2>
        <p className="text-foreground/60 text-base max-w-lg mx-auto mb-10">
          Open for Backend SDE roles, Spring Boot internships, and microservices collaborations.
        </p>

        {/* Contact Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <a
            href={`mailto:${LINKS.email}`}
            className="plate-ticks glass-dark p-5 rounded-xl border border-amber-400/30 hover:glow-amber-sm transition-all text-center block"
          >
            <div className="font-mono text-xs text-amber-400 font-semibold mb-1 uppercase tracking-wider">Direct Email</div>
            <div className="text-sm font-semibold text-foreground/90 break-all">{LINKS.email}</div>
          </a>

          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="plate-ticks glass-dark p-5 rounded-xl border border-white/10 hover:border-white/30 transition-all text-center block"
          >
            <div className="font-mono text-xs text-foreground/50 font-semibold mb-1 uppercase tracking-wider">GitHub</div>
            <div className="text-sm font-semibold text-foreground/90">github.com/aakashagr22</div>
          </a>

          <a
            href={LINKS.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="plate-ticks glass-dark p-5 rounded-xl border border-amber-400/20 hover:border-amber-400/50 transition-all text-center block"
          >
            <div className="font-mono text-xs text-amber-400 font-semibold mb-1 uppercase tracking-wider">LeetCode</div>
            <div className="text-sm font-semibold text-foreground/90">leetcode.com/u/akashagr22</div>
          </a>
        </div>

        <button
          onClick={handleCopyEmail}
          className="inline-flex items-center gap-2 px-8 py-3.5 font-mono text-sm uppercase font-bold bg-amber-400 text-[#1a1408] hover:bg-amber-300 transition-all rounded shadow-lg shadow-amber-400/20 cursor-pointer"
        >
          <CopyIcon className="w-4 h-4" />
          <span>{copiedEmail ? 'Email Copied!' : 'Copy Email Address'}</span>
        </button>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 border-t border-white/10 font-mono text-xs text-foreground/40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-wrap items-center justify-between gap-4">
          <span>&copy; {new Date().getFullYear()} Akash Kumar · Java Backend Developer</span>
          <div className="flex gap-4">
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">GitHub</a>
            <a href={LINKS.leetcode} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">LeetCode</a>
            <a href={LINKS.rentease} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">RentEase</a>
            <a href={LINKS.aiSummarizer} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">AI Summarizer</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
