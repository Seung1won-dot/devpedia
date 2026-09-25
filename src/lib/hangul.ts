// 한글 초성 검색 지원. 의존성 없이 유니코드 산술로 처리한다.
const CHO = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
const HANGUL_START = 0xac00
const HANGUL_END = 0xd7a3
const PER_CHO = 21 * 28 // 중성 21 × 종성 28

/** 완성형 한글 음절을 초성으로 바꾼다. 그 외 문자는 그대로. ("리버스 프록시" → "ㄹㅂㅅ ㅍㄹㅅ") */
export function toChosung(s: string): string {
  let out = ''
  for (const ch of s) {
    const c = ch.charCodeAt(0)
    out += c >= HANGUL_START && c <= HANGUL_END ? CHO[Math.floor((c - HANGUL_START) / PER_CHO)] : ch
  }
  return out
}

/** 공백을 뺀 나머지가 전부 자음 자모(ㄱ~ㅎ, U+3131~U+314E)면 초성 질의 */
export function isChosungQuery(s: string): boolean {
  const t = s.replace(/\s+/g, '')
  return t.length > 0 && /^[ㄱ-ㅎ]+$/.test(t)
}
