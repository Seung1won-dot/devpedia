import { useState } from 'react'
import type { Level } from '../types'

export const LEVEL_LABEL: Record<Level, string> = { 1: '기초', 2: '중급', 3: '심화' }
const LEVELS: Level[] = [1, 2, 3]
const TAG_LIMIT = 12

interface Props {
  levels: Set<Level>
  onToggleLevel: (l: Level) => void
  tags: { tag: string; count: number }[]
  activeTag: string | null
  onSelectTag: (tag: string | null) => void
}

export function FilterBar({ levels, onToggleLevel, tags, activeTag, onSelectTag }: Props) {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? tags : tags.slice(0, TAG_LIMIT)
  const hidden = tags.length - visible.length

  return (
    <div className="filters">
      <div className="seg" role="group" aria-label="난이도">
        {LEVELS.map((l) => (
          <button key={l} type="button" aria-pressed={levels.has(l)} onClick={() => onToggleLevel(l)}>
            {LEVEL_LABEL[l]}
          </button>
        ))}
      </div>
      {tags.length > 0 && (
        <div className="filters__tags" role="group" aria-label="태그">
          {visible.map(({ tag, count }) => (
            <button
              key={tag}
              type="button"
              className="chip chip--tag"
              aria-pressed={activeTag === tag}
              onClick={() => onSelectTag(activeTag === tag ? null : tag)}
            >
              {tag}
              <span className="chip__count">{count}</span>
            </button>
          ))}
          {hidden > 0 && (
            <button type="button" className="chip chip--ghost" onClick={() => setExpanded(true)}>
              +{hidden}
            </button>
          )}
          {expanded && tags.length > TAG_LIMIT && (
            <button type="button" className="chip chip--ghost" onClick={() => setExpanded(false)}>
              접기
            </button>
          )}
        </div>
      )}
    </div>
  )
}
