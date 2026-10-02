import { useCallback, useEffect, useRef, useState } from 'react'
import type { BodyBundle, Bundle, Category, Term, TermBody } from '../types'
import { bodiesUrl, bundleUrl, indexById } from '../lib/terms'
import { createLazySearch, type TermSearch } from '../lib/search'

export type BundleState =
  | { state: 'loading' }
  | { state: 'error'; message: string }
  | {
      state: 'ready'
      bundle: Bundle
      byId: Map<string, Term>
      categories: Map<string, Category>
      search: TermSearch
      /** 본문은 인덱스 뒤에 따로 받는다. 오기 전엔 null (상세는 스켈레톤, 검색은 제목·정의만) */
      bodies: Map<string, TermBody> | null
      bodiesError: string | null
      /** 본문이 지금 필요하다(용어 페이지·미리보기·검색). 없으면 브라우저가 한가할 때 읽는다. */
      requestBodies: () => void
    }

const IDLE_TIMEOUT_MS = 4000

async function fetchOk(url: string): Promise<Response> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res
}

function onIdle(fn: () => void): () => void {
  const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void }
  if (typeof w.requestIdleCallback === 'function') {
    const id = w.requestIdleCallback(fn, { timeout: IDLE_TIMEOUT_MS })
    return () => w.cancelIdleCallback?.(id)
  }
  const id = window.setTimeout(fn, 1500)
  return () => window.clearTimeout(id)
}

/**
 * 두 단계 로딩: terms.json(인덱스) → 목록 즉시 → terms-body.json(본문) → 상세·본문 검색.
 * 본문 JSON(gzip 600KB 안팎)은 첫 화면과 대역폭을 다투지 않도록, 필요해질 때(용어 페이지·미리보기·검색) 또는 한가할 때 받는다.
 * 서버 로직 없음. 둘 다 서비스 워커가 프리캐시해 오프라인에서도 열린다.
 */
export function useBundle(): BundleState {
  const [state, setState] = useState<BundleState>({ state: 'loading' })
  const wantBodies = useRef<() => void>(() => {})
  const requestBodies = useCallback(() => wantBodies.current(), [])

  useEffect(() => {
    let cancelled = false
    const base = import.meta.env.BASE_URL
    ;(async () => {
      let bundle: Bundle
      try {
        bundle = (await (await fetchOk(bundleUrl(base))).json()) as Bundle
      } catch (e) {
        if (!cancelled) setState({ state: 'error', message: e instanceof Error ? e.message : String(e) })
        return
      }
      if (cancelled) return
      const byId = indexById(bundle.terms)
      const categories = new Map(bundle.categories.map((c) => [c.code, c]))
      setState({ state: 'ready', bundle, byId, categories, search: createLazySearch(bundle.terms), bodies: null, bodiesError: null, requestBodies })

      let started = false
      const loadBodies = async () => {
        if (started || cancelled) return
        started = true
        cancelIdle()
        try {
          const body = (await (await fetchOk(bodiesUrl(base))).json()) as BodyBundle
          if (cancelled) return
          const bodies = new Map(Object.entries(body.bodies))
          setState((prev) => (prev.state === 'ready' ? { ...prev, bodies, search: createLazySearch(bundle.terms, bodies) } : prev))
        } catch (e) {
          if (cancelled) return
          setState((prev) => (prev.state === 'ready' ? { ...prev, bodiesError: e instanceof Error ? e.message : String(e) } : prev))
        }
      }
      wantBodies.current = () => void loadBodies()
      const cancelIdle = onIdle(() => void loadBodies())
    })()
    return () => {
      cancelled = true
    }
  }, [requestBodies])

  return state
}
