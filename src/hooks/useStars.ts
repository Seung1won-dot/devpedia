import { useCallback, useState } from 'react'
import { loadStars, saveStars, toggleStar } from '../lib/stars'

export function useStars() {
  const [stars, setStars] = useState<Set<string>>(loadStars)
  const toggle = useCallback((id: string) => {
    setStars((prev) => {
      const next = toggleStar(prev, id)
      saveStars(next)
      return next
    })
  }, [])
  return { stars, toggle }
}
