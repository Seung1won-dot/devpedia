import { useMemo } from 'react'
import type { PageContext } from '../App'
import { toHash } from '../lib/route'
import { sortTerms } from '../lib/terms'
import { Breadcrumb } from '../components/Breadcrumb'
import { TermCard } from '../components/TermCard'
import { EmptyState } from '../components/EmptyState'

export function StarredPage({ ctx }: { ctx: PageContext }) {
  const { data, stars } = ctx
  const terms = useMemo(() => sortTerms(data.bundle.terms.filter((t) => stars.has(t.id)), 'name'), [data.bundle.terms, stars])
  return (
    <div className="container page">
      <Breadcrumb items={[{ label: '홈', href: toHash({ kind: 'home' }) }, { label: '별표' }]} />
      <header className="pagehead pagehead--cat">
        <h1 className="pagehead__title">별표한 용어</h1>
        <p className="pagehead__desc">복습할 용어 목록. 이 기기의 브라우저에만 저장돼요.</p>
        {terms.length > 0 && <p className="pagehead__meta">{terms.length}개</p>}
      </header>
      {terms.length === 0 ? (
        <EmptyState
          icon="star"
          title="아직 별표한 용어가 없어요"
          hint="용어 페이지의 ☆ 별표 버튼을 누르면 여기에 모여요."
          action={<a className="btn" href={toHash({ kind: 'home' })}>분야 둘러보기</a>}
        />
      ) : (
        <ul className="grid grid--cards" data-testid="term-grid">
          {terms.map((t) => (
            <li key={t.id}>
              <TermCard term={t} category={data.categories.get(t.category)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
