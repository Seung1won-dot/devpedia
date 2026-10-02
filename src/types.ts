// scripts/(빌드) 와 src/(앱) 가 공유하는 유일한 데이터 계약.
// 빌드가 public/terms.json(인덱스) + public/terms-body.json(본문)으로 내보내고, 앱이 그대로 읽는다.
// 인덱스만으로 목록·검색·카드 헤더를 그리고, 본문은 첫 화면 뒤에 받아 상세와 본문 검색에 쓴다.

export type Level = 1 | 2 | 3
export type Status = 'draft' | 'review' | 'published'
/** 개념 · 도구 · 프로토콜/표준/포맷 · 설계/운영 패턴 · 지표 · 법/규제/인증 */
export type Kind = 'concept' | 'tool' | 'protocol' | 'pattern' | 'metric' | 'regulation'

export interface Category {
  code: string
  name: string
  icon: string
  description: string
  /** 홈·분야 메뉴에서 묶어 보이는 이름 (taxonomy/categories.yml 의 group) */
  group?: string
  order: number
}

/** 목록·검색·카드 헤더에 필요한 가벼운 필드 (terms.json) */
export interface Term {
  id: string
  term: string
  aliases: string[]
  category: string
  tags: string[]
  level: Level
  kind: Kind
  related: string[]
  backlinks: string[]
  seeAlso: string[]
  status: Status
  created: string
  updated: string
  /** 한 줄 정의 plain text (검색·목록용) */
  definition: string
}

/** 빌드 시 렌더한 본문 HTML 과 검색용 plain text (terms-body.json) */
export interface TermBody {
  /** 한 줄 정의 inline markdown 렌더 */
  definitionHtml: string
  analogyHtml: string
  exampleHtml: string
  confusionsHtml: string | null
  /** 비유·예시·헷갈리기 쉬운 것 plain text (본문 검색용) */
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

export interface BodyBundle {
  version: 1
  generatedAt: string
  bodies: Record<string, TermBody>
}
