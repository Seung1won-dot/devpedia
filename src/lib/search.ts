import MiniSearch from 'minisearch'
import type { Term, TermBody } from '../types'
import { isChosungQuery, toChosung } from './hangul'

export interface SearchHit {
  id: string
  score: number
}

interface Doc {
  id: string
  term: string
  aliases: string
  definition: string
  tags: string
  chosung: string
  body: string
}

const FIELD_BOOST = { term: 5, aliases: 4, definition: 1.5, tags: 1, chosung: 3, body: 0.5 }
const FALLBACK_SCORE = 0.1

const compact = (s: string) => s.toLowerCase().replace(/\s+/g, '')

/**
 * 클라이언트 검색 인덱스.
 * 1) MiniSearch: 토큰 접두 매칭 + 4글자 이상 퍼지, 여러 단어는 AND
 * 2) 초성 질의("ㄹㅂㅅ")는 초성 필드만 검색
 * 3) 폴백: 토큰 중간 부분 문자열("록시")은 term/aliases 를 includes 로 훑는다
 * bodies(본문 검색 텍스트)는 나중에 도착할 수 있다 — 없으면 term/aliases/정의/태그만으로 검색한다.
 */
export function createSearch(terms: Term[], bodies?: Map<string, TermBody>) {
  const mini = new MiniSearch<Doc>({
    fields: ['term', 'aliases', 'definition', 'tags', 'chosung', 'body'],
    storeFields: [],
  })
  mini.addAll(
    terms.map((t) => ({
      id: t.id,
      term: t.term,
      aliases: t.aliases.join(' '),
      definition: t.definition,
      tags: t.tags.join(' '),
      chosung: toChosung(`${t.term} ${t.aliases.join(' ')}`),
      body: bodies?.get(t.id)?.searchText ?? '',
    })),
  )

  const names = terms.map((t) => {
    const text = `${t.term} ${t.aliases.join(' ')}`
    return { id: t.id, plain: compact(text), chosung: compact(toChosung(text)) }
  })

  function search(query: string, limit = 50): SearchHit[] {
    const q = query.trim()
    if (!q) return []
    const chosung = isChosungQuery(q)

    const raw = chosung
      ? mini.search(q, { fields: ['chosung'], prefix: true, combineWith: 'AND' })
      : mini.search(q, {
          prefix: true,
          fuzzy: (t) => (t.length >= 4 ? 0.2 : false),
          combineWith: 'AND',
          boost: FIELD_BOOST,
        })

    const hits: SearchHit[] = raw.map((h) => ({ id: String(h.id), score: h.score }))
    const seen = new Set(hits.map((h) => h.id))

    const needle = compact(q)
    if (needle) {
      for (const n of names) {
        if (seen.has(n.id)) continue
        const hay = chosung ? n.chosung : n.plain
        if (hay.includes(needle)) {
          hits.push({ id: n.id, score: FALLBACK_SCORE })
          seen.add(n.id)
        }
      }
    }
    return hits.slice(0, limit)
  }

  return { search, hasBodies: Boolean(bodies) }
}

export type TermSearch = ReturnType<typeof createSearch>

/**
 * 첫 검색 때 인덱스를 만드는 지연 버전. 첫 화면(홈·분야)은 검색이 필요 없으므로
 * MiniSearch 인덱싱(615장 기준 모바일에서 수백 ms)을 첫 렌더 경로에서 뺀다.
 */
export function createLazySearch(terms: Term[], bodies?: Map<string, TermBody>): TermSearch {
  let real: TermSearch | null = null
  return {
    search(query: string, limit?: number) {
      real ??= createSearch(terms, bodies)
      return real.search(query, limit)
    },
    hasBodies: Boolean(bodies),
  }
}
