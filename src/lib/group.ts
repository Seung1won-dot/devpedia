import type { Term } from '../types'

// 가나다순 목록의 섹션 머리글(ㄱ ㄴ ㄷ … A–Z #). 된소리는 예사소리 칸에 넣는다(ㄲ→ㄱ).
const CHO = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
const BASE: Record<string, string> = { ㄲ: 'ㄱ', ㄸ: 'ㄷ', ㅃ: 'ㅂ', ㅆ: 'ㅅ', ㅉ: 'ㅈ' }
export const HANGUL_KEYS = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
export const LATIN_KEYS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
export const ALL_KEYS = [...HANGUL_KEYS, ...LATIN_KEYS, '#']

export function initialOf(text: string): string {
  const ch = text.trim().charAt(0)
  const c = ch.charCodeAt(0)
  if (c >= 0xac00 && c <= 0xd7a3) {
    const cho = CHO[Math.floor((c - 0xac00) / 588)]
    return BASE[cho] ?? cho
  }
  if (c >= 0x3131 && c <= 0x314e) return BASE[ch] ?? ch
  const up = ch.toUpperCase()
  if (up >= 'A' && up <= 'Z') return up
  return '#'
}

export interface TermGroup {
  key: string
  terms: Term[]
}

/** 표시 이름의 첫 글자로 묶는다. 묶음 순서는 ㄱ…ㅎ, A…Z, #. 묶음 안은 한국어 사전순. */
export function groupByInitial(terms: Term[]): TermGroup[] {
  const map = new Map<string, Term[]>()
  for (const t of terms) {
    const k = initialOf(t.term)
    const list = map.get(k)
    if (list) list.push(t)
    else map.set(k, [t])
  }
  return ALL_KEYS.filter((k) => map.has(k)).map((key) => ({
    key,
    terms: map.get(key)!.sort((a, b) => a.term.localeCompare(b.term, 'ko')),
  }))
}
