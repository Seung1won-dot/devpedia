import { useCallback, useEffect, useState } from 'react'
import { canonicalHash, parseHash, toHash, type Route } from '../lib/route'

/** 예전 형식 해시(#ssh, #c/os …)는 방문 기록을 쌓지 않고 표준 해시로 바꾼다. 공유된 링크가 깨지지 않게. */
function readRoute(): Route {
  const hash = window.location.hash
  const canonical = canonicalHash(hash)
  if (canonical) {
    try {
      history.replaceState(history.state, '', canonical)
    } catch {
      /* 일부 환경(file://)에서는 막힐 수 있다 — 라우트는 그대로 읽힌다 */
    }
    return parseHash(canonical)
  }
  return parseHash(hash)
}

export function useRoute(): [Route, (r: Route, opts?: { replace?: boolean }) => void] {
  const [route, setRoute] = useState<Route>(readRoute)

  useEffect(() => {
    const onChange = () => setRoute(readRoute())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const navigate = useCallback((r: Route, opts: { replace?: boolean } = {}) => {
    const hash = toHash(r)
    if (window.location.hash === hash) {
      setRoute(r)
      return
    }
    if (opts.replace) {
      history.replaceState(history.state, '', hash)
      setRoute(r)
    } else {
      window.location.hash = hash
    }
  }, [])

  return [route, navigate]
}
