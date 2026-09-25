import { useEffect, useState } from 'react'
import type { BodyBundle, Bundle, Category, Term, TermBody } from '../types'
import { bodiesUrl, bundleUrl, indexById } from '../lib/terms'
import { createSearch, type TermSearch } from '../lib/search'

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
    }

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return (await res.json()) as T
}

/**
 * 두 단계 로딩: terms.json(인덱스, 작음) → 목록·검색 즉시 → terms-body.json(본문) → 상세·본문 검색.
 * 서버 로직 없음. 둘 다 서비스 워커가 프리캐시해 오프라인에서도 열린다.
 */
export function useBundle(): BundleState {
  const [state, setState] = useState<BundleState>({ state: 'loading' })

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      let bundle: Bundle
      try {
        bundle = await fetchJson<Bundle>(bundleUrl(import.meta.env.BASE_URL))
      } catch (e) {
        if (!cancelled) setState({ state: 'error', message: e instanceof Error ? e.message : String(e) })
        return
      }
      if (cancelled) return
      const byId = indexById(bundle.terms)
      const categories = new Map(bundle.categories.map((c) => [c.code, c]))
      setState({ state: 'ready', bundle, byId, categories, search: createSearch(bundle.terms), bodies: null, bodiesError: null })

      try {
        const body = await fetchJson<BodyBundle>(bodiesUrl(import.meta.env.BASE_URL))
        if (cancelled) return
        const bodies = new Map(Object.entries(body.bodies))
        setState({ state: 'ready', bundle, byId, categories, search: createSearch(bundle.terms, bodies), bodies, bodiesError: null })
      } catch (e) {
        if (cancelled) return
        setState((prev) =>
          prev.state === 'ready' ? { ...prev, bodiesError: e instanceof Error ? e.message : String(e) } : prev,
        )
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return state
}
