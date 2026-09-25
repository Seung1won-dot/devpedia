import type { KeyboardEvent } from 'react'
import type { Category, Term } from '../types'
import { TermRow } from './TermRow'

interface Props {
  terms: Term[]
  categories: Map<string, Category>
  query: string
  selectedId: string | null
  stars: Set<string>
  onToggleStar: (id: string) => void
  showCategory: boolean
}

/** ↑/↓ 로 행 사이를 이동한다. Enter 는 링크 기본 동작. */
function onKeyDown(e: KeyboardEvent<HTMLUListElement>) {
  if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
  const links = Array.from(e.currentTarget.querySelectorAll<HTMLAnchorElement>('a.row'))
  const i = links.indexOf(document.activeElement as HTMLAnchorElement)
  const next = e.key === 'ArrowDown' ? Math.min(i + 1, links.length - 1) : Math.max(i - 1, 0)
  links[next]?.focus()
  e.preventDefault()
}

export function TermList({ terms, categories, query, selectedId, stars, onToggleStar, showCategory }: Props) {
  return (
    <ul className="list" data-testid="term-list" onKeyDown={onKeyDown}>
      {terms.map((t) => (
        <TermRow
          key={t.id}
          term={t}
          category={categories.get(t.category)}
          query={query}
          selected={t.id === selectedId}
          starred={stars.has(t.id)}
          onToggleStar={() => onToggleStar(t.id)}
          showCategory={showCategory}
        />
      ))}
    </ul>
  )
}
