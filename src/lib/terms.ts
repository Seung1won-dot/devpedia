import type { Level, Term } from '../types'

/** 기초 → 심화, 같은 레벨 안에서는 한국어 사전순 */
export function sortTerms(terms: Term[]): Term[] {
  return [...terms].sort((a, b) => a.level - b.level || a.term.localeCompare(b.term, 'ko'))
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

/** Vite 의 BASE_URL 을 붙인 terms.json 경로 (GitHub Pages 의 /<repo>/ 대응) */
export function bundleUrl(base: string): string {
  return `${base.endsWith('/') ? base : base + '/'}terms.json`
}
