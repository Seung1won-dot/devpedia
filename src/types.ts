// scripts/(빌드) 와 src/(앱) 가 공유하는 유일한 데이터 계약.
// 빌드가 public/terms.json 으로 내보내고, 앱이 그대로 읽는다.

export type Level = 1 | 2 | 3
export type Status = 'draft' | 'review' | 'published'

export interface Category {
  code: string
  name: string
  icon: string
  description: string
  order: number
}

export interface Term {
  id: string
  term: string
  aliases: string[]
  category: string
  tags: string[]
  level: Level
  related: string[]
  backlinks: string[]
  seeAlso: string[]
  status: Status
  created: string
  updated: string
  /** 한 줄 정의 plain text (검색·목록용) */
  definition: string
  /** 한 줄 정의 inline markdown 렌더 */
  definitionHtml: string
  analogyHtml: string
  exampleHtml: string
  confusionsHtml: string | null
  /** 본문 plain text (검색용) */
  searchText: string
}

export interface Stats {
  total: number
  byCategory: Record<string, number>
  byLevel: Record<Level, number>
  byStatus: Record<Status, number>
  recent: { id: string; term: string; updated: string }[]
  avgRelated: number
  orphanCount: number
}

export interface Bundle {
  version: 1
  generatedAt: string
  categories: Category[]
  tags: string[]
  terms: Term[]
  stats: Stats
}
