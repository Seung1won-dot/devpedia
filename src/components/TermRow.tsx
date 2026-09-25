import type { Category, Term } from '../types'
import { toHash } from '../lib/route'
import { highlightSegments } from '../lib/highlight'
import { catStyle } from '../lib/catStyle'
import { LEVEL_LABEL } from './FilterBar'
import { StarButton } from './StarButton'

export const STATUS_LABEL: Record<Term['status'], string | null> = { draft: '초안', review: '검토 중', published: null }

interface Props {
  term: Term
  category: Category | undefined
  query: string
  selected: boolean
  starred: boolean
  onToggleStar: () => void
  showCategory: boolean
}

export function Highlighted({ text, query }: { text: string; query: string }) {
  return (
    <>
      {highlightSegments(text, query).map((s, i) => (s.hit ? <mark key={i}>{s.text}</mark> : <span key={i}>{s.text}</span>))}
    </>
  )
}

/** 목록 한 줄. 별표 버튼은 링크 안에 중첩하지 않고(nested-interactive) 형제로 두고 CSS 로 오른쪽에 겹친다. */
export function TermRow({ term, category, query, selected, starred, onToggleStar, showCategory }: Props) {
  const status = STATUS_LABEL[term.status]
  return (
    <li className="row-item" style={catStyle(term.category)}>
      <a className="row" href={toHash({ kind: 'term', id: term.id })} aria-current={selected ? 'page' : undefined}>
        <span className="row__dot" aria-hidden="true" />
        <span className="row__body">
          <span className="row__title">
            <span className="row__term"><Highlighted text={term.term} query={query} /></span>
            <span className={`badge badge--level-${term.level}`}>{LEVEL_LABEL[term.level]}</span>
            {status && <span className="badge badge--status">{status}</span>}
            {showCategory && category && (
              <span className="row__cat">{category.icon} {category.name}</span>
            )}
          </span>
          <span className="row__def"><Highlighted text={term.definition} query={query} /></span>
        </span>
      </a>
      <StarButton starred={starred} onToggle={onToggleStar} size={16} className="row__star" />
    </li>
  )
}
