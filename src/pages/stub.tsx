import type { Term } from '../types'
import type { PageContext } from '../App'
import { toHash } from '../lib/route'
import { sortTerms } from '../lib/terms'
import { TermCard } from '../components/TermCard'

/** 2단계 골격용 임시 페이지 — 3~5단계에서 실제 페이지로 바뀐다 */
export function StubList({ ctx, title, terms }: { ctx: PageContext; title: string; terms: Term[] }) {
  return (
    <div className="container page">
      <header className="pagehead">
        <h1 className="pagehead__title">{title}</h1>
        <p className="pagehead__meta">{terms.length}개 용어</p>
      </header>
      <div className="grid grid--cards">
        {sortTerms(terms, 'name').map((t) => (
          <TermCard key={t.id} term={t} category={ctx.data.categories.get(t.category)} />
        ))}
      </div>
      <p className="muted" style={{ marginTop: 32 }}>
        <a href={toHash({ kind: 'home' })}>홈으로</a>
      </p>
    </div>
  )
}
