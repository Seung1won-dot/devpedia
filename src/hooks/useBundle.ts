import { useEffect, useState } from 'react'
import type { Bundle, Category, Term } from '../types'
import { bundleUrl, indexById } from '../lib/terms'
import { createSearch, type TermSearch } from '../lib/search'

export type BundleState =
  | { state: 'loading' }
  | { state: 'error'; message: string }
  | { state: 'ready'; bundle: Bundle; byId: Map<string, Term>; categories: Map<string, Category>; search: TermSearch }

/** public/terms.json 을 한 번 내려받아 메모리 인덱스를 만든다. 서버 로직 없음. */
export function useBundle(): BundleState {
  const [state, setState] = useState<BundleState>({ state: 'loading' })

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(bundleUrl(import.meta.env.BASE_URL))
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const bundle = (await res.json()) as Bundle
        if (cancelled) return
        setState({
          state: 'ready',
          bundle,
          byId: indexById(bundle.terms),
          categories: new Map(bundle.categories.map((c) => [c.code, c])),
          search: createSearch(bundle.terms),
        })
      } catch (e) {
        if (!cancelled) setState({ state: 'error', message: e instanceof Error ? e.message : String(e) })
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return state
}
