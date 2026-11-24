import { useEffect, useRef, useState, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delayMs?: number
  className?: string
}

/** Lightweight scroll-triggered reveal wrapper using IntersectionObserver. */
export function Reveal({ children, delayMs = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
