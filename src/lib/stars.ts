// 별표(복습 목록). localStorage 는 막혀 있을 수 있으므로(프라이빗 창 등) 모든 접근을 try/catch 로 감싼다.
export const STARS_KEY = 'devpedia:stars'

export function loadStars(): Set<string> {
  try {
    const raw = localStorage.getItem(STARS_KEY)
    if (!raw) return new Set()
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return new Set()
    return new Set(parsed.filter((x): x is string => typeof x === 'string'))
  } catch {
    return new Set()
  }
}

export function saveStars(stars: Set<string>): void {
  try {
    localStorage.setItem(STARS_KEY, JSON.stringify([...stars]))
  } catch {
    /* 저장 불가 환경 — 메모리 상태만 유지 */
  }
}

export function toggleStar(stars: Set<string>, id: string): Set<string> {
  const next = new Set(stars)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  return next
}
