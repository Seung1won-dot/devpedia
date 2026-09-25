import type { Category, Term } from '../types'
import type { Route } from '../lib/route'
import { catStyle } from '../lib/catStyle'

interface Props {
  ids: string[]
  byId: Map<string, Term>
  categories: Map<string, Category>
  onNavigate: (r: Route) => void
}

/** related / backlinks 칩. 존재하는 카드는 카테고리 색 칩으로 이동, 아직 없는 id 는 회색 비활성 칩. */
export function RelatedChips({ ids, byId, categories, onNavigate }: Props) {
  if (ids.length === 0) return <p className="muted">아직 관련 용어가 없어요.</p>
  return (
    <ul className="chips">
      {ids.map((id) => {
        const t = byId.get(id)
        if (!t) {
          return (
            <li key={id}>
              <button type="button" className="chip" disabled title="아직 없는 용어 — inbox 에 추가해 두세요">
                {id}
              </button>
            </li>
          )
        }
        const cat = categories.get(t.category)
        return (
          <li key={id}>
            <button
              type="button"
              className="chip chip--cat"
              style={catStyle(t.category)}
              title={t.definition}
              onClick={() => onNavigate({ kind: 'term', id })}
            >
              {t.term}
              {cat && <span className="chip__count" aria-hidden="true">{cat.icon}</span>}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
