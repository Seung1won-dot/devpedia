import { useCallback, useEffect, useState } from 'react'
import { loadTheme, nextTheme, resolveTheme, saveTheme, type ThemePref } from '../lib/theme'

function darkMedia(): MediaQueryList | null {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null
}

/** 시스템 설정을 따르되, 토글로 light/dark 를 고정한다. <html data-theme> 로 CSS 토큰이 바뀐다. */
export function useTheme() {
  const [pref, setPref] = useState<ThemePref>(loadTheme)
  const [prefersDark, setPrefersDark] = useState<boolean>(() => darkMedia()?.matches ?? true)

  useEffect(() => {
    const mq = darkMedia()
    if (!mq) return
    const onChange = (e: MediaQueryListEvent) => setPrefersDark(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (pref === 'system') delete root.dataset.theme
    else root.dataset.theme = pref
  }, [pref])

  const cycle = useCallback(() => {
    setPref((p) => {
      const n = nextTheme(p)
      saveTheme(n)
      return n
    })
  }, [])

  return { pref, resolved: resolveTheme(pref, prefersDark), cycle }
}
