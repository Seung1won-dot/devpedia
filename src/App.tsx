import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Level, Term } from './types'
import type { Route } from './lib/route'
import { filterTerms, sortTerms, tagsIn } from './lib/terms'
import { useBundle } from './hooks/useBundle'
import { useRoute } from './hooks/useRoute'
import { useStars } from './hooks/useStars'
import { useTheme } from './hooks/useTheme'
import { Header } from './components/Header'
import { CategoryTabs } from './components/CategoryTabs'
import { FilterBar } from './components/FilterBar'
import { TermList } from './components/TermList'
import { EmptyState } from './components/EmptyState'
import { TermDetail } from './components/TermDetail'
import { StatsView } from './components/StatsView'
import { ListSkeleton } from './components/Skeleton'
import { toHash } from './lib/route'
import { APP_NAME, REPO_URL } from './config'

type ListRoute = Extract<Route, { kind: 'home' | 'category' | 'starred' }>

const isListRoute = (r: Route): r is ListRoute => r.kind === 'home' || r.kind === 'category' || r.kind === 'starred'

export function App() {
  const data = useBundle()
  const [route, navigate] = useRoute()
  const { stars, toggle: toggleStar } = useStars()
  const theme = useTheme()

  const [query, setQuery] = useState('')
  const [levels, setLevels] = useState<Set<Level>>(() => new Set())
  const [tag, setTag] = useState<string | null>(null)
  const searchRef = useRef<HTMLInputElement | null>(null)

  // 용어/통계 라우트에서도 마지막으로 보던 목록(카테고리)을 유지한다.
  const lastList = useRef<ListRoute>({ kind: 'home' })
  if (isListRoute(route)) lastList.current = route
  const listRoute: ListRoute = isListRoute(route) ? route : lastList.current

  // 딥링크 냉시작(#ssh): 목록 상태가 없으면 그 용어의 카테고리를 목록으로 삼는다.
  const coldStart = useRef(true)
  if (coldStart.current && data.state === 'ready') {
    coldStart.current = false
    if (route.kind === 'term' && lastList.current.kind === 'home') {
      const t = data.byId.get(route.id)
      if (t) lastList.current = { kind: 'category', code: t.category }
    }
  }
  const effectiveList: ListRoute = listRoute.kind === 'home' && !isListRoute(route) ? lastList.current : listRoute

  const selectedId = route.kind === 'term' ? route.id : null
  const detailOpen = route.kind === 'term' || route.kind === 'stats'

  // 카테고리/태그가 바뀌면 태그 필터는 초기화
  const scopeKey = effectiveList.kind === 'category' ? effectiveList.code : effectiveList.kind
  useEffect(() => setTag(null), [scopeKey])

  const scopeTerms: Term[] = useMemo(() => {
    if (data.state !== 'ready') return []
    const all = data.bundle.terms
    if (effectiveList.kind === 'category') return all.filter((t) => t.category === effectiveList.code)
    if (effectiveList.kind === 'starred') return all.filter((t) => stars.has(t.id))
    return all
  }, [data, effectiveList, stars])

  const searchHits = useMemo(() => {
    if (data.state !== 'ready' || !query.trim()) return null
    return data.search.search(query, 200)
  }, [data, query])

  const listTerms: Term[] = useMemo(() => {
    const filtered = filterTerms(scopeTerms, { levels: levels.size ? levels : undefined, tag })
    if (!searchHits) return sortTerms(filtered)
    const allowed = new Map(filtered.map((t) => [t.id, t]))
    return searchHits.map((h) => allowed.get(h.id)).filter((t): t is Term => Boolean(t))
  }, [scopeTerms, levels, tag, searchHits])

  const tags = useMemo(() => tagsIn(scopeTerms), [scopeTerms])

  const toggleLevel = useCallback((l: Level) => {
    setLevels((prev) => {
      const next = new Set(prev)
      if (next.has(l)) next.delete(l)
      else next.add(l)
      return next
    })
  }, [])

  const closeDetail = useCallback(() => navigate(lastList.current), [navigate])

  // 단축키: / 검색, Esc 검색 비우기 → 상세 닫기
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const typing = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      if (e.key === '/' && !typing) {
        e.preventDefault()
        searchRef.current?.focus()
        searchRef.current?.select()
      } else if (e.key === 'Escape') {
        if (query) {
          setQuery('')
          searchRef.current?.blur()
        } else if (detailOpen) closeDetail()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [query, detailOpen, closeDetail])

  useEffect(() => {
    if (data.state !== 'ready') return
    const t = selectedId ? data.byId.get(selectedId) : null
    document.title = t ? `${t.term} · ${APP_NAME}` : route.kind === 'stats' ? `통계 · ${APP_NAME}` : APP_NAME
  }, [data, selectedId, route.kind])

  if (data.state === 'loading') {
    // 인덱스를 받는 동안에도 셸(헤더·탭·목록 자리)을 먼저 그려 레이아웃 이동을 막는다
    return (
      <div className="app">
        <Header
          query={query}
          onQueryChange={setQuery}
          searchRef={searchRef}
          resultCount={null}
          themePref={theme.pref}
          onCycleTheme={theme.cycle}
          statsActive={false}
        />
        <nav className="tabs" aria-hidden="true">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} className="skeleton__pill" />
          ))}
        </nav>
        <main className="main" data-detail-open={false}>
          <section className="pane pane--list" aria-label="용어 목록" aria-busy="true">
            <ListSkeleton />
          </section>
          <section className="pane pane--detail" aria-label="상세" />
        </main>
      </div>
    )
  }
  if (data.state === 'error') {
    return (
      <div className="app app--center">
        <EmptyState icon="inbox" title="용어 데이터를 불러오지 못했어요" hint={`terms.json 을 읽을 수 없습니다 (${data.message}). npm run build:terms 를 실행했는지 확인하세요.`} />
      </div>
    )
  }

  const { bundle, categories } = data
  const activeTab = effectiveList.kind === 'category' ? effectiveList.code : effectiveList.kind === 'starred' ? 'starred' : 'all'
  const showCategory = effectiveList.kind !== 'category'
  const starredCount = bundle.terms.filter((t) => stars.has(t.id)).length

  let listBody
  if (listTerms.length > 0) {
    listBody = (
      <TermList
        terms={listTerms}
        categories={categories}
        query={query}
        selectedId={selectedId}
        stars={stars}
        onToggleStar={toggleStar}
        showCategory={showCategory}
      />
    )
  } else if (query.trim()) {
    listBody = (
      <EmptyState
        title={`'${query.trim()}' 에 맞는 용어가 없어요`}
        hint={<>철자·초성으로 다시 찾아보거나, <code>terms/_inbox.md</code> 에 한 줄 적어 두세요.</>}
      />
    )
  } else if (effectiveList.kind === 'starred') {
    listBody = <EmptyState icon="star" title="별표한 용어가 없어요" hint="카드의 ☆ 를 눌러 복습 목록을 만드세요." />
  } else {
    listBody = <EmptyState icon="inbox" title="여기엔 아직 카드가 없어요" hint="필터를 풀거나 다른 카테고리를 열어 보세요." />
  }

  let detailBody
  if (route.kind === 'term') {
    const t = data.byId.get(route.id)
    detailBody = t ? (
      <TermDetail
        term={t}
        body={data.bodies?.get(t.id)}
        byId={data.byId}
        categories={categories}
        starred={stars.has(t.id)}
        onToggleStar={() => toggleStar(t.id)}
        onNavigate={navigate}
        onClose={closeDetail}
        repoUrl={REPO_URL}
      />
    ) : (
      <EmptyState
        icon="inbox"
        title="해당 용어가 없습니다"
        hint={`'${route.id}' 카드는 아직 없어요. 링크가 오래됐거나 id 가 바뀌었을 수 있어요.`}
        action={<a className="btn btn--primary" href={toHash({ kind: 'home' })}>홈으로</a>}
      />
    )
  } else if (route.kind === 'stats') {
    detailBody = <StatsView bundle={bundle} starredCount={starredCount} onNavigate={navigate} onClose={closeDetail} />
  } else {
    detailBody = (
      <div className="placeholder">
        <p className="muted">왼쪽에서 카드를 고르면 여기에 정의·비유·예시가 나옵니다.</p>
      </div>
    )
  }

  return (
    <div className="app">
      <Header
        query={query}
        onQueryChange={setQuery}
        searchRef={searchRef}
        resultCount={searchHits ? listTerms.length : null}
        themePref={theme.pref}
        onCycleTheme={theme.cycle}
        statsActive={route.kind === 'stats'}
      />
      <CategoryTabs
        categories={bundle.categories}
        counts={bundle.stats.byCategory}
        total={bundle.stats.total}
        starredCount={starredCount}
        active={activeTab}
      />
      <main className="main" data-detail-open={detailOpen}>
        <section className="pane pane--list" aria-label="용어 목록">
          <FilterBar levels={levels} onToggleLevel={toggleLevel} tags={tags} activeTag={tag} onSelectTag={setTag} />
          {listBody}
        </section>
        <section className="pane pane--detail" aria-label="상세">
          {detailBody}
        </section>
      </main>
    </div>
  )
}
