// localStorage 는 프라이빗 창 등에서 막혀 있을 수 있다. 모든 접근을 try/catch 로 감싸고, 실패하면 메모리 상태만 쓴다.
export function loadList(key: string): string[] {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}

export function saveList(key: string, list: string[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(list))
  } catch {
    /* 저장 불가 환경 */
  }
}

/** 맨 앞에 넣고 중복을 지운 뒤 max 개만 남긴다 (최근 본 용어·최근 검색). */
export function pushRecent(list: string[], item: string, max: number): string[] {
  const v = item.trim()
  if (!v) return list
  return [v, ...list.filter((x) => x !== v)].slice(0, max)
}

export const RECENT_TERMS_KEY = 'devpedia:recent-terms'
export const RECENT_SEARCHES_KEY = 'devpedia:recent-searches'
export const SORT_KEY = 'devpedia:sort'
