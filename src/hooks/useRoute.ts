import { useCallback, useEffect, useState } from 'react'
import { parseHash, toHash, type Route } from '../lib/route'

export function useRoute(): [Route, (r: Route) => void] {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash))

  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash))
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const navigate = useCallback((r: Route) => {
    const hash = toHash(r)
    if (window.location.hash === hash) setRoute(r)
    else window.location.hash = hash
  }, [])

  return [route, navigate]
}
