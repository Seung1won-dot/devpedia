import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Term } from './types'
import { pageKey, type Route } from './lib/route'
import { RECENT_TERMS_KEY } from './lib/storage'
import { useBundle, type BundleState } from './hooks/useBundle'
import { useRoute } from './hooks/useRoute'
import { useStars } from './hooks/useStars'
import { useTheme } from './hooks/useTheme'
import { useRecentList } from './hooks/useRecentList'
import { useScrollRestoration } from './hooks/useScrollRestoration'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { EmptyState } from './components/EmptyState'
import { PageSkeleton } from './components/Skeleton'
import { CommandPalette } from './components/CommandPalette'
import { HomePage } from './pages/HomePage'
import { CategoryPage } from './pages/CategoryPage'
import { TermPage } from './pages/TermPage'
import { StarredPage } from './pages/StarredPage'
import { StatsPage } from './pages/StatsPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { APP_NAME } from './config'

export type ReadyData = Extract<BundleState, { state: 'ready' }>

export interface PageContext {
  data: ReadyData
  route: Route
  navigate: (r: Route, opts?: { replace?: boolean }) => void
  stars: Set<string>
  toggleStar: (id: string) => void
  recentTerms: string[]
  openSearch: () => void
}

function isTyping(el: EventTarget | null) {
  const t = el as HTMLElement | null
  return Boolean(t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable))
}

function titleFor(route: Route, data: ReadyData): string {
  switch (route.kind) {
    case 'term': {
      const t = data.byId.get(route.id)
      return t ? `${t.term} · ${APP_NAME}` : `찾을 수 없음 · ${APP_NAME}`
    }
    case 'category': {
      const c = data.categories.get(route.code)
      return c ? `${c.name} · ${APP_NAME}` : `찾을 수 없음 · ${APP_NAME}`
    }
    case 'starred':
      return `별표 · ${APP_NAME}`
    case 'stats':
      return `통계 · ${APP_NAME}`
    case 'notFound':
      return `찾을 수 없음 · ${APP_NAME}`
    default:
      return `${APP_NAME} — IT 용어 사전`
  }
}

// 한글 웹폰트(Pretendard 동적 서브셋)는 첫 데이터 화면을 그린 뒤 유휴 시간에 붙인다. 화면에 나온 글자의 조각만 받고(unicode-range),
// 그 전까지는 시스템 한글 폰트로 그린다. 폰트 수백 KB 가 첫 화면(LCP)과 대역폭을 다투지 않게 하려는 것.
let fontRequested = false
function loadWebFontWhenIdle() {
  if (fontRequested) return
  fontRequested = true
  const run = () => void import('./styles/fonts/pretendard.css')
  const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }
  if (typeof w.requestIdleCallback === 'function') w.requestIdleCallback(run, { timeout: 1500 })
  else window.setTimeout(run, 300)
}

export function App() {
  const data = useBundle()
  const [route, navigate] = useRoute()
  const { stars, toggle: toggleStar } = useStars()
  const theme = useTheme()
  const recentTerms = useRecentList(RECENT_TERMS_KEY, 12)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const openSearch = useCallback(() => setPaletteOpen(true), [])
  const closeSearch = useCallback(() => setPaletteOpen(false), [])

  const ready = data.state === 'ready'
  const key = pageKey(route)
  useScrollRestoration(key, ready)

  // 페이지가 바뀌면(첫 로드 제외) 키보드·스크린리더 사용자를 새 본문의 시작으로 옮긴다
  const firstPage = useRef(true)
  useEffect(() => {
    if (firstPage.current) {
      firstPage.current = false
      return
    }
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [key])

  // 단축키: / 또는 ⌘K·Ctrl+K 로 검색 팔레트
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey
      if ((mod && e.key.toLowerCase() === 'k') || (e.key === '/' && !mod && !e.altKey && !isTyping(e.target))) {
        e.preventDefault()
        setPaletteOpen((v) => (mod ? !v : true))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (data.state !== 'loading') loadWebFontWhenIdle()
  }, [data.state])

  // 본문이 필요한 화면이면 지금 읽는다 (아니면 useBundle 이 한가할 때 읽는다)
  const needBodies = paletteOpen || route.kind === 'term' || (route.kind === 'category' && Boolean(route.preview))
  useEffect(() => {
    if (data.state === 'ready' && needBodies && !data.bodies) data.requestBodies()
  }, [data, needBodies])

  // 최근 본 용어
  const pushRecent = recentTerms.push
  useEffect(() => {
    if (data.state === 'ready' && route.kind === 'term' && data.byId.has(route.id)) pushRecent(route.id)
  }, [data, route, pushRecent])

  useEffect(() => {
    if (data.state === 'ready') document.title = titleFor(route, data)
  }, [data, route])

  const starredCount = useMemo(() => {
    if (data.state !== 'ready') return 0
    let n = 0
    for (const id of stars) if (data.byId.has(id)) n++
    return n
  }, [data, stars])

  let page
  if (data.state === 'loading') {
    page = <PageSkeleton />
  } else if (data.state === 'error') {
    page = (
      <div className="container page">
        <EmptyState
          asPage
          icon="inbox"
          title="용어 데이터를 불러오지 못했어요"
          hint={`terms.json 을 읽을 수 없습니다 (${data.message}). 네트워크를 확인하거나, 개발 중이라면 npm run build:terms 를 실행하세요.`}
          action={
            <button type="button" className="btn btn--primary" onClick={() => window.location.reload()}>
              다시 시도
            </button>
          }
        />
      </div>
    )
  } else {
    const ctx: PageContext = { data, route, navigate, stars, toggleStar, recentTerms: recentTerms.list, openSearch }
    switch (route.kind) {
      case 'home':
        page = <HomePage ctx={ctx} />
        break
      case 'category':
        page = data.categories.has(route.code) ? <CategoryPage ctx={ctx} code={route.code} preview={route.preview} /> : <NotFoundPage ctx={ctx} what="분야" name={route.code} />
        break
      case 'term': {
        const t: Term | undefined = data.byId.get(route.id)
        page = t ? <TermPage ctx={ctx} term={t} /> : <NotFoundPage ctx={ctx} what="용어" name={route.id} />
        break
      }
      case 'starred':
        page = <StarredPage ctx={ctx} />
        break
      case 'stats':
        page = <StatsPage ctx={ctx} />
        break
      default:
        page = <NotFoundPage ctx={ctx} what="페이지" name={route.path} />
    }
  }

  return (
    <div className="app">
      <a className="skip-link" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus() }}>
        본문으로 건너뛰기
      </a>
      <Header
        route={route}
        categories={ready ? data.bundle.categories : []}
        counts={ready ? data.bundle.stats.byCategory : {}}
        starredCount={starredCount}
        onOpenSearch={openSearch}
        themePref={theme.pref}
        onCycleTheme={theme.cycle}
      />
      <main id="main" className="main" tabIndex={-1}>
        <div key={key} className="page-enter">
          {page}
        </div>
      </main>
      {data.state !== 'loading' && <Footer generatedAt={ready ? data.bundle.generatedAt : null} />}
      {paletteOpen && <CommandPalette data={data} onClose={closeSearch} navigate={navigate} recentTerms={recentTerms.list} />}
    </div>
  )
}
