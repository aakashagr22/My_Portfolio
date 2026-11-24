import { useState, useRef, useEffect } from 'react'
import { EXPERIENCE, PROFILE, PROJECTS } from '../data/portfolio'

interface TerminalLine {
  id: number
  type: 'input' | 'output'
  text: string
}

const INITIAL_LINES: TerminalLine[] = [
  { id: 1, type: 'input', text: 'whoami' },
  {
    id: 2,
    type: 'output',
    text: `${PROFILE.name} — Software Engineer (Java, Spring Boot, Spring AI, Microservices)`,
  },
  { id: 3, type: 'output', text: `Location: ${PROFILE.location} | B.Tech IT @ BPIT (CGPA 8.46/10)` },
  { id: 4, type: 'output', text: "Type 'help' or click a command below." },
]

const QUICK_COMMANDS = ['help', 'projects', 'experience', 'skills', 'contact']

export function InteractiveTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>(INITIAL_LINES)
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(5)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return

    if (cmd === 'clear') {
      setLines([])
      setInput('')
      return
    }

    let response: string[] = []

    switch (cmd) {
      case 'help':
        response = [
          'Available commands: whoami, projects, experience, skills, contact, resume, clear',
        ]
        break
      case 'whoami':
        response = [
          `${PROFILE.name} — ${PROFILE.role}`,
          'Internships: Khabai Tech (NeoBank 99.9% reliability) & DRDO (-30% detection time).',
        ]
        break
      case 'projects':
        response = PROJECTS.map(
          (p) => `[${p.index}] ${p.title} (${p.year}) — ${p.tagline}`,
        )
        break
      case 'experience':
        response = EXPERIENCE.map(
          (e) => `${e.role} @ ${e.company} (${e.period}) · ${e.impactBadge}`,
        )
        break
      case 'skills':
        response = [
          'Backend: Java 21, Spring Boot 3, Spring Security, JWT, OAuth 2.0, Kafka, Resilience4j',
          'AI & Data: Spring AI, RAG, MCP, pgvector, PostgreSQL, MongoDB, MySQL',
          'Cloud & Ops: AWS EC2, Docker, GitHub Actions, Prometheus, Grafana, Loki, Tempo',
        ]
        break
      case 'contact':
        response = [
          `Email: ${PROFILE.email}`,
          `Phone: ${PROFILE.phone}`,
          `Location: ${PROFILE.location}`,
        ]
        break
      case 'resume':
        window.open(PROFILE.resumeUrl, '_blank', 'noopener,noreferrer')
        response = ['Opening Akash_Kumar_Resume.pdf in a new tab...']
        break
      default:
        response = [`Command not found: '${cmd}'. Try 'help'.`]
    }

    const added: TerminalLine[] = [
      { id: nextId.current++, type: 'input', text: raw.trim() },
      ...response.map((text) => ({ id: nextId.current++, type: 'output' as const, text })),
    ]
    setLines((prev) => [...prev, ...added])
    setInput('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    runCommand(input)
  }

  return (
    <div className="space-y-3 panel-in">
      {/* Output Window */}
      <div
        ref={scrollRef}
        className="rounded-xl bg-[#0B1220] text-[#E2E8F0] border border-border p-3.5 h-44 overflow-y-auto font-mono text-[11.5px] leading-relaxed space-y-1.5"
      >
        {lines.map((line) => (
          <div key={line.id} className={line.type === 'input' ? 'text-[#B9EF68]' : 'text-[#CBD5E1]'}>
            {line.type === 'input' ? `> ${line.text}` : line.text}
          </div>
        ))}
      </div>

      {/* Quick Command Chips */}
      <div className="flex flex-wrap gap-1.5">
        {QUICK_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => runCommand(cmd)}
            className="font-mono text-[11px] px-2.5 py-1 rounded bg-surface-alt border border-border text-muted hover:text-ink hover:border-accent/50 transition-colors cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Command Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 rounded-xl bg-surface-alt/70 border border-border px-3 py-2">
        <span className="font-mono text-xs text-accent font-semibold" aria-hidden="true">&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a command (e.g. projects, skills)..."
          aria-label="Interactive terminal command input"
          className="flex-1 bg-transparent font-mono text-xs text-ink placeholder:text-muted focus:outline-none"
        />
        <button
          type="submit"
          className="font-mono text-[11px] px-2.5 py-1 rounded bg-accent text-accent-ink font-medium cursor-pointer hover:opacity-90"
        >
          Run
        </button>
      </form>
    </div>
  )
}
