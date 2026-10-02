import { useMemo } from 'react'
import type { Term } from '../types'
import type { PageContext } from '../App'
import { toHash } from '../lib/route'
import { EmptyState } from '../components/EmptyState'
import { TermCard } from '../components/TermCard'

/** 404 — 없는 용어·분야·주소. 주소의 단어로 검색해 비슷한 용어를 추천한다. */
export function NotFoundPage({ ctx, what, name }: { ctx: PageContext; what: '용어' | '분야' | '페이지'; name: string }) {
  const { data } = ctx
  const guess = name.replace(/[-_/]+/g, ' ').trim()
  const suggestions: Term[] = useMemo(() => {
    if (!guess) return []
    return data.search
      .search(guess, 3)
      .map((h) => data.byId.get(h.id))
      .filter((t): t is Term => Boolean(t))
  }, [data, guess])

  return (
    <div className="container page">
      <EmptyState
        asPage
        icon="inbox"
        title={`${what}를 찾을 수 없어요`}
        hint={
          <>
            <code>{name || '/'}</code> 은(는) 없거나 주소가 바뀌었어요. 공유받은 링크라면 용어 id 가 바뀌었을 수 있어요.
          </>
        }
        action={
          <>
            <a className="btn btn--primary" href={toHash({ kind: 'home' })}>
              홈으로
            </a>
            <button type="button" className="btn" onClick={ctx.openSearch}>
              용어 검색
            </button>
          </>
        }
      />
      {suggestions.length > 0 && (
        <section className="section notfound__suggest" aria-labelledby="h-suggest">
          <div className="section__head">
            <h2 className="section__title" id="h-suggest">
              혹시 이 용어인가요?
            </h2>
          </div>
          <ul className="grid grid--cards">
            {suggestions.map((t) => (
              <li key={t.id}>
                <TermCard term={t} category={data.categories.get(t.category)} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
