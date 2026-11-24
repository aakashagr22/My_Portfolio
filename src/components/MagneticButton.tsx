import { useRef, useState, type ReactNode } from 'react'

interface MagneticProps {
  children: ReactNode
  className?: string
  strength?: number
}

/** Subtle pointer-following magnetic wrapper for primary CTAs on desktop fine pointers. */
export function MagneticWrap({ children, className = '', strength = 0.18 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      typeof window === 'undefined' ||
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength
    const clamp = (val: number) => Math.max(-5, Math.min(5, val))
    setOffset({ x: clamp(dx), y: clamp(dy) })
  }

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: offset.x === 0 && offset.y === 0
          ? 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)'
          : 'transform 0.12s ease-out',
      }}
      className={`inline-flex ${className}`}
    >
      {children}
    </div>
  )
}
