import { useState } from 'react'
import { SKILL_GROUPS } from '../data/portfolio'
import { Reveal } from './Reveal'

export function SkillsSection() {
  const [selectedGroup, setSelectedGroup] = useState<string>('all')
  const [highlightedChip, setHighlightedChip] = useState<string | null>(null)

  const visibleGroups =
    selectedGroup === 'all'
      ? SKILL_GROUPS
      : SKILL_GROUPS.filter((g) => g.id === selectedGroup)

  return (
    <section id="skills" className="py-20 md:py-28 border-t border-border bg-surface-alt/35">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <span className="editorial-eyebrow">02 / Technical Matrix</span>
              <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight text-ink">
                Interactive Technology Stack
              </h2>
              <p className="text-muted text-base leading-relaxed">
                Organized by engineering layer — click a group to filter or select any technology chip to inspect focus.
              </p>
            </div>

            {/* Group Selector Pills */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedGroup('all')}
                className={`px-3.5 py-2 rounded-lg font-mono text-xs transition-all cursor-pointer border ${
                  selectedGroup === 'all'
                    ? 'bg-accent text-accent-ink border-accent font-medium'
                    : 'bg-surface text-muted border-border hover:text-ink hover:border-accent/40'
                }`}
              >
                All Groups ({SKILL_GROUPS.length})
              </button>
              {SKILL_GROUPS.map((group) => (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setSelectedGroup(group.id)}
                  className={`px-3.5 py-2 rounded-lg font-mono text-xs transition-all cursor-pointer border ${
                    selectedGroup === group.id
                      ? 'bg-accent text-accent-ink border-accent font-medium'
                      : 'bg-surface text-muted border-border hover:text-ink hover:border-accent/40'
                  }`}
                >
                  {group.category.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div key={selectedGroup} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 panel-in">
          {visibleGroups.map((group, idx) => (
            <Reveal key={group.id} delayMs={idx * 55}>
              <div className="studio-card studio-card-hover rounded-2xl p-6 h-full flex flex-col justify-between space-y-5">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-medium">
                      {group.eyebrow}
                    </span>
                    <span className="font-mono text-[11px] text-muted">
                      {group.items.length} tools
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-ink">
                    {group.category}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">{group.description}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border">
                  {group.items.map((item) => {
                    const isSelected = highlightedChip === item
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setHighlightedChip(isSelected ? null : item)}
                        className={`tech-pill cursor-pointer active:scale-95 ${
                          isSelected
                            ? '!bg-accent !text-accent-ink !border-accent font-medium'
                            : 'hover:border-accent/50 hover:text-ink hover:-translate-y-0.5'
                        }`}
                      >
                        {item}
                      </button>
                    )
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
