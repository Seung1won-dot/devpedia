import matter from 'gray-matter'

export interface RawTerm {
  /** `terms/<category>/<id>.md` 형식의 상대 경로. 메모리 입력이면 `<memory>` */
  file: string
  frontmatter: Record<string, unknown>
  /** `## 제목` → 그 아래 본문(markdown). 코드 펜스 안의 `##` 는 제목으로 보지 않는다. */
  sections: Record<string, string>
  body: string
}

/** 본문을 `## ` 2단계 제목 기준으로 나눈다. `###` 이하와 코드 펜스 안의 줄은 현재 섹션에 그대로 남긴다. */
export function splitSections(md: string): Record<string, string> {
  const out: Record<string, string> = {}
  let current: string | null = null
  let buf: string[] = []
  let inFence = false

  for (const line of md.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence
      if (current !== null) buf.push(line)
      continue
    }
    const m = inFence ? null : /^##\s+(.+?)\s*$/.exec(line)
    if (m) {
      if (current !== null) out[current] = buf.join('\n').trim()
      current = m[1]
      buf = []
      continue
    }
    if (current !== null) buf.push(line)
  }
  if (current !== null) out[current] = buf.join('\n').trim()
  return out
}

export function parseTermMarkdown(source: string, file = '<memory>'): RawTerm {
  const { data, content } = matter(source)
  return {
    file,
    frontmatter: data as Record<string, unknown>,
    sections: splitSections(content),
    body: content,
  }
}
