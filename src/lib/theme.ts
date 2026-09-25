// 테마: 시스템 설정을 따르되 토글로 고정할 수 있다. (스펙 F-06)
export type ThemePref = 'system' | 'light' | 'dark'
export type ResolvedTheme = 'light' | 'dark'

export const THEME_KEY = 'devpedia:theme'

export function loadTheme(): ThemePref {
  try {
    const v = localStorage.getItem(THEME_KEY)
    return v === 'light' || v === 'dark' ? v : 'system'
  } catch {
    return 'system'
  }
}

export function saveTheme(pref: ThemePref): void {
  try {
    if (pref === 'system') localStorage.removeItem(THEME_KEY)
    else localStorage.setItem(THEME_KEY, pref)
  } catch {
    /* 저장 불가 환경 */
  }
}

export function resolveTheme(pref: ThemePref, prefersDark: boolean): ResolvedTheme {
  if (pref === 'system') return prefersDark ? 'dark' : 'light'
  return pref
}

export function nextTheme(pref: ThemePref): ThemePref {
  if (pref === 'system') return 'light'
  if (pref === 'light') return 'dark'
  return 'system'
}
