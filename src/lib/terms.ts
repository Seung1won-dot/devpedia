import type { Level, Term } from '../types'

export const LEVEL_LABEL: Record<Level, string> = { 1: '기초', 2: '중급', 3: '심화' }
export const LEVELS: Level[] = [1, 2, 3]

export type SortMode = 'name' | 'level' | 'recent'
export const SORT_LABEL: Record<SortMode, string> = { name: '가나다', level: '난이도', recent: '최근' }

const byName = (a: Term, b: Term) => a.term.localeCompare(b.term, 'ko')

/** 기초 → 심화, 같은 레벨 안에서는 한국어 사전순 */
export function sortTerms(terms: Term[], mode: SortMode = 'level'): Term[] {
  const list = [...terms]
  if (mode === 'name') return list.sort(byName)
  if (mode === 'recent') return list.sort((a, b) => b.updated.localeCompare(a.updated) || byName(a, b))
  return list.sort((a, b) => a.level - b.level || byName(a, b))
}

export interface TermFilter {
  category?: string | null
  levels?: Set<Level>
  tag?: string | null
  ids?: Set<string>
}

export function filterTerms(terms: Term[], f: TermFilter): Term[] {
  return terms.filter((t) => {
    if (f.category && t.category !== f.category) return false
    if (f.levels && !f.levels.has(t.level)) return false
    if (f.tag && !t.tags.includes(f.tag)) return false
    if (f.ids && !f.ids.has(t.id)) return false
    return true
  })
}

/** 목록에 등장하는 태그와 개수. 많이 쓰인 순, 같으면 이름순 */
export function tagsIn(terms: Term[]): { tag: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const t of terms) for (const tag of t.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1)
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, 'ko'))
}

export function indexById(terms: Term[]): Map<string, Term> {
  return new Map(terms.map((t) => [t.id, t]))
}

/** 카드에 보일 영문명: 표시 이름과 다른 첫 번째 라틴 문자 별칭. 표시 이름이 이미 영문이면 null. */
export function englishName(t: Term): string | null {
  if (/^[A-Za-z0-9]/.test(t.term) && !/[가-힣]/.test(t.term)) return null
  return t.aliases.find((a) => /^[A-Za-z0-9.]/.test(a) && !/[가-힣]/.test(a) && a !== t.term) ?? null
}

/** 한글 표시 이름이 아니면 한글 별칭을, 아니면 영문명을 보조 이름으로 */
export function subtitleOf(t: Term): string | null {
  const en = englishName(t)
  if (en) return en
  return t.aliases.find((a) => /[가-힣]/.test(a) && a !== t.term) ?? null
}

export function levelCounts(terms: Term[]): Record<Level, number> {
  const out: Record<Level, number> = { 1: 0, 2: 0, 3: 0 }
  for (const t of terms) out[t.level]++
  return out
}

/** 대표 용어: 다른 카드가 가장 많이 참조하는 순 (역링크 수), 같으면 기초부터 */
export function representative(terms: Term[], n: number): Term[] {
  return [...terms].sort((a, b) => b.backlinks.length - a.backlinks.length || a.level - b.level || byName(a, b)).slice(0, n)
}

/** 최근 추가: created 내림차순 */
export function recentlyAdded(terms: Term[], n: number): Term[] {
  return [...terms].sort((a, b) => b.created.localeCompare(a.created) || byName(a, b)).slice(0, n)
}

/** 오늘의 용어: 날짜로 정해지는 한 장. 같은 날엔 모든 기기에서 같다. 역링크가 있는 기초·중급 카드에서 고른다. */
export function dailyTerm(terms: Term[], date: Date): Term | null {
  const pool = terms.filter((t) => t.level < 3 && t.backlinks.length > 0)
  const list = (pool.length ? pool : terms).slice().sort((a, b) => a.id.localeCompare(b.id))
  if (!list.length) return null
  const day = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000)
  // 날짜를 섞어 이웃한 날이 알파벳 이웃 카드가 되지 않게 한다
  const idx = Math.abs(Math.imul(day ^ 0x5bd1e995, 2654435761)) % list.length
  return list[idx]
}

/** 같은 분야 안 가나다순 이전/다음 */
export function neighbors(terms: Term[], t: Term): { prev: Term | null; next: Term | null } {
  const list = sortTerms(terms.filter((x) => x.category === t.category), 'name')
  const i = list.findIndex((x) => x.id === t.id)
  return { prev: i > 0 ? list[i - 1] : null, next: i >= 0 && i < list.length - 1 ? list[i + 1] : null }
}

const withBase = (base: string, file: string) => `${base.endsWith('/') ? base : base + '/'}${file}`

/** Vite 의 BASE_URL 을 붙인 terms.json 경로 (GitHub Pages 의 /<repo>/ 대응) */
export function bundleUrl(base: string): string {
  return withBase(base, 'terms.json')
}

/** 본문(HTML + 검색 텍스트) 파일 경로. 첫 화면을 그린 뒤에 받는다. */
export function bodiesUrl(base: string): string {
  return withBase(base, 'terms-body.json')
}
