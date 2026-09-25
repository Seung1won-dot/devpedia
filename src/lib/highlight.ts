export interface Segment {
  text: string
  hit: boolean
}

/** 검색어(공백으로 나뉜 각 단어)가 나타나는 구간을 표시한 세그먼트 목록. 대소문자 무시. */
export function highlightSegments(text: string, query: string): Segment[] {
  if (!text) return []
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  if (words.length === 0) return [{ text, hit: false }]

  const lower = text.toLowerCase()
  const mask = new Array<boolean>(text.length).fill(false)
  for (const w of words) {
    let from = 0
    while (from <= lower.length - w.length) {
      const idx = lower.indexOf(w, from)
      if (idx === -1) break
      for (let i = idx; i < idx + w.length; i++) mask[i] = true
      from = idx + w.length
    }
  }

  const out: Segment[] = []
  let start = 0
  for (let i = 1; i <= text.length; i++) {
    if (i === text.length || mask[i] !== mask[start]) {
      out.push({ text: text.slice(start, i), hit: mask[start] })
      start = i
    }
  }
  return out
}
