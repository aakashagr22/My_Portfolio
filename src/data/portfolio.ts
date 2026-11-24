export const PROFILE = {
  name: 'Akash Kumar',
  initials: 'AK',
  role: 'Software Engineer · Java, Spring Boot & AI Systems',
  location: 'New Delhi, India',
  email: 'akashkumargupta9918@gmail.com',
  phone: '+91 99847 57701',
  resumeUrl: '/Akash_Kumar_Resume.pdf',
  summary:
    'B.Tech IT student at BPIT New Delhi (CGPA 8.46/10) with hands-on experience in Java, Spring Boot, Spring AI, distributed microservices, Apache Kafka, Docker, and AWS. Built a 3-service distributed banking system achieving 99.9% inter-service reliability and an observability suite that cut incident detection time by 30%.',
}

export const LINKS = {
  linkedin: 'https://www.linkedin.com/in/akash-kumar-5715a0218/',
  github: 'https://github.com/aakashagr22',
  leetcode: 'https://leetcode.com/u/akashagr22/',
  careerForge: 'https://careerforge.akashkumargupta.me/',
  docIntellect: 'https://www.docintellect.akashkumargupta.me/',
  stayFinder: 'https://rentease-kr3s.onrender.com/',
}

export const NAV_ITEMS = [
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
]

export const HERO_METRICS = [
  { value: '99.9%', label: 'Inter-Service Reliability', context: 'NeoBank Microservices' },
  { value: '30%', label: 'Faster Incident Detection', context: 'DRDO Observability' },
  { value: '150+', label: 'Students Served', context: 'CareerForge Platform' },
  { value: '8.46', label: 'B.Tech IT CGPA', context: 'BPIT New Delhi' },
]

export type ProjectCategory = 'Full Stack' | 'Backend' | 'Frontend' | 'AI & RAG'

export interface ProjectItem {
  id: string
  index: string
  title: string
  role: string
  tagline: string
  category: 'Full Stack' | 'AI & RAG'
  categories: ProjectCategory[]
  year: string
  previewImage: string
  previewAlt: string
  summary: string
  contribution: string
  problemSolved: string
  solution: string
  architecture: string
  techDecisions: { tech: string; reason: string }[]
  features: string[]
  challenges: string[]
  outcomes: string[]
  highlights: string[]
  tech: string[]
  metrics: { label: string; value: string }[]
  liveUrl?: string
  githubUrl: string
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'careerforge',
    index: '01',
    title: 'CareerForge',
    role: 'Java Backend Developer',
    tagline: 'Semester-Wise Placement Preparation Platform',
    category: 'Full Stack',
    categories: ['Full Stack', 'Backend', 'Frontend'],
    year: '2025 — 2026',
    previewImage: '/projects/careerforge-preview.jpg',
    previewAlt: 'CareerForge placement preparation dashboard UI preview showing semester-wise career roadmaps, study resources, and real-time group chat',
    summary:
      'A semester-wise placement preparation platform serving 150+ students — helping undergraduates start from their current semester (e.g., Core Java/DSA in Sem 3–4 vs. LLD/HLD & Microservices in Sem 6–7) with structured 3-tier practice sheets, progress rings, and live peer chat.',
    contribution:
      'Architected the Semester-Wise Practice Sheets subsystem (Sheet → Topic → Question) and Spring Boot 3 backend — eliminating N+1 queries with single-pass JPQL DTO projections, adding composite PostgreSQL indexing via Flyway, implementing JWT + BCrypt auth, and engineering WebSocket group chat.',
    problemSolved:
      'Students preparing for campus placements face information overload because resources are not structured around their current semester or remaining months before placements (e.g., a student starting in 4th semester needs a clear Sem 4 roadmap rather than generic checklists).',
    solution:
      'Built a semester-wise curriculum engine spanning DSA, Full-Stack, AI/ML, and System Design with a 3-tier hierarchy (Sheet → Topic → Question), bookmarking, difficulty tags, live completion progress rings, Groq API guidance, and real-time WebSocket study rooms.',
    architecture:
      'React SPA uses optimistic UI updates for instant checkbox toggles (dispatching background POST requests with rollback on failure) backed by Spring Boot 3 REST APIs, @Transactional(readOnly = true) single-pass JPQL DTO projections with LEFT JOIN on a composite-indexed student_question_progress(user_id, question_id) PostgreSQL table, Flyway migrations, and WebSockets.',
    techDecisions: [
      {
        tech: 'Composite Index (user_id, question_id)',
        reason: 'Normalized student_question_progress in PostgreSQL via Flyway, turning status checks into O(1) index lookups and preventing write deadlocks.',
      },
      {
        tech: 'Single-Pass JPQL DTO Projections',
        reason: 'Replaced Hibernate deep entity graphs (25+ N+1 queries) with a single LEFT JOIN query in @Transactional(readOnly = true), cutting 400+ item sheet load from ~1,850 ms to < 15 ms.',
      },
      {
        tech: 'Optimistic UI Updates in React',
        reason: 'Updates local state and animated progress rings immediately while syncing POST /api/student/sheets/questions/{id}/toggle in the background with error rollback.',
      },
      {
        tech: 'JWT Access/Refresh + WebSockets',
        reason: 'Secures stateless REST APIs with BCrypt while enabling low-latency real-time group messaging and online presence.',
      },
    ],
    features: [
      'Semester-wise placement roadmaps tailored to the student’s current semester (Sem 3–4 Core Java/DSA to Sem 6–7 LLD/HLD & Microservices)',
      '3-tier Practice Sheets (Sheet → Topic → Question) covering 400+ curated problems across 25 topics',
      'Individual check-off status, bookmarking, difficulty tagging, external practice links, and live progress rings',
      'Real-time WebSocket group communication with live messaging and online presence',
      'Groq API study assistance, Spring Security (JWT + BCrypt), and Docker + Flyway migrations',
    ],
    challenges: [
      'N+1 Query & Cartesian Product bottleneck: Loading 400+ problems across 25 topics initially caused 25+ database roundtrips and ~1,850 ms latency — solved via single-pass JPQL DTO projections (< 15 ms).',
      'Concurrent write contention & UI lag on checkbox toggles — solved via composite unique indexing on (user_id, question_id) and optimistic React UI updates with rollback.',
    ],
    outcomes: [
      'Served 150+ students with semester-wise placement roadmaps, study resources, and live progress tracking.',
      'Reduced 400+ item sheet load latency from ~1,850 ms (25+ N+1 queries) to < 15 ms (1 single-pass query) with zero write deadlocks.',
    ],
    highlights: [
      'Eliminated N+1 queries across 400+ problems & 25 topics using single-pass JPQL DTO projections (< 15 ms load time vs. ~1,850 ms).',
      'Designed composite unique index on student_question_progress(user_id, question_id) in PostgreSQL (Flyway) + optimistic UI checkbox updates.',
      'Implemented JWT access/refresh auth with BCrypt, real-time WebSocket group chat, and Dockerized deployment.',
    ],
    tech: ['Java 21', 'Spring Boot 3', 'PostgreSQL', 'Flyway', 'Docker', 'React', 'Tailwind CSS', 'Groq API', 'JWT', 'WebSocket'],
    metrics: [
      { value: '150+', label: 'Students Served' },
      { value: '< 15 ms', label: 'Sheet Load (400+ items)' },
    ],
    liveUrl: LINKS.careerForge,
    githubUrl: LINKS.github,
  },
  {
    id: 'docintellect',
    index: '02',
    title: 'DocIntellect',
    role: 'Developer',
    tagline: 'AI Document Intelligence & Career Assistant',
    category: 'AI & RAG',
    categories: ['AI & RAG', 'Full Stack', 'Backend'],
    year: '2026',
    previewImage: '/projects/docintellect-preview.png',
    previewAlt: 'DocIntellect AI document intelligence workspace UI preview showing resume audit, RAG citations, and MCP tool calling',
    summary:
      'An AI-powered document intelligence platform for multi-format file summarization, section-level summaries, ATS keyword matching, resume risk audits, and personalized interview preparation.',
    contribution:
      'Developed the end-to-end Spring AI RAG pipeline, Apache Tika multi-format ingestion, pgvector semantic search, Model Context Protocol (MCP) tool calling, OAuth 2.0 security, and Docker + GitHub Actions CI/CD.',
    problemSolved:
      'Generic LLM wrappers hallucinate answers without grounding in source documents and cannot safely invoke structured tools on authorized user files.',
    solution:
      'Implemented Retrieval-Augmented Generation (RAG) with Spring AI and pgvector for verifiable source citations, paired with MCP tool calling to query authorized documents and fetch metadata.',
    architecture:
      'Vanilla JS (ES6+) client authenticates via Spring Security OAuth 2.0; uploaded multi-format files are parsed by Apache Tika, chunked and embedded into PostgreSQL pgvector, and queried through Spring AI RAG + MCP tools, all containerized via Docker and GitHub Actions.',
    techDecisions: [
      {
        tech: 'Spring AI + pgvector',
        reason: 'Keeps vector similarity search inside PostgreSQL alongside relational metadata for transactional consistency.',
      },
      {
        tech: 'Model Context Protocol (MCP)',
        reason: 'Standardizes AI tool calling so the assistant can query authorized documents and fetch metadata reliably.',
      },
      {
        tech: 'Apache Tika',
        reason: 'Extracts clean text and metadata across PDF, Word, and plain-text documents in a single unified pipeline.',
      },
      {
        tech: 'Spring Security OAuth 2.0 + GitHub Actions',
        reason: 'Provides industry-standard delegated authentication and automated containerized CI/CD deployments.',
      },
    ],
    features: [
      'Multi-format document ingestion and section-level summarization via Apache Tika',
      'RAG question-answering with verifiable source citations using Spring AI & pgvector',
      'ATS keyword matching, resume risk audits, and personalized interview preparation',
      'MCP AI tool calling to query authorized documents and fetch metadata',
      'OAuth 2.0 security and automated Docker deployment via GitHub Actions',
    ],
    challenges: [
      'Grounding LLM responses in exact document chunks to produce verifiable citations without hallucinated references.',
      'Enforcing document-level authorization when exposing metadata and query capabilities through MCP tool calls.',
    ],
    outcomes: [
      'Delivered live deployed AI document & resume intelligence platform on Render.',
      'Automated containerized build and deployment workflow using Docker and GitHub Actions.',
    ],
    highlights: [
      'Implemented Retrieval-Augmented Generation (RAG) with Spring AI and pgvector for verifiable source citations.',
      'Integrated AI tool calling via Model Context Protocol (MCP) to query authorized documents and fetch metadata.',
      'Secured with Spring Security OAuth 2.0 and automated containerized deployment using Docker and GitHub Actions.',
    ],
    tech: ['Spring Boot', 'Spring AI', 'RAG', 'MCP', 'pgvector', 'Apache Tika', 'OAuth 2.0', 'Docker', 'GitHub Actions', 'Vanilla JS (ES6+)'],
    metrics: [
      { value: 'RAG + MCP', label: 'Verifiable Citations' },
      { value: 'OAuth 2.0', label: 'CI/CD & Auth' },
    ],
    liveUrl: LINKS.docIntellect,
    githubUrl: LINKS.github,
  },
  {
    id: 'stayfinder',
    index: '03',
    title: 'StayFinder',
    role: 'Developer',
    tagline: 'Location-Based Rental Platform',
    category: 'Full Stack',
    categories: ['Full Stack', 'Backend', 'Frontend'],
    year: '2025',
    previewImage: '/projects/stayfinder-preview.jpg',
    previewAlt: 'StayFinder location-based rental platform UI preview showing property listings and interactive map pins',
    summary:
      'A location-aware rental discovery platform powered by 30+ RESTful APIs in Spring Boot and Spring Data MongoDB, supporting property listings, reviews, user management, and map visualization.',
    contribution:
      'Designed and built the 30+ Spring Boot RESTful APIs, JWT + BCrypt authentication layer, optimized MongoDB NoSQL document schemas and indexing strategies, plus Cloudinary and Google Maps API integrations.',
    problemSolved:
      'Rental listings with rich media, nested reviews, and location queries require flexible document modeling, fast indexed lookups, and secure role-protected endpoints.',
    solution:
      'Modeled entity relationships and indexing strategies in MongoDB with Spring Data MongoDB, offloaded media to Cloudinary, and integrated Google Maps API for visual property discovery.',
    architecture:
      'HTML/CSS/JavaScript frontend consumes 30+ stateless Spring Boot REST APIs secured by JWT and BCrypt; MongoDB stores indexed property, review, and user documents while Cloudinary handles cloud image storage and Google Maps API renders interactive locations.',
    techDecisions: [
      {
        tech: 'Spring Data MongoDB',
        reason: 'Fits flexible property attributes and nested review structures while supporting strategic indexing for fast retrieval.',
      },
      {
        tech: 'JWT & BCrypt',
        reason: 'Protects 30+ RESTful endpoints with stateless token verification and salted credential hashing.',
      },
      {
        tech: 'Cloudinary',
        reason: 'Offloads high-resolution property image storage and CDN delivery from the application server.',
      },
      {
        tech: 'Google Maps API',
        reason: 'Provides interactive, location-aware property discovery and geographic visualization.',
      },
    ],
    features: [
      '30+ RESTful APIs for property listings, reviews, and user management',
      'JWT authentication and BCrypt password hashing across protected routes',
      'Optimized NoSQL (MongoDB) document schemas with entity relationships and indexing',
      'Cloud-based property image upload and delivery via Cloudinary',
      'Location-aware property discovery and map visualization with Google Maps API',
    ],
    challenges: [
      'Designing MongoDB document schemas and indexes to balance embedded/referenced entity relationships for scalable queries.',
      'Coordinating authenticated property creation with external Cloudinary media uploads and Google Maps coordinates.',
    ],
    outcomes: [
      'Engineered 30+ production RESTful APIs deployed live on Render.',
      'Optimized MongoDB schemas and indexing strategies for efficient data retrieval.',
    ],
    highlights: [
      'Implemented JWT authentication and BCrypt password hashing to protect application endpoints and user data.',
      'Designed and optimized MongoDB document schemas with entity relationships and indexing strategies.',
      'Integrated Cloudinary for cloud image storage and Google Maps API for interactive property visualization.',
    ],
    tech: ['Java 21', 'Spring Boot', 'REST API', 'MongoDB', 'NoSQL', 'HTML', 'CSS', 'JavaScript', 'Cloudinary', 'Google Maps API'],
    metrics: [
      { value: '30+', label: 'RESTful APIs' },
      { value: 'MongoDB', label: 'Indexed NoSQL' },
    ],
    liveUrl: LINKS.stayFinder,
    githubUrl: LINKS.github,
  },
]

export interface SkillGroup {
  id: string
  category: string
  eyebrow: string
  description: string
  items: string[]
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'languages',
    category: 'Programming Languages',
    eyebrow: '01 / LANGUAGES',
    description: 'Core languages for backend services, data structures, and web interfaces.',
    items: ['Java (Java 21)', 'Python', 'JavaScript (ES6+)', 'C++', 'SQL', 'HTML / CSS3'],
  },
  {
    id: 'frameworks',
    category: 'Frameworks & Libraries',
    eyebrow: '02 / FRAMEWORKS',
    description: 'Production ecosystem for microservices, AI orchestration, security, and SPAs.',
    items: ['Spring', 'Spring Boot', 'Spring AI', 'React.js', 'JPA / Hibernate', 'Spring Security', 'JWT', 'OAuth 2.0', 'Node.js & Express (Familiar)', 'FastAPI (Familiar)'],
  },
  {
    id: 'databases',
    category: 'Databases & Vector Stores',
    eyebrow: '03 / DATA LAYER',
    description: 'Relational, document, and vector databases for transactional and RAG workloads.',
    items: ['PostgreSQL', 'MongoDB', 'MySQL', 'pgvector', 'Flyway'],
  },
  {
    id: 'architecture',
    category: 'Distributed Systems & Core',
    eyebrow: '04 / ARCHITECTURE',
    description: 'Patterns and protocols for resilient, decoupled, high-availability systems.',
    items: ['Microservices', 'Distributed Systems', 'Apache Kafka', 'OpenFeign', 'Eureka Service Registry', 'Resilience4j', 'WebSockets', 'RAG & MCP', 'OOP'],
  },
  {
    id: 'devops',
    category: 'Cloud, DevOps & Observability',
    eyebrow: '05 / INFRASTRUCTURE',
    description: 'Containerization, CI/CD automation, cloud hosting, and full-stack telemetry.',
    items: ['AWS EC2', 'Docker', 'GitHub Actions', 'Jenkins', 'Prometheus', 'Grafana', 'Loki & Tempo', 'Swagger', 'Maven', 'JUnit', 'Git & GitHub', 'Linux'],
  },
  {
    id: 'ai',
    category: 'AI',
    eyebrow: '06 / AI & RAG',
    description: 'Building grounded LLM applications, semantic retrieval pipelines, and MCP tool-calling systems.',
    items: ['LLMs', 'RAG', 'MCP', 'VectorDB (pgvector)', 'Semantic Search', 'Embeddings', 'Spring AI', 'Groq API', 'Apache Tika', 'AI Tool Calling'],
  },
  {
    id: 'ai-tools',
    category: 'Developer AI Tools',
    eyebrow: '07 / AI WORKFLOW',
    description: 'Modern AI-assisted development environments used in daily engineering.',
    items: ['Cursor', 'Codex', 'Antigravity', 'Claude'],
  },
]

export interface ExperienceItem {
  role: string
  company: string
  type: string
  period: string
  location: string
  impactBadge: string
  bullets: string[]
  tech: string[]
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Full Stack Web Development Intern',
    company: 'Khabai Tech',
    type: 'Internship',
    period: 'Aug 2025 — Jan 2026',
    location: 'Remote · Patna, Bihar',
    impactBadge: '99.9% Call Reliability',
    bullets: [
      'Engineered NeoBank, a distributed banking system with 3 independent microservices (Account, Transaction, and Fund Transfer) using Java and Spring Boot, exposing REST APIs throughout the SDLC.',
      'Implemented synchronous inter-service communication using OpenFeign and Eureka Service Registry for service discovery and API-based integration.',
      'Integrated Apache Kafka for asynchronous, event-driven communication between microservices, enabling decoupled event processing.',
      'Implemented Circuit Breaker and Retry patterns using Resilience4j to handle service failures, prevent cascading failures, and ensure 99.9% inter-service call reliability.',
      'Deployed cloud-native Spring Boot microservices on AWS EC2 instances, configuring the server environment for availability, scalability, and performance.',
    ],
    tech: ['Spring Boot', 'OpenFeign', 'Eureka Service Registry', 'Apache Kafka', 'Resilience4j', 'AWS EC2', 'Microservices', 'REST APIs'],
  },
  {
    role: 'Software Development Intern',
    company: 'Defence Research and Development Organisation (DRDO)',
    type: 'Internship',
    period: 'Jun 2025 — Jul 2025',
    location: 'On-site · New Delhi, India',
    impactBadge: '30% Faster Detection',
    bullets: [
      'Orchestrated an observability suite using Docker and Prometheus, facilitating real-time metric visualization for over 3 active services.',
      'Achieved a 30% reduction in incident detection time through enhanced monitoring using Grafana, Loki, and Tempo.',
      'Developed and documented backend endpoints with Spring Boot and Swagger, improving collaboration between frontend and backend teams.',
    ],
    tech: ['Docker', 'Prometheus', 'Grafana', 'Loki', 'Tempo', 'Spring Boot', 'Swagger', 'REST APIs', 'React', 'SQL'],
  },
]

export const EDUCATION = {
  degree: 'Bachelor of Technology in Information Technology',
  institution: 'Bhagwan Parshuram Institute of Technology (BPIT)',
  location: 'New Delhi, India',
  period: 'Aug 2024 — May 2027',
  grade: 'CGPA 8.46 / 10',
}

export const CERTIFICATES = [
  {
    title: 'Java Developer Course',
    issuer: 'Udemy',
    category: 'Backend & Core Java',
    detail: 'Completed comprehensive Java programming and backend development curriculum.',
  },
  {
    title: 'Full Stack Development Course',
    issuer: 'Apna College',
    category: 'Full-Stack Web',
    detail: 'Completed end-to-end frontend, backend, database, and deployment training.',
  },
]

export const HIGHLIGHTS_GALLERY = [
  {
    metric: '99.9%',
    title: 'Distributed Banking Reliability',
    source: 'Khabai Tech · NeoBank',
    detail: 'Circuit Breaker & Retry fault tolerance with Resilience4j across 3 Spring Boot microservices.',
  },
  {
    metric: '-30%',
    title: 'Incident Detection Time',
    source: 'DRDO · Observability Suite',
    detail: 'Unified metrics, logs, and traces with Prometheus, Grafana, Loki, and Tempo across 3+ services.',
  },
  {
    metric: '150+',
    title: 'Students Onboarded',
    source: 'CareerForge Platform',
    detail: 'Full-stack placement platform with JWT auth, WebSocket group chat, and Flyway migrations.',
  },
]
